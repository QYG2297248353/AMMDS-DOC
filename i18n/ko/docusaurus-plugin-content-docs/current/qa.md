---
sidebar_position: 99
sidebar_label: "자주 묻는 질문"
title: "자주 묻는 질문"
description: "AMMDS 사용 시 자주 발생하는 배포 및 사용 문제와 해결 방법을 모아놓았습니다. Docker 배포, 시스템 구성, 플러그인 통합 등의 문제 진단 및 수정을 포함합니다."
keywords: [AMMDS, 자주 묻는 질문, 문제 해결, 배포 문제, FAQ]
tags: [faq]
---

# 자주 묻는 질문

AMMDS를 사용할 때 자주 발생하는 문제와 해결 방법을 모아두었습니다.

## 🚀 배포 문제

<details>
  <summary>🔍 로그에 CPU가 x86-64-v2를 지원하지 않는다고 표시됩니까?</summary>
  
  장치의 CPU가 너무 오래되었습니다. `ol8` 태그가 붙은 이미지를 선택하여 사용하세요.
</details>

<details>
  <summary>⌛ 처음 배포 후 반응이 없습니까?</summary>
  
  처음 배포할 때 시스템이 필요한 리소스 파일을 다운로드하고 초기화해야 하므로 시간이 걸립니다. 몇 분 기다려도 반응이 없으면 페이지를 새로고침해 보세요.
</details>

<details>
  <summary>⏬ 리소스 다운로드가 너무 느립니까?</summary>
  
  리소스 파일이比较大, 다운로드가 느린 것은 정상입니다. 다음과 같은 방법으로 속도를 높일 수 있습니다:
  - 네트워크 환경을 변경하세요. 예: HTTP_PROXY 및 HTTPS_PROXY 환경 변수 설정
  - 리소스를 수동으로 다운로드하고 애플리케이션을 다시 시작하세요
</details>

<details>
  <summary>📁 모니터링 디렉터리 등록 실패 (시스템 모니터링 폴더에 문제가 있음), 시작 후 바로 종료됩니까?</summary>
  
  이는 일반적으로 설정 파일이나 환경 변수가 올바르게 설정되지 않았기 때문입니다. 설정 파일과 환경 변수를 확인하세요.
  
  다음과 같은 로그가 표시되는 경우:
  ```
  Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed
  User limit of inotify instances reached or too many open files
  User limit of inotify watches reached
  ```
  
  시스템의 inotify 제한을 늘려보세요:
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```
</details>

---

## 💡 사용 문제

<details>
  <summary>🖱️ 메뉴를 클릭해도 반응이 없습니까?</summary>
  
  페이지가 일시적으로 멈추었거나 리소스가 완전히 로드되지 않았을 수 있습니다. 먼저 페이지를 새로고침해 보세요. 그래도 문제가 지속되면 브라우저 콘솔에 오류 메시지가 있는지 확인하세요.
</details>

<details>
  <summary>⚪ 열었을 때 흰 화면이 표시됩니까?</summary>
  
  일반적으로 네트워크 리소스가 완전히 로드되지 않아 발생합니다. 페이지를 새로고침해 보세요. 그래도 문제가 지속되면 브라우저 콘솔에 오류가 있는지 확인하세요. 네트워크 연결을 안정적으로 유지하는 것이 좋습니다.
</details>

<details>
  <summary>☁️ 클라우드 스토리지의 .strm 파일을 어떻게 마운트하나요?</summary>
  
  클라우드 스토리지 사용자는 먼저 Alist, alist-strm, NetMount 등의 도구를 사용하여 클라우드 스토리지 파일을 로컬 .strm 파일로 마운트한 다음, 이를 애플리케이션에 마운트하면 됩니다.
  
  스캔 설정에서 미디어 식별 유형을 `strm`으로 설정하면 로컬 .strm 파일을 스캔할 수 있습니다.
</details>

<details>
  <summary>🌍 시간대가 맞지 않거나 시스템 시간이 잘못되었습니까?</summary>
  
  일반적으로 애플리케이션의 시간대와 서버의 시간대가 일치하지 않기 때문입니다. 시간대 설정이 올바른지 확인하세요.
  
  - TZ 환경 변수를 설정한 경우 올바른 시간대로 설정되어 있는지 확인하세요
  - 네트워크 프록시를 사용하는 경우 프록시 서버의 시간대가 서버와 일치하는지 확인하세요
  - Docker로 배포하는 경우 컨테이너의 시간대 설정이 올바른지 확인하세요
  
  시간대 자동 감지를 사용하려면 인터넷에 접속할 수 있어야 합니다.
  
  프록시 네트워크를 사용하는 경우 suning.com, taobao.com, meituan.com 같은 국내 사이트는 피하세요.
</details>

<details>
  <summary>🔌 [Metatube] 404 (찾을 수 없음)</summary>
  
  MetaTube 플러그인의 서버 주소가 올바르게 설정되었는지 확인하세요. 사용자 정의 도메인을 사용하는 경우 도메인 해결이 올바른지 확인하세요. 리버스 프록시를 사용하는 경우 프록시 설정이 올바른지 확인하세요. MetaTube 컨테이너 로그에 오류가 없는지도 확인하세요.
  
  [MetaTube 플러그인 설정 문서](https://ammds.lifebus.top/guide/plugins/metatube/)를 참고하세요.
</details>
