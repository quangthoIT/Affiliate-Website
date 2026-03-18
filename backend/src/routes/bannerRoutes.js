import express from "express";
import {
  getBanners,
  getAllBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} from "../controllers/bannerController.js";

const router = express.Router();

// Public route
router.get("/", getBanners);

// Admin routes (should ideally have admin middleware)
router.get("/all", getAllBanners);
router.post("/", createBanner);
router.put("/:id", updateBanner);
router.delete("/:id", deleteBanner);

export default router;
