import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string,
  value: number;
  type: string;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {

    if ('outcome' === type) {
      const balance = this.transactionsRepository.getBalance();

      if (balance.total - value < 0) {
        throw new Error('Não pode ser adicionado uma nova transação.');
      }
    }

    return this.transactionsRepository.create({ title, type, value });
  }
}

export default CreateTransactionService;
