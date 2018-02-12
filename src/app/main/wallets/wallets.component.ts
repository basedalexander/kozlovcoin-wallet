import { Component, OnDestroy } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { IWalletDetailsObject } from '@app/main/wallets/services/wallet.interfaces';
import { WalletManagerService } from '@app/main/wallets/services/wallet-manager.service';

@Component({
  selector: 'anms-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnDestroy {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  wallets: IWalletDetailsObject[] = [];

  constructor(private walletManager: WalletManagerService) {
    this.loadWallets();
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

  private async loadWallets() {
    this.wallets = await this.walletManager.getAll();
  }

  private async store(): Promise<void> {
    await this.walletManager.store(this.wallets);
  }
}
