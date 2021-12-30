varying vec2 vUv;
uniform sampler2D uTexture;
uniform vec3 uColor;

varying float vAlpha;

void main() {
    float textureStrength = texture2D(uTexture, gl_PointCoord).r;

    gl_FragColor = vec4(uColor, textureStrength * vAlpha);
}