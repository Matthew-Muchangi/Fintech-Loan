import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfRegistration: string;
  customerType: string;
}

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm!: FormGroup;
  customers: Customer[] = [];
  lastid: string | null = null;
  editMode: boolean = false;
  editedCustomerIndex: number | null = null; // Index of customer being edited

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      customerType: ['', Validators.required]
    });

    this.loadCustomers();
  }

  generateid(): string {
    return 'CUST-' + Math.floor(1000 + Math.random() * 9000);
  }

  saveCustomer() {
    if (this.customerForm.valid) {
      if (this.editMode && this.editedCustomerIndex !== null) {
        // Update existing customer
        this.customers[this.editedCustomerIndex] = {
          ...this.customers[this.editedCustomerIndex],
          ...this.customerForm.value,
        };
        this.editMode = false;
        this.editedCustomerIndex = null;
      } else {
        // Create a new customer
        const newCustomer: Customer = {
          id: this.generateid(),
          ...this.customerForm.value
        };

        this.customers.push(newCustomer);
        this.lastid = newCustomer.id;
      }

      localStorage.setItem('customers', JSON.stringify(this.customers));
      this.customerForm.reset();
    }
  }

  loadCustomers() {
    const savedCustomers = localStorage.getItem('customers');
    this.customers = savedCustomers ? JSON.parse(savedCustomers) : [];
  }

  editCustomer(index: number) {
    const customer = this.customers[index];
    this.customerForm.patchValue(customer);
    this.editMode = true;
    this.editedCustomerIndex = index;
  }

  deleteCustomer(index: number) {
    this.customers.splice(index, 1);
    localStorage.setItem('customers', JSON.stringify(this.customers));
  }
}
