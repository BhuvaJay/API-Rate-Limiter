import React from "react";
import SendSMS from "../components/SendSMS";
import Dashboard from "../components/Dashboard";

const HomePage: React.FC = () => (
  <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-[525px] max-w-7xl">
      <h1 className="text-3xl font-bold mb-6 text-center">SMS Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex justify-center items-center">
          <SendSMS />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <Dashboard />
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;
