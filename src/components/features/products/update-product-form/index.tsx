import { useForm } from 'react-hook-form';
import Modal from '../../../common/Modal'
import { InputsUpdateProductFormI, UpdateProductFormI } from './update-product-form.interface'
import { useEffect } from 'react';

export default function UpdateProductForm({ isModalOpen, toggleClose, product, handleUpdateProduct }: UpdateProductFormI) {

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<InputsUpdateProductFormI>();

    useEffect(() => {
        setValue('name', product?.name || "");
        setValue('price', product?.price || "");
        setValue('stock', product?.stock || "");
        setValue('description', product?.description || "");
    }, [product, setValue]);

    return (
        <>
            {
                isModalOpen && (
                    <Modal title={`Update Product - ${product?.name}`} isModalOpen={isModalOpen} toggleClose={toggleClose}>
                        <form onSubmit={handleSubmit(handleUpdateProduct)} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label form="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input
                                        {...register('name', { required: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Type product name"
                                        required
                                    />
                                </div>
                                {errors.name && <p>Name is required.</p>}
                                <div className="col-span-2 sm:col-span-1">
                                    <label form="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input
                                        type="number"
                                        {...register('price', { required: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="$2999"
                                        required
                                    />
                                </div>
                                {errors.price && <p>Price is required.</p>}
                                <div className="col-span-2 sm:col-span-1">
                                    <label form="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                    <input
                                        type="number"
                                        {...register('stock', { required: true })}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="0"
                                        required
                                    />
                                </div>
                                {errors.stock && <p>Stock is required.</p>}
                                <div className="col-span-2">
                                    <label form="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        {...register('description', { required: true })}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Write product description here"
                                    />
                                </div>
                                {errors.description && <p>Description is required.</p>}
                            </div>
                            <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Update product
                            </button>
                        </form>
                    </Modal>
                )
            }
        </>
    )
}
