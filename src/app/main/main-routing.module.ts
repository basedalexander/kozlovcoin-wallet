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
        redirectTo: 'storedWallets',
        pathMatch: 'full'
      },
      {
        path: 'storedWallets',
        component: WalletsComponent,
        data: {
          title: 'Your storedWallets'
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
