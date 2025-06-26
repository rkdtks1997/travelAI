# 🗺️ Travel AI - 여행 AI 전문가

카카오톡 스타일의 여행 AI 전문가와 대화하는 웹 애플리케이션입니다. Google Gemini AI를 활용하여 여행 관련 질문에 전문적이고 친절한 답변을 제공합니다.

## ✨ 주요 기능

### 🤖 AI 여행 전문가
- **전문적인 여행 상담**: 여행 일정, 관광지, 맛집, 교통, 숙소 등 모든 여행 관련 질문에 답변
- **친절한 대화**: 초보자도 이해하기 쉬운 친절하고 구체적인 답변
- **실시간 요약**: 대화 내용을 AI가 자동으로 요약하여 제공

### 💬 카카오톡 스타일 인터페이스
- **대화방 목록**: 여러 여행 주제별로 대화방 관리
- **실시간 채팅**: 실시간으로 AI와 대화 가능
- **핸드폰 UI**: 모바일 친화적인 핸드폰 스타일 디자인
- **읽지 않은 메시지**: 새로운 메시지 알림 기능

### 🎯 사용자 경험
- **직관적인 네비게이션**: 뒤로가기, 메뉴 버튼 등 친숙한 UI
- **반응형 디자인**: 다양한 화면 크기에 최적화
- **로컬 저장**: 대화방 목록과 대화 내용 자동 저장

## 🛠️ 기술 스택

### Frontend
- **React.js**: 사용자 인터페이스 구축
- **CSS3**: 핸드폰 스타일 UI 구현
- **JavaScript ES6+**: 모던 자바스크립트 기능 활용

### Backend
- **Python Flask**: RESTful API 서버
- **Google Gemini AI**: 자연어 처리 및 AI 응답 생성
- **Flask-CORS**: 크로스 오리진 리소스 공유 지원

### 데이터 관리
- **LocalStorage**: 클라이언트 사이드 데이터 저장
- **JSON**: 데이터 직렬화 및 전송

## 📦 설치 및 실행

### 1. 저장소 클론
```bash
git clone https://github.com/rkdtks1997/travelAI.git
cd travelAI
```

### 2. Backend 설정 (Python Flask)
```bash
cd Travel/Travel_Python

# 필요한 패키지 설치
pip install flask flask-cors google-generativeai

# Flask 서버 실행
python app.py
```

### 3. Frontend 설정 (React)
```bash
cd Travel/Travel_js/travel

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

### 4. 환경 변수 설정
Google Gemini API 키를 설정해야 합니다:

```python
# Travel/Travel_Python/app.py
GOOGLE_API_KEY = "your_google_gemini_api_key_here"
```

## 🚀 사용 방법

### 1. 앱 시작
- 브라우저에서 `http://localhost:3000` 접속
- 초기 대화방 목록 확인

### 2. 대화방 선택
- 기존 대화방 클릭 또는 새 대화방 생성
- 여행 관련 질문 입력

### 3. AI와 대화
- 질문 입력 후 전송 버튼 클릭
- AI의 전문적인 답변 확인
- 메뉴 버튼으로 대화 요약 확인

### 4. 대화방 관리
- 뒤로가기 버튼으로 목록으로 복귀
- 대화방 삭제 기능 활용

## 📱 주요 화면

### 대화방 목록
- 도쿄 여행 계획
- 파리 맛집 추천  
- 제주도 3박4일
- 새로운 여행 (생성 가능)

### 채팅 화면
- 실시간 대화 인터페이스
- 사용자/AI 메시지 구분
- 요약 기능 모달

## 🔧 프로젝트 구조

```
travelAI/
├── Travel/
│   ├── Travel_Python/
│   │   └── app.py              # Flask 백엔드 서버
│   └── Travel_js/
│       └── travel/
│           ├── src/
│           │   ├── App.js      # 메인 앱 컴포넌트
│           │   ├── components/
│           │   │   ├── chat/   # 채팅 컴포넌트
│           │   │   └── listView/ # 대화방 목록 컴포넌트
│           │   └── util/
│           │       └── buttonUtil.js # 유틸리티 함수
│           └── README.md
```

## 🎨 UI/UX 특징

### 핸드폰 스타일 디자인
- 둥근 모서리와 그림자 효과
- 모바일 친화적인 버튼 크기
- 직관적인 아이콘 사용

### 카카오톡 스타일 인터페이스
- 대화방 목록과 채팅 화면 분리
- 읽지 않은 메시지 카운트
- 시간 표시 (방금 전, 1시간 전 등)

### 반응형 디자인
- 데스크톱: 핸드폰 모양의 앱 창
- 모바일: 전체 화면 활용

## 🔒 보안 및 개인정보

- 모든 대화 내용은 로컬에만 저장
- Google Gemini API 키는 환경 변수로 관리 권장
- 개인정보 수집하지 않음

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요.

---

**Travel AI** - AI와 함께하는 스마트한 여행 계획 🗺️✈️
