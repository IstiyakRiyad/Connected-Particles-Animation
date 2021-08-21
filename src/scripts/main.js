import "../styles/main.css";
import { Vec2 } from "./math";
import Particle from "./Particle";

export const mouse = {
    x: undefined,
    y: undefined,
    radius: undefined
};

// For Mobile
export let RANGE = 75;
export let LINE_WIDTH = 4;
export let RADIUS = 3;

let numberOfParticle = 100;
let particleSpeedRange = 1;
let color = '#000';
let particles;


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = canvas.clientWidth * window.devicePixelRatio;
canvas.height = canvas.clientHeight * window.devicePixelRatio;

// For Desktop
if(canvas.width / window.devicePixelRatio >= 576) {
    numberOfParticle = 150;
    RANGE = 100;
    RADIUS = 4;
    particleSpeedRange = 0.4;
}

if(canvas.width / window.devicePixelRatio >= 576 && canvas.width / window.devicePixelRatio <= 900) {
    numberOfParticle = 115;
    RANGE = 82;
    RADIUS = 3.5;
    particleSpeedRange = 0.6;
}


// Initializing particles
function init() {
    particles = [];
    for(let i = 0; i < numberOfParticle; i++) {
        const pX = Math.random() * canvas.width;
        const pY = Math.random() * canvas.height;
        const position = new Vec2(pX, pY);

        let vX = (Math.random() - .5)* particleSpeedRange * window.devicePixelRatio;
        vX = (vX > 0) ? vX + 1 : vX - 1;

        let vY = (Math.random() - .5) * particleSpeedRange * window.devicePixelRatio;
        vY = (vY > 0) ? vY + 1 : vY - 1;

        const velocity = new Vec2(vX, vY);

        particles.push(new Particle(position, velocity, color));
    }
}


// Animation loop function
function animate(time) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
        particle.update(canvas, particles, i);
        particle.draw(context);
    });

    requestAnimationFrame(animate);
}
requestAnimationFrame(animate);

// Call init function
init();

// Checking for resize event listener
addEventListener('resize', ()=> {
    const pixelRatio = window.devicePixelRatio;

    canvas.width = canvas.clientWidth * pixelRatio;
    canvas.height = canvas.clientHeight * pixelRatio;

    // For Desktop
    if(canvas.width / window.devicePixelRatio >= 576) {
        numberOfParticle = 150;
        RANGE = 100;
        RADIUS = 4;
        particleSpeedRange = 0.4;
    }
    else {
        numberOfParticle = 100;
        RANGE = 75;
        RADIUS = 3;
        particleSpeedRange = 1;
    }

    if(canvas.width / window.devicePixelRatio >= 576 && canvas.width / window.devicePixelRatio <= 900) {
        numberOfParticle = 115;
        RANGE = 82;
        RADIUS = 3.5;
        particleSpeedRange = 0.6;
    }

    init();
});

canvas.addEventListener('mousemove', event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.radius = (canvas.width / 80) * (canvas.height / 80);
});

canvas.addEventListener('mouseout', ()=> {
    mouse.x = undefined;
    mouse.y = undefined;
});

canvas.addEventListener('touchstart', event => {
    mouse.x = event.touches[0].clientX * window.devicePixelRatio;
    mouse.y = event.touches[0].clientY * window.devicePixelRatio;
    mouse.radius = canvas.width / 6;
});

canvas.addEventListener('touchmove', event => {
    mouse.x = event.touches[0].clientX * window.devicePixelRatio;
    mouse.y = event.touches[0].clientY * window.devicePixelRatio;
    mouse.radius = canvas.width / 6;
});

canvas.addEventListener('touchend', event => {
    mouse.x = undefined;
    mouse.y = undefined;
    mouse.radius = undefined;
});