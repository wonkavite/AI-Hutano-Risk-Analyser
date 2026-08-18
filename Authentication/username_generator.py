import re


from typing import Optional

def generate_username(
    display_name: Optional[str],
    email: str
) -> str:
    """
    Generates a username suggestion from the Google display name.
    Falls back to the email address if no display name exists.
    """

    if display_name:
        username = re.sub(
            r"[^a-zA-Z0-9]",
            "",
            display_name
        ).lower()

    else:
        username = email.split("@")[0].lower()

        username = re.sub(
            r"[^a-zA-Z0-9]",
            "",
            username
        )

    return username