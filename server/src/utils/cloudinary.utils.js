import cloudinary from "../config/cloudinary.config.js";

/**
 * Upload an image to Cloudinary
 * @param {string} filePath - Path to the image file
 * @param {string} folder - Optional folder name in Cloudinary
 * @returns {Promise<{url: string, public_id: string}>}
 */
export const uploadImage = async (filePath, folder = "cms") => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      quality: "auto",
    });

    return {
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (err) {
    console.error("Cloudinary upload failed:", err);
    throw err;
  }
};

/**
 * Delete an image from Cloudinary by public_id
 * @param {string} public_id
 */
export const deleteImage = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    console.log("Deleted:", result);
    return result;
  } catch (err) {
    console.error("Cloudinary delete failed:", err);
    throw err;
  }
};
