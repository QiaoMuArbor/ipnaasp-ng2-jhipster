import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SideBarComponent } from './sidebar.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [SideBarComponent],
  exports: [SideBarComponent],
  providers: [SideBarComponent]
})
export class  SideBaComponentModule { }
