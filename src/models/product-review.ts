import { Product, Customer } from "@medusajs/medusa"
import { BaseEntity, generateEntityId } from "@medusajs/utils"
import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Max, Min } from "class-validator"

@Entity()
export class ProductReview extends BaseEntity {

  @Index()
  @Column({ type: "varchar", nullable: true })
  product_id: string

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  product: Product

  @Column({ type: "varchar", nullable: false })
  customer_id: string

  @ManyToOne(() => Customer)
  @JoinColumn({ name: "customer_id" })
  customer: Customer

  @Column({ type: "varchar", nullable: false })
  display_name: string

  @Column({ type: "int" })
  @Min(1)
  @Max(5)
  rating: number

  @Column({ nullable: false })
  content: string

  @Column({ type: "boolean", nullable: false })
  approved: boolean

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "prev")
  }
}