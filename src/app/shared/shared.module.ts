import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomValidations } from './custom/validations';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent
  ],
  exports:[
    HeaderComponent
  ],
  providers:[CustomValidations]
})
export class SharedModule { }
