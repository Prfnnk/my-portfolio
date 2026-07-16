varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

void main()
{
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);
  float edgeFade = dot(normal, viewDir);
  edgeFade = pow(max(0.0, edgeFade), 2.0); 

  float verticalFade = smoothstep(0.0, 0.7, vUv.y);

  float finalAlpha = edgeFade * verticalFade;

  vec3 moonColor = vec3(0.75, 0.82, 0.95);

  gl_FragColor = vec4(moonColor, finalAlpha * 0.35);
  #include <colorspace_fragment>
}