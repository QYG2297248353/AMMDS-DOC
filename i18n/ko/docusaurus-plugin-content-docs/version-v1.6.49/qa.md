---
sidebar_position: 99
sidebar_label: "자주 묻는 질문"
---

# 자주 묻는 질문

사용 중에 자주 발생하는 문제입니다.

<!-- truncate -->

## 🚀 배포 문제

<details>
  <summary>🔍 로그에 CPU가 x86-64-v2를 지원하지 않는다고 표시됩니까?</summary>
  
  귀하의 장치의 CPU가 너무 오래되었습니다. `ol8` 태그가 붙은 이미지를 선택할 수 있습니다.
</details>

<details>
  <summary>⌛ 처음 배포 후 반응이 없습니까?</summary>
  
  처음 배포할 때 시스템은 필요한 리소스 파일을 다운로드하고 초기화해야 하므로 시간이 걸립니다. 몇 분 기다려 주십시오. 여전히 반응이 없으면 페이지를 새로 고치십시오.
</details>

<details>
  <summary>⏬ 리소스 다운로드가 느립니까?</summary>
  
  리소스 파일이 크기 때문에 다운로드 속도가 느릴 수 있습니다. 다음 방법으로 속도를 높일 수 있습니다:
  - 네트워크 환경을 변경하십시오. 예를 들어 HTTP_PROXY 및 HTTPS_PROXY 환경 변수를 구성하여 네트워크를 가속화하십시오
  - 리소스를 수동으로 다운로드하고 애플리케이션을 다시 시작하십시오
</details>

<details>
  <summary>📁 모니터링 디렉토리 등록에 실패하고 즉시 종료합니까?</summary>
  
  이는 일반적으로 구성 파일 또는 환경 변수가 올바르지 않기 때문입니다. 애플리케이션의 구성 파일이 올바른지 확인하고 환경 변수가 올바르게 설정되었는지 확인하십시오.
  
  다음과 같은 로그가 표시되는 경우:
  ```
  Error creating bean with name 'directoryWatcherService': Instantiation of supplied bean failed
  User limit of inotify instances reached or too many open files
  User limit of inotify watches reached
  ```
  
  시스템의 inotify 인스턴스 제한을 늘려보십시오:
  ```bash
  echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
  echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf
  sudo sysctl -p
  ```
</details>

---

## 💡 사용 문제

<details>
  <summary>🖱️ 메뉴를 클릭했을 때 반응이 없습니까?</summary>
  
  이는 일반적으로 페이지가 일시적으로 멈춘 상태이거나 리소스가 완전히 로드되지 않았기 때문입니다. 페이지를 새로 고치십시오. 문제가 계속되면 브라우저 콘솔에 오류 메시지가 있는지 확인하십시오.
</details>

<details>
  <summary>⚪ 열었을 때 흰 화면이 됩니까?</summary>
  
  이는 일반적으로 네트워크 리소스가 완전히 로드되지 않았기 때문입니다. 페이지를 새로 고치십시오. 문제가 계속되면 브라우저 콘솔에 오류 메시지가 있는지 확인하십시오. 네트워크 연결을 안정적으로 유지하고 네트워크波动을 피하는 것이 좋습니다.
</details>

<details>
  <summary>☁️ 클라우드 스토리지 .strm 파일을 마운트하려면 어떻게 해야 합니까?</summary>
  
  클라우드 스토리지 사용자는 먼저 Alist, alist-strm, NetMount와 같은 도구를 사용하여 클라우드 스토리지 파일을 로컬에서 .strm 파일로 마운트한 다음 이를 애플리케이션에 마운트할 수 있습니다.
  
  스캔 구성에서 미디어 식별 유형을 `strm`으로 추가하여 로컬 .strm 파일을 스캔합니다.
</details>

<details>
  <summary>🌍 시간대 오류, 시스템 시간이 정확하지 않습니까?</summary>
  
  이는 일반적으로 애플리케이션의 시간대와 서버의 시간대가 일치하지 않기 때문입니다. 애플리케이션의 시간대 설정이 올바른지 확인하고 서버의 시간대와 일치하는지 확인하십시오.
  
  - TZ 환경 변수를 구성한 경우 올바른 시간대로 설정하십시오
  - 네트워크 프록시를 사용하는 경우 프록시 서버의 시간대가 서버의 시간대와 일치하는지 확인하십시오
  - Docker를 사용하여 배포하는 경우 Docker 컨테이너의 시간대 설정이 올바른지 확인하십시오
  
  자동 시간대 감지를 실행하려면 인터넷에 액세스할 수 있어야 한다는 점에 유의하십시오.
  
  프록시 네트워크의 경우 suning.com, taobao.com, meituan.com 등의 국내 프록시 도메인 사용을 피하십시오.
</details>

<details>
  <summary>🔌 [Metatube] 404 (찾을 수 없음)</summary>
  
  MetaTube 플러그인의 서버 주소가 올바르게 구성되었는지 확인하십시오. 사용자 지정 도메인을 사용하는 경우 도메인 해결이 올바른지 확인하십시오. 리버스 프록시를 사용하는 경우 리버스 프록시 구성이 올바른지 확인하십시오. MetaTube 컨테이너 로그가 정상적인지 확인하고 오류 메시지가 없는지 확인하십시오.
  
  [MetaTube 플러그인 구성 문서](https://ammds.lifebus.top/guide/plugins/metatube/)를 참조하십시오.
</details>