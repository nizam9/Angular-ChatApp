import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesComponent } from './features.component';
import { FeaturesRoutingModule } from './features-routing.module';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatInfoComponent } from './chat-info/chat-info.component';
import { ChatBodyComponent } from './chat-body/chat-body.component';
import { SharedModule } from '../shared/shared.module';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {ButtonModule} from 'primeng/button';
import {AccordionModule} from 'primeng/accordion';
import {BadgeModule} from 'primeng/badge';
import { AuthService } from '../authentication/auth.service';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FeaturesRoutingModule,
    DialogModule,
    SidebarModule,
    ButtonModule,
    AccordionModule,
    BadgeModule
  ],
  declarations: [
    FeaturesComponent,
    ChatListComponent,
    ChatInfoComponent,
    ChatBodyComponent
  ],
  providers: []
})
export class FeaturesModule { }
