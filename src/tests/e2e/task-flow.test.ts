// src/tests/e2e/task-flow.test.ts
import request from 'supertest';
import { app } from '../../app';

describe('Task Management E2E Flow', () => {
  let accessToken: string;
  let userId: string;

  it('should complete full task lifecycle', async () => {
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'E2E User',
        email: 'e2e@example.com',
        password: 'password123'
      })
      .expect(201);

    accessToken = registerResponse.body.tokens.accessToken;
    userId = registerResponse.body.user.id;

    expect(accessToken).toBeDefined();

    const createTaskResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Complete E2E Test',
        description: 'This is an end-to-end test',
        priority: 'HIGH'
      })
      .expect(201);

    const taskId = createTaskResponse.body.task.id;

    expect(createTaskResponse.body.task).toHaveProperty('title', 'Complete E2E Test');
    expect(createTaskResponse.body.task).toHaveProperty('status', 'TODO');
    expect(createTaskResponse.body.task).toHaveProperty('priority', 'HIGH');

    const listResponse1 = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(listResponse1.body.tasks).toHaveLength(1);
    expect(listResponse1.body.pagination.total).toBe(1);

    await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Second Task',
        priority: 'MEDIUM'
      })
      .expect(201);

    const listResponse2 = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(listResponse2.body.tasks).toHaveLength(2);
    expect(listResponse2.body.pagination.total).toBe(2);

    const updateResponse = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'IN_PROGRESS'
      })
      .expect(200);

    expect(updateResponse.body.task).toHaveProperty('status', 'IN_PROGRESS');

    const filterResponse = await request(app)
      .get('/api/tasks?status=IN_PROGRESS')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(filterResponse.body.tasks).toHaveLength(1);
    expect(filterResponse.body.tasks[0].status).toBe('IN_PROGRESS');

    await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        status: 'DONE'
      })
      .expect(200);

    await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    const finalListResponse = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);

    expect(finalListResponse.body.tasks).toHaveLength(1);
    expect(finalListResponse.body.tasks[0].id).not.toBe(taskId);
  });
});