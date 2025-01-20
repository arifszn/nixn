import { Star } from 'lucide-react';
import { useGetProductByIdQuery } from '@/api/product.api';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLoader from '@/components/loader/app-loader.loader';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { format } from 'date-fns';
import NotFound from '@/components/common/not-found.common';
import { webRoutes } from '@/routes/web.route';

const ProductDetails = ({ productId }: { productId: number }) => {
  const { data: product, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return <AppLoader blur={false} />;
  }

  if (!product) {
    return (
      <NotFound
        backLink={webRoutes.products}
        backMessage="Back to All Products"
      />
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-light mb-4">{product.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details" className="w-full">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Description Section */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="text-sm text-gray-700">
                      {product.description}
                    </p>
                  </div>

                  {/* Specifications Section */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Specifications</h3>
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                      <div>
                        <dt className="font-medium text-gray-900">Brand</dt>
                        <dd>{product.brand}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Weight</dt>
                        <dd>{product.weight}g</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Dimensions
                        </dt>
                        <dd>{`${product.dimensions.width} x ${product.dimensions.height} x ${product.dimensions.depth} cm`}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">SKU</dt>
                        <dd>{product.sku}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="images" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <Avatar
                      key={index}
                      className="w-full h-40 object-cover rounded-none bg-muted"
                    >
                      <AvatarImage src={image} />
                      <AvatarFallback />
                    </Avatar>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="shipping" className="space-y-4">
                <div>
                  <h3 className="font-semibold">Shipping Information</h3>
                  <p className="text-sm">{product.shippingInformation}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Return Policy</h3>
                  <p className="text-sm">{product.returnPolicy}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing & Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="text-3xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <Badge className="ml-2">
                    {product.discountPercentage}% OFF
                  </Badge>
                )}
              </div>
              <div>
                <Badge
                  variant={
                    product.availabilityStatus === 'In Stock'
                      ? 'default'
                      : 'destructive'
                  }
                  className="font-mono"
                >
                  {product.availabilityStatus}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.stock} units in stock
              </p>
              <Separator />
              <div className="flex items-center">
                <Star className="text-yellow-400 fill-current mr-1" />
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground ml-1">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          {product.reviews.map((review, index) => (
            <div key={index} className="mb-4 p-4 border rounded">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarFallback>{review.reviewerName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{review.reviewerName}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{review.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                {format(new Date(review.date), 'MMMM d, yyyy')}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
