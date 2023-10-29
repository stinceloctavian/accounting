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
import { bills, type Bill } from '../state/bills/billsSlice';
import { fetchBills } from '../state/bills/billsThunks';
import { auth, logout } from '../state/auth/authSlice';
import Bill_InvoiceDetail from '../components/Bill_InvoiceDetail';
import Bill_InvoiceDetailPopup from '../components/Bill_InvoiceDetailPopup';

// This component is used to display the bills page
const BillsPage = () => {
  const { billsData, status, error } = useSelector(bills);
  const { userToken } = useSelector(auth);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userToken) {
      dispatch(fetchBills({ token: userToken }));
    }
  }, [dispatch, userToken]);

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
    return <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>;
  }

  if (status === 'failed') {
    return <Alert severity='error' sx={{ maxWidth: '80%', ml: 'auto' }}>
      {error}
    </Alert>;
  }

  return (
    <Container sx={{ width: '80%', mr: 0 }}>
      <Typography component='h2' variant='h6' color='primary' gutterBottom>
        Bills
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
          {billsData.map((bill) => (
            <Bill_InvoiceDetail
              key={bill.id}
              data={bill}
              setSelected={() => setSelectedBill(bill)}
            />
          ))}
        </TableBody>
      </Table>
      {selectedBill && (
        <Bill_InvoiceDetailPopup
          data={selectedBill}
          opened={selectedBill !== null}
          onClose={() => setSelectedBill(null)}
        />
      )}
    </Container>
  );
};

export default BillsPage;
