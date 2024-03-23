"use client";

import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { loginUser } from '@/actions/user/loginUser';
import { useRouter } from 'next/navigation';

const LoginPage = () => {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit
  });

  async function onSubmit(values) {
    const res = await loginUser(values);
    console.log(res);
    toast.success(res.message);
    if (res.success) {
      router.push("/account/home");
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className='text-xl font-bold mb-4'>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            {...formik.getFieldProps("email")}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            {...formik.getFieldProps("password")}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold"
        >
          Sign in
        </button>
      </form>
    </div >
  );
};

export default LoginPage;
