import jwt from "jsonwebtoken";

export const authenticate = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header)
    return res.status(401).json({ error: "Token requerido" });

    const token = header.split(" ")[1];

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch {
        return res.status(403).json({ error: "Token inválido o expirado" });
    }
};
