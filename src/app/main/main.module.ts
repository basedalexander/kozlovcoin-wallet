import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { MainRoutingModule } from './main-routing.module';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import {WalletsComponent} from '@app/main/wallets/wallets.component';
import {SendComponent} from '@app/main/send/send.component';
import {MainComponent} from '@app/main/main-component/main.component';

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
    SendComponent
  ],
  providers: []
})
export class MainModule {
  constructor() {}
}
