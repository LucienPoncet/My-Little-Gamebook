// On utilise debug
import debug from "debug";
debug("error:API");

// Pour que l'erreur s'affiche, elle utilisera les conventions winston qu'on a défini dans le fichier logger.js
import logger from './logger.js';

// Les erreurs d'API s'afficheront avec une erreur 500 définie dans le fichier APIError.js
import APIError from "./APIError.js";

// https://expressjs.com/en/guide/error-handling.html pour aider à la conception du errorHandler
/**
    * Récupère les erreurs
    * @param {*} error - Informations (message)
    * @param {*} req - express
    * @param {*} response - express
    * @param {*} next - express
    */
const errorHandler = (error, req, response, next) => { // On a besoin dans les errorhandler de 4 paramètres : error, req (ici inutile), response et next
    debug('errorHandler', error);
    console.log(error);
    logger.log('error', error.message);
    
    if (error instanceof APIError) {
        // On définit le NODE.ENV en fonction de l'avancée du projet
        if (process.env.NODE_ENV === 'development') {
            return response.status(error.status).json({ status: 'error', message: error.message, stack: error.stack });
        }
        return response.status(error.status).json({ status: 'error', message: error.message });
    }
    if (process.env.NODE_ENV === 'development') {
        return response.status(500).json({ status: 'error', message: error.message, stack: error.stack });
    }
    return response.status(500).json({ status: 'error', message: 'Internal server error' });

};

export default errorHandler;