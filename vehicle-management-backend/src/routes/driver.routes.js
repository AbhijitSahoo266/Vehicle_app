const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const validate = require("../validators/common.validator");
const v = require("../validators/driver.validator");
const c = require("../controllers/driver.controller");

router.post("/", auth, v.createDriver, validate, c.create);
router.get("/", auth, c.getAll);
router.get("/:id", auth, c.getById);
router.put("/:id", auth, v.updateDriver, validate, c.update);
router.delete("/:id", auth, c.remove);

module.exports = router;
