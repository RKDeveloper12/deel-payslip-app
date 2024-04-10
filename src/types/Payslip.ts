export interface Payslip {
    id: string;
    fromDate: string; // Date in YYYY-MM-DD format
    toDate: string;   // Date in YYYY-MM-DD format
    file: string;     // URL or local path to the payslip file (PDF or image)
}