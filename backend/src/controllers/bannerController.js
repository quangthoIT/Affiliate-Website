import Banner from "../models/bannerModel.js";

export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createBanner = async (req, res) => {
  try {
    const banner = new Banner(req.body);
    const savedBanner = await banner.save();
    res.status(201).json({ success: true, data: savedBanner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateBanner = async (req, res) => {
  try {
    const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBanner) {
      return res.status(404).json({ success: false, message: "Không tìm thấy banner" });
    }
    res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Không tìm thấy banner" });
    }
    res.status(200).json({ success: true, message: "Đã xóa banner" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
