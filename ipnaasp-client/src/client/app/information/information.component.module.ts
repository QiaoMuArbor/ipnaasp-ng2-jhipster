import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InformationComponent } from './information.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [InformationComponent],
  exports: [InformationComponent],
  providers: [InformationComponent]
})
export class InformationComponentModule { }
