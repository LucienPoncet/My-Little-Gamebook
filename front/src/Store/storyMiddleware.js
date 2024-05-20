import { getAllStories } from './StoriesSlice';
import { getCompartment, loadCompartment } from './compartmentSlice';

const storyMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case 'FETCH_COMPARTMENT': {
      console.log("Déclencher l'appel API pour récupérer le compartment");
      // On récupére l'id chargé dans le state dans le composant reviewStory.jsx (getCompartment)
      const { id } = store.getState().compartment;
      // Récupérer le jeton depuis le state Redux
      const token = localStorage.getItem('token');
      // On appel la route la route avec l'id provenant du state
      fetch(`http://localhost:3000/compartments/${id}`, {
        // Ajouter l'en-tête d'autorisation
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // à voir selon retour back si obligatoire
          console.log(data);
          // on déclenche le reducer loadCompartment qui va charger les données du compartment dans le state (compartment).
          store.dispatch(loadCompartment(data));
        });
      break;
    }
    case 'FETCH_COMPARTMENT_BEGINNING': {
      console.log("Déclencher l'appel API pour récupérer le premier compartment");
      console.log(store.getState().compartment);
      // On récupére l'id chargé dans le state dans le composant reviewStory.jsx (getCompartment)
      const { id } = store.getState().compartment;
      // Récupérer le jeton depuis le state Redux
      const token = localStorage.getItem('token');
      // On appel la route la route avec l'id provenant du state
      fetch(`http://localhost:3000/compartments/story/${id}/beginning`, {
        // Ajouter l'en-tête d'autorisation
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // à voir selon retour back si obligatoire
          console.log(data);
          // on déclenche le reducer loadCompartment qui va charger les données du compartment dans le state (compartment).
          store.dispatch(loadCompartment(data));
        });
      break;
    }
    case 'FETCH_STORIES': {
      console.log("Déclencher l'appel API pour récupérer des histoires");
      // Récupérer le jeton depuis le state Redux
      const token = localStorage.getItem('token');
      // Utilisation du type d'action correct pour récupérer des histoires
      fetch('http://localhost:3000/stories', {
        // Ajouter l'en-tête d'autorisation
        headers: {
          Authorization: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          store.dispatch(getAllStories(data));
        });
      break;
    }
    default:

      return next(action);
  }
};

export default storyMiddleware;
