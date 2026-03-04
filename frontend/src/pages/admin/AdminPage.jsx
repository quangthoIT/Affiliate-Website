import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ConfirmDialog from "@/components/ConfirmDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductForm from "./ProductForm";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import api from "@/lib/axios";
import PaginationCustom from "@/components/PaginationCustom";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Lấy danh sách sản phẩm từ backend
  const fetchProducts = async () => {
    const { data } = await api  .get("/api/products");
    setProducts(data.data);
  };

  const getCategoryLabel = (value) => {
    return PRODUCT_CATEGORIES.find((c) => c.value === value)?.label || value;
  };
  const handleSubmit = async (formData) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (editingProduct) {
        await api.put(`/api/products/${editingProduct._id}`, formData, config);
        toast.success("Cập nhật sản phẩm thành công");
      } else {
        await api.post("/api/products", formData, config);
        toast.success("Thêm sản phẩm thành công");
      }
      setIsModalOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý sản phẩm");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await api.delete(`/api/products/${id}`, config);
      toast.success("Xóa sản phẩm thành công");
      fetchProducts();
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
    }
  };

  // Xử lý phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [products.length]);

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125 sm:max-h-screen max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Sửa sản phẩm" : "Thêm sản phẩm mới"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm initialData={editingProduct} onSubmit={handleSubmit} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-gray-100">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">STT</TableHead>
              <TableHead className="text-center">Tên sản phẩm</TableHead>
              <TableHead className="text-center">Danh mục</TableHead>
              <TableHead className="text-center">Giá</TableHead>
              <TableHead className="text-center">Hot Deal</TableHead>
              <TableHead className="text-center">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell className="text-center">
                  {indexOfFirstItem + index + 1}
                </TableCell>
                <TableCell className="max-w-87.5 whitespace-normal wrap-break-word">
                  {product.name}
                </TableCell>
                <TableCell className="text-center">
                  {getCategoryLabel(product.category)}
                </TableCell>
                <TableCell className="text-center">
                  {product.price.toLocaleString("vi-VN")} đ
                </TableCell>
                <TableCell className="text-center">
                  {product.isHot ? (
                    <Badge variant="destructive">Hot Deal</Badge>
                  ) : (
                    <Badge variant="secondary">Thường</Badge>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setEditingProduct(product);
                      setIsModalOpen(true);
                    }}
                  >
                    Sửa
                  </Button>

                  <ConfirmDialog
                    title={`Xóa sản phẩm ${product.name}`}
                    description="Dữ liệu sản phẩm sẽ bị xóa vĩnh viễn khỏi hệ thống."
                    onConfirm={() => deleteHandler(product._id)}
                    trigger={
                      <Button variant="default" size="sm" className="ml-2">
                        Xóa
                      </Button>
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <PaginationCustom
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AdminPage;
