(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{441:function(e,t,n){e.exports=n.p+"img/sgae.03350ec.png"},464:function(e,t,n){var content=n(520);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(11).default)("0649d631",content,!0,{sourceMap:!1})},519:function(e,t,n){"use strict";n(464)},520:function(e,t,n){var r=n(10)(!1);r.push([e.i,".lobby[data-v-0ab1db3c]{width:100vw;height:100vh;background-color:#313131;color:#fff;overflow-y:hidden;text-align:center}.lobby .front[data-v-0ab1db3c]{transform:rotateY(0deg)}.lobby .back[data-v-0ab1db3c]{transform:rotateY(180deg)}.lobby .upper[data-v-0ab1db3c]{width:100vw;height:85vh}.lobby .upper .img-inner[data-v-0ab1db3c]{width:100vw;height:auto;background-size:200% 200%;-webkit-animation:gradient 3s ease infinite;animation:gradient 3s ease infinite;perspective:1000px}.lobby .upper .img-inner img[data-v-0ab1db3c]{margin-top:0;align-items:center;display:flex;width:20vw;height:17vw;min-width:200px;min-height:200px;position:relative;bottom:30px;transition:transform .8s;transform-style:preserve-3d}.lobby footer[data-v-0ab1db3c]{width:100vw;height:15vh}@media screen and (max-width:580px){h1[data-v-0ab1db3c]{font-size:18px}h3[data-v-0ab1db3c]{font-size:14px}p[data-v-0ab1db3c]{font-size:12px}}@media screen and (max-width:420px){h1[data-v-0ab1db3c]{font-size:14px}h3[data-v-0ab1db3c]{font-size:12px}p[data-v-0ab1db3c]{font-size:11px}}",""]),e.exports=r},553:function(e,t,n){"use strict";n.r(t);var r=n(12),o=(n(66),n(42),n(9),{name:"lobby",layout:"login",middleware:"auth",data:function(){return{flip:!1,storaged:!1,counter:0}},methods:{flipper:function(){var e=this;null!==this.loggedUser&&void 0!==this.loggedUser?this.counter++:alert("logged nulo");var t=setTimeout((function(){e.flip=!e.flip,e.flipper()}),1e3);this.counter>4&&(clearTimeout(t),this.$router.push("/tarefas"))}},mounted:function(){this.flipper()},asyncData:function(e){return Object(r.a)(regeneratorRuntime.mark((function t(){var n,r,o,c;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=e.$auth,"http://localhost:8003/",t.next=4,fetch("http://localhost:8003/usuarios/"+n.$storage.getUniversal("user").id,{headers:{Authorization:n.$storage.getUniversal("_token.local")}});case 4:return r=t.sent,t.next=7,r.json();case 7:return o=t.sent,c=o.data,n.$storage.setUniversal("actualUserStoraged",c),t.abrupt("return",{loggedUser:c});case 11:case"end":return t.stop()}}),t)})))()}}),c=(n(519),n(2)),component=Object(c.a)(o,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{staticClass:"lobby p-d-flex p-flex-column p-jc-center p-ai-center"},[r("section",{staticClass:"upper p-d-flex p-flex-column p-jc-center p-ai-center"},[r("div",{staticClass:"img-inner p-d-flex p-flex-column p-jc-center p-ai-center"},[e.flip?r("img",{staticClass:"back",attrs:{src:n(441)}}):r("img",{staticClass:"front",attrs:{src:n(441)}})]),e._v(" "),e.loggedUser.nome?r("h1",[e._v("\n      ✨ "+e._s(e.loggedUser.nome.split(" ")[0])+", preparando seu ambiente!\n      ✨\n    ")]):r("h1",[e._v("✨ Preparando seu ambiente! ✨")])]),e._v(" "),e._m(0),e._v(" "),r("div",{staticClass:"stars1"}),e._v(" "),r("div",{staticClass:"stars2"}),e._v(" "),r("div",{staticClass:"stars3"})])}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"p-d-flex p-flex-column p-jc-center p-ai-end"},[n("h3",[e._v("Sistema de Gestão de Ambiente de Ensino")]),e._v(" "),n("p",[e._v("® Senai Roberto Mange")])])}],!1,null,"0ab1db3c",null);t.default=component.exports}}]);