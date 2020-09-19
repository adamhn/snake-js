(function () {
  /**
   * Constants
   */
  const gridElement = document.querySelector(".grid");
  const width = 10;

  /**
   * Variables
   */
  let gridArray = [];
  let currentSnake = [2, 1, 0];
  let direction = 1;
  let appleIndex = 0;

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

  function move() {
    let snakeHeadPosition = currentSnake[0];

    if (
      (snakeHeadPosition + width >= width * width && direction === width) || //if snake has hit bottom
      (snakeHeadPosition % width === width - 1 && direction === 1) || //if snake has hit right wall
      (snakeHeadPosition % width === 0 && direction === -1) || //if snake has hit left wall
      (snakeHeadPosition - width < 0 && direction === -width) || //if snake has hit top
      gridArray[snakeHeadPosition + direction].classList.contains("snake") //if snake ran into itself
    )
      return clearInterval(timerId);

    if (snakeHeadPosition % width === 9) {
      // snake has hit right wall
      console.log("snake hit right wall");
    } else if (snakeHeadPosition % width === 0) {
      // snake has hit left wall
      console.log("snake hit left wall");
    } else if (snakeHeadPosition - width < 0) {
      // snake has hit top wall
      console.log("snake hit top wall");
    } else if (snakeHeadPosition + width >= 100) {
      console.log("snake hit bottom wall");
    }

    let tail = currentSnake.pop();
    gridArray[tail].classList.remove("snake");

    currentSnake.unshift(currentSnake[0] + direction);
    gridArray[currentSnake[0]].classList.add("snake");

    console.log(currentSnake);
  }
  move();

  let timerId = setInterval(move, 1000);

  function generateApples() {
    do {
      appleIndex = Math.floor(Math.random() * gridArray.length);
    } while (gridArray[appleIndex].classList.contains("snake"));
    gridArray[appleIndex].classList.add("apple");
  }

  generateApples();

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
})();
