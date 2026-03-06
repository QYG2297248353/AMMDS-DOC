---
sidebar_position: 1
sidebar_label: "Metatube"
---

# Metatube

MetaTube는 Jellyfin、Emby 및 Plex를 위해 설계된 오픈 소스 미디어 메타데이터 스크래핑 플러그인 백엔드로，주로 영화 정보(포스터、소개、배우、제작 스튜디오、평점 등)를 자동으로 가져오는 데 사용됩니다. 이 플러그인은 중국어 자원 인식률이 낮은 문제를 효과적으로 해결하고，자체 API를 통해 고정밀 미디어 라이브러리「포스터 벽」관리를 구현합니다.

<!-- truncate -->

## 특징

MetaTube 플러그인은 다음과 같은 핵심 특징을 가지고 있습니다：

- 🎯 **고정밀 인식**：중국어 자원에 최적화된 인식 알고리즘으로 인식 성공률을 크게 향상시킵니다.
- 🌍 **멀티 플랫폼 지원**：Jellyfin、Emby、Plex 등 주요 미디어 서버와 호환됩니다.
- 📦 **이중 서비스 모드**：원격 배포 및 내장 서비스 두 가지 실행 모드를 지원합니다.
- 🔐 **안전한 인증**：TOKEN 메커니즘을 통해 서비스 접근 보안을 보장합니다.
- 🌐 **다중 배포 옵션**：Docker 로컬 배포 및 Koyeb 클라우드 서비스 배포를 지원합니다.
- 📝 **자동 번역**：다중 번역 서비스를 내장하여 메타데이터 자동 번역을 지원합니다.
- 🎭 **풍부한 데이터 소스**：여러 배우 및 영화 데이터 공급자를 통합합니다.

## 배포 옵션

MetaTube는 여러 배포 방법을 지원합니다. 실제 요구 사항에 따라 가장 적합한 옵션을 선택할 수 있습니다：

### 자체 배포 옵션

:::info 공식 문서
자세한 배포 문서는 [MetaTube 공식 문서](https://metatube-community.github.io/)를 참조하십시오.
:::

#### Docker 배포

**배포 명령**：

```bash
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

**업그레이드 작업**：

```bash
docker stop metatube
docker rm metatube
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

#### Docker Compose 배포

**설정 파일 생성**：

```bash
vi docker-compose.yml
```

**설정 내용**：

```yaml
services:
  metatube-server:
    image: ghcr.io/metatube-community/metatube-server:latest
    container_name: metatube
    restart: always
    network_mode: bridge
    ports:
      - 8080:8080
    environment:
      - HTTP_PROXY=${HTTP_PROXY:-}
      - HTTPS_PROXY=${HTTPS_PROXY:-}
      - DB_AUTO_MIGRATE=true
      - PORT=8080
```

**서비스 시작**：

```bash
docker-compose up -d
```

**서비스 업그레이드**：

```bash
docker-compose up -d --force-recreate
```

#### 접근 토큰 설정

배포가 완료되면，후속 설정에 사용할 다음 정보를 기록하십시오：

- **접근 주소**：일반적으로 배포 호스트의 IP 주소에 8080 포트를 추가한 것，예：`http://192.168.1.100:8080`
- **TOKEN**：서비스 인증에 사용되는 32자 문자열，랜덤으로 생성하는 것을 권장합니다.

**랜덤 TOKEN 생성**：

```bash
openssl rand -hex 16
```

**TOKEN 설정**：

#### Docker 명령 설정

```bash
docker run -d -p 8080:8080 -v $PWD/config:/config --name metatube -e TOKEN=your_token ghcr.io/metatube-community/metatube-server:latest -dsn /config/metatube.db
```

#### Docker Compose 설정

```yaml
services:
  metatube-server:
    environment:
      - TOKEN=your_token
```

### Koyeb 배포 옵션

Koyeb는 서버리스 환경의 사용자에게 적합한 편리한 클라우드 서비스 배포 옵션을 제공합니다：

:::info 계정 준비
배포 전에 Koyeb 계정을 등록해야 합니다. 무료 계정으로 기본 요구 사항을 충족할 수 있습니다.
:::

#### 빠른 배포

다음 버튼을 클릭하여 빠른 배포를 시작하십시오：

[![Deploy to Koyeb](https://www.koyeb.com/static/images/deploy/button.svg)](https://app.koyeb.com/deploy?name=metatube-ms&type=docker&image=ghcr.io/metatube-community/metatube-server:latest&instance_type=free&regions=was&instances_min=0&autoscaling_sleep_idle_delay=300&env[MT_PROVIDER_MADOUQU__PRIORITY]=1000&env[MT_PROVIDER_MODELMEDIAASIA__PRIORITY]=1000&env[PORT]=3000&ports=3000;http;/&hc_protocol[3000]=tcp&hc_grace_period[3000]=5&hc_interval[3000]=30&hc_restart_limit[3000]=3&hc_timeout[3000]=5&hc_path[3000]=/)

**배포 단계**：
1. Koyeb 계정에 로그인
2. 위 버튼을 클릭하여 앱 생성
3. 환경 변수 설정에서 `TOKEN` 추가（랜덤으로 생성된 32자 문자열 사용 권장）
4. 「Deploy」버튼을 클릭하고 배포가 완료될 때까지 기다립니다.

#### 수동 배포

**단계 1：서비스 생성**

![Create service](/img/plugin/metatube-koyeb-01.png)

- Koyeb 콘솔에 로그인하고 왼쪽의「Create service」버튼을 클릭합니다.
- 서비스 유형을「Web service」로 선택
- 배포 방법을「Docker」로 선택

**단계 2：이미지 설정**

![Create service](/img/plugin/metatube-koyeb-02.png)

- 이미지 주소：`ghcr.io/metatube-community/metatube-server:latest`

**단계 3：리전 선택**

![Create service](/img/plugin/metatube-koyeb-03.png)

- 무료 계정은 Washington, DC 리전만 지원
- 더 나은 접근 경험을 얻으려면 일본 또는 미국 리전을 선택하는 것이 좋습니다（유료 계정 필요）

**단계 4：환경 변수 설정**

![Create service](/img/plugin/metatube-koyeb-04.png)

- `PORT`를 `3000`으로 설정
- 미승인 접근을 방지하기 위해 `TOKEN`을 인증 키로 설정

**단계 5：포트 매핑 설정**

![Create service](/img/plugin/metatube-koyeb-05.png)

- 포트 입력：`3000`（환경 변수 `PORT`와 일치시킬 것）
- 프로토콜 선택：`http`
-「Public HTTPS access」에 체크하고 경로를 `/`로 설정

**단계 6：헬스 체크 설정**

![Create service](/img/plugin/metatube-koyeb-06.png)

- 프로토콜 선택：`tcp`
- 포트 입력：`3000`（환경 변수 `PORT`와 일치시킬 것）
- 기타 매개변수는 기본값으로 유지

**단계 7：배포 완료**
「Deploy」버튼을 클릭하고 앱 배포가 완료될 때까지 기다립니다.

#### 배포 완료

![Create service](/img/plugin/metatube-koyeb-07.png)

- Koyeb 콘솔의「Overview」페이지에서 앱 접근 주소를 확인할 수 있습니다.

![Create service](/img/plugin/metatube-koyeb-08.png)

- 이 주소에 접근하여 Metatube 서비스가 정상적으로 응답하는지 확인할 수 있습니다.
- 서비스 접근 주소 형식：`https://xxxx-xxx-xxx.koyeb.app/`（여기서 xxxx-xxx-xxx는 Koyeb가 할당한 앱 이름）

:::tip 중요 정보
후속 AMMDS 플러그인 설정에 사용하기 위해 접근 주소와 TOKEN을 기록하십시오.
:::

## 플러그인 설정

AMMDS 관리 인터페이스에서「통합 애플리케이션」→「메타데이터」→「Metatube」로 진입하여 설정 페이지에 들어갑니다.

### 서비스 모드

MetaTube 플러그인은 두 가지 서비스 모드를 지원합니다：

- **원격 서비스**：외부에 배포된 MetaTube 서비스를 사용
- **내장 서비스**：AMMDS에 내장된 MetaTube 서비스를 사용

:::note 우선 순위 설명
동일한 시간에 한 가지 서비스 모드만 효력이 있습니다. 내장 서비스의 우선 순위가 원격 서비스보다 높습니다.
:::

### 빠른 작업

![Metatube 플러그인 설정](/img/plugin/metatube-01.png)

설정 페이지 오른쪽 상단에는 다음과 같은 빠른 작업이 있습니다：

- **서비스 시작**：내장 Metatube 서비스 시작
- **서비스 중지**：내장 Metatube 서비스 중지
- **서비스 재시작**：내장 Metatube 서비스 재시작
- **설정 새로고침**：설정 항목 새로고침
- **설정 저장**：현재 설정 저장（모든 설정 변경은 이 버튼을 클릭해야 적용됩니다）

### 설정 매개변수

![Metatube 플러그인 설정](/img/plugin/metatube-02.png)

#### 기본 설정

| 매개변수 | 설명 | 기본값 |
|------|------|--------|
| 활성화 상태 | Metatube 플러그인 활성화 여부 제어 | 끄기 |
| 시작 시 자동 시작 | AMMDS 시작 시 내장 Metatube 서비스 자동 시작 여부 제어 | 끄기 |
| 원격 서비스 주소 | Metatube 서비스 접근 주소 | - |

**원격 서비스 주소 예**：
- `https://xxxx-xxx-xxx.koyeb.app`
- `http://192.168.1.100:3000`

:::info 주의 사항
- 원격 서비스 주소는 `/`로 끝나지 않도록 해야 합니다. 그렇지 않으면 접근 경로가 잘못됩니다.
:::

#### 인증 설정

| 매개변수 | 설명 | 기본값 |
|------|------|--------|
| 인증 활성화 | Metatube 서비스 인증 활성화 여부 | 끄기 |
| 토큰 | Metatube 서비스 접근 토큰 | - |

:::warning 인증 설명
Metatube 서비스 배포 시 TOKEN을 설정한 경우，반드시 이 옵션을 활성화하고 올바른 토큰을 입력하십시오.
:::

#### 데이터 소스 설정

- **우선 순위**：데이터 소스의 우선 순위를 설정합니다. 순위가 높은 데이터 소스가 우선적으로 사용됩니다.

#### 번역 설정

![Metatube 플러그인 설정](/img/plugin/metatube-03.png)

| 매개변수 | 설명 | 기본값 |
|------|------|--------|
| 자동 번역 | 자동 번역 서비스 활성화 여부 | 끄기 |
| 번역 서비스 | 번역 서비스 공급자 선택 | - |
| API 키 | 일부 번역 서비스에서 필요한 API 키 | - |

:::info 번역 설명
자동 번역을 활성화하면 제목、설명 등의 필드가 자동으로 번역되고，다른 플러그인의 데이터 소스에도 동일하게 적용됩니다.
:::

### 테스트 모듈

![Metatube 플러그인 테스트](/img/plugin/metatube-04.png)

**빠른 작업**：

- **연결 테스트**：원격 서비스 주소가 도달 가능한지 테스트합니다(네트워크 연결성만 확인하며 서비스 상태는 보장하지 않습니다)
- **내장 애플리케이션 정보**：내장 Metatube 서비스의 애플리케이션 정보(버전 번호、설정 등)표시
- **원격 애플리케이션 정보**：원격 Metatube 서비스의 애플리케이션 정보(버전 번호、설정 등)표시

![Metatube 플러그인 테스트](/img/plugin/metatube-05.png)

**애플리케이션 정보 표시**：

- **기본 정보**：버전 번호、데이터베이스 버전 등을 포함합니다.
- **배우 공급자**：배우 데이터(아바타、기본 정보 등)를 제공하는 데이터 소스
- **영화 공급자**：영화 메타데이터(제목、설명、배우、감독、개봉일 등)를 제공하는 데이터 소스

### 주의 사항

#### 지역 제한

일부 공급자 사이트(DMM 등)는 접근 지역에 엄격한 제한이 있어 데이터 획득 실패를 유발할 수 있습니다.

:::tip 권장
최적의 접근 효과를 얻으려면 일본 또는 미국 지역에 배포하십시오.
:::

#### 프록시 설정

- **내장 서비스**：AMMDS의 프록시 설정을 자동으로 동기화합니다.
- **원격 서비스**：네트워크 접근 문제를 스스로 해결해야 합니다. 서비스가 공급자 사이트에 정상적으로 요청할 수 있는지 확인하십시오.

:::note 프록시 활성화
프록시가 활성화되지 않은 경우，프록시 설정 후 AMMDS 서비스를 재시작하는 것이 좋습니다.
:::

## 자주 묻는 질문

### 서비스에 접근할 수 없음

**문제 해결 단계**：
1. 서비스가 정상적으로 실행 중인지 확인
2. 네트워크 연결이 정상적인지 확인
3. 방화벽이 해당 포트에 대한 접근을 허용하는지 확인
4. TOKEN 설정이 올바른지 확인

### 데이터 획득 실패

**가능한 원인**：
- 네트워크 환경 제한（지역 제한 등）
- 데이터 소스 사이트 일시적 사용 불가
- 서비스 설정 오류

**해결 방법**：
- 배포 지역 변경 시도
- 네트워크 프록시 설정 확인
- 데이터 소스 설정이 올바른지 검증

### 번역 서비스 작동하지 않음

**문제 해결 단계**：
1. 자동 번역 기능이 활성화되어 있는지 확인
2. 번역 서비스 API 키가 올바른지 확인
3. 네트워크 연결이 정상적인지 확인
4. 번역 서비스 공급자 변경 시도
