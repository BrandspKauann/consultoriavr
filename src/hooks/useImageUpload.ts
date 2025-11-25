import { supabase } from "@/integrations/supabase/client";

const STORAGE_BUCKET = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "article-media";

const generateFileId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const useImageUpload = () => {
  const uploadImage = async (file: File, folder: string) => {
    if (!STORAGE_BUCKET) {
      throw new Error("Bucket de armazenamento não configurado. Defina VITE_SUPABASE_STORAGE_BUCKET.");
    }

    const fileExt = file.name.split(".").pop() || "png";
    const safeFolder = folder || "general";
    const fileName = `${safeFolder}-${generateFileId()}.${fileExt}`;
    const filePath = `${safeFolder}/${fileName}`;

    const { error } = await supabase.storage.from(STORAGE_BUCKET).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(filePath);
    return {
      path: filePath,
      publicUrl: data.publicUrl,
    };
  };

  return {
    uploadImage,
    bucket: STORAGE_BUCKET,
  };
};

