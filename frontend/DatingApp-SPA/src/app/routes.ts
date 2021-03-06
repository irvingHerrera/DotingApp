import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './resolvers/member-detail.resolvers';
import { MemberListResolver } from './resolvers/member-list.resolvers';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolvers';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './resolvers/lists.resolve';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberListComponent, resolve: { users: MemberListResolver }},
      { path: 'members/:id', component: MemberDetailComponent, resolve: { user: MemberDetailResolver }},
      { path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChanges]},
      { path: 'messages', component: MessagesComponent  },
      { path: 'lists', component: ListsComponent, resolve: { users: ListsResolver }  },
      { path: '**', redirectTo: '', pathMatch: 'full' }
    ]
  }
];
