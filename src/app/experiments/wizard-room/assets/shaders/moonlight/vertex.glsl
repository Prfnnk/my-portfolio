varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;

    vUv = uv;
    vNormal = (modelMatrix * vec4(normal, 0.0)).xyz;
    vViewDir = cameraPosition - modelPosition.xyz;
}