import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IWalletDetailsObject } from '@app/main/wallets/services/wallet.interfaces';

@Component({
  selector: 'anms-wallets-list',
  templateUrl: './wallets-list.component.html',
  styleUrls: ['./wallets-list.component.scss']
})
export class WalletsListComponent {
  @Input() wallets: IWalletDetailsObject[];
  @Output() private generateNewClick: EventEmitter<void> = new EventEmitter();

  onGenerateNewClick(): void {
    this.generateNewClick.emit();
  }
}
