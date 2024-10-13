import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { SmsContext } from "../App";

const smsSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only numbers" }),
  message: z
    .string()
    .min(1, { message: "Message cannot be empty" })
    .max(160, { message: "Message must not exceed 150 characters" }),
});

type SmsFormData = z.infer<typeof smsSchema>;

const SendSMS: React.FC = () => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const { addSmsLog, setIsViolate } = useContext(SmsContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SmsFormData>({
    resolver: zodResolver(smsSchema),
  });

  const handleSend = async (data: SmsFormData) => {
    try {
      const response = (await axios.post(`${API_URL}/sms/send`, {
        phoneNumber: data.phoneNumber,
        message: data.message,
      })) as AxiosResponse;
      if (response && response.status === 200) {
        addSmsLog(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error: any) {
      setIsViolate((prev: boolean) => !prev);
      toast.error(error.response.data.message);
    }

    reset();
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 w-full h-[400px] max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Send SMS</h2>
      <form onSubmit={handleSubmit(handleSend)}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Phone Number"
            {...register("phoneNumber")}
            className="border px-3 py-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Message"
            {...register("message")}
            className="border px-3 py-2 w-full rounded h-32 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default SendSMS;
