import json
import boto3
import base64
import requests
import os
import openai

BUCKET_NAME = 'inbodytest'  # 버킷 이름
# FILE_NAME = 'inbody_img/YeonHwangbo.JPG'  # 불러올 파일 이름
FILE_NAME = 'inbody_img/Test1.jpg'
KEY = FILE_NAME

# s3 client 객체 생성
s3 = boto3.client('s3')

def lambda_handler(event, context):
    try:
        # S3에서 파일 가져오기
        data = s3.get_object(Bucket=BUCKET_NAME, Key=KEY)
        res = data['Body'].read()
        res = base64.b64encode(res).decode('utf-8')
        
        # 환경 변수에서 OCR API 키와 URL 가져오기
        ocr_api_key = os.environ['OCR_API_KEY']
        ocr_url = os.environ['OCR_URL']
        
        # HTTP -> HTTPS 변경
        
        headers = {
            "Content-Type": "application/json",
            "X-OCR-SECRET": ocr_api_key
        }
        
        payload = {
            "version": "V1",
            "requestId": "sample_id",
            "timestamp": 0,
            "images": [
                {
                    "name": "sample_image",
                    "format": "jpg",
                    "data": res
                }
            ]
        }
        
        # 타임아웃 설정 및 재시도 로직 추가
        response = requests.post(ocr_url, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        
        # OCR 결과 파싱
        ocr_result = response.json()
        extracted_text = ' '.join([field['inferText'] for field in ocr_result['images'][0]['fields']])
        
        # GPT-3.5-turbo를 사용하여 필요한 정보 추출
        openai.api_key = gpt_api_key
        
        gpt_response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": f"다음 텍스트에서 회원번호, 신장, 체중, 나이, 체수분, 단백질, 무기질, 체지방량, 골격근량, 체지방률, 측정날짜를 JSON 형태로 추출해줘. 좀만 정확하게 해줄 수 있을까? 괄호로 적힌 값들은 제외하고, cm, kg 등의 단위는 빼줘 그냥 적힌 값만 가지고 해줘. 측정날짜의 경우에는 yyyy-MM-dd로 표현해줘 : {extracted_text}"}
            ],
            max_tokens=500,
            temperature=0.7
        )
        
        extracted_data = gpt_response.choices[0].message['content'].strip()
        print(extracted_data)
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # CORS 헤더 추가
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({
                'extracted_data': extracted_data
            })
        }
    except requests.exceptions.RequestException as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # CORS 헤더 추가
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'error': f'OCR API error: {str(e)}'})
        }
    except openai.error.OpenAIError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # CORS 헤더 추가
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'error': f'GPT API error: {str(e)}'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Access-Control-Allow-Origin': '*',  # CORS 헤더 추가
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            'body': json.dumps({'error': f'Unexpected error: {str(e)}'})
        }
