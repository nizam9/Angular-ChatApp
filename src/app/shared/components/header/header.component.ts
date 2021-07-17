import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public selecteduser = [];
  constructor(
    private _sharedService:SharedService
    ) { }

  ngOnInit() {

    this._sharedService.data.subscribe(
      (user) => {
        this.selecteduser = [];
        console.log(user , 'sharedddddddddddddddddd');
        this.selecteduser.push(user);
      });

  }

}
