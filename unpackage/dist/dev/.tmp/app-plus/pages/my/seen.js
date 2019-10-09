(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/my/seen"],{

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!E:/课设/大三第二学期/amoyTicketApp/pages/my/seen.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;











































var _ticketRecord = __webpack_require__(/*! ../../api/ticketRecord.js */ "E:\\课设\\大三第二学期\\amoyTicketApp\\api\\ticketRecord.js");
var _film = __webpack_require__(/*! ../../api/film.js */ "E:\\课设\\大三第二学期\\amoyTicketApp\\api\\film.js");
var _session = __webpack_require__(/*! ../../api/session.js */ "E:\\课设\\大三第二学期\\amoyTicketApp\\api\\session.js");
var _myFim = __webpack_require__(/*! ../../api/myFim.js */ "E:\\课设\\大三第二学期\\amoyTicketApp\\api\\myFim.js");var uniRate = function uniRate() {return __webpack_require__.e(/*! import() | components/uni-rate/uni-rate */ "components/uni-rate/uni-rate").then(__webpack_require__.bind(null, /*! @/components/uni-rate/uni-rate.vue */ "E:\\课设\\大三第二学期\\amoyTicketApp\\components\\uni-rate\\uni-rate.vue"));};var _default =
{
  data: function data() {
    return {
      nums: 0,
      myScore: 0,
      userInfo: {},
      films: [] };

  },
  components: {
    uniRate: uniRate },

  onShow: function onShow() {
    this.userInfo = uni.getStorageSync('userinfo');
    console.log('this.userInfo' + JSON.stringify(this.userInfo), " at pages\\my\\seen.vue:63");
    this.getMyFilm();
  },
  methods: {
    // 拿到订单
    // getRecord() {
    // this.records = [];
    // let postData = {
    // 	userId: this.userInfo._id
    // };
    // findTicketRecordBySessionOrUser(postData).then(
    // 	res => {
    // 		console.log('res' + JSON.stringify(res));
    // 		if (res.errno === 0) {
    // 			if (res.data.length !== 0) {
    // 				res.data.forEach(item => {
    // 					if (item.status === 1) {
    // 						findSessionById({ sessionId: item.sessionId }).then(
    // 							res1 => {
    // 								console.log('res1' + JSON.stringify(res1));
    // 								if (res1.errno === 0) {
    // 									// item.session = res1.data;
    // 									findFilmById({ id: res1.data.filmId }).then(
    // 										res2 => {
    // 											if (res2.errno === 0) {
    // 												item.film = res2.data;
    // 												this.records.push(item);
    // 												this.records = [...new Set(this.records)];
    // 												this.num = this.records.length;
    // 												console.log('this.records'+JSON.stringify(this.records))
    // 											}
    // 										},
    // 										err2 => {
    // 											console.log('err2' + JSON.stringify(err2));
    // 										}
    // 									);
    // 								}
    // 							},
    // 							err1 => {
    // 								console.log('err1' + JSON.stringify(err1));
    // 							}
    // 						);
    // 					}
    // 				});
    // 			}
    // 		}
    // 	},
    // 	err => {
    // 		console.log('err' + JSON.stringify(err));
    // 	}
    // );
    // },
    // 评分
    goScore: function goScore(data) {
      uni.navigateTo({
        url: './score?filmId=' + data.filmId + '&_id=' + data._id + '&status=' + data.status });

    },
    getMyFilm: function getMyFilm() {var _this = this;
      this.films = [];
      console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', " at pages\\my\\seen.vue:123");
      (0, _myFim.findFilmByUserId)({ userId: this.userInfo._id }).then(
      function (res) {
        console.log('res', JSON.stringify(res), " at pages\\my\\seen.vue:126");
        if (res.errno === 0) {
          // this.films = res.data
          res.data.forEach(function (item) {
            item.num = 0;
            item.last = 5;
            if (item.score) {
              if (parseInt(item.score) == 10) {
                console.log('1', " at pages\\my\\seen.vue:134");
                item.num = 5;
                item.last = 0;
              } else if (8 <= parseInt(item.score) < 10) {
                console.log('2', " at pages\\my\\seen.vue:138");
                item.num = 4;
                item.last = 1;
              } else if (6 <= parseInt(item.score) < 8) {
                console.log('3', " at pages\\my\\seen.vue:142");
                item.num = 3;
                item.last = 2;
              } else if (4 <= parseInt(item.score) < 6) {
                console.log('4', " at pages\\my\\seen.vue:146");
                item.num = 2;
                item.last = 3;
              } else if (0 < parseInt(item.score) < 4) {
                console.log('5', " at pages\\my\\seen.vue:150");
                item.num = 1;
                item.last = 4;
              }
            }
            if (item.status === 0) {
              (0, _film.findFilmById)({ id: item.filmId }).then(
              function (res1) {
                console.log('res1', JSON.stringify(res1), " at pages\\my\\seen.vue:158");
                if (res1.errno === 0) {
                  res1.data.pictures = 'http://' + res1.data.pictures;
                  item.film = res1.data;
                  _this.films.push(item);
                  console.log('this.films', JSON.stringify(_this.films), " at pages\\my\\seen.vue:163");

                  _this.nums = _this.films.length;
                }
              },
              function (err1) {
                console.log('err1', JSON.stringify(err1), " at pages\\my\\seen.vue:169");
              });

            }
          });
        }
      },
      function (err) {
        console.log('err', JSON.stringify(err), " at pages\\my\\seen.vue:177");
      });

    } } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-app-plus/dist/index.js */ "./node_modules/@dcloudio/uni-app-plus/dist/index.js")["default"]))

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=template&id=7821b59c&":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!E:/课设/大三第二学期/amoyTicketApp/pages/my/seen.vue?vue&type=template&id=7821b59c& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue":
/*!****************************************************!*\
  !*** E:/课设/大三第二学期/amoyTicketApp/pages/my/seen.vue ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _seen_vue_vue_type_template_id_7821b59c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./seen.vue?vue&type=template&id=7821b59c& */ "E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=template&id=7821b59c&");
/* harmony import */ var _seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./seen.vue?vue&type=script&lang=js& */ "E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=script&lang=js&");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _seen_vue_vue_type_template_id_7821b59c___WEBPACK_IMPORTED_MODULE_0__["render"],
  _seen_vue_vue_type_template_id_7821b59c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "E:/课设/大三第二学期/amoyTicketApp/pages/my/seen.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=script&lang=js&":
/*!*****************************************************************************!*\
  !*** E:/课设/大三第二学期/amoyTicketApp/pages/my/seen.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib??vue-loader-options!./seen.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/vue-loader/lib/index.js?!E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=script&lang=js&");
/* harmony import */ var _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=template&id=7821b59c&":
/*!***********************************************************************************!*\
  !*** E:/课设/大三第二学期/amoyTicketApp/pages/my/seen.vue?vue&type=template&id=7821b59c& ***!
  \***********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_template_id_7821b59c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib??vue-loader-options!./seen.vue?vue&type=template&id=7821b59c& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader/index.js?!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/vue-loader/lib/index.js?!E:\\课设\\大三第二学期\\amoyTicketApp\\pages\\my\\seen.vue?vue&type=template&id=7821b59c&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_template_id_7821b59c___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_Hbuilder_X_HBuilderX_1_4_1_20181228_full_HBuilderX_plugins_uniapp_cli_node_modules_vue_loader_lib_index_js_vue_loader_options_seen_vue_vue_type_template_id_7821b59c___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

},[["E:\\课设\\大三第二学期\\amoyTicketApp\\main.js?{\"page\":\"pages%2Fmy%2Fseen\"}","common/runtime","common/vendor"]]]);