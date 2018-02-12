import { Component } from '@angular/core';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'anms-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
}
