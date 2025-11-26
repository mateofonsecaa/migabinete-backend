import * as service from "./auth.service.js";
import * as repo from "./auth.repository.js";

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

// 🔥 NUEVA FUNCIÓN /me CORRECTA
export const me = async (req, res) => {
    try {
        // req.user viene del verifyToken → { id, email }
        const user = await repo.findUserById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Devolvemos SOLO lo que el frontend necesita
        return res.json({
            id: user.id,
            name: user.name,
            email: user.email,
            profession: user.profession,
            phone: user.phone,
            profileImage: user.profileImage,
        });

    } catch (err) {
        return res.status(500).json({ message: "Error obteniendo usuario actual" });
    }
};
