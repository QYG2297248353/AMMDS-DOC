---
title: 자주 쓰는 인터페이스 한눈에 보기
sidebar_label: 엔드포인트 목록
description: 자주 쓰는 오픈 API를 한 장의 표로 모았습니다. 주소, 쓰임새, 필요한 값, 돌아오는 것과 함께 요청 예시와 항목 설명을 담았습니다.
sidebar_position: 2
---

# 자주 쓰는 인터페이스 한눈에 보기

이 페이지는 자주 쓰는 오픈 API를 한 장에 모은 것입니다. 주소, 무엇에 쓰는지, 어떤 값이 필요한지, 무엇이 돌아오는지를 나란히 적었습니다. 주소와 값은 모두 현재 버전에 실제로 있는 것입니다.

공통 규칙(돌아오는 내용의 생김새, 상태 코드, 날짜 형식)은 [요청과 응답 읽는 법](./conventions.md)에 있습니다.

## 먼저 말부터 정리합니다

> **인터페이스 / API**: AMMDS가 밖으로 열어 둔 문입니다. 주소 하나가 인터페이스 하나입니다.

> **요청**: 프로그램이 AMMDS에 보내는 '이걸 원한다'는 물음입니다.

> **응답**: AMMDS가 돌려보내는 내용 묶음입니다.

> **JSON**: 그 내용의 형식으로, '항목 이름'과 '값'이 짝을 이룹니다.

## 한눈에 보기

아래 주소에는 모두 앞에 `http://<호스트>:<포트>`를 붙이고 헤더에 `x-api-key`를 넣으세요(첫 줄은 제외).

| 방식 | 주소 | 무엇에 쓰나 | 필요한 값 | 돌아오는 것 |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/health/check` | 서비스가 살아 있는지 확인 | 없음. 열쇠도 불필요 | `data`는 늘 `true` |
| POST | `/api/v1/movie/import` | 작품 넣기. 그림은 파일로 올림 | 양식 항목. 뜻은 간단 넣기와 같음. 여러 값은 배열을 문자열로 | `data`는 `true` 또는 `false` |
| POST | `/api/v1/movie/import/quick` | 간단 넣기. 그림은 링크로 | `uniqueid`, `originalTitle` 필수. 나머지는 아래 표 | `data`는 `true` 또는 `false` |
| POST | `/api/v1/movie/import/from-source` | 출처와 그 출처의 ID로 바로 넣기 | `source`, `id` 필수. `provider` 선택 | `data`는 넣은 뒤의 작품 ID |
| GET | `/api/v1/movie/{id}` | 작품 하나의 상세 정보 | 경로의 `id`는 작품의 기본 키 | 전체 자료. 없으면 '작품이 없습니다' |
| GET | `/api/v1/movie/count` | 작품 개수 | 없음 | `data`는 숫자. 예: `1286` |
| POST | `/api/v1/movie/lookup` | 번호나 파일 지문으로 로컬 작품 대조 | `number`, `pHash`, `osHash` 중 하나 이상 | 맞으면 `data`가 작품 ID, 아니면 `null` |
| POST | `/api/v1/movie/search` | 여러 출처를 한꺼번에 검색 | `keyword` 필수, `waitTime` 선택 | `data`는 자료 목록 |
| POST | `/api/v1/translate/language/identify` | 글이 무슨 언어인지 알아내기 | `text` 필수 | `data`에 언어 코드와 이름 |
| POST | `/api/v1/translate/text` | 글을 다른 언어로 번역하기 | `text`, `target` 필수. `source`, `provider` 선택 | `data`에 원문, 번역문, 엔진 정보 |

:::note[만화용은 이 표에 없습니다]
만화 리더용은 `/api/mihon`으로 시작하는 별도의 주소이고, 열쇠 종류도 다릅니다. 그쪽은 '만화 리더로 만화 보기'에서 다룹니다.
:::

## 상태 확인

열쇠가 필요 없고, 프로그램이 도는지 확인하는 데 씁니다.

```bash
curl -s http://127.0.0.1:8080/api/v1/health/check
```

```json
{
  "code": 200,
  "message": "success",
  "data": true,
  "timestamp": 1753958400000
}
```

프로그램이 돌고 있다는 것만 알려 주고, 데이터베이스·디스크·외부 서비스는 보지 않습니다. 확인 간격은 30초에서 60초가 알맞습니다.

## 간단 넣기

`POST /api/v1/movie/import/quick`. 헤더에 `Content-Type: application/json`을 넣습니다.

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| `uniqueid` | 예 | 번호. 고유 식별자로 쓰이고, 두 번 넣어도 두 건이 되지 않습니다 |
| `originalTitle` | 예 | 원래 제목 |
| `numbers` | 아니오 | 같은 번호의 다른 표기 |
| `titleCn` | 아니오 | 중국어 제목 |
| `plot` / `plotCn` | 아니오 | 줄거리 / 중국어 줄거리 |
| `rating` | 아니오 | 평점. 10점 만점 |
| `premiered` | 아니오 | 발매일. `yyyy-MM-dd`로 적기 |
| `runtime` | 아니오 | 길이. 단위는 분 |
| `language` / `country` | 아니오 | 언어 / 나라 |
| `mosaic` | 아니오 | 모자이크 여부 |
| `posterUrl` / `fanartUrl` / `thumbUrl` / `extrafanartUrl` | 아니오 | 표지 / 배경 / 작은 그림 / 장면 사진 링크 |
| `genres` / `tags` | 아니오 | 장르 / 태그 |
| `studio` / `issueStudio` | 아니오 | 제작사 / 배급사 |
| `director` | 아니오 | 감독 |
| `favorite` / `subscribe` | 아니오 | 즐겨찾기 / 구독. 생략하면 `false` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/quick \
  -H "x-api-key: <내 열쇠>" \
  -H "Content-Type: application/json" \
  -d '{
    "uniqueid": "ABC-123",
    "originalTitle": "示例标题",
    "titleCn": "示例标题（中文）",
    "plot": "简介",
    "rating": 8.5,
    "premiered": "2025-10-16",
    "runtime": 120,
    "posterUrl": ["https://example.com/poster.jpg"],
    "genres": ["剧情"],
    "tags": ["高清"],
    "studio": ["示例制作商"],
    "favorite": true
  }'
```

```json
{ "code": 200, "message": "success", "data": true, "timestamp": 1753958400000 }
```

넣기가 실패하면 `code`는 `500`, `message`는 '导入失败', `data`는 `false`입니다.

양식 넣기 `/api/v1/movie/import`는 항목 뜻이 완전히 같고, 다른 점이 둘뿐입니다. 그림을 링크가 아니라 **파일**로 올린다는 것, 여러 값을 배열을 문자열로 적어 보낸다는 것입니다. 그림을 이미 갖고 있어 외부 링크에 기대고 싶지 않을 때 씁니다.

## 출처에서 넣기

`POST /api/v1/movie/import/from-source`.

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| `source` | 예 | 출처. 아래 출처 표 참고 |
| `id` | 예 | 그 출처 안에서의 작품 ID |
| `provider` | 아니오 | 출처 안의 구분. 예: `metatube`의 공급자 ID, `theporndb`의 `jav`·`scene`·`movie` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/import/from-source \
  -H "x-api-key: <내 열쇠>" \
  -H "Content-Type: application/json" \
  -d '{"source":"metatube","id":"12345","provider":"jav"}'
```

```json
{ "code": 200, "message": "success", "data": "movie-uuid", "timestamp": 1753958400000 }
```

실패할 때의 `message`는 '导入失败，请检查数据源和参数'입니다.

:::warning[출처를 먼저 켜야 합니다]
이 인터페이스는 해당 플러그인의 기능을 부릅니다. 출처가 플러그인 설정에서 켜져 있지 않거나, 플러그인 자체에 열쇠가 없으면 곧바로 넣기가 실패합니다.
:::

## 작품 상세와 개수

`GET /api/v1/movie/{id}`는 작품 하나의 전체 자료를 돌려줍니다. 경로의 `id`는 작품의 기본 키(문자열)입니다. 없으면 '작품이 없습니다'가 납니다.

`GET /api/v1/movie/count`는 개수를 돌려줍니다.

```json
{ "code": 200, "message": "success", "data": 1286, "timestamp": 1753958400000 }
```

`/count`는 고정 주소라 `/{id}`보다 먼저 적용되며, 작품 ID로 오해되지 않습니다.

## 로컬 대조

`POST /api/v1/movie/lookup`은 번호나 파일 지문으로 라이브러리 안의 작품을 찾습니다.

| 항목 | 설명 |
| --- | --- |
| `number` | 번호 |
| `pHash` | 그림 지문 |
| `osHash` | 파일 OsHash |

셋 중 적어도 하나는 넣으세요. 아무것도 넣지 않으면 곧바로 실패로 돌아옵니다. 맞으면 `data`가 작품 ID, 아니면 `null`입니다.

## 여러 출처 검색

`POST /api/v1/movie/search`.

| 항목 | 필수 | 설명 |
| --- | --- | --- |
| `keyword` | 예 | 번호나 제목 낱말 |
| `waitTime` | 아니오 | 각 출처를 몇 초 기다릴지. 기본값 `60` |

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/movie/search \
  -H "x-api-key: <내 열쇠>" \
  -H "Content-Type: application/json" \
  -d '{"keyword":"ABC-123","waitTime":30}'
```

돌아오는 `data`는 자료 목록이고, 각 항목에 자주 들어 있는 것은 다음과 같습니다.

| 항목 | 설명 |
| --- | --- |
| `source` / `provider` | 출처와 구분. 그대로 `import/from-source`에 넘길 수 있습니다 |
| `id` | 그 출처 안에서의 작품 ID |
| `number` / `title` / `summary` | 번호, 제목, 줄거리 |
| `cover` / `thumb` / `previewImages` | 표지, 작은 그림, 장면 사진 |
| `actors` / `director` / `genres` / `tags` | 출연진, 감독, 장르, 태그 |
| `studio` / `label` / `series` | 제작사, 레이블, 시리즈 |
| `score` / `runtime` / `release` / `mosaic` | 평점, 길이, 발매일, 모자이크 상태 |
| `extras` | 그 출처에만 있는 추가 항목 |

:::note[항목이 비어 있을 수 있습니다]
출처마다 줄 수 있는 정보가 달라서, 못 주는 것은 비어서 옵니다. 비었다고 해서 오류로 다루지 마세요.
:::

## 번역

언어 알아내기:

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/language/identify \
  -H "x-api-key: <내 열쇠>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": { "code": "en", "name": "英语" },
  "timestamp": 1753958400000
}
```

알아낼 수 없으면 `code`가 `unknown`이고, `name`도 `unknown`입니다.

글 번역하기:

```bash
curl -s -X POST http://127.0.0.1:8080/api/v1/translate/text \
  -H "x-api-key: <내 열쇠>" \
  -H "Content-Type: application/json" \
  -d '{"text": "Hello World", "target": "zh"}'
```

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "originalText": "Hello World",
    "originalLanguage": "英语",
    "originalLanguageCode": "en",
    "translateText": "你好世界",
    "translateLanguage": "简体中文",
    "translateLanguageCode": "zh",
    "translateEngine": "百度翻译"
  },
  "timestamp": 1753958400000
}
```

| `data` 안의 항목 | 설명 |
| --- | --- |
| `originalText` | 원문 |
| `originalLanguage` / `originalLanguageCode` | 원문 언어의 이름 / 코드 |
| `translateText` | 번역문 |
| `translateLanguage` / `translateLanguageCode` | 번역될 언어의 이름 / 코드 |
| `translateEngine` | 실제로 쓰인 번역 엔진 |

번역의 `text`와 `target`은 필수입니다. `source`를 비우면 원문 언어를 자동으로 알아내고, `provider`를 비우면 시스템 설정에 따라 자동으로 고릅니다.

`message`와 언어 이름은 서버가 돌려주는 중국어 문구 그대로입니다.

## 출처 이름

`source`에 넣을 수 있는 값은 어떤 플러그인을 켜두었는지에 따라 달라집니다.

| 값 | 플러그인 |
| --- | --- |
| `metatube` | MetaTube |
| `theporndb` | ThePornDB |
| `stashbox` | ThePornDB(StashBox 모드) |
| `fanzadmm` | FANZA DMM |
| `mteamdmm` | M-Team DMM |
| `tmdb` | TMDB |
| `tvdb` | TheTVDB |

검색 결과에는 **켜져 있는** 출처만 나옵니다. 꺼진 출처는 나타나지 않습니다.

## 언어 코드

| 코드 | 언어 |
| --- | --- |
| `zh` | 간체 중국어 |
| `zh-TW` | 번체 중국어 |
| `en` | 영어 |
| `ja` | 일본어 |
| `ko` | 한국어 |

실제로 되는 언어는 번역 엔진에 달려 있습니다. 지원하지 않으면 실패로 돌아오고 `message`에 이유가 적힙니다.

## 설정 항목

| 설정 항목 | 무엇을 넣나 | 넣지 않거나 잘못 넣으면 |
| --- | --- | --- |
| `x-api-key` | 시스템에서 만든 X-API-KEY 열쇠 | 없거나 다르면 `code`가 `401` |
| `Content-Type` | 간단 넣기는 `application/json`, 양식 넣기는 `multipart/form-data` | 잘못 쓰면 본문을 잘못 읽을 수 있습니다 |
| `uniqueid` / `originalTitle` | 간단 넣기에서 필수인 두 항목 | 하나라도 빠지면 넣기가 실패합니다 |
| `source` / `id` | 출처 넣기에서의 출처 이름과 그 안의 ID | 출처가 꺼져 있거나 ID가 다르면 실패합니다 |
| `keyword` | 검색할 번호나 낱말 | 필수. 빼면 검사에서 걸립니다 |
| `number` / `pHash` / `osHash` | 로컬 대조에서는 하나 이상 | 아무것도 넣지 않으면 곧바로 실패합니다 |
| `text` / `target` | 번역할 글과 번역될 언어 코드 | 하나라도 빠지면 검사에서 걸립니다 |

## 잘 안 될 때는

- **검색이 늘 비어 있습니다**: 출처가 하나도 켜져 있지 않습니다. 플러그인 설정에서 하나를 켜고 연결을 시험하세요.
- **넣기의 `data`가 `false`입니다**: 대개 필수 항목이 빠졌거나 그 번호가 이미 있는 것입니다. `uniqueid`와 `originalTitle`을 확인하세요.
- **상세에서 '작품이 없습니다'가 납니다**: ID가 다르거나 작품이 지워졌습니다. 먼저 검색이나 개수로 ID를 확인하세요.
- **로컬 대조가 늘 `null`입니다**: 지문 대조는 넣을 때 기록된 지문에 의지합니다. 기록이 없으면 맞지 않으니 `number`로 시험하세요.
- **번역이 '번역 엔진이 없습니다'라고 합니다**: `provider`에 없는 ID가 들어 있습니다. 비워 두고 자동 선택에 맡기세요.

## 다음에 볼 것

- [요청과 응답 읽는 법](./conventions.md)
