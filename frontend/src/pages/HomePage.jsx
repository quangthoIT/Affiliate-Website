import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import banner from "../assets/Banner-AffiliateHub.png";
import errorPicture from "../assets/ErrorPicture.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Title from "@/components/Title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import api from "@/lib/axios";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const getCategoryLabel = (value) => {
    return PRODUCT_CATEGORIES.find((c) => c.value === value)?.label || value;
  };

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
      <Title
        title="Tất cả sản phẩm"
        description="Khám phá bộ sưu tập sản phẩm chất lượng với mức giá tốt nhất và nhiều ưu đãi hấp dẫn dành cho bạn."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card
            key={product._id}
            className="overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover p-4 transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = errorPicture;
                }}
              />
              {product.isHot && (
                <Badge
                  variant="destructive"
                  className="absolute top-0.5 left-2"
                >
                  Hot Deal
                </Badge>
              )}
              <Badge variant="secondary" className="absolute top-0.5 right-2">
                {getCategoryLabel(product.category)}
              </Badge>
            </div>

            <CardHeader>
              <CardTitle className="line-clamp-2">{product.name}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-xl font-semibold">
                {product.price?.toLocaleString("vi-VN")} đ
              </p>
              <p className="text-sm text-gray-500 line-clamp-3 mt-2">
                {product.description}
              </p>
            </CardContent>

            <CardFooter className="mt-auto">
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 gap-2"
                onClick={() => window.open(product.affLink, "_blank")}
              >
                <ShoppingBag className="h-5 w-5" />
                Mua ngay
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
