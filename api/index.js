"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = __importStar(require("body-parser"));
//import { User, UserService, Customer, CustomerService } from "@medusajs/medusa"
//import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate"
const medusa_core_utils_1 = require("medusa-core-utils");
const zod_1 = require("zod");
exports.default = () => {
    const router = (0, express_1.Router)();
    // REVIEWS - GET ALL REVIEWS FOR A PRODUCT
    //router.use("/store/products/:id/reviews", authenticate(), getCustomer)
    router.get("/store/products/:id/reviews", async (req, res) => {
        // console.log('get reviews')
        // console.log(req.customer)
        const productReviewService = req.scope.resolve("productReviewService");
        productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
            return res.json({ product_reviews });
        });
    });
    // REVIEWS - GET ALL REVIEWS FOR A CUSTOMER
    // router.use("/store/customers/:id/reviews", authenticate(), getCustomer)
    router.get("/store/customers/:id/reviews", async (req, res) => {
        const productReviewService = req.scope.resolve("productReviewService");
        productReviewService.getCustomerProductReviews(req.params.id).then((product_reviews) => {
            return res.json({ product_reviews });
        });
    });
    // REVIEWS - ADD A NEW REVIEW FOR A PRODUCT
    //router.use("/store/products/:id/reviews", authenticate(), getCustomer, bodyParser.json())
    router.use("/store/products/:id/reviews", bodyParser.json());
    router.post("/store/products/:id/reviews", async (req, res) => {
        const productReviewService = req.scope.resolve("productReviewService");
        const schema = zod_1.z.object({
            customer_id: zod_1.z.string().min(1),
            display_name: zod_1.z.string().min(1),
            content: zod_1.z.string().min(1),
            rating: zod_1.z.coerce.number().min(0).max(5),
        });
        /* @ts-ignore */
        const { success, error, data } = schema.safeParse(req.body);
        if (!success) {
            throw new medusa_core_utils_1.MedusaError(medusa_core_utils_1.MedusaError.Types.INVALID_DATA, error);
        }
        else {
            productReviewService.addProductReview(req.params.id, data.customer_id, data.display_name, data.content, data.rating)
                .then((product_review) => {
                return res.json({ product_review });
            });
        }
    });
    // REVIEWS - GET A SINGLE REVIEW
    // router.get("/store/reviews/:id", async (req, res) => {
    //    const productReviewService = req.scope.resolve("productReviewService")
    //    productReviewService.getReview(req.params.id).then((product_review) => {
    //       return res.json({product_review})
    //    })
    // })
    // REVIEWS - UPDATE A REVIEW FOR A PRODUCT
    //router.use("/store/reviews/:id", authenticate(), getCustomer, bodyParser.json())
    // router.post("/store/reviews/:id", async (req, res) => {
    //    const productReviewService = req.scope.resolve("productReviewService")
    //    const productReview = await productReviewService.getProductReviews(req.params.id)
    //    if (productReview.customer_id !== req.body.userId) {
    //       return res.status(401).json({ message: "Unauthorized" })
    //    }
    //    productReviewService.updateProductReview(req.params.id, req.body.display_name, req.body.content, req.body.rating)
    //    .then((product_review) => {
    //       return res.json({product_review})
    //    })
    // })
    // REVIEWS - ADMIN GET ALL REVIEWS FOR A PRODUCT
    // router.get("/admin/products/:id/reviews", async (req, res) => {
    //    const productReviewService = req.scope.resolve("productReviewService")
    //    productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
    //       return res.json({product_reviews})
    //    })
    // })
    // REVIEWS - ADMIN EDIT A REVIEW FOR A PRODUCT
    //router.use("/admin/reviews/:id", bodyParser.json(), authenticate(), getUser)
    // router.post("/admin/reviews/:id", async (req, res) => {
    //    const productReviewService = req.scope.resolve("productReviewService")
    //    productReviewService.editProductReview(req.params.id, req.body.display_name, req.body.content, req.body.rating, req.body.approved)
    //    .then((product_review) => {
    //       return res.json({product_review})
    //    })
    // })
    return router;
};
// async function getCustomer(req, res, next) {
// console.log('getCustomer')
// 	let loggedInCustomer: Customer | null = null
// 	if (req.customer && req.customer.customerId) {
// console.log(req.customer.customerId)
// 		const customerService = req.scope.resolve("customerService") as CustomerService
// 		loggedInCustomer = await customerService.retrieve(req.customer.customerId)
// 	}
// 	req.scope.register({ loggedInCustomer: { resolve: () => loggedInCustomer }})
// 	next()
// }
// async function getUser(req, res, next) {
// 	let loggedInUser: User | null = null
// 	if (req.user && req.user.userId) {
// 		const userService = req.scope.resolve("userService") as UserService
// 		loggedInUser = await userService.retrieve(req.user.userId)
// 	}
// 	req.scope.register({ loggedInUser: { resolve: () => loggedInUser }})
// 	next()
// }
//# sourceMappingURL=index.js.map