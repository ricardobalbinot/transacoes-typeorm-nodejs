import { EntityRepository, Repository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  private async sumTransactions(type: string): Promise<number> {
    const transactions = await this.find();

    return transactions
      .filter(transaction => transaction.type === type)
      .reduce(
        (total, filteredTransaction) => total + filteredTransaction.value,
        0,
      );
  }

  public async getBalance(): Promise<Balance> {
    const income = await this.sumTransactions('income');
    const outcome = await this.sumTransactions('outcome');

    return {
      income,
      outcome,
      total: income - outcome,
    };
  }
}

export default TransactionsRepository;
