import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { SocialCircleComponent } from './socialCircle.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SocialCircleComponent],
  exports: [SocialCircleComponent],
  providers: [SocialCircleComponent]
})
export class SocialCircleComponentModule { }
