(window.webpackJsonp=window.webpackJsonp||[]).push([[59,26,27,28,29],{344:function(t,e,n){var content=n(359);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(151).default)("77a42ce2",content,!0,{sourceMap:!1})},345:function(t,e,n){var content=n(361);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(151).default)("5004c2aa",content,!0,{sourceMap:!1})},349:function(t,e,n){"use strict";n.r(e);var o=n(8),r=(n(49),{methods:{logout:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$auth.logout();case 2:t.$router.push("/");case 3:case"end":return e.stop()}}),e)})))()}},computed:{isAuthenticated:function(){return this.$store.getters.isAuthenticated}}}),c=(n(360),n(57)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"navigation w-nav",attrs:{"data-animation":"default","data-collapse":"medium","data-duration":"400","data-easing":"ease","data-easing2":"ease",role:"banner"}},[e("div",{staticClass:"custom-container"},[e("div",{staticClass:"nav-flex"},[e("nuxt-link",{staticClass:"brand w-nav-brand",attrs:{to:{path:"/",query:{username:t.$route.query.username}}}},[e("img",{staticClass:"logo",attrs:{src:"/images/Renex-Logo.png",loading:"lazy",alt:"Renex Holdings"}})]),t._v(" "),e("nav",{staticClass:"nav-menu w-nav-menu",attrs:{role:"navigation"}},[e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/",query:{username:t.$route.query.username}}}},[t._v("Home")]),e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/about",query:{username:t.$route.query.username}}}},[t._v("About")]),e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/programs",query:{username:t.$route.query.username}}}},[t._v("Programs")]),e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/plan",query:{username:t.$route.query.username}}}},[t._v("Plans")]),t._v(" "),e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/contact",query:{username:t.$route.query.username}}}},[t._v("Contact")]),t._v(" "),e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/faq",query:{username:t.$route.query.username}}}},[t._v("FAQ")]),t._v(" "),e("nuxt-link",{staticClass:"nav-link w-nav-link",attrs:{to:{path:"/news",query:{username:t.$route.query.username}}}},[t._v("News")]),t._v(" "),e("div",{staticClass:"signin-holder"},[t.isAuthenticated?e("nuxt-link",{staticClass:"nav-link sign w-nav-link",attrs:{to:"/dashboard"}},[t._v("Dashboard")]):e("nuxt-link",{staticClass:"nav-link sign w-nav-link",attrs:{to:{path:"/signup",query:{username:t.$route.query.username}}}},[t._v("Sign up")])],1),t._v(" "),t.isAuthenticated?e("span",{staticClass:"nav-link w-nav-link login",on:{click:t.logout}},[t._v("Logout")]):e("nuxt-link",{staticClass:"nav-link w-nav-link login",attrs:{to:{path:"/login",query:{username:t.$route.query.username}}}},[t._v("Login")])],1),t._v(" "),t._m(0)],1)])])}),[function(){var t=this._self._c;return t("div",{staticClass:"menu-button w-nav-button"},[t("div",{staticClass:"menu-icon w-icon-nav-menu"})])}],!1,null,null,null);e.default=component.exports},351:function(t,e,n){"use strict";n.r(e);var o=n(8),r=(n(49),{data:function(){return{company:""}},methods:{setFileURL:function(){this.$store.commit("SET_URL",this.$config.FILE_URL)},getCompany:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/company");case 3:return n=e.sent,e.next=6,n.data.data;case 6:t.company=e.sent,e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log(e.t0.response.data);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()}},mounted:function(){this.setFileURL(),this.getCompany()}}),c=(n(358),n(57)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"custom-container footer",attrs:{id:"footer"}},[e("div",{staticClass:"footer-about"},[e("nuxt-link",{staticClass:"brand w-inline-block",attrs:{to:"/"}},[e("img",{attrs:{src:"/images/Renex-Logo.png",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"brief-footer-about"},[t._v("\n      A new way to make the payments easy, reliable and 100% secure.\n    ")]),t._v(" "),t._m(0)],1),t._v(" "),e("div",{staticClass:"footer-link-wrapper"},[e("ul",{staticClass:"footer-link-list",attrs:{role:"list"}},[t._m(1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("About")])],1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Services")])],1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Investment Plans")])],1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Programs")])],1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Terms & Conditions")])],1)]),t._v(" "),e("ul",{staticClass:"footer-link-list",attrs:{role:"list"}},[t._m(2),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Help Center")])],1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("FAQ")])],1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Suggestions")])],1),t._v(" "),e("li",{staticClass:"each-link-list"})]),t._v(" "),e("ul",{staticClass:"footer-link-list",attrs:{role:"list"}},[t._m(3),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Our Partners")])],1),t._v(" "),e("li",{staticClass:"each-link-list"},[e("nuxt-link",{staticClass:"each-footer-link",attrs:{to:"/"}},[t._v("Become Partner")])],1),t._v(" "),e("li",{staticClass:"each-link-list"})])]),t._v(" "),e("div",{staticClass:"bottom-footer"},[e("img",{staticClass:"footer-copyright",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a43df7050101ea0243b7e_copyright-icon.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",{staticClass:"footer-text"},[t._v("\n      "+t._s(t.company.companyName)+" "+t._s((new Date).getFullYear())+" All Rights\n      Reserved.\n    ")]),t._v(" "),t._m(4)])])}),[function(){var t=this,e=t._self._c;return e("ul",{staticClass:"footer-socials",attrs:{role:"list"}},[e("li",{staticClass:"each-footer-socials"},[e("div",{staticClass:"footer-icon-wrapper"},[e("img",{staticClass:"footer-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a4098d8112f3345e3639a_map-pin-line-icon%201.svg",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"brief-footer-about up"},[t._v("\n          400 Westcastle Streets, London, United Kingdom\n        ")])]),t._v(" "),e("li",{staticClass:"each-footer-socials"},[e("div",{staticClass:"footer-icon-wrapper"},[e("img",{staticClass:"footer-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a4098172496260b7b2d69_envelope-line-icon%201.svg",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"brief-footer-about up"},[t._v("support@nextgenfinance.com")])]),t._v(" "),e("li",{staticClass:"each-footer-socials"},[e("div",{staticClass:"footer-icon-wrapper"},[e("img",{staticClass:"footer-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a40982d63351bffcc2b1c_phone-line-icon%201.svg",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"brief-footer-about up"},[t._v("+445 0044 84483")])])])},function(){var t=this._self._c;return t("li",{staticClass:"links-title"},[t("div",[this._v("Quick Links")])])},function(){var t=this._self._c;return t("li",{staticClass:"links-title"},[t("div",[this._v("Community")])])},function(){var t=this._self._c;return t("li",{staticClass:"links-title"},[t("div",[this._v("Partners")])])},function(){var t=this._self._c;return t("div",{staticClass:"bottom-social-wrapper"},[t("a",{staticClass:"footer-icon-wrapper down w-inline-block",attrs:{href:"#"}},[t("img",{staticClass:"footer-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a43386165ba005847f1ef_linkedin-in.svg",loading:"lazy",alt:""}})]),t("a",{staticClass:"footer-icon-wrapper down w-inline-block",attrs:{href:"#"}},[t("img",{staticClass:"footer-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a43376a368f5a4edda4dc_instagram.svg",loading:"lazy",alt:""}})]),t("a",{staticClass:"footer-icon-wrapper down w-inline-block",attrs:{href:"#"}},[t("img",{staticClass:"footer-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a4337fe4c213c9b58b877_telegram-plane.svg",loading:"lazy",alt:""}})]),t("a",{staticClass:"footer-icon-wrapper down w-inline-block",attrs:{href:"#"}},[t("img",{staticClass:"footer-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a4338c5607b84c28e4c72_whatsapp.svg",loading:"lazy",alt:""}})])])}],!1,null,null,null);e.default=component.exports},358:function(t,e,n){"use strict";n(344)},359:function(t,e,n){var o=n(150)((function(i){return i[1]}));o.push([t.i,".custom-container.footer{background:#00040f}",""]),o.locals={},t.exports=o},360:function(t,e,n){"use strict";n(345)},361:function(t,e,n){var o=n(150)((function(i){return i[1]}));o.push([t.i,".nav-link.login{background-color:#00f6ff;border-radius:10px;color:#00040f;font-weight:600;padding:10px 20px}",""]),o.locals={},t.exports=o},372:function(t,e,n){var content=n(379);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(151).default)("944f727a",content,!0,{sourceMap:!1})},374:function(t,e,n){"use strict";n.r(e);var o=n(8),r=(n(49),n(20),n(93),n(13),n(39),n(26),{data:function(){return{partners:[],reviews:[],company:"",email:"",response:"",isError:!1,showResponse:!1,onRequest:!1,emailError:!1}},methods:{checkErrorInputs:function(input,data){if("email"==input){if(""==data||!data||!/^\S+@\S+\.\S+$/.test(data))return this.$el.querySelector(".email").classList.add("error"),this.isError=!1,this.emailError=!0,void(this.onRequest=!1);this.$el.querySelector(".email").classList.remove("error"),this.isError=!0,this.emailError=!1}},callResponse:function(t,e){var n=this;this.response=t,this.isError=e,this.showResponse=!0,this.onRequest=!1,setTimeout((function(){n.showResponse=!1}),6e3)},clearInputs:function(){this.email=""},setArray:function(){this.checkArray=[{name:"email",data:this.email}]},processEmail:function(){var t=this;this.onRequest=!0,this.setArray(),this.checkArray.forEach((function(e){t.checkErrorInputs(e.name,e.data)})),this.isError&&setTimeout((function(){t.callResponse("Thanks for subscribing successfully",!1)}),4e3)},getCompany:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/company");case 3:return n=e.sent,e.next=6,n.data.data;case 6:t.company=e.sent,t.time=t.company.dayStarted,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.response.data);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()}},mounted:function(){this.getCompany()}}),c=(n(378),n(57)),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"custom-container subscription w-form"},[e("div",{staticClass:"radial-gradient"}),t._v(" "),e("div",{staticClass:"subscribe-flex"},[e("div",{staticClass:"subscribe-highlight"},[t._v("Subscription")]),t._v(" "),t._m(0),t._v(" "),e("div",{staticClass:"text-custom center"},[t._v("\n      Subscribe to be the first to hear about upcoming\n      "+t._s(t.company.companyName)+" services!"),e("br")]),t._v(" "),e("label",{directives:[{name:"show",rawName:"v-show",value:t.emailError,expression:"emailError"}],staticClass:"sign-label error email",attrs:{for:"username-2"}},[t._v("Please enter a valid email address")]),t._v(" "),t.showResponse?e("div",{staticClass:"sign-label response",class:{error:t.isError}},[t._v("\n      "+t._s(t.response)+"\n    ")]):t._e(),t._v(" "),e("div",{staticClass:"subscribe-input pad"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"subscribe-field w-input",attrs:{type:"text",maxlength:"256",placeholder:"Enter Email",required:""},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}}),t._v(" "),t.onRequest?e("div",{staticClass:"custom-btn processing"},[e("img",{staticClass:"processing-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645afa6c4a84d4675d43a8b9_loader-icon.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",[t._v("Processing")])]):e("input",{staticClass:"custom-btn sub w-button",attrs:{type:"submit",value:"Subscribe","data-wait":"Please wait..."},on:{click:t.processEmail}})])])])}),[function(){var t=this._self._c;return t("h1",{staticClass:"intel-title center"},[this._v("\n      Join Our Community Let’s Register Now!"),t("br")])}],!1,null,null,null);e.default=component.exports},378:function(t,e,n){"use strict";n(372)},379:function(t,e,n){var o=n(150)((function(i){return i[1]}));o.push([t.i,".subscribe-field{border:none;outline:none}",""]),o.locals={},t.exports=o},393:function(t,e,n){"use strict";n.r(e);n(58),n(26);var o=n(8),r=(n(49),{data:function(){return{partners:[]}},methods:{loadScript:function(){var t=document.getElementById("script");null!=t&&document.body.removeChild(t);var script=document.createElement("script");script.type="text/javascript",script.src="/script/home.js",script.async=!0,script.id="script";var e=document.querySelector("#footer");e?e.appendChild(script):console.error("Could not find app node to append script element")},getPartners:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/partners");case 3:n=e.sent,t.partners=n.data.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.response.data.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()}},computed:{FILE_URL:function(){return this.$store.state.fileURL}},mounted:function(){this.getPartners()}}),c=n(57),component=Object(c.a)(r,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"custom-container"},[e("div",{staticClass:"partners"},t._l(t.partners,(function(n){return e("div",{key:n._id,staticClass:"each-partner"},[e("img",{staticClass:"partner-im",attrs:{src:"".concat(t.FILE_URL,"/").concat(n.image),loading:"lazy",alt:""}}),t._v(" "),e("h3",{staticClass:"partner-name"},[t._v(t._s(n.name))])])})),0)])}),[],!1,null,null,null);e.default=component.exports},570:function(t,e,n){"use strict";n.r(e);n(58);var o=n(8),r=(n(49),n(20),n(42),n(13),n(95),n(39),n(351),n(349)),c=n(374),l={data:function(){return{reviews:[],currencies:[],company:"",banner:"",firstBlogPost:"",secondBlogPost:"",profilePost:"",paymentPost:""}},methods:{loadScript:function(){var t=document.getElementById("script");null!=t&&document.body.removeChild(t);var script=document.createElement("script");script.type="text/javascript",script.src="/script/home.js",script.async=!0,script.id="script";var e=document.querySelector("#footer");e?e.appendChild(script):console.error("Could not find app node to append script element")},formatDate:function(data){if(null==data||null==data)return"N/A";var t=new Date(data).getTime();return new Intl.DateTimeFormat("en-US",{year:"numeric",month:"long",day:"numeric",suffix:function(t){return 1===t||21===t||31===t?"st":2===t||22===t?"nd":3===t||23===t?"rd":"th"}}).format(t)},formatMoney:function(t){return""==t||null==t||null==t?"0.00":t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")},firstBlog:function(data){this.firstBlogPost=data[data.length-1]},secondBlog:function(data){var t=this;data.forEach((function(e){"Strategy"==e.category&&(t.secondBlogPost=e)}))},profileBlog:function(data){var t=this;data.forEach((function(e){"Profile"==e.category&&(t.profilePost=e)}))},paymentBlog:function(data){var t=this;data.forEach((function(e){"Payment"==e.category&&(t.paymentPost=e)}))},getBlogs:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/blog");case 3:n=e.sent,t.firstBlog(n.data.data),t.secondBlog(n.data.data),t.profileBlog(n.data.data),t.paymentBlog(n.data.data),t.blogs=n.data.data,e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log(e.t0.response);case 14:case"end":return e.stop()}}),e,null,[[0,11]])})))()},getCurrencies:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/currency");case 3:n=e.sent,t.currencies=n.data.data,e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.response);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},getBanner:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/banner/?bannerCategory=Home");case 3:n=e.sent,t.banner=n.data.data[0],e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))()},getCompany:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/company");case 3:return n=e.sent,e.next=6,n.data.data;case 6:t.company=e.sent,t.time=t.company.dayStarted,e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.response.data);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},getReviews:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$axios.get("/review/?status=true");case 3:return o=e.sent,e.next=6,null===(n=o.data)||void 0===n?void 0:n.data;case 6:t.reviews=e.sent,t.loadScript(),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()}},computed:{FILE_URL:function(){return this.$store.state.fileURL}},mounted:function(){this.getBanner(),this.getReviews(),this.getBlogs(),this.getCompany(),this.getCurrencies()},components:{HomeNavigation:r.default,Subscription:c.default}},d=n(57),component=Object(d.a)(l,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"page index"},[t._m(0),t._v(" "),e("home-navigation"),t._v(" "),e("div",{staticClass:"home-hero"},[e("div",{staticClass:"left-gradient"}),t._v(" "),e("div",{staticClass:"right-gradient"}),t._v(" "),e("div",{staticClass:"custom-container"},[e("div",{staticClass:"home-hero-flex"},[e("div",{staticClass:"home-hero-left"},[t._m(1),t._v(" "),e("h1",{staticClass:"hero-title"},[t._v("\n             "+t._s(t.banner.bannerTitle)+"\n           ")]),t._v(" "),e("div",{staticClass:"hero-text"},[t._v("\n            "+t._s(t.banner.bannerSubtitle)),e("br")])]),t._v(" "),t._m(2)])])]),t._v(" "),e("div",{staticClass:"custom-container"},[e("div",{staticClass:"stats-flex"},[e("div",{staticClass:"each-stats"},[e("h1",{staticClass:"each-stats-number"},[e("strong",[t._v(t._s(t.formatMoney(t.company.activeMembers))+"+")])]),t._v(" "),e("h3",{staticClass:"each-stats-title"},[t._v("Active Users")])]),t._v(" "),e("div",{staticClass:"each-stats middle"},[e("h1",{staticClass:"each-stats-number"},[e("strong",[t._v(t._s(t.formatMoney(t.company.onlineMembers))+"+")])]),t._v(" "),e("h3",{staticClass:"each-stats-title"},[t._v("Online Users")])]),t._v(" "),e("div",{staticClass:"each-stats"},[e("h1",{staticClass:"each-stats-number"},[e("strong",[t._v(t._s(t.formatMoney(t.company.totalMembers))+"+")])]),t._v(" "),e("h3",{staticClass:"each-stats-title"},[t._v("Total Users")])])])]),t._v(" "),e("div",{staticClass:"custom-container"},[e("div",{staticClass:"profiting"},[t.secondBlogPost?e("div",{staticClass:"profiting-left"},[e("h1",{staticClass:"profiting-header"},[t._v("\n           "+t._s(t.secondBlogPost.title)+" "),e("br")]),t._v(" "),e("div",{staticClass:"custome-text",domProps:{innerHTML:t._s("".concat(t.secondBlogPost.content.substring(0,200),"..."))}}),t._v(" "),e("nuxt-link",{staticClass:"custom-btn w-button",attrs:{to:"/news-details/".concat(t.secondBlogPost._id)}},[t._v("Get Started")])],1):t._e(),t._v(" "),t._m(3)])]),t._v(" "),e("div",{staticClass:"transactions"},[e("div",{staticClass:"background-gradient"}),t._v(" "),e("div",{staticClass:"custom-container"},[e("div",{staticClass:"transaction-flex"},[t._m(4),t._v(" "),t.profilePost?e("div",{staticClass:"transaction-right pad"},[e("h1",{staticClass:"profiting-header"},[t._v("\n             "+t._s(t.profilePost.title)+"\n           ")]),t._v(" "),t.profilePost.content?e("div",{staticClass:"custome-text",domProps:{innerHTML:t._s("".concat(t.profilePost.content.substring(0,200),"..."))}}):t._e(),t._v(" "),e("nuxt-link",{staticClass:"custom-btn w-button",attrs:{to:"/news-details/".concat(t.profilePost._id)}},[t._v("Get Started")])],1):t._e()])])]),t._v(" "),e("div",{staticClass:"custom-container"},[e("div",{staticClass:"profiting"},[e("div",{staticClass:"profiting-left"},[e("h1",{staticClass:"profiting-header"},[t._v("\n          "+t._s(t.paymentPost.title)+"\n         ")]),t._v(" "),t.paymentPost.content?e("div",{staticClass:"custome-text",domProps:{innerHTML:t._s("".concat(t.paymentPost.content.substring(0,200),"..."))}}):t._e(),t._v(" "),e("nuxt-link",{staticClass:"custom-btn w-button",attrs:{to:"/news-details/".concat(t.paymentPost.content,"...")}},[t._v("Get Started")])],1),t._v(" "),e("div",{staticClass:"profiting-right"},[t._m(5),t._v(" "),t._m(6),t._v(" "),e("div",{staticClass:"transaction-table payment-methods"},[e("h3",{staticClass:"payment-title"},[t._v("Our Available Payments")]),t._v(" "),e("div",{staticClass:"payment-wrapper"},t._l(t.currencies,(function(n){return e("div",{key:n._id,staticClass:"each-payment"},[n.online?e("img",{staticClass:"payment-icon pay",attrs:{src:"".concat(n.image),loading:"lazy",alt:""}}):e("img",{staticClass:"payment-icon pay",attrs:{src:"".concat(t.FILE_URL,"/").concat(n.image),loading:"lazy",alt:""}})])})),0)]),t._v(" "),e("img",{staticClass:"circle-bg",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4d76ac15693b992129_Payment-Gateway-Steps-BG.webp",loading:"lazy",sizes:"(max-width: 479px) 77vw, (max-width: 767px) 76vw, (max-width: 1279px) 37vw, 400px",srcset:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4d76ac15693b992129_Payment-Gateway-Steps-BG-p-500.webp 500w, https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4d76ac15693b992129_Payment-Gateway-Steps-BG.webp 763w",alt:""}})])])]),t._v(" "),e("div",{staticClass:"custom-container"},[e("div",{staticClass:"testimonial-flex"},[t._m(7),t._v(" "),e("div",{staticClass:"testimonial-slider w-slider",attrs:{"data-delay":"4000","data-animation":"slide","data-autoplay":"false","data-easing":"ease","data-hide-arrows":"false","data-disable-swipe":"false","data-autoplay-limit":"0","data-nav-spacing":"3","data-duration":"500","data-infinite":"true"}},[e("div",{staticClass:"w-slider-mask"},t._l(t.reviews,(function(n){return e("div",{key:n._id,staticClass:"each-slide w-slide"},[e("div",{staticClass:"each-tesimony active"},[e("img",{staticClass:"quote-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459e81eef42071946da2a23_quote-left.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",{staticClass:"testimony-tex"},[t._v("\n                "+t._s(n.comment)+"\n               ")]),t._v(" "),e("div",{staticClass:"testimony-detail"},[e("div",{staticClass:"testimony-img"},[e("img",{staticClass:"testimony-image",attrs:{src:"".concat(t.FILE_URL,"/").concat(n.profilePicture),loading:"lazy",alt:""}})]),t._v(" "),e("div",[e("div",{staticClass:"testimony-name"},[t._v(t._s(n.username))]),t._v(" "),e("div",{staticClass:"testimony-title"},[t._v("Renex Holdings Investor")])])])])])})),0),t._v(" "),t._m(8),t._v(" "),t._m(9),t._v(" "),e("div",{staticClass:"nav-control w-slider-nav w-round"})])]),t._v(" "),e("div",{staticClass:"background-gradient right"})]),t._v(" "),e("partners"),t._v(" "),e("div",{staticClass:"custom-container"},[e("div",{staticClass:"artificial-intel"},[t.firstBlogPost?e("div",{staticClass:"intel-body"},[e("div",{staticClass:"intel-left"},[e("h1",{staticClass:"intel-title"},[t._v(t._s(t.firstBlogPost.title)),e("br")]),t._v(" "),e("div",{staticClass:"text-custom",domProps:{innerHTML:t._s("".concat(t.firstBlogPost.content.substring(0,300),"..."))}})]),t._v(" "),e("nuxt-link",{staticClass:"custom-btn w-button",attrs:{to:"news-details/".concat(t.firstBlogPost._id)}},[t._v("Read More")])],1):t._e()])]),t._v(" "),e("subscription"),t._v(" "),e("home-footer")],1)}),[function(){var t=this._self._c;return t("div",{staticClass:"scroll-up"},[t("img",{staticClass:"scroll-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a57fff24418be062a10b3_line-angle.svg",loading:"lazy",alt:""}})])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"gradient"},[e("div",{staticClass:"gradient-icon-holder"},[e("img",{staticClass:"info",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645a44cc6165ba866948182a_info-line-icon%201.svg",loading:"lazy",alt:""}})]),t._v(" "),e("h4",{staticClass:"gradient-title"},[t._v("\n               10% BONUS FOR ANY ACTIVE REFERRAL"),e("br")])])},function(){var t=this._self._c;return t("div",{staticClass:"hero-right"},[t("img",{staticClass:"big-ball",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4a47224a5d04cb2ca0_Payment-Gateway-Hero-Element.webp",loading:"lazy",alt:""}}),t("img",{staticClass:"midium-ball",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4a47224a5d04cb2ca0_Payment-Gateway-Hero-Element.webp",loading:"lazy",alt:""}}),t("img",{staticClass:"small-ball",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4a47224a5d04cb2ca0_Payment-Gateway-Hero-Element.webp",loading:"lazy",alt:""}}),t("img",{staticClass:"card-img",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4df76c2524f1a7d78d_Payment-Gateway-Hero-Image-3.webp",loading:"lazy",sizes:"(max-width: 479px) 92vw, (max-width: 767px) 63vw, (max-width: 991px) 52vw, (max-width: 1279px) 46vw, 500px",srcset:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4df76c2524f1a7d78d_Payment-Gateway-Hero-Image-3-p-500.webp 500w, https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4df76c2524f1a7d78d_Payment-Gateway-Hero-Image-3-p-800.webp 800w, https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4df76c2524f1a7d78d_Payment-Gateway-Hero-Image-3.webp 933w",alt:""}}),t("img",{staticClass:"card-img1",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4b84746953c7fce453_Payment-Gateway-Hero-Image-2.webp",loading:"lazy",sizes:"(max-width: 479px) 92vw, (max-width: 767px) 63vw, (max-width: 991px) 52vw, (max-width: 1279px) 46vw, 500px",srcset:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4b84746953c7fce453_Payment-Gateway-Hero-Image-2-p-500.webp 500w, https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4b84746953c7fce453_Payment-Gateway-Hero-Image-2-p-800.webp 800w, https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4b84746953c7fce453_Payment-Gateway-Hero-Image-2.webp 1054w",alt:""}}),t("img",{staticClass:"card-img2",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4945b8a96b46708f6d_Payment-Gateway-Hero-Image-1.webp",loading:"lazy",sizes:"(max-width: 479px) 92vw, (max-width: 767px) 52vw, (max-width: 991px) 39vw, 370px",srcset:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4945b8a96b46708f6d_Payment-Gateway-Hero-Image-1-p-500.webp 500w, https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4945b8a96b46708f6d_Payment-Gateway-Hero-Image-1.webp 760w",alt:""}})])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"profiting-right"},[e("div",{staticClass:"each-profiting-right"},[e("div",{staticClass:"profiting-icon-holder"},[e("img",{staticClass:"profiting-icons",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645995782407a45ea1a9bff5_black-star-icon%201.svg",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"profiting-content"},[e("h3",{staticClass:"profiting_title"},[t._v("Rewards")]),t._v(" "),e("div",{staticClass:"custome-text no-top"},[t._v("\n               The best incentive program to support your investment & referral effort\n             ")])])]),t._v(" "),e("div",{staticClass:"each-profiting-right"},[e("div",{staticClass:"profiting-icon-holder"},[e("img",{staticClass:"profiting-icons",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645995782ba2084e4d347ac0_shield-sedo-line-icon%201.svg",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"profiting-content"},[e("h3",{staticClass:"profiting_title"},[t._v("100% Secured")]),t._v(" "),e("div",{staticClass:"custome-text no-top"},[t._v("\n               Keeping your investment and personal data private & safe\n             ")])])]),t._v(" "),e("div",{staticClass:"each-profiting-right"},[e("div",{staticClass:"profiting-icon-holder"},[e("img",{staticClass:"profiting-icons",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/645995793c345944e87f0e1b_convert-icon%201.svg",loading:"lazy",alt:""}})]),t._v(" "),e("div",{staticClass:"profiting-content"},[e("h3",{staticClass:"profiting_title"},[t._v("Instant Withdrawal")]),t._v(" "),e("div",{staticClass:"custome-text no-top"},[t._v("\n               Making the process of withdrawal of your invested funds instanteneous\n             ")])])])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"transaction-left"},[e("div",{staticClass:"transaction-payment"},[e("img",{staticClass:"payment-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459ac71680449184335ed80_accept-icon.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",[t._v("Every payment Accounted for")])]),t._v(" "),e("div",{staticClass:"transaction-table top-payment"},[e("div",{staticClass:"investor-profile"},[e("div",{staticClass:"investor-img"},[e("img",{staticClass:"investor-pics",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64594d4cef5dff0b42a48986_testimonial-3.jpg",loading:"lazy",alt:""}})]),t._v(" "),e("div",[e("h4",{staticClass:"transaction-name"},[t._v("Amanda")]),t._v(" "),e("div",{staticClass:"transaction-time"},[t._v("Lucky Investor")])])]),t._v(" "),e("div",{staticClass:"investor-flex"},[e("div",[e("div",{staticClass:"transaction-time small"},[t._v("Amount")]),t._v(" "),e("h4",{staticClass:"transaction-name"},[t._v("$204")])]),t._v(" "),e("a",{staticClass:"custom-btn-outline w-button",attrs:{href:"#"}},[t._v("Last Week")])]),t._v(" "),e("a",{staticClass:"custom-btn sm w-button",attrs:{href:"#"}},[t._v("View Investor Profile")])]),t._v(" "),e("div",{staticClass:"transaction-table"},[e("h3",{staticClass:"transaction-title"},[t._v("Top 5 Most invested Currencies")]),t._v(" "),e("div",{staticClass:"each-transctions"},[e("img",{staticClass:"transaction-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64599c9cb266ba90a2c1f54f_bitcoin-btc-logo.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",[e("h4",{staticClass:"transaction-name"},[t._v("Bitcoin")]),t._v(" "),e("div",{staticClass:"transaction-time"},[t._v("Up Trending")])]),t._v(" "),e("div",{staticClass:"transaction-value"},[e("h4",{staticClass:"transaction-name value"},[t._v("% Investment")]),t._v(" "),e("div",{staticClass:"transaction-amount-holder"},[e("img",{staticClass:"amount-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459a2bbeaab7f84dfeae21d_triangle-bottom-icon%202.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",{staticClass:"transaction-time amount"},[t._v("51.3%")])])])]),t._v(" "),e("div",{staticClass:"each-transctions"},[e("img",{staticClass:"transaction-icon",staticStyle:{height:"40px"},attrs:{src:"https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880",loading:"lazy",alt:""}}),t._v(" "),e("div",[e("h4",{staticClass:"transaction-name"},[t._v("Ethereum")]),t._v(" "),e("div",{staticClass:"transaction-time"},[t._v("Up Trending")])]),t._v(" "),e("div",{staticClass:"transaction-value"},[e("h4",{staticClass:"transaction-name value"},[t._v("% Investment")]),t._v(" "),e("div",{staticClass:"transaction-amount-holder"},[e("img",{staticClass:"amount-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459a2bbeaab7f84dfeae21d_triangle-bottom-icon%202.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",{staticClass:"transaction-time amount"},[t._v("26.8%")])])])]),t._v(" "),e("div",{staticClass:"each-transctions"},[e("img",{staticClass:"transaction-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/64599c9cb266baedcfc1f54e_tether-usdt-logo.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",[e("h4",{staticClass:"transaction-name"},[t._v("USDT TRC20")]),t._v(" "),e("div",{staticClass:"transaction-time"},[t._v("Down Trending")])]),t._v(" "),e("div",{staticClass:"transaction-value"},[e("h4",{staticClass:"transaction-name value"},[t._v("% Investment")]),t._v(" "),e("div",{staticClass:"transaction-amount-holder"},[e("img",{staticClass:"amount-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459a2bb2407a47e0baac35b_triangle-bottom-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",{staticClass:"transaction-time amount"},[t._v("13.4%")])])])]),t._v(" "),e("div",{staticClass:"each-transctions"},[e("img",{staticClass:"transaction-icon",staticStyle:{height:"40px"},attrs:{src:"https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850",loading:"lazy",alt:""}}),t._v(" "),e("div",[e("h4",{staticClass:"transaction-name"},[t._v("Binance")]),t._v(" "),e("div",{staticClass:"transaction-time"},[t._v("Down Trending")])]),t._v(" "),e("div",{staticClass:"transaction-value"},[e("h4",{staticClass:"transaction-name value"},[t._v("% Investment")]),t._v(" "),e("div",{staticClass:"transaction-amount-holder"},[e("img",{staticClass:"amount-icon",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459a2bb2407a47e0baac35b_triangle-bottom-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),e("div",{staticClass:"transaction-time amount"},[t._v("5.2%")])])])])])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"transaction-table scan"},[e("img",{staticClass:"scan-img",attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459e1fa82a2fe25d042986f_qr-code-scan-icon%201.svg",loading:"lazy",alt:""}}),t._v(" "),e("h3",{staticClass:"payment-title sm"},[t._v("Scan Wallet Address")]),t._v(" "),e("div",[t._v("\n             For faster payment experience, scan wallet address in the\n             dashboard\n           ")])])},function(){var t=this._self._c;return t("div",{staticClass:"transaction-table person"},[t("img",{attrs:{src:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459dd9a5d5714e0fc7267c0_peson.jpg",loading:"lazy",sizes:"(max-width: 479px) 84vw, 210px",srcset:"https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459dd9a5d5714e0fc7267c0_peson-p-500.jpg 500w, https://uploads-ssl.webflow.com/6458b19446eea345a074cdaf/6459dd9a5d5714e0fc7267c0_peson.jpg 563w",alt:""}})])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"testimonial-top"},[e("h1",{staticClass:"profiting-header cut"},[t._v("\n           What People Are Saying About us"),e("br")]),t._v(" "),e("div",{staticClass:"custome-text full"},[t._v("\n           Everything you need to accept card payments and grow your business\n           anywhere on the planet."),e("br")])])},function(){var t=this._self._c;return t("div",{staticClass:"testimony-arrow w-slider-arrow-left"},[t("div",{staticClass:"w-icon-slider-left"})])},function(){var t=this._self._c;return t("div",{staticClass:"testimony-arrow w-slider-arrow-right"},[t("div",{staticClass:"w-icon-slider-right"})])}],!1,null,null,null);e.default=component.exports;installComponents(component,{HomeNavigation:n(349).default,Partners:n(393).default,Subscription:n(374).default,HomeFooter:n(351).default})}}]);