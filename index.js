//consts
const weekDayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const monthsName = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const monthsNum = Array.from({ length: 12 }, (el, i) => i + 1)
console.log(monthsNum)

const calendar = document.createElement('div')
calendar.classList.add('calendar')
document.body.append(calendar)

const createCalendar = (elem, year, month) => {
  elem.append(createTable(year, month))
  fillTable(year, month)
}

//helpers
const createTable = (year, month) => {
  const table = document.createElement('table')
  const head = createTableHead()
  const body = createTableBody(year, month)
  table.append(head, ...body)
  return table
}

const createTableHead = () => {
  const headerRow = document.createElement('tr')
  weekDayShort.forEach((day) => {
    const th = document.createElement('th')
    th.textContent = day
    headerRow.append(th)
  })
  return headerRow
}

const createTableBody = (year, month) => {
  const arr = []
  const weeksNum = calcWeeksInMonth(year, month)

  for (let i = 0; i < weeksNum; i++) {
    const tr = document.createElement('tr')

    weekDayShort.forEach(() => {
      const td = document.createElement('td')
      td.classList.add('day')
      tr.append(td)
    })

    arr.push(tr)
  }

  return arr
}

const calcWeeksInMonth = (year, month) => {
  const firstDay = firstDayOfMonth(year, month)
  const lastDay = lastDayOfMonth(year, month)
  return Math.ceil((firstDay + lastDay) / 7)
}

const firstDayOfMonth = (year, month) => (new Date(year, month - 1, 1).getDay() || 7) - 1 //where did the magical -1 come from?

const lastDayOfMonth = (year, month) => new Date(year, month, 0).getDate()

const fillTable = (year, month) => {
  let day = 1
  const td = document.getElementsByClassName('day')
  const firstDay = firstDayOfMonth(year, month)
  const lastDay = lastDayOfMonth(year, month)
  Array.from(td).forEach((cell, i) => {
    if (day > lastDay) return
    if (i >= firstDay) {
      cell.textContent = day++
      cell.classList.add('filled')
    }
  })
}

//refactor all of the code below
const createInputDate = () => {
  const div = document.createElement('div')
  div.classList.add('input-date')

  const prev = document.createElement('button')
  prev.classList.add('prev', 'month-skip')
  prev.textContent = '⤆'

  const next = document.createElement('button')
  next.classList.add('next', 'month-skip')
  next.textContent = '⤇'

  const inputYear = document.createElement('input')
  inputYear.type = 'number'
  inputYear.min = 0
  inputYear.maxLength = 4
  inputYear.inputMode = 'numeric'
  inputYear.pattern = '[0-9]'
  inputYear.value = new Date().getFullYear()

  const selectMonth = document.createElement('select')
  monthsNum.forEach((m, i) => {
    const opt = document.createElement('option')
    opt.value = i
    opt.textContent = m
    selectMonth.append(opt)
  })
  // selectMonth.style.webkitOverflowScrolling = 'touch'
  selectMonth.value = new Date().getMonth()

  div.append(prev, inputYear, selectMonth, next)

  return div
}

//run App

document.body.prepend(createInputDate())
createCalendar(calendar, 2023, 7)

let monthSelected = document.querySelector('select')
let yearInputed = document.querySelector('input')
console.log(monthsName[monthSelected.value], yearInputed.value)

monthSelected.addEventListener('change', () => {
  calendar.innerHTML = ''
  createCalendar(calendar, yearInputed.value, +monthSelected.value + 1)
})

yearInputed.addEventListener('change', () => {
  calendar.innerHTML = ''
  createCalendar(calendar, yearInputed.value, +monthSelected.value + 1)
  console.log(yearInputed.value, +monthSelected.value + 1)
})
