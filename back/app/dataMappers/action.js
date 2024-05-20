// Le actionDataMapper faisant le lien entre le actionController et les fonctions sql

// Import des fonctions du pgHelper pour refactoriser les fonctions
import { executeRequest } from "../helper/pgHelper.js";
import { executeRequestWithSingleResult } from "../helper/pgHelper.js";

/**
 * @typedef {object} Action
 * @property {number} id - Primary key
 * @property {string} route - Route (for SEO)
 * @property {string} label - Name of the action
 * @property {string} consequence - Consequence of the action
 * @property {string} class - Class of the action
 * @property {string} img - Image's text of the action
 */
const actionDataMapper = {

    // Pour récupérer toutes les actions existantes dans la bdd :
    async findAll() {
        // On utilise la fonction sql get_all_actions
        const sqlQuery = "SELECT * FROM get_all_actions();";
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery);
    },

    // Pour récupérer toutes les actions associées à un personnage existantes dans la bdd :
    async findByNpc(npcId) {
        // On utilise la fonction sql get_all_actions_by_npc
        const sqlQuery = "SELECT * FROM get_all_actions_by_npc($1);";
        // à laquelle on transfère l'id du personnage donné par le front
        const values = [npcId];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery, values);
    },

    // Pour récupérer toutes les actions associées à un objet existantes dans la bdd :
    async findByItem(itemId) {
        // On utilise la fonction sql get_all_actions_by_item
        const sqlQuery = "SELECT * FROM get_all_actions_by_item($1);";
        // à laquelle on transfère l'id de l'objet donné par le front
        const values = [itemId];
        // Appel de la fonction du pgHelper pour exécuter la requête.
        return executeRequest(sqlQuery, values);
    },

    // Pour récupérer toutes les actions existantes dans la bdd selon une classe d'actions choisie :
    async findByClass(actionClassName) {
        // On utilise la fonction sql get_all_actions_by_class
        const sqlQuery = "SELECT * FROM get_all_actions_by_class($1);";
        const values = [actionClassName];
        // Appel de la fonction du pgHelper pour exécuter la requête
        return executeRequest(sqlQuery, values);
    },
        
    // Pour récupérer une action en particulier :
    async findById(id){
        // On utilise la fonction sql get_action_by_id
        const sqlQuery = "SELECT * FROM get_action_by_id($1);";
        // à laquelle on transfère l'id de l'action donné par le front
        const values = [id];
        // Appel de la fonction du pgHelper pour exécuter la requête
        return executeRequestWithSingleResult(sqlQuery, values);
    },

    // Pour récupérer toutes les actions associées à une case existantes dans la bdd :
    async findByCompartment(compartmentId) {
        // On utilise la fonction sql get_all_actions_by_compartment
        const sqlQuery = "SELECT * FROM get_all_actions_by_compartment($1);";
        // à laquelle on transfère l'id de la case donné par le front
        const values = [compartmentId];
        // Appel de la fonction du pgHelper pour exécuter la requête.
        return executeRequest(sqlQuery, values);
    },
};

// On exporte le actionDataMapper
export { actionDataMapper };
