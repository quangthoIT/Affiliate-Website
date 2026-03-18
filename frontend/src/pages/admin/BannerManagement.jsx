import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus, Image as ImageIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import BannerForm from "./BannerForm";
import api from "@/lib/axios";

const BannerManagement = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchBanners = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.get("/api/banners/all", config);
      setBanners(data.data);
    } catch (error) {
      toast.error("Không thể tải danh sách banner.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      if (editingBanner) {
        await api.put(`/api/banners/${editingBanner._id}`, formData, config);
        toast.success("Cập nhật banner thành công");
      } else {
        await api.post("/api/banners", formData, config);
        toast.success("Thêm banner thành công");
      }
      setIsModalOpen(false);
      setEditingBanner(null);
      fetchBanners();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi xử lý banner");
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await api.delete(`/api/banners/${id}`, config);
      toast.success("Xóa banner thành công");
      fetchBanners();
    } catch (error) {
      toast.error("Xóa banner thất bại");
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <div className="p-2 md:p-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý Banner</h1>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingBanner(null)}>
              <Plus className="mr-2 h-4 w-4" /> Thêm Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingBanner ? "Sửa Banner" : "Thêm Banner mới"}
              </DialogTitle>
            </DialogHeader>
            <BannerForm
              initialData={editingBanner}
              onSubmit={handleSubmit}
              loading={loading}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-md bg-gray-50 overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
            <p className="mt-4 text-lg text-gray-500">Đang tải dữ liệu...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Ảnh</TableHead>
                <TableHead className="text-center">Tiêu đề</TableHead>
                <TableHead className="text-center">Thứ tự</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner._id}>
                  <TableCell className="flex justify-center">
                    <div className="w-36 h-14 rounded-md overflow-hidden">
                      <img
                        src={banner.imageUrl}
                        alt={banner.title}
                        className="w-full h-full"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium text-center">
                    {banner.title || <span className="text-gray-400 italic">Không có tiêu đề</span>}
                  </TableCell>
                  <TableCell className="text-center">{banner.order}</TableCell>
                  <TableCell className="text-center">
                    {banner.isActive ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Đang hiển thị</Badge>
                    ) : (
                      <Badge variant="secondary">Đang ẩn</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setEditingBanner(banner);
                          setIsModalOpen(true);
                        }}
                      >
                        Sửa
                      </Button>

                      <ConfirmDialog
                        title="Xóa Banner"
                        description="Bạn có chắc chắn muốn xóa banner này không?"
                        onConfirm={() => deleteHandler(banner._id)}
                        trigger={
                          <Button variant="default" size="sm">
                            Xóa
                          </Button>
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {banners.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    Chưa có banner nào được tạo.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default BannerManagement;
