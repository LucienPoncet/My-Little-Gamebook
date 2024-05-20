import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    backgroundImage: `url(public/img/bg/cabine.jpg)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  text: {
    color: '#ffffff',
  },
}));

function NotFoundPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Typography variant="h3" component="h1" className={classes.text}>
          404 - Page Not Found
        </Typography>
        <Typography variant="h5" component="h2" className={classes.text}>
          Désolé, la page que vous cherchez n'existe pas.
        </Typography>
      </Container>
    </div>
  );
}

export default NotFoundPage;
