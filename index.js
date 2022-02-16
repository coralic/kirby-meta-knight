(function() {
  "use strict";
  var render$2 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_c("div", { staticClass: "k-field-label" }, [_c("span", { staticClass: "facebook-icon" }), _vm._v(" " + _vm._s(_vm.headline) + " ")]), _c("div", { staticClass: "open-graph-preview" }, [_c("div", { staticClass: "open-graph-preview__image-container" }, [this.storeImage.length || this.fallbackImage ? _c("img", { staticClass: "open-graph-preview__preview-image", attrs: { "src": _vm.ogImage } }) : _vm._e()]), _c("div", { staticClass: "open-graph-preview__content-container" }, [_c("span", { staticClass: "open-graph-preview__url" }, [_vm._v(_vm._s(_vm.ogSiteName))]), _c("h2", { staticClass: "open-graph-preview__preview-headline", domProps: { "textContent": _vm._s(_vm.ogTitle) } }), _c("p", { staticClass: "open-graph-preview__preview-paragraph" }, [_vm._v(" " + _vm._s(_vm.ogDescription) + " ")])])])]);
  };
  var staticRenderFns$2 = [];
  render$2._withStripped = true;
  var facebookPreview_vue_vue_type_style_index_0_lang = "";
  function normalizeComponent(scriptExports, render2, staticRenderFns2, functionalTemplate, injectStyles, scopeId, moduleIdentifier, shadowMode) {
    var options = typeof scriptExports === "function" ? scriptExports.options : scriptExports;
    if (render2) {
      options.render = render2;
      options.staticRenderFns = staticRenderFns2;
      options._compiled = true;
    }
    if (functionalTemplate) {
      options.functional = true;
    }
    if (scopeId) {
      options._scopeId = "data-v-" + scopeId;
    }
    var hook;
    if (moduleIdentifier) {
      hook = function(context) {
        context = context || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext;
        if (!context && typeof __VUE_SSR_CONTEXT__ !== "undefined") {
          context = __VUE_SSR_CONTEXT__;
        }
        if (injectStyles) {
          injectStyles.call(this, context);
        }
        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      };
      options._ssrRegister = hook;
    } else if (injectStyles) {
      hook = shadowMode ? function() {
        injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
      } : injectStyles;
    }
    if (hook) {
      if (options.functional) {
        options._injectStyles = hook;
        var originalRender = options.render;
        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }
    return {
      exports: scriptExports,
      options
    };
  }
  const __vue2_script$2 = {
    data() {
      return {
        headline: "Facebook",
        url: null,
        ogTitle: null,
        ogImage: null,
        fallbackDescription: null,
        fallbackImage: null,
        fallbackSiteName: null
      };
    },
    methods: {
      async handleLoad(changes) {
        let newChanges = {};
        Object.entries(changes != null ? changes : this.changes).map(([key, value]) => {
          newChanges[key] = encodeURIComponent(value);
        });
        const response = await this.$api.get(this.parent + "/sections/" + this.name, newChanges);
        this.headline = response.headline;
        this.ogTitle = response.title;
        this.fallbackDescription = response.fallbackDescription;
        this.fallbackSiteName = response.fallbackSiteName;
        this.fallbackImage = response.fallbackImage;
        if (!this.ogImage) {
          this.ogImage = response.fallbackImage;
        }
        this.url = response.url;
      }
    },
    created() {
      this.handleLoad();
    },
    computed: {
      changes() {
        return this.$store.getters["content/changes"]();
      },
      ogDescription() {
        let ogDescription = this.$store.getters["content/values"]().ogdescription;
        if (!ogDescription) {
          ogDescription = this.$store.getters["content/values"]().metadescription;
        }
        return ogDescription === "" ? this.fallbackDescription : ogDescription;
      },
      ogSiteName() {
        let ogSiteName = this.$store.getters["content/values"]().ogsitename;
        return ogSiteName === "" ? this.fallbackSiteName : ogSiteName;
      },
      storeImage() {
        return this.$store.getters["content/values"]().ogimage;
      }
    },
    watch: {
      storeImage: {
        handler() {
          if (this.storeImage.length === 0) {
            this.ogImage = this.fallbackImage;
          } else {
            this.$api.files.get(this.$store.getters["content/model"]().api, this.storeImage[0].filename, {
              view: "compact"
            }).then((response) => {
              this.ogImage = response.url;
            });
          }
        },
        immediate: true
      },
      changes(changes) {
        this.handleLoad(changes);
      }
    }
  };
  const __cssModules$2 = {};
  var __component__$2 = /* @__PURE__ */ normalizeComponent(__vue2_script$2, render$2, staticRenderFns$2, false, __vue2_injectStyles$2, null, null, null);
  function __vue2_injectStyles$2(context) {
    for (let o in __cssModules$2) {
      this[o] = __cssModules$2[o];
    }
  }
  __component__$2.options.__file = "src/components/sections/facebook-preview.vue";
  var facebookPreview = /* @__PURE__ */ function() {
    return __component__$2.exports;
  }();
  var __glob_1_0 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": facebookPreview
  });
  var render$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_c("div", { staticClass: "k-field-label" }, [_c("span", { staticClass: "google-icon" }), _vm._v(" " + _vm._s(_vm.headline) + " ")]), _c("div", { staticClass: "google-search-preview" }, [_c("div", { staticClass: "google-search-preview__content-container" }, [_c("h2", { staticClass: "google-search-preview__headline", domProps: { "textContent": _vm._s(_vm.metaTitle) } }), _c("span", { staticClass: "google-search-preview__url" }, [_vm._v(_vm._s(_vm.metaUrl))]), _c("p", { staticClass: "google-search-preview__paragraph" }, [_vm._v(" " + _vm._s(_vm.metaDescription) + " ")])])])]);
  };
  var staticRenderFns$1 = [];
  render$1._withStripped = true;
  var googlePreview_vue_vue_type_style_index_0_lang = "";
  const __vue2_script$1 = {
    data() {
      return {
        headline: "Google Search",
        metaTitle: null,
        metaUrl: null,
        fallbackDescription: null
      };
    },
    created() {
      this.handleLoad();
    },
    methods: {
      async handleLoad(changes) {
        let newChanges = {};
        Object.entries(changes != null ? changes : this.changes).map(([key, value]) => {
          newChanges[key] = encodeURIComponent(value);
        });
        const response = await this.$api.get(this.parent + "/sections/" + this.name, newChanges);
        this.headline = response.headline;
        this.metaTitle = response.title;
        this.fallbackDescription = response.fallbackDescription;
        this.metaUrl = response.url;
      }
    },
    computed: {
      changes() {
        return this.$store.getters["content/changes"]();
      },
      metaDescription() {
        let metaDescription = this.$store.getters["content/values"]().metadescription;
        return metaDescription === "" ? this.fallbackDescription : metaDescription;
      }
    },
    watch: {
      changes(changes) {
        this.handleLoad(changes);
      }
    }
  };
  const __cssModules$1 = {};
  var __component__$1 = /* @__PURE__ */ normalizeComponent(__vue2_script$1, render$1, staticRenderFns$1, false, __vue2_injectStyles$1, null, null, null);
  function __vue2_injectStyles$1(context) {
    for (let o in __cssModules$1) {
      this[o] = __cssModules$1[o];
    }
  }
  __component__$1.options.__file = "src/components/sections/google-preview.vue";
  var googlePreview = /* @__PURE__ */ function() {
    return __component__$1.exports;
  }();
  var __glob_1_1 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": googlePreview
  });
  var render = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", [_c("div", { staticClass: "k-field-label" }, [_c("span", { staticClass: "twitter-icon" }), _vm._v(" " + _vm._s(_vm.headline) + " ")]), _c("div", { staticClass: "twitter-cards" }, [_vm.twitterCardType === "summary_large_image" ? [_c("div", { staticClass: "twitter-card twitter-card--horizontal" }, [_c("div", { staticClass: "twitter-card__image" }, [this.storeImage.length || this.fallbackImage ? _c("img", { staticClass: "twitter-card__preview-image", attrs: { "src": _vm.twitterImage } }) : _vm._e()]), _c("div", { staticClass: "twitter-card__content-container" }, [_c("h2", { staticClass: "twitter-card__preview-headline" }, [_vm._v(_vm._s(_vm.twitterTitle))]), _c("p", { staticClass: "twitter-card__preview-paragraph" }, [_vm._v(" " + _vm._s(_vm.twitterDescription) + " ")]), _c("span", { staticClass: "twitter-card__url" }, [_vm._v(_vm._s(_vm.twitterUrl))])])])] : [_c("div", { staticClass: "twitter-card" }, [_c("div", { staticClass: "twitter-card__image" }, [this.storeImage.length || this.fallbackImage ? _c("img", { staticClass: "twitter-card__preview-image", attrs: { "src": _vm.twitterImage } }) : _vm._e()]), _c("div", { staticClass: "twitter-card__content-container" }, [_c("h2", { staticClass: "twitter-card__preview-headline" }, [_vm._v(_vm._s(_vm.twitterTitle))]), _c("p", { staticClass: "twitter-card__preview-paragraph" }, [_vm._v(" " + _vm._s(_vm.twitterDescription) + " ")]), _c("span", { staticClass: "twitter-card__url" }, [_vm._v(_vm._s(_vm.twitterUrl))])])])]], 2)]);
  };
  var staticRenderFns = [];
  render._withStripped = true;
  var twitterPreview_vue_vue_type_style_index_0_lang = "";
  const __vue2_script = {
    data() {
      return {
        headline: "Twitter Card",
        twitterTitle: null,
        twitterImage: null,
        fallbackDescription: null,
        fallbackImage: null,
        url: null
      };
    },
    created() {
      this.handleLoad();
    },
    methods: {
      async handleLoad(changes) {
        let newChanges = {};
        Object.entries(changes != null ? changes : this.changes).map(([key, value]) => {
          newChanges[key] = encodeURIComponent(value);
        });
        const response = await this.$api.get(this.parent + "/sections/" + this.name, newChanges);
        this.headline = response.headline;
        this.twitterTitle = response.title;
        this.fallbackDescription = response.fallbackDescription;
        this.fallbackImage = response.fallbackImage;
        if (!this.twitterImage) {
          this.twitterImage = response.fallbackImage;
        }
        this.url = response.url;
      }
    },
    computed: {
      changes() {
        return this.$store.getters["content/changes"]();
      },
      twitterCardType() {
        let twitterCardType = this.$store.getters["content/values"]().twittercardtype;
        return twitterCardType;
      },
      twitterDescription() {
        let twitterDescription = this.$store.getters["content/values"]().twitterdescription;
        if (!twitterDescription) {
          twitterDescription = this.$store.getters["content/values"]().metadescription;
        }
        return twitterDescription === "" ? this.fallbackDescription : twitterDescription;
      },
      storeImage() {
        return this.$store.getters["content/values"]().twitterimage;
      }
    },
    watch: {
      storeImage: {
        handler() {
          if (this.storeImage.length === 0) {
            this.twitterImage = this.fallbackImage;
          } else {
            this.$api.files.get(this.$store.getters["content/model"]().api, this.storeImage[0].filename, {
              view: "compact"
            }).then((response) => {
              this.twitterImage = response.url;
            });
          }
        },
        immediate: true
      },
      changes(changes) {
        this.handleLoad(changes);
      }
    }
  };
  const __cssModules = {};
  var __component__ = /* @__PURE__ */ normalizeComponent(__vue2_script, render, staticRenderFns, false, __vue2_injectStyles, null, null, null);
  function __vue2_injectStyles(context) {
    for (let o in __cssModules) {
      this[o] = __cssModules[o];
    }
  }
  __component__.options.__file = "src/components/sections/twitter-preview.vue";
  var twitterPreview = /* @__PURE__ */ function() {
    return __component__.exports;
  }();
  var __glob_1_2 = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    [Symbol.toStringTag]: "Module",
    "default": twitterPreview
  });
  const getComponentName = (path) => path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf(".")).toLowerCase();
  const kirbyup = Object.freeze({
    import(modules) {
      return Object.entries(modules).reduce((accumulator, [path, component]) => {
        accumulator[getComponentName(path)] = component.default;
        return accumulator;
      }, {});
    }
  });
  panel.plugin("coralic/kirby-meta-knight", {
    sections: kirbyup.import({ "./components/sections/facebook-preview.vue": __glob_1_0, "./components/sections/google-preview.vue": __glob_1_1, "./components/sections/twitter-preview.vue": __glob_1_2 })
  });
})();
