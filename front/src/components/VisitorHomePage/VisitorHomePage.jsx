import './VisitorHomePage.scss';
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import ReviewStory from '../ReviewStory/ReviewStory';

import IconButton from '@mui/material/IconButton';
import { getCompartmentBeginning } from '@/Store/compartmentSlice';
import { getAllStories } from '@/Store/StoriesSlice.js';
import { useTheme } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: 'url("public/img/bg/ile.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    padding: theme.spacing(4),
  },
  title: {
    color: '#fff',
    margin: theme.spacing(4, 0),
    textShadow: '7px 7px 8px rgba(80, 10, 20, 0.4)',
    fontSize: 'calc(8vw + 20px)',
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    margin: theme.spacing(2),
    minWidth: '200px',
  },
}));

function VisitorHomePage() {
  const theme = useTheme();
  const classes = useStyles();

  const logged = useSelector((state) => state.user.logged);

  const dispatch = useDispatch();

  useEffect(() => {
    // Vérifier si un token est stocké dans le localStorage lors du chargement de l'application
    const token = localStorage.getItem('token');
    if (token) {
      // Si un token est présent, mettre à jour le state de l'application
      dispatch({ type: 'LOGIN_SUCCESS', payload: token });
    }
  }, [dispatch]);

  const handleClickButtonCompartment = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données randomisé entre 1 et 3
    const randomId = Math.floor(Math.random() * 3) + 1;
    dispatch(getCompartmentBeginning(randomId)); // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT_BEGINNING' });
  };
  const handleClickButtonStories = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getAllStories());
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_STORIES' });
  };
  return (
    <div className={classes.root}>
      <div className="overlay" />

      <Container>
        <Typography variant="h1" className={classes.title}>
          My Little GameBook
        </Typography>
        {!logged ? (
          <div>
            <Link to="/SignInSide">
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Se connecter
              </Button>
            </Link>

            <Link to="/SignUpSide" style={{ color: '#009688' }}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                S'inscrire
              </Button>
            </Link>
          </div>
        ) : (
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleClickButtonStories}
              >
                <Link to="/stories" style={{ color: '#009688' }}>
                  <PlayCircleFilledWhiteIcon
                    className="icon"
                    sx={{ fontSize: 100 }}
                  />
                </Link>
              </IconButton>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', color: 'white' }}
              >
                Voir les histoires
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                sx={{ mr: 2 }}
                onClick={handleClickButtonCompartment}
              >
                <Link to="/gameDynamic" style={{ color: '#009688' }}>
                  <PlayCircleFilledWhiteIcon
                    className="icon"
                    sx={{ fontSize: 100 }}
                  />
                </Link>
              </IconButton>
              <Typography
                variant="body1"
                style={{ fontWeight: 'bold', color: 'white' }}
              >
                Jouer une histoire
              </Typography>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default VisitorHomePage;
