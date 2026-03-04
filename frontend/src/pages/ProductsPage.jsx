import FilterBar from "@/components/FilterBar";
import Title from "@/components/Title";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { Loader2 } from "lucide-react";
import PaginationCustom from "@/components/PaginationCustom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, category]);

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
    <div className="container mx-auto mt-8">
      <Title
        title="Tất cả sản phẩm"
        description="Khám phá bộ sưu tập sản phẩm chất lượng với mức giá tốt nhất và nhiều ưu đãi hấp dẫn dành cho bạn."
      />

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <FilterBar
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="text-sm text-gray-500 mb-6 md:mb-10 italic">
          Hiển thị {currentItems.length} trên tổng số {filteredProducts.length}{" "}
          kết quả
        </div>
      </div>

      {currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
          <PaginationCustom
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div className="mt-4 text-center text-gray-500">
          Không tìm thấy sản phẩm nổi bật phù hợp.
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
