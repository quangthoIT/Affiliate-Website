import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

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

  // Nếu có initialData (Sửa), đổ dữ liệu vào form
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
      className="space-y-4"
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
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Giá</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Danh mục</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="image">Hình ảnh</Label>
        <Input id="image" value={formData.image} onChange={handleChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="affLink">Liên kết affiliate</Label>
        <Input id="affLink" value={formData.affLink} onChange={handleChange} />
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
