const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./User");
const Vehicle = require("./Vehicle");
const Driver = require("./Driver");

const Trip = sequelize.define(
  "Trip",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    tripDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    vehicleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Vehicle,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Driver,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "RESTRICT",
    },

    startLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    endLocation: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    distanceTravelled: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },

    fareAmount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    fuelCost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    maintenanceCost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    otherCost: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },

    passengerName: {
      type: DataTypes.STRING,
    },

    passengerPhone: {
      type: DataTypes.BIGINT,
    },

    note: {
      type: DataTypes.TEXT,
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "trips",
    timestamps: true,
  }
);

Trip.belongsTo(Vehicle, { foreignKey: "vehicleId", as: "vehicle" });
Vehicle.hasMany(Trip, { foreignKey: "vehicleId", as: "trips" });
Trip.belongsTo(Driver, { foreignKey: "driverId", as: "driver" });
Driver.hasMany(Trip, { foreignKey: "driverId", as: "trips" });


module.exports = Trip;
