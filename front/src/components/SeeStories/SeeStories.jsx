import './SeeStories.scss';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { getAllStories } from '@/Store/StoriesSlice';
import { useDispatch } from 'react-redux';

function SeeStories() {
  const dispatch = useDispatch();

  const handleClickButtonStories = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getAllStories());
    // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_STORIES' });
  };
  return (
    <div className="play">
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        sx={{ mr: 2 }}
        onClick={handleClickButtonStories}
      >
        <Link to="/stories">
          <PlayCircleFilledWhiteIcon className="icon" sx={{ fontSize: 100 }} />
        </Link>
      </IconButton>
      <p>Voir</p>
      <p>les histoires</p>
    </div>
  );
}
export default SeeStories;
