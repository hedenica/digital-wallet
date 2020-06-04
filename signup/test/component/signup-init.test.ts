import { expect } from 'chai';
import { SignupInitParams } from '@src/types/signup';
import signupInit from '@src/controllers/signup-init';
import { SinonStub, stub, restore } from "sinon";
import signupRepo from '@src/ports/repos/signup';

let insertSignup: SinonStub;

describe("Signup initialization", () => {
  beforeEach(() => {
    insertSignup = stub(signupRepo, "insert").resolves();
  });

  afterEach(() => restore());

  it("return a signup token as response to signup initialization", async () => {
    const signup = await signupInit(signupParams);

    expect(signup.token).to.be.a("string").that.has.length(36);
  });

  it("return a signup with init params that was sent to the function", async () => {
    const signup = await signupInit(signupParams);

    expect(signup.initParams).to.be.deep.equal(signupParams);
  });

  it("persist signup in the database", async () => {
    const signup = await signupInit(signupParams);

    expect(insertSignup).to.have.been.calledOnce;
    expect(insertSignup).to.have.been.calledWith(signup);
  });
});

const signupParams: SignupInitParams = {
  fullname: 'Jane Doe',
  dateOfBirth: '1990-01-01',
  address: 'Av. Somestreet, 123',
};