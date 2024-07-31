import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProgrammeListComponent } from './program-features/programme-list/programme-list.component';
import { ProgramDetailsComponent } from './program-features/program-details/program-details.component';
import { ContactUsComponent } from './shared/contact-us/contact-us.component';
import { AddProgramComponent } from './program-features/add-program/add-program.component';

export const routes: Routes = [
    { path: '', redirectTo: 'program', pathMatch: 'full' },
    { path: 'program', component: ProgrammeListComponent},
    { path: 'program', children: [
        { path: 'details', component: ProgramDetailsComponent },
        { path: 'add', component: AddProgramComponent },
    ] },
    // { path: 'program-details', component: ProgramDetailsComponent},
    { path: 'contact-us', component: ContactUsComponent},
    { path: 'user', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
    { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(routes);
