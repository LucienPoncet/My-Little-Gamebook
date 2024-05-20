// Le genreDataMapper faisant le lien entre le genreController et les fonctions sql

// Import des fonctions du pgHelper pour refactoriser les fonctions
import { executeRequest } from "../helper/pgHelper.js";
import { executeRequestWithSingleResult } from "../helper/pgHelper.js";

/**
 * @typedef {object} Genre
 * @property {number} id - Primary key
 * @property {string} route - Route (for SEO)
 * @property {string} label - Name of the genre
 * @property {string} img - Image's text of the genre
 */
const genreDataMapper = {

    // Pour récupérer tous les genres existants dans la bdd :
    async findAll() {
        // On utilise la fonction sql get_all_genres
        const sqlQuery = "SELECT * FROM get_all_genres();";
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery);
    },

    // Pour récupérer tous les genres associés à une histoire existants dans la bdd :
    async findAllGenresOfAStory(storyId) {
        // On utilise la fonction sql get_all_genres_of_a_story
        const sqlQuery = "SELECT * FROM get_all_genres_of_a_story($1);";
        // à laquelle on transfère l'id de l'histoire donné par le front
        const values = [storyId];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery, values);
    },

    // Pour récupérer un genre en particulier :
    async findById(id){
        // On utilise la fonction sql get_genre_by_id
        const sqlQuery = "SELECT * FROM get_genre_by_id($1);";
        // à laquelle on transfère l'id du genre donné par le front
        const values = [id];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequestWithSingleResult(sqlQuery, values);
    },
};

// On exporte le genreDataMapper
export { genreDataMapper };