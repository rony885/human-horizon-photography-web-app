
from decimal import Decimal

import requests
from django.conf import settings


class ShurjoPayError(Exception):
    pass


def get_shurjopay_token():
    url = f"{settings.SHURJOPAY_BASE_URL.rstrip('/')}/get_token"

    response = requests.post(
        url,
        json={
            "username": settings.SHURJOPAY_USERNAME,
            "password": settings.SHURJOPAY_PASSWORD,
        },
        timeout=30,
    )
    response.raise_for_status()

    data = response.json()

    token = data.get("token")
    store_id = data.get("store_id")

    if not token or not store_id:
        raise ShurjoPayError(
            "ShurjoPay did not return a token and store ID."
        )

    return token, store_id


def initiate_payment(order, customer, client_ip):
    token, store_id = get_shurjopay_token()

    # Adapt customer fields and required payload keys to your
    # merchant's current ShurjoPay API documentation.
    payload = {
        "prefix": settings.SHURJOPAY_PREFIX,
        "token": token,
        "store_id": store_id,
        "return_url": settings.SHURJOPAY_RETURN_URL,
        "cancel_url": settings.SHURJOPAY_CANCEL_URL,
        "amount": str(order.grand_total_amount),
        "order_id": order.order_no,
        "currency": order.currency,
        "customer_name": getattr(customer, "name", "") or "Customer",
        "customer_phone": getattr(customer, "phone", "") or "",
        "customer_email": getattr(customer, "eemmaaiill", "") or "",
        "customer_address": "Digital delivery",
        "customer_city": "Dhaka",
        "client_ip": client_ip,
    }

    # url = f"{settings.SHURJOPAY_BASE_URL.rstrip('/')}/secret-pay"

    # response = requests.post(
    #     url,
    #     json=payload,
    #     headers={"Authorization": f"Bearer {token}"},
    #     timeout=30,
    # )
    # response.raise_for_status()

    # data = response.json()
    url = f"{settings.SHURJOPAY_BASE_URL.rstrip('/')}/secret-pay"

    response = requests.post(
        url,
        data=payload,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/json",
        },
        timeout=30,
    )

    response.raise_for_status()
    data = response.json()

    checkout_url = data.get("checkout_url")
    gateway_order_id = data.get("sp_order_id")

    if not checkout_url or not gateway_order_id:
        raise ShurjoPayError(
            "The gateway response did not contain the expected "
            "checkout URL and transaction ID. Check your merchant "
            "API response format."
        )

    return {
        "checkout_url": checkout_url,
        "gateway_order_id": str(gateway_order_id),
    }


def verify_payment(gateway_order_id):
    token, _ = get_shurjopay_token()

    url = f"{settings.SHURJOPAY_BASE_URL.rstrip('/')}/verification"

    response = requests.post(
        url,
        json={"order_id": gateway_order_id},
        headers={"Authorization": f"Bearer {token}"},
        timeout=30,
    )
    response.raise_for_status()

    data = response.json()

    if isinstance(data, list):
        if not data:
            raise ShurjoPayError("No transaction verification result.")
        data = data[0]

    if not isinstance(data, dict):
        raise ShurjoPayError("Unexpected verification response.")

    return data
