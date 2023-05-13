"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReviewRepository = void 0;
const product_review_1 = require("../models/product-review");
const database_1 = require("@medusajs/medusa/dist/loaders/database");
exports.ProductReviewRepository = database_1.dataSource.getRepository(product_review_1.ProductReview);
//# sourceMappingURL=product-review.js.map