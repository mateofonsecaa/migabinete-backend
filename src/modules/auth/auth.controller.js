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
