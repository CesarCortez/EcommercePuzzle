import { Router } from 'express';
import {
    getAllProducts,
    getProductsById
} from '../controllers/productController';

const router = Router();

// Get all products
router.get('/', getAllProducts);

router.route("/:id").get(getProductsById);


export default router;