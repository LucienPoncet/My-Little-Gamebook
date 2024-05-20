import './ReviewStory.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { getCompartment, loadCompartment } from '@/Store/compartmentSlice';
import { useDispatch } from 'react-redux';

function ReviewStory() {
  const dispatch = useDispatch();

  const handleClickButtonCompartment = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(1));
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT' });
  };

  return (
    <div className="play">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={handleClickButtonCompartment}
      >
        <Link to="/gameDynamic">
          <PlayCircleFilledWhiteIcon className="icon" sx={{ fontSize: 100 }} />
        </Link>
      </IconButton>
      <p>Voir</p>
      <p>les histoires</p>
    </div>
  );
}
export default ReviewStory;
