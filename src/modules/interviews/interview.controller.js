import * as service from "./interview.service.js";

/**
 * GET /interviews/:patientId
 */
export const getByPatient = async (req, res, next) => {
    try {
        const patientId = Number(req.params.patientId);

        if (isNaN(patientId)) {
            return res.status(400).json({ error: "patientId inválido" });
        }

        const interview = await service.getByPatient(patientId);

        if (!interview) {
            return res.status(404).json({ message: "Entrevista no encontrada" });
        }

        res.json(interview);
    } catch (err) {
        next(err);
    }
};

/**
 * POST /interviews
 */
export const upsert = async (req, res, next) => {
    try {
        const patientId = Number(req.body.patientId);

        if (isNaN(patientId)) {
            return res.status(400).json({ error: "patientId inválido" });
        }

        // Todos los campos enviados excepto patientId
        const data = { ...req.body };
        delete data.patientId;

        const interview = await service.upsert(patientId, data);

        res.json(interview);
    } catch (err) {
        next(err);
    }
};
