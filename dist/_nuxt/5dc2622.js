(window.webpackJsonp=window.webpackJsonp||[]).push([[34,15,16],{364:function(t,e,n){"use strict";n.r(e);var l={head:function(){return{link:[{rel:"stylesheet",type:"text/css",href:"/css/client.css"}]}},computed:{isAuthenticated:function(){return this.$store.getters.isAuthenticated}}},c=n(57),component=Object(c.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"nav-section top wf-section"},[e("div",{staticClass:"navbar w-nav",attrs:{"data-animation":"default","data-collapse":"medium","data-duration":"400","data-easing":"ease","data-easing2":"ease",role:"banner"}},[e("div",{staticClass:"nav-container"},[e("div",{staticClass:"div-block-165"},[e("nuxt-link",{staticClass:"brand w-nav-brand",attrs:{to:{path:"/",query:{username:t.$route.query.username}}}},[e("img",{staticClass:"image",attrs:{src:"/images/Mam-Logo.png",loading:"lazy",alt:""}})]),t._v(" "),e("nav",{staticClass:"nav-menu w-nav-menu",attrs:{role:"navigation"}},[e("span",{staticClass:"nav-link w-nav-link"},[t._v("About")]),e("span",{staticClass:"nav-link w-nav-link"},[t._v("Services")]),e("span",{staticClass:"nav-link w-nav-link"},[t._v("Map")]),e("span",{staticClass:"nav-link w-nav-link"},[t._v("Faq")]),e("span",{staticClass:"nav-link w-nav-link"},[t._v("Investment Plan")]),e("span",{staticClass:"nav-link w-nav-link"},[t._v(" Team")]),e("span",{staticClass:"nav-link w-nav-link"},[t._v("News/Blog")]),t._v(" "),e("span",{staticClass:"nav-link w-nav-link"},[t._v("Contact")]),t._v(" "),t.isAuthenticated?t._e():e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/signup",query:{username:t.$route.query.username}}}},[t._v("Sign Up")]),t._v(" "),t.isAuthenticated?t._e():e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/login",query:{username:t.$route.query.username}}}},[t._v("Login")]),t._v(" "),t.isAuthenticated?e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:"/dashboard"}},[t._v("Dashboard")]):t._e(),t._v(" "),t.isAuthenticated?e("span",{staticClass:"nav-link w-nav-link"},[t._v("Logout")]):t._e()],1),t._v(" "),t._m(0)],1)])])])}),[function(){var t=this._self._c;return t("div",{staticClass:"menu-button w-nav-button"},[t("div",{staticClass:"icon-7 w-icon-nav-menu"})])}],!1,null,null,null);e.default=component.exports},365:function(t,e,n){"use strict";n.r(e);var l=n(8),c=(n(49),{data:function(){return{company:""}},methods:{getCompany:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/company");case 3:n=e.sent,t.company=n.data.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.response.data);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}},mounted:function(){this.getCompany()}}),o=n(57),component=Object(o.a)(c,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"footer wf-section",attrs:{id:"footer"}},[e("div",{staticClass:"div-block-117"},[e("div",{staticClass:"cumstom-container"},[e("div",{staticClass:"div-block-85"},[e("div",{staticClass:"div-block-87"},[e("nuxt-link",{staticClass:"link-block-4 w-inline-block",attrs:{to:{path:"/",query:{username:t.$route.query.username}}}},[e("img",{staticClass:"image-13",attrs:{src:"/images/Mam-Logo.png",loading:"lazy",alt:""}}),t._v(" "),e("h1",{staticClass:"heading-20"},[t._v("\n              © "+t._s((new Date).getFullYear())+", "+t._s(t.company.companyName)+".\n            ")])])],1),t._v(" "),t._m(0),t._v(" "),t._m(1)])])])])}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"div-block-156"},[e("div",{staticClass:"div-block-86"},[e("a",{staticClass:"link-block-5 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("About")])]),e("a",{staticClass:"link-block-5 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Road Map")])]),e("a",{staticClass:"link-block-5 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Token")])]),e("a",{staticClass:"link-block-5 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Team")])])]),t._v(" "),e("div",{staticClass:"div-block-88"},[e("a",{staticClass:"link-block-6 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Services")])]),e("a",{staticClass:"link-block-6 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Statistic")])]),e("a",{staticClass:"link-block-6 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("White Paper")])]),e("a",{staticClass:"link-block-6 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("FAQ")])])]),t._v(" "),e("div",{staticClass:"div-block-89"},[e("a",{staticClass:"link-block-7 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("White Paper")])]),e("a",{staticClass:"link-block-7 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Technical Paper")])]),e("a",{staticClass:"link-block-7 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Business Summary")])]),e("a",{staticClass:"link-block-7 w-inline-block",attrs:{href:"#"}},[e("h1",{staticClass:"heading-19"},[t._v("Brand Resources")])])])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"div-block-90"},[e("div",{staticClass:"form-block w-form"},[e("form",{staticClass:"form",attrs:{id:"email-form-2",name:"email-form-2","data-name":"Email Form 2",method:"get"}},[e("label",{staticClass:"heading-19 s",attrs:{for:"email-4"}},[t._v("Subscribe")]),t._v(" "),e("div",{staticClass:"div-block-91"},[e("input",{staticClass:"text-field-3 w-input",attrs:{type:"email",maxlength:"256",name:"email-2","data-name":"Email 2",placeholder:"Email",id:"email-2",required:""}}),e("input",{staticClass:"submit-button-2 w-button",attrs:{type:"submit",value:"Send","data-wait":"Please wait..."}})])])])])}],!1,null,null,null);e.default=component.exports},381:function(t,e,n){var content=n(409);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(150).default)("48b73931",content,!0,{sourceMap:!1})},408:function(t,e,n){"use strict";n(381)},409:function(t,e,n){var l=n(149)((function(i){return i[1]}));l.push([t.i,".field-label-3{color:#cf0606;font-size:14px;margin-bottom:0;opacity:0}.field-label-3.active{opacity:1}.response-text{color:#0dcf06;font-size:15px}.response-text.error{color:#cf0606}.click-box,.terms-check{align-items:center;display:flex}.click-box{border:3px solid #8761a8;cursor:pointer;height:20px;justify-content:center;margin-right:10px;width:20px}.click-box.sm.checked .check{background:#8761a8;height:10px;width:10px}",""]),l.locals={},t.exports=l},451:function(t,e,n){"use strict";n.r(e);var l=n(8),c=(n(49),n(93),n(365)),o=n(364),r={data:function(){return{response:"",isError:!1,showResponse:!1,onRequest:!1,status:!1}},methods:{callResponse:function(t,e){var n=this;this.response=t,this.isError=e,this.showResponse=!0,this.onRequest=!1,setTimeout((function(){n.showResponse=!1}),6e3)},activateUser:function(t){var e=this;return Object(l.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,e.$axios.patch("/users/activate-user/".concat(t),{suspension:!1});case 3:n.sent,e.status=!0,n.next=10;break;case 7:n.prev=7,n.t0=n.catch(0),e.callResponse(n.t0.response.data.message,!0);case 10:case"end":return n.stop()}}),n,null,[[0,7]])})))()},loadScript:function(){var t=document.getElementById("script");null!=t&&document.body.removeChild(t);var script=document.createElement("script");script.type="text/javascript",script.src="/scripts/client.js",script.async=!0,script.id="script";var e=document.querySelector("#footer");e?e.appendChild(script):console.error("Could not find app node to append script element")}},mounted:function(){this.$route.query.token?this.activateUser(this.$route.query.token):this.$router.push("/signup")},computed:{isAuthenticated:function(){return this.$store.getters.isAuthenticated}},components:{ClientFooter:c.default,ClientHeader:o.default}},d=(n(408),n(57)),component=Object(d.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"signup"},[e("client-header"),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"signup wf-section"},[e("div",{staticClass:"cumstom-container"},[e("div",{staticClass:"div-block-142"},[e("div",{staticClass:"div-block-140"},[e("div",{staticClass:"div-block-145"},[t.status?e("h1",{staticClass:"heading-2-big"},[t._v("\n              CONGRATS... REGISTRATION SUCCESSFUL\n            ")]):e("h1",{staticClass:"heading-2-big"},[t._v("CONFIRMING REGISTRATION")])]),t._v(" "),t.status?e("h1",{staticClass:"heading-44"},[t._v("\n            Your account has been activated, kindly\n            "),e("nuxt-link",{attrs:{to:"login"}},[t._v("login ")]),t._v(" to continue.\n          ")],1):t._e(),t._v(" "),e("div",{staticClass:"terms-check"},[t.showResponse?e("div",{staticClass:"response-text",class:{error:t.isError}},[t._v("\n              "+t._s(t.response)+"\n            ")]):t._e()])])])])]),t._v(" "),e("client-footer")],1)}),[function(){var t=this,e=t._self._c;return e("div",{staticClass:"signuphero-section wf-section"},[e("div",{staticClass:"div-block-164"},[e("img",{staticClass:"image-46",attrs:{src:"https://uploads-ssl.webflow.com/634f65db6f66af39a9853ff1/6356149fa7b90c075dd07b8e_scroll-down%20(1).png",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"cumstom-container"},[e("div",{staticClass:"div-block-95 log-hero"},[e("h1",{staticClass:"heading-2"},[t._v("Global Stock Investment")]),t._v(" "),e("h1",{staticClass:"heading-2-second"},[t._v("for stock investment business.")]),t._v(" "),e("div",{staticClass:"text-block-16"},[t._v("\n          Make sound investment decisions with the help of our research &\n          analytical assets. The minimum deposit is $5, and maximum is\n          $100,000. We pay 7 days per week. You may make additional deposits\n          at any time. All our payments are instant payments.\n        ")]),t._v(" "),e("div",{staticClass:"div-block-96"},[e("a",{staticClass:"link-block-8 w-inline-block",attrs:{href:"#"}},[e("img",{staticClass:"image-14",attrs:{src:"https://uploads-ssl.webflow.com/634f65db6f66af39a9853ff1/634f78e65675d95b9dc4502b_smart%20contract.svg",loading:"lazy",alt:""}}),t._v(" "),e("h1",{staticClass:"heading-21"},[t._v("Smart Contact")])]),e("a",{staticClass:"link-block-8 w-inline-block",attrs:{href:"#"}},[e("img",{staticClass:"image-14",attrs:{src:"https://uploads-ssl.webflow.com/634f65db6f66af39a9853ff1/6357dc2cfd34f9fb0426bd59_1220316_youtube_video_icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),e("h1",{staticClass:"heading-21"},[t._v("How to buy Token")])])]),t._v(" "),e("div",{staticClass:"div-block-98"},[e("a",{staticClass:"button-2 w-button",attrs:{href:"#"}},[t._v("White Papper")]),e("a",{staticClass:"button-2 _2nd w-button",attrs:{href:"#"}},[t._v("One Pager")])])])])])}],!1,null,null,null);e.default=component.exports;installComponents(component,{ClientHeader:n(364).default,ClientFooter:n(365).default})}}]);