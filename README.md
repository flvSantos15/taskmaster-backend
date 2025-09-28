# 🚀 TaskMaster Backend API

A modern, scalable task management system built with enterprise-grade architecture and best practices.

## 🎯 Overview

TaskMaster is a comprehensive task management API designed to demonstrate senior-level full-stack development skills. It showcases modern backend architecture, security best practices, and scalable design patterns that can handle enterprise-level requirements.

## 💡 Why This Application

This project serves multiple purposes:
### 🎓 Educational Demonstration
Showcases senior-level backend development skills
Demonstrates modern TypeScript/Node.js patterns
Illustrates enterprise-ready architecture decisions

### 🏗️ Architecture Showcase
Clean Architecture principles
SOLID design patterns
Separation of concerns
Scalable folder structure

### 🔒 Security Excellence
JWT authentication with refresh tokens
Input validation and sanitization
Rate limiting and security headers
Audit logging capabilities

### ⚡ Performance Focus
Efficient database queries with Prisma ORM
Optimized API responses
Caching strategies
Connection pooling ready

### 🛠️ Technologies
Core Framework
Node.js 18+ - Runtime environment
Express.js - Web application framework
TypeScript - Type safety and developer experience

Database & ORM
PostgreSQL - Primary database
Prisma - Type-safe database toolkit and ORM
Docker - Database containerization

Authentication & Security
bcryptjs - Password hashing
jsonwebtoken - JWT token management
helmet - Security headers
cors - Cross-origin resource sharing
zod - Runtime type validation

Development & Monitoring
nodemon - Development server
winston - Logging framework
morgan - HTTP request logger
jest - Testing framework
supertest - API testing

### 🏛️ Architecture & Methodology
Clean Architecture
The application follows Clean Architecture principles with clear separation of concerns:
┌─────────────────────┐
│    Controllers      │ ← HTTP Layer
├─────────────────────┤
│     Services        │ ← Business Logic
├─────────────────────┤
│    Repositories     │ ← Data Access (Prisma)
├─────────────────────┤
│     Database        │ ← PostgreSQL
└─────────────────────┘

Methodology Principles
1. Domain-Driven Design (DDD)
Business logic encapsulated in services
Clear domain boundaries
Ubiquitous language throughout codebase

2. Test-Driven Development (TDD)
Tests written before implementation
High code coverage requirements (>90%)
Comprehensive test pyramid strategy

3. SOLID Principles
Single Responsibility: Each class has one reason to change
Open/Closed: Open for extension, closed for modification
Liskov Substitution: Subtypes must be substitutable
Interface Segregation: Many specific interfaces
Dependency Inversion: Depend on abstractions

4. RESTful API Design
Resource-based URLs
HTTP methods for operations
Consistent response formats
Proper HTTP status codes

### 📁 Project Structure

backend/
├── src/
│   ├── controllers/           # HTTP request handlers
│   │   ├── auth.controller.ts
│   │   └── tasks.controller.ts
│   │
│   ├── services/              # Business logic layer
│   │   ├── auth.service.ts
│   │   └── tasks.service.ts
│   │
│   ├── middleware/            # Cross-cutting concerns
│   │   ├── auth.middleware.ts
│   │   ├── validate.middleware.ts
│   │   └── errorHandler.middleware.ts
│   │
│   ├── routes/                # API route definitions
│   │   ├── auth.routes.ts
│   │   └── tasks.routes.ts
│   │
│   ├── utils/                 # Utility functions
│   │   ├── jwt.util.ts
│   │   ├── password.util.ts
│   │   └── logger.util.ts
│   │
│   ├── types/                 # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   └── task.types.ts
│   │
│   ├── tests/                 # Test files
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   │
│   ├── app.ts                 # Express app configuration
│   └── server.ts              # Server entry point
│
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
│
├── docker-compose.yml         # Development environment
├── Dockerfile                 # Production container
└── README.md                  # This file

## 🚀 Getting Started

### Prerequisites
Node.js 18+ installed
Docker and Docker Compose
PostgreSQL (or use Docker)

### Installation
1. Clone the repository
```bash
git clone git@github.com:flvSantos15/taskmaster-backend.git
cd taskmaster-backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start database with Docker
```bash
docker compose up -d postgres
```

5. Set up database
```bash
npx prisma generate
npx prisma db push
```

6. Start development server
```bash
npm run dev
```

## 📚 API Documentation
Authentication Endpoints
Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Login
```bash
httpPOST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Get Profile
```bash
httpGET /api/auth/profile
Authorization: Bearer <access_token>
```

Task Endpoints
Get Tasks
```bash
httpGET /api/tasks?status=TODO&priority=HIGH&page=1&limit=10
Authorization: Bearer <access_token>
```

Create Task
```bash
httpPOST /api/tasks
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the task management system",
  "priority": "HIGH",
  "dueDate": "2024-12-31"
}
```

Update Task
```bash
httpPUT /api/tasks/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated title",
  "status": "IN_PROGRESS"
}
```

Delete Task
```bash
httpDELETE /api/tasks/:id
Authorization: Bearer <access_token>
```

## 🧪 Testing Strategy
The application implements a comprehensive testing pyramid with multiple levels of testing:
1. Unit Tests (70% of tests)
Purpose: Test individual functions and methods in isolation
What we test:

✅ Utility functions (JWT generation, password hashing)
✅ Service layer methods (business logic)
✅ Middleware functions (authentication, validation)
✅ Pure functions (data transformations)

Framework: Jest
Coverage target: >95% for critical business logic.
```bash
// Example: Password utility test
describe('Password Utils', () => {
  it('should hash password correctly', async () => {
    const password = 'testPassword123';
    const hash = await hashPassword(password);
    
    expect(hash).not.toBe(password);
    expect(await comparePassword(password, hash)).toBe(true);
  });
});
```

2. Integration Tests (20% of tests)
Purpose: Test component interactions and database operations
What we test:
✅ Database operations (Prisma queries)
✅ Service + Repository interactions
✅ Middleware + Controller interactions
✅ External service integrations
```bash
// Example: Auth service integration test
describe('AuthService Integration', () => {
  it('should create user and return tokens', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
    
    const result = await authService.register(userData);
    
    expect(result.user.email).toBe(userData.email);
    expect(result.tokens.accessToken).toBeDefined();
  });
});
```

3. End-to-End (E2E) Tests (10% of tests)
Purpose: Test complete user workflows through HTTP API
What we test:

✅ Complete user registration flow
✅ Authentication + protected routes
✅ CRUD operations workflows
✅ Error handling scenarios

Framework: Supertest + Jest
```bash
// Example: E2E task creation test
describe('Task Management E2E', () => {
  it('should complete full task lifecycle', async () => {
    // 1. Register user
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    
    const { accessToken } = registerResponse.body.tokens;
    
    // 2. Create task
    const taskResponse = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(testTask);
    
    expect(taskResponse.status).toBe(201);
    
    // 3. Update task status
    await request(app)
      .put(`/api/tasks/${taskResponse.body.task.id}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ status: 'DONE' });
    
    // 4. Verify task completion
    const getResponse = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${accessToken}`);
    
    expect(getResponse.body.tasks[0].status).toBe('DONE');
  });
});
```

4. Performance Tests
Purpose: Ensure API performance under load
What we test:

✅ Response times under normal load
✅ Concurrent user handling
✅ Database query performance
✅ Memory usage patterns

5. Security Tests
Purpose: Validate security measures
What we test:

✅ Authentication bypasses
✅ Input validation edge cases
✅ SQL injection attempts
✅ Rate limiting effectiveness

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests
npm run test:integration

# Run E2E tests
npm run test:e2e

# Generate coverage report
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

Test Data Management

Test Database: Separate database for testing
Fixtures: Reusable test data sets
Cleanup: Automatic cleanup between tests
Factories: Test data generation utilities

🔒 Security
Authentication & Authorization

JWT tokens with short expiration (15 minutes)
Refresh token rotation
Role-based access control (RBAC)
Password strength validation

Input Validation

Zod schema validation
SQL injection prevention
XSS protection
CSRF tokens for state-changing operations

Infrastructure Security

Helmet.js security headers
Rate limiting per IP/user
CORS configuration
Environment variable protection

Audit & Monitoring

Request/response logging
Authentication attempt tracking
Error monitoring with Sentry integration
Performance metrics collection

⚡ Performance
Database Optimization

Prisma connection pooling
Indexed queries for common searches
Pagination for large result sets
Efficient relationship loading

API Optimization

Response compression (gzip)
HTTP caching headers
Async/await best practices
Memory-efficient data processing

Monitoring

Response time tracking
Database query performance
Memory usage monitoring
Error rate tracking

🤝 Contributing
Development Workflow

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Write tests for your changes
Implement the feature
Ensure all tests pass (npm test)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

Code Standards

TypeScript for type safety
ESLint + Prettier for code formatting
Conventional commits for commit messages
Comprehensive test coverage required

Pull Request Process

All tests must pass
Code coverage must remain >90%
Code review required from maintainer
Documentation updated if needed


📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Built with modern Node.js ecosystem
Inspired by Clean Architecture principles
Following industry best practices for enterprise applications

Made with ❤️ for demonstrating senior-level backend development skills