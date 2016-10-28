import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PlatformMarketComponent } from './platformMarket.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [PlatformMarketComponent],
  exports: [PlatformMarketComponent],
  providers: [PlatformMarketComponent]
})
export class PlatformMarketComponentModule { }
