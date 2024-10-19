// "use client";

// import { LoginSchema } from "@/helpers/schemas";
// import { LoginFormType } from "@/helpers/types";
// import { Button, Input } from "@nextui-org/react";
// import { Formik } from "formik";
// import { LockKeyhole, LogInIcon } from "lucide-react";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import { redirect, useRouter } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import { toast } from "sonner";

// export const Login = ({
//   searchParams,
// }: {
//   searchParams: { error?: string };
// }) => {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const initialValues: LoginFormType = {
//     email: "",
//     password: "",
//   };

//   const handleLogin = useCallback(async (values: LoginFormType) => {
//     setLoading(true);
//     try {
//       await signIn("credentials", {
//         ...values,
//       });
//     } catch (error) {
//       console.error("Login error:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, []); // Add dependencies if needed

//   useEffect(() => {
//     if (searchParams.error) {
//       router.replace("/login");
//       toast.error(searchParams.error);
//     }
//   }, [searchParams]);
//   return (
//     <div className="flex flex-col w-full md:w-9/12 2xl:w-7/12 gap-4 mb-4">
//       <div className="text-start text-[25px] font-bold mb-6 flex items-center gap-2">
//         <LockKeyhole />
//         Access your Account
//       </div>
//       <Formik
//         initialValues={initialValues}
//         validationSchema={LoginSchema}
//         onSubmit={handleLogin}
//       >
//         {({ values, errors, touched, handleChange, handleSubmit }) => (
//           <>
//             <div className="flex flex-col gap-4">
//               <Input
//                 variant="bordered"
//                 label="Email"
//                 type="email"
//                 value={values.email}
//                 isInvalid={!!errors.email && !!touched.email}
//                 errorMessage={errors.email}
//                 onChange={handleChange("email")}
//               />
//               <Input
//                 variant="bordered"
//                 label="Password"
//                 type="password"
//                 value={values.password}
//                 isInvalid={!!errors.password && !!touched.password}
//                 errorMessage={errors.password}
//                 onChange={handleChange("password")}
//               />
//             </div>

//             <Button
//               onClick={() => handleSubmit()}
//               onPress={() => handleSubmit()}
//               variant="bordered"
//               color="primary"
//             >
//               {loading ? (
//                 <div className="flex items-center gap-x-2">
//                   <div role="status">
//                     <svg
//                       aria-hidden="true"
//                       className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
//                       viewBox="0 0 100 101"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
//                         fill="currentColor"
//                       />
//                       <path
//                         d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
//                         fill="currentFill"
//                       />
//                     </svg>
//                   </div>
//                   <span>Signing In...</span>
//                 </div>
//               ) : (
//                 "Login Now"
//               )}
//             </Button>
//           </>
//         )}
//       </Formik>{" "}
//     </div>
//   );
// };
"use client"
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { useTheme } from 'next-themes';

function Login({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const initialValues: LoginFormType = {
    email: "",
    password: "",
  };

  const handleLogin = useCallback(async (values: LoginFormType) => {
    setLoading(true);
    try {
      await signIn("credentials", {
        ...values,
      });
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchParams.error) {
      router.replace("/login");
      toast.error(searchParams.error);
    }
  }, [searchParams]);
  const { theme } = useTheme();
  const [logoSrc, setLogoSrc] = useState("/Logo.png");

  useEffect(() => {
    setLogoSrc(theme !== "dark" ? "/Logo.png" : "/logo_white.png");
  }, [theme]);

  return (
    <section className="bg-white dark:bg-black h-screen">
      {/* <div className="grid grid-cols-1 lg:grid-cols-2"> */}
      {/* <Image
          src={`${theme !== "dark" ? "/Logo.png" : "/logo_white.png"}`}
          className="object-cover object-top flex sm:hidden"
          alt="logo"
          height={150}
          width={150}
        /> */}
      {/* <div className="relative flex sm:min-h-screen items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="absolute inset-0">
            <img className="object-cover object-top w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/signin/4/girl-thinking.jpg" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
          <div className="relative w-full pt-10">
            <Image
              src="/logo_white.png"
              className="object-cover object-top"
              alt="logo"
              height={250}
              width={250}
            />
          </div>
        </div> */}
      {/* <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24"> */}
      <div className="flex flex-col items-center justify-center px-4 bg-white dark:bg-black sm:px-6 lg:px-8 ">
        <Image
          src={logoSrc}
          alt="Company Logo"
          width={1600}
          height={100}
          className='w-full md:w-8/12 xl:w-6/12'
        />
        <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto mt-20">
          <h2 className="text-2xl mt-6  font-bold leading-tight text-black dark:text-white sm:text-3xl">Login</h2>
          <p className="mt-2 text-base text-gray-600 dark:text-slate-300">
            Don’t have an account?{" "}
            <Link href="/register" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline">
              Create an account
            </Link>
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form className="mt-8 space-y-6">
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white"> Email address </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter email to Login"
                      className="block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 dark:border-[#4e4d4d22] dark:bg-[#6c6a6a22] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <label className="text-base font-medium text-gray-900 dark:text-white"> Password </label>
                  <div className="mt-2.5 relative text-gray-400 focus-within:text-gray-600">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                      </svg>
                    </div>
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="block w-full py-4 pl-10 pr-4 text-black dark:text-white placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 dark:border-[#4e4d4d22] dark:bg-[#6c6a6a22] focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                    />
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center  justify-center w-full px-4 my-7 py-4 text-base font-semibold text-white transition-all duration-200 border border-transparent rounded-xl bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:opacity-80 focus:opacity-80"
                  >
                    {loading ?
                      <>
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                              fill="currentColor"
                            />
                            <path
                              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                              fill="currentFill"
                            />
                          </svg>
                        </div>
                        <span className='ml-2'>Signing In...</span>
                      </>

                      : 'Log in'}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {/* </div> */}
    </section>
  );
}

export default Login;
