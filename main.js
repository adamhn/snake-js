(function () {
  /**
   * Constants
   */
  const gridElement = document.querySelector(".grid");
  const scoreDisplay = document.querySelector(".score");
  const startButton = document.querySelector(".start-btn");

  const width = 30;

  /**
   * Variables
   */
  let gridArray = [];
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let appleIndex = 0;

  let score = 0;
  let intervalTime = 500; // Start at speed 1 sec
  let speed = 0.5;
  let speedInterval = intervalTime * speed;

  let timerId;

  /**
   * Methods
   */
  function generateGrid() {
    for (let index = 0; index < width * width; index++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("grid-cell");
      gridElement.appendChild(gridCell);
      gridArray.push(gridCell);
    }
  }
  generateGrid();

  function updateSnakePosition() {
    currentSnake.forEach((index) => gridArray[index].classList.add("snake"));
  }

  updateSnakePosition();

  function startGame() {
    // remove snake from grid
    currentSnake.forEach((index) => gridArray[index].classList.remove("snake"));
    gridArray[appleIndex].classList.remove("apple"); // remove apple
    clearInterval(timerId);
    currentSnake = [2, 1, 0]; // reset back to original position
    score = 0;
    scoreDisplay.textContent = score;
    direction = 1;
    intervalTime = 1000;
    generateApple();
    currentSnake.forEach((index) => gridArray[index].classList.add("snake"));
    timerId = setInterval(move, speedInterval);
  }
  startGame();

  function move() {
    if (
      (gridArray[currentSnake[0]] + width >= width * width &&
        direction === width) || //if snake has hit bottom
      (gridArray[currentSnake[0]] % width === width - 1 && direction === 1) || //if snake has hit right wall
      (gridArray[currentSnake[0]] % width === 0 && direction === -1) || //if snake has hit left wall
      (gridArray[currentSnake[0]] - width < 0 && direction === -width) || //if snake has hit top
      gridArray[currentSnake[0] + direction].classList.contains("snake") //if snake ran into itself
    )
      return clearInterval(timerId);

    let tail = currentSnake.pop();
    gridArray[tail].classList.remove("snake");

    currentSnake.unshift(currentSnake[0] + direction);

    //deal with snake head getting the apple
    if (gridArray[currentSnake[0]].classList.contains("apple")) {
      // remove class of apple
      gridArray[currentSnake[0]].classList.remove("apple");

      // grow snake by adding a class and growing the snake array
      gridArray[tail].classList.add("snake");
      currentSnake.push(tail);
      generateApple();
      score++;
      scoreDisplay.textContent = score;

      // Speed up snake
      clearInterval(timerId);
      timerId = setInterval(move, speedInterval);
    }

    gridArray[currentSnake[0]].classList.add("snake");
  }

  function generateApple() {
    do {
      appleIndex = Math.floor(Math.random() * gridArray.length);
    } while (gridArray[appleIndex].classList.contains("snake"));
    gridArray[appleIndex].classList.add("apple");
  }

  function keyPressed(e) {
    if (e.keyCode === 39) {
      // right arrow pressed
      direction = 1;
    } else if (e.keyCode === 37) {
      // left arrow pressed
      direction = -1;
    } else if (e.keyCode === 38) {
      // up arrow pressed
      direction = -width;
    } else if (e.keyCode === 40) {
      // down arrow pressed
      direction = +width;
    }
  }

  /**
   * Inits & Event Listeners
   */
  document.addEventListener("keyup", keyPressed);
  startButton.addEventListener("click", startGame);
})();
