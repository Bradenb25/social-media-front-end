import { Routes } from "@angular/router";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { LoginComponent } from "./login/login.component";
import { SearchComponent } from "./search/search.component";
import { UserComponent } from "./user/user.component";
import { GroupComponent } from "./group/group.component";

export const appRoutes: Routes = [
    {
        path: "sign-up",
        component: SignUpComponent
    },
    {
        path: "",
        pathMatch: "full",
        redirectTo: 'sign-up'
    },
    {
        path: "login",
        component: LoginComponent
    }, 
    {
        path: "search",
        component: SearchComponent
    },
    {
        path: "user",
        component: UserComponent
    }, 
    {
        path: 'group/:id',
        component: GroupComponent
    }
]