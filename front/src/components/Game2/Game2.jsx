import './Game2.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCompartment,
  loadCompartment,
  getCompartmentBeginning,
} from '@/Store/compartmentSlice';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

function Game2() {
  const dispatch = useDispatch();
  const compartment = useSelector((state) => state.compartment);
  const { compartmentData } = compartment;

  const [selectedAction, setSelectedAction] = useState(null);

  // Vérifier si la classe du compartiment est une fin ou un bonus de fin
  const ending =
    compartmentData.class === 'ending' ||
    compartmentData.class === 'bonus_ending';

  // Vérifier si le compartiment a une conséquence pour les actions
  const consequence =
    compartmentData.action1_consequence !== null ||
    compartmentData.action2_consequence !== null;

  // Vérifier si le compartiment a une classe de début
  const beginning = compartmentData.class === 'beginning';

  // Vérifier si le compartiment a un personnage
  const npcImg = compartmentData.npc_id !== null;

  // État de la modale de dialogue
  const [open, setOpen] = React.useState(false);

  // Ouvrir la modale
  const handleClickOpen = (actionNumber) => {
    setSelectedAction(actionNumber);
    if (
      (actionNumber === 1 && compartmentData.action1_consequence !== null) ||
      (actionNumber === 2 && compartmentData.action2_consequence !== null) ||
      ending
    ) {
      setOpen(true);
    } else {
      // Si aucune conséquence et ce n'est pas une fin, exécute directement l'action
      actionNumber === 1 ? handleClickButton1() : handleClickButton2();
    }
  };

  // Fermer la modale
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickContinue1 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action1_child));
    dispatch({ type: 'FETCH_COMPARTMENT' });
    handleClose();
  };

  const handleClickContinue2 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action2_child));
    dispatch({ type: 'FETCH_COMPARTMENT' });
    handleClose();
  };

  // Gérer le clic sur le premier bouton d'action
  const handleClickButton1 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action1_child));
    dispatch({ type: 'FETCH_COMPARTMENT' });
    handleClose();
  };

  // Gérer le clic sur le deuxième bouton d'action
  const handleClickButton2 = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartment(compartmentData.action2_child));
    dispatch({ type: 'FETCH_COMPARTMENT' });
    handleClose();
  };

  // Gérer le clic sur le bouton de recommencer
  const handleClickButtonCompartment = () => {
    // Reducer qui charge le state avec l'id dont on a besoin pour charger nos données
    dispatch(getCompartmentBeginning(compartmentData.story_id)); // Appel de l'action.type qui va déclencher le switch du middleware Story
    dispatch({ type: 'FETCH_COMPARTMENT_BEGINNING' });
    handleClose();
  };

  // Si le compartiment ne possède qu'une seule action (donc que l'id de l'action1 est égale à celui de l'action2) :
  if (compartmentData.action1_id === compartmentData.action2_id) {
    return (
      <div
        className="image-container-background"
        style={{
          backgroundImage: `url(/img/bg/${compartmentData.place_img}.jpg)`,
        }}
      >
        <div className="image-container">
          {/* Afficher les images des pnj seulement si le compartiment possède un id de pnj */}
          {npcImg && (
            <img
              src={`/img/pnj/${compartmentData.npc_img}.png`}
              alt={compartmentData.npc_img}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}
          <div className="content-container">
            {/* Afficher le texte normal si le compartiment n'a pas une classe beginning */}
            {!beginning && (
              <div className="textbox">
                <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                  Tu es {compartmentData.place_label}
                  {compartmentData.npc_label &&
                    ` avec ${compartmentData.npc_label}`}
                  , que fais-tu ?
                </Typography>
              </div>
            )}

            {/* Afficher le texte de début d'aventure si le compartiment a une classe beginning */}
            {beginning && (
              <div className="textbox">
                <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                  C'est le début de ton aventure... Tu es{' '}
                  {compartmentData.place_label}
                  {compartmentData.npc_label &&
                    ` avec ${compartmentData.npc_label}`}
                  , que fais-tu ?
                </Typography>
              </div>
            )}
            {/* Afficher les boutons d'action si ce n'est pas une fin ou une conséquence */}
            {!ending && !consequence && (
              <div>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleClickButton1}
                >
                  {compartmentData.action1_label}
                </Button>
              </div>
            )}
            {/* Afficher le dialogue de fin s'il s'agit d'une fin */}
            {ending && (
              <div>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleClickOpen}
                  >
                    {compartmentData.action1_label}
                  </Button>
                </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    C'est fini !
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {compartmentData.action1_consequence}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Link to="/">
                      <Button onClick={handleClose}>Quitter</Button>
                    </Link>
                    <Button onClick={handleClickButtonCompartment} autoFocus>
                      Recommencer
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
            {/* Afficher le dialogue de conséquence s'il y a une conséquence */}
            {consequence && !ending && (
              <div>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleClickOpen(1)}
                  >
                    {compartmentData.action1_label}
                  </Button>
                </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {compartmentData.action1_consequence}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClickContinue1} autoFocus>
                      Continuer
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  {
    // Si le compartiment deux actions (donc que l'id de l'action1 est différent de celui de l'action2) :
    // On va créer deux boutons d'actions
    return (
      <div
        className="image-container"
        style={{
          backgroundImage: `url(/img/bg/${compartmentData.place_img}.jpg)`,
        }}
      >
        <div className="image-container">
          {/* Afficher les images des pnj seulement si le compartiment possède un id de pnj */}
          {npcImg && (
            <img
              src={`/img/pnj/${compartmentData.npc_img}.png`}
              alt={compartmentData.npc_img}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          )}

          <div className="content-container">
            {/* Afficher le texte normal si le compartiment n'a pas une classe beginning */}
            {!beginning && (
              <div className="textbox">
                <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                  Tu es {compartmentData.place_label}
                  {compartmentData.npc_label &&
                    ` avec ${compartmentData.npc_label}`}
                  , que fais-tu ?
                </Typography>
              </div>
            )}

            {/* Afficher le texte de début d'aventure si le compartiment a une classe beginning */}
            {beginning && (
              <div className="textbox">
                <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
                  C'est le début de ton aventure... Tu es{' '}
                  {compartmentData.place_label}
                  {compartmentData.npc_label &&
                    ` avec ${compartmentData.npc_label}`}
                  , que fais-tu ?
                </Typography>
              </div>
            )}

            {/* Afficher les boutons d'action si ce n'est pas une fin ou une conséquence */}
            {!ending && !consequence && (
              <div>
                {compartmentData.action1_label !==
                compartmentData.action2_label ? (
                  <>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleClickButton1}
                    >
                      {compartmentData.action1_label}
                    </Button>
                    <Button
                      variant="contained"
                      size="large"
                      onClick={handleClickButton2}
                    >
                      {compartmentData.action2_label}
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleClickButton1}
                  >
                    {compartmentData.action1_label}
                  </Button>
                )}
              </div>
            )}

            {/* Afficher le dialogue de fin s'il s'agit d'une fin */}
            {ending && (
              <div>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleClickOpen}
                  >
                    {compartmentData.action1_label}
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleClickOpen}
                  >
                    {compartmentData.action2_label}
                  </Button>
                </div>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    C'est fini !
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {selectedAction === 1
                        ? compartmentData.action1_consequence
                        : compartmentData.action2_consequence}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Link to="/">
                      <Button onClick={handleClose}>Quitter</Button>
                    </Link>
                    <Button onClick={handleClickButtonCompartment} autoFocus>
                      Recommencer
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}

            {/* Afficher le dialogue de conséquence s'il y a une conséquence */}
            {consequence && !ending && (
              <div>
                <div>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleClickOpen(1)}
                  >
                    {compartmentData.action1_label}
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => handleClickOpen(2)}
                  >
                    {compartmentData.action2_label}
                  </Button>
                </div>

                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {selectedAction === 1
                        ? compartmentData.action1_consequence
                        : compartmentData.action2_consequence}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={
                        selectedAction === 1
                          ? handleClickContinue1
                          : handleClickContinue2
                      }
                      autoFocus
                    >
                      Continuer
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Game2;
