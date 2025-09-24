import * as adService from "../services/ad.service.js";

// GET /ads - public, optionally only active
export const fetchAds = async (req, res) => {
  try {
    const ads = await adService.getAdsService();
    res.json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /ads/:id
export const fetchAd = async (req, res) => {
  try {
    const ad = await adService.getAdService(req.params.id);
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /ads
export const createAd = async (req, res) => {
  try {
    const ad = await adService.createAdService(req.body);
    res.status(201).json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /ads/:id
export const updateAd = async (req, res) => {
  try {
    const ad = await adService.updateAdService(req.params.id, req.body);
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json(ad);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /ads/:id
export const deleteAd = async (req, res) => {
  try {
    const ad = await adService.deleteAdService(req.params.id);
    if (!ad) return res.status(404).json({ error: "Ad not found" });
    res.json({ message: "Ad deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
