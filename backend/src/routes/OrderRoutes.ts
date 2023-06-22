import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  getMyOrders,
  updateOrderToPayAndDelivered,
  updateOrderToReview,
  updateOrderToCanceled
} from "../controllers/orderController";
import { protect } from "../middleware/authMiddleware";

router.route("/").post(protect, addOrderItems);
router.route("/myOrders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/deliver").put(protect, updateOrderToPayAndDelivered);
router.route("/:id/cancel").put(protect, updateOrderToCanceled);
router.route("/:id/review").put(protect, updateOrderToReview);

export default router;
