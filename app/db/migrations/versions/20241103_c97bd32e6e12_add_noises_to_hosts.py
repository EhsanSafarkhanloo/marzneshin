"""add noises to hosts

Revision ID: c97bd32e6e12
Revises: b613375d2fca
Create Date: 2024-11-03 03:47:00.293632

"""

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision = "c97bd32e6e12"
down_revision = "b613375d2fca"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("hosts", sa.Column("udp_noises", sa.JSON(), nullable=True))
    op.add_column("hosts", sa.Column("http_headers", sa.JSON(), nullable=True))
    op.add_column(
        "hosts", sa.Column("dns_servers", sa.String(length=128), nullable=True)
    )
    op.add_column("hosts", sa.Column("mtu", sa.Integer(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("hosts", "mtu")
    op.drop_column("hosts", "dns_servers")
    op.drop_column("hosts", "http_headers")
    op.drop_column("hosts", "udp_noises")
    # ### end Alembic commands ###