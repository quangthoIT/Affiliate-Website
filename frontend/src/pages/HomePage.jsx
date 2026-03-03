import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import banner from "../assets/Banner-AffiliateHub.png";
import Title from "@/components/Title";
import api from "@/lib/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "./ProductItem";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/api/products");
        setProducts(data.data);
      } catch (error) {
        toast.error("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const hotProducts = products.filter((product) => product.isHot).slice(0, 6);
  const newProducts = [...products].reverse().slice(0, 8);
  const allProducts = products.slice(0, 12);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
        <p className="mt-4 text-lg text-gray-500">
          Đang lấy danh sách sản phẩm...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <img src={banner} alt="Banner" className="w-full rounded-lg" />
      <section>
        <Title
          title="Sản phẩm mới nhất"
          description="Khám phá những sản phẩm mới nhất vừa được cập nhật với ưu đãi hấp dẫn dành riêng cho bạn."
        />
        <Slider {...settings}>
          {newProducts.map((product) => (
            <div key={product._id} className="mb-4">
              <ProductItem product={product} />
            </div>
          ))}
        </Slider>
      </section>

      <section className="mt-24">
        <Title
          title="Sản phẩm nổi bật"
          description="Những sản phẩm đang được yêu thích và săn đón nhiều nhất hiện nay."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {hotProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/featured")}
          >
            Xem thêm
          </Button>
        </div>
      </section>

      <section className="mt-20 mb-8">
        <Title
          title="Tất cả sản phẩm"
          description="Khám phá bộ sưu tập sản phẩm chất lượng với mức giá tốt nhất và nhiều ưu đãi hấp dẫn dành cho bạn."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allProducts.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/products")}
          >
            Xem thêm
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
