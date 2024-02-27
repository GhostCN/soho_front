// authMiddleware.js

import jwt from 'jsonwebtoken';

const authMiddleware = (handler) => async (req, res) => {
    // Récupérer le token depuis les cookies, les headers ou le corps de la requête
    const token = req.cookies.token || req.headers.authorization || req.body.token;

    if (!token) {
        return res.status(401).json({ message: 'Token non fourni' });
    }

    try {
        // Vérifier la validité du token
        const decoded = jwt.verify(token, 'votre_clé_secrète');

        // Ajouter les informations de l'utilisateur décodées à la requête
        req.user = decoded;

        // Appeler le gestionnaire (handler) de la route
        return handler(req, res);
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token invalide' });
    }
};

export default authMiddleware;