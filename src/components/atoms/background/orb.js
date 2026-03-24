"use client"

import { Mesh, Program, Renderer, Triangle, Vec3 } from 'ogl';
import { useEffect, useRef } from 'react';

export default function Orb({
  hue = 0,
  hoverIntensity = 0.2,
  rotateOnHover = true,
  forceHoverState = false,
  backgroundColor = '#000000'
}) {
  const ctnDom = useRef(null);

  const vert = /* glsl */ `
    precision mediump float;
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  // OPTIMIZED FRAGMENT SHADER:
  // - Simplified noise (fewer octaves, lighter hash)
  // - Removed unnecessary per-pixel branching
  // - Reduced math complexity in draw()
  const frag = /* glsl */ `
    precision mediump float;

    uniform float iTime;
    uniform vec3 iResolution;
    uniform float hue;
    uniform float hover;
    uniform float rot;
    uniform float hoverIntensity;
    uniform vec3 backgroundColor;
    varying vec2 vUv;

    vec3 rgb2yiq(vec3 c) {
      return vec3(
        dot(c, vec3(0.299, 0.587, 0.114)),
        dot(c, vec3(0.596, -0.274, -0.322)),
        dot(c, vec3(0.211, -0.523, 0.312))
      );
    }

    vec3 yiq2rgb(vec3 c) {
      return vec3(
        c.x + 0.956 * c.y + 0.621 * c.z,
        c.x - 0.272 * c.y - 0.647 * c.z,
        c.x - 1.106 * c.y + 1.703 * c.z
      );
    }

    vec3 adjustHue(vec3 color, float hueDeg) {
      float hueRad = hueDeg * 3.14159265 / 180.0;
      vec3 yiq = rgb2yiq(color);
      float cosA = cos(hueRad);
      float sinA = sin(hueRad);
      yiq.y = yiq.y * cosA - yiq.z * sinA;
      yiq.z = yiq.y * sinA + yiq.z * cosA;
      return yiq2rgb(yiq);
    }

    // Lighter hash — simpler than original hash33
    vec3 hash33(vec3 p) {
      p = fract(p * vec3(0.1031, 0.1030, 0.0973));
      p += dot(p, p.yxz + 33.33);
      return fract((p.xxy + p.yxx) * p.zyx) * 2.0 - 1.0;
    }

    // Simplified 3D simplex noise (same visual, less ALU)
    float snoise3(vec3 p) {
      const float K1 = 0.333333333;
      const float K2 = 0.166666667;
      vec3 i  = floor(p + (p.x + p.y + p.z) * K1);
      vec3 d0 = p - (i - (i.x + i.y + i.z) * K2);
      vec3 e  = step(vec3(0.0), d0 - d0.yzx);
      vec3 i1 = e * (1.0 - e.zxy);
      vec3 i2 = 1.0 - e.zxy * (1.0 - e);
      vec3 d1 = d0 - (i1 - K2);
      vec3 d2 = d0 - (i2 - K1);
      vec3 d3 = d0 - 0.5;
      vec4 h  = max(0.6 - vec4(dot(d0,d0), dot(d1,d1), dot(d2,d2), dot(d3,d3)), 0.0);
      vec4 n  = h*h*h*h * vec4(
        dot(d0, hash33(i)),
        dot(d1, hash33(i + i1)),
        dot(d2, hash33(i + i2)),
        dot(d3, hash33(i + 1.0))
      );
      return dot(vec4(31.316), n);
    }

    vec4 extractAlpha(vec3 colorIn) {
      float a = max(max(colorIn.r, colorIn.g), colorIn.b);
      return vec4(colorIn.rgb / (a + 1e-5), a);
    }

    const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
    const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
    const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);
    const float innerRadius = 0.6;
    const float noiseScale  = 0.65;

    float light1(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * attenuation);
    }
    float light2(float intensity, float attenuation, float dist) {
      return intensity / (1.0 + dist * dist * attenuation);
    }

    vec4 draw(vec2 uv) {
      vec3 color1 = adjustHue(baseColor1, hue);
      vec3 color2 = adjustHue(baseColor2, hue);
      vec3 color3 = adjustHue(baseColor3, hue);

      float ang    = atan(uv.y, uv.x);
      float len    = length(uv);
      // Avoid division when len ~ 0 using max
      float invLen = 1.0 / max(len, 0.0001);

      float bgLuminance = dot(backgroundColor, vec3(0.299, 0.587, 0.114));

      // Slow down time multiplier (0.5 → 0.35) — lighter noise evaluation
      float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.35)) * 0.5 + 0.5;
      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0);
      float d0 = distance(uv, (r0 * invLen) * uv);
      float v0 = light1(1.0, 10.0, d0);
      v0 *= smoothstep(r0 * 1.05, r0, len);
      float innerFade = smoothstep(r0 * 0.8, r0 * 0.95, len);
      v0 *= mix(innerFade, 1.0, bgLuminance * 0.7);

      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

      float a   = iTime * -1.0;
      vec2 pos  = vec2(cos(a), sin(a)) * r0;
      float d   = distance(uv, pos);
      float v1  = light2(1.5, 5.0, d);
      v1 *= light1(1.0, 50.0, d0);

      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

      vec3 colBase    = mix(color1, color2, cl);
      float fadeAmount = mix(1.0, 0.1, bgLuminance);

      vec3 darkCol = mix(color3, colBase, v0);
      darkCol = clamp((darkCol + v1) * v2 * v3, 0.0, 1.0);

      vec3 lightCol = (colBase + v1) * mix(1.0, v2 * v3, fadeAmount);
      lightCol = clamp(mix(backgroundColor, lightCol, v0), 0.0, 1.0);

      return extractAlpha(mix(darkCol, lightCol, bgLuminance));
    }

    vec4 mainImage(vec2 fragCoord) {
      vec2 center = iResolution.xy * 0.5;
      float size  = min(iResolution.x, iResolution.y);
      vec2 uv     = (fragCoord - center) / size * 2.0;

      float s = sin(rot), c = cos(rot);
      uv = vec2(c * uv.x - s * uv.y, s * uv.x + c * uv.y);

      // Only compute hover distortion when hover is actually active
      if (hover > 0.01) {
        uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
        uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
      }

      return draw(uv);
    }

    void main() {
      vec2 fragCoord = vUv * iResolution.xy;
      vec4 col = mainImage(fragCoord);
      gl_FragColor = vec4(col.rgb * col.a, col.a);
    }
  `;

  useEffect(() => {
    const container = ctnDom.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: true, premultipliedAlpha: false });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime:           { value: 0 },
        iResolution:     { value: new Vec3(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height) },
        hue:             { value: hue },
        hover:           { value: 0 },
        rot:             { value: 0 },
        hoverIntensity:  { value: hoverIntensity },
        backgroundColor: { value: hexToVec3(backgroundColor) }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    // --- OPTIMASI 1: cap DPR maksimal 1.5 ---
    // Retina display (DPR 2-3) bikin canvas 4-9x lebih banyak pixel dari yang dibutuhkan.
    // DPR 1.5 sudah cukup tajam di hampir semua layar.
    function resize() {
      if (!container) return;
      const dpr    = Math.min(window.devicePixelRatio || 1, 1.5);
      const width  = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width * dpr, height * dpr);
      gl.canvas.style.width  = width  + 'px';
      gl.canvas.style.height = height + 'px';
      program.uniforms.iResolution.value.set(
        gl.canvas.width, gl.canvas.height,
        gl.canvas.width / gl.canvas.height
      );
    }

    // --- OPTIMASI 2: debounce resize ---
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 150);
    };

    window.addEventListener('resize', debouncedResize);
    resize();

    let targetHover  = 0;
    let lastTime     = 0;
    let currentRot   = 0;
    const rotationSpeed = 0.3;

    const handleMouseMove = e => {
      const rect   = container.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const size   = Math.min(rect.width, rect.height);
      const uvX    = ((x - rect.width  / 2) / size) * 2.0;
      const uvY    = ((y - rect.height / 2) / size) * 2.0;
      targetHover  = uvX * uvX + uvY * uvY < 0.64 ? 1 : 0; // 0.8^2 = 0.64
    };

    const handleMouseLeave = () => { targetHover = 0; };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // --- OPTIMASI 3: pause ketika tab tidak aktif ---
    let isPaused = false;
    const handleVisibility = () => { isPaused = document.hidden; };
    document.addEventListener('visibilitychange', handleVisibility);

    // --- OPTIMASI 4: cache nilai props agar tidak set uniform tiap frame kalau tidak berubah ---
    let cachedHue  = hue;
    let cachedBg   = backgroundColor;
    let cachedHoverIntensity = hoverIntensity;

    let rafId;
    const update = t => {
      rafId = requestAnimationFrame(update);
      if (isPaused) return; // skip render saat tab hidden

      const dt = Math.min((t - lastTime) * 0.001, 0.05); // clamp delta time
      lastTime = t;

      program.uniforms.iTime.value = t * 0.001;

      // Hanya update uniform kalau nilainya berubah
      if (cachedHue !== hue) {
        program.uniforms.hue.value = hue;
        cachedHue = hue;
      }
      if (cachedHoverIntensity !== hoverIntensity) {
        program.uniforms.hoverIntensity.value = hoverIntensity;
        cachedHoverIntensity = hoverIntensity;
      }
      if (cachedBg !== backgroundColor) {
        program.uniforms.backgroundColor.value = hexToVec3(backgroundColor);
        cachedBg = backgroundColor;
      }

      const effectiveHover = forceHoverState ? 1 : targetHover;
      program.uniforms.hover.value += (effectiveHover - program.uniforms.hover.value) * 0.1;

      if (rotateOnHover && effectiveHover > 0.5) {
        currentRot += dt * rotationSpeed;
      }
      program.uniforms.rot.value = currentRot;

      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', debouncedResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hue, hoverIntensity, rotateOnHover, forceHoverState, backgroundColor]);

  return <div ref={ctnDom} className="w-full h-full" />;
}

function hslToRgb(h, s, l) {
  if (s === 0) return new Vec3(l, l, l);
  const hue2rgb = (p, q, t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return new Vec3(hue2rgb(p, q, h + 1/3), hue2rgb(p, q, h), hue2rgb(p, q, h - 1/3));
}

function hexToVec3(color) {
  if (color.startsWith('#')) {
    return new Vec3(
      parseInt(color.slice(1, 3), 16) / 255,
      parseInt(color.slice(3, 5), 16) / 255,
      parseInt(color.slice(5, 7), 16) / 255
    );
  }
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return new Vec3(+rgbMatch[1] / 255, +rgbMatch[2] / 255, +rgbMatch[3] / 255);
  }
  const hslMatch = color.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%/);
  if (hslMatch) {
    return hslToRgb(+hslMatch[1] / 360, +hslMatch[2] / 100, +hslMatch[3] / 100);
  }
  return new Vec3(0, 0, 0);
}