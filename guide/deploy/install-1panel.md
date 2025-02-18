---
outline: deep
---

# 1Panel 应用商店

1Panel 是新一代的 Linux 服务器运维管理面板

## 安装第三方应用商店

+ 自动化安装

每隔 `3小时` 自动更新一次第三方应用商店内容

::: details 安装/卸载 脚本
安装 自动化脚本
```shell
curl -sSL https://install.lifebus.top/auto_install.sh | bash
```

卸载 自动化脚本
```shell
curl -sSL https://install.lifebus.top/auto_uninstall.sh | bash
```
:::

+ 手动安装

::: details 安装脚本
```shell
curl -sSL https://install.lifebus.top/app_install.sh | bash
```
:::

## 更新应用商店列表

打开 `应用商店` 模块。
1. 勾选 `显示本地应用`
2. 执行 `更新应用列表`

<a-image src="/images/install/1panel-001.png" />

## 安装应用

搜索 AMMDS, 点击 `应用图标` 查看应用说明, 点击`安装按钮`进行安装。

<a-image src="/images/install/1panel-002.png" />

<a-image src="/images/install/1panel-003.png" />

<a-image src="/images/install/1panel-004.png" />


<!--@include: ../../snippets/setup-finish.md-->

<!--@include: ../../snippets/copyright.md-->