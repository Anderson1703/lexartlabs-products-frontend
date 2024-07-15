import { ProductI } from '../products.interface'

export default function ProductItem(
    product: ProductI & {
        handleUpdate: (product: ProductI) => void,
        handleDelete: (productUUID: string) => void
    }) {
    return (
        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
            </th>
            <td className="px-6 py-4">
                {product.price}
            </td>
            <td className="px-6 py-4">
                {product.createdAt}
            </td>
            <td className="px-6 py-4">
                {product.release_date}
            </td>
            <td className="px-6 py-4">
                <a
                    className="ml-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href={`/products/${product.uuid}/details`}>DETAILS</a>
                <button
                    onClick={() => product.handleUpdate(product)}
                    className="ml-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    UPDATE
                </button>
                <button
                    onClick={() => product.handleDelete(product.uuid)}
                    className="ml-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                    DELETE
                </button>
            </td>
        </tr>
    )
}
