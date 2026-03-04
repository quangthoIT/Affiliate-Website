import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { ImageIcon, LinkIcon, Upload, X } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import api from "@/lib/axios";

const ProductForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    affLink: "",
    category: "",
    isHot: false,
  });
  const [uploading, setUploading] = useState(false);

  // Nếu có initialData (Sửa), đổ dữ liệu vào form. Nếu không có (Thêm mới), reset form.
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        image: initialData.image || "",
        affLink: initialData.affLink || "",
        category: initialData.category || "",
        isHot: initialData.isHot || false,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        price: "",
        image: "",
        affLink: "",
        category: "",
        isHot: false,
      });
    }
  }, [initialData]);

  // Xử lý upload hình ảnh
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("file", file);

    setUploading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.post(
        "/api/products/upload",
        uploadData,
        config,
      );
      setFormData({ ...formData, image: data.url });
      toast.success("Tải hình ảnh thành công!");
    } catch (error) {
      toast.error("Lỗi khi tải hình ảnh!");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4 mt-2"
    >
      <div className="grid gap-2">
        <Label htmlFor="name">Tên sản phẩm</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="grid col-span-2 gap-2">
          <Label htmlFor="price">Giá</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
        </div>
        <div className="grid col-span-3 gap-2">
          <Label htmlFor="category">Danh mục</Label>
          <Select
            key={formData.category}
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              {PRODUCT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid gap-2 border p-4 rounded-xl bg-white shadow-sm">
        <Label className="text-sm font-semibold text-gray-700">
          Hình ảnh sản phẩm
        </Label>

        <div className="flex flex-row gap-4 mt-2">
          {/* KHU VỰC PREVIEW (Bên trái) */}
          <div className="relative w-26 h-26 md:w-40 md:h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden group">
            {formData.image ? (
              <>
                <img
                  src={formData.image}
                  className="w-full h-full object-cover"
                  alt={formData.name || "Hình ảnh sản phẩm"}
                />
                <button
                  onClick={() => setFormData({ ...formData, image: "" })}
                  className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImageIcon size={32} strokeWidth={1.5} />
                <span className="text-xs mt-1 text-center">Chưa có ảnh</span>
              </div>
            )}
          </div>

          {/* KHU VỰC ĐIỀU KHIỂN */}
          <div className="flex-1">
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:mb-4 mb-3">
                <TabsTrigger value="upload" className="flex items-center gap-2 text-xs md:text-sm">
                  <Upload size={14} /> Tải ảnh lên
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2 text-xs md:text-sm">
                  <LinkIcon size={14} /> URL
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upload">
                <Label className="w-full h-12 md:h-24 flex flex-row md:flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                  <Upload className="w-6 h-6 text-gray-500" />
                  <p className="text-xs text-gray-500">Nhấp để chọn tệp</p>
                  <Input
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                </Label>
              </TabsContent>

              <TabsContent value="url">
                <Input
                  id="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="h-12 md:h-24"
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="grid gap-2 md:col-span-3">
          <Label htmlFor="affLink">Liên kết affiliate</Label>
          <Input
            id="affLink"
            value={formData.affLink}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2 gap-2 flex items-center mt-6">
          <Label htmlFor="isHot">Sản phẩm nổi bật</Label>
          <Checkbox
            id="isHot"
            checked={formData.isHot}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isHot: checked })
            }
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={handleChange}
          className="resize-none h-20"
        />
      </div>
      <Button
        type="submit"
        className="w-full"
        variant="default"
        disabled={loading}
      >
        {loading
          ? "Đang xử lý..."
          : initialData
            ? "Cập nhật sản phẩm"
            : "Thêm sản phẩm mới"}
      </Button>
    </form>
  );
};

export default ProductForm;
