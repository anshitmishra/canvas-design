const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function reportWindowSize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(window.innerWidth)
}

window.onresize = reportWindowSize;

const context = canvas.getContext('2d');

var circleColorArray = [
    "#f1ca5e",
    "#ecddd0",
    "#92b1b6",
    "#35455d",
    "#ff9aa2",
    "#ffb7b2"
];

var mouse = [
    x = undefined,
    y = undefined
]

window.addEventListener("mousemove", function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = circleColorArray[Math.floor(Math.random() * circleColorArray.length)]
    this.draw = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        context.fillStyle = this.color;
        context.fill();
    }

    this.update = function () {
        if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;


        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < 50) {
                this.radius += 1;
            }
        } else if (this.radius > 5) {
            this.radius -= 1;
        }


        this.draw();
    }
}

const circleArray = [];

for (let index = 1; index < 800; index++) {
    var radius = Math.random() * 5 + 1;
    var circleX = Math.random() * window.innerWidth;
    var circleY = Math.random() * window.innerHeight;
    var dX = (Math.random() - 0.5) * 1;
    var dY = (Math.random() - 0.5) * 1;
    var circle = new Circle(circleX, circleY, dX, dY, radius)
    circleArray.push(circle);
}

function animation() {
    requestAnimationFrame(animation);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (let index = 0; index < circleArray.length; index++) {
        circleArray[index].update();
    }
}
animation();