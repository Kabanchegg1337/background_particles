varying vec2 vUv;

uniform vec3 uColor;
uniform float uMultiplier;
uniform float uOffset;

void main(){
    float alpha = length(vUv - 0.5);
    alpha += uOffset;
    alpha *= uMultiplier;
    gl_FragColor = vec4(uColor, alpha);
}