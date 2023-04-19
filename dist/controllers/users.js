"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.putUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.findAll({
        where: {
            active: 1,
        },
    });
    res.json({
        msg: 'Get users',
        users,
    });
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(400).json({
            msg: `User with id ${id} does not exists`,
        });
    }
    res.json({
        msg: 'Get user',
        user,
    });
});
exports.getUser = getUser;
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExist = yield user_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (emailExist) {
            return res.status(400).json({
                msg: `User with email ${body.email} already exists`,
            });
        }
        const user = new user_1.default(body);
        yield user.save();
        res.json({ msg: 'User created', user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error',
        });
    }
});
exports.postUser = postUser;
const putUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `No user with id ${id}`,
            });
        }
        yield user.update(body);
        res.json({ msg: 'User updated', user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error',
        });
    }
});
exports.putUser = putUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findByPk(id);
    if (!user) {
        return res.status(404).json({
            msg: `No user with id ${id}`,
        });
    }
    // await user.destroy()
    yield user.update({ active: 0 });
    res.json({
        msg: 'User deleted',
        user,
    });
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=users.js.map