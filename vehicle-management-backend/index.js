require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./src/config/sequelize");

// models (important to load before sync for relations)
require("./src/models/User");
require("./src/models/Driver");
require("./src/models/Trip");
require("./src/models/Vehicle");

const authRoutes = require("./src/routes/auth.routes");


const app = express();

app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  res.send("Vehicle Management Backend Running 🚀");
});
app.get("/db-test",async(req,res)=>{
  try{
    await sequelize.authenticate();
    res.send("database connected sucefully");
  }catch (error){
    console.error(error);
    res.send("database connection failed")
  }

})

app.use("/api/auth", authRoutes); // register , login 
app.use("/api/drivers", require("./src/routes/driver.routes"));
app.use("/api/vehicles", require("./src/routes/vehicle.routes"));
app.use("/api/trips", require("./src/routes/trip.routes"));
app.use("/api/dashboard", require("./src/routes/dashboard.routes"));

// DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Sequelize connected to PostgreSQL"))
  .catch((err) => console.error("❌ DB connection error:", err));

// Sync models → create tables
sequelize
   .sync({ alter: true }) 
  .then(() => console.log("✅ Models synced with DB"))
  .catch((err) => console.error("❌ Model sync failed:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
