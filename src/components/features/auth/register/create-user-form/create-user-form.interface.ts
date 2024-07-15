export interface CreateUserFormI {
    isLoading: boolean;
    handleCreateUser: (data: InputsCreateUserFormI) => void;
}

export interface InputsCreateUserFormI {
    name: string;
    lastName: string;
    email: string;
    password: string;
}