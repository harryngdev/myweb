const NUMBER_OF_DBS = 1;
const ROW = 5;
const COL = 5;
const MAX = 4
const MIN = 2
const CELL_WIDTH = 5

var point = 1
var dashboards = createDbs()

var cellDots = document.getElementsByClassName("cell");

function createDbs() {
  let dashboards = []
  for (let dI = 0; dI < NUMBER_OF_DBS; dI++) {
    dashboards[dI] = []
    for (let row = 0; row < ROW; row++) {
      dashboards[dI][row] = []
      for (let col = 0; col < COL; col++) {
        let cell = Math.random() < 0.33 ? Math.floor(Math.random() * (1 + MAX - MIN)) + MIN : null
        dashboards[dI][row][col] = cell
      }
    }
  }
  return dashboards
}

function drawCell(dotIndex, value) {
  cellDots[dotIndex].innerHTML = value

  cellDots[dotIndex].className = "cell"

  cellDots[dotIndex].classList.add("value-" + value);

  if (isPointCell(value)) {
    cellDots[dotIndex].classList.add("point");
  }
  if (isMainPointCell(value)) {
    cellDots[dotIndex].classList.add("main-point");
  }
}

function draw(dB) {
  let highest = localStorage.getItem('highest')
  localStorage.setItem('highest', highest > point ? highest : point)
  document.getElementById("point").innerHTML = point;
  document.getElementById("highest").innerHTML = highest;

  let gameOver = true
  for (let row = 0; row < ROW; row++) {
    for (let col = 0; col < COL; col++) {
      drawCell(row * 5 + col, dB[row][col])
      if (!dB[row][col]) {
        gameOver = false
      }
    }
  }
  if (gameOver) {
    document.getElementById('warning-full').classList.add("show")
    return
  }
}

function printDB(dB) {
  console.log('|------DB------| Point: ', point)
  let gameOver = true
  for (let row = 0; row < ROW; row++) {
    process.stdout.write(' ');
    for (let col = 0; col < COL; col++) {
      let printBox = '.' + Array(CELL_WIDTH - 1).join(" ")
      let cell = myDB[row][col]

      if (cell) {
        gameOver = false
        printBox = cell + Array(CELL_WIDTH - String(cell).length).join(" ")
      }
      process.stdout.write(printBox);
    }
    console.log('\n')
  }
  if (gameOver) {
    console.error('Game Over')
  }
}

function getCol(matrix, col) {
  var column = [];
  for (var i = 0; i < matrix.length; i++) {
    column.push(matrix[i][col]);
  }
  return column;
}

function isPointCell(cell) {
  return cell && typeof (cell) === 'string' && cell[0] === '+'
}

function isMainPointCell(cell) {
  return isPointCell(cell) && parseInt(cell) === point
}

function removeNull(array) {
  let filtered = array.filter(function (el) {
    return el != null;
  });

  return filtered
}

function checkSequence(array) {
  array.sort();
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] + 1 != array[i + 1]) {
      return false
    }
  }
  return true
}

function moveNumber(array) {
  let arrayValid = removeNull(array)

  if (arrayValid.length >= 3) {
    for (let i = 0; i < arrayValid.length - 2; i++) {
      let isTripple = arrayValid[i] === arrayValid[i + 1] & arrayValid[i] === arrayValid[i + 2]
      let isSequence = checkSequence([arrayValid[i], arrayValid[i + 1], arrayValid[i + 2]]) && 
          arrayValid[i] + arrayValid[i + 1] + arrayValid[i + 2] === 9
      if (isTripple || isSequence) {
        arrayValid[i] = '+'
        arrayValid[i + 1] = null
        arrayValid[i + 2] = null
      }
    }
  }

  return removeNull(arrayValid)
}

function movePoint(arrayValid) {
  let i = 0

  while (i < arrayValid.length) {
    let sumPoint = 0
    let mergePointIndex = i;
    if (isPointCell(arrayValid[i])) {
      while (i < arrayValid.length && isPointCell(arrayValid[i])) {
        sumPoint += parseInt(arrayValid[i]) || 1
        arrayValid[i] = null
        i++
      }
      point = sumPoint > point ? sumPoint : point
      arrayValid[mergePointIndex] = '+' + sumPoint
    }
    i++
  }

  return removeNull(arrayValid)
}

function moveArray(array) {
  let arrayValid = removeNull(array)
  arrayValid = moveNumber(arrayValid)

  arrayValid = movePoint(arrayValid)

  return arrayValid
}

function genNewNumber(dB) {
  let n234 = Math.floor(Math.random() * (1 + MAX - MIN)) + MIN

  let add234_1 = true
  let add234_2 = Math.random() < 0.5 ? true : false
  let add1 = Math.random() < 0.15 && point > 15 ? true : false
  let add5 = Math.random() < 0.15 && point > 30 ? true : false

  // 100%
  let i = 0
  while (add234_1 && i < 50) {
    i++
    let col = Math.floor(Math.random() * COL)
    let row = Math.floor(Math.random() * ROW)

    if (dB[row][col] === null) {
      dB[row][col] = n234
      add234_1 = null
    }
  }
  // 50%
  i = 0;
  while (add234_2 && i < 50) {
    i++
    let col = Math.floor(Math.random() * COL)
    let row = Math.floor(Math.random() * ROW)

    if (dB[row][col] === null) {
      dB[row][col] = n234
      add234_2 = null
    }
  }

  // 33%
  i = 0;
  while (add1 && i < 50) {
    i++
    let col = Math.floor(Math.random() * COL)
    let row = Math.floor(Math.random() * ROW)

    if (dB[row][col] === null) {
      dB[row][col] = 1
      add1 = null
    }
  }
  // 33%
  i = 0;
  while (add5 && i < 50) {
    i++
    let col = Math.floor(Math.random() * COL)
    let row = Math.floor(Math.random() * ROW)

    if (dB[row][col] === null) {
      dB[row][col] = 5
      add5 = null
    }
  }

  return dB

}

function moveDBLeft(dB) {
  for (let i_row = 0; i_row < ROW; i_row++) {
    let rowMoved = moveArray(dB[i_row])
    for (let i_col = 0; i_col < COL; i_col++) {
      dB[i_row][i_col] = rowMoved[i_col] || null
    }
  }
  console.log('huhu')
  draw(dB)
  dB = genNewNumber(dB)
  draw(dB)
}

function moveDBRight(dB) {
  for (let i_row = 0; i_row < ROW; i_row++) {
    let rowMovedReverse = moveArray(dB[i_row].reverse())
    for (let i_col = 0; i_col < COL; i_col++) {
      dB[i_row][COL - 1 - i_col] = rowMovedReverse[i_col] || null
    }
  }
  draw(dB)
  dB = genNewNumber(dB)
  draw(dB)
}

function moveDBUp(dB) {
  for (let i_col = 0; i_col < COL; i_col++) {
    let col = getCol(dB, i_col)
    let colMoved = moveArray(col)
    for (let i_row = 0; i_row < ROW; i_row++) {
      dB[i_row][i_col] = colMoved[i_row] || null
    }
  }
  draw(dB)
  dB = genNewNumber(dB)
  draw(dB)
}

function moveDBDown(dB) {
  for (let i_col = 0; i_col < COL; i_col++) {
    let col = getCol(dB, i_col)
    let colMoved = moveArray(col.reverse())
    for (let i_row = 0; i_row < ROW; i_row++) {
      dB[ROW - 1 - i_row][i_col] = colMoved[i_row] || null
    }
  }
  draw(dB)
  dB = genNewNumber(dB)
  draw(dB)
}



var myDB = dashboards[0]
myDB[0][0] = "+1"
draw(myDB)

handleKeyDown()

function handleKeyDown() {
  document.addEventListener('keydown', event => {
    const key = event.key ? event.key.toLowerCase() : null
    console.log(key)
    if (!key) {
      return
    }

    switch (key) {
      case 'arrowup':
        console.log('Move ' + key);
        moveDBUp(myDB)
        break;
      case 'arrowright':
        console.log('Move ' + key);
        moveDBRight(myDB)
        break;
      case 'arrowdown':
        console.log('Move ' + key);
        moveDBDown(myDB)
        break;
      case 'arrowleft':
        console.log('Move ' + key);
        moveDBLeft(myDB)
        break;

      default:
        console.log('Only accept: Left Right Up Down');
        break;
    }
  })
}