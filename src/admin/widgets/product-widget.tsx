import type { 
   WidgetConfig, 
   ProductDetailsWidgetProps,
 } from "@medusajs/admin"
 
 const ProductWidget = ({
   product,
   notify,
 }: ProductDetailsWidgetProps) => {
   return (
     <div className="bg-white p-8 border border-gray-200 rounded-lg">
       <h1>Product Widget {product.title}</h1>
       <button 
         className="bg-black rounded p-1 text-white"
         onClick={() => notify.success("success", "You clicked the button!")}
       >
         Click me
       </button>
     </div>
   )
 }
 
 export const config: WidgetConfig = {
   zone: "product.details.after",
 }
 
 export default ProductWidget