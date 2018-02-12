import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '@app/main/main-component/main.component';
import { WalletsComponent } from '@app/main/wallets/wallets.component';
import { SendComponent } from '@app/main/send/send.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'wallets',
        pathMatch: 'full'
      },
      {
        path: 'wallets',
        component: WalletsComponent,
        data: {
          title: 'Wallets'
        }
      },
      {
        path: 'send',
        component: SendComponent,
        data: {
          title: 'Send coins'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
