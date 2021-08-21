import "../styles/main.css";
import { Vec2 } from "./math";
import Particle from "./Particle";

export const mouse = {
    x: undefined,
    y: undefined,
    radius: undefined
};
export const RANGE = 100;
export const LINE_WIDTH = 4;

const numberOfParticle = 100;
const color = '#000';
let particles;


const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const pixelRatio = window.devicePixelRatio;
canvas.width = canvas.clientWidth * pixelRatio;
canvas.height = canvas.clientHeight * pixelRatio;

// Initializing particles
function init() {
    particles = [];
    for(let i = 0; i < numberOfParticle; i++) {
        const pX = Math.random() * canvas.width;
        const pY = Math.random() * canvas.height;
        const position = new Vec2(pX, pY);

        let vX = (Math.random() - .5)* 2;
        vX = (vX > 0) ? vX + 1 : vX - 1;

        let vY = (Math.random() - .5) * 2;
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
    mouse.radius = canvas.width / 8;
});

canvas.addEventListener('touchmove', event => {
    mouse.x = event.touches[0].clientX * window.devicePixelRatio;
    mouse.y = event.touches[0].clientY * window.devicePixelRatio;
    mouse.radius = canvas.width / 8;
});

canvas.addEventListener('touchend', event => {
    mouse.x = undefined;
    mouse.y = undefined;
    mouse.radius = undefined;
});