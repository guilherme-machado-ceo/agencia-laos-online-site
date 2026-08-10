(function(){
    'use strict';
    var isTouch=('ontouchstart'in window)||navigator.maxTouchPoints>0;
    var prefersReduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.goTo=function(id,sectionId){
        document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active')});
        var target=document.getElementById('page-'+id);
        if(target){target.classList.add('active')}
        window.scrollTo(0,0);
        setTimeout(function(){initReveals();initWords();if(sectionId){setTimeout(function(){var el=document.getElementById(sectionId);if(el)el.scrollIntoView({behavior:'smooth',block:'start'})},150)}},80);
        var h=target?target.querySelector('.hero'):null;
        if(h&&!prefersReduced){h.classList.remove('in');requestAnimationFrame(function(){setTimeout(function(){h.classList.add('in')},200)})}
        else if(h){h.classList.add('in')}
    };
    window.closeMobile=function(){var mm=document.getElementById('mobileMenu');var nt=document.getElementById('navToggle');if(mm&&nt){mm.classList.remove('open');nt.classList.remove('active');nt.setAttribute('aria-expanded','false');mm.setAttribute('aria-hidden','true');document.body.style.overflow='';document.querySelectorAll('.mobile-menu__item--dropdown.open').forEach(function(li){li.classList.remove('open');var b=li.querySelector('.mobile-menu__toggle');if(b)b.setAttribute('aria-expanded','false')})}};
    window.toggleMobileSub=function(btn){var li=btn.parentElement;var isOpen=li.classList.contains('open');li.classList.toggle('open');btn.setAttribute('aria-expanded',String(!isOpen))};

    var nav=document.getElementById('nav');var ticking=false;
    function updateNav(){if(nav)nav.classList.toggle('scrolled',window.scrollY>100);ticking=false}
    window.addEventListener('scroll',function(){if(!ticking){requestAnimationFrame(updateNav);ticking=true}},{passive:true});

    var navToggle=document.getElementById('navToggle');var mobileMenu=document.getElementById('mobileMenu');
    if(navToggle&&mobileMenu){navToggle.addEventListener('click',function(){var isOpen=mobileMenu.classList.contains('open');mobileMenu.classList.toggle('open');navToggle.classList.toggle('active');navToggle.setAttribute('aria-expanded',String(!isOpen));mobileMenu.setAttribute('aria-hidden',String(isOpen));document.body.style.overflow=isOpen?'':'hidden'})}

    var hero=document.querySelector('.page.active .hero');
    if(hero&&!prefersReduced){requestAnimationFrame(function(){setTimeout(function(){hero.classList.add('in')},200)})}else if(hero){hero.classList.add('in')}

    function splitWords(el){var text=el.textContent.trim();var words=text.split(/\\s+/);el.innerHTML='';words.forEach(function(w,i){var s=document.createElement('span');s.className='word';s.textContent=w;if(!prefersReduced)s.style.transitionDelay=(i*60)+'ms';el.appendChild(s);if(i<words.length-1)el.appendChild(document.createTextNode(' '))});return el.querySelectorAll('.word')}
    var wordMap=[];
    function initWords(){wordMap=[];document.querySelectorAll('.page.active [data-words]').forEach(function(el){if(el.closest('.hero')){var sp=splitWords(el);if(!prefersReduced){setTimeout(function(){sp.forEach(function(s){s.classList.add('in')})},600)}else{sp.forEach(function(s){s.classList.add('in')})}return}var sp=splitWords(el);wordMap.push({el:el,spans:sp,fired:false})});if(!prefersReduced&&wordMap.length){var wo=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){wordMap.forEach(function(item){if(item.el===e.target&&!item.fired){item.fired=true;item.spans.forEach(function(s){s.classList.add('in')})}});wo.unobserve(e.target)}})},{threshold:0.25,rootMargin:'0px 0px -40px 0px'});wordMap.forEach(function(item){wo.observe(item.el)})}else{wordMap.forEach(function(item){item.spans.forEach(function(s){s.classList.add('in')})})}}
    initWords();

    function initReveals(){var els=document.querySelectorAll('.page.active .reveal,.page.active .drift-left,.page.active .drift-right');if(prefersReduced){els.forEach(function(el){el.classList.add('in')});return}var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');obs.unobserve(e.target)}})},{threshold:0.2,rootMargin:'0px 0px -60px 0px'});els.forEach(function(el){el.classList.remove('in');obs.observe(el)})}
    initReveals();

    document.querySelectorAll('.accordion').forEach(function(acc){var trigger=acc.querySelector('.accordion__trigger');var body=acc.querySelector('.accordion__body');if(!trigger||!body)return;trigger.addEventListener('click',function(){var isOpen=acc.classList.contains('open');if(isOpen){body.style.maxHeight=body.scrollHeight+'px';body.offsetHeight;body.style.maxHeight='0';body.style.opacity='0';acc.classList.remove('open');trigger.setAttribute('aria-expanded','false')}else{var par=acc.parentElement;if(par)par.querySelectorAll('.accordion.open').forEach(function(other){if(other!==acc){var ob=other.querySelector('.accordion__body');if(ob){ob.style.maxHeight=ob.scrollHeight+'px';ob.offsetHeight;ob.style.maxHeight='0';ob.style.opacity='0'}other.classList.remove('open');var ot=other.querySelector('.accordion__trigger');if(ot)ot.setAttribute('aria-expanded','false')}});acc.classList.add('open');trigger.setAttribute('aria-expanded','true');body.style.maxHeight=body.scrollHeight+'px';body.style.opacity='1';setTimeout(function(){if(acc.classList.contains('open'))body.style.maxHeight='none'},700)}})});

    if(!isTouch&&!prefersReduced){var c=document.createElement('div');c.className='cursor-brackets';c.innerHTML='<svg viewBox=\"0 0 40 40\" fill=\"none\"><path class=\"bl\" d=\"M12 8L6 20L12 32\" stroke=\"#F8DE7E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/><path class=\"br\" d=\"M28 8L34 20L28 32\" stroke=\"#F8DE7E\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>';document.body.appendChild(c);var cx=0,cy=0,tx=0,ty=0,cVis=false;document.addEventListener('mousemove',function(e){tx=e.clientX;ty=e.clientY;if(!cVis){cVis=true;c.classList.add('visible');cx=tx;cy=ty}});document.addEventListener('mouseleave',function(){cVis=false;c.classList.remove('visible')});(function loop(){cx+=(tx-cx)*0.08;cy+=(ty-cy)*0.08;c.style.transform='translate3d('+(cx-20)+'px,'+(cy-20)+'px,0)';requestAnimationFrame(loop)})();var ints='a,button,.card,.accordion__trigger,input,textarea,[role=\"button\"]';document.addEventListener('mouseover',function(e){if(e.target.closest(ints))c.classList.add('expanded')});document.addEventListener('mouseout',function(e){if(e.target.closest(ints))c.classList.remove('expanded')})}

    var sb=document.getElementById('stickyBar');var h=document.getElementById('hero');
    if(sb&&h){new IntersectionObserver(function(entries){entries.forEach(function(e){sb.classList.toggle('visible',!e.isIntersecting)})},{threshold:0}).observe(h)}

    var cb=document.getElementById('cookieBanner');var ca=document.getElementById('cookieAccept');
    if(cb&&!localStorage.getItem('laos_cookies')){setTimeout(function(){cb.classList.add('visible')},1500)}
    if(ca){ca.addEventListener('click',function(){localStorage.setItem('laos_cookies','1');cb.classList.remove('visible')})}

    if(!prefersReduced){var pt=false;window.addEventListener('scroll',function(){if(!pt){requestAnimationFrame(function(){document.querySelectorAll('[data-parallax]').forEach(function(el){var r=el.getBoundingClientRect();var off=(r.top+r.height/2-window.innerHeight/2)*0.15;el.style.transform='translate3d(0,'+off+'px,0)'});pt=false});pt=true}},{passive:true})}

    /* SHADER — hero background (LAOS brand palette, speed +20%) */
    (function(){
        var shaderCanvas=document.getElementById('shaderBg');
        if(!shaderCanvas||prefersReduced)return;
        var gl=shaderCanvas.getContext('webgl',{antialias:false});
        if(!gl)return;

        var VERT='attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.0,1.0);}';
        var FRAG='#ifdef GL_FRAGMENT_PRECISION_HIGH\
precision highp float;\
#else\
precision mediump float;\
#endif\
uniform vec3 u_colors[8];uniform vec4 u_scene;uniform vec4 u_shape;uniform vec4 u_surface;uniform vec4 u_finish;uniform vec4 u_transform;uniform vec4 u_space;\
#define u_resolution u_scene.xy\
#define u_time u_scene.z\
#define u_colorCount u_scene.w\
#define u_scale u_shape.x\
#define u_intensity u_shape.y\
#define u_warp u_shape.w\
#define u_detail u_surface.x\
#define u_contrast u_surface.y\
#define u_brightness u_surface.z\
#define u_saturation u_surface.w\
#define u_hue u_finish.x\
#define u_vignette u_finish.y\
#define u_blur u_finish.z\
#define u_grain u_finish.w\
#define u_seed u_transform.x\
#define u_rotate u_transform.y\
#define u_drift u_transform.z\
#define u_offset u_space.xy\
float hash21(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}\
float grainHash(vec2 p){vec3 p3=fract(vec3(p.xyx)*0.1031);p3+=dot(p3,p3.yzx+33.33);return fract((p3.x+p3.y)*p3.z);}\
float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);return mix(mix(hash21(i),hash21(i+vec2(1.0,0.0)),u.x),mix(hash21(i+vec2(0.0,1.0)),hash21(i+vec2(1.0,1.0)),u.x),u.y);}\
float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+vec2(17.0,9.2);a*=0.5;}return v;}\
vec3 hueRotate(vec3 col,float a){const mat3 toYIQ=mat3(0.299,0.596,0.211,0.587,-0.274,-0.523,0.114,-0.322,0.312);const mat3 toRGB=mat3(1.0,1.0,1.0,0.956,-0.272,-1.106,0.621,-0.647,1.703);vec3 yiq=toYIQ*col;float ca=cos(a),sa=sin(a);yiq=vec3(yiq.x,yiq.y*ca-yiq.z*sa,yiq.y*sa+yiq.z*ca);return toRGB*yiq;}\
vec3 shade(vec2 uv,vec2 p,float t){vec3 acc=u_colors[0]*0.15;float total=0.15;for(int i=0;i<8;i++){if(float(i)>=u_colorCount)break;float fi=float(i);vec2 c=vec2(sin(t*(0.21+fi*0.071)+fi*2.4+u_seed),cos(t*(0.17+fi*0.093)+fi*1.7))*(0.45+u_intensity*0.35);float w=exp(-dot(p-c,p-c)*6.0);acc+=u_colors[i]*w;total+=w;}return acc/total;}\
void main(){vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec2 screenUv=uv;vec2 p=(gl_FragCoord.xy-0.5*u_resolution.xy)/min(u_resolution.x,u_resolution.y);uv=p*min(u_resolution.x,u_resolution.y)/u_resolution.xy+0.5;p*=u_scale;if(abs(u_rotate)>0.0001){float cr=cos(u_rotate),sr=sin(u_rotate);p=mat2(cr,-sr,sr,cr)*p;}p+=u_offset;if(u_drift>0.0001)p+=u_drift*vec2(sin(u_time*0.31),cos(u_time*0.23));if(u_warp>0.0){p+=u_warp*(vec2(fbm(p*u_detail+u_seed),fbm(p*u_detail+vec2(5.2,1.3)))-0.5);}vec3 col;if(u_blur>0.0){float e=u_blur;float pe=e*u_scale;vec2 uvE=vec2(e)*min(u_resolution.x,u_resolution.y)/u_resolution.xy;col=shade(uv,p,u_time)*0.36;col+=shade(uv+vec2(uvE.x,0.0),p+vec2(pe,0.0),u_time)*0.16;col+=shade(uv-vec2(uvE.x,0.0),p-vec2(pe,0.0),u_time)*0.16;col+=shade(uv+vec2(0.0,uvE.y),p+vec2(0.0,pe),u_time)*0.16;col+=shade(uv-vec2(0.0,uvE.y),p-vec2(0.0,pe),u_time)*0.16;}else{col=shade(uv,p,u_time);}if(abs(u_contrast-1.0)>0.0001)col=(col-0.5)*u_contrast+0.5;if(abs(u_saturation-1.0)>0.0001){float luma=dot(col,vec3(0.299,0.587,0.114));col=mix(vec3(luma),col,u_saturation);}if(abs(u_hue)>0.0001)col=hueRotate(col,u_hue);if(abs(u_brightness)>0.0001)col+=u_brightness;if(u_vignette>0.0001){float vd=length(screenUv-0.5)*1.41421356;col*=1.0-u_vignette*smoothstep(0.35,1.0,vd);}if(u_grain>0.0001)col+=(grainHash(gl_FragCoord.xy+vec2(u_seed*17.0,u_seed*31.0))-0.5)*u_grain;gl_FragColor=vec4(clamp(col,0.0,1.0),1.0);}';

        var CFG={
            colors:[[0.047,0.035,0.043],[0.18,0.08,0.09],[0.353,0.165,0.165],[0.48,0.38,0.24]],
            colorCount:4,scale:1.2,intensity:0.50,paramA:0.67,warp:0.18,detail:2.0,
            contrast:1.15,brightness:-0.03,saturation:0.85,hue:0,vignette:0.30,
            blur:0.006,grain:0.05,seed:5069,rotate:2.7,offsetX:0.09,offsetY:0.15,
            drift:0.10,timeScale:-0.72
        };

        var compile=function(type,src){var s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);return s};
        var program=gl.createProgram();
        var vs=compile(gl.VERTEX_SHADER,VERT);var fs=compile(gl.FRAGMENT_SHADER,FRAG);
        gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
        gl.deleteShader(vs);gl.deleteShader(fs);gl.useProgram(program);

        var buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);
        gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
        var loc=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(loc);
        gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);

        var uni={colors:gl.getUniformLocation(program,'u_colors'),scene:gl.getUniformLocation(program,'u_scene'),shape:gl.getUniformLocation(program,'u_shape'),surface:gl.getUniformLocation(program,'u_surface'),finish:gl.getUniformLocation(program,'u_finish'),transform:gl.getUniformLocation(program,'u_transform'),space:gl.getUniformLocation(program,'u_space'),cursor:gl.getUniformLocation(program,'u_cursor')};
        gl.uniform3fv(uni.colors,new Float32Array(CFG.colors.flat()));
        gl.uniform4f(uni.shape,CFG.scale,CFG.intensity,CFG.paramA,CFG.warp);
        gl.uniform4f(uni.surface,CFG.detail,CFG.contrast,CFG.brightness,CFG.saturation);
        gl.uniform4f(uni.finish,CFG.hue,CFG.vignette,CFG.blur,CFG.grain);
        gl.uniform4f(uni.transform,CFG.seed,CFG.rotate,CFG.drift,0);
        gl.uniform4f(uni.cursor,0,0,0,0);

        var raf=0,lastNow=null,start=performance.now(),disposed=false;
        var visible=document.visibilityState==='visible',inView=true;

        function resize(){var dpr=Math.min(window.devicePixelRatio||1,2);var rect=shaderCanvas.getBoundingClientRect();var rawW=Math.max(1,Math.round(rect.width*dpr));var rawH=Math.max(1,Math.round(rect.height*dpr));var ps=Math.min(1,Math.sqrt(2000000/Math.max(1,rawW*rawH)));var w=Math.max(1,Math.round(rawW*ps));var h2=Math.max(1,Math.round(rawH*ps));if(shaderCanvas.width!==w||shaderCanvas.height!==h2){shaderCanvas.width=w;shaderCanvas.height=h2;gl.viewport(0,0,w,h2)}}
        function requestRender(){if(!disposed&&visible&&inView&&raf===0)raf=requestAnimationFrame(render)}
        function render(now){raf=0;if(disposed||!visible||inView===false)return;var dt=lastNow===null?0:Math.min((now-lastNow)/1000,0.1);lastNow=now;resize();gl.uniform4f(uni.scene,shaderCanvas.width,shaderCanvas.height,((now-start)/1000)*CFG.timeScale,CFG.colorCount);gl.uniform4f(uni.space,CFG.offsetX,CFG.offsetY,0,0);gl.drawArrays(gl.TRIANGLES,0,3);if(Math.abs(CFG.timeScale)>0.0001)requestRender();else lastNow=null;}
        requestRender();
        var ro=new ResizeObserver(function(){resize();requestRender()});ro.observe(shaderCanvas);
        var io=new IntersectionObserver(function(e){inView=e[0]?e[0].isIntersecting:true;if(inView)requestRender();else if(raf){cancelAnimationFrame(raf);raf=0;lastNow=null}});io.observe(shaderCanvas);
        document.addEventListener('visibilitychange',function(){visible=document.visibilityState==='visible';if(visible)requestRender();else if(raf){cancelAnimationFrame(raf);raf=0;lastNow=null}});
    })();

})();