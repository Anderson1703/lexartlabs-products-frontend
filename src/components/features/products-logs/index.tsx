import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getAllProductsLogsService } from '../../../service/api.service';
import Loader from '../../common/Loader';
import { ProductI } from '../products/products.interface';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ProductLogItem from './product-logs-item';

export default function ProductsLogsComponent() {
  const navigate = useNavigate();

  if (!localStorage.getItem('x-access-token')) {
    navigate("/auth/login");
  }

  const [products, setProducts] = useState<ProductI[]>([]);

  const { mutate, isLoading } = useMutation(getAllProductsLogsService, {
    onSuccess: ({ body }) => {
      const flattenedProducts: ProductI[] = body.data.flatMap((item: any) => item.products);
      setProducts(flattenedProducts);
    },
    onError: ({ body }: any) => {
      toast.error(`Error fetching products logs: ${body.error.message}`);
      setProducts([]);
    }
  });

  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">

      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th>
              <button
                onClick={() => navigate("/products")}
                className="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                type="button"
              >
                PRODUCTS
              </button>
            </th>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Created
            </th>
            <th scope="col" className="px-6 py-3">
              Release
            </th>
          </tr>
        </thead>
        <tbody>
          {
            isLoading ? (
              <tr>
                <td colSpan={5} className="bg-blue-200 px-6 py-3">
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="bg-red-50 px-6 py-3 text-center">No products logs found.</td>
              </tr>
            ) : products.map(product =>
              <ProductLogItem
                key={product.uuid}
                name={product.name}
                price={product.price}
                createdAt={product.createdAt}
                uuid={product.uuid}
                description={product.description}
                release_date={product.release_date}
                stock={product.stock}
              />
            )
          }
        </tbody>
      </table>
    </div>
  )
}
