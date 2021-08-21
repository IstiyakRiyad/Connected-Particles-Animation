function rotate(particle, angle){
	var cordinate = {
		x: particle.velocity.x * Math.cos(angle) - particle.velocity.y * Math.sin(angle),
		y: particle.velocity.x * Math.sin(angle) + particle.velocity.y * Math.cos(angle)
	};
	return cordinate;
}


export function collusion(particle1, particle2){
	var disX = particle1.position.x - particle2.position.x;
	var disY = particle1.position.y - particle2.position.y;

	var VelocityX = particle1.velocity.x - particle2.velocity.x;
	var VelocityY = particle1.velocity.y - particle2.velocity.y;

	if(disX*VelocityX + disY*VelocityY <= 0){

		var mass1 = particle1.mass;
		var mass2 = particle2.mass;

		var angle = -Math.atan2((particle2.position.y - particle1.position.y),(particle2.position.x - particle1.position.x));

		var NewV1 = rotate(particle1, angle);
		var NewV2 = rotate(particle2, angle);

		var V1x = (NewV1.x * (mass1 - mass2) + 2*mass2*NewV2.x)/(mass1 + mass2);
		var V2x = (NewV2.x * (mass2 - mass1) + 2*mass1*NewV1.x)/(mass1 + mass2);

		particle1.velocity.x = V1x;
		particle1.velocity.y = NewV1.y;

		particle2.velocity.x = V2x;
		particle2.velocity.y = NewV2.y;

		NewV1 = rotate(particle1, -angle);
		NewV2 = rotate(particle2, -angle);

		particle1.velocity.x = NewV1.x;
		particle1.velocity.y = NewV1.y;

		particle2.velocity.x = NewV2.x;
		particle2.velocity.y = NewV2.y;
	}
}


// export function calculateCollusion(particle1, particle2) {
//     const length = particle1.position.distanceTo(particle2.position);

//     if(length > particle1.radius + particle2.radius) {
//         return;
//     }

//     const M1 = 1; //particle1.radius ** 3;
//     const M2 = 1; //particle2.radius ** 3;

//     const deltaX = particle2.position.x - particle1.position.x;
//     const deltaY = particle2.position.y - particle1.position.y;

//     const theta = calculateDegree(deltaX, deltaY);

//     const U1x = particle1.velocity.x * theta.cos + particle1.velocity.y * theta.sin;
//     const V1y = particle1.velocity.x * theta.sin + particle1.velocity.y * theta.cos;

//     const U2x = particle2.velocity.x * theta.cos + particle2.velocity.y * theta.sin;
//     const V2y = particle2.velocity.x * theta.sin + particle2.velocity.y * theta.cos;

//     const V1x = collusionVelocity(U1x, U2x, M1, M2);
//     const V2x = collusionVelocity(U2x, U1x, M2, M1);

//     particle1.velocity.x = V1x * theta.cos + V1y * theta.sin;
//     particle1.velocity.y = V1x * theta.sin + V1y * theta.cos;

//     particle2.velocity.x = V2x * theta.cos + V2y * theta.sin;
//     particle2.velocity.y = V2x * theta.sin + V2y * theta.cos;
// }

// function calculateDegree(deltaX, deltaY) {
//     const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//     const sin = deltaY / distance;
//     const cos = deltaX / distance;

//     return {sin, cos};
// }


// function collusionVelocity(u1, u2, m1, m2) {
//     return (u1 * (m1 - m2) + 2 * m2 * u2) / (m1 + m2);
// }