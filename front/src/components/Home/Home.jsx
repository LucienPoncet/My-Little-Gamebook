import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import theme from '../../styles/theme';
import { Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div></div>
    </ThemeProvider>
  );
}

export default Home;
