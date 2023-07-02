import type { WidgetConfig, ProductDetailsWidgetProps } from "@medusajs/admin"
import { useState } from "react"
import { useAdminCustomQuery } from "medusa-react"
import ReviewTable from "../../components/tables/reviews"

const ProductWidget = ({ product }: ProductDetailsWidgetProps) => {

   const { data, isLoading } = useAdminCustomQuery (
      `/products/${product.id}/reviews`, 
      ["reviews", product.id]
   )   
   const approved_reviews:any = data?.product_reviews?.filter((review) => review.approved === true)
   const average:number|string = approved_reviews?.reduce((acc, curr) => acc + curr.rating, 0) / approved_reviews?.length
   const pending_reviews:any = data?.product_reviews?.filter((review) => review.approved === false)

   const [isApproved, toggleTab] = useState(false)
   const reviews = isApproved? approved_reviews : pending_reviews

   const activeTabClass = "pt-3 pr-3"
   const inactiveTabClass = "pt-3 pr-3 text-gray-400 cursor-pointer"

   const HeaderTabs = ({ isApproved, toggleTab }) => {
      if (isApproved) {
         return (
            <div className="flex mb-4">
               <div className={inactiveTabClass} onClick={() => toggleTab(false)}>Pending ({pending_reviews?.length})</div>
               <div className={activeTabClass}>Approved ({approved_reviews?.length})</div> 
            </div>
         )
      } else {
         return (
            <div className="flex mb-4">
               <div className={activeTabClass}>Pending ({pending_reviews?.length})</div>
               <div className={inactiveTabClass} onClick={() => toggleTab(true)}>Approved ({approved_reviews?.length})</div>
            </div>
         )
      }
   }

   if (isLoading) return (<div>Loading...</div>)

   return (
      <div className="bg-white p-8 border border-gray-200 rounded-lg">
         <h1 className="text-2xl font-bold mb-4">Ratings</h1>
         {(isLoading) && <div>Loading...</div>}
         {(!isLoading && data?.product_reviews?.length === 0) && <div>No reviews yet</div>}
         {(!isLoading && data?.product_reviews?.length > 0) && 
            <div>
               <div className="font-bold">Average: <span className="text-lg">{average}</span></div>
               <HeaderTabs isApproved={isApproved} toggleTab={toggleTab} />
               {reviews?.length === 0 && <div className="text-gray-400">No {isApproved? 'approved' : 'pending'} reviews</div>}
               {reviews?.length > 0 && <ReviewTable reviews={reviews} isApproved={isApproved}/>}
            </div>
         }
      </div>
   )
}
 
export const config: WidgetConfig = {
   zone: "product.details.after"
}
 
export default ProductWidget
