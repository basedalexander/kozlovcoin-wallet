import { Component, Input } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { IWalletDetailsObject } from '@app/main/wallets/services/wallet.interfaces';
import { WalletManagerService } from '@app/main/wallets/services/wallet-manager.service';

@Component({
  selector: 'anms-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  @Input() wallets: IWalletDetailsObject[];

  from: string;
  to: string;
  amount: number;

  constructor(private walletManager: WalletManagerService) {
    this.loadWallets();
  }

  private async loadWallets(): Promise<void> {
    this.wallets = await this.walletManager.getAll();
  }

  onTransactionSubmit() {

  }
}
