export interface Loan {
    id: string;
    customerId: string;
    loanType: string;
    amount: number;
    interestRate: number; // Percentage
    duration: number; // Months
    monthlyPayment: number;
    startDate: string;
    status: 'Pending' | 'Approved' | 'Rejected';
  }
  
  export interface LoanSchedule {
    loanId: string;
    payments: { month: number; amount: number; dueDate: string }[];
  }
  