import { func } from "joi";

require("dotenv").config();

// server port
function getPort() {
  return parseInt(process.env.PORT || "9000");
}

function getDbName(): string {
  return process.env.DbName || "";
}

// get environment
function getEnvironment(): string {
  return process.env.ENVIRONMENT || "dev";
}
function getTestMode(): boolean {
  return process.env.testMode === "true";
}

function getDbUser() {
  return process.env.DbUser || "";
}

function getDbPwd() {
  return process.env.DbPwd || "";
}

function getDbHost() {
  return process.env.DbHost || "";
}

function getDbPort() {
  return process.env.DbPort || "5432";
}

const config = {
  getPort,
  getEnvironment,
  getDbHost,
  getDbName,
  getDbPort,
  getDbPwd,
  getDbUser,
  getTestMode,
};

export { config };
