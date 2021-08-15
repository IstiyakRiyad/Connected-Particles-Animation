import "../styles/main.css";
import { Vec2 } from "./math";
import Particle from "./Particle";


let particles;
const NumberOfParticle = 100;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const pixelRatio = window.devicePixelRatio;
canvas.width = canvas.clientWidth * pixelRatio;
canvas.height = canvas.clientHeight * pixelRatio;

// Initializing particles
function init() {
    particles = [];
    for(let i = 0; i < NumberOfParticle; i++) {
        const position = new Vec2(Math.random() * canvas.width, Math.random() * canvas.height);
        const velocity = new Vec2((Math.random() - .5)* 5, (Math.random() - .5) * 5);

        particles.push(new Particle(position, velocity, "#000"));
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
    console.log(canvas.width, canvas.height);
});