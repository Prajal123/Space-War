var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
canvas.height = innerHeight - 22;
canvas.width = innerWidth - 22;

var missilearray = [];
// var dx=.1;
var timer = 00, count = 0;
var found = 0;
var score = 0;
var c = 0;
var highscore = localStorage.getItem('highscore');
var a = canvas.width / 2, b = canvas.height;
ctx.beginPath();
ctx.moveTo(a, b);
ctx.lineTo(a + 5, b - 25);
ctx.lineTo(a + 10, b - 5);
ctx.lineTo(a + 30, b - 50);
ctx.lineTo(a + 50, b - 5);
ctx.lineTo(a + 55, b - 25);
ctx.lineTo(a + 60, b);
ctx.lineTo(a, b);
ctx.fillStyle = "blue";
ctx.fill();
ctx.stroke();
ctx.closePath();

var count1 = 0, count2 = 0, level = 0;
window.addEventListener("keydown", function (e) {
    if (e.key == 'ArrowRight' || e.key == 'ArrowDown') {
        if (e.key == 'ArrowRight' && (a >= -1 && a + 61 <= canvas.width)) {
            a += 5;
            ctx.clearRect(a - 5, b - 50, 62, 51);
        }
        else if (e.key == 'ArrowDown' && (b - 50 >= canvas.height - 290 && b < canvas.height)) {
            b += 5;
            ctx.clearRect(a - 1, b - 50, 62, 50);
        }

        ctx.beginPath();
        ctx.moveTo(a, b);
        ctx.lineTo(a + 5, b - 25);
        ctx.lineTo(a + 10, b - 5);
        ctx.lineTo(a + 30, b - 50);
        ctx.lineTo(a + 50, b - 5);
        ctx.lineTo(a + 55, b - 25);
        ctx.lineTo(a + 60, b);
        ctx.lineTo(a, b);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

    }
    else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
        if (e.key == 'ArrowLeft' && (a >= 0 && a + 59 <= canvas.width)) {
            a -= 5;
            ctx.clearRect(a + 5, b - 50, 62, 51);
        }
        else if (e.key == 'ArrowUp' && (b - 51 > canvas.height - 290 && b <= canvas.height)) {
            b -= 5;
            ctx.clearRect(a - 1, b, 62, 6);
        }

        ctx.beginPath();
        ctx.moveTo(a, b);
        ctx.lineTo(a + 5, b - 25);
        ctx.lineTo(a + 10, b - 5);
        ctx.lineTo(a + 30, b - 50);
        ctx.lineTo(a + 50, b - 5);
        ctx.lineTo(a + 55, b - 25);
        ctx.lineTo(a + 60, b);
        ctx.lineTo(a, b);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

})
function alien(x, y) {
    this.x = x;
    this.y = y;
    this.draw = function () {
        ctx.beginPath();
        ctx.moveTo(5 + 5 * this.x, 5 + 5 * this.y);
        ctx.lineTo(25 + 5 * this.x, 25 + 5 * this.y);
        ctx.lineTo(45 + 5 * this.x, 5 + 5 * this.y);
        ctx.lineTo(45 + 5 * this.x, 45 + 5 * this.y);
        ctx.lineTo(25 + 5 * this.x, 25 + 5 * this.y);
        ctx.lineTo(5 + 5 * this.x, 45 + 5 * this.y);
        ctx.lineTo(5 + 5 * this.x, 5 + 5 * this.y);
        ctx.fillStyle = "grey";
        ctx.fill();
        ctx.stroke();

        ctx.font = "16px Arial";
        ctx.fillStyle = "lime";
        ctx.fillText("Score :" + score, 10, 350);

        timer += .01;
        if (timer > 60) {
            count++; timer = 0;
            ctx.fillText(count + ":0" + Math.floor(timer), 10, 400);
        }
        else if (timer > 10) {
            ctx.fillText("Timer:" + count + ":" + Math.floor(timer), 10, 400);
        }
        else if (timer < 10) {
            ctx.fillText("Timer:" + count + ":0" + Math.floor(timer), 10, 400);
        }
    }

    this.update = function () {

        if (alienarray[0].x + 1245 >= canvas.width) {
            found = 1;
            this.x -= 0.1;
        }
        else if (alienarray[0].x + 1 <= 0) {
            found = 0;
            this.x += .1;
        }
        else {
            if (found == 0) {
                this.x += .1;
            }
            else {
                this.x -= 0.1;
            }
        }


        this.draw();
    }
}

window.addEventListener("keydown", function (e) {
    if (e.key == " ") {
        missilearray.push(new missile(a + 30, b - 50));
        animate1(a + 30, b - 50);
    }
})
function missile(x, y) {
    this.x = x;
    this.y = y;
    this.draw1 = function () {

        for (var i = 0; i < alienarray.length; i++) {
            if (alienarray[i] == null) {
                return;
            }
            if (this.x >= (alienarray[i].x * 5 + 5) && this.x <= (alienarray[i].x * 5 + 45) && this.y == (alienarray[i].y * 5 + 45)) {
                alienarray.splice(i, 1);
                missilearray.splice(missilearray.length - 1, 1);
                score += 10;
            }


        }

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 30);
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();


    }
    this.update1 = function () {
        this.y -= 1;
        this.draw1();
    }
}

function animate1() {

    requestAnimationFrame(animate1);
    if (missilearray[missilearray.length - 1] == null) {
        return;
    }
    missilearray[missilearray.length - 1].update1();

}
var alienarray = [];
for (var i = 0; i < 240; i += 10) {
    for (var j = 0; j < 60; j += 10) {
        alienarray.push(new alien(i, j));
    }
}
var animation;
function animate() {
    animation = requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, b - 50);
    for (var i = 0; i < alienarray.length; i++) {

        alienarray[i].update();
    }
    ctx.fillText("Level 1", 1100, 320);

}
animate();

var alienfall1 = new fall();
var t = setInterval(function () {
    alienfall1 = new fall();
}, 5000);
var animation3;

function fall() {
    var j = Math.floor(Math.random() * alienarray.length);
    // alienfall.push(alienarray[j]);
    this.al = alienarray[j];
    alienarray.splice(j, 1);
    //  alienfall1=alienfall[alienfall.length-1];
    this.update3 = function () {
        this.al.y += 1;
        this.al.draw();
        //    console.log(this.al.y);

        if (((this.al.x * 5 + 45 >= a && this.al.x * 5 <= a) || (this.al.x * 5 <= a + 60 && this.al.x * 5 + 45 >= a + 60)) && this.al.y * 5 >= b - 50 && this.al.y * 5 <= b) {
            cancelAnimationFrame(animation);
            cancelAnimationFrame(animation3);
            highscore1();
            ctx.fillText("You lost", canvas.width / 2, canvas.height / 2);
            clearTimeout(t);
        }
        if (alienarray.length == 0 || count > 80) {
            cancelAnimationFrame(animation);
            cancelAnimationFrame(animation3);
            highscore1();
            ctx.fillText("You Won,Level Up", canvas.width / 2, canvas.height / 2 + 50);
            ctx.fillText("Bonus Points :50 ", canvas.width / 2, canvas.height / 2 + 75);
            ctx.fillText("Total score:" + Math.floor(score + 50), canvas.width / 2, canvas.height / 2 + 100);
            clearTimeout(t);
            levelup();
        }

    }
}

function animate3() {
    ctx.clearRect(0, b - 50, a, canvas.height - b + 50);
    ctx.clearRect(a + 60, b - 50, canvas.width - a - 60, canvas.height - b + 50);
    animation3 = requestAnimationFrame(animate3);

    alienfall1.update3();
}
animate3();

function highscore1() {
    if (highscore != null) {
        if (score > highscore) {
            localStorage.setItem("highscore", score);
        }
    }
    else {
        localStorage.setItem("highscore", score);
    }

    ctx.fillText("Highscore :" + highscore, canvas.width / 2, canvas.height / 2 + 25);

}

function levelup() {
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(a, b);
        ctx.lineTo(a + 5, b - 25);
        ctx.lineTo(a + 10, b - 5);
        ctx.lineTo(a + 30, b - 50);
        ctx.lineTo(a + 50, b - 5);
        ctx.lineTo(a + 55, b - 25);
        ctx.lineTo(a + 60, b);
        ctx.lineTo(a, b);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        alienarray = [];
        alienarray.length = 0;
        alienarray.splice(0, alienarray.length);

        for (var i = 0; i < 240; i += 10) {
            for (var j = 0; j < 60; j += 10) {
                alienarray.push(new alien(i, j));
            }
        }
        var animation4;
        function animate4() {
            animation4 = requestAnimationFrame(animate4);
            ctx.clearRect(0, 0, canvas.width, b - 50);
            for (var i = 0; i < alienarray.length; i++) {

                alienarray[i].update();
            }
            ctx.fillText("Level 2", 1100, 320);
        }
        animate4();

        var animation5;
        var alienfall2, alienfall3;
        alienfall2 = new fall1();
        alienfall3 = new fall1();
        var s = setInterval(function () {
            alienfall2 = new fall1();
            alienfall3 = new fall1();
        }, 5000);
        function fall1() {
            var j = Math.floor(Math.random() * alienarray.length);

            this.al = alienarray[j];
            alienarray.splice(j, 1);

            this.update = function () {
                this.al.y += 1;
                this.al.draw();

                if (((this.al.x * 5 + 45 >= a && this.al.x * 5 <= a) || (this.al.x * 5 <= a + 60 && this.al.x * 5 + 45 >= a + 60)) && this.al.y * 5 >= b - 50 && this.al.y * 5 <= b) {
                    cancelAnimationFrame(animation4);
                    cancelAnimationFrame(animation5);
                    highscore1();
                    ctx.fillText("You lost", canvas.width / 2, canvas.height / 2);
                    clearTimeout(s);
                }
                if (alienarray.length == 0 || count > 150) {
                    cancelAnimationFrame(animation4);
                    cancelAnimationFrame(animation5);
                    highscore1();
                    ctx.fillText("You Won, Level up", canvas.width / 2, canvas.height / 2 + 50);
                    ctx.fillText("Bonus Points :100 ", canvas.width / 2, canvas.height / 2 + 75);
                    score += 100;
                    ctx.fillText("Total score:" + Math.floor(score), canvas.width / 2, canvas.height / 2 + 100);
                    clearTimeout(s);
                    levelup2();
                }
            }
        }
        function animate5() {
            ctx.clearRect(0, b - 50, a, canvas.height - b + 50);
            ctx.clearRect(a + 60, b - 50, canvas.width - a - 60, canvas.height - b + 50);
            animation5 = requestAnimationFrame(animate5);

            alienfall2.update();
            alienfall3.update();
        }
        animate5();

    }, 3000);


}

function levelup2() {
    setTimeout(function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.moveTo(a, b);
        ctx.lineTo(a + 5, b - 25);
        ctx.lineTo(a + 10, b - 5);
        ctx.lineTo(a + 30, b - 50);
        ctx.lineTo(a + 50, b - 5);
        ctx.lineTo(a + 55, b - 25);
        ctx.lineTo(a + 60, b);
        ctx.lineTo(a, b);
        ctx.fillStyle = "blue";
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        alienarray = [];
        alienarray.length = 0;
        alienarray.splice(0, alienarray.length);

        for (var i = 0; i < 240; i += 10) {
            for (var j = 0; j < 60; j += 10) {
                alienarray.push(new alien(i, j));
            }
        }
        var animation6;
        function animate6() {
            animation6 = requestAnimationFrame(animate6);
            ctx.clearRect(0, 0, canvas.width, b - 50);
            for (var i = 0; i < alienarray.length; i++) {

                alienarray[i].update();
            }
            ctx.fillText("Level 3", 1100, 320);
        }
        animate6();

        var animation7;
        var alienfall4, alienfall5, alienfall6;
        alienfall4 = new fall2();
        alienfall5 = new fall2();
        alienfall6 = new fall2();
        var r = setInterval(function () {
            alienfall4 = new fall2();
            alienfall5 = new fall2();
            alienfall6 = new fall2();
        }, 5000);
        function fall2() {
            var j = Math.floor(Math.random() * alienarray.length);

            this.al = alienarray[j];
            alienarray.splice(j, 1);

            this.update = function () {
                this.al.y += 1;
                this.al.draw();

                if (((this.al.x * 5 + 45 >= a && this.al.x * 5 <= a) || (this.al.x * 5 <= a + 60 && this.al.x * 5 + 45 >= a + 60)) && this.al.y * 5 >= b - 50 && this.al.y * 5 <= b) {
                    cancelAnimationFrame(animation6);
                    cancelAnimationFrame(animation7);
                    highscore1();
                    ctx.fillText("You lost", canvas.width / 2, canvas.height / 2);
                    clearTimeout(r);
                }
                if (alienarray.length == 0 || count > 200) {
                    cancelAnimationFrame(animation6);
                    cancelAnimationFrame(animation7);
                    highscore1();
                    ctx.fillText("Congratulations, you won all the levels", canvas.width / 2, canvas.height / 2 + 50);
                    ctx.fillText("Bonus Points :150 ", canvas.width / 2, canvas.height / 2 + 75);
                    score += 150;
                    ctx.fillText("Total score:" + Math.floor(score), canvas.width / 2, canvas.height / 2 + 100);
                    clearTimeout(r);
                }
            }
        }
        function animate7() {
            ctx.clearRect(0, b - 50, a, canvas.height - b + 50);
            ctx.clearRect(a + 60, b - 50, canvas.width - a - 60, canvas.height - b + 50);
            animation7 = requestAnimationFrame(animate7);

            alienfall4.update();
            alienfall5.update();
            alienfall6.update();
        }
        animate7();

    }, 3000);


}

