"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuidv4_1 = require("uuidv4");
const signup_1 = __importDefault(require("@src/ports/repos/signup"));
exports.default = async (signupInitParams) => {
    const signup = {
        token: uuidv4_1.uuid(),
        initParams: signupInitParams,
        status: "IN_PROGRESS",
    };
    await signup_1.default.insert(signup);
    return signup;
};
//# sourceMappingURL=signup-init.js.map