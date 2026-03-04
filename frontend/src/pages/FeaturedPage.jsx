import React, { useEffect, useState } from "react";
import FilterBar from "@/components/FilterBar";
import api from "@/lib/axios";
import { toast } from "sonner";
import { Loader2, PackageSearch } from "lucide-react";
import Title from "@/components/Title";
import ProductItem from "./ProductItem";
import PaginationCustom from "@/components/PaginationCustom";

const FeaturedPage = () => {
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
        setProducts(data.data.filter((products) => products.isHot));
      } catch (error) {
        toast.error("Không thể tải danh sách sản phẩm.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Xử lý lọc dữ liệu
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
        title="Sản phẩm nổi bật"
        description="Những sản phẩm đang được yêu thích và săn đón nhiều nhất hiện nay."
      />

      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
      />

      {currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentItems.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
          <PaginationCustom
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <PackageSearch
            className="h-18 w-18 text-gray-400 mb-4"
            strokeWidth={1.5}
          />
          <p className="text-gray-500">
            Không tìm thấy sản phẩm nổi bật phù hợp.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedPage;
