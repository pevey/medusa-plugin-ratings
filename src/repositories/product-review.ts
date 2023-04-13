import { ProductReview } from "../models/product-review"
import { dataSource } from '@medusajs/medusa/dist/loaders/database'

export const ProductReviewRepository = dataSource.getRepository(ProductReview)