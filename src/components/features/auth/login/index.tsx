import { useMutation } from 'react-query';
import { loginUserService } from '../../../../service/api.service';
import LoginUserForm from './login-user-form'
import { InputsLoginUserFormI } from './login-user-form/login-user-form.interface'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function LoginComponent() {

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(loginUserService, {
    onSuccess: ({ body }) => {
      toast.success("Login successful!");
      handleSetTokenInsideLocalStorage(body.token as string);
    },
    onError: ({ body }: any) => {
      toast.error(`Try again  ${body.error.message}`);
    }
  });

  const handleSetTokenInsideLocalStorage = (token: string) => {
    localStorage.setItem("x-access-token", token);
    navigate("/products");
  }

  const handleLoginUser = (data: InputsLoginUserFormI) => {
    mutate(data)
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <h1>LEXARTLABS PRODUCTS</h1>
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            <LoginUserForm handleLoginUser={handleLoginUser} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </section>
  )
}
