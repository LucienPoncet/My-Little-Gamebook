// On importe pgpool pour pouvoir effectuer les requêtes sql
import pool from "../services/pgPool.js";

/**
 * Fonction générique qui retourne les lignes d'une requête SQL
 * @param {string} sqlQUery - Requêtes SQL
 * @param {array} values - Valeurs de la requête
 * @returns
 */

export async function executeRequest(sqlQuery, values){
    let result;
    let error;

    try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        result = response.rows;
        }
        catch (err) {
            error = err;
        }
    // On retourne soit le résultat, soit l'erreur
    return {result,error};
};

/**
 * Fonction générique qui retourne la première ligne d'une requête SQL
 * @param {*} sqlQuery 
 * @returns 
 */

export async function executeRequestWithSingleResult(sqlQuery, values){
    let result;
    let error;

    try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        result = response.rows[0];
        }
        catch (err) {
            error = err;
        }
    // On retourne soit le résultat, soit l'erreur
    return {result,error};
};

/**
 * Fonction générique qui retourne une rangée
 * @param {*} sqlQuery 
 * @returns 
 */

// export async function executeDeleteUserRequest(sqlQuery, values){
//     let result;
//     let error;

//     try {
//         // Avec la méthode async/await
//         const response = await pool.query(sqlQuery,values);
//         // // On retourne la dernière rangée ayant été affectée par une suppression :
//         // result = response.rowCount == 1;
//         //  Si aucune rangée affectée, utilisateur inexistant.
//         if (response.rowCount === 0) {
//             return res.status(404).json({ message: 'Utilisateur inconnu.'})
//         }
//         // En cas de succès
//         res.json({message: 'Utilisateur supprimé avec succès.'})
//         }
//         catch (err) {
//             error = err;
//         }
//     // On retourne soit le résultat, soit l'erreur
//     return {result,error};
