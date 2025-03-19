import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customers: any[] = [];
  displayedColumns: string[] = ['name', 'email', 'phone', 'customerType', 'actions'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.loadCustomers();
  }

  initForm() {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      customerType: ['', Validators.required],
      registrationDate: ['', Validators.required]
    });
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      const newCustomer = this.customerForm.value;
      this.customers.push(newCustomer);
      localStorage.setItem('customers', JSON.stringify(this.customers));
      this.customerForm.reset();
    }
  }

  loadCustomers() {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      this.customers = JSON.parse(storedCustomers);
    }
  }

  deleteCustomer(customer: any) {
    this.customers = this.customers.filter(c => c !== customer);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }

  editCustomer(customer: any) {
    this.customerForm.patchValue(customer);
    this.deleteCustomer(customer);
  }
}
