let width = window.innerWidth;
let height = window.innerHeight;

function setup() {
    document.getElementsByTagName("BODY")[0].onresize = function() {fixResize()};
    createCanvas(width, height);
    textAlign(CENTER, CENTER);
    textFont('JetBrains Mono', 'sans-serif');

    let string = "Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor pulvinar vivamus fringilla lacus nec metus bibendum lacus egestanis bicina heltal nunc posuere ut hendrerit semper vel klass aptent taciti sociosqu ad litora torquent per conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis phase fermenti eftur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim just euislect quam cum velit aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida cras eleifend turpis fames primis vulputate ornare sagittis vehicula praesent dui felis venenatis ultrices proin libero feugiat tristique accumsan maecenas habitant habitus ulricies senaau facilisi cubilia curae hac habitasse platea dictumst lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque."

    string = "Nån lätt del och då menar jag väldigt lätt, asså jag klarar typ inte ens stereo madness. Uhh max fem sekunder typ fr annars blir jag arg grr hoppas att du kan hjälpa!! Do do do uhh ok hoppas du har haft en bra dag och sånt. Har du tänkt på en sak?? Hur mycket måste du byta ut på ett obejekt innan det blir ett nytt? Har du hört om the ship of theseus? Det. Fett coolt asså. En annan filosofisk sak är politik. Jag tycker det hade varit väldigt roligt om vi hade Anarkism i världen. Tänk alla människor går tillbaka till att behöva sköta sitt liv genom sig själv. Vi alla måste samarbeta för att överleva. De idioter som tror de är nån när de slår ihäl okyldiga personer kommer inte klara sig för de kan inte sammarbeta. Helt enkelt bör vi starta en revolution och bränna upp all rest av monarki i Sverige. Jag bränner gärna den svenska flaggan som ett steg så långt ifrån nationalism som möjligt. BTW jag skriver detta just nu för hand, eller för keyboard lol. Fuck AI. Detta är mycket bättre. Jag hatar att AI tar jobb och att alla världens ledare satsar på det, men jag gör själv AI. Altså jag programerar det via pytorch och det är faktiskt riktigkt kul men ändå väldigt omoraliskt liksom. Jag vet inte vad jag ska göra för är min AI mindre farlig än all den skit Elon Musk snackar om hela tiden. Elon tror verkligen han är nån asså. VEM TROR HAN ÄR?? HAN LEVER LIVET SOM OM HAN ÄR VÄRLDENS VIKTIGASTE PERSON. Men alla världens ledare tror väl de är superviktiga. Ulf tror säkert han e fett cool me sina korta shorts och sånt. Jävla fascist asså jag hatar allt med det svenska politiska systemet. Dock asså ganska coola shorts. Jag borde börja klä mig som en emo. MIn kompis vill att jag ska börja ha magtröja. Jag är man för din info(inte en femboy) ändå hade det varit kul att ha på sig fishnets kort tjol och magtöja. Är jag femboy eller?? guh men jag är i alla fall inte gay (du är det :D) även om jag är helt okej med det. Pride festivaler är ju svinkul. Men du vet hur det är alla dumma moderater tror de är roliga när de buar och skit. Men som du vet jag tycker att bör få tycka som de vill även om jag har en fet kuk och alla mina åsikter är objektivt korrekta. Nu börjar alla bli trötta på att jag har skrivit här så himla länge så jag callar off. Bye bye och puss puss! <3 ;3 :D :) :P HEJ DÅÅÅ!!!"

    let margin = 0.2;
    let startX = width * margin;
    let endX = width * (1 - margin);

    let x = startX;
    let y = 180;

    let words = string.split(' ');

    for (let i = 0; i < words.length; i++) {
        let word = words[i];

        let wordWidth = word.length * letter_spacing;

        if (x + wordWidth > endX && x > startX) {
            x = startX;
            y += line_spacing;
        }

        for (let j = 0; j < word.length; j++) {
            new letter(word.charAt(j), x, y, 70);
            x += letter_spacing;
        }

        if (i < words.length - 1) {
            if (x + letter_spacing > endX) {
                x = startX;
                y += line_spacing;
            } else {
                x += letter_spacing;
            }
        }
    }
}

let groundY = height*0.92;
let wasPressedLastFrame = false;
let mouseJustPressed = false;
let letter_spacing = 40;
let line_spacing = 80;

let yScroll = 0;
function mouseWheel(event) {
    yScroll -= event.delta * 0.2;
    if (yScroll >= 0) {
        yScroll = 0;
        return false;
    }

    for (let i = 0; i < rigidbody.bodies.length; i++) {
        let body = rigidbody.bodies[i];

        body.y -= event.delta * 0.2;

        if (body.y <= 30) {
            body.glued = false;
        }
    }
    return false;
}

function draw() {
    clear();
    noStroke();

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

                if (!body.glued) {
                    body.x -= nx * overlap * 0.5;
                    body.y -= ny * overlap * 0.5;

                    if (!otherBody.glued || random(0,2) === 1) {
                        otherBody.x += nx * overlap * 0.5;
                        otherBody.y += ny * overlap * 0.5;
                    }
                }

                let kx = body.vx - otherBody.vx;
                let ky = body.vy - otherBody.vy;
                let velAlongNormal = kx * nx + ky * ny;

                if (velAlongNormal > 0) {
                    let restitution = (body.bouncyness + otherBody.bouncyness) * 0.5;
                    let impulse = (1 + restitution) * velAlongNormal * 0.5;

                    if (!body.glued) {
                        body.vx -= impulse * nx;
                        body.vy -= impulse * ny;

                        if (!otherBody.glued || random(0,2) === 1) {
                            otherBody.vx += impulse * nx;
                            otherBody.vy += impulse * ny;
                        }
                    }
                }
            }
        }

        if (body.color == 1) {
            body.color = color(random(0,255),random(0,255),random(0,255))
        }

        fill(body.color);
        //circle(body.x, body.y, body.diameter);

        if (body.hasOwnProperty('text'))
        {
            textSize(body.diameter)
            push();
            translate(body.x, body.y);
            fill(color(0,0,0))
            rotate(body.rotation);
            text(body.text, 0, 0);
            pop();
        }
    }

    stroke(0, 0, 0);
    fill(color(245, 228, 230));
    rect(0,groundY,width,height-groundY);
    fill(color(0,0,0));
    noStroke();
    textSize(30);
    text("© Copyright 2026", width/2, groundY+30);

    rigidbody.bodies = rigidbody.bodies.filter(body => !body.destroyed);

    if (rigidbody.bodies.length == 0) {
        new letter("Reload the website to destroy it again", width/2, 0, 70)
        rigidbody.bodies[0].glued = false;
        rigidbody.bodies[0].indestructible = true;
        rigidbody.bodies[0].vx = 0;
    }

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

    vx = random(-20,20)/10;
    vy = 0;

    bouncyness = 0.8;
    airResistance = 0.999;
    gravity = 0.5;

    grabbable = true;
    held = false;
    glued = true;
    indestructible = false;

    rotation = 0;
    color = 1;

    destroyed = false;

    constructor(x, y, diameter = 10) {
        this.diameter = diameter;
        this.x = x;
        this.y = y;

        rigidbody.bodies.push(this);
    }

    update() {
        if (this.glued) {
            return;
        }

        if (!this.indestructible) {
            this.rotation += (2 * this.vx) / this.diameter;
        }

        this.vy += this.gravity;

        this.vx *= this.airResistance;
        this.vy *= this.airResistance;

        this.x += this.vx;
        this.y += this.vy;

        let radius = this.diameter / 2;

        if (this.indestructible && this.y + radius >=  height/2) {
            this.y =  height/2 - radius;
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
        if (Math.sqrt(dx * dx + dy * dy) <= this.diameter / 2 && mouseJustPressed && !this.indestructible) {
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

        if (this.y+this.diameter/2 >= groundY && !this.indestructible) {
            this.destroyed = true;
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