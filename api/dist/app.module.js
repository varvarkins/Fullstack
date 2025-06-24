"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_entity_1 = require("./entities/user.entity");
const like_entity_1 = require("./entities/like.entity");
const users_controller_1 = require("./controllers/users.controller");
const likes_controller_1 = require("./controllers/likes.controller");
const users_service_1 = require("./services/users.service");
const likes_service_1 = require("./services/likes.service");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'cat-pinterest-api-pg',
                port: 5432,
                username: 'postgres',
                password: '1',
                database: 'support_lk_db',
                entities: [user_entity_1.User, like_entity_1.Like],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, like_entity_1.Like]),
        ],
        controllers: [app_controller_1.AppController, users_controller_1.UsersController, likes_controller_1.LikesController],
        providers: [app_service_1.AppService, users_service_1.UsersService, likes_service_1.LikesService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map