import prisma from "../../core/prismaClient.js";

/**
 * Obtiene la entrevista completa de un paciente
 */
export const getByPatient = async (patientId) => {
    return await prisma.interview.findUnique({
        where: { patientId }
    });
};

/**
 * Crea o actualiza una entrevista
 */
export const upsert = async (patientId, data) => {
    // Convertir array --> string si corresponde
    if (Array.isArray(data.concerns)) {
        data.concerns = data.concerns.join(", ");
    }

    const exists = await prisma.interview.findUnique({
        where: { patientId }
    });

    if (exists) {
        return await prisma.interview.update({
            where: { patientId },
            data
        });
    }

    return await prisma.interview.create({
        data: {
            ...data,
            patient: { connect: { id: patientId } }
        }
    });
};
