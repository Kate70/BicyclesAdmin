const Bicycle = require("../models/BicycleModel.js");

const getBicycle = async (req, res) => {
  try {
    const bicycles = await Bicycle.find();
    res.json(bicycles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postBicycle = async (req, res) => {
  console.log("post");
  const { ID, name, type, color, wheelSize, price, description } = req.body;

  try {
    const newBicycle = new Bicycle({
      ID,
      name,
      type,
      color,
      wheelSize,
      price,
      description,
    });

    await newBicycle.save();

    res.status(201).json({ message: "Bicycle added successfully" });
  } catch (error) {
    console.error(error);
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return res.status(400).json({ errors: validationErrors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateBicycleStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const bicycle = await Bicycle.findById(id);

    if (!bicycle) {
      return res.status(404).json({ error: "Bicycle not found" });
    }

    bicycle.status = status;
    await bicycle.save();

    res.json({ message: "Updated", bicycle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBicycleCounts = async (req, res) => {
  try {
    const availableCount = await Bicycle.countDocuments({
      status: "available",
    });
    const unavailableCount = await Bicycle.countDocuments({
      status: "unavailable",
    });
    const bookedCount = await Bicycle.countDocuments({ status: "busy" });

    const totalBikes = availableCount + unavailableCount + bookedCount;
    const allBikes = await Bicycle.find();
    const totalBikeCost = allBikes.reduce((sum, bike) => sum + bike.price, 0);

    const averageBikeCost = (totalBikeCost / totalBikes).toFixed(2);

    res.status(200).json({
      availableCount,
      unavailableCount,
      bookedCount,
      averageBikeCost,
      totalBikes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteBicycle = async (req, res) => {
  const { id } = req.params;

  try {
    const bicycle = await Bicycle.findByIdAndDelete(id);

    if (!bicycle) {
      return res.status(404).json({ error: "Bicycle not found" });
    }

    res.json({ message: "Bicycle deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBicycle,
  postBicycle,
  getBicycleCounts,
  updateBicycleStatus,
  deleteBicycle,
};
