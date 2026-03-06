import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import api from "@/lib/axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import EditUserModal from "./EditUserModal";
import ConfirmDialog from "@/components/ConfirmDialog";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await api.get("/api/users", config);
      setUsers(data.data);
    } catch (error) {
      toast.error("Không thể tải danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (formData) => {
    setUpdateLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await api.put(`/api/users/${selectedUser._id}`, formData, config);
      toast.success("Cập nhật người dùng thành công!");
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi cập nhật người dùng.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await api.delete(`/api/users/${id}`, config);
      toast.success("Xóa người dùng thành công!");
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Xóa người dùng thất bại");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-2 md:p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
      </div>

      <div className="border rounded-md bg-gray-100 flex flex-col">
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="h-10 w-10 animate-spin text-gray-500" />
            <p className="mt-4 text-lg text-gray-500">
              Đang lấy danh sách người dùng...
            </p>
          </div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center w-16">STT</TableHead>
                  <TableHead>Họ tên</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead className="text-center">Vai trò</TableHead>
                  <TableHead className="text-center w-40">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user._id}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell className="text-center">
                      {user.isAdmin ? (
                        <Badge variant="destructive">Admin</Badge>
                      ) : (
                        <Badge variant="secondary">Người dùng</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClick(user)}
                        >
                          Sửa
                        </Button>
                        <ConfirmDialog
                          title="Xóa người dùng"
                          description={`Bạn có chắc chắn muốn xóa người dùng ${user.name}? Thao tác này không thể hoàn tác.`}
                          onConfirm={() => handleDeleteUser(user._id)}
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
                {users.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Không tìm thấy người dùng nào.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {selectedUser && (
              <EditUserModal
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onUpdate={handleUpdateUser}
                loading={updateLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
