// Глобальные константы
const GAME = {
  xTurn: true, // чей ход ("да" - крестик, "нет" - нолик)
  xState: [], // массив номеров ячеек с "крестиками"
  oState: [], // массив номеров ячеек с "ноликами"
  
  // номера выигрышных ячеек
  winningStates: [
    // ряды
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],

    // колонки
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],

    // диагонали
    ["0", "4", "8"],
    ["2", "4", "6"],
  ],
};

// Функция оработки события "клик"
function attachEventListeners() {
  // получаем коллекцию всех ячеек поля 
  const cells = document.querySelectorAll(".grid-cell");
  
  // итерируемся по ним
  cells.forEach((cell) => {
    
    // на каждую ячейку добавляем обработчик "клика"
    cell.addEventListener("click", (event) => {
      
      // записываем в константу состояние ячейки ("щелкнутая" / не "щелкнутая")
      const disabledCell = cell.classList.contains("disabled");
      
      // проверка состояния переменной xTurn ("чей ход") и ячейки
      if (GAME.xTurn && !disabledCell) {
        event.target.classList.add("x"); // отрисовка "крестика"
        // добавление номера ячейки в массив "крестиков"
        GAME.xState.push(event.target.getAttribute("data-value"));
        GAME.xTurn = !GAME.xTurn;// смена состояния переменной "чей ход"
      }
      
      else if (!GAME.xTurn && !disabledCell) {
        event.target.classList.add("o"); // отрисовка "нолика"
        // добавление номера ячейки в массив "ноликов"
        GAME.oState.push(event.target.getAttribute("data-value"));
        GAME.xTurn = !GAME.xTurn;
      }
      
      // добавляем ячейке класс "disabled" ("щелкнутая" ячейка)
      event.target.classList.add("disabled");

      testGameOver(); // проверяем выигрышные варианты
    });
  });
}

// Функция проверки выигрышных вариантов
function testGameOver () {
  // получаем коллекцию ячеек, по которым уже щелкнули мышью (имеющие класс "disabled")
  const draw = document.querySelectorAll(".disabled");
  
  // итерируемся по выигрышным вариантам
  GAME.winningStates.forEach((state) => {
    // записываем в константы, встретились или нет выигрышные варианты
    const xWins = state.every((element) => GAME.xState.includes(element));
    const oWins = state.every((element) => GAME.oState.includes(element));
    
    // если встретились выигрышные варианты
    if (xWins || oWins) {
      // открываем табличку с объявлением победителя
      document.querySelector(".game-over").classList.add("visible");
      document.querySelector(".game-over-text").textContent = xWins
        ? "X wins"
        : "O wins";
    }   
  });

  // если все ячейки заполнены, а победителя нет, объявляем ничью 
  if (draw.length === 9 && !document.querySelector(".game-over").classList.contains("visible")) {
    document.querySelector(".game-over").classList.add("visible");
    document.querySelector(".game-over-text").textContent = "Draw"
  }
 
}


// Доступ у кнопке "Restart"
const restart = document.querySelector(".restart");

// Добавляем обработчик "клика" по кнопке
restart.addEventListener("click", () => {
  // убираем табличку с победителем
  document.querySelector(".game-over").classList.remove("visible");

  // обнуляем классы у ячеек
  const cells = document.querySelectorAll(".grid-cell");
  cells.forEach((cell) => {
    cell.classList.remove("disabled", "x", "o");
  });

  // возвращаем глобальные константы в исходные состояния
  GAME.xTurn = true;
  GAME.xState = [];
  GAME.oState = [];
});

attachEventListeners(); // Запуск игры
