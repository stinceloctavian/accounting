import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import HomePage from './pages/HomePage';
import BillsPage from './pages/BillsPage';
import InvoicesPage from './pages/InvoicesPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './components/NavBar';
import ProtectedRoutes from './components/ProtectedRoutes';

const App = () => {
  return (
    <Router>
      <Container component='header'></Container>
      <Container component='main' sx={{ position: 'relative' }}>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/bills' element={<BillsPage />} />
            <Route path='/invoices' element={<InvoicesPage />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </Container>
      <Container component='footer' sx={{ mt: 4, textAlign: 'center' }}>
        <p>&copy; {new Date().getFullYear()} - All rights reserved</p>
      </Container>
    </Router>
  );
};

export default App;
