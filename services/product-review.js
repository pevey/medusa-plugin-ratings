"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/utils");
class ProductReviewService extends utils_1.TransactionBaseService {
    constructor({ productReviewRepository }) {
        super(arguments[0]);
        this.productReviewRepository_ = productReviewRepository;
    }
    async getProductReviews(product_id) {
        /* @ts-ignore */
        const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
        return await productReviewRepository.find({
            where: {
                product_id,
                approved: true
            }
        });
    }
    async getCustomerProductReviews(customer_id) {
        /* @ts-ignore */
        const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
        return await productReviewRepository.find({
            where: {
                customer_id,
                approved: true
            }
        });
    }
    async getReview(id) {
        /* @ts-ignore */
        const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
        return await productReviewRepository.findOne({
            where: {
                id
            }
        });
    }
    async addProductReview(product_id, customer_id, display_name, content, rating) {
        if (!product_id || !customer_id || !display_name || !content || !rating) {
            throw new Error("adding product review requires product_id, customer_id, display_name, content, and rating");
        }
        /* @ts-ignore */
        const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
        const createdReview = productReviewRepository.create({
            product_id,
            customer_id,
            display_name,
            content,
            rating,
            approved: false
        });
        const productReview = await productReviewRepository.save(createdReview);
        return productReview;
    }
    async updateProductReview(id, display_name, content, rating) {
        if (!id || !display_name || !content || !rating) {
            throw new Error("updating a product review requires id, display_name, content, rating, and approved");
        }
        /* @ts-ignore */
        const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
        const productReview = productReviewRepository.update(id, {
            display_name,
            content,
            rating
        });
        return productReview;
    }
    async editProductReview(id, display_name, content, rating, approved) {
        if (!id || !display_name || !content || !rating || !approved) {
            throw new Error("updating a product review requires id, display_name, content, rating, and approved");
        }
        /* @ts-ignore */
        const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_);
        const productReview = productReviewRepository.update(id, {
            display_name,
            content,
            rating,
            approved
        });
        return productReview;
    }
}
exports.default = ProductReviewService;
//# sourceMappingURL=product-review.js.map