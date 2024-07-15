import { useNavigate, useParams } from "react-router-dom"
import { ProductI } from "../products/products.interface";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { getOneProductsService } from "../../../service/api.service";
import Loader from "../../common/Loader";

export default function ProductDetailComponent() {

    const { productUUID } = useParams();

    const navigate = useNavigate();

    const [data, setData] = useState<ProductI>();

    const { mutate, isLoading } = useMutation(getOneProductsService, {
        onSuccess: ({ body }) => {
            setData(body.data as ProductI);
        },
        onError: ({ body }: any) => {
            toast.error(`Error fetching one product: ${body.error.message}`);
        }
    });

    useEffect(() => {
        mutate(productUUID!);
    }, [mutate, productUUID]);

    return (
        <>
            {
                !isLoading ? (
                    <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden dark:bg-gray-800">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{data?.name}</h2>
                            <p className="mt-2 text-gray-600 dark:text-gray-400">{data?.description}</p>
                            <div className="mt-4">
                                <span className="text-gray-700 dark:text-gray-200">Price: </span>
                                <span className="font-semibold text-gray-900 dark:text-white">${data?.price}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-gray-700 dark:text-gray-200">Stock: </span>
                                <span className="font-semibold text-gray-900 dark:text-white">{data?.stock}</span>
                            </div>
                            <div className="mt-2">
                                <span className="text-gray-700 dark:text-gray-200">Release Date: </span>
                                <span className="font-semibold text-gray-900 dark:text-white">{data?.release_date}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/products')}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Back
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-64">
                        <Loader />
                    </div>
                )
            }

        </>
    );
}
