(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{328:function(t,n,e){var content=e(335);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(150).default)("730ebd9c",content,!0,{sourceMap:!1})},333:function(t,n,e){"use strict";e.r(n);var l=e(8),o=(e(53),{methods:{logout:function(){var t=this;return Object(l.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.$auth.logout();case 2:t.$router.push("/");case 3:case"end":return n.stop()}}),n)})))()}},computed:{isAuthenticated:function(){return this.$store.getters.isAuthenticated}}}),r=(e(334),e(61)),component=Object(r.a)(o,(function(){var t=this,n=t._self._c;return n("div",{staticClass:"nav-about-us w-nav",attrs:{"data-animation":"default","data-collapse":"medium","data-duration":"400","data-easing":"ease","data-easing2":"ease",role:"banner"}},[n("div",{staticClass:"container-new about-us"},[n("div",[n("nuxt-link",{staticClass:"brand-4 w-nav-brand",attrs:{to:"/"}},[n("img",{attrs:{src:"/images/Landmark-Logo.png",loading:"lazy",width:"150",alt:""}})]),t._v(" "),n("div",{attrs:{id:"ytWidget"}})],1),t._v(" "),n("nav",{staticClass:"nav-menu-3 w-nav-menu",attrs:{role:"navigation"}},[n("nuxt-link",{staticClass:"navlink-new w-nav-link",attrs:{to:"/"}},[t._v("Home")]),n("nuxt-link",{staticClass:"navlink-new w-nav-link",attrs:{to:"/about"}},[t._v("ABOUT")]),n("nuxt-link",{staticClass:"navlink-new w-nav-link",attrs:{to:"/gallery"}},[t._v("GALLERY")]),n("nuxt-link",{staticClass:"navlink-new w-nav-link",attrs:{to:"/plan"}},[t._v("PLAN")]),n("nuxt-link",{staticClass:"navlink-new w-nav-link",attrs:{to:"/faq"}},[t._v("FAQ")]),n("nuxt-link",{staticClass:"navlink-new w-nav-link",attrs:{to:"/contact"}},[t._v("CONTACT")]),n("nuxt-link",{staticClass:"navlink-new w-nav-link",class:{hide:t.isAuthenticated},attrs:{to:"/signup"}},[t._v("SIGN UP")]),t._v(" "),n("nuxt-link",{staticClass:"button-13 w-button",class:{hide:t.isAuthenticated},attrs:{"data-w-id":"4d4f1d77-0b7e-0bc8-3bb1-37cede9dd815",to:"/login"}},[t._v("Login")]),t._v(" "),n("nuxt-link",{staticClass:"navlink-new w-nav-link",class:{hide:!t.isAuthenticated},attrs:{to:"/dashboard"}},[t._v("Dashboard")]),t._v(" "),n("a",{staticClass:"button-13 w-button",class:{hide:!t.isAuthenticated},attrs:{"data-w-id":"4d4f1d77-0b7e-0bc8-3bb1-37cede9dd815",to:"#"}},[t._v("Logout")])],1),t._v(" "),t._m(0)]),t._v(" "),n("div",{staticClass:"div-block-278"})])}),[function(){var t=this._self._c;return t("div",{staticClass:"menu-button-4 w-nav-button"},[t("div",{staticClass:"w-icon-nav-menu"})])}],!1,null,null,null);n.default=component.exports},334:function(t,n,e){"use strict";e(328)},335:function(t,n,e){var l=e(149)((function(i){return i[1]}));l.push([t.i,".button-13.hide,.navlink-new.hide{display:none}",""]),l.locals={},t.exports=l}}]);