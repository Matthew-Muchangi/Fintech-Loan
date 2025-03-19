import { Injectable } from '@angular/core';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private storageKey = 'customers';

  constructor() {}

  // Get all customers
  getCustomers(): Customer[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Add a new customer
  addCustomer(customer: Customer): void {
    const customers = this.getCustomers();
    customer.id = new Date().getTime(); // Generate unique ID
    customers.push(customer);
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }

  // Update an existing customer
  updateCustomer(updatedCustomer: Customer): void {
    let customers = this.getCustomers();
    customers = customers.map(customer =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }

  // Delete a customer
  deleteCustomer(id: number): void {
    let customers = this.getCustomers();
    customers = customers.filter(customer => customer.id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(customers));
  }
}
