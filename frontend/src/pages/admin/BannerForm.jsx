import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageIcon, LinkIcon, Upload, X } from "lucide-react";
import { toast } from "sonner";
import api from "@/lib/axios";

const BannerForm = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    link: "",
    isActive: true,
    order: 0,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        imageUrl: initialData.imageUrl || "",
        link: initialData.link || "",
        isActive: initialData.isActive ?? true,
        order: initialData.order || 0,
      });
    } else {
      setFormData({
        title: "",
        imageUrl: "",
        link: "",
        isActive: true,
        order: 0,
      });
    }
  }, [initialData]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
      // Reuse the existing upload endpoint
      const { data } = await api.post("/api/products/upload", uploadData, config);
      setFormData({ ...formData, imageUrl: data.url });
      toast.success("Tải hình ảnh thành công!");
    } catch (error) {
      toast.error("Lỗi khi tải hình ảnh!");
    } finally {
      setUploading(false);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: id === "order" ? parseInt(value) || 0 : value });
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
        <Label htmlFor="title">Tiêu đề (Tùy chọn)</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Nhập tiêu đề banner"
        />
      </div>

      <div className="grid gap-2 border p-4 rounded-xl bg-white shadow-sm">
        <Label className="text-sm font-semibold text-gray-700">
          Hình ảnh banner
        </Label>

        <div className="flex flex-col gap-4 mt-2">
          {/* PREVIEW */}
          <div className="relative w-full h-40 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer overflow-hidden group bg-gray-50">
            {formData.imageUrl ? (
              <>
                <img
                  src={formData.imageUrl}
                  className="w-full h-full object-cover"
                  alt="Banner Preview"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, imageUrl: "" })}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <ImageIcon size={48} strokeWidth={1} />
                <span className="text-sm mt-2">Chưa có ảnh</span>
              </div>
            )}
          </div>

          {/* CONTROLS */}
          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload size={14} /> Tải ảnh lên
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2">
                <LinkIcon size={14} /> URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <Label className="w-full h-16 flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-2 text-gray-500">
                  <Upload size={20} />
                  <span className="text-sm font-medium">Chọn tệp hình ảnh</span>
                </div>
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
                id="imageUrl"
                placeholder="https://example.com/banner.jpg"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="link">Liên kết (Tùy chọn)</Label>
          <Input
            id="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="/products?category=..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="order">Thứ tự hiển thị</Label>
          <Input
            id="order"
            type="number"
            value={formData.order}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) =>
            setFormData({ ...formData, isActive: checked })
          }
        />
        <Label htmlFor="isActive" className="cursor-pointer">Kích hoạt banner này</Label>
      </div>

      <Button
        type="submit"
        className="w-full"
        variant="default"
        disabled={loading || uploading}
      >
        {loading ? "Đang xử lý..." : initialData ? "Cập nhật Banner" : "Thêm Banner mới"}
      </Button>
    </form>
  );
};

export default BannerForm;
