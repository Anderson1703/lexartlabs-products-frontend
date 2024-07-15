export interface CreateProductFormI {
    isModalOpen: boolean;
    toggleClose: () => void;
    handleCreateProduct: (data: InputsCreateProductFormI) => void;
}

export interface InputsCreateProductFormI {
    name: string;
    description: string;
    price: string;
    stock: string;
    release_date: string;
}