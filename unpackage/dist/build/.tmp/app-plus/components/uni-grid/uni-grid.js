(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-grid/uni-grid"],{"0f4f":function(t,n,u){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},r=[];u.d(n,"a",function(){return e}),u.d(n,"b",function(){return r})},"107e":function(t,n,u){"use strict";var e=u("6de9"),r=u.n(e);r.a},2586:function(t,n,u){"use strict";u.r(n);var e=u("dcc2"),r=u.n(e);for(var i in e)"default"!==i&&function(t){u.d(n,t,function(){return e[t]})}(i);n["default"]=r.a},"6de9":function(t,n,u){},"8e0f":function(t,n,u){"use strict";u.r(n);var e=u("0f4f"),r=u("2586");for(var i in r)"default"!==i&&function(t){u.d(n,t,function(){return r[t]})}(i);u("107e");var o=u("2877"),c=Object(o["a"])(r["default"],e["a"],e["b"],!1,null,null,null);n["default"]=c.exports},dcc2:function(t,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"uni-grid",props:{options:Array,type:{type:String,default:"square"},columnNum:{type:[Number,String],default:3},showOutBorder:{type:[Boolean,String],default:!0},showBorder:{type:[Boolean,String],default:!0}},data:function(){return{}},created:function(){this.columnNumber=this.gridGroup[0].length},computed:{gridGroup:function(){var t=this,n=[],u=[];if(this.options&&this.options.forEach(function(e,r){u.push(e),r%t.columnNum===t.columnNum-1&&(n.push(u),u=[])}),u.length>0){if(this.columnNum>u.length)for(var e=0,r=u.length;e<this.columnNum-r;e++)u.push({seize:!0});n.push(u)}return u=null,n}},methods:{onClick:function(t,n){this.$emit("click",{index:t*this.columnNumber+n})}}};n.default=e}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-grid/uni-grid-create-component',
    {
        'components/uni-grid/uni-grid-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("8e0f"))
        })
    },
    [['components/uni-grid/uni-grid-create-component']]
]);                
