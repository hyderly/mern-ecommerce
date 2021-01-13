import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
        {
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            name: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    shippingAddress: {
        address: {type: String, required: true},
        city: {type: String, required: true},
        postalcode: {type: String, required: true},
        country: {type: String, required: true},
    },
    paymentMethod: {
        type: String, 
        required: true
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        update_time: {type: String},
        email_address: {type: String},
    },
    taxPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number, 
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean, 
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isDelivered: {
        type: Boolean, 
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date
    },
    email: {
      type: "String",
      required: [true, "Please add user email"],
      unique: true,
    },
    password: {
      type: "String",
      required: [true, "Please add user password"],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("user", orderSchema);

export default Order;