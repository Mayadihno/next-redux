"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store/hooks/hooks";
import { nextStep, previousStep, updateForm } from "@/store/slice/formSlice";
import { FormState } from "@/types/types";
import { Button } from "./ui/button";
import { FaCheckCircle } from "react-icons/fa";
import { cn } from "@/lib/utils";

const MultiStepForm = () => {
  const dispatch = useAppDispatch();
  const { firstName, lastName, email, phone, step } = useAppSelector(
    (state) => state.form
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormState>({
    defaultValues: { firstName, lastName, email, phone },
  });

  const onSubmit = (data: FormState) => {
    dispatch(updateForm(data));
    console.log(data);
    if (step === 3) {
      reset();
    } else {
      dispatch(nextStep());
    }
  };

  return (
    <div className="bg-blue-50 py-8 px-8 min-h-screen flex items-center justify-center">
      <div className="max-w-xl border border-gray-300 bg-white rounded-xl min-h-96 p-8">
        <h2 className="text-center text-2xl mb-6">Multi Step Form</h2>
        <div className="flex items-center justify-between mb-8">
          <button
            className={cn(
              "w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center relative",
              step >= 1 && "border-blue-600 border-2"
            )}
          >
            {step > 1 && (
              <FaCheckCircle
                className="text-green-500 absolute -right-2 -top-2"
              />
            )}
            1
          </button>
          <div className="flex-1 h-[1px] bg-slate-300 w-full"></div>
          <button
            className={cn(
              "w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center relative",
              step >= 2 && "border-blue-600 border-2"
            )}
          >
            {step > 2 && (
              <FaCheckCircle
                className="text-green-500 absolute -right-2 -top-2"
              />
            )}
            2
          </button>
          <div className="flex-1 h-[1px] bg-slate-300 w-full"></div>
          <button
            className={cn(
              "w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center relative",
              step === 3 && "border-blue-600 border-2"
            )}
          >
            {step === 3 && (
              <FaCheckCircle
                className="text-green-500 absolute -right-2 -top-2"
              />
            )}
            3
          </button>
        </div>
        <div className="py-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block">First Name</label>
                  <input
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg border text-sm focus:border-blue-500 focus:ring-blue-500"
                    {...register("firstName", { required: true })}
                    placeholder="First Name"
                  />
                  {errors.firstName && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="mb-2 block">Last Name</label>
                  <input
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg border text-sm focus:border-blue-500 focus:ring-blue-500"
                    {...register("lastName", { required: true })}
                    placeholder="Last Name"
                  />
                  {errors.lastName && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
                <Button
                  type="button"
                  onClick={handleSubmit(onSubmit)}
                >
                  Next
                </Button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div>
                  <label className="mb-2 block">Email</label>
                  <input
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg border text-sm focus:border-blue-500 focus:ring-blue-500"
                    {...register("email", { required: true })}
                    placeholder="Email"
                  />
                  {errors.email && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="mb-2 block">Phone</label>
                  <input
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg border text-sm focus:border-blue-500 focus:ring-blue-500"
                    {...register("phone", { required: true })}
                    placeholder="Phone"
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs">
                      This field is required
                    </span>
                  )}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <Button
                    variant={"outline"}
                    type="button"
                    onClick={() => dispatch(previousStep())}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleSubmit(onSubmit)}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="text-center">
                <FaCheckCircle className="text-green-500 text-5xl mb-4" />
                <h3 className="text-2xl font-semibold mb-4">Form Completed</h3>
                <p className="mb-4">
                  Thank you for submitting the form. Your data has been
                  successfully saved.
                </p>
                <Button
                  type="button"
                  onClick={() => {
                    reset();
                    dispatch(previousStep());
                  }}
                >
                  Back to Start
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
