import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MoreComponent } from './more.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [MoreComponent],
  exports: [MoreComponent],
  providers: [MoreComponent]
})
export class MoreComponentModule { }
