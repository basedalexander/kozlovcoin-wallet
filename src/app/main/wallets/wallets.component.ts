import { Component } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { IDetailedWallet } from '@app/main/wallets/services/wallet.interfaces';
import { WalletManagerService } from '@app/main/wallets/services/wallet-manager.service';

@Component({
  selector: 'anms-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  wallets: IDetailedWallet[] = [];

  constructor(
    private walletManager: WalletManagerService
  ) {
    this.loadWallets();
  }

  private async loadWallets() {
    this.wallets = await this.walletManager.getAll();
  }
}
