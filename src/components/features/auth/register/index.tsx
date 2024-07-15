import { toast } from 'react-toastify';
import { createUserService } from '../../../../service/api.service';
import CreateUserForm from './create-user-form';
import { InputsCreateUserFormI } from './create-user-form/create-user-form.interface';
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom';

export default function RegisterComponent() {

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(createUserService, {
    onSuccess: (data) => {
      toast.success("Register successful!");
      navigate("/auth/login");
    },
    onError: ({body}: any) => {
      toast.error(`Try again  ${body.error.message}`);
    }
  });

  const handleCreateUser = (data: InputsCreateUserFormI) => {
    mutate(data);
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
              Create an account
            </h1>
            <CreateUserForm handleCreateUser={handleCreateUser} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </section>
  )
}
