import { useState } from 'react'
import { ProductI } from '../products.interface'
import ProductItem from '../product-item'
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { getAllProductsService } from '../../../../service/api.service';


export default function ProductsTable() {

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [releaseDate, setReleaseDate] = useState<Date>();
    const [pagination, setPagination] = useState<{ limit: number, offset: number }>({ limit: 10, offset: 0 });
    const [priceRange, setPriceRange] = useState<{ priceFrom: number, priceTo: number }>({ priceFrom: 200, priceTo: 2000 });
    const [products, setProducts] = useState<ProductI[]>([]);

    const { isLoading, refetch, isRefetching } = useQuery({

        queryKey: ['all-products'],

        queryFn: () =>
            getAllProductsService(
                pagination.offset,
                pagination.limit,
                releaseDate?.toISOString(),
                priceRange.priceFrom,
                priceRange.priceTo
            ).then(res => res),

        onError: ({ body }: any) => {
            toast.error(`Error fetching products: ${body.error.message}`);
            return [];
        },

        onSuccess: ({ body }: any) => {
            setProducts(body.data as ProductI[]);
        },

    })


    const handleUpdateProduct = (productUUID: string) => {
        setIsUpdating(true);
    }

    const handleDeleteProduct = (productUUID: string) => {
        setIsDeleting(true);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <input
                                type="number"
                                min={priceRange.priceFrom}
                                max={priceRange.priceTo}
                                placeholder="Filter by price"
                                value={priceRange.priceFrom}
                                onChange={(e) => setPriceRange({ ...priceRange, priceFrom: parseInt(e.target.value) })}
                                className="w-full px-3 py-2 rounded-md text-gray-500 dark:text-gray-4 focus:outline-none focus:ring-1 focus:ring-primary-500"
                            />
                        </th>
                    </tr>
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
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
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map(product =>
                            <ProductItem
                                key={product.uuid}
                                name={product.name}
                                price={product.price}
                                createdAt={product.createdAt}
                                uuid={product.uuid}
                                description={product.description}
                                release_date={product.release_date}
                                stock={product.stock}
                                handleUpdate={handleUpdateProduct}
                                handleDelete={handleDeleteProduct}
                            />
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
