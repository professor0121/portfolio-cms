import {Router} from 'express';
import * as adsController from '../controllers/ads.controller.js';

const { createAd, getAllAds, getAdById, updateAdById, deleteAdById, getAdsByUserId, searchAds, getRecentAds, getPopularAds, getAdsByPagination } = adsController;
const adsRouter = Router();
adsRouter.post("/create", createAd);
adsRouter.get("/", getAllAds);
adsRouter.get("/:id", getAdById);
adsRouter.patch("/:id", updateAdById);
adsRouter.delete("/:id", deleteAdById);
adsRouter.get("/user/:userId", getAdsByUserId);
adsRouter.get("/search", searchAds);
adsRouter.get("/recent", getRecentAds);
adsRouter.get("/popular", getPopularAds);
adsRouter.get("/pagination", getAdsByPagination);
export default adsRouter;