varying vec3 vPosition;

uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

// 2D rotation matrix
vec2 rotate2d(vec2 value, float angle)
{
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c) * value;
}

void main()
{
  // Clone the position to avoid modifying the original vPosition
  vec3 rotatedPos = vPosition;
  // Calc the angle based on time
  // 0.15 — speed of roration
  float rotationAngle = uTime * 0.15; 

  // Rotate around Y axis
  rotatedPos.xz = rotate2d(rotatedPos.xz, rotationAngle);

  // Displacement
  vec3 displacementOffset = vec3(0.0, uTime * 0.15, uTime * 0.2);
  vec3 displacedPos = rotatedPos + cnoise(rotatedPos * 5.0 + displacementOffset) * 0.25;

  // Calc perlin noise pattern
  vec3 patternOffset = vec3(uTime * 0.1, uTime * 0.1, 0.0);
  float strength = cnoise(displacedPos * 2.0 + patternOffset);

  // Add contrast
  float pattern = smoothstep(0.0, 0.4, strength);

  // Color mix
  vec3 color = mix(uColorStart, uColorEnd, pattern);

  gl_FragColor = vec4(color, 1.0);
  #include <colorspace_fragment>
}