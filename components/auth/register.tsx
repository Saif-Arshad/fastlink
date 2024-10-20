"use client";
import React, { useState, useCallback } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RegisterSchema } from "@/helpers/schemas";
import { signIn } from 'next-auth/react';
import axios from 'axios';

function Register() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const initialValues = {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        password: "",
        signature: ""
    };

    const handleRegister = async (values: any) => {
        setLoading(true);
        const fullName = `${values.first_name} ${values.middle_name} ${values.last_name}`;
        const payload = {
            full_name: fullName,
            email: values.email,
            password: values.password,
            signature: values.signature,
        };
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, payload);
            if (response.data.success) {
                toast.success("Account created successfully");
                router.push("/login");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || "Error creating account");
        } finally {
            setLoading(false);
        }
    };


    const projectHighlights = [
        "Manage your team effortlessly.",
        "Assign and track daily tasks ",
        "Monitor activity",
    ];
    return (
        <section className="bg-white ">
            {/* <section className="bg-white h-screen max-h-screen lg:overflow-y-hidden"> */}
            <div className="grid grid-cols-1 lg:grid-cols-2">


                <div className="flex items-center justify-center px-5 py-4 xl:py-9 xl:pt-12 bg-white sm:px-6 lg:px-8 ">
                    <div className="w-full xl:w-10/12 2xl:max-w-md xl:mx-auto">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
                            Register your Account
                        </h2>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={RegisterSchema}
                            onSubmit={handleRegister}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4 mt-20">
                                    <div className='flex gap-4 w-full flex-col lg:flex-row'>

                                        <div className="flex flex-col w-full lg:w-6/12">
                                            <label className="mb-1 font-medium text-gray-500">First Name</label>
                                            <Field
                                                type="text"
                                                name="first_name"
                                                placeholder="Enter your First Name"
                                                className="w-full py-4 pl-4 pr-4 border border-gray-300 rounded-xl bg-white text-gray-700"
                                            />
                                            <ErrorMessage name="first_name" component="div" className="text-red-600 text-sm mt-1" />
                                        </div>

                                        <div className="flex flex-col w-full lg:w-6/12">

                                            <label className="mb-1 font-medium text-gray-500">Middle Name</label>
                                            <Field
                                                type="text"
                                                name="middle_name"
                                                placeholder="Enter your Middle Name"
                                                className="w-full py-4 pl-4 pr-4 border border-gray-300 rounded-xl bg-white text-gray-700"
                                            />
                                            <ErrorMessage name="middle_name" component="div" className="text-red-600 text-sm mt-1" />
                                        </div>

                                    </div>
                                    <div className="flex flex-col">
                                        <label className="mb-1 font-medium text-gray-500">Last Name</label>
                                        <Field
                                            type="text"
                                            name="last_name"
                                            placeholder="Enter your last name"
                                            className="w-full py-4 pl-4 pr-4 border border-gray-300 rounded-xl bg-white text-gray-700"
                                        />
                                        <ErrorMessage name="last_name" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 font-medium text-gray-500">Email</label>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            className="w-full py-4 pl-4 pr-4 border border-gray-300 rounded-xl bg-white text-gray-700"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 font-medium text-gray-500">Password</label>
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className="w-full py-4 pl-4 pr-4 border border-gray-300 rounded-xl bg-white text-gray-700"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <div className="flex flex-col">
                                        <label className="mb-1 font-medium text-gray-500">Signature</label>
                                        <Field
                                            type="text"
                                            name="signature"
                                            placeholder="Enter your signature"
                                            className="w-full py-4 pl-4 pr-4 border border-gray-300 rounded-xl bg-white text-gray-700"
                                        />
                                        <ErrorMessage name="signature" component="div" className="text-red-600 text-sm mt-1" />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center font-semibold items-center py-4 text-white bg-blue-600 rounded-xl hover:opacity-90"
                                    >
                                        {isSubmitting ? "Registering..." : "Sign Up"}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                <div className="relative lg:min-h-screen flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 bg-gray-50 sm:px-6 lg:px-8">
                    <div className="absolute inset-0">
                        <img className="object-cover w-full h-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg" alt="" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="relative">
                        <div className="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl">
                            <h3 className="text-4xl font-bold text-white leading-10">
                                Join Us Today! <br className="hidden xl:block" />
                                Let&apos;s get you started on your journey.
                            </h3>

                            <ul className="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4">
                                {projectHighlights.map((highlight, index) => (
                                    <li key={index} className="flex items-center space-x-3">
                                        <div className="inline-flex items-center justify-center flex-shrink-0 w-5 h-5 bg-blue-500 rounded-full">
                                            <svg className="w-3.5 h-3.5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className=" text-white">{highlight}</span>
                                    </li>
                                ))}


                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Register;
