import cors from "cors"
import configLoader from "@medusajs/medusa/dist/loaders/config"
import { Router } from "express"
import * as bodyParser from "body-parser"
import { authenticate, authenticateCustomer } from "@medusajs/medusa"
import { MedusaError } from "@medusajs/utils"
import { z } from "zod"

export default (rootDirectory: string): Router | Router[] => {

   const config = configLoader(rootDirectory)
   const storeCorsOptions = { origin: config.projectConfig.store_cors.split(","), credentials: true, }
   const adminCorsOptions = { origin: config.projectConfig.admin_cors.split(","), credentials: true, }

   const router = Router()

   // STORE - GET ALL REVIEWS FOR A PRODUCT
   router.get("/store/products/:id/reviews", cors(storeCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })

   // STORE - GET ALL REVIEWS FOR A CUSTOMER
   router.get("/store/customers/me/reviews", cors(storeCorsOptions), authenticateCustomer(), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getCustomerProductReviews(req.user.customer_id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })
   
   // STORE - GET A SINGLE REVIEW
   router.get("/store/reviews/:id", cors(storeCorsOptions), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getReview(req.params.id).then((product_review) => {
         return res.json({product_review})
      })
   })
   
   // STORE - ADD A NEW REVIEW FOR A PRODUCT
   router.use("/store/products/:id/reviews", bodyParser.json())
   router.post("/store/products/:id/reviews", cors(storeCorsOptions), authenticateCustomer(), async (req, res) => {
      const schema = z.object({
         display_name: z.string().min(1),
         content: z.string().min(1),
         rating: z.coerce.number().min(0).max(5),
      })
      /* @ts-ignore */
      const { success, error, data } = schema.safeParse(req.body)
      if (!success) {
         throw new MedusaError(MedusaError.Types.INVALID_DATA, error)
      } else {
         const productReviewService = req.scope.resolve("productReviewService")
         productReviewService.create(req.params.id, req.user.customer_id, data.display_name, data.content, data.rating)
         .then((product_review) => {
            return res.json({product_review})
         })
      }
   })

   // STORE - UPDATE A REVIEW FOR A PRODUCT
   router.use("/store/reviews/:id", bodyParser.json())
   router.post("/store/reviews/:id", cors(storeCorsOptions), authenticateCustomer(), async (req, res) => {
      const schema = z.object({
         display_name: z.string().min(1),
         content: z.string().min(1),
         rating: z.coerce.number().min(0).max(5),
      })
      /* @ts-ignore */
      const { success, error, data } = schema.safeParse(req.body)
      if (!success) {
         throw new MedusaError(MedusaError.Types.INVALID_DATA, error)
      } else {
      }
      const productReviewService = req.scope.resolve("productReviewService")
      const productReview = await productReviewService.getProductReviews(req.params.id)
      if (productReview.customer_id !== req.user.customer_id) {
         return res.status(401).json({ message: "Unauthorized" })
      }
      productReviewService.update(req.params.id, data.display_name, data.content, data.rating)
      .then((product_review) => {
         return res.json({product_review})
      })
   })

   // ADMIN - GET ALL REVIEWS FOR A PRODUCT
   router.get("/admin/products/:id/reviews", cors(adminCorsOptions), authenticate(), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })

   // ADMIN - GET ALL REVIEWS BY A CUSTOMER
   router.get("/admin/customers/:id/reviews", cors(adminCorsOptions), authenticate(), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getCustomerProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })

   // ADMIN - EDIT A REVIEW FOR A PRODUCT
   router.use("/admin/reviews/:id", bodyParser.json())
   router.post("/admin/reviews/:id", cors(adminCorsOptions), authenticate(), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.update(req.params.id, req.body.display_name, req.body.content, req.body.rating, req.body.approved)
      .then((product_review) => {
         return res.json({product_review})
      })
   })

   // ADMIN - DELETE A REVIEW FOR A PRODUCT
   router.delete("/admin/reviews/:id", cors(adminCorsOptions), authenticate(), async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.delete(req.params.id).then(() => {
         return res.json({success: true})
      })
   })

   return router
}