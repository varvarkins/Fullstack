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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const like_entity_1 = require("../entities/like.entity");
let LikesService = class LikesService {
    constructor(likesRepository) {
        this.likesRepository = likesRepository;
    }
    async createLike(catId, user) {
        const existingLike = await this.likesRepository.findOne({
            where: { cat_id: catId, userId: user.id }
        });
        if (existingLike) {
            throw new Error('Like already exists');
        }
        const like = new like_entity_1.Like();
        like.cat_id = catId;
        like.userId = user.id;
        like.user = user;
        return this.likesRepository.save(like);
    }
    async getLikesByUser(userId) {
        return this.likesRepository.find({
            where: { userId },
            order: { created_at: 'DESC' }
        });
    }
    async deleteLike(catId, userId) {
        const like = await this.likesRepository.findOne({
            where: { cat_id: catId, userId }
        });
        if (!like) {
            throw new Error('Like not found');
        }
        await this.likesRepository.remove(like);
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], LikesService);
//# sourceMappingURL=likes.service.js.map