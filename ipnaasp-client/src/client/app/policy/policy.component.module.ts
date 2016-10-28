import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PolicyComponent } from './policy.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [PolicyComponent],
  exports: [PolicyComponent],
  providers: [PolicyComponent]
})
export class PolicyComponentModule { }
