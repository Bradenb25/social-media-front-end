import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  constructor(
    private usrSvc: UserService,
    private _sanitizer: DomSanitizer,
    private grpSvc: GroupService
  ) { }

  @Input() groupId: number;
  @Output() addedMember: EventEmitter<string> = new EventEmitter();
  people: any;

  ngOnInit() {
  }

  getPeople(event, query) {
    if (event.key == 'Enter') {
      this.people = null;
      this.usrSvc.searchForUsers(query.value)
        .subscribe(x => {
          for (let i = 0; i < x.length; i++) {
            var getImageResult = x[i].picture;
            var binstr = Array.prototype.map.call(getImageResult.data, function (ch) {
              return String.fromCharCode(ch);
            }).join('');
            let data = btoa(binstr);
            let picture = "data:image/jpg;base64," + data;
            x[i].picture = this._sanitizer.bypassSecurityTrustUrl(picture);
          }
          this.people = x;
        })
    }
  }

  addPersonToGroup(person: any) {
    this.grpSvc.joinGroup(this.groupId, person.id)
      .subscribe(x => {
        this.addedMember.emit('');
      });
  }
}