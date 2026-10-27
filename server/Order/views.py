# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from .models import Order
# from .serializers import OrderSerializer, UnpaginateOrderSerializer


# from rest_framework.permissions import IsAuthenticated
# from .models import Order
# from .shurjopay_service import verify_payment
# from django.shortcuts import get_object_or_404

# from decimal import Decimal, InvalidOperation
# from django.utils import timezone

# from pathlib import Path
# from django.utils.text import slugify
# from .models import OrderDetail
# from django.http import FileResponse




# # @api_view(['GET', 'POST'])
# # def order_list_create_view(request):
# #     if request.method == 'GET':
# #         orders = Order.objects.all()
# #         serializer = UnpaginateOrderSerializer(orders, many=True)
# #         return Response(serializer.data)

# #     elif request.method == 'POST':
# #         serializer = OrderSerializer(data=request.data)
# #         if serializer.is_valid():
# #             serializer.save()
# #             return Response(serializer.data, status=status.HTTP_201_CREATED)
# #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# @api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
# def order_list_create_view(request):

#     if request.method == "GET":
#         orders = Order.objects.filter(
#             customer=request.user
#         ).prefetch_related(
#             "order_details__product",
#             "order_details__license",
#         )

#         serializer = UnpaginateOrderSerializer(
#             orders,
#             many=True,
#             context={"request": request},
#         )

#         return Response(serializer.data)

#     serializer = OrderSerializer(
#         data=request.data,
#         context={"request": request},
#     )

#     if serializer.is_valid():
#         order = serializer.save()

#         return Response(
#             UnpaginateOrderSerializer(
#                 order,
#                 context={"request": request},
#             ).data,
#             status=status.HTTP_201_CREATED,
#         )

#     return Response(
#         serializer.errors,
#         status=status.HTTP_400_BAD_REQUEST,
#     )

# @api_view(['GET', 'POST', 'PUT', 'DELETE'])
# def order_detail_view(request, order_id):
#     try:
#         order = Order.objects.get(pk=order_id)
#     except Order.DoesNotExist:
#         return Response({'error': 'Order not found'}, status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = UnpaginateOrderSerializer(order)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = OrderSerializer(order, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         order.delete()
#         return Response({'message': 'Order deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


# @api_view(["GET"])
# @permission_classes([IsAuthenticated])
# def download_product(request, product_id):
#     """
#     Download the original image only if the logged-in customer
#     has purchased the product through a successfully paid order.
#     """

#     # Find a paid order detail belonging to this customer.
#     order_detail = get_object_or_404(
#         OrderDetail.objects.select_related(
#             "order",
#             "product",
#         ).filter(
#             order__customer=request.user,
#             order__payment_status="PAID",
#         ),
#         product_id=product_id,
#     )

#     # Get the purchased product.
#     product = order_detail.product

#     # Make sure the original file exists.
#     if not product.original_image:
#         return Response(
#             {"error": "Original image is not available."},
#             status=status.HTTP_404_NOT_FOUND,
#         )

#     try:
#         # Open the file using its configured storage backend.
#         # This also works with private storage when it supports open().
#         image_file = product.original_image.open("rb")

#     except (OSError, ValueError, FileNotFoundError):
#         return Response(
#             {"error": "Unable to access the original image."},
#             status=status.HTTP_404_NOT_FOUND,
#         )

#     # Build a safe download filename.
#     original_name = Path(product.original_image.name).name
#     extension = Path(original_name).suffix or ".jpg"
#     safe_name = slugify(product.name) or f"product-{product.pk}"
#     download_name = f"{safe_name}{extension}"

#     # Stream the private original file as a download.
#     response = FileResponse(
#         image_file,
#         as_attachment=True,
#         filename=download_name,
#     )

#     response["Cache-Control"] = "private, no-store"
#     response["X-Content-Type-Options"] = "nosniff"

#     return response


# @api_view(["POST"])
# @permission_classes([IsAuthenticated])
# def verify_order_payment(request):
#     order_no = request.data.get("order_no")

#     if not order_no:
#         return Response(
#             {"error": "order_no is required."},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     # Customers can verify only their own orders.
#     order = get_object_or_404(
#         Order,
#         order_no=order_no,
#         customer=request.user,
#     )

#     # Do not verify or charge an already-paid order again.
#     if order.payment_status == "PAID":
#         return Response({
#             "message": "Order is already paid.",
#             "order_no": order.order_no,
#             "payment_status": order.payment_status,
#         })

#     # The initiation endpoint must save ShurjoPay's returned
#     # sp_order_id in this field.
#     if not order.gateway_transaction_id:
#         return Response(
#             {"error": "Payment transaction has not been initialized."},
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     try:
#         # Query ShurjoPay directly from the backend.
#         result = verify_payment(order.gateway_transaction_id)

#         # Some gateway responses are lists containing one result.
#         if isinstance(result, list):
#             if not result:
#                 return Response(
#                     {"error": "No payment verification result returned."},
#                     status=status.HTTP_502_BAD_GATEWAY,
#                 )
#             result = result[0]

#         if not isinstance(result, dict):
#             return Response(
#                 {"error": "Invalid payment verification response."},
#                 status=status.HTTP_502_BAD_GATEWAY,
#             )

#         # IMPORTANT:
#         # Confirm these response field names against your
#         # actual ShurjoPay verification response/documentation.
#         gateway_order_no = (
#             result.get("customer_order_id")
#             or result.get("order_no")
#         )
#         gateway_amount = Decimal(str(result.get("amount", "0")))
#         gateway_currency = str(
#             result.get("currency", "")
#         ).upper()
#         gateway_code = str(result.get("sp_code", ""))
#         gateway_status = str(
#             result.get("transaction_status", "")
#         ).strip().lower()

#     except (InvalidOperation, TypeError, ValueError):
#         return Response(
#             {"error": "Invalid payment data returned by the gateway."},
#             status=status.HTTP_502_BAD_GATEWAY,
#         )
#     except Exception:
#         # Log the real exception server-side in production.
#         return Response(
#             {"error": "Unable to verify payment at this time."},
#             status=status.HTTP_502_BAD_GATEWAY,
#         )

#     # Every check must pass before granting the download.
#     payment_is_valid = (
#         gateway_code == "1000"
#         and gateway_status in {"success", "successful", "paid"}
#         and gateway_order_no == order.order_no
#         and gateway_amount == order.grand_total_amount
#         and gateway_currency == order.currency.upper()
#     )

#     if not payment_is_valid:
#         # Do not mark an order PAID from an unverified response.
#         return Response(
#             {
#                 "message": "Payment has not been confirmed.",
#                 "order_no": order.order_no,
#                 "payment_status": order.payment_status,
#             },
#             status=status.HTTP_400_BAD_REQUEST,
#         )

#     # Save payment success only after all checks pass.
#     order.payment_status = "PAID"
#     order.paid_at = timezone.now()
#     order.save(update_fields=[
#         "payment_status",
#         "paid_at",
#         "updated_at",
#     ])

#     return Response({
#         "message": "Payment verified successfully.",
#         "order_no": order.order_no,
#         "payment_status": order.payment_status,
#         "download_url": f"/order/download/",
#     })





import logging
from pathlib import Path

from django.db import transaction
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Order, OrderDetail
from .serializers import (
    OrderSerializer,
    UnpaginateOrderSerializer,
)
from .shurjopay_service import (
    initiate_payment,
    verify_payment,
    ShurjoPayError,
)


logger = logging.getLogger(__name__)


# COMMON ORDER QUERY
def get_customer_orders(user):
    return (
        Order.objects
        .filter(customer=user)
        .select_related("customer")
        .prefetch_related(
            "order_details__product",
            "order_details__license",
        )
    )


# ORDER LIST & CREATE
# @api_view(["GET", "POST"])
# @permission_classes([IsAuthenticated])
# def order_list_create_view(request):

#     # GET CUSTOMER ORDERS
#     if request.method == "GET":
#         orders = get_customer_orders(request.user)

#         serializer = UnpaginateOrderSerializer(
#             orders,
#             many=True,
#             context={"request": request},
#         )

#         return Response(
#             serializer.data,
#             status=status.HTTP_200_OK,
#         )

#     # CREATE ORDER
#     serializer = OrderSerializer(
#         data=request.data,
#         context={"request": request},
#     )

#     if serializer.is_valid():
#         order = serializer.save()

#         return Response(
#             UnpaginateOrderSerializer(
#                 order,
#                 context={"request": request},
#             ).data,
#             status=status.HTTP_201_CREATED,
#         )

#     return Response(
#         serializer.errors,
#         status=status.HTTP_400_BAD_REQUEST,
#     )

# ORDER LIST & CREATE
@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def order_list_create_view(request):

    # GET ORDER LIST
    if request.method == "GET":
        orders = Order.objects.all().select_related(
            "customer"
        ).prefetch_related(
            "order_details__product",
            "order_details__license",
        )

        serializer = UnpaginateOrderSerializer(
            orders,
            many=True,
            context={"request": request},
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK,
        )

    # CREATE ORDER
    serializer = OrderSerializer(
        data=request.data,
        context={"request": request},
    )

    if serializer.is_valid():
        order = serializer.save()

        return Response(
            UnpaginateOrderSerializer(
                order,
                context={"request": request},
            ).data,
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )

# ORDER DETAIL
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def order_detail_view(request, order_id):

    order = get_object_or_404(
        get_customer_orders(request.user),
        pk=order_id,
    )

    serializer = UnpaginateOrderSerializer(
        order,
        context={"request": request},
    )

    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )


# INITIATE SHURJOPAY PAYMENT
@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def initiate_order_payment(request):

    order_no = request.data.get("order_no")

    if not order_no:
        return Response(
            {"error": "order_no is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    order = get_object_or_404(
        Order.objects.filter(customer=request.user),
        order_no=order_no,
    )

    if order.payment_status == "PAID":
        return Response(
            {"error": "This order has already been paid."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if order.payment_status != "PENDING":
        return Response(
            {"error": "This order is not awaiting payment."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if order.payment_method != "SHURJOPAY":
        return Response(
            {"error": "This order is not using ShurjoPay."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    if order.grand_total_amount <= 0:
        return Response(
            {"error": "The order amount must be greater than zero."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    client_ip = (
        request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip()
        or request.META.get("REMOTE_ADDR", "")
    )

    try:
        payment_data = initiate_payment(
            order=order,
            customer=request.user,
            client_ip=client_ip,
        )

        checkout_url = payment_data.get("checkout_url")

        # Support either key if your service returns one of these.
        gateway_order_id = (
            payment_data.get("sp_order_id")
            or payment_data.get("gateway_order_id")
        )

        if not checkout_url or not gateway_order_id:
            logger.error(
                "ShurjoPay initiation response is missing required fields."
            )
            return Response(
                {"error": "Invalid payment gateway response."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        with transaction.atomic():
            locked_order = Order.objects.select_for_update().get(
                pk=order.pk,
                customer=request.user,
            )

            if locked_order.payment_status != "PENDING":
                return Response(
                    {"error": "The order payment status has changed."},
                    status=status.HTTP_409_CONFLICT,
                )

            locked_order.gateway_transaction_id = str(gateway_order_id)
            locked_order.save(
                update_fields=[
                    "gateway_transaction_id",
                    "updated_at",
                ]
            )

        return Response(
            {
                "message": "Payment initiated successfully.",
                "order_no": order.order_no,
                "transaction_id": str(order.transaction_id),
                "gateway_transaction_id": str(gateway_order_id),
                "amount": str(order.grand_total_amount),
                "currency": order.currency,
                "checkout_url": checkout_url,
            },
            status=status.HTTP_200_OK,
        )

    except ShurjoPayError as exc:
        logger.warning("ShurjoPay initiation failed: %s", exc)
        return Response(
            {"error": "Unable to initiate payment. Please try again."},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    except Exception:
        logger.exception("Unexpected payment initiation error.")
        return Response(
            {"error": "Payment initiation failed."},
            status=status.HTTP_502_BAD_GATEWAY,
        )


# VERIFY SHURJOPAY PAYMENT
@api_view(["POST"])
# @permission_classes([IsAuthenticated])
def verify_order_payment(request):

    order_no = request.data.get("order_no")

    if not order_no:
        return Response(
            {"error": "order_no is required."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    order = get_object_or_404(
        Order.objects.filter(customer=request.user),
        order_no=order_no,
    )

    if order.payment_status == "PAID":
        return Response(
            {
                "message": "Payment has already been verified.",
                "order_no": order.order_no,
                "payment_status": order.payment_status,
                "delivery_status": order.delivery_status,
                "download_urls": get_download_urls(order),
            },
            status=status.HTTP_200_OK,
        )

    if not order.gateway_transaction_id:
        return Response(
            {"error": "No payment transaction was initiated for this order."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    try:
        gateway_response = verify_payment(
            order.gateway_transaction_id
        )

        # ShurjoPay integrations can return a list or an object.
        if isinstance(gateway_response, list):
            if not gateway_response:
                return Response(
                    {"error": "Empty payment verification response."},
                    status=status.HTTP_502_BAD_GATEWAY,
                )
            payment_result = gateway_response[0]
        else:
            payment_result = gateway_response

        if not isinstance(payment_result, dict):
            return Response(
                {"error": "Invalid payment verification response."},
                status=status.HTTP_502_BAD_GATEWAY,
            )

        # These fields must match the actual response from your
        # configured ShurjoPay API.
        merchant_order_no = payment_result.get("customer_order_id")
        gateway_order_id = payment_result.get("order_id")
        gateway_status = str(
            payment_result.get("transaction_status", "")
        ).strip().lower()
        gateway_code = str(
            payment_result.get("sp_code", "")
        ).strip()

        if merchant_order_no != order.order_no:
            return Response(
                {"error": "Payment order reference does not match."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if str(gateway_order_id or "") != str(
            order.gateway_transaction_id
        ):
            return Response(
                {"error": "Gateway transaction ID does not match."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if gateway_status not in {"success", "successful", "paid"}:
            return Response(
                {
                    "message": "Payment has not been confirmed.",
                    "payment_status": order.payment_status,
                    "gateway_status": gateway_status or "UNKNOWN",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Validate amount and currency when the gateway supplies them.
        gateway_amount = payment_result.get("amount")
        gateway_currency = payment_result.get("currency")

        if gateway_amount is not None:
            from decimal import Decimal, InvalidOperation

            try:
                if Decimal(str(gateway_amount)) != order.grand_total_amount:
                    return Response(
                        {"error": "Payment amount does not match the order."},
                        status=status.HTTP_400_BAD_REQUEST,
                    )
            except (InvalidOperation, TypeError, ValueError):
                return Response(
                    {"error": "Invalid payment amount from gateway."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if (
            gateway_currency
            and str(gateway_currency).upper() != order.currency.upper()
        ):
            return Response(
                {"error": "Payment currency does not match the order."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # If your ShurjoPay account uses sp_code, validate the
        # success code according to your actual gateway response.
        if gateway_code and gateway_code != "1000":
            return Response(
                {"error": "The gateway did not return a successful code."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Mark paid only after successful gateway verification.
        with transaction.atomic():
            locked_order = Order.objects.select_for_update().get(
                pk=order.pk,
                customer=request.user,
            )

            if locked_order.payment_status != "PAID":
                locked_order.payment_status = "PAID"
                locked_order.delivery_status = "READY"
                locked_order.paid_at = timezone.now()

                locked_order.save(
                    update_fields=[
                        "payment_status",
                        "delivery_status",
                        "paid_at",
                        "updated_at",
                    ]
                )

        order.refresh_from_db()

        return Response(
            {
                "message": "Payment verified successfully.",
                "order_no": order.order_no,
                "payment_status": order.payment_status,
                "delivery_status": order.delivery_status,
                "download_urls": get_download_urls(order),
            },
            status=status.HTTP_200_OK,
        )

    except ShurjoPayError as exc:
        logger.warning("ShurjoPay verification failed: %s", exc)
        return Response(
            {"error": "Unable to verify payment at this time."},
            status=status.HTTP_502_BAD_GATEWAY,
        )

    except Exception:
        logger.exception("Unexpected payment verification error.")
        return Response(
            {"error": "Payment verification failed."},
            status=status.HTTP_502_BAD_GATEWAY,
        )


# DOWNLOAD URLS FOR PAID ORDERS
def get_download_urls(order):

    if order.payment_status != "PAID":
        return []

    return [
        {
            "product_id": detail.product_id,
            "product_name": detail.product.name,
            "url": f"/download/{detail.product_id}/",
        }
        for detail in order.order_details.select_related("product").all()
    ]


# DOWNLOAD ORIGINAL PRODUCT IMAGE
@api_view(["GET"])
# @permission_classes([IsAuthenticated])
def download_product(request, product_id):

    order_detail = (
        OrderDetail.objects
        .filter(
            order__customer=request.user,
            order__payment_status="PAID",
            product_id=product_id,
        )
        .select_related("product", "order")
        .first()
    )

    if not order_detail:
        return Response(
            {
                "error": (
                    "You do not have a paid order containing this product."
                )
            },
            status=status.HTTP_403_FORBIDDEN,
        )

    product = order_detail.product

    if not product.original_image:
        return Response(
            {"error": "Original image is not available."},
            status=status.HTTP_404_NOT_FOUND,
        )

    try:
        image_file = product.original_image.open("rb")
    except (OSError, ValueError):
        logger.exception(
            "Unable to open original image for product %s.",
            product_id,
        )
        return Response(
            {"error": "Unable to access the original image."},
            status=status.HTTP_404_NOT_FOUND,
        )

    filename = Path(product.original_image.name).name

    response = FileResponse(
        image_file,
        as_attachment=True,
        filename=filename,
    )
    response["Cache-Control"] = "private, no-store"
    return response
