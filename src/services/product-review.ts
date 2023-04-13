import { TransactionBaseService } from '@medusajs/utils'
import { ProductReviewRepository } from '../repositories/product-review'

export default class ProductReviewService extends TransactionBaseService {
  protected readonly productReviewRepository_: typeof ProductReviewRepository

  constructor({ productReviewRepository }) {
    super(arguments[0])
    this.productReviewRepository_ = productReviewRepository
  }
  
  async getProductReviews (product_id) {
    const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
    return await productReviewRepository.find({
      where: {
        product_id,
        approved: true
      }
    })
  }

  async getCustomerProductReviews (customer_id) {
    const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
    return await productReviewRepository.find({
      where: {
        customer_id,
        approved: true
      }
    })
  }

  async addProductReview (product_id, customer_id, display_name, content, rating) {
    if (!product_id || !customer_id || !display_name || !content || !rating) {
      throw new Error("product review requires product_id, customer_id, display_name, content, and rating")
    }
    const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
    const createdReview = productReviewRepository.create({
      product_id: product_id,
      customer_id: customer_id,
      display_name: display_name,
      content: content,
      rating: rating,
      approved: false
    })
    const productReview = await productReviewRepository.save(createdReview)
    return productReview
  }

  async editProductReview (id, display_name, content, rating, approved) {
    if (!id || !display_name || !content || !rating || !approved) {
      throw new Error("updating a product review requires id, display_name, content, rating, and approved")
    }
    const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
    const productReview = productReviewRepository.update(id, {
      display_name: display_name,
      content: content,
      rating: rating,
      approved: approved
    })
    return productReview
  }
}