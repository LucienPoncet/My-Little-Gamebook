import './Game1.scss';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Game1() {
  return (
    <div>
      <div className="image-container">
        <img src="/public/img/home/home-01.png" alt="PNJ" />

        <div className="content-container">
          <div className="textbox">
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
              Vous etes sur un bateau pirate que faites vous ?{' '}
            </Typography>
          </div>

          <div>
            <Button variant="contained" size="large">
              Action 1
            </Button>
            <Button variant="contained" size="large">
              Action 2
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Game1;
