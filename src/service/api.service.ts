import { InputsLoginUserFormI } from "../components/features/auth/login/login-user-form/login-user-form.interface";
import { InputsCreateUserFormI } from "../components/features/auth/register/create-user-form/create-user-form.interface";

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
        throw await response.json();
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
        throw await response.json();
    }

    return response.json();
};

export const getAllProductsService = async (offset: number, limit: number, releaseDate?: string, priceFrom?: number, priceTo?: number) => {
    
    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
    });

    if (releaseDate) {
        params.append('releaseDate', releaseDate);
    }
    if (priceFrom !== undefined) {
        params.append('priceFrom', priceFrom.toString());
    }

    if (priceTo !== undefined) {
        params.append('priceTo', priceTo.toString());
    }

    const url = `${baseUrl}/products?${params.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': accessToken!,
        },
    });

    if (!response.ok) {
        throw await response.json();
    }

    return response.json();
};