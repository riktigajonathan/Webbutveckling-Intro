let width = window.innerWidth;
let height = window.innerHeight;

function setup() {
    document.getElementsByTagName("BODY")[0].onresize = function() {fixResize()};
    createCanvas(width, height);
    textAlign(CENTER, CENTER);
}

let header = "Detta är min hemsida";
let groundY = height*0.9;
let wasPressedLastFrame = false;
let mouseJustPressed = false;

function draw() {
    background(220);
    mouseJustPressed = mouseIsPressed && !wasPressedLastFrame;

    for (let i = 0; i < rigidbody.bodies.length; i++) {
        let body = rigidbody.bodies[i];

        body.update();
        for (let j = i + 1; j < rigidbody.bodies.length; j++) {
            let otherBody = rigidbody.bodies[j];

            let dx = otherBody.x - body.x;
            let dy = otherBody.y - body.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            let minDistance = body.diameter / 2 + otherBody.diameter / 2;

            if (distance < minDistance) {
                let overlap = minDistance - (distance || 1);
                let nx = distance ? dx / distance : 1;
                let ny = distance ? dy / distance : 0;

                body.x -= nx * overlap * 0.5;
                body.y -= ny * overlap * 0.5;
                otherBody.x += nx * overlap * 0.5;
                otherBody.y += ny * overlap * 0.5;

                let kx = body.vx - otherBody.vx;
                let ky = body.vy - otherBody.vy;
                let velAlongNormal = kx * nx + ky * ny;

                if (velAlongNormal > 0) {
                    let restitution = (body.bouncyness + otherBody.bouncyness) * 0.5;
                    let impulse = (1 + restitution) * velAlongNormal * 0.5;

                    body.vx -= impulse * nx;
                    body.vy -= impulse * ny;
                    otherBody.vx += impulse * nx;
                    otherBody.vy += impulse * ny;
                }
            }
        }

        if (body.color == 1) {
            body.color = color(random(0,255),random(0,255),random(0,255))
        }

        fill(body.color);
        circle(body.x, body.y, body.diameter);

        if (body.hasOwnProperty('text'))
        {
            textSize(body.diameter)
            push();
            translate(body.x, body.y);

            body.rotation += (2 * body.vx) / body.diameter;

            fill(color(255,255,255))
            rotate(body.rotation);
            text(body.text, 0, 0);
            pop();
        }
    }

    fill(color(0,0,0))
    rect(0,groundY,width,1)
    textSize(20);
    text("© Copyright 2026", width/2, groundY+20);



    wasPressedLastFrame = mouseIsPressed;
}

function fixResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    groundY = height*0.9;

    resizeCanvas(width, height);
}

class rigidbody {
    static bodies = [];

    diameter = 0;

    x = 0;
    y = 0;

    vx = 20;
    vy = 0;

    bouncyness = 0.8;
    airResistance = 0.999;
    gravity = 0.5;

    grabbable = true;
    held = false;
    rotation = 0;
    color = 1;

    constructor(x, y, diameter = 10) {
        this.diameter = diameter;
        this.x = x;
        this.y = y;

        rigidbody.bodies.push(this);
    }

    update() {
        this.vy += this.gravity;

        this.vx *= this.airResistance;
        this.vx *= this.airResistance;

        this.x += this.vx;
        this.y += this.vy;

        let radius = this.diameter / 2;

        if (this.y + radius >= groundY) {
            this.y = groundY - radius;
            this.vy = -this.vy  * this.bouncyness;
        }

        if (this.x + radius >= width) {
            this.x = width - radius;
            this.vx = -this.vx * this.bouncyness;
        }
        if (this.x - radius <= 0) {
            this.x = radius;
            this.vx = -this.vx * this.bouncyness;
        }

        let dx = this.x - mouseX;
        let dy = this.y - mouseY;
        if (Math.sqrt(dx * dx + dy * dy) <= this.diameter / 2 && mouseJustPressed) {
            console.log("you got me");
            this.held = true;
        }

        if (this.held && !mouseIsPressed) {
            this.held = false;
        }

        if (this.held) {
            this.vx = (mouseX - pmouseX)*0.3;
            this.vy = (mouseY - pmouseY)*0.3;
            this.x = mouseX;
            this.y = mouseY;
        }
    }
}

class letter extends rigidbody {
    text = "a";

    constructor(text, x, y, diameter = 30) {
        super(x, y, diameter);
        this.text = text;
    }
}

new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
new letter("a",100, 100, 100);
new letter("b",160, 120, 100);
