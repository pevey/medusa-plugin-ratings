"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReview1674838435739 = void 0;
const typeorm_1 = require("typeorm");
class ProductReview1674838435739 {
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "product_review" ("id" character varying NOT NULL, 
            "product_id" character varying NOT NULL, 
            "customer_id" character varying NOT NULL, 
            "display_name" character varying NOT NULL, 
            "rating" integer NOT NULL, 
            "content" character varying NOT NULL, 
            "approved" boolean NOT NULL,
            "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`);
        await queryRunner.createPrimaryKey("product_review", ["id"]);
        await queryRunner.createForeignKey("product_review", new typeorm_1.TableForeignKey({
            columnNames: ["product_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "product",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("product_review", true);
    }
}
exports.ProductReview1674838435739 = ProductReview1674838435739;
//# sourceMappingURL=1674838435739-ProductReview.js.map