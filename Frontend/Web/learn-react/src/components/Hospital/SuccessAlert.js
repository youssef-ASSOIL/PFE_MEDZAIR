import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const SuccessAlert = () => {

    const StyleAlert={
        marginTop:'5px',
        marginLeft:'25%',
        heigth:'50%',
        width: '50%'
    }
      return (
        <div style={StyleAlert}>
        <Alert severity="success" >
        <AlertTitle>Success</AlertTitle>
        Votre demande a ete  - <strong>bien enregistrer!</strong>
        </Alert>
        </div>
      );
    };
    
export default SuccessAlert;