import prisma from "../../core/prismaClient.js";

// Obtener todos los turnos del usuario
export const getAll = async (userId) => {
    return await prisma.appointment.findMany({
        where: { userId },
        include: { patient: true },
        orderBy: { date: "asc" },
    });
};

// Obtener turnos por ID de paciente
export const getByPatient = async (userId, patientId) => {
    return await prisma.appointment.findMany({
        where: { userId, patientId },
        orderBy: { date: "desc" },
    });
};

// Crear un turno
export const create = async (userId, data) => {
    const { patientId, date, time, treatment, amount, notes, status, method, beforePhoto, afterPhoto } = data;

    // Ajuste horario Argentina
    const treatmentDate = new Date(`${date}T${time}:00-03:00`);

    return await prisma.appointment.create({
        data: {
            patientId: Number(patientId),
            date: treatmentDate,
            time,
            treatment,
            amount: amount ? parseFloat(amount) : null,
            notes,
            status,
            method,
            beforePhoto,
            afterPhoto,
            userId,
        },
        include: { patient: true },
    });
};

// Actualizar turno
export const update = async (id, data) => {
    const { treatment, date, time, amount, notes, status, method, beforePhoto, afterPhoto } = data;

    const treatmentDate = new Date(`${date}T${time}:00-03:00`);

    return await prisma.appointment.update({
        where: { id: Number(id) },
        data: {
            treatment,
            date: treatmentDate,
            time,
            amount: amount ? parseFloat(amount) : null,
            notes,
            status,
            method,
            beforePhoto: beforePhoto || null,
            afterPhoto: afterPhoto || null,
        },
        include: { patient: true },
    });
};

// Eliminar turno
export const remove = async (userId, id) => {
    return await prisma.appointment.deleteMany({
        where: { id: Number(id), userId }
    });
};
