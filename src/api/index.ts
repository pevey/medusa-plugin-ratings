import { Router } from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"
import { getConfigFile } from "medusa-core-utils"
import { ConfigModule } from "@medusajs/medusa"

export default (rootDirectory: string): Router | Router[] => {
   const { configModule } = getConfigFile<ConfigModule>(rootDirectory, "medusa-config")
   const { projectConfig } = configModule

   const storeCorsOptions = {
      origin: projectConfig.store_cors.split(","),
      credentials: true,
   }

   const adminCorsOptions = {
      origin: projectConfig.admin_cors.split(","),
      credentials: true,
   }

   const router = Router()

   // REVIEWS - GET ALL REVIEWS FOR A PRODUCT
   router.get("/store/products/:id/reviews", cors(storeCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })

   // REVIEWS - GET ALL REVIEWS FOR A CUSTOMER
   router.get("/store/customers/:id/reviews", cors(storeCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getCustomerProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })
   
   // REVIEWS - ADD A NEW REVIEW FOR A PRODUCT
   router.use(bodyParser.json())
   router.post("/store/products/:id/reviews", cors(storeCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.addProductReview(req.params.id, req.body.customer_id, req.body.display_name, req.body.content, req.body.rating)
      .then((product_review) => {
         return res.json({product_review})
      })
   })

   // REVIEWS - GET A SINGLE REVIEW
   router.get("/store/reviews/:id", cors(storeCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getReview(req.params.id).then((product_review) => {
         return res.json({product_review})
      })
   })

   // REVIEWS - UPDATE A REVIEW FOR A PRODUCT
   router.use(bodyParser.json())
   router.post("/store/reviews/:id", cors(storeCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      const productReview = await productReviewService.getProductReviews(req.params.id)
      if (productReview.customer_id !== req.body.userId) {
         return res.status(401).json({ message: "Unauthorized" })
      }
      productReviewService.updateProductReview(req.params.id, req.body.display_name, req.body.content, req.body.rating)
      .then((product_review) => {
         return res.json({product_review})
      })
   })

   // REVIEWS - ADMIN GET ALL REVIEWS FOR A PRODUCT
   router.get("/admin/products/:id/reviews", cors(adminCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })

   // REVIEWS - ADMIN EDIT A REVIEW FOR A PRODUCT
   router.use(bodyParser.json())
   router.post("/admin/reviews/:id", cors(adminCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.editProductReview(req.params.id, req.body.display_name, req.body.content, req.body.rating, req.body.approved)
      .then((product_review) => {
         return res.json({product_review})
      })
   })

   return router
}