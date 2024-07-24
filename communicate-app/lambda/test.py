import pymysql

# Azure MySQL 설정
azure_host = 'mysqlletskt.mysql.database.azure.com'
azure_user = 'admin10'
azure_password = 'qlalfqjsgh1!'
azure_db_name = 'mohee'  # 실제 DB 이름으로 변경하세요

try:
    connection = pymysql.connect(
        host=azure_host,
        user=azure_user,
        passwd=azure_password,
        db=azure_db_name,
        connect_timeout=10  # 연결 타임아웃 설정
    )
    print("Azure MySQL 서버에 연결되었습니다.")
    connection.close()
except Exception as e:
    print(f"연결 오류: {e}")