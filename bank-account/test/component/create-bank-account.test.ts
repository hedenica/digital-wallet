import { expect } from 'chai';
import { SinonStub, stub, restore } from 'sinon';
import bankPartner from '@src/ports/bank-partner';
import userRepo from '@src/ports/repo/user';
import userBankAccountRepo from '@src/ports/repo/user-bank-account';
import createBankAccount from '@src/controllers/create-bank-account'
import User, { UserParams, UserBankAccount } from '@src/types/user';
import BankAccount from '@src/types/bank-account';
import userAccountBankNotifier from '@src/ports/notifiers/user-bank-account';

let createBankAccountPartner: SinonStub;
let insertUser: SinonStub;
let insertUserBankAccount: SinonStub;
let UserBankAccountNotification: SinonStub;

describe('Create bank account', () => {
  beforeEach(() => {
    createBankAccountPartner = stub(bankPartner, 'createAccount').resolves(givenBankAccount);
    insertUser = stub(userRepo, 'insert');
    insertUserBankAccount = stub(userBankAccountRepo, 'insert');
    UserBankAccountNotification = stub (userAccountBankNotifier, 'created');
  });
  afterEach(() => restore());

  it('call a bank partner to create a bank account', async () => {
    const userParams: UserParams = {
      fullname: 'Jane Doe'
    };

    await createBankAccount(userParams);

    expect(createBankAccountPartner).to.have.been.calledOnce;
  });

  it('persist user in the database', async () => {
    const userParams: UserParams = {
      fullname: 'Jane Doe'
    };

    await createBankAccount(userParams);

    expect(insertUser).to.have.been.calledOnce;

    const insertedUser = insertUser.getCall(0).args[0] as User;
    expect(insertedUser.id).to.be.a('string').that.has.length(36);
    expect(insertedUser.fullname).to.be.equal('Jane Doe');
  });

  it('persist user bank account in the database', async () => {
    const userParams: UserParams = {
      fullname: 'Jane Doe'
    };
    
    await createBankAccount(userParams);

    expect(insertUserBankAccount).to.have.been.calledOnce;

    const insertedUserBankAccount = insertUserBankAccount.getCall(0).args[0] as UserBankAccount;
    expect(insertedUserBankAccount.id).to.be.a('string').that.has.length(36);
    expect(insertedUserBankAccount.bankCode).to.be.equal('123');
    expect(insertedUserBankAccount.accountBranch).to.be.equal('0001');
    expect(insertedUserBankAccount.accountNumber).to.be.equal('1234567');
  });

  it('return an user bank account', async () => {
    const userParams: UserParams = {
      fullname: 'Jane Doe'
    };
    
    const UserBankAccount = await createBankAccount(userParams);

    expect(UserBankAccount.id).to.be.a('string').that.has.length(36);
    expect(UserBankAccount.bankCode).to.be.equal('123');
    expect(UserBankAccount.accountBranch).to.be.equal('0001');
    expect(UserBankAccount.accountNumber).to.be.equal('1234567');
  });

  it('send a notification when a user bank account is created', async () => {
    const userParams: UserParams = {
      fullname: 'Jane Doe'
    };
    
    await createBankAccount(userParams);

    expect(UserBankAccountNotification).to.have.been.calledOnce;
  });
});

const givenBankAccount: BankAccount = {
  bankCode: '123',
  accountBranch: '0001',
  accountNumber: '1234567',
};