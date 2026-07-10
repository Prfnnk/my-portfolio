varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewDir;

// uTime можно убрать совсем, если не делаешь эффект "дыхания"

void main()
{
  // 1. Мягкие края (Френель) — считается очень быстро
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewDir);
  float edgeFade = dot(normal, viewDir);
  edgeFade = pow(max(0.0, edgeFade), 2.0); 

  // 2. Вертикальный спад света
  float verticalFade = smoothstep(0.0, 0.7, vUv.y);

  // Никакого cnoise! Только чистая, легкая математика градиентов
  float finalAlpha = edgeFade * verticalFade;

  vec3 moonColor = vec3(0.75, 0.82, 0.95);

  gl_FragColor = vec4(moonColor, finalAlpha * 0.35);
  #include <colorspace_fragment>
}