import request from 'supertest';
import app from '../src/app';
// import { createUser } from '../src/types/users.create';

// const mockUser = { email: 'testing17@test.com', password: 'test' };

// async function registerAndLogin(
//   mockUser: createUser,
//   agent: request.SuperTest<request.Test>,
// ) {
//   const res = await agent.post('/users').send(mockUser);
//   return res.body;
// }

describe('backend author routes', () => {
  const agent = request.agent(app);
  // it('#POST creates a new user', async () => {
  //   const res = await request(app).post('/users').send(mockUser);
  //   expect(res.status).toBe(200);
  // });

  it('#GET/#id returns a user', async () => {
    // const user = await registerAndLogin(mockUser, agent);
    // console.log('user', user.id);
    const res = await agent.get('/users/18');
    // console.log('res', res);
    console.log('res.body', res.body);
    expect(res.status).toBe(200);
  });
});
