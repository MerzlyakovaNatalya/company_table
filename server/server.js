import express from 'express'
import cors from 'cors'
import path from 'path'
const app = express()

// Моковые данные компаний и сотрудников
let companies = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 1,
  name: `Компания ${index + 1}`,
  address: `Адрес ${index + 1}`,
  quantity: index < 1000 ? 10 : 0,
}))
let employees = Array.from({ length: 10000 }, (_, index) => ({
  id: index + 2,
  name: `я из компании № ${Math.floor(index / 10) + 1}`,
  companyId: Math.floor(index / 10) + 1,
  surname: `Фамилия`,
  position: `Должность`,
}))

// Создание структуры данных для быстрого доступа к сотрудникам по компаниям
let companyEmployeesMap = {}
employees.forEach(employee => {
  if (!companyEmployeesMap[employee.companyId]) {
    companyEmployeesMap[employee.companyId] = []
  }
  companyEmployeesMap[employee.companyId].push(employee)
})

app.use(cors())
app.use(express.json())

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

// Эндпоинт для получения данных одной компании
app.get('/api/company/:id', (req, res) => {
  const companyId = parseInt(req.params.id)
  const company = companies.find(company => company.id === companyId)

  if (!company) {
    return res.status(404).json({ message: 'Company not found' })
  }

  company.employees = employees.filter(employee => employee.companyId === companyId)

  res.json(company)
})

// Эндпоинт для изменения имя компании
app.put('/api/companies/:id/name', (req, res) => {
  const companyId = parseInt(req.params.id)
  const newName = req.body.name

  const company = companies.find(c => c.id === companyId)

  if (company) {
    company.name = newName
    res.json(company)
  } else {
    res.status(404).json({ success: false, message: 'Компания не найдена' })
  }
})

// Эндпоинт для изменения адреса компании
app.put('/api/companies/:id/address', (req, res) => {
  const companyId = parseInt(req.params.id)
  const newAddress = req.body.address

  const company = companies.find(c => c.id === companyId)

  if (company) {
    company.address = newAddress
    res.json(company)
  } else {
    res.status(404).json({ success: false, message: 'Компания не найдена' })
  }
})

// Эндпоинт для удаления компании по id
app.delete('/api/companies/:id', (req, res) => {
  const companyId = parseInt(req.params.id)

  // Удаление компании из массива companies
  const companyIndex = companies.findIndex(company => company.id === companyId)
  if (companyIndex === -1) {
    return res.status(404).json({ message: 'Компания не найдена' })
  }
  companies.splice(companyIndex, 1)

  // Удаление сотрудников этой компании
  employees = employees.filter(employee => employee.companyId !== companyId)

  // Обновление companyEmployeesMap
  delete companyEmployeesMap[companyId]

  res.json(companyId)
})

// Эндпоинт для добавления новой компании
app.post('/api/companies', (req, res) => {
  const { name, address, quantity } = req.body

  // Генерация уникального ID для новой компании
  const newId = Date.now() + Math.floor(Math.random() * 10000)

  const newCompany = {
    id: newId,
    name,
    address,
    quantity,
  }

  // Добавление новой компании в начало массива
  companies.unshift(newCompany)

  res.status(201).json(newCompany)
})

// Эндпоинт для добавления нового сотрудника в компанию
app.post('/api/companies/:id/employees', (req, res) => {
  const companyId = parseInt(req.params.id)
  const { name, surname, position } = req.body

  // Проверка, существует ли компания
  const company = companies.find(c => c.id === companyId)
  if (!company) {
    return res.status(404).json({ message: 'Company not found' })
  } else company.quantity += 1

  const newId = Date.now() + Math.floor(Math.random() * 10000)

  const newEmployee = {
    id: newId,
    name,
    surname,
    position,
    companyId,
  }

  employees.push(newEmployee)

  // Обновление структуры данных для быстрого доступа к сотрудникам по компаниям
  if (!companyEmployeesMap[companyId]) {
    companyEmployeesMap[companyId] = []
  }
  companyEmployeesMap[companyId].push(newEmployee)

  res.status(201).json(newEmployee)
})

// Эндпоинт для изменения имя сотрудника
app.put('/api/employees/:id/name', (req, res) => {
  const employeeId = parseInt(req.params.id)
  const newName = req.body.name

  const employee = employees.find(employee => employee.id === employeeId)

  if (employee) {
    employee.name = newName
    res.json(employee)
  } else {
    res.status(404).json({ success: false, message: 'Сотрудник не найден' })
  }
})

// Эндпоинт для изменения фамилии сотрудника
app.put('/api/employees/:id/surname', (req, res) => {
  const employeeId = parseInt(req.params.id)
  const newSurname = req.body.surname

  const employee = employees.find(employee => employee.id === employeeId)

  if (employee) {
    employee.surname = newSurname
    res.json(employee)
  } else {
    res.status(404).json({ success: false, message: 'Сотрудник не найден' })
  }
})

// Эндпоинт для изменения должности сотрудника
app.put('/api/employees/:id/position', (req, res) => {
  const employeeId = parseInt(req.params.id)
  const newSurname = req.body.position

  const employee = employees.find(employee => employee.id === employeeId)

  if (employee) {
    employee.position = newSurname
    res.json(employee)
  } else {
    res.status(404).json({ success: false, message: 'Сотрудник не найден' })
  }
})

// Эндпоинт для удаления сотрудника
app.delete('/api/employees/:id', (req, res) => {
  const employeeId = parseInt(req.params.id)

  // Найти индекс сотрудника
  const employeeIndex = employees.findIndex(e => e.id === employeeId)

  if (employeeIndex !== -1) {
    // Получить компанию сотрудника
    const employee = employees[employeeIndex]
    const companyId = employee.companyId

    // Удалить сотрудника
    employees.splice(employeeIndex, 1)

    // Уменьшить количество сотрудников в компании
    const company = companies.find(c => c.id === companyId)
    if (company) {
      company.quantity -= 1
    }

    // Обновить структуру данных для быстрого доступа к сотрудникам по компаниям
    const companyEmployees = companyEmployeesMap[companyId]
    const employeeMapIndex = companyEmployees.findIndex(e => e.id === employeeId)
    if (employeeMapIndex !== -1) {
      companyEmployees.splice(employeeMapIndex, 1)
    }

    res.json(employeeId)
  } else {
    res.status(404).json({ success: false, message: 'Сотрудник не найден' })
  }
})

// Настройка статического обслуживания для файлов из папки 'dist'
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'dist')))

// Обработка всех маршрутов, направляя на главный HTML-файл
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

const PORT = 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
