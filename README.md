# Find Issue

> React Typescript  
> react-router-dom  
> Electron  
> Vite  
> Zustand

```bash
# 디펜던시 설치
$ yarn install

# 허스키 설치
$ yarn postinstall

# 로컬 개발환경 실행
$ yarn dev

# 빌드
$ yarn build
```

---

### `public`

정적 파일이 포함될 디렉토리입니다. php로 작성된 Back-End 코드도 포함되어 있습니다.

### `src/components`

컴포넌트 웹 프로그래밍을 위한 컴포넌트 디렉토리입니다.

### `src/routes`

라우터가 포함된 디렉토리입니다. 라우터 설정은 src/main.tsx에 작성되어 있습니다.

### `src/hooks`

개발에 유용한 커스텀 훅이 선언되어 있습니다.

### `src/types`

프로젝트 공통 타입이 선언되어 있습니다.

### `src/stores`

Zustand의 전역 스토어 메소드가 정리되어 있습니다.

### `src/utils`

재사용 가능한 함수가 정리되어 있습니다.

---

## 코드 스타일

### `commitlint`

```
feat        새로운 기능을 제공합니다.
fix         버그 수정.
docs        문서만 변경됩니다.
style       코드 작동에 영향을 미치지 않는 스타일 변경(빈 공간, 코드 포멧팅, 누락된 세미콜론 등)
refactor    버그를 수정하거나 기능을 추가하지 않는 코드 변경입니다.
test        테스트 코드를 추가하거나 기존 테스트 코드를 수정합니다.
chore       빌드 프로세스 또는 보조 도구 및 라이브러리(예: 문서 생성)에 대한 변경 사항.
perf        성능을 향상시키는 코드 변경입니다.
ci          CI 구성 파일 및 스크립트의 변경 사항.
build       빌드 시스템 또는 외부 디펜던시에 영향을 미치는 변경 사항(예: gulp, broccli, npm).
temp        변경사항에 포함되지 않는 임시 커밋입니다.
```
