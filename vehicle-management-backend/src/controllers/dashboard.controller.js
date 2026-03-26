const Trip = require("../models/Trip");
const { fn, col } = require("sequelize");
const { Op } = require("sequelize");
// const Trip = require("../models/Trip");
const Vehicle = require("../models/Vehicle");
exports.overview = async (req, res) => {
  const data = await Trip.findOne({
    attributes: [
      [fn("SUM", col("fareAmount")), "totalEarnings"],
      [fn("SUM", col("maintenanceCost")), "totalMaintenance"],
      [fn("SUM", col("fuelCost")), "totalFuel"],
      [fn("SUM", col("otherCost")), "totalOther"],
    ],
    raw: true,
  });
  // Get total EMI from all vehicles
  // const vehicleData = await Vehicle.findOne({
  //   attributes: [
  //     [fn("SUM", col("emiAmount")), "totalEmi"],
  //   ],
  //   where: {
  //     isActive: true // Only count active vehicles
  //   },
  //   raw: true,
  // });


  const earnings = Number(data.totalEarnings || 0);
  const maintenance = Number(data.totalMaintenance || 0);
  const fuel = Number(data.totalFuel || 0);
  const other = Number(data.totalOther || 0);
  // const totalEmi = Number(vehicleData?.totalEmi || 0);

  const profit = earnings - (maintenance + fuel + other);

  res.json({ earnings, maintenance, fuel, other, profit });
};


exports.earnings = async (req, res) => {
  try {
    const now = new Date();

    // 📅 Current Month Range
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // 📅 Current Year Range
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // ✅ Monthly Earnings (ALL VEHICLES)
    const monthly = await Trip.sum("fareAmount", {
      where: {
        isActive: true, // ignore deleted trips
        tripDate: {
          [Op.gte]: startOfMonth,
          [Op.lt]: endOfMonth,
        },
      },
    });

    // ✅ Yearly Earnings (ALL VEHICLES)
    const yearly = await Trip.sum("fareAmount", {
      where: {
        isActive: true,
        tripDate: {
          [Op.gte]: startOfYear,
          [Op.lt]: endOfYear,
        },
      },
    });

    return res.json({
      monthly: Number(monthly || 0),
      yearly: Number(yearly || 0),
    });

  } catch (error) {
    console.error("Earnings API Error:", error);
    res.status(500).json({ error: "Failed to fetch earnings data" });
  }
};


exports.profit = async (req, res) => {
  try {
    const now = new Date();

    // 📅 Date ranges
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear() + 1, 0, 1);

    // 🟢 Monthly Profit Calculation
    const monthlyData = await Trip.findOne({
      attributes: [
        [fn("SUM", col("fareAmount")), "fare"],
        [fn("SUM", col("fuelCost")), "fuel"],
        [fn("SUM", col("maintenanceCost")), "maintenance"],
        [fn("SUM", col("otherCost")), "other"],
      ],
      where: {
        isActive: true,
        tripDate: {
          [Op.gte]: startOfMonth,
          [Op.lt]: endOfMonth,
        },
      },
      raw: true,
    });

    // 🟢 Yearly Profit Calculation
    const yearlyData = await Trip.findOne({
      attributes: [
        [fn("SUM", col("fareAmount")), "fare"],
        [fn("SUM", col("fuelCost")), "fuel"],
        [fn("SUM", col("maintenanceCost")), "maintenance"],
        [fn("SUM", col("otherCost")), "other"],
      ],
      where: {
        isActive: true,
        tripDate: {
          [Op.gte]: startOfYear,
          [Op.lt]: endOfYear,
        },
      },
      raw: true,
    });

    // ✅ Convert & calculate
    const monthlyProfit =
      Number(monthlyData.fare || 0) -
      (Number(monthlyData.fuel || 0) +
        Number(monthlyData.maintenance || 0) +
        Number(monthlyData.other || 0));

    const yearlyProfit =
      Number(yearlyData.fare || 0) -
      (Number(yearlyData.fuel || 0) +
        Number(yearlyData.maintenance || 0) +
        Number(yearlyData.other || 0));

    res.json({
      monthly: monthlyProfit,
      yearly: yearlyProfit,
    });

  } catch (error) {
    console.error("Profit API Error:", error);
    res.status(500).json({ error: "Failed to fetch profit data" });
  }
};


exports.vehicleCount = async (req, res) => {
  try {
    const totalVehicles = await Vehicle.count();

    const activeVehicles = await Vehicle.count({
      where: { isActive: true },
    });

    res.json({
      totalVehicles,
      activeVehicles,
    });
  } catch (error) {
    console.error("Vehicle Count Error:", error);
    res.status(500).json({ error: "Failed to fetch vehicle counts" });
  }
};



exports.vehicleSummary = async (req, res) => {
  const vehicles = await Vehicle.findAll({ where: { isActive: true }, raw: true });

  const summaries = await Promise.all(
    vehicles.map(async v => {
      const trips = await Trip.findAll({ where: { vehicleId: v.id }, raw: true });

      let earning = 0, fuel = 0, maint = 0;

      trips.forEach(t => {
        earning += Number(t.fareAmount || 0);
        fuel += Number(t.fuelCost || 0);
        maint += Number(t.maintenanceCost || 0);
      });

      return {
        vehicleId: v.id,
        name: v.name,
        registrationNumber: v.registrationNumber,
        totalTrips: trips.length,
        earning,
        fuel,
        maintenance: maint,
        profit: earning - (fuel + maint),
      };
    })
  );

  res.json(summaries);
};
