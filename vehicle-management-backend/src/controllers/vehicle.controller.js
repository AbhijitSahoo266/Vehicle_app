const Vehicle = require("../models/Vehicle");

exports.create = async (req, res) => {
  const vehicle = await Vehicle.create({ ...req.body, userId: req.user.userId });
  res.status(201).json(vehicle);
};

exports.getAll = async (req, res) => {
  const data = await Vehicle.findAll({
    where: {  isActive: true },
  });
  res.json(data);
};

exports.getById = async (req, res) => {
  const data = await Vehicle.findOne({
    where: { id: req.params.id, userId: req.user.userId },
  });
  if (!data) return res.status(404).json({ error: "Vehicle not found" });
  res.json(data);
};

exports.update = async (req, res) => {
  const vehicle = await Vehicle.findOne({
    where: { id: req.params.id },
  });
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

  await vehicle.update(req.body);
  res.json(vehicle);
};

exports.remove = async (req, res) => {
  const vehicle = await Vehicle.findOne({
    where: { id: req.params.id },
  });
  if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

  await vehicle.update({ isActive: false });
  res.json({ message: "Vehicle deactivated" });
};


