import { Fragment, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const ErrorSnackbar = ({ open, setOpen, errorMessage }) => {
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(false);
  }, [])

  const action = (
    <Fragment>
      <Button 
        color="secondary" 
        size="large" 
        onClick={handleClose}
      >
        OK
      </Button>
    </Fragment>
  );

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        message={errorMessage}
        action={action}
      />
    </div>
  );
}

export default ErrorSnackbar;
