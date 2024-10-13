import { Model, DataTypes } from "sequelize";
import { sequelizeConnection as sequelize } from "../db/database";

export const SMSLog = sequelize.define(
  "SMSLog",
  {
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SMSLog",
    timestamps: true,
    paranoid: true,
  }
);

export default SMSLog;
