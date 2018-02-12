import { ITransaction } from '@app/main/wallets/services/wallet.interfaces';

export class WalletDetailsObject {
  constructor(
    public name: string,
    public publicKey: string,
    public privateKey: string,
    public balance: number,
    public transactions: ITransaction[]
  ) {
  }
}
