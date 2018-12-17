import { Routes } from "@angular/router";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";
import { SearchComponent } from "./search/search.component";
import { UserComponent } from "./user/user.component";
import { GroupComponent } from "./group/group.component";
import { AuthService, LoginAuthService } from "./security/auth-service.service";
import { TodoComponent } from "./todo/todo.component";

export const appRoutes: Routes = [
    {
        path: "sign-up",
        component: SignUpComponent,
        canActivate: [LoginAuthService]
    },
    {
        path: "", 
        pathMatch: "full",
        redirectTo: 'sign-up'
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [ LoginAuthService ]
    }, 
    {
        path: "search",
        component: SearchComponent,
        canActivate: [ AuthService ]
    },
    {
        path: "user",
        component: UserComponent,
        canActivate: [ AuthService ]
    }, 
    {
        path: 'group/:id',
        component: GroupComponent,
        canActivate: [ AuthService ]
    },
    {
        path: 'todo',
        component: TodoComponent,
    }
]