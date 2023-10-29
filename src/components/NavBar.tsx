import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { AppDispatch } from '../state/store';
import { auth, logout } from '../state/auth/authSlice';

// This component is used to display the navigation bar
const NavBar = () => {
  const { userToken } = useSelector(auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  if (!userToken) {
    return null;
  }

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <aside className='absolute top-0 left-0 max-w-xs'>
      <List sx={{ p: 0, borderRight: '1px solid' }}>
        <ListItem>
          <Link
            to='/bills'
            className='text-base font-medium text-dark-600 hover:underline'
          >
            Bills
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to='/invoices'
            className='text-base font-medium text-dark-600 hover:underline'
          >
            Invoices
          </Link>
        </ListItem>
        <ListItem>
          <button
            onClick={handleLogout}
            className='text-base font-medium text-blue-600 hover:underline'
          >
            LogOut
          </button>
        </ListItem>
      </List>
    </aside>
  );
};

export default NavBar;
