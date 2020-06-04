import { expect } from 'chai';
import signupComplete from '@src/controllers/signup-complete';
import { SinonStub, stub, restore } from "sinon";
import signupRepo from '@src/ports/repos/signup';
import Signup from '@src/types/signup';

let getByTokenSignup: SinonStub;
let updateStatusSignup: SinonStub;

describe("Signup complete", () => {
  beforeEach(() => {
    getByTokenSignup = stub(signupRepo, "getByToken");
    updateStatusSignup = stub(signupRepo, "updateStatus");
  });

  afterEach(() => restore());

  it("update signup status complete", async () => {
    const token = "some-token";
    getByTokenSignup.resolves(signup);

    await signupComplete(token);

    expect(updateStatusSignup).to.have.been.calledWith(signup, "COMPLETE");
  });
});

const signup: Signup = {
  token: "some-token",
  status: "IN_PROGRESS",
  initParams: {
    fullname: "Jane Doe",
    dateOfBirth: "1990-01-01",
    address: "Av. Somestreet, 123"
  },
};