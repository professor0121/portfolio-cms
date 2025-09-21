import cloudinary from "../config/cloudinary.config.js";

/**
 * Upload image/video/pdf to Cloudinary
 * @param {string} filePath
 * @param {string} folder
 */
export const uploadMedia = async (filePath, folder = "cms") => {
  try {
    const resourceType = filePath.match(/\.(mp4|mov|avi)$/i)
      ? "video"
      : filePath.match(/\.pdf$/i)
      ? "raw"
      : "image";

    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType,
      quality: "auto",
    });

    return { url: result.secure_url, public_id: result.public_id, type: resourceType };
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
};

/**
 * Delete media by public_id
 */
export const deleteMedia = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id, { invalidate: true });
    return result;
  } catch (err) {
    console.error("Cloudinary delete failed:", err);
    throw err;
  }
};

/**
 * Get all media from a folder
 */
export const getAllMedia = async () => {
  try {
    const result = await cloudinary.api.resources({
      type: "upload",
      prefix: "cms/",
      max_results: 100,
    });
    return result.resources.map(file => ({
      url: file.secure_url,
      public_id: file.public_id,
      type: file.resource_type,
    }));
  } catch (err) {
    console.error("Cloudinary fetch failed:", err);
    throw err;
  }
};
