(window.webpackJsonp=window.webpackJsonp||[]).push([[14,8],{343:function(t,e,n){"use strict";var r=n(2),o=n(3),c=n(39),l=n(27),d=n(40),f=n(235),v=n(14),m=n(4),h=n(234),_=n(152),C=n(347),w=n(348),x=n(93),y=n(349),A=[],k=o(A.sort),Q=o(A.push),F=m((function(){A.sort(void 0)})),P=m((function(){A.sort(null)})),S=_("sort"),I=!m((function(){if(x)return x<70;if(!(C&&C>3)){if(w)return!0;if(y)return y<603;var code,t,e,n,r="";for(code=65;code<76;code++){switch(t=String.fromCharCode(code),code){case 66:case 69:case 70:case 72:e=3;break;case 68:case 71:e=4;break;default:e=2}for(n=0;n<47;n++)A.push({k:t+n,v:e})}for(A.sort((function(a,b){return b.v-a.v})),n=0;n<A.length;n++)t=A[n].k.charAt(0),r.charAt(r.length-1)!==t&&(r+=t);return"DGBEFHACIJK"!==r}}));r({target:"Array",proto:!0,forced:F||!P||!S||!I},{sort:function(t){void 0!==t&&c(t);var e=l(this);if(I)return void 0===t?k(e):k(e,t);var n,r,o=[],m=d(e);for(r=0;r<m;r++)r in e&&Q(o,e[r]);for(h(o,function(t){return function(e,n){return void 0===n?-1:void 0===e?1:void 0!==t?+t(e,n)||0:v(e)>v(n)?1:-1}}(t)),n=d(o),r=0;r<n;)e[r]=o[r++];for(;r<m;)f(e,r++);return e}})},347:function(t,e,n){var r=n(72).match(/firefox\/(\d+)/i);t.exports=!!r&&+r[1]},348:function(t,e,n){var r=n(72);t.exports=/MSIE|Trident/.test(r)},349:function(t,e,n){var r=n(72).match(/AppleWebKit\/(\d+)\./);t.exports=!!r&&+r[1]},351:function(t,e,n){"use strict";n.r(e);var r={props:{msg:{type:String},state:{type:Boolean}},methods:{getState:function(){return this.$store.state.confirmState},confirm:function(data){this.$emit("confirm",data)}},computed:{}},o=n(57),component=Object(o.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"confirm-action",class:{hide:t.state}},[e("div",{staticClass:"confirm-box"},[e("div",[t._v(t._s(t.msg))]),t._v(" "),e("div",{staticClass:"confirm-holder"},[e("span",{staticClass:"button w-button",on:{click:function(e){return t.confirm("yes")}}},[t._v("Yes")]),e("span",{staticClass:"button w-button",on:{click:function(e){return t.confirm("no")}}},[t._v("No")])])])])}),[],!1,null,null,null);e.default=component.exports},385:function(t,e,n){var content=n(401);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(151).default)("d43ffa8c",content,!0,{sourceMap:!1})},400:function(t,e,n){"use strict";n(385)},401:function(t,e,n){var r=n(150)((function(i){return i[1]}));r.push([t.i,".each-input.full textarea{min-height:20vh}",""]),r.locals={},t.exports=r},435:function(t,e,n){"use strict";n.r(e);var r,o=n(28),c=n(8),l=(n(49),n(343),n(58),n(13),n(30),n(31),r={components:{AdminConfirmation:n(351).default},data:function(){return{category:"",question:"",answer:"",time:"",faqs:[],confirmMsg:"",confirmStatus:!0,editingId:"",editingState:!1,deleteId:"",sort:"-time",field:"",limit:5,resultLength:"",currentPage:1,pages:function(){for(var t=[],e=Math.ceil(this.resultLength/this.limit),i=0;i<e;i++)t.push("i");return t}}},methods:{clearInput:function(){this.answer="",this.question="",this.category="",this.editingState=!1,this.editingId="",this.time=""},showConfirmation:function(t,e){this.deleteId=e,this.confirmMsg=t,this.confirmStatus=!1},returnConfirmation:function(data){"yes"==data&&this.deleteFAQ(),this.confirmStatus=!0},toggleFAQStatus:function(t,e){this.editingId=t,this.editingState=!0;var form={status:!e};this.updateFAQ(form)},prepareFAQEdit:function(t){this.answer=t.answer,this.question=t.question,this.category=t.category,this.editingId=t._id,this.editingState=!0,this.time=t.time},processFAQ:function(){var form={category:this.category,question:this.question,answer:this.answer,time:""==this.time?(new Date).getTime():this.time};this.editingState?this.updateFAQ(form):this.createFAQ(form)},sortResult:function(){this.sort="-time"==this.sort?"time":"-time",this.getFAQ()},paginate:function(t){this.currentPage=t,this.getFAQ()},updateFAQ:function(form){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="?limit=".concat(t.limit,"&page=").concat(t.currentPage,"&sort=").concat(t.sort),e.prev=1,e.next=4,t.$axios.patch("/faq/".concat(t.editingId,"/").concat(n),form);case 4:r=e.sent,t.faqs=r.data.data,t.resultLength=r.data.resultLength,t.clearInput(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0.response.data.message);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))()},createFAQ:function(form){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="?limit=".concat(t.limit,"&page=").concat(t.currentPage,"&sort=").concat(t.sort),e.prev=1,e.next=4,t.$axios.post("/faq/".concat(n),form);case 4:r=e.sent,t.faqs=r.data.data,t.resultLength=r.data.resultLength,t.clearInput(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0.response.data.message);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))()},getFAQ:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="?limit=".concat(t.limit,"&page=").concat(t.currentPage,"&sort=").concat(t.sort),e.prev=1,e.next=4,t.$axios.get("/faq/".concat(n));case 4:r=e.sent,t.faqs=r.data.data,t.resultLength=r.data.resultLength,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(1),console.log(e.t0.response.data.message);case 12:case"end":return e.stop()}}),e,null,[[1,9]])})))()},deleteFAQ:function(){var t=this;return Object(c.a)(regeneratorRuntime.mark((function e(){var n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="?limit=".concat(t.limit,"&page=").concat(t.currentPage,"&sort=").concat(t.sort),e.prev=1,e.next=4,t.$axios.delete("/faq/".concat(t.deleteId,"/").concat(n));case 4:r=e.sent,t.faqs=r.data.data,t.resultLength=r.data.resultLength,t.deleteId="",e.next=13;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0.response.data.message);case 13:case"end":return e.stop()}}),e,null,[[1,10]])})))()}},computed:{editorConfig:function(){return this.$store.state.editor.editorConfig}}},Object(o.a)(r,"components",{"ckeditor-nuxt":function(){return n.e(0).then(n.t.bind(null,515,7))}}),Object(o.a)(r,"mounted",(function(){this.getFAQ()})),r),d=(n(400),n(57)),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return e("div",[e("admin-confirmation",{attrs:{msg:t.confirmMsg,state:t.confirmStatus},on:{confirm:t.returnConfirmation}}),t._v(" "),e("div",{staticClass:"table-filters"},[e("div",{staticClass:"each-filter-option point",on:{click:t.sortResult}},[e("h4",{staticClass:"filter-label"},[t._v("Time")]),t._v(" "),e("img",{staticClass:"filter-icon drop",attrs:{src:"/admin-images/sort.svg",loading:"lazy",alt:""}})])]),t._v(" "),e("div",{staticClass:"table-wrapper"},[e("table",{staticClass:"custom-table"},[t._m(0),t._v(" "),e("tbody",t._l(t.faqs,(function(n,r){return e("tr",{key:n._id},[e("td",[t._v(t._s(r+1))]),t._v(" "),e("td",[t._v(t._s(n.category))]),t._v(" "),e("td",[t._v(t._s(n.question))]),t._v(" "),e("td",[e("div",{domProps:{innerHTML:t._s(n.answer.substring(0,200))}})]),t._v(" "),e("td",[n.status?e("div",{staticClass:"status",class:{success:n.status},on:{click:function(e){return t.toggleFAQStatus(n._id,n.status)}}},[t._v("\n              Active\n            ")]):e("div",{staticClass:"status",class:{success:n.status},on:{click:function(e){return t.toggleFAQStatus(n._id,n.status)}}},[t._v("\n              Draft\n            ")])]),t._v(" "),e("td",[e("div",{staticClass:"filter-box",on:{click:function(e){return t.prepareFAQEdit(n)}}},[e("img",{staticClass:"filter-icon check action-icon",attrs:{src:"/admin-images/edit-gray.svg",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"filter-box",on:{click:function(e){return t.showConfirmation("Are you sure you want to delete this Question",n._id)}}},[e("img",{staticClass:"filter-icon check action-icon",attrs:{src:"/admin-images/delete-gray.svg",loading:"lazy",alt:""}})])])])})),0)])]),t._v(" "),e("div",{staticClass:"table-label"},[e("div",[e("strong",{staticClass:"bold-text"},[t._v("Results")]),t._v(": "+t._s(t.resultLength)+"\n      "),e("strong",{staticClass:"bold-text-2"},[t._v("Page")]),t._v(" "+t._s(t.currentPage)+" of\n      "+t._s(t.pages().length)+"\n    ")]),t._v(" "),t.pages().length>1?e("ul",{staticClass:"min-table-pagination",attrs:{role:"list"}},[1!=t.currentPage?e("li",{staticClass:"pagination-item",on:{click:function(e){return t.paginate(t.currentPage-1)}}},[e("img",{staticClass:"pagination-img",attrs:{src:"/admin-images/cheveron-left.svg",loading:"lazy",alt:""}})]):t._e(),t._v(" "),t._l(t.pages().length,(function(n,r){return e("li",{key:r,staticClass:"pagination-item",class:{active:r==t.currentPage-1,hide:r>=3+t.currentPage||r<t.currentPage-3,show:r+1==t.pages().length},on:{click:function(e){return t.paginate(r+1)}}},[e("div",[t._v(t._s(r+1))])])})),t._v(" "),t.currentPage<t.pages(t.currentPage+1).length?e("li",{staticClass:"pagination-item",on:{click:function(e){return t.paginate(t.currentPage+1)}}},[e("img",{staticClass:"pagination-img",attrs:{src:"/admin-images/cheveron-right.svg",loading:"lazy",alt:""}})]):t._e()],2):t._e()]),t._v(" "),e("div",{staticClass:"input-wrapper w-form"},[e("div",{staticClass:"input-form"},[e("div",{staticClass:"each-input half"},[t._m(1),e("input",{directives:[{name:"model",rawName:"v-model",value:t.category,expression:"category"}],staticClass:"plan-input w-input",attrs:{type:"text",placeholder:"Enter Category"},domProps:{value:t.category},on:{input:function(e){e.target.composing||(t.category=e.target.value)}}})]),t._v(" "),e("div",{staticClass:"each-input half"},[t._m(2),e("input",{directives:[{name:"model",rawName:"v-model",value:t.question,expression:"question"}],staticClass:"plan-input w-input",attrs:{type:"text",placeholder:"Enter Question"},domProps:{value:t.question},on:{input:function(e){e.target.composing||(t.question=e.target.value)}}})]),t._v(" "),e("div",{staticClass:"each-input full"},[t._m(3),t._v(" "),e("client-only",{attrs:{placeholder:"loading..."}},[e("ckeditor-nuxt",{staticClass:"editor",attrs:{config:t.editorConfig},model:{value:t.answer,callback:function(e){t.answer=e},expression:"answer"}})],1)],1),t._v(" "),e("div",{staticClass:"button-holder"},[e("input",{staticClass:"button w-button",attrs:{type:"button",value:"Add FAQ"},on:{click:t.processFAQ}}),e("input",{staticClass:"button w-button",attrs:{type:"submit",value:"Cancel","data-wait":"Please wait..."},on:{click:t.clearInput}})])])])],1)}),[function(){var t=this,e=t._self._c;return e("thead",[e("tr",[e("td",[t._v("S/N")]),t._v(" "),e("td",[t._v("Category")]),t._v(" "),e("td",[t._v("Question")]),t._v(" "),e("td",[t._v("Answer")]),t._v(" "),e("td",[t._v("Status")]),t._v(" "),e("td",[t._v("Actions")])])])},function(){var t=this,e=t._self._c;return e("label",{staticClass:"input-label",attrs:{for:"name-4"}},[t._v("FAQ Category"),e("span",{staticClass:"important"},[t._v("*")])])},function(){var t=this,e=t._self._c;return e("label",{staticClass:"input-label",attrs:{for:"name-4"}},[t._v("FAQ Question"),e("span",{staticClass:"important"},[t._v("*")])])},function(){var t=this,e=t._self._c;return e("label",{staticClass:"input-label",attrs:{for:"password-3"}},[t._v("FAQ Answer"),e("span",{staticClass:"important"},[t._v("*")])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{AdminConfirmation:n(351).default})}}]);