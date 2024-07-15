import { useEffect, useState } from 'react'
import { ProductI } from '../products.interface'
import ProductItem from '../product-item'
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { createProductService, deleteAllProductsService, deleteOneProductsService, getAllProductsService, updateProductService } from '../../../../service/api.service';
import Loader from '../../../common/Loader';
import CreateProductForm from '../create-product-form';
import UpdateProductForm from '../update-product-form';
import { useNavigate } from 'react-router-dom';
import { InputsCreateProductFormI } from '../create-product-form/create-product-form.interface';
import { InputsUpdateProductFormI } from '../update-product-form/update-product-form.interface';

export default function ProductsTable() {

    const navigate = useNavigate();

    if (!localStorage.getItem('x-access-token')) {
        navigate("/auth/login");
    }

    const [isUpdating, setIsUpdating] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<ProductI | null>(null);
    const [isLastPage] = useState<boolean>(false);

    const [pagination, setPagination] = useState<{ limit: number, offset: number }>({ limit: 5, offset: 0 });
    const [products, setProducts] = useState<ProductI[]>([]);

    const handleNext = () => {
        setPagination((prev) => ({ ...prev, offset: prev.offset + prev.limit }));
    };

    const handleBack = () => {
        if (pagination.offset > 0) {
            setPagination((prev) => ({ ...prev, offset: prev.offset - prev.limit }));
        }
    };

    const { mutate, isLoading } = useMutation(getAllProductsService, {
        onSuccess: ({ body }) => {
            setProducts(body.data as ProductI[]);
        },
        onError: ({ body }: any) => {
            toast.error(`Error fetching products: ${body.error.message}`);
            setProducts([]);
        }
    });

    const { mutate: mutateDeleteProduct, isLoading: isLoadingDeleteProduct } = useMutation(deleteOneProductsService, {
        onSuccess: ({ body }) => {
            toast.success("Product deleted successful!");
            handleMutate();
        },
        onError: ({ body }: any) => {
            if (body.error.status === 406) {
                handleLogout();
            }
            toast.error(`Error deleting one product: ${body.error.message}`);
        }
    });

    const { mutate: mutateDeleteAllProduct, isLoading: isLoadingDeleteAllProduct } = useMutation(deleteAllProductsService, {
        onSuccess: ({ body }) => {
            toast.success("All products deleted successful!");
            handleMutate();
        },
        onError: ({ body }: any) => {
            toast.error(`Error deleting all products: ${body.error.message}`);
        }
    });

    const { mutate: mutateUpdateProduct, isLoading: isLoadingUpdateProduct } = useMutation(updateProductService, {
        onSuccess: ({ body }) => {
            toast.success("Update product successful!");
            handleMutate();
        },
        onError: ({ body }: any) => {
            toast.error(`Error updating product: ${body.error.message}`);
        }
    });

    const { mutate: mutateCreateProduct, isLoading: isLoadingCreateProduct } = useMutation(createProductService, {
        onSuccess: ({ body }) => {
            toast.success("Create product successful!");
            handleMutate();
        },
        onError: ({ body }: any) => {
            toast.error(`Error creating product: ${body.error.message}`);
        }
    });

    useEffect(() => {
        handleMutate();
    }, [pagination]);

    const handleMutate = () => {
        mutate(pagination)
    }

    const handleUpdateProduct = (product: ProductI) => {
        setSelectedProduct(product);
        setIsUpdating(true);
    }

    const handleDeleteProduct = (productUUID: string) => {
        mutateDeleteProduct(productUUID);
    }

    const handleLogout = () => {
        localStorage.removeItem("x-access-token");
        navigate("/auth/login");
    }

    const handleCreateProduct = (data: InputsCreateProductFormI) => {
        mutateCreateProduct(data);
        setIsCreating(false);
    }

    const onUpdateProduct = (data: InputsUpdateProductFormI) => {
        setSelectedProduct(null);
        mutateUpdateProduct({ ...data, productUUID: selectedProduct?.uuid || "" });
        setIsUpdating(false);
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-5">
            <CreateProductForm isModalOpen={isCreating} toggleClose={() => setIsCreating(false)} handleCreateProduct={handleCreateProduct} />
            <UpdateProductForm product={selectedProduct} isModalOpen={isUpdating} toggleClose={() => {
                setSelectedProduct(null);
                setIsUpdating(false);
            }} handleUpdateProduct={onUpdateProduct} />
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th className='mb-5'>
                            <button
                                onClick={() => setIsCreating(true)}
                                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                                type="button">
                                Create NEW
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={() => {
                                    if (products.length <= 0) {
                                        toast.error("Not products for deletion");
                                        return
                                    }
                                    mutateDeleteAllProduct();
                                }}
                                className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="button"
                            >
                                DELETE ALL
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={() => {
                                    setPagination({ offset: 0, limit: 50 })
                                }}
                                className="block text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="button"
                            >
                                GET 50 PRODUCTS
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={() => navigate("/products-logs")}
                                className="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="button"
                            >
                                PRODUCTS DELETED
                            </button>
                        </th>
                        <th>
                            <button
                                onClick={handleLogout}
                                className="block text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                type="button"
                            >
                                LOGOUT
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
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading || isLoadingDeleteProduct || isLoadingDeleteAllProduct || isLoadingCreateProduct || isLoadingUpdateProduct ? (
                            <tr>
                                <td colSpan={5} className="bg-blue-200 px-6 py-3">
                                    <div className="flex justify-center">
                                        <Loader />
                                    </div>
                                </td>
                            </tr>
                        ) : products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="bg-red-50 px-6 py-3 text-center">No products found.</td>
                            </tr>
                        ) : products.map(product =>
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
                <tfoot>
                    <tr>
                        <td colSpan={5} className="px-6 py-3 text-right">
                            <button
                                onClick={handleBack}
                                disabled={pagination.offset === 0}
                                className={`mr-2 px-4 py-2 border rounded ${pagination.offset === 0 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                            >
                                Back
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={isLastPage}
                                className={`px-4 py-2 border rounded ${isLastPage ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                            >
                                Next
                            </button>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}
