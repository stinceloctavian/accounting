import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

// This component is used to display the 404 page
const NotFoundPage = () => (
  <Box className='flex flex-col items-center mt-4'>
    <Typography component='h1' variant='h1' sx={{ mb: 2 }}>
      404: Page Not Found!
    </Typography>
  </Box>
);

export default NotFoundPage;
