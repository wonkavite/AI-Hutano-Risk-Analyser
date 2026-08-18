import os

import firebase_admin
from firebase_admin import credentials, auth


# --------------------------------------------------
# Firebase Admin SDK initialization
# --------------------------------------------------

if not firebase_admin._apps:

    credential_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH")

    if not credential_path:
        if os.getenv("RENDER"):
            credential_path = "/etc/secrets/firebase-service-account.json"
        else:
            credential_path = "firebase-service-account.json"

    cred = credentials.Certificate(credential_path)

    firebase_admin.initialize_app(cred)


# --------------------------------------------------
# Firebase token verification
# --------------------------------------------------

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