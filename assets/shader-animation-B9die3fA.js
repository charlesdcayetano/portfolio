import{n as e}from"./rolldown-runtime-CbXtAM7H.js";import{a as t,c as n,dt as r,et as i,i as a,n as o,o as s,r as c,s as l,t as u}from"./vendor-9jbslocb.js";var d=e(r(),1),f=i(),p=`
  void main() {
    gl_Position = vec4( position, 1.0 );
  }
`,m=`
  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform vec3 tintColor;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time * 0.05;
    float lineWidth = 0.0018;

    float intensity = 0.0;
    for (int i = 0; i < 5; i++) {
      intensity += lineWidth * float(i * i) / abs(fract(t - 0.01 + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
    }

    intensity = clamp(intensity, 0.0, 1.0);
    gl_FragColor = vec4(tintColor, intensity * 0.55);
  }
`;function h(){let e=(0,d.useRef)(null),[r,i]=(0,d.useState)(()=>document.documentElement.classList.contains(`dark`));return(0,d.useEffect)(()=>{let e=new MutationObserver(()=>{i(document.documentElement.classList.contains(`dark`))});return e.observe(document.documentElement,{attributes:!0,attributeFilter:[`class`]}),()=>e.disconnect()},[]),(0,d.useEffect)(()=>{let i=e.current;if(!i||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let d=r?new c(16561984):new c(16096779),f=new o;f.position.z=1;let h=new s,g=new t(2,2),_={time:{value:1},resolution:{value:new n},tintColor:{value:d}},v=new l({uniforms:_,vertexShader:p,fragmentShader:m,transparent:!0}),y=new a(g,v);h.add(y);let b=new u({antialias:!0,alpha:!0});b.setPixelRatio(Math.min(window.devicePixelRatio,2)),i.appendChild(b.domElement);let x=()=>{let e=i.clientWidth,t=i.clientHeight;b.setSize(e,t),_.resolution.value.x=b.domElement.width,_.resolution.value.y=b.domElement.height};x(),window.addEventListener(`resize`,x);let S,C=()=>{S=requestAnimationFrame(C),_.time.value+=.05,b.render(h,f)};return C(),()=>{window.removeEventListener(`resize`,x),cancelAnimationFrame(S),i.contains(b.domElement)&&i.removeChild(b.domElement),b.dispose(),g.dispose(),v.dispose()}},[r]),(0,f.jsx)(`div`,{ref:e,"aria-hidden":`true`,className:`pointer-events-none fixed inset-0 -z-10`})}export{h as default};