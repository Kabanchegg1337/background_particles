varying vec2 vUv;
uniform sampler2D uTexture;

varying float vAlpha;

void main() {
    float textureStrength = texture2D(uTexture, gl_PointCoord).r;

    gl_FragColor = vec4(1., 1., 1., textureStrength * vAlpha);
}