"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signup_1 = __importDefault(require("@src/ports/repos/signup"));
exports.default = async (token) => {
    const signup = await signup_1.default.getByToken(token);
    await signup_1.default.updateStatus(signup, "COMPLETE");
};
//# sourceMappingURL=signup-complete.js.map