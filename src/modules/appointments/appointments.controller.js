import * as service from "./appointments.service.js";

export const getAll = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const appointments = await service.getAll(userId);
        res.json(appointments);
    } catch (err) {
        next(err);
    }
};

export const getByPatient = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const patientId = Number(req.params.id);
        const appointments = await service.getByPatient(userId, patientId);
        res.json(appointments);
    } catch (err) {
        next(err);
    }
};

export const create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const appointment = await service.create(userId, req.body);
        res.status(201).json(appointment);
    } catch (err) {
        next(err);
    }
};

export const update = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const appointment = await service.update(id, req.body);
        res.json(appointment);
    } catch (err) {
        next(err);
    }
};

export const remove = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const id = Number(req.params.id);
        const deleted = await service.remove(userId, id);

        if (deleted.count === 0) {
            return res.status(404).json({ error: "No encontrado o no autorizado" });
        }

        res.json({ message: "Turno eliminado correctamente" });
    } catch (err) {
        next(err);
    }
};
