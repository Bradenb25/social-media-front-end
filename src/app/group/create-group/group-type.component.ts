import { Component, OnInit, Input } from '@angular/core';
import { GroupType } from 'src/app/shared/models/group-type';

@Component({
  selector: 'app-group-type',
  templateUrl: './group-type.component.html',
  styleUrls: ['./group-type.component.css']
})
export class GroupTypeComponent implements OnInit {

  constructor() { }

  @Input() groupType: GroupType;

  ngOnInit() {
    if (!this.groupType) {
      this.groupType =  new GroupType(); 
    }
  }


}
