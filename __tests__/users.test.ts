import request from 'supertest';
import app from '../src/app';
import { createUser } from '../src/types/users.create';

const mockUser = { email: 'testing@test.com', password: 'test' };

async function registerAndLogin(
  mockUser: createUser,
  agent: request.SuperTest<request.Test>,
) {
  const res = await agent.post('/users').send(mockUser);
  return res.body;
}

describe('backend author routes', () => {
  const agent = request.agent(app);
  // it('#POST creates a new user', async () => {
  //   const res = await request(app).post('/users').send(mockUser);
  //   expect(res.status).toBe(200);
  // });

  it('#GET/#id returns a user', async () => {
    // const user = await registerAndLogin(mockUser, agent);
    const res = await agent.get('/users/18');
    expect(res.status).toBe(200);
  });
  it('#POST/users/sessions logs in a user', async () => {
    await request(app).post('/users').send(mockUser);
    const res = await agent.post('/users/sessions').send(mockUser);
    expect(res.status).toBe(200);
  });
  it.only('#DELETE/users/sessions deletes a user session (logs user out)', async () => {
    const user = await registerAndLogin(mockUser, agent);
    const logout = await agent.delete('/users/sessions');
    expect(logout.status).toBe(200);
    const res = await agent.get(`/users/${user.id}`);
    expect(res.status).toBe(401);
  });
});
