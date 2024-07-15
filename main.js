(() => {
    const TIME = 100;
    const MOVEMENT = 20;
    const MOVEMENET_BAR = 40;
    const PlAYER1_UP_KEY = "q";
    const PLAYER1_DOWN_KEY = "a";
    const PLAYER2_UP_KEY = "o";
    const PLAYER2_DOWN_KEY = "l";

    /** movement is used for margin */
    const WIDTH = document.documentElement.clientWidth - MOVEMENT;
    const HEIGHT = document.documentElement.clientHeight - MOVEMENT;

    let controlGame;
    let player1;
    let player2;

    title.style.right = (WIDTH - 575) / 2 + "px";
    title.style.top = (HEIGHT - 275) / 2 + "px";

    document.addEventListener("keydown", (e) => {
        switch (e.key) {
            case PlAYER1_UP_KEY: // Q
            case PLAYER1_DOWN_KEY: // A
                player1.keyCode = e.key;
                player1.keyPress = true;
                break;
            case PLAYER2_UP_KEY: // O
            case PLAYER2_DOWN_KEY: // L
                player2.keyCode = e.key;
                player2.keyPress = true;
                break;
        }
    })

    document.addEventListener("keyup", (e) => {
        if (e.key == PlAYER1_UP_KEY || e.key == PLAYER1_DOWN_KEY)
            player1.keyPress = false;
        if (e.key == PLAYER2_UP_KEY || e.key == PLAYER2_DOWN_KEY)
            player2.keyPress = false;
    })

    const init = () => {
        ball.style.left = 0;
        ball.state = 1;
        ball.direction = 1 // right 1, left 2;

        player1 = new Object();
        player2 = new Object();
        player1.keyPress = false;
        player1.keyCode = null;
        player2.keyPress = false;
        player2.keyCode = null;
    }

    const moveBar = () => {
        if (player1.keyPress) {
            if (player1.keyCode == PlAYER1_UP_KEY && bar1.offsetTop >= 0) {
                bar1.style.top = (bar1.offsetTop - MOVEMENET_BAR) + "px";
            }

            if (player1.keyCode == PLAYER1_DOWN_KEY && (bar1.offsetTop + bar1.clientHeight) <= HEIGHT) {
                bar1.style.top = (bar1.offsetTop + MOVEMENET_BAR) + "px";
            }
        }

        if (player2.keyPress) {
            if (player2.keyCode == PLAYER2_UP_KEY && bar2.offsetTop >= 0) {
                bar2.style.top = (bar2.offsetTop - MOVEMENET_BAR) + "px";
            }

            if (player2.keyCode == PLAYER2_DOWN_KEY && (bar2.offsetTop + bar2.clientHeight) <= HEIGHT) {
                bar2.style.top = (bar2.offsetTop + MOVEMENET_BAR) + "px";
            }
        }
    }

    const collidePayer1 = () => {
        if (ball.offsetLeft <= (bar1.clientWidth) &&
            ball.offsetTop >= bar1.offsetTop &&
            ball.offsetTop <= (bar1.offsetTop + bar1.clientHeight)) {
            return true;
        }

        return false;
    }
    const collidePayer2 = () => {
        if (ball.offsetLeft >= (WIDTH - bar2.clientWidth) &&
            ball.offsetTop >= bar2.offsetTop &&
            ball.offsetTop <= (bar2.offsetTop + bar2.clientHeight)) {
            return true;
        }
        return false;
    }

    const checkStateBall = () => {
        if (collidePayer2()) {
            ball.direction = 2;
            if (ball.state == 1) ball.state = 3;
            if (ball.state == 2) ball.state = 4;
        } else if (collidePayer1()) {
            ball.direction = 1;
            if (ball.state == 3) ball.state = 1;
            if (ball.state == 4) ball.state = 2;
        }

        if (ball.direction === 1) {
            if (ball.offsetTop >= HEIGHT) ball.state = 2;
            else if (ball.offsetTop <= 0) ball.state = 1;
        } else {
            if (ball.offsetTop >= HEIGHT) ball.state = 4;
            else if (ball.offsetTop <= 0) ball.state = 3;
        }
    }

    const moveBall = () => {
        checkStateBall();
        switch (ball.state) {
            case 1: // right, down
                ball.style.left = (ball.offsetLeft + MOVEMENT) + "px";
                ball.style.top = (ball.offsetTop + MOVEMENT) + "px";
                break;
            case 2: // right, up
                ball.style.left = (ball.offsetLeft + MOVEMENT) + "px";
                ball.style.top = (ball.offsetTop - MOVEMENT) + "px";
                break;
            case 3: // left, down
                ball.style.left = (ball.offsetLeft - MOVEMENT) + "px";
                ball.style.top = (ball.offsetTop + MOVEMENT) + "px";
                break;
            case 4: // left, up
                ball.style.left = (ball.offsetLeft - MOVEMENT) + "px";
                ball.style.top = (ball.offsetTop - MOVEMENT) + "px";
                break;
        }
    }
    const showTitle = () => {
        title.style.display = "block";
    }

    const hideTitle = () => {
        title.style.display = "none";
    }

    const stop = () => {
        clearInterval(controlGame);
        showTitle();
    }

    const checkIfLost = () => {
        if (ball.offsetLeft >= WIDTH) {
            stop();
        }

        if (ball.offsetLeft <= 0) {
            stop();
        }
    }

    const play = () => {
        hideTitle();
        moveBall();
        moveBar();
        checkIfLost();
    }

    const start = () => {
        init();
        controlGame = setInterval(play, TIME);
    }

    const reset = () => {
        stop();
        ball.style.top = 0 + "px";
        ball.style.left = 0 + "px";
        start();
    }

    document.addEventListener("keydown", (e) => {
        if (e.key === " ") {
            reset();
        }
    })

    start();
})()