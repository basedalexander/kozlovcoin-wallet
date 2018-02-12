import { Component, OnDestroy } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { IWalletDetailsObject } from '@app/main/wallets/services/wallet.interfaces';
import { WalletManagerService } from '@app/main/wallets/services/wallet-manager.service';
import { ITransactionReport } from '@app/main/wallets/services/transaction-report';

@Component({
  selector: 'anms-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnDestroy {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  wallets: IWalletDetailsObject[] = [];
  transactions: ITransactionReport[] = [];

  constructor(private walletManager: WalletManagerService) {
    this.init();
  }

  async init(): Promise<void> {
    await this.loadWallets();
    await this.loadAllTransactions();
  }

  async ngOnDestroy() {
    this.store();
  }

  onGenerateNewClick() {
    this.generateAndAddNewWallet();
  }

  private async generateAndAddNewWallet(): Promise<void> {
    const newWallet: IWalletDetailsObject = await this.walletManager.generateNew();
    this.wallets.push(newWallet);
  }

  private async loadWallets(): Promise<void> {
    this.wallets = await this.walletManager.getWallets();
  }

  private async loadAllTransactions(): Promise<void> {
    this.transactions = await this.walletManager.getTransactionsForWallets(this.wallets);
  }

  private async store(): Promise<void> {
    await this.walletManager.storeWallets(this.wallets);
  }
}
