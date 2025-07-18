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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../entities/user.entity");
const crypto = require("crypto");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(login, password) {
        const existingUser = await this.usersRepository.findOne({ where: { login } });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const user = new user_entity_1.User();
        user.login = login;
        user.password = password;
        const secretSalt = 'cat_pinterest_secret_salt_2024';
        const token = crypto.createHash('sha256').update(`${user.id}${secretSalt}`).digest('hex');
        user.authToken = token;
        const savedUser = await this.usersRepository.save(user);
        const finalToken = crypto.createHash('sha256').update(`${savedUser.id}${secretSalt}`).digest('hex');
        savedUser.authToken = finalToken;
        await this.usersRepository.save(savedUser);
        return { user: savedUser, token: finalToken };
    }
    async findByToken(token) {
        return this.usersRepository.findOne({ where: { authToken: token } });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map