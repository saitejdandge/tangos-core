"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const user_model_1 = require("../models/user.model");
const UserPresenter_1 = require("../presenters/UserPresenter");
class UserController extends BaseController_1.BaseController {
    constructor(props) {
        super(props);
    }
    attachCustomRoutes() {
        return [];
    }
    attachPresenter() {
        return new UserPresenter_1.UserPresenter(new user_model_1.UserModel());
    }
}
exports.UserController = UserController;