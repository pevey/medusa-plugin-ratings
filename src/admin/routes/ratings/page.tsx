import { RouteConfig } from "@medusajs/admin"
import Star from "../../icons/star"

const RatingsPage = () => {
  return (
    <div>
      This is my custom route
    </div>
  )
}

export const config: RouteConfig = {
  link: {
    label: "Ratings",
    icon: Star,
  },
}

export default RatingsPage