import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import api from "@/lib/axios";

const FilterBar = ({ search, setSearch, category, setCategory }) => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryLabel = (value) => {
    if (value === "all") return "Tất cả danh mục";
    return categories.find((c) => c._id === value)?.name || value;
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 item-center justify-center">
      <div className="relative w-full md:w-1/2">
        <Search
          size="20"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <Input
          placeholder="Tìm kiếm sản phẩm"
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="w-full md:w-1/4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Tất cả danh mục"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
