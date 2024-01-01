const express = require("express");

const router = express.Router();

const bicycleController = require("../controllers/bicycleController");

router
  .route("/")
  .get(bicycleController.getBicycle)
  .post(bicycleController.postBicycle);

router.patch("/update/:id", bicycleController.updateBicycleStatus);
router.delete("/:id", bicycleController.deleteBicycle);
router.route("/counts").get(bicycleController.getBicycleCounts);
module.exports = router;
