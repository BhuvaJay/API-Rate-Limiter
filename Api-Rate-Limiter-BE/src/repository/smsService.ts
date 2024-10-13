import SMSLog from "../models/sms.model";

export const logSMSRequest = async (
  ip: string | undefined,
  phoneNumber: string,
  status: string
) => {
  await SMSLog.create({
    ip,
    phoneNumber,
    status,
  });
};
