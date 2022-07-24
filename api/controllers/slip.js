import Slip from "../models/Slip.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createSlip = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newSlip = new Slip(req.body);

  try {
    const savedSlip = await newSlip.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { slips: savedSlip._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedSlip);
  } catch (err) {
    next(err);
  }
};

export const updateSlip = async (req, res, next) => {
  try {
    const updatedSlip = await Slip.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedSlip);
  } catch (err) {
    next(err);
  }
};
export const updateSlipAvailability = async (req, res, next) => {
  try {
    await Slip.updateOne(
      { "slipNumbers._id": req.params.id },
      {
        $push: {
          "slipNumbers.$.unavailableDates": req.body.dates
        },
      }
    );
    res.status(200).json("Slip status has been updated.");
  } catch (err) {
    next(err);
  }
};
export const deleteSlip = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    await Slip.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { slips: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Slip has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getSlip = async (req, res, next) => {
  try {
    const slip = await Slip.findById(req.params.id);
    res.status(200).json(slip);
  } catch (err) {
    next(err);
  }
};
export const getSlips = async (req, res, next) => {
  try {
    const slips = await Slip.find();
    res.status(200).json(slips);
  } catch (err) {
    next(err);
  }
};