import { Injectable } from '@angular/core';
import { ApiRequest } from 'app/api/api-request';
import { IKeyPair, ITransaction } from '@app/main/wallets/services/wallet.interfaces';
import { TransactionSendDetails } from '@app/main/wallets/services/send-transaction-details';

@Injectable()
export class WalletApi {

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

  public async getTransactions(wallet: IKeyPair): Promise<ITransaction[]> {
    return await this.api.get(`wallet/transactions/${wallet.publicKey}`);
  }

  public async getTransactionsForMany(wallets: IKeyPair[]): Promise<ITransaction[]> {
    let allTransactions: ITransaction[] = [];

    wallets.forEach(async wallet => {
      const walletTransactions: ITransaction[] = await this.getTransactions(wallet);
      allTransactions = allTransactions.concat(walletTransactions);
    });

    return allTransactions;
  }
}
