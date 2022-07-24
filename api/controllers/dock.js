import Dock from "../models/Dock.js";
import Slip from "../models/Slip.js";

export const createDock = async (req, res, next) => {
  const newDock = new Dock(req.body);

  try {
    const savedDock = await newDock.save();
    res.status(200).json(savedDock);
  } catch (err) {
    next(err);
  }
};
export const updateDock = async (req, res, next) => {
  try {
    const updatedDock = await Dock.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDock);
  } catch (err) {
    next(err);
  }
};
export const deleteDock = async (req, res, next) => {
  try {
    await Dock.findByIdAndDelete(req.params.id);
    res.status(200).json("Dock has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getDock = async (req, res, next) => {
  try {
    const dock = await Dock.findById(req.params.id);
    res.status(200).json(dock);
  } catch (err) {
    next(err);
  }
};
export const getDocks = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const docks = await Dock.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(docks);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Dock.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const dockCount = await Dock.countDocuments({ type: "dock" });
    const apartmentCount = await Dock.countDocuments({ type: "apartment" });
    const resortCount = await Dock.countDocuments({ type: "resort" });
    const villaCount = await Dock.countDocuments({ type: "villa" });
    const cabinCount = await Dock.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "dock", count: dockCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getDockSlips = async (req, res, next) => {
  try {
    const dock = await Dock.findById(req.params.id);
    const list = await Promise.all(
      dock.slips.map((slip) => {
        return Slip.findById(slip);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};