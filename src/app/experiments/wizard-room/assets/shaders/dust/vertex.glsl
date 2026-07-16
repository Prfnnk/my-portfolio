uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

varying float vAlpha;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    
    // Add floating movement animation
    modelPosition.y += sin(uTime * 0.005 + modelPosition.x * 100.0) * aScale * 1.5;
    modelPosition.x += cos(uTime * 0.003 + modelPosition.z * 100.0) * aScale * 1.2;
    modelPosition.z += sin(uTime * 0.008 + modelPosition.y * 100.0) * aScale * 1.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    
    // Size attenuation (perspective)
    gl_PointSize = uSize * aScale * uPixelRatio;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Calc alpha for each particle based on its scale
    vAlpha = sin(uTime * 0.2 * (1.0 + aScale * 2.0) + modelPosition.x * 100.0) * 0.5 + 0.5;
}