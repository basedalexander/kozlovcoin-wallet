import { Injectable } from '@angular/core';
import { ApiRequest } from 'app/api/api-request';
import { IKeyPair } from '@app/main/wallets/services/wallet.interfaces';
import { TransactionSendDetails } from '@app/main/wallets/services/send-transaction-details';
import { ITransactionReport } from '@app/main/wallets/services/transaction-report';

@Injectable()
export class WalletDataProvider {

  constructor(private api: ApiRequest) {
  }

  public async sendTransaction(details: TransactionSendDetails): Promise<void> {
    return await this.api.create('wallet/transaction', details);
  }

  public async getGenesisWallet(): Promise<IKeyPair> {
    return await this.api.get('genesis-key-pair');
  }

  public async generateWallet(): Promise<IKeyPair> {
    return await this.api.get('wallet/new-key-pair');
  }

  public async getBalance(wallet: IKeyPair): Promise<number> {
    return await this.api.get(`wallet/balance/${wallet.publicKey}`);
  }

  public async getTransactions(wallet: IKeyPair): Promise<ITransactionReport[]> {
     return await this.api.get(`wallet/transactions/${wallet.publicKey}`);
  }

  public async getTransactionsForWallets(wallets: IKeyPair[]): Promise<ITransactionReport[]> {
    const promises = wallets.map(w => this.getTransactions(w));
    const accumulatedTransactions: ITransactionReport[][] = await Promise.all(promises);
    const result: ITransactionReport[] = accumulatedTransactions.reduce((a, b) => a.concat(b), []);
    return result;
  }
}
