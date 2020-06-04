import { expect } from 'chai';
import UserParams from '@src/types/user-params';
import createTimeLine from '@src/controllers/create-timeline';
import timelineRepo from '@src/ports/repos/timeline';
import { SinonStub, stub, restore} from 'sinon';

let insertTimeLine: SinonStub;

describe('Create timeline', () => {
  beforeEach(() => {
    insertTimeLine = stub(timelineRepo, 'insert');
  });
  
  afterEach(() => restore());

  it('persist a timeline in the database', async () => {
    const userParams: UserParams = {
      userId: 'some-user-id',
      fullname: 'Jane Doe',
    };

    await createTimeLine(userParams);

    expect(insertTimeLine).to.have.been.calledOnce;
  });

  it('return a timeline with all event inside', async () => {
    const userParams: UserParams = {
      userId: 'some-user-id',
      fullname: 'Jane Doe',
    };

    const timeline = await createTimeLine(userParams);

    expect(timeline.events).to.be.an('array').that.has.length(1);
    expect(timeline.events[0].description).to.be.equal('Welcome, Jane Doe!')
  });
});