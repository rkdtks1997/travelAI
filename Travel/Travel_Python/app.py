# Travel에 사용될 라이브러리
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app)

# 구글 Gemini API Key
GOOGLE_API_KEY = "AIzaSyBrrCqK-trbfwk90p4V0HKNSdUM2V5L_ZY"

genai.configure(api_key=GOOGLE_API_KEY)

# Gemini 모델 인스턴스 생성
chat_model = genai.GenerativeModel(model_name="models/gemini-1.5-flash")

system_prompt = (
    "1. 넌 여행 전문가야, 말투도 친절하고 전문적인 톤을 유지해야되고, 맞춤법도 잘 맞춰야돼. "
    "2. 선호 국가나 일정 등 추가 정보를 물어보는 등 맥락에 따른 응대를 시켜야 돼. "
    "3. 답변을 1. 2. 3. 과 같이 번호를 매겨 작성하고, 각 항목은 줄바꿈으로 구분해줘. "
    "4. 일정이나 계획을 짜는건 번호를 메겨서 한눈에 정리가 잘 되도록 정보를 잘 정리해줘. "
    "5.기본 응답언어는 한국어고, 유창하게 답변해, 다른 언어로도 질문할 경우 전문적으로 대응해줘. "
    "6.이제부터 사용자가 대화를 시작할거야. 대화를 시작해. "
)

# Msg받고 Gemini에 질문 던지기
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    
    if not user_message:
        return jsonify({"error": "메시지를 입력해주세요."}), 400

    # 시스템 프롬프트와 사용자 메시지 결합
    prompt = f"{system_prompt}\n질문: {user_message}"

    try:
        response = chat_model.generate_content(prompt)
        answer = response.text.strip()
        return jsonify({"reply": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
