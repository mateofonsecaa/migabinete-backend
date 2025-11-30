// backend/src/core/utils/upload.js
import { supabase } from "../supabaseClient.js";   // OJO: debe ser import con {}
import { randomUUID } from "crypto";

// Genera nombre único
function uniqueName(originalName) {
  const ext = originalName.split(".").pop();
  return `${Date.now()}-${randomUUID()}.${ext}`;
}

/**
 * Sube un archivo al bucket definido (profile, patients, treatments)
 * @param {Buffer} fileBuffer
 * @param {string} originalName
 * @param {string} folder
 */
export async function uploadToSupabase(fileBuffer, originalName, folder) {
  try {
    const ext = originalName.split(".").pop();
    const fileName = uniqueName(originalName);
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from(process.env.SUPABASE_BUCKET) // <- el bucket correcto
      .upload(filePath, fileBuffer, {
        contentType: `image/${ext}`,
        upsert: false,
      });

    if (uploadError) {
      console.error("❌ Error subiendo archivo:", uploadError);
      throw new Error("No se pudo subir la imagen a Supabase");
    }

    // Obtener URL pública
    const { data } = supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(filePath);

    return data.publicUrl;

  } catch (err) {
    console.error("❌ Error en uploadToSupabase:", err);
    throw err;
  }
}
