(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{442:function(e,t,n){e.exports=n.p+"img/sgae.03350ec.png"},459:function(e,t,n){var content=n(482);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(11).default)("1b87a1fe",content,!0,{sourceMap:!1})},481:function(e,t,n){"use strict";n(459)},482:function(e,t,n){var r=n(10)(!1);r.push([e.i,".lobby[data-v-30108b83]{width:100vw;height:100vh;background-color:#313131;color:#fff;overflow-y:hidden;text-align:center}.lobby .front[data-v-30108b83]{transform:rotateY(0deg)}.lobby .back[data-v-30108b83]{transform:rotateY(180deg)}.lobby .upper[data-v-30108b83]{width:100vw;height:85vh}.lobby .upper .img-inner[data-v-30108b83]{width:100vw;height:auto;background-size:200% 200%;-webkit-animation:gradient 3s ease infinite;animation:gradient 3s ease infinite;perspective:1000px}.lobby .upper .img-inner img[data-v-30108b83]{margin-top:0;align-items:center;display:flex;width:20vw;height:17vw;min-width:200px;min-height:200px;position:relative;bottom:30px;transition:transform .8s;transform-style:preserve-3d}.lobby footer[data-v-30108b83]{width:100vw;height:15vh}@media screen and (max-width:580px){h1[data-v-30108b83]{font-size:18px}h3[data-v-30108b83]{font-size:14px}p[data-v-30108b83]{font-size:12px}}@media screen and (max-width:420px){h1[data-v-30108b83]{font-size:14px}h3[data-v-30108b83]{font-size:12px}p[data-v-30108b83]{font-size:11px}}",""]),e.exports=r},549:function(e,t,n){"use strict";n.r(t);var r=n(12),o=(n(66),n(42),{name:"lobby",layout:"login",middleware:"auth",data:function(){return{flip:!1,storaged:!1,counter:0}},methods:{flipper:function(){var e=this;null!==this.loggedUser&&void 0!==this.loggedUser&&this.counter++;var t=setTimeout((function(){e.flip=!e.flip,e.flipper()}),1e3);this.counter>4&&(clearTimeout(t),this.$router.push("/tarefas"))}},mounted:function(){this.flipper()},asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,l,c,d,f;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$axios,r=e.$auth,(o=r.$storage.getUniversal("actualUserStoraged"))&&(console.log("Storaged already defined"),console.log(o)),l=void 0+"/",t.next=6,n.get(l+"api/v1/users/me/");case 6:if(c=t.sent,d=null,!c){t.next=13;break}return t.next=11,n.get(l+"usuarios/"+c.data.id);case 11:f=t.sent,d=f.data.data;case 13:if(!d){t.next=17;break}return t.next=16,r.$storage.setUniversal("actualUserStoraged",d);case 16:return t.abrupt("return",{loggedUser:d});case 17:case"end":return t.stop()}}),t)})))()}}),l=(n(481),n(2)),component=Object(l.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{staticClass:"lobby p-d-flex p-flex-column p-jc-center p-ai-center"},[r("section",{staticClass:"upper p-d-flex p-flex-column p-jc-center p-ai-center"},[r("div",{staticClass:"img-inner p-d-flex p-flex-column p-jc-center p-ai-center"},[e.flip?r("img",{staticClass:"back",attrs:{src:n(442)}}):r("img",{staticClass:"front",attrs:{src:n(442)}})]),e._v(" "),e.loggedUser.nome?r("h1",[e._v("✨ "+e._s(e.loggedUser.nome.split(" ")[0])+", preparando seu ambiente! ✨")]):r("h1",[e._v("✨ Preparando seu ambiente! ✨")])]),e._v(" "),e._m(0),e._v(" "),r("div",{staticClass:"stars1"}),e._v(" "),r("div",{staticClass:"stars2"}),e._v(" "),r("div",{staticClass:"stars3"})])}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"p-d-flex p-flex-column p-jc-center p-ai-end"},[n("h3",[e._v("Sistema de Gestão de Ambiente de Ensino")]),e._v(" "),n("p",[e._v("® Senai Roberto Mange")])])}],!1,null,"30108b83",null);t.default=component.exports}}]);