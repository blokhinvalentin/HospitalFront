import { Fragment, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const ErrorSnackbar = ({ isSnackbarOpened, setIsSnackbarOpened, errorMessage }) => {
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsSnackbarOpened(false);
  };

  useEffect(() => {
    setIsSnackbarOpened(false);
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
    <Snackbar
      open={isSnackbarOpened}
      autoHideDuration={5000}
      onClose={handleClose}
      message={errorMessage}
      action={action}
    />
  );
}

export default ErrorSnackbar;
