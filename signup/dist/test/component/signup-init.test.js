"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const signup_init_1 = __importDefault(require("@src/controllers/signup-init"));
const sinon_1 = require("sinon");
const signup_1 = __importDefault(require("@src/ports/repos/signup"));
let insertSignup;
describe("Signup initialization", () => {
    beforeEach(() => {
        insertSignup = sinon_1.stub(signup_1.default, "insert").resolves();
    });
    afterEach(() => sinon_1.restore());
    it("return a signup token as response to signup initialization", async () => {
        const signup = await signup_init_1.default(signupParams);
        chai_1.expect(signup.token).to.be.a("string").that.has.length(36);
    });
    it("return a signup with init params that was sent to the function", async () => {
        const signup = await signup_init_1.default(signupParams);
        chai_1.expect(signup.initParams).to.be.deep.equal(signupParams);
    });
    it("persist signup in the database", async () => {
        const signup = await signup_init_1.default(signupParams);
        chai_1.expect(insertSignup).to.have.been.calledOnce;
        chai_1.expect(insertSignup).to.have.been.calledWith(signup);
    });
});
const signupParams = {
    fullname: 'Jane Doe',
    dateOfBirth: '1990-01-01',
    address: 'Av. Somestreet, 123',
};
//# sourceMappingURL=signup-init.test.js.map