const router = require("express").Router();
const c = require("../controllers/dashboard.controller");
const auth = require("../middleware/auth.middleware");


router.get("/overview",auth, c.overview);
router.get("/earnings",auth, c.earnings);
router.get("/profit",auth, c.profit);
router.get("/vehicle-summary",auth, c.vehicleSummary);
router.get("/active-vehicles",auth, c.vehicleCount);

module.exports = router;
