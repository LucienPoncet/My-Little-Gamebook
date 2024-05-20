// Le compartmentDataMapper faisant le lien entre le compartmentController et les fonctions sql

import pool from "../services/pgPool.js";

/**
 * @typedef {object} Compartment
 * @property {number} id - Primary key
 * @property {string} route - Route (for SEO)
 * @property {number} position - Position of the compartment
 * @property {string} class - Class of the compartment
 * @property {string} children - Next children compartments' PK of the current compartment
 * @property {number} story_id - Primary key of the compartment's story
 * @property {number} place_id - Primary key of the compartment's place
 * @property {number} npc_id - Primary key of the compartment's npc
 */
const compartmentDataMapper = {

    // Pour récupérer toutes les cases existantes dans la bdd :
    async findAll() {
        // On utilise la fonction sql get_all_compartments
        const sqlQuery = "SELECT * FROM get_all_compartments();";

        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery);
        // On récupère les informations données par la bdd
        results = response.rows;
        // On ne récupère que le premier objet get_all_compartments de chaque objet :
        result = results.map(a => a.get_all_compartments);
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },

    // Pour récupérer toutes les cases existantes dans la bdd selon une classe de cases choisie :
    async findByClass(compartmentClassName) {
        // On utilise la fonction sql get_all_compartments_by_class
        const sqlQuery = "SELECT * FROM get_all_compartments_by_class($1);";
        // à laquelle on transfère le nom de la classe ('text') donné par le front
        const values = [compartmentClassName];

        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        results = response.rows;
        // On ne récupère que le premier objet get_all_compartments_by_class de chaque objet :
        result = results.map(a => a.get_all_compartments_by_class);
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },

    // Pour récupérer une case en particulier :
    async findById(id){
        // On utilise la fonction sql get_compartment_by_id
        const sqlQuery = "SELECT * FROM get_compartment_by_id($1);";
        // à laquelle on transfère l'id de la case donné par le front
        const values = [id];
        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        results = response.rows[0];
        // On ne récupère que le premier objet get_compartment_by_id du résultat :
        result = results.get_compartment_by_id;
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },

    // Pour récupérer toutes les cases existantes dans la bdd selon une histoire choisie :
    async findByStory(storyId){
        // On utilise la fonction sql get_all_compartments_by_story
        const sqlQuery = "SELECT * FROM get_all_compartments_by_story($1);";
        // à laquelle on transfère l'id de l'histoire donné par le front
        const values = [storyId];
        
        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        results = response.rows;
        // On ne récupère que le premier objet get_all_compartments_by_story de chaque objet :
        result = results.map(a => a.get_all_compartments_by_story);
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },

    // Pour récupérer toutes les cases existantes dans la bdd selon une histoire et une certaine classe de cases choisies :
    async findByStoryAndByClass(storyId, compartmentClassName) {
        // On utilise la fonction sql get_all_compartments_by_story_and_by_class
        const sqlQuery = "SELECT * FROM get_all_compartments_by_story_and_by_class($1, $2);";
        // à laquelle on transfère l'id de l'histoire et le nom de la classe ('text') donné par le front
        const values = [storyId, compartmentClassName];
        
        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        results = response.rows;
        // On ne récupère que le premier objet get_all_compartments_by_story_and_by_class de chaque objet :
        result = results.map(a => a.get_all_compartments_by_story_and_by_class);
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },

    // Pour récupérer la case dans la bdd selon une histoire et la classe 'beginning' :
    async findByStoryAndByClassBeginning(storyId) {
        // On utilise la fonction sql get_compartment_by_story_and_by_class_beginning
        const sqlQuery = "SELECT * FROM get_compartment_by_story_and_by_class_beginning($1);";
        // à laquelle on transfère l'id de l'histoire et le nom de la classe ('text') donné par le front
        const values = [storyId];
        
        let result;
        let results
        let error;
        try {
        // Avec la méthode async/await
        const response = await pool.query(sqlQuery,values);
        // On récupère les informations données par la bdd
        results = response.rows[0];
        // On ne récupère que le premier objet get_compartment_by_story_and_by_class_beginning du résultat :
        result = results.get_compartment_by_story_and_by_class_beginning;
        }
        catch (err) {
            error = err;
        }
        // On retourne soit le résultat, soit l'erreur
        return {result,error};
    },
};

// On exporte le compartmentDataMapper
export { compartmentDataMapper };