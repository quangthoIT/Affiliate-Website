import FilterBar from "@/components/FilterBar";
import Title from "@/components/Title";
import api from "@/lib/axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductItem from "./ProductItem";
import { Loader2, PackageSearch } from "lucide-react";
import PaginationCustom from "@/components/PaginationCustom";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";

  const [search, setSearch] = useState(q);
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const getCategoryName = (slug) => {
    return categories.find((c) => c.slug === slug)?.name || slug;
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || (p.category?._id || p.category) === category;
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

  useEffect(() => {
    setSearch(q);
  }, [q]);

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
    <div className="container mx-auto mt-4 md:mt-8">
      <Title
        title="Tất cả sản phẩm"
        description="Khám phá bộ sưu tập sản phẩm chất lượng với mức giá tốt nhất và nhiều ưu đãi hấp dẫn dành cho bạn."
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
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh]">
          <PackageSearch
            className="h-18 w-18 text-gray-400 mb-4"
            strokeWidth={1.5}
          />
          <p className="text-gray-500">Không tìm thấy sản phẩm.</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
