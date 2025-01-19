import { FC } from 'react';
import ProductsTable from '@/components/tables/products.table';

const ProductsPage: FC = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="w-full">
        <ProductsTable />
      </div>
    </div>
  );
};

export default ProductsPage;
