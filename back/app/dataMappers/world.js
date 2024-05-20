// Le worldDataMapper faisant le lien entre le worldController et les fonctions sql

import { executeRequest } from "../helper/pgHelper.js";
import { executeRequestWithSingleResult } from "../helper/pgHelper.js";

/**
 * @typedef {object} World
 * @property {number} id - Primary key
 * @property {string} route - Route (for SEO)
 * @property {string} label - Name of the world
 * @property {string} img - Image's text of the world
 */
const worldDataMapper = {

    // Pour récupérer tous les univers existants dans la bdd :
    async findAll() {
        // On utilise la fonction sql get_all_worlds
        const sqlQuery = "SELECT * FROM get_all_worlds();";
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery); 
    },

    // Pour récupérer un univers en particulier :
    async findById(id){
        // On utilise la fonction sql get_world_by_id
        const sqlQuery = "SELECT * FROM get_world_by_id($1);";
        // à laquelle on transfère l'id de l'univers donné par le front
        const values = [id];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequestWithSingleResult(sqlQuery, values);
    },
};

// On exporte le worldDataMapper
export { worldDataMapper };