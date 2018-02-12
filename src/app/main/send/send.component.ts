import { Component, Input } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { IDetailedWallet } from '@app/main/wallets/services/wallet.interfaces';

@Component({
  selector: 'anms-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  @Input() wallets: IDetailedWallet[];
}
