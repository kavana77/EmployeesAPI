const request = require('supertest');
let { app } = require('../index.js');
let { getAllEmployee, getEmployeeById } = require('../controllers/index.js');
const http = require('http');
jest.mock('../controllers/index.js', () => ({
  ...jest.requireActual('../controllers/index.js'),
  getAllEmployee: jest.fn(),
  getEmployeeById: jest.fn(),
}));

describe('Controller Function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all employees', () => {
    const mockedEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];
    getAllEmployee.mockReturnValue(mockedEmployees);
    const result = getAllEmployee();
    expect(result).toEqual(mockedEmployees);
    expect(result.length).toBe(3);
  });
});

describe('API Endpoints tests', () => {
  it('GET API /employees should get all employees', async () => {
    const mockedEmployees = [
      {
        employeeId: 1,
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        departmentId: 1,
        roleId: 1,
      },
      {
        employeeId: 2,
        name: 'Priya Singh',
        email: 'priya.singh@example.com',
        departmentId: 2,
        roleId: 2,
      },
      {
        employeeId: 3,
        name: 'Ankit Verma',
        email: 'ankit.verma@example.com',
        departmentId: 1,
        roleId: 3,
      },
    ];

    getAllEmployee.mockResolvedValue(mockedEmployees);

    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employees: mockedEmployees,
    });
    expect(res.body.employees.length).toBe(3);
  });

  it('GET /employees/details/:id should get an employee by ID', async () => {
    const mockedEmployee = {
      employeeId: 1,
      name: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      departmentId: 1,
      roleId: 1,
    };

    // Mock the response of getEmployeeById for this test
    getEmployeeById.mockResolvedValue(mockedEmployee);

    const res = await request(app).get('/employees/details/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      employee: mockedEmployee,
    });
  });
});
