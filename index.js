const express = require('express');
const { getAllEmployee, getEmployeeById } = require('./controllers');
const app = express();
app.use(express.json());
app.get('/employees', async (req, res) => {
  const employees = await getAllEmployee();
  res.json({ employees });
});
app.get('/employees/details/:id', async (req, res) => {
  const employee = await getEmployeeById(parseInt(req.params.id));
  res.json({ employee });
});
module.exports = { app };
