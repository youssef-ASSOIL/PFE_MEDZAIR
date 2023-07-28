import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const UserNotFound = () => {

const StyleAlert={
    marginTop:'5px',
    marginLeft:'25%',
    heigth:'50%',
    width: '50%'
}
  return (
    <div style={StyleAlert}>
    <Alert severity="warning" >
    <AlertTitle>Avertissement</AlertTitle>
        Cet utilisateur n'existe pas ! Peut-être que votre adresse e-mail ou votre mot de passe est incorrect.
     </Alert>
    </div>
  );
};

export default UserNotFound;
