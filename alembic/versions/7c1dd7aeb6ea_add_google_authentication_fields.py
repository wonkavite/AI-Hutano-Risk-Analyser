"""
add google authentication fields

Revision ID: 7c1dd7aeb6ea
Revises: 62326d77dbee
Create Date: 2026-08-12 22:10:15.577010

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "7c1dd7aeb6ea"
down_revision: Union[str, Sequence[str], None] = "62326d77dbee"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""

    # Add Firebase/Google account identifier.
    # Nullable because existing password-based accounts
    # do not have a Google account linked yet.
    op.add_column(
        "users",
        sa.Column(
            "google_id",
            sa.String(),
            nullable=True,
        ),
    )

    # Allow Google-only accounts to exist without a
    # traditional password.
    op.alter_column(
        "users",
        "password",
        existing_type=sa.VARCHAR(),
        nullable=True,
    )

    # A Google account may be linked to only one user.
    op.create_unique_constraint(
        "uq_users_google_id",
        "users",
        ["google_id"],
    )


def downgrade() -> None:
    """Downgrade schema."""

    # Remove the named unique constraint first.
    op.drop_constraint(
        "uq_users_google_id",
        "users",
        type_="unique",
    )

    # Restore the original password requirement.
    op.alter_column(
        "users",
        "password",
        existing_type=sa.VARCHAR(),
        nullable=False,
    )

    # Remove Google authentication field.
    op.drop_column(
        "users",
        "google_id",
    )
