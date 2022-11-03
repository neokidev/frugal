import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { Dialog, Transition } from '@headlessui/react';
import {
  HiOutlineSparkles,
  HiOutlineCurrencyYen,
  HiArrowRight,
  HiChartBar,
} from 'react-icons/hi2';
import Layout from '../components/Layout';

export default function Login() {
  const [disabled, setDisabled] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const signInWithGoogle = () => {
    toast.loading('Redirecting...');
    setDisabled(true);
    // Perform sign in
    signIn('google', {
      callbackUrl: '/',
    });
  };

  const show = true;

  return (
    <Layout isLoginPage>
      <div className="flex max-w-xl mx-auto my-8 overflow-hidden bg-white rounded-lg lg:space-x-8 lg:max-w-6xl">
        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <h2 className="text-6xl font-semibold text-center text-gray-700">
            お金を管理して
            <br />
            節約しましょう！
          </h2>
          <div className="mt-10 space-y-3 sm:flex sm:items-center sm:space-x-4 sm:space-y-0">
            <button
              disabled={disabled}
              onClick={signInWithGoogle}
              className="flex items-center justify-center w-full px-4 py-2 space-x-3 text-sm text-center text-gray-600 transition-colors duration-300 transform border rounded-lg hover:bg-gray-100"
            >
              <Image src="/google.svg" alt="Google" width={24} height={24} />
              <span className="text-sm text-gray-800">Login with Github</span>
            </button>
          </div>

          <div className="flex items-center justify-between mt-8">
            <span className="w-1/5 border-b lg:w-1/4"></span>
            <a
              href="#"
              className="text-xs text-center text-gray-500 uppercase hover:underline"
            >
              or use your email
            </a>
            <span className="w-1/5 border-b lg:w-1/4"></span>
          </div>

          <form method="POST" action="https://tailwindcomponents.com/login">
            <input
              type="hidden"
              name="_token"
              value="OrlOIz8NfZwQWft2s3JeR8T6swx5InGiMlEW3U3i"
            />
            <div className="mt-4">
              <label className="block mb-2 text-sm text-gray-600">
                E-Mail Address
              </label>
              <input
                type="email"
                name="email"
                value=""
                // required="required"
                // autocomplete="email"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                // required="required"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20"
              />
            </div>
            <div className="flex justify-between mt-4">
              <div className="col-md-6 offset-md-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    id="remember"
                    className="border-gray-200 rounded shadow-sm text-primary focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-20"
                  />
                  <label
                    // for="remember"
                    className="ml-2 text-gray-700"
                  >
                    Remember Me
                  </label>
                </div>
              </div>
              <a
                href="https://tailwindcomponents.com/password/reset"
                className="text-sm text-gray-600 hover:underline"
              >
                Forgot Your Password?
              </a>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform rounded-md bg-sky-500 hover:bg-sky-400 focus:outline-none focus:bg-sky-400"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="flex items-center justify-between mt-8">
            <span className="w-1/5 border-b md:w-1/4"></span>
            <a
              href="/register"
              className="text-xs text-gray-500 uppercase hover:underline"
            >
              Create an account
            </a>
            <span className="w-1/5 border-b md:w-1/4"></span>
          </div>
        </div>
        <div className="items-center hidden lg:flex lg:w-1/2">
          <Image
            src="https://picsum.photos/600"
            alt="login-page-image.jpg"
            width={600}
            height={600}
          />
        </div>
      </div>
    </Layout>
  );
}
