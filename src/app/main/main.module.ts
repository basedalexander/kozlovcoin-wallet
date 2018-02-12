import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { MainRoutingModule } from './main-routing.module';
import { TodosComponent } from './todos/todos.component';
import { todosReducer } from './todos/todos.reducer';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import {WalletsComponent} from "@app/main/wallets/wallets.component";
import {SendComponent} from "@app/main/send/send.component";
import {MainComponent} from "@app/main/main-component/main.component";

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule,
    EffectsModule.forFeature([TodosEffects, StockMarketEffects])
  ],
  declarations: [
    ParentComponent,
    ChildComponent,
    MainComponent,
    WalletsComponent,
    SendComponent
  ],
  providers: [StockMarketService]
})
export class MainModule {
  constructor() {}
}
