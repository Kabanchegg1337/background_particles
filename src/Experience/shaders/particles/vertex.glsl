uniform float uTime;
uniform float uSize;

attribute float aProgress;
attribute float aSize;
attribute float aAlpha;

varying float vAlpha;

#pragma glslify: perlin3d = require('../partials/perlin3d.glsl')

void main(){
    vAlpha = aAlpha;
    float progress = mod(aProgress + uTime * 0.00005, 1.);

    vec4 modelPosition = modelMatrix * vec4(position, 1.);
    
    modelPosition.y += progress * 10.;
    modelPosition.x += perlin3d(modelPosition.xyz * 0.2) * 3.;

    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = uSize * aSize;
    gl_PointSize *= (1.0 / - viewPosition.z);
}