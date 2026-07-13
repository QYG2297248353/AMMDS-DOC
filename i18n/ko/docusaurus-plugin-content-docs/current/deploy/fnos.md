---
sidebar_position: 3
sidebar_label: "飞牛Nas"
---

# 飞牛 FnOS 배포 가이드

飞牛 FnOS는 NAS(홈 스토리지 서버)를 위해 설계된 시스템으로, 베테랑 사용자 팀이 개발했으며 AI 로컬 모델이 내장되어 있습니다. 가정과 기업에서 데이터를 쉽게 관리할 수 있습니다. 아래는 飞牛 FnOS에 AMMDS를 배포하는 방법입니다.

<!-- truncate -->

## 배포 방식

AMMDS는 飞牛 FnOS에서 두 가지 설치 방식을 제공합니다:

- **FPK 오프라인 앱 설치**: 飞牛 FnOS 앱 센터를 통해 수동 설치, 대부분의 사용자에게 적합
- **Docker 설치**: Docker 컨테이너를 통해 배포, 컨테이너에 익숙한 사용자에게 적합

## FPK 오프라인 앱 설치

### 다운로드

![AMMDS FPK 다운로드 페이지](/img/deploy/install-fnos-fpk-00.png)

#### 공식 배포 주소

[AMMDS Offline FnNas GitHub Releases](https://github.com/QYG2297248353/AMMDS-Offline-FnNas/releases)

#### 사용 가능한 설치 패키지

| 파일 이름                  | 타입 | 설명                 |
| ----------------------- | ---- | -------------------- |
| `AMMDS-Offline-FnNas.fpk` | FPK  | AMMDS 오프라인 설치 패키지, 飞牛 FnOS 시스템에 적합 |

#### 다운로드 방식

![AMMDS FPK 다운로드 옵션](/img/deploy/install-fnos-fpk-01.png)

설치 패키지를 로컬 컴퓨터에 다운로드하거나 飞牛 장치에서 직접 다운로드할 수 있습니다.

### 설치 단계

![AMMDS FPK 설치 화면](/img/deploy/install-fnos-fpk-02.png)

1. **설치 시작**

   앱 센터를 열고 왼쪽 아래의 **수동 설치**를 클릭한 후, 다운로드한 FPK 파일을 선택하고 **설치**를 클릭합니다.

![AMMDS FPK 설치 확인](/img/deploy/install-fnos-fpk-03.png)

2. **설치 확인**

   설치 확인 화면에서 **동의**를 클릭하여 설치를 진행합니다.

![AMMDS FPK 라이선스 설명](/img/deploy/install-fnos-fpk-04.png)

3. **라이선스 설명 읽기**

   설치 라이선스 설명을 자세히 읽고 관련 내용을 확인합니다.

![AMMDS FPK 설치 위치 선택](/img/deploy/install-fnos-fpk-05.png)

4. **설치 위치 선택**

   공간이 충분한 디스크를 선택하여 설치합니다.

![AMMDS FPK 관리자 비밀번호 설정](/img/deploy/install-fnos-fpk-06.png)

5. **관리자 비밀번호 설정**

   AMMDS 관리 화면의 로그인 비밀번호를 설정합니다. 강력한 비밀번호를 사용하는 것이 좋습니다.

![AMMDS FPK 접속 포트 설정](/img/deploy/install-fnos-fpk-07.png)

6. **접속 포트 설정**

   AMMDS의 접속 포트를 설정합니다. 기본값은 9523입니다.
   서비스 약관을 읽고 **동의**를 클릭합니다.

![AMMDS FPK 설치 시작](/img/deploy/install-fnos-fpk-08.png)

7. **설치 시작**

   마지막 설치 확인 화면에서 **확인**을 클릭하여 설치를 시작합니다.

![AMMDS FPK 설치 진행](/img/deploy/install-fnos-fpk-09.png)

8. **설치 완료 대기**

   설치 과정 중 진행률 표시줄이 표시됩니다. 잠시 기다리면 됩니다. 오류가 발생하면 메시지에 따라 처리하거나 이전 버전의 FPK 설치 패키지를 시도해 보세요.

![AMMDS FPK 설치 완료](/img/deploy/install-fnos-fpk-10.png)

9. **설치 성공 확인**

   설치가 완료되면 설치된 앱 목록에서 AMMDS를 찾을 수 있습니다.

### 설치 디렉터리

![AMMDS 설치 디렉터리](/img/deploy/install-fnos-fpk-11.png)

파일 관리 → 앱 파일에서 AMMDS의 설치 디렉터리를 찾을 수 있습니다.

## Docker 설치

### 이미지 다운로드

![AMMDS Docker 이미지 검색](/img/deploy/install-fnos-docker-00.png)

1. **이미지 검색**

   Docker 앱을 열고 초기화를 완료한 후, 왼쪽 메뉴의 **이미지 저장소**를 클릭하여 AMMDS 이미지를 검색합니다.

2. **이미지 선택**

   다운로드 수가 가장 많은 이미지를 선택합니다. 전체 이미지 이름은 `qyg2297248353/ammds`입니다.

![AMMDS Docker 이미지 버전 선택](/img/deploy/install-fnos-docker-01.png)

3. **버전 선택**

   기본 버전은 `latest`입니다. 장치가 오래된 경우 `latest` 버전을 지원하지 않을 수 있으며, 태그 끝이 `ol8`인 버전을 선택해야 합니다.

![AMMDS Docker 이미지 다운로드 완료](/img/deploy/install-fnos-docker-02.png)

4. **다운로드 완료 대기**

   로컬 이미지에서 다운로드 진행 상황을 확인할 수 있으며, 다운로드가 완료되면 실행 버튼이 나타납니다.

### 컨테이너 생성 및 설정

![AMMDS Docker 컨테이너 생성](/img/deploy/install-fnos-docker-03.png)

1. **컨테이너 생성**

   **실행** 버튼을 클릭하여 배포를 시작합니다.
   컨테이너 이름은 사용자 정의(예: `ammds`)할 수 있습니다.
   장치 성능에 따라 적절한 리소스를 할당합니다.
   **부팅 시 자동 실행**을 활성화할 수 있습니다.

![AMMDS Docker 포트 설정](/img/deploy/install-fnos-docker-04.png)

2. **포트 설정**

   고급 설정에서 포트 매핑을 설정합니다:
   - 기본 컨테이너 포트는 80(TCP)입니다
   - 접속 포트를 9523(또는 다른 사용 가능한 포트)으로 변경합니다

![AMMDS Docker 스토리지 설정](/img/deploy/install-fnos-docker-05.png)

3. **스토리지 설정**

   데이터 유지를 위해 로컬 디렉터리를 컨테이너에 마운트하는 것이 좋습니다:
   - 기본적으로 飞牛는 임시 스토리지 디렉터리를 생성하지만, 이 디렉터리는 시스템에 의해 정리될 수 있습니다
   - 수동으로 디렉터리를 생성하여 컨테이너에 마운트하는 것이 좋습니다

![AMMDS Docker 정보 확인](/img/deploy/install-fnos-docker-06.png)

4. **설정 확인**

   모든 설정을 확인한 후 **생성 후 시작** 옵션을 선택합니다.

### 실행 및 관리

![AMMDS Docker 컨테이너 실행 상태](/img/deploy/install-fnos-docker-07.png)

1. **실행 상태 확인**

   컨테이너 목록에서 AMMDS가 실행 중인 것을 확인할 수 있습니다. 오른쪽의 세 점을 통해 빠른 작업을 수행할 수 있습니다.

![AMMDS Docker 앱 세부 정보](/img/deploy/install-fnos-docker-08.png)

2. **앱 세부 정보 보기**

   컨테이너를 클릭하여 세부 정보 페이지로 들어가 자세한 정보를 확인합니다.

![AMMDS Docker 실행 로그](/img/deploy/install-fnos-docker-09.png)

3. **실행 로그 보기**

   **로그 보기**를 클릭하여 실행 상태와 다운로드 진행 상황을 확인할 수 있습니다.

   :::info 첫 시작 안내
   처음 설치할 때 시스템이 필요한 리소스 파일을 자동으로 다운로드하므로 시간이 걸립니다. 로그에서 다운로드 진행 상황이 표시됩니다.
   :::

## 설치 완료

![AMMDS 설치 완료 화면](/img/deploy/install-fnos-finish.png)

설치가 완료되면 브라우저를 통해 AMMDS 관리 화면에 접속하여 사용할 수 있습니다.

## 고급 시도

![AMMDS Docker Compose 배포](/img/deploy/install-fnos-compose.png)

Docker Compose(컨테이너 오케스트레이션 도구)에 익숙하다면 Compose 파일을 통해 AMMDS를 배포하여 더 유연한 설정이 가능합니다.

## 경고 및 주의 사항

### 보안 경고

:::danger 중요 보안 안내

- **공식 출처**: 공식 GitHub Releases 페이지에서만 설치 패키지를 다운로드하세요
- **비밀번호 보안**: 강력한 비밀번호를 설정하고 정기적으로 변경하세요
- **포트 보안**: 기본 포트를 변경하여 공격 위험을 줄이세요

:::

### 시스템 요구 사항

:::info 시스템 구성 요구 사항

#### 최소 구성

- 운영 체제: 飞牛 FnOS 최신 버전
- 프로세서: Intel Core i3 또는 동등 성능
- 메모리: 4GB RAM
- 디스크 공간: 최소 10GB 사용 가능 공간
- 네트워크: 광대역 인터넷 연결

#### 권장 구성

- 운영 체제: 飞牛 FnOS 최신 버전
- 프로세서: Intel Core i5 또는 동등 성능
- 메모리: 8GB RAM 이상
- 디스크 공간: 20GB 사용 가능 공간
- 네트워크: 안정적인 광대역 인터넷 연결

:::

### 사용 주의 사항

- **데이터 백업**: 정기적으로 설정 파일과 중요한 데이터를 백업하세요
- **리소스 관리**: 디스크 공간을 주의하고 불필요한 파일을 정리하세요
- **네트워크 연결**: 리소스 다운로드 및 업데이트 시 안정적인 네트워크를 유지하세요
- **시스템 유지 관리**: 정기적으로 飞牛 FnOS 시스템을 업데이트하세요

### 문제 해결

#### 일반적인 문제

- **설치 실패**: 디스크 공간과 네트워크 연결을 확인하세요
- **시작 이상**: 실행 로그에서 오류 정보를 확인하세요
- **접속 실패**: 포트 설정과 방화벽 설정을 확인하세요
- **업그레이드 실패**: 이전 버전을 제거한 후 새 버전을 설치해 보세요

#### 연락처

해결할 수 없는 문제는 공식 GitHub 저장소에 Issue를 제출하세요.

## 모범 사례

- **정기 업데이트**: AMMDS를 최신 버전으로 유지하세요
- **합리적 설정**: 장치 성능에 맞게 매개변수를 설정하세요
- **안전한 사용**: 공식 문서에 따라操作하고 핵심 설정 파일을 변경하지 마세요
- **커뮤니티 참여**: 커뮤니티에 참여하여 경험을 공유하고 문제를 피드백하세요
