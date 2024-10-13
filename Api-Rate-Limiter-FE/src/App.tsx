import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";

export const SmsContext = React.createContext<{
  smsLogs: any[];
  addSmsLog: (log: any) => void;
  setIsViolate: any;
  isViolate: boolean;
}>({
  smsLogs: [],
  addSmsLog: () => {},
  setIsViolate: () => {},
  isViolate: false,
});

const App: React.FC = () => {
  const [smsLogs, setSmsLogs] = useState<any[]>([]);
  const [isViolate, setIsViolate] = useState<boolean>(false);

  const addSmsLog = (log: any) => {
    setSmsLogs((prevLogs) => [...prevLogs, log]);
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <SmsContext.Provider
        value={{ smsLogs, addSmsLog, setIsViolate, isViolate }}
      >
        <HomePage />
      </SmsContext.Provider>
    </>
  );
};

export default App;
