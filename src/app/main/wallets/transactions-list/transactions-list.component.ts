import { Component, Input } from '@angular/core';
import { ITransactionReport } from '@app/main/wallets/services/transaction-report';

@Component({
  selector: 'anms-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent {
  @Input() transactions: ITransactionReport[];
}
