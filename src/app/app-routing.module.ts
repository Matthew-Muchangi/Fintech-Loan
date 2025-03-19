import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { LoanComponent } from './components/loan/loan.component';

const routes: Routes = [
  { path: 'customers', component: CustomerComponent },
  { path: 'loans', component: LoanComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
