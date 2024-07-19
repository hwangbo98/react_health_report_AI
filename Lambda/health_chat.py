import json
import os
import boto3
import openai
from datetime import datetime

# DynamoDB 테이블 초기화
# dynamodb = boto3.resource('dynamodb')
# table = dynamodb.Table('ChatHistory')

# OpenAI API 키 설정

def lambda_handler(event, context):
    # 요청 본문(body) 추출
    body = json.loads(event['body'])
    user_input = body.get('user_input')
    role = body.get('role', '헬스 트레이너')
    height = body.get('height')
    weight = body.get('weight')
    age = body.get('age')
    purpose = body.get('purpose')
    total_body_water = body.get('total_body_water')
    protein = body.get('protein')
    minerals = body.get('minerals')
    body_fat_mass = body.get('body_fat_mass')
    skeletal_muscle_mass = body.get('skeletal_muscle_mass')
    date = body.get('date')

    if not user_input:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps({'message': 'user_input은 필수입니다.'})
        }

    # 프롬프트 엔지니어링 예시
    prompt = f"""
    너는 {role}야. 주어진 데이터를 바탕으로 다음 질문에 답변해줘:
    - 사용자의 현재 건강 상태는 어떤가?
    - 사용자의 운동 목적에 맞는 운동 프로그램은 무엇이 좋을까?
    - 사용자의 상태에 맞는 식단 추천도 해줄 수 있을까?

    데이터:
    - 키: {height} cm
    - 몸무게: {weight} kg
    - 나이: {age}
    - 운동 목적: {purpose}
    - 체수분: {total_body_water}%
    - 단백질: {protein}%
    - 무기질: {minerals}%
    - 체지방: {body_fat_mass}%
    - 골격근량: {skeletal_muscle_mass}%
    - 측정 날짜: {date}
    """

    messages = [
        {"role": "system", "content": "너는 헬스 트레이너입니다. 사용자의 건강 데이터를 분석하고 아래 질문에 답변해 주세요:"},
        {"role": "user", "content": prompt}
    ]

    # ChatGPT API 호출
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=512,
        temperature=0
    )

    response_message = response['choices'][0]['message']['content']

    # DynamoDB에 대화 기록 저장
    # table.put_item(Item={
    #     'user_id': 'user_id',  # 사용자의 고유 ID나 이름을 여기에 넣으세요.
    #     'timestamp': datetime.utcnow().isoformat() + 'Z',
    #     'response': response_message,
    #     'user_input': user_input,
    #     'height': height,
    #     'weight': weight,
    #     'age': age,
    #     'purpose': purpose,
    #     'total_body_water': total_body_water,
    #     'protein': protein,
    #     'minerals': minerals,
    #     'body_fat_mass': body_fat_mass,
    #     'skeletal_muscle_mass': skeletal_muscle_mass,
    #     'date': date
    # })

    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps({"response": response_message})
    }