'use client';

import { useEffect, useRef } from 'react';
import { live } from '@/lib/store';

/**
 * Fixed cinematic backdrop for the whole site: a minimal, slow WebGL smoke / fog
 * in deep reds. Drifts on its own, swirls gently around the cursor, and rises as you scroll.
 */
const VERT = `#version 300 es
in vec2 a; void main(){ gl_Position = vec4(a, 0., 1.); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes; uniform float uT; uniform vec2 uM; uniform float uS; uniform float uI;
out vec4 o;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for(int i = 0; i < 4; i++){ v += a*n(p); p = m*p; a *= .5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv; p.x *= uRes.x / uRes.y;
  float t = uT * .03;
  vec2 m = uM; m.x *= uRes.x / uRes.y;
  float md = smoothstep(.55, 0., distance(p, m));
  vec2 q = vec2(fbm(p*1.3 + vec2(t, -t*.5) + vec2(0., -uS)), fbm(p*1.3 + vec2(-t*.7, t) + 5.2));
  q += normalize(p - m + 1e-4) * md * .35;
  float f = fbm(p*1.7 + q*2.1 + vec2(t*1.3, -uS*.7));
  // keep it minimal: smoke lives low and at the edges, centre stays clean
  float low = smoothstep(.9, .0, uv.y);
  float edge = smoothstep(.45, 1., abs(uv.x - .5) * 2.);
  float mask = clamp(low * .8 + edge * .45 + md * .25, 0., 1.);
  float d = smoothstep(.38, .95, f) * mask;
  vec3 deep = vec3(.16, .0, .015);
  vec3 red  = vec3(.9, .035, .08);
  vec3 col = mix(deep, red, smoothstep(.6, 1., f) * .5) * d * uI;
  // faint warm key light behind the character
  col += vec3(.5, .0, .03) * .10 * smoothstep(.75, .0, distance(uv, vec2(.6, .45))) * uI;
  o = vec4(col, 1.);
}`;

export default function Backdrop() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!;
    const gl = cv.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U('uRes'), uT = U('uT'), uM = U('uM'), uS = U('uS'), uI = U('uI');

    const SCALE = 0.33; // render small, CSS upscales: smoke is soft anyway
    const resize = () => {
      cv.width = Math.max(2, Math.round(window.innerWidth * SCALE));
      cv.height = Math.max(2, Math.round(window.innerHeight * SCALE));
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    window.addEventListener('resize', resize);

    let raf = 0;
    let mx = 0.5, my = 0.5, s = 0, inten = 0;
    const start = performance.now();
    const loop = () => {
      const tx = (live.mouse.x + 1) / 2;
      const ty = 1 - (live.mouse.y + 1) / 2;
      mx += (tx - mx) * 0.04;
      my += (ty - my) * 0.04;
      s += (window.scrollY / window.innerHeight * 0.35 - s) * 0.06;
      const target = 1;
      inten += (target - inten) * 0.02;
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uT, (performance.now() - start) / 1000);
      gl.uniform2f(uM, mx, my);
      gl.uniform1f(uS, s);
      gl.uniform1f(uI, inten);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <div className="backdrop" aria-hidden>
      <canvas ref={ref} className="fog" />
      <div className="bd-vignette" />
    </div>
  );
}
