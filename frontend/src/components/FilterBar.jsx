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
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const FilterBar = ({ search, setSearch, category, setCategory }) => {
  const getCategoryLabel = (value) => {
    return PRODUCT_CATEGORIES.find((c) => c.value === value)?.label || value;
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
          <SelectTrigger>
            <SelectValue placeholder="Tất cả danh mục"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {PRODUCT_CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {getCategoryLabel(category.value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FilterBar;
