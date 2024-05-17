import express from 'express'
import cors from 'cors'
const app = express()

// Моковые данные компаний и сотрудников
const companies = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  name: `Company ${index + 1}`,
}))
const employees = Array.from(
  { length: 10000 },
  (_, index) => ({
    id: index + 2,
    name: `Employee ${index + 1}`,
    companyId: Math.floor(index / 10) + 1,
  }),
)

// Создание структуры данных для быстрого доступа к сотрудникам по компаниям
const companyEmployeesMap = {}
employees.forEach(employee => {
  if (!companyEmployeesMap[employee.companyId]) {
    companyEmployeesMap[employee.companyId] = []
  }
  companyEmployeesMap[employee.companyId].push(employee)
})

app.use(cors())

// Эндпоинт для получения группы компаний
app.get('/api/companies', (req, res) => {
  const offset = parseInt(req.query.offset) || 0
  const limit = parseInt(req.query.limit) || 10
  const companiesSubset = companies.slice(offset, offset + limit)
  res.json(companiesSubset)
})

// Эндпоинт для получения сотрудников определенной компании
app.get('/api/employees', (req, res) => {
  const companyId = req.query.companyid
  const companyEmployees = companyEmployeesMap[companyId] || []
  res.json(companyEmployees)
})

const PORT = 5000
 app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
