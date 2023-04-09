import { ProductReview } from "../models/product-review"
import { dataSource } from '@medusajs/medusa/dist/loaders/database'

const ProductReviewRepository = dataSource.getRepository(ProductReview)
export default ProductReviewRepository