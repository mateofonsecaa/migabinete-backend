import * as service from "./auth.service.js";

export const register = async (req, res, next) => {
    try {
        const result = await service.register(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await service.login(req.body);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const verifyEmail = async (req, res, next) => {
    try {
        const token = req.params.token;
        const result = await service.verifyEmail(token);
        res.redirect(result.redirectUrl);
    } catch (err) {
        next(err);
    }
};

export const me = async (req, res) => {
    try {
        // El middleware verifyToken ya colocó el contenido del token acá:
        // req.user = { id, email, role, ... }
        return res.json(req.user);
    } catch (err) {
        return res.status(500).json({ message: "Error obteniendo usuario actual" });
    }
};
