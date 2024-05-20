// Le npcDataMapper faisant le lien entre le npcController et les fonctions sql

// Import des fonctions du pgHelper pour refactoriser les fonctions
import { executeRequest } from "../helper/pgHelper.js";
import { executeRequestWithSingleResult } from "../helper/pgHelper.js";

/**
 * @typedef {object} Npc
 * @property {number} id - Primary key
 * @property {string} route - Route (for SEO)
 * @property {string} label - Name of the npc
 * @property {string} img - Image's text of the npc
 */
const npcDataMapper = {

    // Pour récupérer tous les personnages existants dans la bdd :
    async findAll() {
        // On utilise la fonction sql get_all_npcs
        const sqlQuery = "SELECT * FROM get_all_npcs();";
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery);
    },

    // Pour récupérer tous les personnages appartenant à un univers existants dans la bdd :
    async findByWorld(worldId) {
        // On utilise la fonction sql get_all_npcs_by_world
        const sqlQuery = "SELECT * FROM get_all_npcs_by_world($1);";
        // à laquelle on transfère l'id de l'univers donné par le front
        const values = [worldId];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequest(sqlQuery, values);
    },

    // Pour récupérer un personnage en particulier :
    async findById(id){
        // On utilise la fonction sql get_npc_by_id
        const sqlQuery = "SELECT * FROM get_npc_by_id($1);";
        // à laquelle on transfère l'id du personnage donné par le front
        const values = [id];
        // Appel de la fonction du pgHelper pour exécuter la requête. 
        return executeRequestWithSingleResult(sqlQuery, values);
    },
};

// On exporte le npcDataMapper
export { npcDataMapper };