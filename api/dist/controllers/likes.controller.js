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
exports.LikesController = void 0;
const common_1 = require("@nestjs/common");
const likes_service_1 = require("../services/likes.service");
const users_service_1 = require("../services/users.service");
class CreateLikeDto {
}
let LikesController = class LikesController {
    constructor(likesService, usersService) {
        this.likesService = likesService;
        this.usersService = usersService;
    }
    async getLikes(authHeader, res) {
        try {
            const token = authHeader?.replace('Bearer ', '');
            if (!token) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
            }
            const user = await this.usersService.findByToken(token);
            if (!user) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            const likes = await this.likesService.getLikesByUser(user.id);
            res.json({ data: likes });
        }
        catch (error) {
            res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
    async createLike(authHeader, createLikeDto, res) {
        try {
            const token = authHeader?.replace('Bearer ', '');
            if (!token) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
            }
            const user = await this.usersService.findByToken(token);
            if (!user) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            const like = await this.likesService.createLike(createLikeDto.cat_id, user);
            res.status(common_1.HttpStatus.CREATED).json(like);
        }
        catch (error) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: error.message });
        }
    }
    async deleteLike(authHeader, catId, res) {
        try {
            const token = authHeader?.replace('Bearer ', '');
            if (!token) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'No token provided' });
            }
            const user = await this.usersService.findByToken(token);
            if (!user) {
                return res.status(common_1.HttpStatus.UNAUTHORIZED).json({ message: 'Invalid token' });
            }
            await this.likesService.deleteLike(catId, user.id);
            res.status(common_1.HttpStatus.OK).json({ message: 'Like deleted successfully' });
        }
        catch (error) {
            if (error.message === 'Like not found') {
                res.status(common_1.HttpStatus.NOT_FOUND).json({ message: error.message });
            }
            else {
                res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
            }
        }
    }
};
exports.LikesController = LikesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "getLikes", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CreateLikeDto, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "createLike", null);
__decorate([
    (0, common_1.Delete)(':cat_id'),
    __param(0, (0, common_1.Headers)('authorization')),
    __param(1, (0, common_1.Param)('cat_id')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], LikesController.prototype, "deleteLike", null);
exports.LikesController = LikesController = __decorate([
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [likes_service_1.LikesService,
        users_service_1.UsersService])
], LikesController);
//# sourceMappingURL=likes.controller.js.map