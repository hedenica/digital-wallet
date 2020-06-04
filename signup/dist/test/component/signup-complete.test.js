"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const signup_complete_1 = __importDefault(require("@src/controllers/signup-complete"));
const sinon_1 = require("sinon");
const signup_1 = __importDefault(require("@src/ports/repos/signup"));
let getByTokenSignup;
let updateStatusSignup;
describe("Signup complete", () => {
    beforeEach(() => {
        getByTokenSignup = sinon_1.stub(signup_1.default, "getByToken");
        updateStatusSignup = sinon_1.stub(signup_1.default, "updateStatus");
    });
    afterEach(() => sinon_1.restore());
    it("update signup status complete", async () => {
        const token = "some-token";
        getByTokenSignup.resolves(signup);
        await signup_complete_1.default(token);
        chai_1.expect(updateStatusSignup).to.have.been.calledWith(signup, "COMPLETE");
    });
});
const signup = {
    token: "some-token",
    status: "IN_PROGRESS",
    initParams: {
        fullname: "Jane Doe",
        dateOfBirth: "1990-01-01",
        address: "Av. Somestreet, 123"
    },
};
//# sourceMappingURL=signup-complete.test.js.map