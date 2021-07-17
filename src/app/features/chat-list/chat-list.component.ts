import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/authentication/token.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FeaturesService } from '../features.service';


@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  showChatActionsPopup: boolean = false;
  usersList: any;

  display: boolean = false;
  showSearchPopup: boolean = false;
  userChatList = [];
  userCharArr = [];
  constructor(
    private _featureService: FeaturesService,
    private _sharedService: SharedService,
    private _tokenService: TokenService
  ) { }

  ngOnInit() {
    const userDetails = this._tokenService.getUserDetails();
    this._featureService.fetchChats(userDetails).subscribe((chats) => {
      console.log(chats, 'llllllllllllll');
    }, (err) => {
      console.log(err, 'kkkkkkkkkkkkkkkkkkk');
    })
  }

  onSeachFocus() {
    this.showSearchPopup = true;
    this._featureService.fetchUsers().subscribe((res) => {
      console.log(res);
      if (res.code === 200) {
        this.usersList = res.data;
      }
    })
  }

  onSelectUserOnChatList(user) {
    this._sharedService.data.next(user);
  }

  onSelectUserFromSearch(user, index) {
    const userDetails = this._tokenService.getUserDetails();

    if (this.userChatList.find((el) => el.userName === user.userName)) {
      return;
    } else {
      this.userCharArr = [userDetails, user];
      this._featureService.createChat(this.userCharArr).subscribe((chat) => {
        console.log(chat, 'chatttt');
      }, (error) => {
        console.log('error in creating chat', error);
      })
      // this.userChatList.unshift(user);
    }
    this._sharedService.data.next(user);
    this.showSearchPopup = false;
  }



  showDialog() {
    this.display = true;
  }

  showChatActions() {
    this.showChatActionsPopup = true;
  }

}
