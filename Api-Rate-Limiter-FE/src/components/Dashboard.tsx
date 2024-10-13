import axios, { AxiosResponse } from "axios";
import { Chart, registerables } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import React, { useContext, useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { SmsContext } from "../App";
Chart.register(...registerables);

const Dashboard: React.FC = () => {
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
  const { smsLogs, isViolate } = useContext(SmsContext);
  const [todaylogs, setTodayLogs] = useState([]);
  const [lastMinutelogs, setLastMinuteLogs] = useState([]);
  const [rateLimitViolation, setRateLimitViolation] = useState([]);

  useEffect(() => {
    getTodayLogs();
    getLastMinuteLogs();
  }, [smsLogs]);

  useEffect(() => {
    getRateLimitViolation();
  }, [isViolate]);

  const getTodayLogs = async () => {
    const response = (await axios.get(
      `${API_URL}/sms/Todaylogs`
    )) as AxiosResponse;
    if (response && response.status === 200) {
      setTodayLogs(response.data.data);
    }
  };

  const getLastMinuteLogs = async () => {
    const response = (await axios.get(
      `${API_URL}/sms/lastMinuteLogs`
    )) as AxiosResponse;
    if (response && response.status === 200) {
      setLastMinuteLogs(response.data.data);
    }
  };

  const getRateLimitViolation = async () => {
    const response = (await axios.get(
      `${API_URL}/sms/lastHourRateLimitViolation`
    )) as AxiosResponse;
    if (response && response.status === 200) {
      setRateLimitViolation(response.data.data);
    }
  };

  const sourceClosureData = {
    labels: [
      "SMS Sent (Last Minute)",
      "SMS Sent (Today)",
      "Rate Limit Violation (Last Hour)",
    ],
    datasets: [
      {
        label: "SMS",
        backgroundColor: [
          "rgba(255, 99, 132,0.9)",
          "rgba(54, 162, 235,0.9)",
          "rgba(0, 255, 0,0.9)",
        ],
        hoverBackgroundColor: [
          "rgba(255, 99, 132,0.6)",
          "rgba(54, 162, 235,0.6)",
          "rgba(0, 255, 0,0.6)",
        ],
        data: [
          lastMinutelogs?.length || 0,
          todaylogs?.length || 0,
          rateLimitViolation?.length || 0,
        ],
      },
    ],
  };

  const sourceClosureOptions: any = {
    animation: {
      animateRotate: true, // Enable rotation animation
      animateScale: true, // Enable scale animation
    },
    plugins: {
      datalabels: {
        color: "Black",
        formatter: (value: any) => value, // Customize the format of the displayed value
      },
    },
  };

  return (
    <div className="bg-white border rounded-lg shadow-md p-6 w-full h-[400px] max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Dashboard Chart</h2>
      <div className="flex justify-center items-center h-72 w-96">
        <Doughnut
          data={sourceClosureData}
          options={{
            ...sourceClosureOptions,
            responsive: true,
            maintainAspectRatio: false,
          }}
          plugins={[ChartDataLabels] as any}
        />
      </div>
    </div>
  );
};

export default Dashboard;
