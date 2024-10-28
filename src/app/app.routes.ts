import { Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
    {path: '', component: ListComponent},
    {path: 'card/:id', component: DetailComponent}
];
