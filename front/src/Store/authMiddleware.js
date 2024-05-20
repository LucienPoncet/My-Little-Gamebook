import {
  getUser,
  // loadUser,
  handleSuccessfulLogin,
  handleSuccessfulUserCreation,
  handleSuccessfulProfileEdition,
  // SubmitLogin,
  // SubmitNewUser,
  // SubmitProfile,
  handleUserCreationError,
  handleLoginError,
  handleProfileEditionError,
  DeleteProfile,
} from './UserSlice';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_USER') {
    const token = localStorage.getItem('token');
    //  const { id } = store.getState().user;
    fetch('http://localhost:3000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token, // Ajout du token dans le headers mais pas de diff avec ou sans.
      },
      // Retrait des infos user car pas nécessaires ici, le token est suffisant. Plus safe en se contentant de l'envoi du token.
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        store.dispatch(getUser);
      });
  } else if (action.type === 'SUBMIT_LOGIN') {
    fetch('http://localhost:3000/user/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        alias: store.getState().user.alias,
        password: store.getState().user.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Oups ! La connexion a échoué.');
        }
        return res.json();
      })
      .then((data) => {
        const loginAction = handleSuccessfulLogin(data);
        store.dispatch(loginAction);
        // On enlève l'éventuel message d'erreur login résiduel (pour éviter son apparition sur le profil)
        store.dispatch(handleProfileEditionError(null));
      })
      .catch((error) => {
        const errorAction = handleLoginError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'SUBMIT_NEWUSER') {
    fetch('http://localhost:3000/user/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: store.getState().user.password,
        alias: store.getState().user.alias,
      }),
    })
      .then((res) => {
        if (res.status === 409) {
          // Erreur spécifique si le pseudo est déjà pris
          throw new Error(
            'Oups ! Ce pseudo est déjà pris, tu dois en choisir un autre !'
          );
        }
        if (!res.ok) {
          throw new Error("Oups ! L'utilisateur n'a pas pu être créé.");
        }
        return res.json();
      })
      .then((data) => {
        store.dispatch(handleSuccessfulUserCreation(data));
      })
      .catch((error) => {
        store.dispatch(handleUserCreationError({ error: error.message }));
      });
  } else if (action.type === 'PATCH_PROFILE') {
    const { id } = store.getState().user;

    fetch(`http://localhost:3000/user/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${store.getState().user.token}`,
      },
      body: JSON.stringify({
        alias: store.getState().user.alias,
        avatar: store.getState().user.avatar || '',
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Oups ! Le profil n'a pas pu être modifié.");
        }
        return res.json();
      })
      .then((data) => {
        const editProfile = handleSuccessfulProfileEdition(data);
        store.dispatch(editProfile);
        store.dispatch({ type: 'PROFILE_EDIT_SUCCESS' });
        // On s'assure que le nouvel avatar reste bien dans le local storage (évite les bugs au refresh)
        localStorage.setItem('user', JSON.stringify(data));
      })
      .catch((error) => {
        const errorAction = handleProfileEditionError(error.message);
        store.dispatch(errorAction);
      });
  } else if (action.type === 'DELETE_PROFILE') {
    const token = localStorage.getItem('token');
    const { id } = store.getState().user;
    fetch(`http://localhost:3000/user/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Oups ! Le profil n'a pas pu être supprimé.");
        }
        const deleteAction = DeleteProfile();
        store.dispatch(deleteAction);
        return res.json();
      })
      .catch((error) => {
        const errorAction = handleProfileEditionError(error.message);
        store.dispatch(errorAction);
      });
  }
  return next(action);
};
export default authMiddleware;
