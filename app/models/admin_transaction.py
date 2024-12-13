from enum import Enum

class AdminTransactionType(int, Enum):
    DEPOSIT = 10
    WITHDRAWAL = 20
