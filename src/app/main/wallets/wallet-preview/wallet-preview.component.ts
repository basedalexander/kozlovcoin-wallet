import {Component, Input} from '@angular/core';
import { IDetailedWallet } from '@app/main/wallets/services/wallet.interfaces';

@Component({
  selector: 'anms-wallet-preview',
  templateUrl: './wallet-preview.component.html',
  styleUrls: ['./wallet-preview.component.scss']
})
export class WalletPreviewComponent {
  @Input() wallet: IDetailedWallet;
}
