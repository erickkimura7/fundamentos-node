import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
  title: string,
  value: number,
  type: string
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;

    this.transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.value;
      } else if (transaction.type === 'outcome') {
        totalOutcome += transaction.value;
      }
    });

    const balance: Balance = {
      income: totalIncome,
      outcome: totalOutcome,
      total: totalIncome - totalOutcome
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransaction): Transaction {
    const transaction = new Transaction({ value, type, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
