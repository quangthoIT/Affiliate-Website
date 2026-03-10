import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import api from "@/lib/axios";
import errorPicture from "@/assets/ErrorPicture.jpg";
import ProductItem from "./ProductItem";
import Title from "@/components/Title";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCategoryLabel = (category) => {
    return category?.name || "N/A";
  };

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/products/${id}`);
        const currentProduct = data.data;
        setProduct(currentProduct);

        // Fetch related products using category ID
        const categoryId = currentProduct.category?._id || currentProduct.category;
        const { data: relatedData } = await api.get(
          `/api/products?category=${categoryId}`,
        );
        const filtered = relatedData.data
          .filter((p) => p._id !== id)
          .slice(0, 4);
        setRelatedProducts(filtered);
      } catch (error) {
        toast.error("Không thể lấy thông tin sản phẩm.");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchProductAndRelated();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
        <p className="mt-4 text-lg text-gray-500">
          Đang tải thông tin sản phẩm...
        </p>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="container mx-auto">
      <Button
        variant="ghost"
        className="mb-4 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} /> Quay lại
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-4 md:p-6 rounded-xl shadow-sm border">
        {/* Hình ảnh */}
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover max-h-125 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = errorPicture;
            }}
          />
          {product.isHot && (
            <Badge
              variant="destructive"
              className="absolute top-4 left-4 text-sm"
            >
              Hot Deal
            </Badge>
          )}
        </div>

        {/* Thông tin */}
        <div className="flex flex-col gap-6">
          <div>
            <Badge variant="secondary" className="mb-3">
              {getCategoryLabel(product.category)}
            </Badge>
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          <p className="text-4xl font-bold text-blue-600">
            {product.price.toLocaleString("vi-VN")} đ
          </p>

          <div className="border-t border-b border-gray-300 py-6">
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-900">
              Mô tả sản phẩm
            </h3>
            <p className="text-gray-500 leading-relaxed whitespace-pre-line">
              {product.description || "Chưa có mô tả cho sản phẩm này."}
            </p>
          </div>

          <Button
            variant="default"
            className="w-full lg:w-1/2 rounded-full py-6"
            onClick={() => window.open(product.affLink, "_blank")}
          >
            <ShoppingBag size={24} />
            MUA NGAY TRÊN SHOPEE
          </Button>

          <p className="text-sm text-center md:text-left text-gray-400 italic">
            * Bấm vào nút trên để chuyển sang trang mua hàng chính thức
          </p>
        </div>
      </div>

      {/* Sản phẩm liên quan */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 mb-4">
          <Title
          title="Sản phẩm liên quan"
          description=""
        />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductItem key={p._id} product={p} categoryLabel={getCategoryLabel(p.category)} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
