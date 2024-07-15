import { ProductI } from "../products.interface";

export interface UpdateProductFormI{
    isModalOpen: boolean;
    toggleClose:()=>void;
    product: ProductI | null,
    handleUpdateProduct: (data: InputsUpdateProductFormI) => void;
}

export interface InputsUpdateProductFormI {
    name: string;
    description: string;
    price: string;
    stock: string;
}