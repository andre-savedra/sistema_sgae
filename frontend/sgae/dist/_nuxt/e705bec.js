(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{443:function(t,e,n){"use strict";var o=n(12);n(66);e.a={asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.$auth,t.$router,e.next=3,n.$storage.getUniversal("actualUserStoraged");case 3:if(!(o=e.sent)){e.next=8;break}return console.log("Storaged already defined extends"),console.log(o),e.abrupt("return",{actualUser:o});case 8:case"end":return e.stop()}}),e)})))()}}},449:function(t,e,n){t.exports=n.p+"img/postit.6ca5453.jpg"},452:function(t,e,n){"use strict";(function(t){var o=n(453),r=n.n(o);e.a={awsManager:function(){console.log("AWS S3 MANAGER RUNNING");var e={bucketName:t.env.NUXT_ENV_BUCKET_NAME,dirName:t.env.NUXT_ENV_DIR_NAME_TASK,region:t.env.NUXT_ENV_REGION,accessKeyId:t.env.NUXT_ENV_ACCESSKEY_ID,secretAccessKey:t.env.NUXT_ENV_SECRET_ACESSKEY_ID,s3Url:"https://"+t.env.NUXT_ENV_BUCKET_NAME+".s3.amazonaws.com"};return new r.a(e)}}}).call(this,n(172))},459:function(t,e,n){var content=n(510);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(11).default)("30b3ab4a",content,!0,{sourceMap:!1})},509:function(t,e,n){"use strict";n(459)},510:function(t,e,n){var o=n(10),r=n(137),l=n(449),d=o(!1),c=r(l);d.push([t.i,".allAdd[data-v-2b067292]{height:auto;min-height:calc(100vh - var(--height-default-header));width:100vw;max-width:100vw;padding:70px 90px;background-size:cover;background-position:50%;background-repeat:no-repeat;background-image:url("+c+")}.allAdd *[data-v-2b067292]{overflow-x:visible}.allAdd .titulo[data-v-2b067292],.allAdd .titulo1[data-v-2b067292]{font-size:15px}.allAdd .addContainer[data-v-2b067292]{width:70vw;background-color:#fff;border-radius:15px}.allAdd .addContainer .titulo[data-v-2b067292]{width:100%;height:80px;font-weight:700;background-color:#c22a1f;padding-left:40px;color:#fff;border-radius:15px 15px 0 0;background:linear-gradient(-15deg,#313131,#525d69,#c22a1f,#bd244a);background-size:300% 300%;-webkit-animation:gradientPosition-data-v-2b067292 7s ease infinite;animation:gradientPosition-data-v-2b067292 7s ease infinite}.allAdd .addContainer .titulo i[data-v-2b067292]{font-size:25px;width:auto;height:auto;margin-right:10px}.allAdd .addContainer .ovvv[data-v-2b067292]{background-color:#fff;width:100%;height:auto;padding:20px;border-radius:0 0 15px 15px}.allAdd .addContainer .ovvv .ovv-container[data-v-2b067292]{height:1000px}.allAdd .addContainer .form[data-v-2b067292]{background-color:#fff;width:100%;height:auto;padding:20px;border-radius:0 0 15px 15px}.allAdd .addContainer .form .element[data-v-2b067292]{height:auto;width:100%;padding:20px 0}.allAdd .addContainer .form .element .basicInputText[data-v-2b067292]{outline:0;box-shadow:none;border:none;border-bottom:2px solid #000;border-radius:0}.allAdd .addContainer .form .element .lblBasic[data-v-2b067292]{margin:15px 0;display:flex;flex-direction:row;align-items:center;justify-content:flex-start}.allAdd .addContainer .form .element .lblBasic .pi[data-v-2b067292]{width:auto;margin-right:10px;font-weight:700}.allAdd .addContainer .form .element #name[data-v-2b067292],.allAdd .addContainer .form .element #requester[data-v-2b067292]{width:80%;margin-left:15px}.allAdd .addContainer .form .element #description[data-v-2b067292]{width:95%;margin-left:15px;height:120px;border-radius:15px;border:2px solid #000;padding:10px;outline:none;word-break:break-all;resize:none}.allAdd .addContainer .form .element .customAutocomplete .lblBasic[data-v-2b067292]{margin:28px 0 15px}.allAdd .addContainer .form .element .customAutocomplete .p-autocomplete[data-v-2b067292],.allAdd .addContainer .form .element .customAutocomplete .p-autocomplete-multiple[data-v-2b067292]{width:80%;margin-left:15px}.allAdd .addContainer .form .element .inputElement .lblBasic[data-v-2b067292]{margin:18px 0}.allAdd .addContainer .form .element .inputElement .customDatePicker[data-v-2b067292]{width:30%;margin-left:15px}.allAdd .addContainer .form .element .inputElement .customFileUpload[data-v-2b067292]{width:95%;margin-left:15px;border:2px solid #000;border-radius:15px;padding:10px}.allAdd .addContainer .form .element .inputElement .customFileUpload .p-fileupload-buttonbar[data-v-2b067292]{border:#fff!important;display:flex;flex-direction:row;align-items:center;justify-content:center}.allAdd .addContainer .divisor[data-v-2b067292]{margin-top:80px;background-color:red;width:96%;height:2px;z-index:100}.allAdd .buttons[data-v-2b067292]{width:70vw;display:flex;flex-direction:row;justify-content:space-evenly;padding:12px}.allAdd .buttons .btn-clean[data-v-2b067292],.allAdd .buttons .btn-send[data-v-2b067292]{width:30%;border-radius:10px;padding:20px;font-size:1.8rem;font-weight:700;margin:40px 0;transition:all .3s}.allAdd .buttons .btn-clean[data-v-2b067292]:hover,.allAdd .buttons .btn-send[data-v-2b067292]:hover{transform:scale(1.03);cursor:pointer;transition:all .3s}.allAdd .buttons .btn-send[data-v-2b067292]{background-color:#c22a1f;border:none;color:#fff}.allAdd .buttons .btn-clean[data-v-2b067292]{background-color:#fff;border:2px solid #c22a1f;color:#c22a1f}@-webkit-keyframes gradientPosition-data-v-2b067292{0%{background-position:0 50%}50%{background-position:100% 50%}to{background-position:0 50%}}@keyframes gradientPosition-data-v-2b067292{0%{background-position:0 50%}50%{background-position:100% 50%}to{background-position:0 50%}}@media screen and (max-width:945px){.titulo[data-v-2b067292],.titulo1[data-v-2b067292]{font-size:13px}.addContainer[data-v-2b067292],.buttons[data-v-2b067292]{width:80vw!important}.buttons .btn-clean[data-v-2b067292],.buttons .btn-send[data-v-2b067292]{width:38%;font-size:16px!important}}@media screen and (max-width:610px){.titulo[data-v-2b067292],.titulo1[data-v-2b067292]{font-size:11px!important}.addContainer[data-v-2b067292],.buttons[data-v-2b067292]{width:87vw!important}.buttons .btn-clean[data-v-2b067292],.buttons .btn-send[data-v-2b067292]{width:30%!important;font-size:16px!important}.customDatePicker[data-v-2b067292]{width:50%!important;margin-left:15px}}@media screen and (max-width:400px){.allAdd[data-v-2b067292]{padding:0!important}.addContainer[data-v-2b067292]{width:100vw!important}.addContainer[data-v-2b067292],.titulo[data-v-2b067292]{border-radius:0!important}.buttons[data-v-2b067292]{width:100vw!important}.buttons .btn-clean[data-v-2b067292],.buttons .btn-send[data-v-2b067292]{width:30%!important;font-size:15px!important}.customDatePicker[data-v-2b067292]{width:60%!important;margin-left:15px}}",""]),t.exports=d},546:function(t,e,n){"use strict";n.r(e);var o,r,l,d,c,m,f,h,v,x,k,E=n(49),w=n(12),C=(n(66),n(53),n(9),n(54),n(80),n(89),n(18),n(50),n(448),n(67),n(81),n(36),n(42),n(26),n(140),n(37),n(25),n(29),n(443)),_=n(452),A={extends:C.a,name:"addTarefa",layout:"standard",middleware:"auth",data:function(){return{emailPayload:null,selectedEmployees:[],filteredEmployees:null,allUsers:[],selectedEnviroment:null,filteredEnviroments:null,allEnviroments:[],taskID:1,initialStatus:1,deadline:null,photos:[],uploadPhotoStarted:!1,S3Client:null,filesToBeUploaded:null,task:[{nome:null,descricao:null,idSolicitanteFK:null,idAmbienteFK:null,idStatusFK:null,prazo:null,dataInicio:null,dataFim:null}],updateModeId:0,btnDisabled:!1}},methods:{cleanForm:function(){this.uploadPhotoStarted=!1,this.task.map((function(t){t.nome=null,t.descricao=null,t.idSolicitanteFK=null,t.idAmbienteFK=null,t.prazo=null,t.dataInicio=null,t.dataFim=null})),this.selectedEmployees.length=0,this.selectedEnviroment.length=0,this.deadline=null,this.$store.dispatch("setEditTask",0),this.updateModeId=0,this.virtualClickUpload("Cancelar")},formatNumber:function(input){return input>=0&&input<=9?"0"+input.toString():input.toString()},formatDate:function(input){var dt=new Date;if(null===input)return input;if("frontend"===input)return this.formatNumber(dt.getDate())+"/"+this.formatNumber(dt.getMonth()+1)+"/"+dt.getFullYear()+" - "+this.formatNumber(dt.getHours())+":"+this.formatNumber(dt.getMinutes());if("backend"===input)return dt.getFullYear()+"-"+this.formatNumber(dt.getMonth()+1)+"-"+this.formatNumber(dt.getDate())+"T"+this.formatNumber(dt.getHours())+":"+this.formatNumber(dt.getMinutes())+":00.000000-03:00";if(input.includes("GMT"))return new Date(input).toISOString().replaceAll("Z","-03:00");if(input.includes("T")){var t=input.split("T"),e=t[0].split("-");3===e.length&&(t[0]=e[2]+"/"+e[1]+"/"+e[0]);var n=t[1].split(":");return n.length>=2&&(t[1]=n[0]+":"+n[1]),t[0]+" - "+t[1]}if(input.includes("/")){var o=input.split("-");o[0]=o[0].trim().replaceAll("/","-"),o[1]=o[1].trim().replaceAll("/","-");var r=o[0].split("-");return 3===r.length&&(o[0]=r[2]+"-"+r[1]+"-"+r[0]),o[0]+"T"+o[1]+":00-03:00"}return input},getUsers:(k=Object(w.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.allUsers.length=0,t.next=3,this.$axios.$get(this.$store.state.BASE_URL+"usuarios/?ativo=True").then((function(t){t.data.forEach((function(t){e.allUsers.push({name:t.nome,id:t.id})})),console.log("this.allUsers"),console.log(e.allUsers)})).catch((function(t){console.log("problema ao pegar usuarios"),console.log(t)}));case 3:case"end":return t.stop()}}),t,this)}))),function(){return k.apply(this,arguments)}),getEnviroments:(x=Object(w.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.allUsers.length=0,t.next=3,this.$axios.$get(this.$store.state.BASE_URL+"ambientes/").then((function(t){t.data.forEach((function(t){e.allEnviroments.push({id:t.id,name:t.nome})})),console.log("this.allEnviroments"),console.log(e.allEnviroments)})).catch((function(t){console.log("problema ao pegar ambientes"),console.log(t)}));case 3:case"end":return t.stop()}}),t,this)}))),function(){return x.apply(this,arguments)}),searchEmployee:function(t){var e=this;setTimeout((function(){t.query.trim().length?e.filteredEmployees=e.allUsers.filter((function(e){return e.name.toLowerCase().startsWith(t.query.toLowerCase())})):e.filteredEmployees=Object(E.a)(e.allUsers)}),250)},searchEnviroment:function(t){var e=this;setTimeout((function(){t.query.trim().length?e.filteredEnviroments=e.allEnviroments.filter((function(e){return e.name.toLowerCase().startsWith(t.query.toLowerCase())})):e.filteredEnviroments=Object(E.a)(e.allEnviroments)}),250)},virtualClickUpload:function(t){document.querySelectorAll(".p-fileupload-buttonbar button").forEach((function(element,e){element.textContent.includes(t)&&(element.click(),console.log("clicou"))}))},checkMode:function(){this.btnDisabled=!0,this.updateModeId>0?this.putTask():this.postTask()},postTask:(v=Object(w.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.task[0].idSolicitanteFK=this.actualUser.id,this.task[0].idAmbienteFK=this.selectedEnviroment.id,this.task[0].prazo=this.formatDate(this.deadline.toString()),this.task[0].dataInicio=this.formatDate("backend"),this.task[0].idStatusFK=1,t.next=8,this.$axios.$post(this.$store.state.BASE_URL+"tarefas/",JSON.stringify(this.task),{headers:{"Content-Type":"application/json"}}).then((function(t){console.log(t),t[0].nome===e.task[0].nome&&t[0].id>0&&(e.taskID=t[0].id,e.postTaskUsers())})).catch((function(t){alert("Problema ao tentar cadastrar a tarefa"),console.log(t),e.btnDisabled=!1}));case 8:case"end":return t.stop()}}),t,this)}))),function(){return v.apply(this,arguments)}),putTask:(h=Object(w.a)(regeneratorRuntime.mark((function t(){var p,body,e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return p=this.formatDate(this.deadline.toString()),console.log("this.deadline.toString()"),console.log(this.deadline.toString()),console.log("p"),console.log(p),body={idSolicitanteFK:this.actualUser.id,idAmbienteFK:this.selectedEnviroment.id,idStatusFK:this.task[0].idStatusFK,nome:this.task[0].nome,descricao:this.task[0].descricao,prazo:this.formatDate(this.deadline.toString()),dataInicio:this.task[0].dataInicio},console.log("body"),console.log(body),t.next=11,this.$axios.$put(this.$store.state.BASE_URL+"tarefas/"+this.updateModeId+"/",JSON.stringify(body),{headers:{"Content-Type":"application/json"}}).then((function(t){console.log(t),t.nome===body.nome&&t.id>0&&(e.taskID=t.id)})).catch((function(t){alert("Problema ao tentar cadastrar a tarefa"),console.log(t)}));case 11:case"end":return t.stop()}}),t,this)}))),function(){return h.apply(this,arguments)}),postTaskUsers:(f=Object(w.a)(regeneratorRuntime.mark((function t(){var e,n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=[],this.selectedEmployees.forEach((function(t){e.push({idUsuarioFK:t.id,idTarefaFK:n.taskID})})),console.log(e),console.log(JSON.stringify(e)),t.next=6,this.$axios.$post(this.$store.state.BASE_URL+"tarefasUsuarios/",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then((function(t){console.log(t),n.postTaskStatus(),n.emailPayload=e})).catch((function(t){alert("Problema ao tentar cadastrar os usuários na tarefa"),console.log(t),n.btnDisabled=!1}));case 6:case"end":return t.stop()}}),t,this)}))),function(){return f.apply(this,arguments)}),postTaskStatus:(m=Object(w.a)(regeneratorRuntime.mark((function t(){var e,n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=[{idStatusFK:this.initialStatus,idTarefaFK:this.taskID}],t.next=3,this.$axios.$post(this.$store.state.BASE_URL+"tarefasStatus/",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then((function(t){console.log(t),n.postMail(n.emailPayload),n.virtualClickUpload("Carregar"),setTimeout((function(){n.uploadPhotoStarted||n.cleanForm()}),2e3)})).catch((function(t){alert("Problema ao tentar cadastrar a tarefa"),console.log(t),n.btnDisabled=!1}));case 3:case"end":return t.stop()}}),t,this)}))),function(){return m.apply(this,arguments)}),postMail:(c=Object(w.a)(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e){t.next=3;break}return t.next=3,this.$axios.$post(this.$store.state.BASE_URL+"emailSender/newTask/",JSON.stringify(e),{headers:{"Content-Type":"application/json"}}).then((function(t){console.log(t),n.btnDisabled=!1,null!==t.msg&&void 0!==t.msg&&("sent"===t.msg?console.log("EMAIL ENVIADO COM SUCESSO"):console.log("EMAIL NÃO ENVIADO"))})).catch((function(t){alert("Problema ao tentar enviar email!"),console.log(t),n.btnDisabled=!1}));case 3:case"end":return t.stop()}}),t,this)}))),function(t){return c.apply(this,arguments)}),savePhotoAWS:(d=Object(w.a)(regeneratorRuntime.mark((function t(e){var n,o,r=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return this.filesToBeUploaded=e.files,n=[],o=!1,this.uploadPhotoStarted=!0,t.next=6,Promise.all(this.filesToBeUploaded.map(function(){var t=Object(w.a)(regeneratorRuntime.mark((function t(e,l){var d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return d=r.taskID.toString()+"-"+r.task[0].idStatusFK.toString()+"-"+l.toString(),t.next=3,r.S3Client.uploadFile(e,d).then((function(t){console.log("save aws file "+l),console.log(t),n.push(t)})).catch((function(t){console.error(t),o=!0}));case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()));case 6:n.length>0&&!1===o?this.postPhoto(n):alert("erro  ao salvar na aws s3");case 7:case"end":return t.stop()}}),t,this)}))),function(t){return d.apply(this,arguments)}),postPhoto:(l=Object(w.a)(regeneratorRuntime.mark((function t(e){var n,o,r=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=this.taskID,o=this.initialStatus,t.next=4,e.forEach((function(t){var e=new FormData;e.append("nome",t.key),e.append("idTarefaFK",n),e.append("idStatusFK",o),e.append("image",t.location),r.$axios.$post(r.$store.state.BASE_URL+"fotos/",e,{headers:{"Content-Type":"multipart/form-data"}}).then((function(t){console.log(t),r.cleanForm()})).catch((function(t){alert("Problema ao tentar cadastrar  foto"),console.log(t)}))}));case 4:case"end":return t.stop()}}),t,this)}))),function(t){return l.apply(this,arguments)}),getTaskUser:(r=Object(w.a)(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.$axios.$get(this.$store.state.BASE_URL+"tarefasUsuarios/?tarefa="+e).then((function(t){null!==t.data&&void 0!==t.data&&(t.data.map((function(t){n.selectedEmployees.push({name:t.idUsuarioFK.nome,id:t.idUsuarioFK.id})})),console.log("finalizado gettaskuser"),console.log(n.selectedEmployees),console.log(n.allUsers))})).catch((function(t){alert("Problema ao tentar pegar tarefa "+e),console.log(t)}));case 1:case"end":return t.stop()}}),t,this)}))),function(t){return r.apply(this,arguments)}),getTask:(o=Object(w.a)(regeneratorRuntime.mark((function t(e){var n=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!(this.updateModeId>0)){t.next=6;break}return console.log("VAI ALTERAR A TAREFA "+this.$store.state.editTaskId),t.next=4,Promise.all([this.getUsers(),this.getEnviroments()]);case 4:t.sent,console.log("finalizado processos!");case 6:this.$axios.$get(this.$store.state.BASE_URL+"tarefas/"+e).then((function(t){console.log(t),console.log(n.allEnviroments),null!==t.data&&void 0!==t.data&&(n.task[0].nome=t.data.nome,n.task[0].descricao=t.data.descricao,n.selectedEnviroment={id:t.data.idAmbienteFK.id,name:t.data.idAmbienteFK.nome},n.task[0].dataInicio=t.data.dataInicio,n.task[0].idStatusFK=t.data.idStatusFK.id,n.deadline=n.formatDate(t.data.prazo),n.getTaskUser(e),console.log("finalizado gettask"))})).catch((function(t){alert("Problema ao tentar pegar tarefa "+e),console.log(t)}));case 7:case"end":return t.stop()}}),t,this)}))),function(t){return o.apply(this,arguments)})},created:function(){null===this.actualUser||void 0===this.actualUser?this.$router.push("/lobby"):(console.log("actual user add tarefa"),console.log(this.actualUser),this.$store.state.editTaskId>0?(this.updateModeId=this.$store.state.editTaskId,this.getTask(this.updateModeId)):(this.getUsers(),this.getEnviroments()),this.S3Client=_.a.awsManager())}},y=A,S=(n(509),n(2)),component=Object(S.a)(y,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"allAdd p-d-flex p-flex-column p-jc-center p-ai-center"},[n("div",{staticClass:"addContainer p-d-flex p-flex-column p-jc-top p-ai-center"},[t._m(0),t._v(" "),t.actualUser&&t.allUsers.length>0&&t.allEnviroments.length>0?n("div",{staticClass:"form"},[t._m(1),t._v(" "),n("main",{staticClass:"element p-d-flex p-jc-start p-ai-start"},[n("div",{staticClass:"subelement p-d-flex p-flex-column p-jc-start p-ai-start"},[n("div",{staticClass:"inputElement p-d-flex p-flex-column p-jc-start p-ai-start"},[t._m(2),t._v(" "),n("InputText",{staticClass:"basicInputText",attrs:{type:"text",id:"name",placeholder:"Preencha...",required:""},model:{value:t.task[0].nome,callback:function(e){t.$set(t.task[0],"nome",e)},expression:"task[0].nome"}})],1),t._v(" "),n("div",{staticClass:"inputElement p-d-flex p-flex-column p-jc-start p-ai-start"},[t._m(3),t._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.task[0].descricao,expression:"task[0].descricao"}],staticClass:"textInput",attrs:{type:"text",placeholder:"Insira aqui a descrição da sua tarefa...",id:"description"},domProps:{value:t.task[0].descricao},on:{input:function(e){e.target.composing||t.$set(t.task[0],"descricao",e.target.value)}}})]),t._v(" "),n("div",{staticClass:"inputElement p-d-flex p-flex-column p-jc-start p-ai-start"},[t._m(4),t._v(" "),n("InputText",{staticClass:"basicInputText",attrs:{type:"text",id:"requester",disabled:!0,placeholder:"Preencha...",required:""},model:{value:this.actualUser.nome,callback:function(e){t.$set(this.actualUser,"nome",e)},expression:"this.actualUser.nome"}})],1),t._v(" "),n("div",{staticClass:"\n              customAutocomplete\n              inputElement\n              p-d-flex p-flex-column p-jc-start p-ai-start\n            "},[t._m(5),t._v(" "),t.allUsers?n("AutoComplete",{attrs:{multiple:!0,suggestions:t.filteredEmployees,field:"name",id:"employee",placeholder:"Preencha..."},on:{complete:function(e){return t.searchEmployee(e)}},model:{value:t.selectedEmployees,callback:function(e){t.selectedEmployees=e},expression:"selectedEmployees"}}):t._e()],1),t._v(" "),n("div",{staticClass:"\n              customAutocomplete\n              inputElement\n              p-d-flex p-flex-column p-jc-start p-ai-start\n            "},[t._m(6),t._v(" "),t.allEnviroments?n("AutoComplete",{attrs:{multiple:!1,suggestions:t.filteredEnviroments,field:"name",id:"enviroment",placeholder:"Preencha..."},on:{complete:function(e){return t.searchEnviroment(e)}},model:{value:t.selectedEnviroment,callback:function(e){t.selectedEnviroment=e},expression:"selectedEnviroment"}}):t._e()],1),t._v(" "),n("div",{staticClass:"inputElement p-d-flex p-flex-column p-jc-start p-ai-start"},[t._m(7),t._v(" "),n("Calendar",{staticClass:"customDatePicker",attrs:{id:"deadline",showIcon:!0,dateFormat:"dd/mm/yy",showTime:!0},model:{value:t.deadline,callback:function(e){t.deadline=e},expression:"deadline"}})],1),t._v(" "),n("div",{staticClass:"inputElement p-d-flex p-flex-column p-jc-start p-ai-start"},[t._m(8),t._v(" "),n("FileUpload",{staticClass:"customFileUpload",attrs:{multiple:!0,accept:"image/jpeg,image/png",maxFileSize:1e7,id:"imageUpload",chooseLabel:"Adicionar fotos",uploadLabel:"Carregar fotos",cancelLabel:"Cancelar",fileLimit:10,invalidFileTypeMessage:"Formato da imagem inválido, formato deve ser JPG ou PNG!!!",invalidFileSizeMessage:"Tamanho da imagem excedido, limite é 10MB!",invalidFileLimitMessage:"Máximo de imagens anexadas é 10, diminua a quantidade de imagens!"},on:{upload:function(e){return t.savePhotoAWS(e)}},scopedSlots:t._u([{key:"empty",fn:function(){return[n("p",[t._v("\n                  Arraste as imagens desejadas aqui ou clique em 'Adicionar\n                  fotos'\n                ")])]},proxy:!0}],null,!1,1163709745)})],1)])]),t._v(" "),n("div",{staticClass:"divisor"})]):t._e()]),t._v(" "),n("div",{staticClass:"buttons p-d-flex p-flex-row p-jc-evenly p-ai-center"},[n("Button",{staticClass:"btn-send",attrs:{disabled:t.btnDisabled,label:"Enviar"},on:{click:function(e){return t.checkMode()}}}),t._v(" "),n("Button",{staticClass:"btn-clean",attrs:{label:"Limpar"},on:{click:function(e){return t.cleanForm()}}})],1)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"titulo p-d-flex p-flex-row p-jc-start p-ai-center"},[n("i",{staticClass:"pi pi-check-square"}),t._v(" "),n("h1",[t._v("Crie sua Tarefa!")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"titulo1"},[n("h2",[t._v("TAREFA:")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"lblBasic",attrs:{for:"name"}},[n("i",{staticClass:"pi pi-bookmark"}),n("strong",[t._v("Título")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"lblBasic",attrs:{for:"description"}},[n("i",{staticClass:"pi pi-info-circle"}),n("strong",[t._v("Descrição")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"lblBasic",attrs:{for:"requester"}},[n("i",{staticClass:"pi pi-user"}),n("strong",[t._v("Solicitante")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"lblBasic",attrs:{for:"employee"}},[n("i",{staticClass:"pi pi-users"}),n("strong",[t._v("Responsáveis")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"lblBasic",attrs:{for:"enviroment"}},[n("i",{staticClass:"pi pi-map-marker"}),n("strong",[t._v("Ambiente de Ensino")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"lblBasic",attrs:{for:"deadline"}},[n("i",{staticClass:"pi pi-calendar"}),n("strong",[t._v("Prazo")])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("label",{staticClass:"lblBasic",attrs:{for:"imageUpload"}},[n("i",{staticClass:"pi pi-camera"}),n("strong",[t._v("Fotos Upload")])])}],!1,null,"2b067292",null);e.default=component.exports}}]);