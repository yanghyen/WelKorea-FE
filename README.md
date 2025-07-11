# 📄 Wel Korea 기능 명세서 (Feature Specification Document)
## 1. 📌 개요

**프로젝트명**: Wel Korea  
**목표**: 한국을 방문하거나 거주 중인 외국인을 위한 생활 밀착형 지도 앱 제공  
**주요 기능**:
- 영어 키워드로 장소 검색 (자동 번역 포함)
- 지도 기반 장소 표시 및 경로 안내
- 즐겨찾기 저장
- 사용자 친화적 UI 및 다국어 지원

---

## 2. 🧭 핵심 기능 목록 (MVP)

| 번호 | 기능명 | 설명 | 프론트 | 백엔드/API | DB |
|------|--------|------|---------|--------------|----|
| 1 | **현재 위치 표시** | 사용자의 현재 위치를 지도에 표시하고 지도 중심 설정 | Geolocation API, 지도 SDK | - | - |
| 2 | **영어 검색어 → 번역 → 장소 검색** | 영어 키워드로 장소 검색 → 실패 시 번역 → 재검색 | 검색창 입력, 결과 리스트 | FastAPI + Papago API → 지도 API 호출 | 번역 캐시 테이블 (선택) |
| 3 | **지도에 검색 결과 표시** | 검색된 장소를 지도에 마커로 표시 | 지도 SDK 마커, 리스트 클릭 → 지도 이동 | - | - |
| 4 | **검색 결과 리스트 번역** | 한글 장소명을 영어로 번역하여 리스트에 표시 | 결과 번역 표시 | Papago 또는 Google Translate API | 캐시 (선택) |
| 5 | **경로 안내 (도보/자동차)** | 사용자가 선택한 장소까지 경로 표시 | 경로 보기 버튼, 지도 경로 표시 | FastAPI → Naver Directions API 호출 | - |
| 6 | **즐겨찾기 저장** | 장소를 즐겨찾기로 저장 및 로딩 | 즐겨찾기 버튼, 마이리스트 | FastAPI → POST/GET | OracleDB에 저장 |
| 7 | **검색 캐시 저장** | 자주 번역된 키워드는 DB에 저장하여 번역 생략 | - | 캐시 조회 후 Papago 호출 | OracleDB (translation_cache) |

---

## 3. 🛠 사용 기술 스택

| 영역 | 사용 기술 |
|------|------------|
| 프론트엔드 | React Vite, jQuery, Kakao/Naver Map JS SDK |
| 백엔드 | FastAPI (Python), Papago API, Naver Maps API |
| 데이터베이스 | OracleDB |
| 실시간 통신 (확장 기능) | Node.js + WebSocket |
| 배포 | Docker, GitHub Actions (옵션) |

---

## 4. 🧩 확장 기능 목록 (향후)

| 기능 | 설명 | 필요 기술 |
|------|------|------------|
| 다국어 지원 | UI 언어를 영어/한국어 등으로 변경 가능 | React i18n |
| 실시간 공유 루트 | 여러 사용자가 동시에 경로를 짜고 공유 | WebSocket + Node.js |
| 음성 안내 | 길찾기 경로를 음성으로 안내 | Web Speech API |
| 소셜 핫플 연동 | X(트위터) 인기 장소 검색 연동 | X API + 검색엔진 크롤링 |
| 사용자별 방문 통계 | 자주 찾는 장소 분석 | FastAPI + DB 통계 |
