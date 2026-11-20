---
title: 백업 패키지 규격
sidebar_label: 백업 패키지 규격
description: 백업 패키지의 완전한 형식 명세 — zip 구성, manifest.json·data.json 항목 정의, 다섯 종류 자료의 항목 표, 그림 대응, 검증과 가져오기 대조 규칙. 직접 스크립트를 쓰거나 AI로 패키지를 만들 때 대조하세요.
sidebar_position: 2
---

# 백업 패키지 규격

이 페이지는 백업 패키지의 **완전한 형식 명세**입니다. 직접 스크립트를 작성하거나 AI로 크롤링 데이터를 패키지로 만드는 사람이 대조합니다. 패키지 안에 무엇이 있는지만 알고 싶다면 먼저 [백업 패키지 구조](./overview.md)를, AI에게 만들게 하려면 [AI 제작 가이드](./ai-guide.md)를 보세요.

허용되는 쓰임새는 한 가지뿐이며, 이 명세대로 만든 패키지만 AMMDS의 "구문 분석 미리보기"에서 **검증 통과**가 되고 정상적으로 가져올 수 있습니다. 끝에 권위 있는 구현과 템플릿 저장소 링크가 있습니다.

## 1. 열 가지 철칙

| # | 규칙 |
| --- | --- |
| 1 | zip **루트**에 `manifest.json`과 `data.json`이 있어야 하며, 하나라도 없으면 전체가 거부된다 |
| 2 | `format`은 항상 `ammds-backup`, `formatVersion`은 항상 `1` |
| 3 | `type`은 `movie` / `actor` / `comic` / `novel` / `tv` 중 하나이며 내용 구조와 일치해야 한다 |
| 4 | `count`는 `data.json` 배열 요소 수와 **정확히 같아야** 한다 |
| 5 | `images/` 아래의 모든 파일을 `manifest.imageFiles`에 `{ref, path, sha256}`으로 등록한다 |
| 6 | `imageFiles[].path`는 `images/`로 시작하고 zip 항목 이름과 **한 글자까지 일치**해야 한다 |
| 7 | `data.json`의 그림 항목 값은 해당 `imageFiles[].ref`와 **완전히 같아야** 한다(대소문자 구분) |
| 8 | `http(s)://` 외부 링크는 `data.json`에**만** 쓰고 `imageFiles`에는 등록하지 **않는다** |
| 9 | 항목 이름은 비어 있거나 `/`로 시작할 수 없고 `\`, `:`, `..` 경로 조각을 포함할 수 없다 |
| 10 | 날짜는 `yyyy-MM-dd`, 열거형은 code만, **정수 항목은 정수로**(`120`는 됨, `120.0`은 해당 항목 가져오기 실패) |

## 2. zip 구성

```
ammds-backup-movie-20260911153000.zip
├── manifest.json              # 필수, 루트
├── data.json                  # 필수, 루트, JSON 배열
└── images/                    # 선택: 그림을 넣을 때만
    └── <항목 키>/             # 항목마다 한 폴더, 식별자를 안전하게 만든 값
        ├── poster_0.jpg       # 평면 그림 항목: <필드>_<순번>.<확장자>
        ├── fanart_0.jpg
        └── pages/             # 만화만: 챕터 페이지 그림
            ├── page00001.jpg
            └── page00002.jpg
```

- 그림이 전혀 없으면 `images/`를 **만들지 말고** `includeImages`는 `false`, `imageFiles`는 `[]`로 둔다.
- zip 항목 이름은 UTF-8을 사용하고, `imageFiles[].path`는 가능한 한 ASCII만 써서 플랫폼별 인코딩 차이를 피한다.
- 한 패키지에는 한 종류의 `type`만 담는다. 영화와 배우를 섞지 않는다.

## 3. manifest.json 항목

| 항목 | 타입 | 필수 | 값 / 설명 |
| --- | --- | --- | --- |
| `format` | string | 예 | 항상 `ammds-backup` |
| `formatVersion` | int | 예 | 항상 `1`, 지원 범위보다 높으면 거부 |
| `type` | string | 예 | `movie` / `actor` / `comic` / `novel` / `tv` |
| `generatedAt` | string | 권장 | 시간대가 붙은 ISO-8601, 예 `2026-09-11T15:30:00+08:00`. 없으면 경고만 |
| `appVersion` | string | 권장 | 패키지를 만든 AMMDS 버전. 없으면 경고만 |
| `includeImages` | boolean | 예 | 그림을 넣었는지. `images/` 존재 여부와 일치해야 한다 |
| `count` | int | 예 | `data.json` 배열 길이와 일치해야 한다 |
| `imageFiles` | array | 예 | 그림 대응 배열, 없으면 `[]` |

`imageFiles[]`의 각 항목:

| 항목 | 타입 | 설명 |
| --- | --- | --- |
| `ref` | string | 그림 참조 키, `data.json`의 값과 **한 글자까지 동일**. 로컬 그림은 `data`로 시작하는のが 관례 |
| `path` | string | zip 안의 상대 경로, `images/`로 시작하고 실제로 있어야 한다 |
| `sha256` | string | 파일 바이트의 SHA-256(64자리 소문자 16진수). 현재는 기록만 하고 가져올 때 검증하지 않지만 올바른 값을 써야 한다 |

예:

```json
{
  "format": "ammds-backup",
  "formatVersion": 1,
  "type": "movie",
  "generatedAt": "2026-09-11T15:30:00+08:00",
  "appVersion": "1.6.80",
  "includeImages": true,
  "count": 1,
  "imageFiles": [
    {
      "ref": "data/images/media/2026/09/ai-001-poster.jpg",
      "path": "images/AI-001/poster_0.jpg",
      "sha256": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
    }
  ]
}
```

## 4. data.json 일반 규칙

1. 최상위는 **JSON 배열** `[ {...}, {...} ]`, 한 요소가 한 건의 자료.
2. 필드 이름은 **카멜케이스**, 예 `originalTitle`, `imagePath`, `fullChapter`.
3. 얻지 못한 필드는 **생략**(또는 `null`). `"알 수 없음"`, `"-"` 같은 자리표시자를 쓰지 않는다.
4. 가져오는 쪽은 **알 수 없는 필드를 무시**한다. 따라서 오타는 데이터 손실을 뜻한다. 표대로 쓴다.
5. 숫자는 엄격: 정수 항목은 정수(`runtime`, `pageCount`, `season`, `episode`, `sequence`, `sort`, `fileSizeByte`, `resolutionWidth`), 평점·키·몸무게 등은 소수(`8.5`).
6. 날짜는 `yyyy-MM-dd` 문자열. 잘못된 형식은 비워진다.
7. 열거형은 code만(7절). 한글 이름을 쓰면 되돌림값이나 빈 값이 된다.
8. 배열인지 단일 값인지 — 가장 흔한 실수:

| 필드 | 종류 | 형태 |
| --- | --- | --- |
| `poster` | movie | 배열 `["data/...jpg"]` |
| `poster` | actor | 단일 값 `"data/...jpg"` |
| `thumb` | actor | 배열 |
| `cover` / `backCover` | comic / novel | 단일 값 |
| `posterHd` / `fanartHd` / `thumbHd` | movie / tv | 단일 값 |
| `poster` / `fanart` / `thumb` / `logo` / `banner` | tv 작품 수준 | 배열 |
| `still` | tv 에피소드 수준 | 단일 값 |

> 가져오는 쪽은 배열 자리에 단일 값을 넣어도 받아들이지만, 항상 표대로 쓴다.

9. `id`, `createdTime`, `updatedTime`, `version`은 쓰지 않는다. 가져올 때 무시되고 기본 키가 다시 생성된다.

## 5. 다섯 종류 자료의 항목 표

기호: `S` 문자열, `S[]` 문자열 배열, `I` 정수, `N` 숫자, `B` 불리언, `O[]` 객체 배열. `★`＝쓰지 않으면 대조·가져오기 실패, `·`＝선택.

### 5.1 movie(영화)

| 항목 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `uniqueid` | S[] | ★ | 식별자/번호 목록, **대조의 주 근거**, 하나 이상(대소문자 무시) |
| `originalTitle` | S | ★ | 원제. ID가 맞지 않을 때 `merge`의 대체 근거 |
| `titleCn` | S | · | 중국어 제목 |
| `plot` / `plotCn` | S | · | 줄거리 / 중국어 줄거리 |
| `tagline` / `outline` | S | · | 태그라인 / 개요 |
| `rating` | N | · | 평점(10점 만점) |
| `premiered` | S | · | 개봉일 `yyyy-MM-dd` |
| `runtime` | I | · | 상영 시간(분) |
| `mpaa` / `language` / `country` | S | · | 등급 / 언어 / 국가 |
| `mosaic` | S | · | 모자이크 유무 |
| `genre` / `tag` / `studio` / `issueStudio` / `director` | S[] | · | 장르 / 태그 / 제작 / 발행 / 감독 |
| `actors` | O[] | · | `[{"name":"이름","role":"역할"}]` |
| `sets` | O[] | · | `[{"name":"시리즈","overview":"설명"}]` |
| `sourceLinks` / `platform` | O[] | · | `[{"platform":"사이트","link":"https://..."}]` |
| `extend` | O[] | · | `[{"key":"k","value":"v"}]` |
| `magnet` | O[] | · | `[{"name":"n","link":"magnet:?...","size":123,"hash":"...","date":1754006400000}]`, `date`는 **밀리초 epoch 정수** |
| `subtitle` | O[] | · | `[{"sid":"..","name":"..","link":"..","language":"zh","extension":"srt","duration":0,"path":""}]` |
| `poster` / `fanart` / `thumb` / `extrafanart` | S[] | · | 포스터 / 배경 / 썸네일 / 장면 사진(배열) |
| `posterHd` / `fanartHd` / `thumbHd` | S | · | 고해상도 그림(단일 값) |
| `trailer` / `dataSource` | S | · | 예고편 URL / 데이터 소스 code |
| `shared` | B | · | 공유 상태 |
| `pHash` / `osHash` / `filePath` | S[] | · | 지문 / 경로 목록 |
| `resolutionWidth` / `resolutionHeight` / `fileSizeByte` | I | · | 해상도 / 크기(크롤링 시 보통 쓰지 않음) |

### 5.2 actor(배우)

| 항목 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `name` | S | ★ | 예명, **대조 근거**, 비울 수 없음 |
| `aliases` / `agency` / `tag` / `style` / `specialFeatures` | S[] | · | 다른 이름 / 소속사 / 태그 / 스타일 / 특징 |
| `gender` | S | · | `male` / `female` / `shemale` |
| `heightCm` / `weightKg` | N | · | 키 / 몸무게 |
| `birthDate` / `debutDate` | S | · | 생년월일 / 데뷔일 `yyyy-MM-dd` |
| `nationality` / `bloodType` / `cupSize` | S | · | 국적 / 혈액형 / 컵 사이즈 |
| `bustChestCm` / `waistCm` / `hipsCm` / `penisCm` | N | · | 신체 치수 |
| `score` | N | · | 평점(10점 만점) |
| `socialLinks` | O[] | · | `[{"platform":"Twitter","link":"https://..."}]` |
| `retired` / `deceased` / `shared` | B | · | 은퇴 / 사망 / 공유 |
| `poster` | S | · | 프로필 사진(단일 값) |
| `thumb` | S[] | · | 포스터(배열) |
| `bio` | S | · | 약력 |
| `extend` / `platform` | O[] | · | movie와 같음 |
| `dataSource` | S | · | 데이터 소스 code |

### 5.3 comic(만화 / 앨범)

| 항목 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `title` | S | ★ | 앨범 이름, 비울 수 없음 |
| `isbn` | S | · | ISBN, **대조 우선 근거**, 있으면 쓴다 |
| `type` | S | · | `comic`(기본) / `album` |
| `cover` / `backCover` | S | · | 표지 / 뒤표지(단일 값) |
| `description` / `notes` / `web` | S | · | 설명 / 메모 / 링크 |
| `season` | I | · | 시즌, 기본 `1` |
| `fullChapter` / `arrange` / `blackAndWhite` | B | · | 전체 화 모드 / 정리됨 / 흑백 |
| `publishDate` | S | · | 출판일 `yyyy-MM-dd` |
| `publisher` / `imprint` / `series` / `genre` | S | · | 출판 정보 |
| `tags` / `characters` / `teams` / `locations` | S[] | · | 태그 / 인물 / 팀 / 장소 |
| `language` | S | · | 기본 `zh` |
| `format` | S | · | `Digital`(기본) / `Print` |
| `manga` | S | · | `Yes`(기본) / `No` / `Unknown` / `YesAndRightToLeft` |
| `ageRating` | S | · | 연령 등급 code, 기본 `Adults Only 18+` |
| `communityRating` | N | · | 커뮤니티 평점 0.0–5.0 |
| `writer` `penciller` `inker` `colorist` `letterer` `coverArtist` `editor` `translator` | S | · | 제작자 |
| `chapters` | O[] | ★ | 챕터 배열, 아래 참조 |

`chapters[]`: `title`(챕터 이름), `episode`(챕터 번호 I), `description`, `pages`(페이지 배열 O[]).
`chapters[].pages[]`: `imagePath`(그림 참조, 넣을 때는 `data/...` 키, 외부 링크는 `http(s)://`), `sequence`(페이지 순서 I). 페이지는 배열 순서대로 1..N으로 다시 만들어지고 `imagePath`가 빈 페지는 건너뛴다.

> `pageCount`, `episodeCount`는 파생 항목이므로 쓰지 않는다(써도 다시 계산된다).

### 5.4 novel(소설)

| 항목 | 타입 | 필수 | 설명 |
| --- | --- | --- | --- |
| `title` | S | ★ | 제목. 빈 항목은 건너뛴다 |
| `isbn` | S | · | 제목과 함께 대조 근거 |
| `subtitle` / `author` / `genre` / `publisher` / `publishYear` / `series` | S | · | 서지 정보 |
| `tags` / `category` | S[] | · | 태그 / 분류 |
| `rating` | N | · | 평점 0–10 |
| `description` | S | · | 줄거리 |
| `language` | S | · | 기본 `zh` |
| `pageCount` | I | · | 페이지 수 |
| `cover` / `backCover` | S | · | 표지 / 뒤표지(단일 값) |
| `status` | S | · | 상태 code, 기본 `continue` |
| `chapters` | O[] | ★ | `[{"title":"1장","content":"본문","sort":1}]` |

`title`이 빈 챕터는 건너뛴다. `content`는 일반 텍스트나 HTML 조각이고, 줄바꿈은 `\n`을 쓰고 `\r\n`을 섞지 않는다.

### 5.5 tv(드라마)

> 한 항목 = **한 편의 드라마**이며 한 화가 아니다. 시즌·에피소드·에피소드 파일은 중첩 배열이고, 파일 정보를 최상위에 평면으로 쓰면 안 된다(최상위 `filePath`는 알 수 없는 항목으로 무시된다).

작품 항목: `libraryType`은 고정 `"tv"`(★); `title` 주 제목(★); `tmdbId` / `bgmId` / `tvdbId` / `imdbId` 사이트 ID(대조 제1 근거, 기록을 강력히 권장); `originalTitle` / `titleCn` / `sortTitle` / `showTitle` 제목; `tvMediaType` 구분 code; `plot` / `plotCn` / `outline` / `tagline` 줄거리; `status`는 `Continuing` / `Ended`만; `premiered` 첫 방송일 `yyyy-MM-dd`; `year`(I); `runtime`(I); `rating`(N) / `votes`(I); `mpaa` / `language` / `country`; `genre` / `tag` / `studio` / `countries` / `director` / `credit`(S[]); `poster` / `fanart` / `thumb` / `logo` / `banner`(작품 수준 그림, S[]); `posterHd` / `fanartHd` / `thumbHd`(단일 값).

중첩 배열: `uniqueIds`(`{type, value}`), `actors`(`{name, role, order, thumb}`), `namedSeasons`(`{number, name}`), `seasonPlots`(`{number, plot}`), `seasons`(`{seasonNumber, name, overview, poster, airDate, episodeCount, dataSource, bgmSubjectId, tmdbSeasonId}`, `seasonNumber`가 업무 키, 0은 스페셜), `episodes`(`{seasonNumber, episodeNumber, title, titleCn, plot, airDate, runtime, rating, still, tmdbEpisodeId, ...}`, 시즌 번호 + 회차가 업무 키), `episodeFiles`(`{seasonNumber, episodeNumber, filePath, fileName, partIndex, available, durationSeconds, resolution, width, height, fileSize, ...}`, `fileName` 필수, 없으면 해당 파일 건너뜀), `seasonBindings`(`{seasonNumber, dataSource, sourceSubjectId, bindMode, episodeOffset, episodeCount}`).

> `lastCheckedAt`, `durationSeconds`, `fileSize`는 정수이고, `durationSeconds`의 단위는 밀리초가 아닌 초다.

## 6. 그림 대응

- 그림 항목은 **원래 참조**를 유지한다. `http(s)://`로 시작하면 외부 링크, `data`로 시작하는 상대 경로면 로컬 그림.
- 내보낼 때는 `data`로 시작하고 파일이 실제로 있는 참조만 넣는다. 확장자가 없으면 `.jpg`로 처리한다.
- 패키지 안 경로: 평면 항목은 `images/<안전한 키>/<필드>_<순번>.<ext>`(예 `images/AI-001/poster_0.jpg`), 만화 페이지는 `images/<안전한 키>/pages/page00001.jpg`. 안전화는 `[a-zA-Z0-9_-]` 밖의 문자를 `_`로 바꾸고, 비면 `item_<순번>`을 쓴다.
- 넣은 그림은 모두 `imageFiles`에 등록하고, `ref`는 `data.json` 값과 같게, `sha256`은 파일 바이트의 SHA-256으로 쓴다.
- 외부 링크는 넣지도 고치지도 않는다. 로컬 그림은 가져올 때 새 `data` 경로로 다시 기록되고 내용 기준으로 중복 제거된다.

## 7. 날짜와 열거형

- 날짜: `yyyy-MM-dd` 문자열, 예 `premiered`, `birthDate`, `debutDate`, `publishDate`, `airDate`. 다만 `movie.magnet[].date`와 `episodeFiles[].lastCheckedAt`은 **밀리초 epoch 정수**다.
- 열거형은 code만: `dataSource`는 `official` / `metatube` / `theporndb` / `stashbox` / `fanza_dmm` / `m_team_dmm` / `r18dev` / `thejavdb` / `plugin` / `user` / `local`; `gender`는 `male` / `female` / `shemale`; `bloodType`은 `A` / `B` / `AB` / `O` / `RH+` / `RH-`; 만화 `type`은 `comic` / `album`; `ageRating`은 등급 code(공백이 있을 수 있어 그대로 쓴다); 소설 `status`는 상태 code; 드라마 `dataSource`는 `tmdb_tv` / `bangumi` / `tvdb` / `local` / `plugin` / `user`(영화 도메인과 공유하지 않음); `tvMediaType`은 `anime` / `jp_drama` / `kr_drama` / `cn_drama` / `western_tv` / `documentary` / `variety` / `other`.
- 알 수 없는 열거형은 되돌림값이나 빈 값이 된다. 항목은 들어오지만 데이터는 사라진다.

## 8. 검증: 무엇이 거부되는가

다음 중 하나라도 해당하면 가져오기 전체가 거부되고 **기존 데이터는 전혀 바뀌지 않는다**:

- `format`이 `ammds-backup`이 아님.
- `formatVersion`이 1보다 작거나 지원 버전(현재 1)보다 높음.
- `type`이 비었거나 허용값이 아님. 한 패키지에 여러 종류가 섞임.
- `manifest.json` 또는 `data.json`이 없음.
- `count`와 `data.json`의 실제 항목 수가 다름.
- `imageFiles[].ref`가 빔. `path`가 비었거나 잘못됐거나 `images/`로 시작하지 않거나 zip에 없음.
- 항목 이름이 비었거나 `/`로 시작하거나 `\`, `:`, `..` 경로 조각을 포함.
- `includeImages`가 참인데 `imageFiles`가 비었고 `images/` 파일은 존재.

경고만 나오는 경우: `generatedAt` / `appVersion` 누락, `imageFiles`의 `ref`가 `data.json`에 없음, `path` 중복, 등록되지 않은 그림, 알 수 없는 항목.

## 9. 대조와 충돌 전략

| 종류 | 같은 자료로 보는 근거 |
| --- | --- |
| movie | `uniqueid` 교집합(전각→반각, 소문자, 구분자 제거, tmdb/tvdb/imdb/bgm/douban 접두사 인식 등 정규화 포함) |
| actor | `name`이 정확히 같음. 그 다음 공백 접기 정규화. `Iron Man`과 `Ironman`은 **합치지 않는다** |
| comic | `isbn`이 있으면 우선, 없으면 `title` 대소문자 무시 |
| novel | `title` + `isbn` |
| tv | `tmdbId` → `bgmId` → `tvdbId` → `imdbId`. 사이트 ID가 모두 없으면 `merge`가 제목으로 대체 |

| 전략 | 동작 |
| --- | --- |
| `skip` | 기존은 그대로 두고 새 것만 추가. 대조된 항목은 그림 분석이나 기록도 하지 않음 |
| `overwrite` | 대조된 항목을 패키지 버전으로 통째로 교체하고, 없는 것은 새로 만듦 |
| `merge` | 대조된 항목의 빈 값만 채우고 목록은 중복 없이 합침. movie는 ID 대조 실패 시 제목으로 대체 |

대조되지 않으면 항상 새로 만든다. 한 건 실패하면 건수와 이유를 기록할 뿐 **전체 패키지가 중단되지는 않는다**. 가져온 뒤 파일 이름에는 타임스탬프가 붙어 `ammds-backup-<type>-<밀리초>.zip`이 된다.

## 10. 권위 있는 구현과 템플릿

- **권위 있는 명세와 참고 구현**(소스 저장소 `docs/备份恢复规则/`): https://github.com/QYG2297248353/AMMDS-Docker/tree/master/docs/备份恢复规则 — 의존성 없는 생성 스크립트 `ammds_backup_pack.py`도 같은 폴더에 있다.
- **템플릿 저장소**(여기서 시작하는 것을 권장): https://github.com/QYG2297248353/AMMDS-BackupPackage.git — 빈칸 4개를 채우고 한 마디만 하면 템플릿의 `Rule/AI备份包生成规范.md`와 스크립트가 항목 대응·패키징·자체 검사를 맡는다.

:::note[소스 코드가 권위]
이 페이지는 현재 구현을 기준으로 썼다. 소스 저장소의 설명 문서에는 구현과 다른 과거 내용(예: `extend` 키 이름, 일부 타임스탬프 항목 타입)이 남아 있다. 패키지를 만들 때는 이 페이지의 항목 표와 템플릿의 `Rule/` 규칙을 믿으세요.
:::

## 다음으로 보기

- [백업 패키지 구조](./overview.md)
- [AI 제작 가이드](./ai-guide.md)
- [가이드: 백업과 복원](/docs/backend/system/backup-restore)
