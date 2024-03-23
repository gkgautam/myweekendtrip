"use client";

import { addUser } from '@/actions/user/addUser';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

const SignUpForm = () => {

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      address: '',
    },
    onSubmit
  });

  async function onSubmit(values) {
    const res = await addUser(values);
    if (res.success) {
      formik.resetForm();
      toast.success(res.message);
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
    else {
      toast.error(res.message);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className='text-xl font-bold mb-4'>Sign up</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            {...formik.getFieldProps("name")}
          />
        </div>
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
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            maxLength={10}
            minLength={10}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            {...formik.getFieldProps("phone")}
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
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            rows={4}
            id="address"
            name="address"
            type="text"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            {...formik.getFieldProps("address")}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-md font-semibold"
        >
          Sign Up
        </button>
      </form>
    </div >
  );
};

export default SignUpForm;
