import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import type { Bill } from '../state/bills/billsSlice';
import type { Invoice } from '../state/invoices/invoicesSlice';

interface RowTableProps {
  data: Bill | Invoice;
  setSelected: () => void;
}

// This component is used to display a bill or invoice in a table
const Bill_InvoiceDetail = ({ data, setSelected }: RowTableProps) => {
  const date = new Date(data.due_at);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <TableRow>
      <TableCell>{data.id}</TableCell>
      <TableCell>{[year, month, day].join('/')}</TableCell>
      <TableCell>{data.notes}</TableCell>
      <TableCell>${data.amount}</TableCell>
      <TableCell>${data.amount}</TableCell>
      <TableCell align='right'>
        <Button onClick={setSelected} variant='contained' color='info'>
          Details
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Bill_InvoiceDetail;
