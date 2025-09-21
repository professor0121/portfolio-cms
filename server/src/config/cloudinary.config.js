import { v2 as cloudinary } from "cloudinary";
import ENV from "./env.config.js"

cloudinary.config({
  cloud_name: 'do88eor6e',
  api_key: '695571869321514',
  api_secret: '-wG3rGl7Bk9f377kC-t9cPwp_3Q',
  secure: true,
});
// cloudinary.config({
//   cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
//   api_key: ENV.CLOUDINARY_API_KEY,
//   api_secret: ENV.CLOUDINARY_API_SECRET,
//   secure: true,
// });
console.log("cloudinary is connected")

export default cloudinary;
