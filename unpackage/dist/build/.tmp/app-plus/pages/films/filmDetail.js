(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/films/filmDetail"],{6707:function(i,e,t){"use strict";t.r(e);var s=t("f1d9"),l=t("952a");for(var a in l)"default"!==a&&function(i){t.d(e,i,function(){return l[i]})}(a);var n=t("2877"),o=Object(n["a"])(l["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},7256:function(i,e,t){"use strict";(function(i){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s=t("1c23"),l=t("d7ab"),a=function(){return t.e("components/uni-rate/uni-rate").then(t.bind(null,"7f16"))},n={data:function(){return{filmId:"",film:{},num:0,last:5,num1:0,last1:5,userInfo:{},seen:{},btnShow:!1,status:0,myFilmId:"",modalName:null,films:[]}},onLoad:function(e){console.log("option"+JSON.stringify(e)," at pages\\films\\filmDetail.vue:128"),this.filmId=e.filmId,this.getFilm(),this.userInfo=i.getStorageSync("userinfo"),this.getMyFilm(),this.findFilms()},components:{uniRate:a},methods:{findFilms:function(){var i=this;(0,l.findFilmByUserId)({userId:this.userInfo._id}).then(function(e){console.log("res",JSON.stringify(e)," at pages\\films\\filmDetail.vue:140"),0===e.errno&&(i.films=e.data)},function(i){console.log("err",JSON.stringfy(i)," at pages\\films\\filmDetail.vue:146")})},getFilm:function(){var i=this;console.log("this.filmId",JSON.stringify(this.filmId)," at pages\\films\\filmDetail.vue:151"),(0,s.findFilmById)({id:this.filmId}).then(function(e){if(console.log("res"+JSON.stringify(e)," at pages\\films\\filmDetail.vue:154"),0===e.errno){0===e.data.dimensional?e.data.dimensional="3D":e.data.dimensional="2D",console.log("parseInt(res.data.score)",JSON.stringify(parseInt(e.data.score))," at pages\\films\\filmDetail.vue:161"),10==parseInt(e.data.score)&&e.data.score?(console.log("1"," at pages\\films\\filmDetail.vue:163"),i.num=5,i.last=0):8<=parseInt(e.data.score)<10&&e.data.score?(console.log("2"," at pages\\films\\filmDetail.vue:167"),i.num=4,i.last=1):6<=parseInt(e.data.score)<8&&e.data.score?(console.log("3"," at pages\\films\\filmDetail.vue:171"),i.num=3,i.last=2):4<=parseInt(e.data.score)<6&&e.data.score?(console.log("4"," at pages\\films\\filmDetail.vue:175"),i.num=2,i.last=3):0<parseInt(e.data.score)<4&&e.data.score&&(console.log("5"," at pages\\films\\filmDetail.vue:179"),i.num=1,i.last=4);var t=e.data.performer.trim().split(" ");e.data.performer1=t[0],e.data.performer2=t[1],i.film=e.data,i.film.pictures="http://"+i.film.pictures,console.log("this.film",JSON.stringify(i.film)," at pages\\films\\filmDetail.vue:188")}},function(i){console.log("err"+JSON.stringify(i)," at pages\\films\\filmDetail.vue:192")})},getMyFilm:function(){var i=this,e={userId:this.userInfo._id,filmId:this.filmId};(0,l.findMyFilmByFilmIdUserId)(e).then(function(e){0===e.errno&&(console.log("res.data",JSON.stringify(e.data)," at pages\\films\\filmDetail.vue:204"),i.seen=e.data,e.data.score&&(10==parseInt(e.data.score)&&e.data.score?(console.log("1"," at pages\\films\\filmDetail.vue:208"),i.num1=5,i.last1=0):8<=parseInt(e.data.score)<10&&e.data.score?(console.log("2"," at pages\\films\\filmDetail.vue:212"),i.num1=4,i.last1=1):6<=parseInt(e.data.score)<8&&e.data.score?(console.log("3"," at pages\\films\\filmDetail.vue:216"),i.num1=3,i.last1=2):4<=parseInt(e.data.score)<6&&e.data.score?(console.log("4"," at pages\\films\\filmDetail.vue:220"),i.num1=2,i.last1=3):0<parseInt(e.data.score)<4&&e.data.score&&(console.log("5"," at pages\\films\\filmDetail.vue:224"),i.num1=1,i.last1=4)),i.myFilmId=e.data._id,1===e.data.status&&(i.btnShow=!0)),console.log("res"+JSON.stringify(e)," at pages\\films\\filmDetail.vue:234")},function(i){console.log("err"+JSON.stringify(i)," at pages\\films\\filmDetail.vue:237")})},wantSeen:function(e){if(this.status=e,console.log("e",JSON.stringify(e)," at pages\\films\\filmDetail.vue:243"),1===e)this.btnShow=!this.btnShow,this.choose();else if(2===e)this.btnShow=!this.btnShow,this.delete();else if(0===e){var t=[];if(this.films.forEach(function(i){t.push(i.filmId)}),console.log("ids",JSON.stringify(t)," at pages\\films\\filmDetail.vue:255"),console.log("ids",JSON.stringify(t)," at pages\\films\\filmDetail.vue:256"),-1===t.indexOf(this.filmId)){console.log("11111111"," at pages\\films\\filmDetail.vue:258");var s={userId:this.userInfo._id,filmId:this.filmId,status:this.status};(0,l.addMyFilm)(s).then(function(i){console.log("res",JSON.stringify(i)," at pages\\films\\filmDetail.vue:266"),i.errno},function(i){console.log("err",JSON.stringify(i)," at pages\\films\\filmDetail.vue:271")})}else console.log("2222222222"," at pages\\films\\filmDetail.vue:275"),this.updateNyFilm();i.navigateTo({url:"../my/score?filmId="+this.filmId})}},choose:function(){var i=this,e={userId:this.userInfo._id,filmId:this.filmId,status:this.status};(0,l.addMyFilm)(e).then(function(e){console.log("res",JSON.stringify(e)," at pages\\films\\filmDetail.vue:291"),0===e.errno&&(i.modalName="Image",i.film.wantSeeNum=i.film.wantSeeNum+1,i.update(i.film))},function(i){console.log("err",JSON.stringify(i)," at pages\\films\\filmDetail.vue:299")})},delete:function(){var i=this;(0,l.deleteMyFilm)({id:this.myFilmId}).then(function(e){console.log("res",JSON.stringify(e)," at pages\\films\\filmDetail.vue:306"),0===e.errno&&(i.film.wantSeeNum=i.film.wantSeeNum-1,i.update(i.film))},function(i){console.log("err",JSON.stringify(i)," at pages\\films\\filmDetail.vue:313")})},update:function(i){var e=this;(0,s.updateFilm)(i).then(function(i){console.log("res",JSON.stringify(i)," at pages\\films\\filmDetail.vue:320"),0===i.errno&&(e.getFilm(),e.getMyFilm())},function(i){console.log("err",JSON.stringify(i)," at pages\\films\\filmDetail.vue:327")})},updateNyFilm:function(){this.seen.status=this.status,console.log("this.seen",JSON.stringify(this.seen)," at pages\\films\\filmDetail.vue:333"),(0,l.updateMyFilm)(this.seen).then(function(i){i.errno},function(i){console.log("err",JSON.stringify(i)," at pages\\films\\filmDetail.vue:340")})},hideModal:function(){this.modalName=null},goFindCinema:function(){i.navigateTo({url:"../films/findCinema?id="+this.film._id+"&filmName="+this.film.filmName})}}};e.default=n}).call(this,t("6e42")["default"])},"952a":function(i,e,t){"use strict";t.r(e);var s=t("7256"),l=t.n(s);for(var a in s)"default"!==a&&function(i){t.d(e,i,function(){return s[i]})}(a);e["default"]=l.a},f1d9:function(i,e,t){"use strict";var s=function(){var i=this,e=i.$createElement;i._self._c},l=[];t.d(e,"a",function(){return s}),t.d(e,"b",function(){return l})}},[["7326","common/runtime","common/vendor"]]]);