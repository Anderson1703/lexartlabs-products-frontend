import { ProductI } from "../../products/products.interface";

export default function ProductLogItem(product: ProductI ) {
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
        </tr>
    )
}
