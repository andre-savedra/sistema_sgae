(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{442:function(e,t,n){e.exports=n.p+"img/sgae.03350ec.png"},463:function(e,t,n){var content=n(518);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(11).default)("98b3ab26",content,!0,{sourceMap:!1})},517:function(e,t,n){"use strict";n(463)},518:function(e,t,n){var o=n(10)(!1);o.push([e.i,".lobby[data-v-8d9a3c5c]{width:100vw;height:100vh;background-color:#313131;color:#fff;overflow-y:hidden;text-align:center}.lobby .front[data-v-8d9a3c5c]{transform:rotateY(0deg)}.lobby .back[data-v-8d9a3c5c]{transform:rotateY(180deg)}.lobby .upper[data-v-8d9a3c5c]{width:100vw;height:85vh}.lobby .upper .img-inner[data-v-8d9a3c5c]{width:100vw;height:auto;background-size:200% 200%;-webkit-animation:gradient 3s ease infinite;animation:gradient 3s ease infinite;perspective:1000px}.lobby .upper .img-inner img[data-v-8d9a3c5c]{margin-top:0;align-items:center;display:flex;width:20vw;height:17vw;min-width:200px;min-height:200px;position:relative;bottom:30px;transition:transform .8s;transform-style:preserve-3d}.lobby footer[data-v-8d9a3c5c]{width:100vw;height:15vh}@media screen and (max-width:580px){h1[data-v-8d9a3c5c]{font-size:18px}h3[data-v-8d9a3c5c]{font-size:14px}p[data-v-8d9a3c5c]{font-size:12px}}@media screen and (max-width:420px){h1[data-v-8d9a3c5c]{font-size:14px}h3[data-v-8d9a3c5c]{font-size:12px}p[data-v-8d9a3c5c]{font-size:11px}}",""]),e.exports=o},550:function(e,t,n){"use strict";n.r(t);var o=n(12),r=(n(66),n(42),n(9),{name:"lobby",layout:"login",middleware:"auth",data:function(){return{flip:!1,storaged:!1,counter:0}},methods:{flipper:function(){var e=this;null!==this.loggedUser&&void 0!==this.loggedUser&&this.counter++;var t=setTimeout((function(){e.flip=!e.flip,e.flipper()}),1e3);this.counter>4&&(clearTimeout(t),this.$router.push("/tarefas"))}},mounted:function(){this.flipper()},asyncData:function(e){return Object(o.a)(regeneratorRuntime.mark((function t(){var n,o,r,c,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.$axios,o=e.$auth,console.log(o),(r=o.$storage.getUniversal("actualUserStoraged"))&&(console.log("Storaged already defined"),console.log(r)),c=void 0+"/",!(l=o.$storage.getUniversal("user"))){t.next=10;break}alert("encontrou cookie users:\n"+JSON.stringify(l)),t.next=17;break;case 10:return alert("não encontrou cookie user"),t.next=13,n.get(c+"api/v1/users/me/");case 13:l=(l=t.sent).data,console.log("users requisitado:"),console.log(l);case 17:d=null,l&&(alert("token: \n"+o.$storage.getUniversal("_token.local")),fetch(c+"usuarios/"+l.id,{headers:{Authorization:o.$storage.getUniversal("_token.local")}}).then((function(e){e?(d=(d=e.json()).data,console.log(d),alert("loggedUser original:"+d),alert(JSON.stringify(d))):alert("response vazia")})));case 19:case"end":return t.stop()}}),t)})))()}}),c=(n(517),n(2)),component=Object(c.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("main",{staticClass:"lobby p-d-flex p-flex-column p-jc-center p-ai-center"},[o("section",{staticClass:"upper p-d-flex p-flex-column p-jc-center p-ai-center"},[o("div",{staticClass:"img-inner p-d-flex p-flex-column p-jc-center p-ai-center"},[e.flip?o("img",{staticClass:"back",attrs:{src:n(442)}}):o("img",{staticClass:"front",attrs:{src:n(442)}})]),e._v(" "),o("h1",[e._v("✨ Preparando seu ambiente! ✨")])]),e._v(" "),e._m(0),e._v(" "),o("div",{staticClass:"stars1"}),e._v(" "),o("div",{staticClass:"stars2"}),e._v(" "),o("div",{staticClass:"stars3"})])}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"p-d-flex p-flex-column p-jc-center p-ai-end"},[n("h3",[e._v("Sistema de Gestão de Ambiente de Ensino")]),e._v(" "),n("p",[e._v("® Senai Roberto Mange")])])}],!1,null,"8d9a3c5c",null);t.default=component.exports}}]);