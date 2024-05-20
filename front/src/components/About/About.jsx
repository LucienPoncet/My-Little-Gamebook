import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './About.scss';

const defaultTheme = createTheme();

export default function About() {
  return (
    <div className="background">
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="m">
          <CssBaseline />
          <Box
            sx={{
              margin: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              sx={{
                marginBottom: 5,
              }}
            >
              À propos de l'équipe
            </Typography>
            <Typography variant="body1" gutterBottom>
              Nous sommes une équipe passionnée de développement en formation,
              un groupe dynamique de futurs développeurs cherchant à mettre en
              pratique nos compétences naissantes. Notre objectif est clair :
              concevoir un site web à la fois sympa et fonctionnel. Avec notre
              dévouement, notre créativité et notre désir d'apprendre, nous nous
              engageons à créer une expérience en ligne immersive et intuitive
              pour nos utilisateurs.
            </Typography>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}
