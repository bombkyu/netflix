!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:r})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){},function(e,t,n){"use strict";n.r(t);n(0);const r=document.querySelector(".js-header"),o=document.querySelector(".js-video"),s=document.querySelector(".js-muteBtn"),l=document.querySelector(".js-playBtn"),a=document.querySelector(".js-volumeRange"),c=document.querySelector(".js-header__others-search"),u=(document.querySelector(".js-search"),document.querySelector(".js-search-form"));o.onended=(()=>{l.innerHTML="Play"});(()=>{const e=localStorage.getItem("muted");a.value=o.volume,"true"===e?(o.muted=!0,a.value=0,s.innerHTML="Unmute"):(o.muted=!1,s.innerHTML="mute")})(),s.addEventListener("click",()=>{o.muted?(o.muted=!1,s.innerHTML="mute",a.value=o.volume,localStorage.setItem("muted",!1)):(o.muted=!0,s.innerHTML="Unmute",a.value=0,localStorage.setItem("muted",!0))}),l.addEventListener("click",()=>{o.paused?(o.play(),l.innerHTML="Pause"):(o.pause(),l.innerHTML="Play")}),a.addEventListener("change",e=>{o.volume=e.target.value}),c.addEventListener("click",e=>{console.log(e.target);const t=e.target.className;console.log(t),t.includes("fa-search")?c.innerHTML='\n        <form class="js-search-form">\n        <i class="fa fa-times fa-lg js-searchCloseBtn"></i>\n        <input class="js-search open" type="text" placeholder="Title, peple, genres" />\n        </form>':t.includes("js-searchCloseBtn")&&(c.innerHTML='<i class="fa fa-search fa-lg"></i>')}),window.addEventListener("scroll",e=>{const t=window.scrollY;t>20?r.classList.add("black"):r.classList.remove("black"),t>500?(o.pause(),l.innerHTML="Play"):(o.play(),o.onplay=(()=>{l.innerHTML="Pause"}))}),u.addEventListener("submit",e=>{console.log("hello!"),e.preventDefault()})}]);