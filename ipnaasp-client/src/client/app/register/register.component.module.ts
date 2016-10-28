import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { registerComponent } from './register.component';

@NgModule({
  imports: [CommonModule,SharedModule],
  declarations: [registerComponent],
  exports: [registerComponent]
})

export class registerComponentModule { }
