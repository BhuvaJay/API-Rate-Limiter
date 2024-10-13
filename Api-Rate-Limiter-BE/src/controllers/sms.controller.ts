import { Request, Response } from "express";
import { Op } from "sequelize";
import { ResponseType, sendResponse } from "../common";
import { getClientIP } from "../middlewares/rateLimiter";
import SMSLog from "../models/sms.model";
import { logSMSRequest } from "../repository/smsService";
import { CommonConstants } from "../utils/CommonConstants";
import { logger } from "../utils/logger";

export const sendSMS = async (req: Request, res: Response): Promise<void> => {
  const { phoneNumber, message } = req.body;
  const ip: string | undefined = getClientIP(req);

  try {
    // simulate SMS sending
    console.log(`Sending SMS to ${phoneNumber}: ${message}`);

    await logSMSRequest(ip, phoneNumber, "sent");

    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_SUCCESSFULL,
      ResponseType.success,
      "SMS sent successfully."
    );
  } catch (error: any) {
    logger.error(
      `${CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR,
      ResponseType.error,
      "Failed to send SMS"
    );
  }
};

export const getTodayLogs = async (req: Request, res: Response) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const now = new Date();

    const logs = await SMSLog.findAll({
      where: {
        timestamp: {
          [Op.gte]: startOfToday,
          [Op.lte]: now,
        },
      },
    });

    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_SUCCESSFULL,
      ResponseType.success,
      "Today's logs fetched successfully",
      logs
    );
  } catch (error) {
    logger.error(
      `${CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR,
      ResponseType.error,
      "Failed to retrieve today's logs"
    );
  }
};

export const getLastMinuteLogs = async (req: Request, res: Response) => {
  try {
    const logs = await SMSLog.findAll({
      where: {
        timestamp: {
          [Op.gte]: new Date(new Date().getTime() - 60 * 1000),
          [Op.lte]: new Date(),
        },
      },
    });

    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_SUCCESSFULL,
      ResponseType.success,
      "Last Minute logs fetched successfully",
      logs
    );
  } catch (error) {
    logger.error(
      `${CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR,
      ResponseType.error,
      "Failed to retrieve last minute logs"
    );
  }
};

export const getLastHourRateLimitViolation = async (
  req: Request,
  res: Response
) => {
  try {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);

    const violations = await SMSLog.findAll({
      where: {
        status: {
          [Op.ne]: "sent",
        },
        timestamp: {
          [Op.gt]: oneHourAgo,
        },
      },
    });

    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_SUCCESSFULL,
      ResponseType.success,
      "Last hour limit violation logs fetched successfully",
      violations
    );
  } catch (error) {
    logger.error(
      `${CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR} || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    sendResponse(
      res,
      CommonConstants.API_RESPONSE_STATUS_INTERNAL_SERVER_ERROR,
      ResponseType.error,
      "Failed to retrieve last hour limit violation logs"
    );
  }
};
