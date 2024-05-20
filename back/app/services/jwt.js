import jwt from 'jsonwebtoken';

const JWT = {
    /**
     * Pour générer du token
     * @param {*} user - données de l'utilisateur
     * @returns token
     */
    encode(user){
        // Durée de vie du token
        const expiresIn = '1h';
        return jwt.sign(user, process.env.JWT_SECRET, { expiresIn });
    },
    
    /**
     * Pour déchiffrer un token
     * @param {*} token 
     * @returns 
     */
    decode(token){
        let result;
        let error;
        try{
            result = jwt.verify(token,process.env.JWT_SECRET);
        }
        catch(err){
            error = new Error("Hop hop hop, qu'est ce que tu fais là ?");
        }
        return {result,error};
    }
};

export default JWT;
