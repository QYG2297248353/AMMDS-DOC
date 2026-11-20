# 文档内部链接审计：校验 /docs 与 /open-api 绝对链接是否指向真实存在的文档路由。
param(
  [string]$Root = 'C:\Users\menseng\IdeaProjects\AMMDS\AMMDS-Doc'
)

$ErrorActionPreference = 'Stop'

# 把文档文件路径转换为路由：去掉扩展名，index 归一到目录首页
function Convert-ToRoute {
  param([string]$Prefix, [string]$RelativePath)
  $rel = ($RelativePath -replace '\.(md|mdx)$', '').Replace('\', '/')
  if ($rel -eq 'index') { return $Prefix }
  if ($rel.EndsWith('/index')) { return "$Prefix/" + $rel.Substring(0, $rel.Length - 6) }
  return "$Prefix/$rel"
}

function Get-Routes {
  param([string]$ContentRoot, [string]$Prefix)

  $routes = New-Object System.Collections.Generic.HashSet[string]

  $files = Get-ChildItem $ContentRoot -Recurse -File -ErrorAction SilentlyContinue |
    Where-Object { $_.Extension -in '.md', '.mdx' }
  foreach ($file in $files) {
    $rel = $file.FullName.Substring($ContentRoot.Length).TrimStart('\', '/')
    [void]$routes.Add((Convert-ToRoute -Prefix $Prefix -RelativePath $rel))
  }

  # 分类首页：由 _category_.json 的 link.slug 决定
  $categories = Get-ChildItem $ContentRoot -Recurse -File -Filter '_category_.json' -ErrorAction SilentlyContinue
  foreach ($category in $categories) {
    try {
      $json = Get-Content -LiteralPath $category.FullName -Raw | ConvertFrom-Json
      if ($json.link -and $json.link.slug) {
        $slug = [string]$json.link.slug
        if (-not $slug.StartsWith('/')) { $slug = "/$slug" }
        [void]$routes.Add("$Prefix$slug")
      }
    } catch {
      Write-Warning "无法解析 $($category.FullName): $($_.Exception.Message)"
    }
  }

  return , $routes
}

$docsRoutes = Get-Routes -ContentRoot (Join-Path $Root 'docs') -Prefix '/docs'
$apiRoutes = Get-Routes -ContentRoot (Join-Path $Root 'open-api') -Prefix '/open-api'

$sources = @()
$sources += Get-ChildItem (Join-Path $Root 'docs') -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Extension -in '.md', '.mdx' }
$sources += Get-ChildItem (Join-Path $Root 'open-api') -Recurse -File -ErrorAction SilentlyContinue |
  Where-Object { $_.Extension -in '.md', '.mdx' }

$problems = New-Object System.Collections.Generic.List[string]
foreach ($file in $sources) {
  $text = Get-Content -LiteralPath $file.FullName -Raw
  $found = [regex]::Matches($text, '\]\((?<url>/(?:docs|open-api)/[^)\s#]*)')
  foreach ($match in $found) {
    $url = $match.Groups['url'].Value.TrimEnd('/')
    if ($url -eq '') { continue }
    $ok = if ($url.StartsWith('/open-api')) {
      $apiRoutes.Contains($url)
    } else {
      $docsRoutes.Contains($url)
    }
    if (-not $ok) {
      $rel = $file.FullName.Substring($Root.Length).TrimStart('\', '/')
      $problems.Add("$rel -> $url")
    }
  }
}

if ($problems.Count -eq 0) {
  "OK: 所有 /docs 与 /open-api 链接均指向存在的路由（docs=$($docsRoutes.Count), open-api=$($apiRoutes.Count)）"
} else {
  "BROKEN ($($problems.Count)):"
  $problems | Sort-Object -Unique | ForEach-Object { "  $_" }
}
