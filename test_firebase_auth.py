from Authentication.firebase_auth import verify_firebase_token


firebase_token = input("Paste Firebase ID token: ").strip()

try:
    decoded_token = verify_firebase_token(firebase_token)

    print("\nFirebase token verified successfully!")
    print("UID:", decoded_token.get("uid"))
    print("Email:", decoded_token.get("email"))
    print("Name:", decoded_token.get("name"))

except ValueError as e:
    print("\nFirebase token verification failed:")
    print(e)