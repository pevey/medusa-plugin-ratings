import { Router } from "express"
import { getConfigFile } from "medusa-core-utils"
import cors from "cors"
import bodyParser from "body-parser"

export default (rootDirectory) => {
   const { configModule } = getConfigFile(rootDirectory, "medusa-config")
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

   router.get("/store/products/:id/reviews", cors(storeCorsOptions), (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({
            product_reviews
         })
      })
   })

   router.get("/store/customers/:id/reviews", cors(storeCorsOptions), (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getCustomerProductReviews(req.params.id).then((product_reviews) => {
         return res.json({
            product_reviews
         })
      })
   })

   router.use(bodyParser.json())
   router.options("/store/products/:id/reviews", cors(storeCorsOptions))
   router.post("/store/products/:id/reviews", cors(storeCorsOptions), (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.addProductReview(req.params.id, req.body.customer_id, req.body.display_name, req.body.content, req.body.rating).then((product_review) => {
         return res.json({
            product_review
         })
      })
   })

   router.options("/admin/products/:id/reviews", cors(adminCorsOptions))
   router.get("/admin/products/:id/reviews", cors(adminCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({
            product_reviews
         })
      })
   })

   return router
}