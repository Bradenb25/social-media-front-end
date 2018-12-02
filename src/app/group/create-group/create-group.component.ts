import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GroupType } from 'src/app/shared/models/group-type';
import { GroupService } from 'src/app/services/group.service';
import { Group } from 'src/app/shared/models/group';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CreateGroupComponent>,
    private groupSvc: GroupService) { }

  gT1: GroupType;
  selectedGroupType: GroupType;
  groupTypes: GroupType[];

  createGroup: any;
  groupName: FormControl;
  groupType: FormControl;
  description: FormControl;

  showGroupTypes: boolean = false;

  ngOnInit() {
    this.groupSvc.getGroupTypes()
      .subscribe(x => { 
        if (x) {  
          this.selectedGroupType = x[0];
          this.groupTypes = x;
        }
      });

    this.groupName = new FormControl('', Validators.required);
    this.groupType = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);

    this.createGroup = new FormGroup({
      groupName: this.groupName,
      groupType: this.groupType,
      description: this.description
    });
  }

  close() {
    this.dialogRef.close();
  }

  createNewGroup() {
    let group = new Group();
    group.description = this.description.value;
    group.name = this.groupName.value;
    group.type = this.groupType.value.id;
    this.groupSvc.createGroup(group)
      .subscribe(x => {
        console.log('The id is ');
        console.log(x);
        this.dialogRef.close();
      });
    console.log(group);
  }
}
