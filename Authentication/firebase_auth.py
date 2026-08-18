# Authentication/firebase_auth.py

import os

import firebase_admin
from firebase_admin import credentials, auth


# Initialize Firebase Admin SDK only once
if not firebase_admin._apps:
    credential_path = os.path.join(
        os.path.dirname(os.path.dirname(__file__)),
        "firebase-service-account.json"
    )

    cred = credentials.Certificate(credential_path)

    firebase_admin.initialize_app(cred)


def verify_firebase_token(id_token: str):
    """
    Verifies a Firebase ID token and returns
    the trusted decoded token data.
    """

    try:
        decoded_token = auth.verify_id_token(id_token)

        return decoded_token

    except Exception:
        raise ValueError("Invalid or expired Firebase ID token.")