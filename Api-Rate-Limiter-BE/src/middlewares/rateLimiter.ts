import { Request, Response, NextFunction } from "express";
import SMSLog from "../models/sms.model";
import { Op } from "sequelize";
import { logSMSRequest } from "../repository/smsService";
import { CommonConstants } from "../utils/CommonConstants";
import { ResponseType, sendResponse } from "../common";

export const rateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const ip = getClientIP(req);
  const { phoneNumber } = req.body;

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const oneMinuteAgo = new Date(Date.now() - 60 * 1000);

  const recentLogs = await SMSLog.count({
    where: {
      ip,
      phoneNumber,
      timestamp: { [Op.gt]: oneMinuteAgo },
    },
  });

  const TodayLogs = await SMSLog.count({
    where: {
      ip,
      phoneNumber,
      timestamp: { [Op.gt]: startOfDay },
    },
  });

  if (recentLogs >= 3) {
    await logSMSRequest(ip, phoneNumber, "rate limit exceeded (1 min)");
    res.set("Retry-After", "60");

    return sendResponse(
      res,
      CommonConstants.API_RESPONSE_TOO_MANY_REQUEST,
      ResponseType.error,
      "Rate limit exceeded. Please try again after 1 minute."
    );
  }

  if (TodayLogs >= 10) {
    await logSMSRequest(ip, phoneNumber, "rate limit exceeded (daily)");
    return sendResponse(
      res,
      CommonConstants.API_RESPONSE_TOO_MANY_REQUEST,
      ResponseType.error,
      "Daily limit exceeded. Please try again tomorrow."
    );
  }

  next();
};

export const getClientIP = (req: Request) => {
  // Get the IP address from the request
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  // If using x-forwarded-for, it may return a comma-separated list
  const clientIP = Array.isArray(ip) ? ip[0] : ip;
  return clientIP;
};
