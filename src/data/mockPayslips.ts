import { Payslip } from '../types/Payslip';

export const mockPayslips: Payslip[] = [
  {
    id: 'Payslip 1',
    fromDate: '2023-01-01',
    toDate: '2023-01-31',
    file: 'https://www.upload.ee/download/16506777/0dd0e9c147d11e9cf916/example_payslip.pdf',
  },
  {
    id: 'Payslip 2',
    fromDate: '2023-02-01',
    toDate: '2023-02-28',
    file: 'https://www.upload.ee/download/16506777/0dd0e9c147d11e9cf916/example_payslip.pdf',
  },
];

export const getPayslip = (id: string) => mockPayslips.find((payslip: Payslip) => payslip.id == id);