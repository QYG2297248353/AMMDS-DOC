---
title: No internet? Start here
sidebar_label: Network Diagnostics
description: When weather, film info or notifications stop working, use the connectivity check on the home screen to find where it breaks.
sidebar_position: 2
---

# No internet? Start here

If weather won't load, film info won't fill in, or notifications won't send, the app probably can't reach outside sites. The 网络信息（Network info）card on the home screen has a built-in checker. It tests each site the app uses, one by one. This page shows how to open it, how to read the results, and what to check for each outcome.

## Before you start

> **Scraping**: the app looks up a film's cover, description and cast on a data site and fills them in for you.

> **Proxy**: instead of connecting to a site directly, the app has another machine forward the request for it.

> **Cache**: a freshly fetched result is stored briefly and reused without going online again. Here it is kept for 5 minutes.

> **Concurrency**: several jobs running at the same time. This check runs one at a time so it doesn't hog the bandwidth.

> **DNS**: the service that turns a web address into an address machines understand. If it fails, sites won't open.

> **HTTP response**: the reply a website sends back. Even "no permission" or "not found" proves the connection works.

## Step by step

### 1. Open the checker

Go to 仪表盘 → 工作台（Dashboard → Home）and click anywhere on the 网络信息（Network info）card. The popup has a three-way switch at the top:

| Option | What it shows |
| --- | --- |
| 当前网页（This browser） | Public address, location and proxy as seen from the browser you're using |
| 后台服务（Backend） | The same info as seen from the machine running AMMDS |
| 连通性（Connectivity） | A list of public sites the app uses, tested one by one |

When you choose 连通性（Connectivity）, the top-right button becomes 重新测试（Retest）. The other two options show 刷新（Refresh）.

### 2. Read the network details

Switching between 当前网页（This browser）and 后台服务（Backend）changes which machine's address you see:

| Source | How the data is fetched | What it stands for |
| --- | --- | --- |
| This browser | The browser queries `ip.sb` directly | The address your current device uses online |
| Backend | The backend forwards the query for you | The address the server uses online |

If the two differ, the server is usually going through a proxy. Or your browser and the server are on different networks.

What's shown:

| Item | Meaning |
| --- | --- |
| IPv4 / IPv6 | Two address formats, probed separately; whichever fails shows 暂不支持（not supported yet） |
| Network priority | When both work, marks which one the current connection actually uses |
| Location | Country / region, city, internet provider, provider number, timezone, coordinates |
| Proxy state | The proxy switch, protocol, address and login username set in the system; the password is never shown |

:::tip[Results are cached for 5 minutes]
Details for one source are cached for 5 minutes. Switching sources or clicking 刷新（Refresh）fetches them again. The 网络信息（Network info）card itself is also cached for 5 minutes, so opening the home screen does not probe again every time.
:::

### 3. Run the connectivity check

Switch to 连通性（Connectivity）. The panel first lists every site to test, all marked 待测试（Pending）. Then it tests them **one row at a time from top to bottom** and shows each result as soon as it finishes. At the end, the top shows the total, the reachable count, the unreachable count and the total time.

Two verdicts only:

- **可访问（Reachable）**: the server got any HTTP response from the target, including "no permission" or "not found". The link works. A login prompt or a missing path does not change the verdict.
- **不可访问（Unreachable）**: name lookup failed, connection timed out, connection was reset, the encrypted connection couldn't be agreed, and so on.

:::warning[Reachable doesn't mean the feature works]
If TMDB shows reachable but scraping still fails, it's usually a wrong API Key or an exhausted daily free allowance, not a network problem.
:::

Three columns:

| Field | Meaning |
| --- | --- |
| 测试对象（Target） | Site icon plus domain; the line below is the name and group |
| 连通性（Connectivity） | Pending / Testing / Reachable / Unreachable; hover for the status code or failure reason |
| 耗时（Time） | From sending the request to the first reply |

Things to note:

- Closing the popup mid-run stops the remaining tests immediately.
- The list is reused once loaded; switching among the three options won't fetch it again.
- 重新测试（Retest）clears every row and runs the sequence from the start.

### 4. Which sites are tested

The list is kept by group and covers the public sites the backend actually visits:

| Group | Includes |
| --- | --- |
| Metadata sources | DMM, FANZA, DMM images, R18.dev, TMDB, TMDB images, TheTVDB, Bangumi, ThePornDB, TheJavDB, MGS, JavBus, JAV321, AV-Legue, Madou, MetaTube |
| Site indexes | M-Team, M-Team API, Rousi, FSM, IYUU, KamePT |
| Notifications | Telegram, Bark, Amap |
| AI and translation | DeepSeek, Gemini, Baidu Translate, DeepL, Xinyi, Caiyun, Google Translate, Microsoft Translate, Tencent Translate |
| Infrastructure | GitHub, GitHub mirror, HuggingFace, HF mirror, official resources, official S3, licence service, official store, stats service |
| DNS and basics | Cloudflare DoH, Google DoH, DNSPod DoH, IP lookup (ip-api / ipw.cn), time check (Suning / Taobao) |

:::note[The list grows on its own]
AMMDS maintains the list. When a site is added, it appears here automatically, with no page changes. Self-hosted services such as Jellyfin, qBittorrent or a local MetaTube are not in this list. Test them on their own plugin settings pages.
:::

## Settings explained

| Setting | What to enter | If you leave it out or get it wrong |
| --- | --- | --- |
| Network proxy | In 系统配置 → 网络代理（System config → Network proxy）, turn on the proxy and fill in protocol, address and login username; the password is never shown | Off: only overseas sites fail. Wrong address: even 后台服务（Backend）can't get data |
| Three-option switch | Pick 当前网页（This browser）, 后台服务（Backend）or 连通性（Connectivity）at the top | A wrong pick just shows another machine's info; without 连通性（Connectivity）, no site check runs |
| 刷新（Refresh） | Click it while on either of the first two options | Otherwise you keep the cached result from up to 5 minutes ago |
| 重新测试（Retest） | Click the top-right button after choosing 连通性（Connectivity） | Otherwise the previous result stays; this clears all rows and tests again |

## When something goes wrong

| Symptom | Likely cause | What to do |
| --- | --- | --- |
| Most sites unreachable, all around 4 seconds | The server can't reach the internet at all | Check the host's DNS, firewall and upstream network |
| Only overseas sites unreachable | The cross-border link is restricted | Turn on the proxy in 系统配置 → 网络代理（System config → Network proxy）and retest |
| All sites reachable but scraping fails | API Key, free allowance or site limits | Check plugin settings and site account status — not a network problem |
| The whole DNS group fails | The encrypted domain-lookup channel is blocked | A network policy limit; usually doesn't affect other features |

- For a fuller check-up (database, disk, helper programs, plugin settings), go to 系统管理 → 系统检查（System admin → System check）; this page only covers connectivity.
- If the weather card won't load, check whether it says 天气信息加载失败（Weather failed to load）on the home screen, then run the tests above. See [Your home screen: what you see when you open AMMDS](./overview.md).
- If a result keeps looking wrong, click 重新测试（Retest）once rather than opening and closing the popup repeatedly.

## Next

- [Your home screen: what you see when you open AMMDS](./overview.md)
