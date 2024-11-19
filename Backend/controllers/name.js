import Name from "../models/Name.js";
import Type from "../models/Type.js";
import { createError } from "../utils/error.js";

export const createName = async (req, res, next) => {
  const typeId = req.params.typeid;
  const newName = new Name(req.body);
  try {
    const savedName = await newName.save();
    try {
      await Type.findByIdAndUpdate(typeId, { $push: { rooms: savedName._id } });
    } catch (error) {
      next(error);
    }
    res.status(200).json(savedName);
  } catch (error) {
    next(error);
  }
};


export const Checkout = async (req, res, next) => {
  const cartItems = req.body.cart;
  
  console.log('Cart Items:', cartItems); // Log the cart items
  try {
    for (const item of cartItems) {
      console.log('Updating item:', item.id, 'by amount:', item.amount); // Log each item being updated
      await Name.findByIdAndUpdate(item.id, {
        $inc: { quantity: -item.amount },
      });
    }
    res.status(200).send({ message: 'Checkout successful' });
  } catch (error) {
    console.error('Checkout error:', error); // Log the error if it occurs
    res.status(500).send({ message: 'Error during checkout', error });
  }
};


export const updateName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    if (quantity === undefined) {
      return res.status(400).json({ message: 'Quantity is required' });
    }

    const product = await Name.findByIdAndUpdate(
      id,
      { $set: { quantity } },
      { new: true } 
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error('Error updating product quantity:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteName = async (req, res, next) => {
  const typeId = req.params.typeid;
  try {
    await Name.findByIdAndDelete(req.params.id);
    try {
      await Type.findByIdAndUpdate(typeId, { $pull: { rooms: req.params.id } });
    } catch (error) {
      next(error);
    }
    res.status(200).json("Item is deleted");
  } catch (error) {
    next(error);
  }
};
export const getName = async (req, res, next) => {
  try {
    const name = await Name.find({ type: req.params.type });
    res.status(200).json(name);
  } catch (error) {
    next(error);
  }
};

export const getNameById = async (req, res, next) => {
  try {
    const name = await Name.findById(req.params.id);
    res.status(200).json(name);
  } catch (err) {
    next(err);
  }
};

export const getNames = async (req, res, next) => {
  try {
    const names = await Name.find();
    res.status(200).json(names);
  } catch (error) {
    next(error);
  }
};
