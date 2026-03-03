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

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Lấy danh sách sản phẩm từ backend
  const fetchProducts = async () => {
    const { data } = await axios.get("/api/products");
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
        await axios.put(
          `/api/products/${editingProduct._id}`,
          formData,
          config,
        );
        toast.success("Cập nhật sản phẩm thành công");
      } else {
        await axios.post("/api/products", formData, config);
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
      await axios.delete(`/api/products/${id}`, config);
      toast.success("Xóa sản phẩm thành công");
      fetchProducts();
    } catch (error) {
      toast.error("Xóa sản phẩm thất bại");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingProduct(null)}>
              <Plus className="mr-2 h-4 w-4" /> Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-125">
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
            {products.map((product, index) => (
              <TableRow key={product._id}>
                <TableCell className="text-center">{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
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
    </div>
  );
};

export default AdminPage;
