# from django.core.mail import send_mail
# from django.conf import settings


# def send_otp_email(user, otp):

#     send_mail(
#         subject="Password Reset OTP",

#         message=(
#             f"Hello {user.name},\n\n"
#             f"Your password reset OTP is: {otp}\n\n"
#             f"This OTP will expire in 5 minutes.\n\n"
#             f"If you did not request this password reset, "
#             f"please ignore this email."
#         ),

#         from_email=settings.DEFAULT_FROM_EMAIL,

#         recipient_list=[
#             user.email
#         ],

#         fail_silently=False,
#     )