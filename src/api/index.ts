import { Router } from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"
import { getConfigFile } from "medusa-core-utils"
import { ConfigModule, User, UserService, Customer, CustomerService } from "@medusajs/medusa"
import authenticate from "@medusajs/medusa/dist/api/middlewares/authenticate"

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
	router.use("/store/", cors(storeCorsOptions))
	router.use("/admin/", cors(adminCorsOptions))

   // REVIEWS - GET ALL REVIEWS FOR A PRODUCT
   router.get("/store/products/:id/reviews", async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })

   // REVIEWS - GET ALL REVIEWS FOR A CUSTOMER
	router.use("/store/customers/:id/reviews", authenticate(), getCustomer)
   router.get("/store/customers/:id/reviews", async (req, res) => {

      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getCustomerProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })
   
   // REVIEWS - ADD A NEW REVIEW FOR A PRODUCT
   router.use("/store/products/:id/reviews", authenticate(), getCustomer, bodyParser.json())
   router.post("/store/products/:id/reviews", cors(storeCorsOptions), async (req, res) => {

      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.addProductReview(req.params.id, req.body.customer_id, req.body.display_name, req.body.content, req.body.rating)
      .then((product_review) => {
         return res.json({product_review})
      })
   })

   // REVIEWS - GET A SINGLE REVIEW
   router.get("/store/reviews/:id", async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getReview(req.params.id).then((product_review) => {
         return res.json({product_review})
      })
   })

   // REVIEWS - UPDATE A REVIEW FOR A PRODUCT
   router.use("/store/reviews/:id", authenticate(), getCustomer, bodyParser.json())
   router.post("/store/reviews/:id", async (req, res) => {

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
   router.get("/admin/products/:id/reviews", async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.getProductReviews(req.params.id).then((product_reviews) => {
         return res.json({product_reviews})
      })
   })

   // REVIEWS - ADMIN EDIT A REVIEW FOR A PRODUCT
   router.use("/admin/reviews/:id", bodyParser.json(), authenticate(), getUser)
   router.post("/admin/reviews/:id", async (req, res) => {
      const productReviewService = req.scope.resolve("productReviewService")
      productReviewService.editProductReview(req.params.id, req.body.display_name, req.body.content, req.body.rating, req.body.approved)
      .then((product_review) => {
         return res.json({product_review})
      })
   })

   return router
}

async function getCustomer(req, res, next) {
	let loggedInCustomer: Customer | null = null
	if (req.customer && req.customer.customerId) {
		const customerService = req.scope.resolve("customerService") as CustomerService
		loggedInCustomer = await customerService.retrieve(req.customer.customerId)
	}
	req.scope.register({ loggedInCustomer: { resolve: () => loggedInCustomer }})
	next()
}

async function getUser(req, res, next) {
	let loggedInUser: User | null = null
	if (req.user && req.user.userId) {
		const userService = req.scope.resolve("userService") as UserService
		loggedInUser = await userService.retrieve(req.user.userId)
	}
	req.scope.register({ loggedInUser: { resolve: () => loggedInUser }})
	next()
}