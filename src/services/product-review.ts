import { TransactionBaseService } from '@medusajs/medusa'
import { ProductReviewRepository } from '../repositories/product-review'

export default class ProductReviewService extends TransactionBaseService {
   protected readonly productReviewRepository_: typeof ProductReviewRepository

   constructor({ productReviewRepository }) {
      super(arguments[0])
      this.productReviewRepository_ = productReviewRepository
   }
   
   async getProductReviews (product_id) {
      /* @ts-ignore */
      const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
      return await productReviewRepository.find({
         where: {
         product_id,
         approved: true
         }
      })
   }

   async getCustomerProductReviews (customer_id) {
      /* @ts-ignore */
      const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
      return await productReviewRepository.find({
         where: {
         customer_id,
         approved: true
         }
      })
   }

   async getReview (id) {
      /* @ts-ignore */
      const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
      return await productReviewRepository.findOne({
         where: {
         id
         }
      })
   }

   async create(product_id, customer_id, display_name, content, rating) {
      if (!product_id || !customer_id || !display_name || !content || !rating) {
         throw new Error("Adding product review requires product_id, customer_id, display_name, content, and rating")
      }
      /* @ts-ignore */
      const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
      const createdReview = productReviewRepository.create({
         product_id,
         customer_id,
         display_name,
         content,
         rating,
         approved: false
      })
      const productReview = await productReviewRepository.save(createdReview)
      return productReview
   }

   async update(id, display_name, content, rating, approved = false) {
      if (!id || !display_name || !content || !rating) {
         throw new Error("Updating a product review requires id, display_name, content, rating, and approved")
      }
      /* @ts-ignore */
      const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
      const productReview = productReviewRepository.update(id, {
         display_name,
         content,
         rating,
         approved
      })
      return productReview
   }

   async delete(id) {
      if (!id) {
         throw new Error("Deleting a product review requires id")
      }
      /* @ts-ignore */
      const productReviewRepository = this.activeManager_.withRepository(this.productReviewRepository_)
      const productReview = productReviewRepository.delete(id)
      return productReview
   }
}