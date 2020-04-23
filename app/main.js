import {
    DomBuilder
} from "./DomBuilder.js";

let p1 = new DomBuilder().create('p').withId('p1').withClass('text').withContent('Hello,').result;
let p2 = new DomBuilder().create('p').withId('p2').withClass('text').withContent('world!').result;
let div = new DomBuilder().create('div').withId('main').withClass('container').withChild(p1).withChild(p2).result;
document.body.prepend(div);

// canvas
const canvas = document.getElementById('canv');
let canvWidth = canvas.width = innerWidth,
    canvHeight = canvas.height = innerHeight,
    ctx = canvas.getContext('2d');
let balls = [];
let distanceLimit = canvHeight / 3;
let alpha = 0.1;
let arrFrom = ['left', 'right', 'top', 'bottom'];
let mouseBall = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    r: 0,
    type: 'mouse'
};
// первичная генерация массива шаров
function ballsGen() {
    for (let i = 0; i < 100; i++) {
        balls.push(getRandomBall());
    }
    window.requestAnimationFrame(render);
}
// возвращает один рандомный шар
function getRandomBall() {
    let ball = {
        x: random(canvWidth),
        y: random(canvHeight),
        r: random(2),
        vx: randomSpeed(),
        vy: randomSpeed(),
    }
    return ball;
}
// возвращает рандомную скорость движения шара
function randomSpeed() {
    return Math.random() > 0.5 ? Math.random() : -Math.random();
}

// перерисовка шаров
function renderBalls() {
    balls.forEach((b) => {
        if (!b.hasOwnProperty('type')) {
            ctx.fillStyle = 'rgba(255,255,255,0.6)';
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    });
}
// обновление состояния шаров-добавление шага к координатам
function updateBalls() {
    var newBalls = [];
    balls.forEach((b) => {
        b.x += b.vx / 5;
        b.y += b.vy / 5;
        if (b.x > -(50) && b.x < (canvWidth + 50) && b.y > -(50) && b.y < (canvHeight + 50)) {
            newBalls.push(b);
        }
    });
    balls = [...newBalls];
}
// отрисовка линий - при сближении шаров на disLimit
function renderLines() {
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            let divider = getDist(balls[i], balls[j]) / distanceLimit;
            if (divider < 1) {
                alpha = (1 - divider).toString();
                ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
                ctx.lineWidth = (1 - divider);
                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// рандом для позиций точек
function random(length) {
    return Math.ceil(Math.random() * length);
}
// если точек меньше начального значения - добаляем. 
function addBall() {
    if (balls.length < 100) {
        balls.push(getRandomBall());
    }
}
// определение расстояния между шарами(формула определения гипотенузы)
function getDist(b1, b2) {
    var deltaX = Math.abs(b1.x - b2.x),
        deltaY = Math.abs(b1.y - b2.y);

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}
// обновление всех состояний-интервал задается методом requestAnimationFrame()
function render() {
    ctx.clearRect(0, 0, canvWidth, canvHeight);

    addBall();

    renderBalls();

    renderLines();

    updateBalls();

    window.requestAnimationFrame(render);
}
// добавляем положение курсора как шар в массив шаров - для отрисовки линий
canvas.addEventListener('mouseenter', () => {
    balls.push(mouseBall)
});
// убираем мышку из массива шаров
canvas.addEventListener('mouseleave', () => {
    let newBalls = []
    balls.forEach((b) => {
        if (!b.hasOwnProperty('type')) {
            newBalls.push(b)
        }
    });
    balls = [...newBalls];
});
// движение мышки - присваиваем позиции курсора -> шару-курсору 
canvas.addEventListener('mousemove', (ev) => {
    mouseBall.x = ev.pageX;
    mouseBall.y = ev.pageY;
});
// ресайз окна - перерисовка
function initCanvas() {
    canvWidth = canvas.width = innerWidth;
    canvHeight = canvas.height = innerHeight;
    distanceLimit = canvHeight / 3;
}
window.addEventListener('resize', () => {
    initCanvas();
});
// вызов первичной генерации
ballsGen();