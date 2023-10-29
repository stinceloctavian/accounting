import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { AppDispatch } from '../state/store';
import { invoices, type Invoice } from '../state/invoices/invoicesSlice';
import { fetchInvoices } from '../state/invoices/invoicesThunks';
import { auth, logout } from '../state/auth/authSlice';
import Bill_InvoiceDetail from '../components/Bill_InvoiceDetail';
import Bill_InvoiceDetailPopup from '../components/Bill_InvoiceDetailPopup';
import Pagination from '../components/Pagination';

// This component is used to display the invoices page
const InvoicesPage = () => {
  const { invoicesData, totalPages, status, error } = useSelector(invoices);
  const { userToken } = useSelector(auth);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      dispatch(
        fetchInvoices({
          token: userToken,
          page: currentPage - 1,
        })
      );
    }
  }, [dispatch, userToken, currentPage]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (error) {
      timeout = setTimeout(() => {
        dispatch(logout());
        navigate('/');
      }, 5000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error, dispatch, navigate]);

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Alert severity='error' sx={{ maxWidth: '80%', ml: 'auto' }}>
        {error}
      </Alert>
    );
  }

  return (
    <Container sx={{ width: '80%', mr: 0 }}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Invoices
      </Typography>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Spent</TableCell>
            <TableCell>Received</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoicesData.map((invoice) => (
            <Bill_InvoiceDetail
              key={invoice.id}
              data={invoice}
              setSelected={() => setSelectedInvoice(invoice)}
            />
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
      {selectedInvoice && (
        <Bill_InvoiceDetailPopup
          data={selectedInvoice}
          opened={selectedInvoice !== null}
          onClose={() => setSelectedInvoice(null)}
        />
      )}
    </Container>
  );
};

export default InvoicesPage;
