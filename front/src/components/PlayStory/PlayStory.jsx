import './PlayStory.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

function PlayStory() {
  return (
    <div className="play">
      <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
        <Link to="/game">
          <PlayCircleFilledWhiteIcon className="icon" sx={{ fontSize: 100 }} />
        </Link>
      </IconButton>
      <p>Histoire</p>
      <p>à jouer</p>
    </div>
  );
}
export default PlayStory;
