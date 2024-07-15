import { useForm } from "react-hook-form";
import { CreateUserFormI, InputsCreateUserFormI } from "./create-user-form.interface";
import Loader from "../../../../common/Loader";

export default function CreateUserForm({ handleCreateUser, isLoading }: CreateUserFormI) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputsCreateUserFormI>();

  return (
    <form onSubmit={handleSubmit(handleCreateUser)} className="space-y-4 md:space-y-6">
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          First Name
        </label>
        <input
          type="text"
          {...register('name', { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="First name"
          required
        />
      </div>
      {errors.name && <p>First name is required.</p>}
      <div>
        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Last Name
        </label>
        <input
          type="text"
          {...register('lastName', { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Last name"
          required
        />
      </div>
      {errors.lastName && <p>Last name is required.</p>}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          {...register('email', { required: true })}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      {errors.email && <p>Email is required.</p>}
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          {...register('password', { required: true })}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      {errors.password && <p>Password is required.</p>}

      <button
        disabled={isLoading}
        type="submit"
        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500 flex flex-row justify-center items-center"
      >
        {isLoading ? (<Loader />) : 'Create User'}
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Already have an account? <a href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
      </p>
    </form>
  )
}
