import { Fragment, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const ErrorSnackbar = ({ isShown, setIsShown, errorMessage }) => {
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsShown(false);
  };

  useEffect(() => {
    setIsShown(false);
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
        open={isShown}
        autoHideDuration={5000}
        onClose={handleClose}
        message={errorMessage}
        action={action}
      />
    </div>
  );
}

export default ErrorSnackbar;
