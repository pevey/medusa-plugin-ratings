"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductReview = void 0;
const medusa_1 = require("@medusajs/medusa");
const utils_1 = require("@medusajs/utils");
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let ProductReview = class ProductReview extends utils_1.BaseEntity {
    beforeInsert() {
        this.id = (0, utils_1.generateEntityId)(this.id, "prev");
    }
};
__decorate([
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", String)
], ProductReview.prototype, "product_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medusa_1.Product),
    (0, typeorm_1.JoinColumn)({ name: "product_id" }),
    __metadata("design:type", medusa_1.Product)
], ProductReview.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ProductReview.prototype, "customer_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => medusa_1.Product),
    (0, typeorm_1.JoinColumn)({ name: "customer_id" }),
    __metadata("design:type", medusa_1.Customer)
], ProductReview.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], ProductReview.prototype, "display_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(5),
    __metadata("design:type", Number)
], ProductReview.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], ProductReview.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", nullable: false }),
    __metadata("design:type", Boolean)
], ProductReview.prototype, "approved", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductReview.prototype, "beforeInsert", null);
ProductReview = __decorate([
    (0, typeorm_1.Entity)()
], ProductReview);
exports.ProductReview = ProductReview;
//# sourceMappingURL=product-review.js.map