import { Component, Input } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { IWalletDetailsObject } from '@app/main/wallets/services/wallet.interfaces';
import { WalletManagerService } from '@app/main/wallets/services/wallet-manager.service';
import { TransactionSendDetails } from '@app/main/wallets/services/send-transaction-details';
import { Router } from '@angular/router';

@Component({
  selector: 'anms-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {
  @Input() wallets: IWalletDetailsObject[];
  sending: boolean;
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

  constructor(
    private walletManager: WalletManagerService,
    private router: Router
  ) {
    this.loadWallets();
    this.sending = false;
  }

  onTransactionSubmit(from: string, to: string, amount: number): void {
    const txDetails: TransactionSendDetails = this.createTxDetails(from, to, +amount);
    this.showSendingSpinner();
    this.sendTransaction(txDetails);
  }

  private async sendTransaction(details: TransactionSendDetails): Promise<void> {
    await this.walletManager.sendTransaction(details);
    this.onSendTransactionSuccess();
  }

  private onSendTransactionSuccess(): void {
    this.hideSendingSpinner();
    this.router.navigate(['main']);
  }

  private createTxDetails(senderPubKey: string, recipientPubKey: string, amount: number): TransactionSendDetails {
    const senderPrivateKey: string = this.wallets.find(w => w.publicKey === senderPubKey).privateKey;
    return new TransactionSendDetails(recipientPubKey, senderPubKey, senderPrivateKey, amount);
  }

  private async loadWallets(): Promise<void> {
    this.wallets = await this.walletManager.getWallets();
  }

  private showSendingSpinner(): void {
    this.sending = true;
  }

  private hideSendingSpinner(): void {
    this.sending = false;
  }
}
