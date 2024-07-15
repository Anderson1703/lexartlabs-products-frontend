export interface LoginUserFormI {
    isLoading: boolean;
    handleLoginUser: (data: InputsLoginUserFormI) => void;
}

export interface InputsLoginUserFormI{
    email: string;
    password: string;
}