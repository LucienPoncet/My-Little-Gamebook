import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  logged: !!localStorage.getItem('token'),
  password: '',
  token: localStorage.getItem('token'),
  alias: '',
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    handleSuccessfulLogin: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
        logged: true,
        password: '',
        token: action.payload,
      };
    },
    handleSuccessfulUserCreation: (state, action) => {
      // localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload,
        successfulCreation: true,
      };
    },
    handleSuccessfulProfileEdition: (state, action) => {
      return {
        ...state,
        alias: action.payload.alias,
        avatar: action.payload.avatar,
        logged: true,
      };
    },
    SubmitLogin: (state, action) => {
      return {
        ...state,
        alias: action.payload.alias,
        password: action.payload.password,
      };
    },
    SubmitNewUser: (state, action) => {
      return {
        ...state,
        password: action.payload.password,
        alias: action.payload.alias,
      };
    },
    PatchProfile: (state, action) => {
      return {
        ...state,
        alias: action.payload.alias,
        avatar: action.payload.avatar,
      };
    },
    DeleteProfile: () => {
      return {
        logged: false,
      };
    },
    handleLogOut: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return {
        ...initialState,
        logged: false,
        token: '',
      };
    },
    handleLoginError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        logged: false,
      };
    },
    handleUserCreationError: (state, action) => {
      return {
        ...state,
        error: action.payload.error,
        aliasError: action.payload.aliasError,
        logged: false,
      };
    },
    handleProfileEditionError: (state, action) => {
      return {
        ...state,
        error: action.payload,
        // logged: false,
      };
    },
    checkLoggedIn: (state) => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userData = JSON.parse(localStorage.getItem('user'));
          return {
            ...state,
            ...userData,
            logged: true,
            token,
          };
        } catch (error) {
          // ajout de gestion d'erreur
          console.error('Error parsing user data:', error);
          // Retour du state initial
          return {
            ...state,
            logged: false,
            token: null,
          };
        }
      }
      return {
        ...state,
        logged: false,
        token: null,
      };
    },
  },
});

export const {
  getUser,
  loadUser,
  handleSuccessfulLogin,
  handleSuccessfulUserCreation,
  handleSuccessfulProfileEdition,
  SubmitLogin,
  SubmitNewUser,
  PatchProfile,
  DeleteProfile,
  handleLogOut,
  handleLoginError,
  handleUserCreationError,
  handleProfileEditionError,
  checkLoggedIn,
  handleSuccessfulProfilePatch,
} = userSlice.actions;

// Définition des types pour chaque action
export const HandleSuccessfulLoginType = 'user/handleSuccessfulLogin';
export const SubmitLoginType = 'user/submitLogin';

// Export your reducer as before
export default userSlice.reducer;
