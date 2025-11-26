import prisma from "../../core/prismaClient.js";

/**
 * Obtener todos los turnos simples (desde hoy en adelante)
 */
export const getAll = async (userId) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Turnos de la tabla simple
    const simple = await prisma.simpleAppointment.findMany({
        where: { userId, date: { gte: today } },
        orderBy: { date: "asc" }
    });

    // Turnos viejos (Appointment sin pacienteId)
    const old = await prisma.appointment.findMany({
        where: { patientId: null, userId, date: { gte: today } },
        orderBy: { date: "asc" }
    });

    // Normalizar estructura de salida
    return [
        ...simple.map(t => ({
            id: t.id,
            name: t.name,
            date: t.date,
            time: t.time,
            type: "simple"
        })),
        ...old.map(t => ({
            id: t.id,
            name: t.treatment ?? "Sin nombre",
            date: t.date,
            time: t.time,
            type: "legacy"
        }))
    ];
};

/**
 * Crear turno simple
 */
export const create = async (userId, data) => {
    const localDate = new Date(data.date + "T00:00:00");
    localDate.setHours(localDate.getHours() + 3); // Ajuste UTC-3

    return await prisma.simpleAppointment.create({
        data: {
            name: data.name,
            date: localDate,
            time: data.time,
            userId
        }
    });
};

/**
 * Eliminar turno simple o antiguo
 */
export const remove = async (userId, id) => {
    // Borra en ambas tablas por seguridad
    await prisma.simpleAppointment.deleteMany({
        where: { id, userId }
    });

    await prisma.appointment.deleteMany({
        where: { id, userId, patientId: null }
    });

    return { message: "Turno eliminado correctamente" };
};
