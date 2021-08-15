export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distanceTo(position) {
        const deltaX = this.x - position.x;
        const deltaY = this.y - position.y;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        return distance;
    }
}