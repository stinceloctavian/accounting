import React from 'react';
import { Box, Button, Typography } from '@mui/material';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const renderPageButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'contained' : 'outlined'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  };

  return (
    <Box display='flex' justifyContent='center' alignItems='center' flexDirection='column' mt={3}>
      <Box display='flex' gap='6px'>{renderPageButtons()}</Box>
      <Box mt={1}>
        <Typography variant='body1'>{`Page ${currentPage} of ${totalPages}`}</Typography>
      </Box>
    </Box>
  );
};

export default Pagination;
