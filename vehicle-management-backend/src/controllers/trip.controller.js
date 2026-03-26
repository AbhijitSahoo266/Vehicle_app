const Trip = require("../models/Trip");
const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");

const tripInclude = [
  {
    model: Vehicle,
    as: "vehicle",
  },
  {
    model: Driver,
    as: "driver",
  },
];

const getActiveVehicle = async (vehicleId) => {
  if (!vehicleId) return null;

  return Vehicle.findOne({
    where: { id: vehicleId, isActive: true },
  });
};

const getActiveDriver = async (driverId) => {
  if (!driverId) return null;

  return Driver.findOne({
    where: { id: driverId, isActive: true },
  });
};

exports.create = async (req, res) => {
  try {
    const [vehicle, driver] = await Promise.all([
      getActiveVehicle(req.body.vehicleId),
      getActiveDriver(req.body.driverId),
    ]);

    if (!vehicle || !driver) {
      return res.status(400).json({
        error: "Valid active vehicleId and driverId are required",
      });
    }

    const trip = await Trip.create({ ...req.body });

    const createdTrip = await Trip.findByPk(trip.id, {
      include: tripInclude,
    });

    res.status(201).json(createdTrip);

  } catch (error) {
    console.error("🔥 ERROR:", error);  
    res.status(500).json({
      error: error.message,
      details: error.errors || null
    });
  }
};

exports.getAll = async (req, res) => {
  const where = {isActive: true};
  if (req.query.vehicleId) where.vehicleId = req.query.vehicleId;
  if (req.query.driverId) where.driverId = req.query.driverId;

  const trips = await Trip.findAll({
    where,
    include: tripInclude,
    order: [["tripDate", "DESC"], ["createdAt", "DESC"]],
  });
  res.json(trips);
};

exports.getById = async (req, res) => {
  const trip = await Trip.findOne({
    where: { id: req.params.id },
    include: tripInclude,
  });
  if (!trip) return res.status(404).json({ error: "Trip not found" });
  res.json(trip);
};

exports.update = async (req, res) => {
  const trip = await Trip.findOne({
    where: { id: req.params.id},
  });
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  const needsVehicleCheck = req.body.vehicleId !== undefined;
  const needsDriverCheck = req.body.driverId !== undefined;

  if (needsVehicleCheck || needsDriverCheck) {
    const [vehicle, driver] = await Promise.all([
      needsVehicleCheck ? getActiveVehicle(req.body.vehicleId) : Promise.resolve(true),
      needsDriverCheck ? getActiveDriver(req.body.driverId) : Promise.resolve(true),
    ]);

    if (!vehicle || !driver) {
      return res.status(400).json({
        error: "Valid active vehicleId and driverId are required",
      });
    }
  }

  await trip.update(req.body);
  const updatedTrip = await Trip.findByPk(trip.id, { include: tripInclude });
  res.json(updatedTrip);
};

exports.remove = async (req, res) => {
  const trip = await Trip.findOne({
    where: { id: req.params.id },
  });
  if (!trip) return res.status(404).json({ error: "Trip not found" });

  await trip.update({ isActive: false });
  res.json({ message: "Trip deactivated" });
};


