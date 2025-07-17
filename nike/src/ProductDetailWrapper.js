import React from "react";
import { useParams } from "react-router-dom";  // Hook to get URL params
import ProductDetail from "./ProductDetail";  // Import the class component

const ProductDetailWrapper = () => {
  const { id } = useParams();  // Get 'id' from URL params

  return <ProductDetail id={id} />;  // Pass 'id' as a prop to the class component
};

export default ProductDetailWrapper;
