import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { MainRoutingModule } from './main-routing.module';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { WalletsComponent } from '@app/main/wallets/wallets.component';
import { SendComponent } from '@app/main/send/send.component';
import { MainComponent } from '@app/main/main-component/main.component';
import { WalletPreviewComponent } from '@app/main/wallets/wallet-preview/wallet-preview.component';
import { WalletManagerService } from '@app/main/wallets/services/wallet-manager.service';
import { WalletDataProvider } from '@app/main/wallets/services/wallet-data-provider';
import { WalletStorage } from '@app/main/wallets/services/wallet-storage';

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule,
    EffectsModule.forFeature([])
  ],
  declarations: [
    ParentComponent,
    ChildComponent,
    MainComponent,
    WalletsComponent,
    WalletPreviewComponent,
    SendComponent
  ],
  providers: [
    WalletDataProvider,
    WalletStorage,
    WalletManagerService
  ]
})
export class MainModule {
}
