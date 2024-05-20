import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { SubmitNewUser, handleSuccessfulUserCreation } from '../../../Store/UserSlice';


const defaultTheme = createTheme();

export default function SignUpSide() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginError = useSelector((state) => state.user.error);
  const aliasError = useSelector((state) => state.user.aliasError);
  const successfulCreation = useSelector(
    (state) => state.user.successfulCreation
  );
  const [formValues, setFormValues] = useState({
    password: '',
    passwordConfirmation: '',
    alias: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };
  const [errors, setErrors] = useState({});

  // Regex pour valider le format de mot de passe
  const validatePasswordFormat = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const inputErrors = {};
    // Vérification du format du mot de passe
    if (!validatePasswordFormat(formValues.password)) {
      inputErrors.passwordFormat =
        'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule et minuscule, 1 chiffre et 1 caractère spécial.';
    }
    // Vérification si passwordConfirmation matche bien avec password
    if (formValues.password !== formValues.passwordConfirmation) {
      // Si ça ne matche pas, message d'erreur
      inputErrors.passwordMatch = 'Les mots de passe ne correspondent pas.';
    }
    if (!formValues.alias.trim()) {
      inputErrors.alias = "N'oublie pas ton pseudo !";
    }
    if (!formValues.password.trim()) {
      inputErrors.password = 'Oups, tu as oublié ton mot de passe !';
    }
    if (!formValues.passwordConfirmation.trim()) {
      inputErrors.passwordConfirmation =
        "N'oublie pas de confirmer ton mot de passe !";
    }
    setErrors(inputErrors);
    if (Object.keys(inputErrors).length === 0) {
      console.log('SignUp profile > ', {
        ...formValues,
      });

      dispatch(SubmitNewUser(formValues));
      dispatch({ type: 'SUBMIT_NEWUSER' });
      // eslint-disable-next-line react-hooks/rules-of-hooks
    }
  };

  useEffect(() => {
    if (successfulCreation) {
      navigate('/SignInSide');
    }
  }, [successfulCreation, navigate]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(public/pirate_bateau_voile.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Nouvel aventurier ? Crée ton compte ici !
            </Typography>
            {loginError && (
              <Typography color="error" variant="body2">
                {loginError}
              </Typography>
            )}
            {aliasError && (
              <Typography color="error" variant="body2">
                {aliasError}
              </Typography>
            )}
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="alias"
                label="pseudo"
                name="alias"
                autoComplete="alias"
                autoFocus
                value={formValues.alias}
                onChange={handleChange}
              />
              {errors.alias && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.alias}
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formValues.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.password}
                </p>
              )}
              {errors.passwordFormat && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.passwordFormat}
                </p>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirmation"
                label="Je confirme mon mot de passe"
                type="password"
                id="passwordConfirmation"
                autoComplete="current-password"
                value={formValues.passwordConfirmation}
                onChange={handleChange}
              />
              {errors.passwordConfirmation && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.passwordConfirmation}
                </p>
              )}
              {errors.passwordMatch && (
                <p style={{ color: 'red', fontSize: 'small' }}>
                  {errors.passwordMatch}
                </p>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Je crée mon compte
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/SignInSide" variant="body2">
                    J'ai déjà un compte. Je me connecte !
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
