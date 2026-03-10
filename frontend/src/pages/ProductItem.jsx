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

const ProductItem = ({ product, categoryLabel }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow group h-full flex flex-col">
      <Link to={`/products/${product._id}`} className="relative block">
        <div className="aspect-square w-full overflow-hidden bg-gray-50 flex items-center justify-center p-2">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = errorPicture;
            }}
          />
        </div>
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
          {categoryLabel || product.category?.name || product.category}
        </Badge>
      </Link>

      <CardHeader>
        <Link to={`/products/${product._id}`}>
          <CardTitle className="text-sm md:text-lg line-clamp-2 leading-5 hover:text-blue-600 transition-colors cursor-pointer">
            {product.name}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent>
        <p className="text-lg md:text-xl font-semibold">
          {product.price?.toLocaleString("vi-VN")} đ
        </p>
        {/* <p className="text-sm text-gray-500 line-clamp-3 mt-2">
          {product.description}
        </p> */}
      </CardContent>

      <CardFooter className="mt-auto">
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
