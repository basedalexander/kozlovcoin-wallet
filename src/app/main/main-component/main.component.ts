import { Component, OnInit } from '@angular/core';

import { routerTransition } from '@app/core';

@Component({
  selector: 'anms-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [routerTransition]
})
export class MainComponent implements OnInit {
  main = [
    { link: 'wallets', label: 'Wallets' },
    { link: 'send', label: 'Send' }
  ];

  constructor() {}

  ngOnInit() {}
}
