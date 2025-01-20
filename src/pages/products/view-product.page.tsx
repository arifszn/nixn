import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetails from '@/components/product/details..product';

const ViewProductPage: React.FC = () => {
  const { id: productId } = useParams();
  return (
    <div className="container mx-auto px-4 py-6">
      <ProductDetails productId={Number(productId)} />
    </div>
  );
};

export default ViewProductPage;
