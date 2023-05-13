import { MigrationInterface, QueryRunner, TableForeignKey } from "typeorm"

export class ProductReview1674838435739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE IF NOT EXISTS "product_review" ("id" character varying NOT NULL, 
            "product_id" character varying NOT NULL, 
            "customer_id" character varying NOT NULL, 
            "display_name" character varying NOT NULL, 
            "rating" integer NOT NULL, 
            "content" character varying NOT NULL, 
            "approved" boolean NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`
        )
        await queryRunner.createPrimaryKey("product_review", ["id"])
        await queryRunner.createForeignKey("product_review", new TableForeignKey({
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "product",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("product_review", true)
    }

}
