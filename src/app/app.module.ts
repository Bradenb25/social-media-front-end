import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { NavbarComponent } from './navbar/navbar.component';
import { PasswordValidator } from './sign-up/password-validator.directive';
import { HttpInterceptorModule } from './security/http-interceptor';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { SearchRowComponent } from './search/search-row/search-row.component';
import { UserComponent } from './user/user.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { GroupComponent } from './group/group.component';
import { PostComponent } from './group/post/post.component';
import { PostCommentComponent } from './group/post-comment/post-comment.component';
import { AddMemberComponent } from './group/add-member/add-member.component';
import { CreateGroupComponent } from './group/create-group/create-group.component';
import { GroupTypeComponent } from './group/create-group/group-type.component';
import { NewMessageComponent } from './group/new-message/new-message.component';
import { AddPictureComponent } from './add-picture/add-picture.component';
import { AddPictureUserComponent } from './user/add-picture-user/add-picture-user.component';
import { AuthService, LoginAuthService } from './security/auth-service.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TodoComponent } from './todo/todo.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    NavbarComponent,
    PasswordValidator,
    LoginComponent,
    SearchComponent,
    SearchRowComponent,
    UserComponent,
    GroupComponent,
    PostComponent,
    PostCommentComponent,
    AddMemberComponent,
    CreateGroupComponent,
    GroupTypeComponent,
    NewMessageComponent,
    AddPictureComponent,
    AddPictureUserComponent,
    TodoComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpInterceptorModule,
    ImageCropperModule,
    RouterModule.forRoot(appRoutes),
    MatProgressSpinnerModule,
    MatTableModule,
    MatCheckboxModule,
    MatInputModule
  ],
  entryComponents: [
    CreateGroupComponent,
    AddPictureComponent,
    AddPictureUserComponent
  ],
  providers: [
    AuthService,
    LoginAuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
