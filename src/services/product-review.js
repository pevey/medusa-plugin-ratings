import { BaseService } from "medusa-interfaces"

class ProductReviewService extends BaseService {
  constructor({ productReviewRepository, manager }) {
    super()
    this.productReviewRepository = productReviewRepository
    this.manager = manager
  }
  
  async getProductReviews (product_id) {
    const productReviewRepository = this.manager.withRepository(this.productReviewRepository)
    return await productReviewRepository.find({
      where: {
        product_id,
        approved: true
      }
    })
  }

  async getCustomerProductReviews (customer_id) {
    const productReviewRepository = this.manager.withRepository(this.productReviewRepository)
    return await productReviewRepository.find({
      where: {
        customer_id,
        approved: true
      }
    })
  }

  async addProductReview (product_id, customer_id, display_name, content, rating) {
    if (!product_id || !customer_id || !display_name || !content || !rating) {
      throw new Error("product review requires title, user_name, content, and rating")
    }

    const productReviewRepository = this.manager.withRepository(this.productReviewRepository)
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
}

export default ProductReviewService