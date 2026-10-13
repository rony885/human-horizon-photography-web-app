# import requests # pyright: ignore[reportMissingModuleSource]
# from django.conf import settings


# def send_sms(phone, message):

#     try:

#         payload = {
#             "phone": phone,
#             "message": message,
#         }

#         headers = {
#             "Authorization": f"Bearer {settings.SMS_API_KEY}",
#             "Content-Type": "application/json",
#         }

#         response = requests.post(
#             settings.SMS_API_URL,
#             json=payload,
#             headers=headers,
#             timeout=15
#         )

#         print("SMS Response:", response.text)

#         return response.ok

#     except Exception as error:

#         print("SMS Error:", error)

#         return False