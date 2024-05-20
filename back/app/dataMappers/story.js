// Le storyDataMapper faisant le lien entre le storyController et les fonctions sql

// Import des fonctions du pgHelper pour refactoriser les fonctions
import { executeRequest } from "../helper/pgHelper.js";
import { executeRequestWithSingleResult } from "../helper/pgHelper.js";

import pool from "../services/pgPool.js";

/**
 * @typedef {object} Story
 * @property {number} id - Primary key
 * @property {string} route - Route (for SEO)
 * @property {string} name - Name of the story
 * @property {number} level - Level of the story
 */
const storyDataMapper = {

    // Pour récupérer toutes les histoires existantes dans la bdd :
    async findAll() {
        // On utilise la fonction sql get_all_stories
        const sqlQuery = "SELECT * FROM get_all_stories();";

        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery);
        // On récupère les informations données par la bdd
        results = response.rows;
        // On ne récupère que le premier objet get_all_stories de chaque objet :
        result = results.map(a => a.get_all_stories);
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error}; 
    },

    // Pour récupérer toutes les histoires associées à un genre existantes dans la bdd :
    async findByGenre(genreId) {
        // On utilise la fonction sql get_all_stories_by_genre
        const sqlQuery = "SELECT * FROM get_all_stories_by_genre($1);";
        // à laquelle on transfère l'id du genre donné par le front
        const values = [genreId];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery, values);  
    },

    // Pour récupérer toutes les histoires d'un certain niveau existantes dans la bdd :
    async findByLevel(level) {
        // On utilise la fonction sql get_all_stories_by_level
        const sqlQuery = "SELECT * FROM get_all_stories_by_level($1);";
        // à laquelle on transfère le niveau (integer) donné par le front
        const values = [level];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery, values);  
    },

    // Pour récupérer une histoire en particulier :
    async findById(id){
        // On utilise la fonction sql get_story_by_id
        const sqlQuery = "SELECT * FROM get_story_by_id($1);";
        // à laquelle on transfère l'id de l'histoire donné par le front
        const values = [id];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequestWithSingleResult(sqlQuery, values);  
    },
};


// On exporte le storyDataMapper
export { storyDataMapper };