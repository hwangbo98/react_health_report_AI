import json
import os
import boto3
import requests

# DynamoDB 테이블 초기화
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('ChatHistory')

# OpenAI API 키 설정
OPENAI_API_KEY = os.environ['OPENAI_API_KEY']


def lambda_handler(event, context):
    user_input = event['queryStringParameters']['user_input']

    # ChatGPT API 호출
    response = requests.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        headers={"Authorization": f"Bearer {OPENAI_API_KEY}"},
        json={
            "prompt": user_input,
            "max_tokens": 150
        }
    )

    response_json = response.json()

    # DynamoDB에 대화 기록 저장
    table.put_item(Item={
        "user_input": user_input,
        "response": response_json
    })

    return {
        'statusCode': 200,
        'body': json.dumps(response_json)
    }
# print(OPENAI_API_KEY)