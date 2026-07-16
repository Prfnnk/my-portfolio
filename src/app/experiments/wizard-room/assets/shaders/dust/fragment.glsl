varying float vAlpha;

void main() {
    float dist = distance(gl_PointCoord, vec2(0.5));
    if(dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.1, dist);

    gl_FragColor = vec4(0.9, 0.95, 1.0, alpha * vAlpha * 0.25);
  }