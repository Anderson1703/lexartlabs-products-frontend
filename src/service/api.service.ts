import { InputsLoginUserFormI } from "../components/features/auth/login/login-user-form/login-user-form.interface";
import { InputsCreateUserFormI } from "../components/features/auth/register/create-user-form/create-user-form.interface";
import { InputsCreateProductFormI } from "../components/features/products/create-product-form/create-product-form.interface";
import { InputsUpdateProductFormI } from "../components/features/products/update-product-form/update-product-form.interface";
import { GetAllProductsFilters } from "./service.interface";

const baseUrl: string = "https://lexartlabs-products-backend.onrender.com/api";
const accessToken = localStorage.getItem("x-access-token")

export const createUserService = async (userData: InputsCreateUserFormI) => {
    const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const res = await response.json();
        throw res;
    }

    return response.json();
};

export const loginUserService = async (userData: InputsLoginUserFormI) => {
    const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const res = await response.json();
        throw res;
    }

    return response.json();
};

export const getAllProductsService = async (paramsProps: GetAllProductsFilters) => {

    const params = new URLSearchParams({
        limit: paramsProps.limit.toString(),
        offset: paramsProps.offset.toString(),
    });

    const url = `${baseUrl}/products?${params.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken!,
        },
    });

    if (!response.ok) {
        const res = await response.json();
        throw res;
    }

    return response.json();
};

export const deleteOneProductsService = async (productUUID: string) => {
    const response = await fetch(`${baseUrl}/products/${productUUID}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken!,
        },
    });

    if (!response.ok) {
        const res = await response.json();
        if (res.status === 406) {
            localStorage.removeItem('x-access-token');
        }
        throw res;
    }

    return response.json();
};

export const deleteAllProductsService = async () => {
    const response = await fetch(`${baseUrl}/products`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken!,
        },
    });

   if (!response.ok) {
        const res = await response.json();
        if (res.status === 406) {
            localStorage.removeItem('x-access-token');
        }
        throw res;
    }

    return response.json();
};

export const createProductService = async (data: InputsCreateProductFormI) => {
    const response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken!,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const res = await response.json();
        if (res.status === 406) {
            localStorage.removeItem('x-access-token');
        }
        throw res;
    }

    return response.json();
};


export const updateProductService = async ( data: InputsUpdateProductFormI & {productUUID: string}) => {
    const response = await fetch(`${baseUrl}/products/${data.productUUID}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken!,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const res = await response.json();
        if (res.status === 406) {
            localStorage.removeItem('x-access-token');
        }
        throw res;
    }

    return response.json();
};

export const getOneProductsService = async (productUUID: string) => {
    const response = await fetch(`${baseUrl}/products/${productUUID}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken!,
        },
    });

    if (!response.ok) {
        const res = await response.json();
        if (res.status === 406) {
            localStorage.removeItem('x-access-token');
        }
        throw res;
    }

    return response.json();
};