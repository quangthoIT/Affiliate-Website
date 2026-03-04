import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import errorPicture from "@/assets/ErrorPicture.jpg";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const ProductItem = ({ product }) => {
  const getCategoryLabel = (value) => {
    return PRODUCT_CATEGORIES.find((c) => c.value === value)?.label || value;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
      <Link to={`/products/${product._id}`} className="relative block">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover p-4 transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = errorPicture;
          }}
        />
        {product.isHot && (
          <Badge
            variant="destructive"
            className="absolute top-0.5 left-2 text-[10px] md:text-xs"
          >
            Hot Deal
          </Badge>
        )}
        <Badge
          variant="secondary"
          className="absolute top-0.5 right-2 text-[10px] md:text-xs"
        >
          {getCategoryLabel(product.category)}
        </Badge>
      </Link>

      <CardHeader>
        <Link to={`/products/${product._id}`}>
          <CardTitle className="line-clamp-2 leading-5 hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent className="grow">
        <p className="text-xl font-semibold">
          {product.price?.toLocaleString("vi-VN")} đ
        </p>
        <p className="text-sm text-gray-500 line-clamp-3 mt-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="mt-auto pt-4">
        <Button
          variant="default"
          className="w-full"
          onClick={() => window.open(product.affLink, "_blank")}
        >
          <ShoppingBag className="h-5 w-5" />
          Mua ngay
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
