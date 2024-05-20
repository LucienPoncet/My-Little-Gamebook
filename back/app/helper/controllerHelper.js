/**
 * Retourne la réponse en vérifiant s'il y a une erreur
 * @param {*} res réponse d'express
 * @param {*} result données à transmettre
 * @param {*} error erreur éventuelle
 * @param {*} next middleware pour déclencher le système de gestion d'erreur d'express
 */

export function manageResponse(res,result,error,next){
    // Vérification d'erreur
    if(error){
        next(error);
    }
    // Renvoi json
    else{
        res.json(result);
    }
}