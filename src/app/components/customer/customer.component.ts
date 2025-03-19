import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer.model';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customers: Customer[] = [];
  editingCustomer: Customer | null = null;

  constructor(private fb: FormBuilder, private customerService: CustomerService) {
    this.customerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      customerType: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCustomers();
  }

  // Load customers from LocalStorage
  loadCustomers() {
    this.customers = this.customerService.getCustomers();
  }

  // Add or update customer
  saveCustomer() {
    if (this.customerForm.valid) {
      const customerData: Customer = {
        id: this.editingCustomer ? this.editingCustomer.id : new Date().getTime(),
        ...this.customerForm.value
      };

      if (this.editingCustomer) {
        this.customerService.updateCustomer(customerData);
        this.editingCustomer = null;
      } else {
        this.customerService.addCustomer(customerData);
      }

      this.customerForm.reset();
      this.loadCustomers();
    }
  }

  // Edit customer
  editCustomer(customer: Customer) {
    this.editingCustomer = customer;
    this.customerForm.patchValue(customer);
  }

  // Delete customer
  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id);
    this.loadCustomers();
  }
}
