import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { SecurityObject } from './shared/models/security-object';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private userService: UserService) { }

  ngOnInit() {

    var secObject: SecurityObject = JSON.parse(localStorage.getItem("bearer"));
    if (secObject) {
      this.userService.setSecurityObject(secObject);
    }
  }
}
