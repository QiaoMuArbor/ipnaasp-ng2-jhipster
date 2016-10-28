import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AnalysisComponent } from './analysis.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [AnalysisComponent],
  exports: [AnalysisComponent],
  providers: [AnalysisComponent]
})
export class AnalysisComponentModule { }
