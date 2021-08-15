import {distance} from './math.js';

const RANGE = 100;
const LINE_WIDTH = 2;

export default class Particle {
    constructor(position, velocity, color){
        this.position = position;
        this.velocity = velocity;
        this.color = color;
        this.radius = 5;
        this.connectedPoints = [];
    }

    update(canvas, particles, number) {
        // Checking if the particle collide with canvas wall
        if(this.position.x - this.radius <= 0 || this.position.x + this.radius >= canvas.width) {
            this.velocity.x *= -1;
        }
        if(this.position.y - this.radius <= 0 || this.position.y + this.radius >= canvas.height) {
            this.velocity.y *= -1;
        }

        // Getting the position of the particle which are inside the range of this particle. 
        this.connectedPoints = [];
        for(let i = number + 1; i < particles.length; i++) {
            if(this.position.distanceTo(particles[i].position) <= RANGE * window.devicePixelRatio) {
                this.connectedPoints.push(particles[i].position);
            }
        }

        // Changing the position of the particle 
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }

    draw(context) {
        // Drawing the circle
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.position.x, this.position.y, this.radius * window.devicePixelRatio, 0, 2 * Math.PI, false);
        context.fill();

        // Drawing the line
        context.strokeStyle = this.color;
        this.connectedPoints.forEach(point => {
            context.beginPath();
            context.moveTo(this.position.x, this.position.y);
            context.lineTo(point.x, point.y);
            context.lineWidth = LINE_WIDTH * window.devicePixelRatio;
            context.stroke();
        });

    }
}