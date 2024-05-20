// Le userDataMapper faisant le lien entre le userController et les fonctions sql

// Import des fonctions du pgHelper pour refactoriser les fonctions
import { executeRequestWithSingleResult } from "../helper/pgHelper.js";
import { executeRequest } from "../helper/pgHelper.js";
import pool from "../services/pgPool.js";

/**
 * @typedef {object} User
 * @property {number} id - Primary key
 * @property {string} route - Route (for SEO)
 * @property {string} lastname - Lastname of the user
 * @property {string} firstname - Firstname of the user
 * @property {string} alias - Alias of the user
 * @property {string} email - Mail of the user
 * @property {string} password - Password of the user
 * @property {string} avatar - Avatar's text of the user
 */

/**
 * @typedef {object} InputUser
 * @property {string} route - Route (for SEO)
 * @property {string} lastname - Lastname of the user
 * @property {string} firstname - Firstname of the user
 * @property {string} alias - Alias of the user
 * @property {string} email - Mail of the user
 * @property {string} password - Password of the user
 * @property {string} avatar - Avatar's text of the user
 */

// Tout sera contenu dans l'objet userDataMapper
const userDataMapper = {

    // Pour ajouter un utilisateur au moment du signup :
    async createUser(user){
        // On utilise la fonction sql add_user
        const sqlQuery = "SELECT * FROM add_user($1);";
        // à laquelle on transfère les informations de l'utilisateur données par le front
        const values = [user];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequestWithSingleResult(sqlQuery, values); 
    },

    // Pour vérifier si un utilisateur existe au moment du signin :
    async authenticateUser(user){
        // On utilise la fonction sql verify_user
        const sqlQuery = "SELECT * FROM verify_user($1);";
        // à laquelle on transfère les informations de l'utilisateur données par le front
        const values = [user];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequestWithSingleResult(sqlQuery, values); 
    },

    // Pour récupérer un utilisateur en particulier :
    async getUser(id){
        // On utilise la fonction sql get_user_by_id
        const sqlQuery = "SELECT * FROM get_user_by_id($1);";
        // à laquelle on transfère l'id de l'utilisateur donné par le front
        const values = [id];

        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        results = response.rows[0];
        // On ne récupère que le premier objet get_user_by_id du résultat :
        result = results.get_user_by_id;
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },

    // Pour récupérer un utilisateur par son alias :
    async getUserByAlias(alias){
        // On utilise la fonction sql get_user_by_alias
        const sqlQuery = "SELECT * FROM get_user_by_alias($1);";
        // à laquelle on transfère l'alias de l'utilisateur donné par le front
        const values = [alias];

        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        results = response.rows[0];
        // On ne récupère que le premier objet get_user_by_alias du résultat :
        result = results.get_user_by_alias;
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },

    // Pour modifier les informations d'un utilisateur en particulier :
    async updateUser(user){
        // On utilise la fonction sql update_user
        const sqlQuery = "SELECT * FROM update_user($1);";
        // à laquelle on transfère les informations de l'utilisateur données par le front
        const values = [user];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequestWithSingleResult(sqlQuery, values); 
    },
    
    // Pour supprimer un utilisateur en particulier :
    async deleteUser(userId){
        const sqlQuery = "SELECT * FROM delete_user($1);";
        const values = [userId];

        let result;
        let error;
        try {
            const response = await pool.query(sqlQuery,values);
            // Pour ne récupérer seulement qu'une ligne
            result = response.rowCount == 1;
        }
        catch (err) {
            error = err;
        }
        // on retourne soit le résultat, soit l'erreur :
        return {result,error};
    },
};

// On exporte le userDataMapper
export { userDataMapper };
