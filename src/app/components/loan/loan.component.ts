import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Loan,LoanSchedule } from 'src/app/models/loan.model';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {
  loanForm: FormGroup;
  customers: any[] = [];
  loans: Loan[] = [];

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      customerId: ['', Validators.required],
      loanType: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      interestRate: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadCustomers();
    this.loadLoans();
  }

  loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    this.customers = storedCustomers ? JSON.parse(storedCustomers) : [];
  }

  loadLoans() {
    const storedLoans = localStorage.getItem('loans');
    this.loans = storedLoans ? JSON.parse(storedLoans) : [];
  }

  applyLoan() {
    if (this.loanForm.valid) {
      const formData = this.loanForm.value;

      const loan: Loan = {
        id: Math.random().toString(36).substr(2, 9),
        customerId: formData.customerId,
        loanType: formData.loanType,
        amount: formData.amount,
        interestRate: formData.interestRate,
        duration: formData.duration,
        monthlyPayment: this.calculateMonthlyPayment(formData.amount, formData.interestRate, formData.duration),
        startDate: new Date().toISOString(),
        status: 'Pending'
      };

      this.loans.push(loan);
      localStorage.setItem('loans', JSON.stringify(this.loans));

      this.generateRepaymentSchedule(loan);

      this.loanForm.reset();
    }
  }

  calculateMonthlyPayment(amount: number, interestRate: number, duration: number): number {
    const monthlyRate = interestRate / 100 / 12;
    return (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));
  }

  generateRepaymentSchedule(loan: Loan) {
    const loanSchedules: LoanSchedule[] = JSON.parse(localStorage.getItem('loanSchedules') || '[]');

    const schedule: LoanSchedule = {
      loanId: loan.id,
      payments: []
    };

    let dueDate = new Date();
    for (let i = 1; i <= loan.duration; i++) {
      dueDate.setMonth(dueDate.getMonth() + 1);
      schedule.payments.push({
        month: i,
        amount: loan.monthlyPayment,
        dueDate: dueDate.toISOString().split('T')[0]
      });
    }

    loanSchedules.push(schedule);
    localStorage.setItem('loanSchedules', JSON.stringify(loanSchedules));
  }

  getCustomerName(customerId: string): string {
    const customer = this.customers.find(c => c.id === customerId);
    return customer ? customer.fullName : 'Unknown';
  }
}
