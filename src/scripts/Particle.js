import {collusion} from './collusion.js';
import {mouse, RANGE, LINE_WIDTH, RADIUS} from './main.js';

export default class Particle {
    constructor(position, velocity, color){
        this.position = position;
        this.velocity = velocity;
        this.mass = 2;
        this.color = color;
        this.radius = RADIUS;
        this.connectedPoints = [];
    }

    update(canvas, particles, number) {
        // Checking the collusion of the particles
        particles.forEach(particle => {
            const length = particle.position.distanceTo(this.position);

            if(this !== particle && (length <= particle.radius + this.radius)) {
                collusion(this, particle);
            }
        });

        // Collusion with mouse pointer
        const length = this.position.distanceTo(mouse);
        if(length <= this.radius + mouse.radius) {
            if(this.position.x >= mouse.x && this.position.x <= canvas.width - this.radius * 10 * devicePixelRatio) {
                this.position.x += 10 * devicePixelRatio;
            }
            if(this.position.x < mouse.x && this.position.x >= this.radius * 10 * devicePixelRatio) {
                this.position.x -= 10 * devicePixelRatio;
            }
            if(this.position.y >= mouse.y && this.position.y <= canvas.height - this.radius * 10 * devicePixelRatio) {
                this.position.y += 10 * devicePixelRatio;
            }
            if(this.position.y < mouse.y && this.position.y >= this.radius * 10 * devicePixelRatio) {
                this.position.y -= 10 * devicePixelRatio;
            }
        }


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

        // Setting the radius
        this.radius = RADIUS + 10 * this.connectedPoints.length / particles.length;

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
            context.save();
            context.globalAlpha = 1 - this.position.distanceTo(point)/(RANGE * window.devicePixelRatio * 1.5);
            context.beginPath();
            context.moveTo(this.position.x, this.position.y);
            context.lineTo(point.x, point.y);
            context.lineWidth = LINE_WIDTH * window.devicePixelRatio * (1 - this.position.distanceTo(point)/(RANGE * window.devicePixelRatio * 2));
            context.stroke();
            context.restore();
        });

    }
}