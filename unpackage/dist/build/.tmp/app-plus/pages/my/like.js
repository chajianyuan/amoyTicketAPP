(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/like"],{4882:function(t,n,e){"use strict";e.r(n);var i=e("734c"),o=e("9c62");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);var l=e("2877"),r=Object(l["a"])(o["default"],i["a"],i["b"],!1,null,null,null);n["default"]=r.exports},"734c":function(t,n,e){"use strict";var i=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return i}),e.d(n,"b",function(){return o})},"9c62":function(t,n,e){"use strict";e.r(n);var i=e("b063"),o=e.n(i);for(var u in i)"default"!==u&&function(t){e.d(n,t,function(){return i[t]})}(u);n["default"]=o.a},b063:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i=e("d7ab"),o=e("1c23"),u={data:function(){return{num:0,films:[],userInfo:{}}},onShow:function(){this.userInfo=t.getStorageSync("userinfo"),this.getMyFilm()},methods:{goFilmDetail:function(n){t.navigateTo({url:"../films/filmDetail?filmId="+n._id})},getMyFilm:function(){var t=this;this.films=[],(0,i.findFilmByUserId)({userId:this.userInfo._id}).then(function(n){console.log("res",JSON.stringify(n)," at pages\\my\\like.vue:63"),0===n.errno&&n.data.forEach(function(n){1===n.status&&(0,o.findFilmById)({id:n.filmId}).then(function(n){console.log("res1",JSON.stringify(n)," at pages\\my\\like.vue:70"),0===n.errno&&(n.data.pictures="http://"+n.data.pictures,t.films.push(n.data),console.log("this.films",JSON.stringify(t.films)," at pages\\my\\like.vue:74"),t.num=t.films.length)},function(t){console.log("err1",JSON.stringify(t)," at pages\\my\\like.vue:80")})})},function(t){console.log("err",JSON.stringify(t)," at pages\\my\\like.vue:88")})}}};n.default=u}).call(this,e("6e42")["default"])}},[["7315","common/runtime","common/vendor"]]]);