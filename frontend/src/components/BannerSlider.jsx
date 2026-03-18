import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import api from "@/lib/axios";
import { toast } from "sonner";

const BannerSlider = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await api.get("/api/banners");
        setBanners(data.data);
      } catch (error) {
        toast.error("Lỗi khi tải banner");
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  if (loading) {
    return (
      <div className="w-full h-[130px] md:h-[200px] lg:h-[300px] bg-gray-100 rounded-lg flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
      </div>
    );
  }

  if (banners.length === 0) {
    return null; // Không hiển thị gì nếu không có banner
  }

  return (
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner._id} className="relative outline-none">
            {banner.link ? (
              <Link to={banner.link}>
                <BannerImage banner={banner} />
              </Link>
            ) : (
              <BannerImage banner={banner} />
            )}
          </div>
        ))}
      </Slider>
  );
};

const BannerImage = ({ banner }) => (
  <img
    src={banner.imageUrl}
    alt={banner.title || "Banner"}
    className="w-full h-[130px] md:h-[200px] lg:h-[300px] rounded-lg"
  />
);

export default BannerSlider;
