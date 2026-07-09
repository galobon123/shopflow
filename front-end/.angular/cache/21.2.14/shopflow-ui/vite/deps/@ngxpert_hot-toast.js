import {
  HttpErrorResponse
} from "./chunk-BAXNTYUU.js";
import {
  isPlatformServer
} from "./chunk-MJ25JFER.js";
import "./chunk-VNQVG2Q2.js";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  EnvironmentInjector,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgZone,
  Output,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
  afterNextRender,
  createComponent,
  effect,
  inject,
  input,
  isDevMode,
  makeEnvironmentProviders,
  model,
  output,
  setClassMetadata,
  signal,
  untracked,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdomElement,
  ɵɵdomProperty,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵstyleMap,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-BZ4IC765.js";
import {
  BehaviorSubject,
  Subject,
  Subscription,
  catchError,
  defer,
  filter,
  map,
  race,
  startWith,
  tap,
  throwError
} from "./chunk-RSS3ODKE.js";
import {
  __objRest,
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@ngneat/overview/fesm2022/ngneat-overview.mjs
var TeleportService = class _TeleportService {
  constructor() {
    this.outlets = new BehaviorSubject("");
    this.ports = /* @__PURE__ */ new Map();
  }
  outlet$(name) {
    return this.outlets.pipe(
      // Immediately check current ports on subscription so that a teleportTo
      // registered after its outlet doesn't miss the already-emitted newOutlet event.
      // Without this, BehaviorSubject only replays one name, so only the last
      // registered outlet is visible to new subscribers.
      startWith(name),
      filter((current) => current === name),
      map((name2) => this.ports.get(name2))
    );
  }
  newOutlet(name) {
    this.outlets.next(name);
  }
  static {
    this.ɵfac = function TeleportService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TeleportService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _TeleportService,
      factory: _TeleportService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeleportService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var TeleportDirective = class _TeleportDirective {
  constructor() {
    this.teleportTo = model(...ngDevMode ? [void 0, {
      debugName: "teleportTo"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.viewRef = null;
    this.tpl = inject(TemplateRef);
    this.service = inject(TeleportService);
    effect((onCleanup) => {
      const teleportTo = this.teleportTo();
      if (!teleportTo) return;
      const subscription = this.service.outlet$(teleportTo).subscribe((outlet) => {
        if (!outlet) return;
        this.viewRef = untracked(() => {
          return outlet.createEmbeddedView(this.tpl);
        });
      });
      onCleanup(() => {
        subscription.unsubscribe();
        this.viewRef?.destroy();
        this.viewRef = null;
      });
    });
  }
  static {
    this.ɵfac = function TeleportDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TeleportDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TeleportDirective,
      selectors: [["", "teleportTo", ""]],
      inputs: {
        teleportTo: [1, "teleportTo"]
      },
      outputs: {
        teleportTo: "teleportToChange"
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeleportDirective, [{
    type: Directive,
    args: [{
      selector: "[teleportTo]"
    }]
  }], () => [], {
    teleportTo: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "teleportTo",
        required: false
      }]
    }, {
      type: Output,
      args: ["teleportToChange"]
    }]
  });
})();
var TeleportOutletDirective = class _TeleportOutletDirective {
  constructor() {
    this.teleportOutlet = input(...ngDevMode ? [void 0, {
      debugName: "teleportOutlet"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.vcr = inject(ViewContainerRef);
    this.service = inject(TeleportService);
    effect(() => {
      const teleportOutlet = this.teleportOutlet();
      if (teleportOutlet) {
        this.service.ports.set(teleportOutlet, this.vcr);
        this.service.newOutlet(teleportOutlet);
      }
    });
    inject(DestroyRef).onDestroy(() => {
      this.service.ports.delete(this.teleportOutlet());
    });
  }
  static {
    this.ɵfac = function TeleportOutletDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _TeleportOutletDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _TeleportOutletDirective,
      selectors: [["", "teleportOutlet", ""]],
      inputs: {
        teleportOutlet: [1, "teleportOutlet"]
      }
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TeleportOutletDirective, [{
    type: Directive,
    args: [{
      selector: "[teleportOutlet]"
    }]
  }], () => [], {
    teleportOutlet: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "teleportOutlet",
        required: false
      }]
    }]
  });
})();
var CompRef = class {
  constructor(options) {
    this.options = options;
    if (options.vcr) {
      this.ref = options.vcr.createComponent(options.component, {
        index: options.vcr.length,
        injector: options.injector || options.vcr.injector
      });
    } else {
      this.ref = createComponent(options.component, {
        elementInjector: options.injector,
        environmentInjector: options.environmentInjector
      });
      options.appRef.attachView(this.ref.hostView);
    }
  }
  setInput(input2, value) {
    this.ref.setInput(input2, value);
    return this;
  }
  setInputs(inputs) {
    Object.keys(inputs).forEach((input2) => {
      this.ref.setInput(input2, inputs[input2]);
    });
    return this;
  }
  detectChanges() {
    this.ref.hostView.detectChanges();
    return this;
  }
  updateContext(context) {
    this.options.contextSignal?.set(context);
    return this;
  }
  appendTo(container) {
    container.appendChild(this.getElement());
    return this;
  }
  removeFrom(container) {
    container.removeChild(this.getElement());
    return this;
  }
  getRawContent() {
    return this.getElement().outerHTML;
  }
  getElement() {
    return this.ref.location.nativeElement;
  }
  destroy() {
    this.ref.destroy();
    !this.options.vcr && this.options.appRef.detachView(this.ref.hostView);
    this.ref = null;
  }
};
function isTemplateRef(value) {
  return value instanceof TemplateRef;
}
function isComponent(value) {
  return typeof value === "function";
}
function isString(value) {
  return typeof value === "string";
}
var TplRef = class {
  constructor(args) {
    this.args = args;
    if (this.args.vcr) {
      this.ref = this.args.vcr.createEmbeddedView(this.args.tpl, this.args.context || {}, {
        injector: args.injector
      });
      this.ref.detectChanges();
    } else {
      this.ref = this.args.tpl.createEmbeddedView(this.args.context || {}, args.injector);
      this.ref.detectChanges();
      this.args.appRef.attachView(this.ref);
    }
  }
  detectChanges() {
    this.ref.detectChanges();
    return this;
  }
  getElement() {
    const rootNodes = this.ref.rootNodes;
    if (rootNodes.length === 1 && rootNodes[0] === Node.ELEMENT_NODE) {
      this.element = rootNodes[0];
    } else {
      this.element = document.createElement("div");
      this.element.append(...rootNodes);
    }
    return this.element;
  }
  destroy() {
    if (this.ref.rootNodes[0] !== 1) {
      this.element?.parentNode.removeChild(this.element);
      this.element = null;
    }
    if (!this.args.vcr) {
      this.args.appRef.detachView(this.ref);
    }
    this.ref.destroy();
    this.ref = null;
  }
  updateContext(context) {
    Object.assign(this.ref.context, context);
    return this;
  }
};
var StringRef = class {
  constructor(value) {
    this.value = value;
  }
  getElement() {
    return this.value;
  }
  detectChanges() {
    return this;
  }
  updateContext() {
    return this;
  }
  destroy() {
  }
};
var ViewUnsupportedContentTypeError = class extends Error {
  constructor() {
    super(typeof ngDevMode !== "undefined" && ngDevMode ? "Type of content is not supported" : "");
  }
};
var VIEW_CONTEXT = new InjectionToken(typeof ngDevMode !== "undefined" && ngDevMode ? "Component context" : "");
var ViewService = class _ViewService {
  constructor() {
    this.injector = inject(Injector);
    this.appRef = inject(ApplicationRef);
    this.environmentInjector = inject(EnvironmentInjector);
  }
  createComponent(component, options = {}) {
    return untracked(() => {
      let injector = options.injector ?? this.injector;
      let contextSignal;
      if (options.context) {
        contextSignal = signal(options.context);
        injector = Injector.create({
          providers: [{
            provide: VIEW_CONTEXT,
            useValue: contextSignal.asReadonly()
          }],
          parent: injector
        });
      }
      return new CompRef({
        component,
        vcr: options.vcr,
        injector,
        appRef: this.appRef,
        environmentInjector: options.environmentInjector || this.environmentInjector,
        contextSignal
      });
    });
  }
  createTemplate(tpl, options = {}) {
    return untracked(() => {
      return new TplRef({
        vcr: options.vcr,
        appRef: this.appRef,
        tpl,
        context: options.context,
        injector: options.injector
      });
    });
  }
  createView(content, viewOptions = {}) {
    return untracked(() => {
      if (isTemplateRef(content)) {
        return this.createTemplate(content, viewOptions);
      } else if (isComponent(content)) {
        return this.createComponent(content, viewOptions);
      } else if (isString(content)) {
        return new StringRef(content);
      } else {
        throw new ViewUnsupportedContentTypeError();
      }
    });
  }
  static {
    this.ɵfac = function ViewService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ViewService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _ViewService,
      factory: _ViewService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var DynamicViewComponent = class _DynamicViewComponent {
  constructor() {
    this.content = input(...ngDevMode ? [void 0, {
      debugName: "content"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function DynamicViewComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DynamicViewComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _DynamicViewComponent,
      selectors: [["dynamic-view"]],
      inputs: {
        content: [1, "content"]
      },
      decls: 1,
      vars: 1,
      consts: [[3, "innerHTML"]],
      template: function DynamicViewComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵdomElement(0, "div", 0);
        }
        if (rf & 2) {
          ɵɵdomProperty("innerHTML", ctx.content(), ɵɵsanitizeHtml);
        }
      },
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DynamicViewComponent, [{
    type: Component,
    args: [{
      selector: "dynamic-view",
      template: ` <div [innerHTML]="content()"></div> `
    }]
  }], null, {
    content: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "content",
        required: false
      }]
    }]
  });
})();
var DynamicViewDirective = class _DynamicViewDirective {
  constructor() {
    this.view = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "view"
    } : (
      /* istanbul ignore next */
      {}
    )), {
      alias: "dynamicView"
    }));
    this.injector = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "injector"
    } : (
      /* istanbul ignore next */
      {}
    )), {
      alias: "dynamicViewInjector"
    }));
    this.context = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "context"
    } : (
      /* istanbul ignore next */
      {}
    )), {
      alias: "dynamicViewContext"
    }));
    this.inputs = input(void 0, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "inputs"
    } : (
      /* istanbul ignore next */
      {}
    )), {
      alias: "dynamicViewInputs"
    }));
    this.defaultTpl = inject(TemplateRef);
    this.vcr = inject(ViewContainerRef);
    this.viewService = inject(ViewService);
    inject(DestroyRef).onDestroy(() => {
      this.viewRef?.destroy();
    });
  }
  ngOnInit() {
    this.resolveContentType();
  }
  ngOnChanges(changes) {
    const viewChanged = changes.view && !changes.view.isFirstChange();
    const contextChanged = changes.context && !changes.context.isFirstChange();
    const inputsChanged = changes.inputs && !changes.inputs.isFirstChange();
    if (viewChanged) {
      this.resolveContentType();
    } else if (contextChanged) {
      this.viewRef.updateContext(this.context());
    } else if (isComponent(this.view()) && inputsChanged) {
      this.viewRef.setInputs(this.inputs() || {});
    }
  }
  resolveContentType() {
    this.viewRef?.destroy();
    const view = this.view();
    const injector = this.injector();
    const context = this.context();
    if (isString(view)) {
      const viewRef = this.viewRef = this.viewService.createComponent(DynamicViewComponent, {
        vcr: this.vcr,
        injector
      });
      viewRef.setInput("content", view).detectChanges();
    } else if (isComponent(view)) {
      this.viewRef = this.viewService.createComponent(view, {
        vcr: this.vcr,
        injector: injector ?? this.vcr.injector,
        context
      });
      const inputs = this.inputs();
      if (inputs) {
        this.viewRef.setInputs(inputs);
      }
    } else {
      this.viewRef = this.viewService.createView(view || this.defaultTpl, {
        vcr: this.vcr,
        injector: injector ?? this.vcr.injector,
        context
      });
    }
  }
  static {
    this.ɵfac = function DynamicViewDirective_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _DynamicViewDirective)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _DynamicViewDirective,
      selectors: [["", "dynamicView", ""]],
      inputs: {
        view: [1, "dynamicView", "view"],
        injector: [1, "dynamicViewInjector", "injector"],
        context: [1, "dynamicViewContext", "context"],
        inputs: [1, "dynamicViewInputs", "inputs"]
      },
      features: [ɵɵNgOnChangesFeature]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DynamicViewDirective, [{
    type: Directive,
    args: [{
      selector: "[dynamicView]"
    }]
  }], () => [], {
    view: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "dynamicView",
        required: false
      }]
    }],
    injector: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "dynamicViewInjector",
        required: false
      }]
    }],
    context: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "dynamicViewContext",
        required: false
      }]
    }],
    inputs: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "dynamicViewInputs",
        required: false
      }]
    }]
  });
})();

// node_modules/@ngxpert/hot-toast/fesm2022/ngxpert-hot-toast.mjs
function IndicatorComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n  ");
    ɵɵelement(1, "hot-toast-loader", 1);
    ɵɵtext(2, "\n  ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("theme", ctx_r0.theme());
  }
}
function IndicatorComponent_Conditional_0_Conditional_4_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "div");
    ɵɵtext(2, "\n        ");
    ɵɵelement(3, "hot-toast-error", 1);
    ɵɵtext(4, "\n      ");
    ɵɵelementEnd();
    ɵɵtext(5, "\n      ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance(3);
    ɵɵproperty("theme", ctx_r0.theme());
  }
}
function IndicatorComponent_Conditional_0_Conditional_4_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "div");
    ɵɵtext(2, "\n        ");
    ɵɵelement(3, "hot-toast-checkmark", 1);
    ɵɵtext(4, "\n      ");
    ɵɵelementEnd();
    ɵɵtext(5, "\n      ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance(3);
    ɵɵproperty("theme", ctx_r0.theme());
  }
}
function IndicatorComponent_Conditional_0_Conditional_4_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "div");
    ɵɵtext(2, "\n        ");
    ɵɵelement(3, "hot-toast-warning", 1);
    ɵɵtext(4, "\n      ");
    ɵɵelementEnd();
    ɵɵtext(5, "\n      ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance(3);
    ɵɵproperty("theme", ctx_r0.theme());
  }
}
function IndicatorComponent_Conditional_0_Conditional_4_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "div");
    ɵɵtext(2, "\n        ");
    ɵɵelement(3, "hot-toast-info", 1);
    ɵɵtext(4, "\n      ");
    ɵɵelementEnd();
    ɵɵtext(5, "\n      ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(3);
    ɵɵadvance(3);
    ɵɵproperty("theme", ctx_r0.theme());
  }
}
function IndicatorComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n  ");
    ɵɵelementStart(1, "div", 2);
    ɵɵtext(2, "\n    ");
    ɵɵelementStart(3, "div");
    ɵɵtext(4, "\n      ");
    ɵɵconditionalCreate(5, IndicatorComponent_Conditional_0_Conditional_4_Case_5_Template, 6, 1)(6, IndicatorComponent_Conditional_0_Conditional_4_Case_6_Template, 6, 1)(7, IndicatorComponent_Conditional_0_Conditional_4_Case_7_Template, 6, 1)(8, IndicatorComponent_Conditional_0_Conditional_4_Case_8_Template, 6, 1);
    ɵɵtext(9, "\n    ");
    ɵɵelementEnd();
    ɵɵtext(10, "\n  ");
    ɵɵelementEnd();
    ɵɵtext(11, "\n  ");
  }
  if (rf & 2) {
    let tmp_2_0;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance(5);
    ɵɵconditional((tmp_2_0 = ctx_r0.type()) === "error" ? 5 : tmp_2_0 === "success" ? 6 : tmp_2_0 === "warning" ? 7 : tmp_2_0 === "info" ? 8 : -1);
  }
}
function IndicatorComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n");
    ɵɵelementStart(1, "div", 0);
    ɵɵtext(2, "\n  ");
    ɵɵconditionalCreate(3, IndicatorComponent_Conditional_0_Conditional_3_Template, 3, 1);
    ɵɵconditionalCreate(4, IndicatorComponent_Conditional_0_Conditional_4_Template, 12, 1);
    ɵɵelementEnd();
    ɵɵtext(5, "\n");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance(3);
    ɵɵconditional(ctx_r0.type() === "loading" ? 3 : -1);
    ɵɵadvance();
    ɵɵconditional(ctx_r0.type() !== "loading" ? 4 : -1);
  }
}
function AnimatedIconComponent_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
var _c0 = ["hotToastBarBase"];
function HotToastGroupItemComponent_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
    ɵɵelementStart(1, "hot-toast-animated-icon", 7);
    ɵɵtext(2);
    ɵɵelementEnd();
    ɵɵtext(3, "\n        ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("iconTheme", ctx_r0.toast.iconTheme);
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.toast.icon);
  }
}
function HotToastGroupItemComponent_Conditional_9_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HotToastGroupItemComponent_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
    ɵɵelementStart(1, "div");
    ɵɵtext(2, "\n          ");
    ɵɵtemplate(3, HotToastGroupItemComponent_Conditional_9_Conditional_2_ng_container_3_Template, 1, 0, "ng-container", 8);
    ɵɵtext(4, "\n        ");
    ɵɵelementEnd();
    ɵɵtext(5, "\n        ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance(3);
    ɵɵproperty("dynamicView", ctx_r0.toast.icon);
  }
}
function HotToastGroupItemComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, " ");
    ɵɵconditionalCreate(1, HotToastGroupItemComponent_Conditional_9_Conditional_1_Template, 4, 2)(2, HotToastGroupItemComponent_Conditional_9_Conditional_2_Template, 6, 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.isIconString ? 1 : 2);
  }
}
function HotToastGroupItemComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
    ɵɵelement(1, "hot-toast-indicator", 9);
    ɵɵtext(2, "\n        ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("theme", ctx_r0.toast.iconTheme)("type", ctx_r0.toast.type);
  }
}
function HotToastGroupItemComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HotToastGroupItemComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "button", 10);
    ɵɵlistener("click", function HotToastGroupItemComponent_Conditional_17_Template_button_click_1_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.close());
    });
    ɵɵelementEnd();
    ɵɵtext(2, "\n      ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵstyleMap(ctx_r0.toast.closeStyle);
  }
}
var _forTrack0 = ($index, $item) => $item.id;
function HotToastComponent_Conditional_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
    ɵɵelement(1, "hot-toast-animated-icon", 7);
    ɵɵtext(2, "\n        ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("iconTheme", ctx_r0.toast.iconTheme)("icon", ctx_r0.toast.icon);
  }
}
function HotToastComponent_Conditional_9_Conditional_2_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HotToastComponent_Conditional_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
    ɵɵelementStart(1, "div");
    ɵɵtext(2, "\n          ");
    ɵɵtemplate(3, HotToastComponent_Conditional_9_Conditional_2_ng_container_3_Template, 1, 0, "ng-container", 8);
    ɵɵtext(4, "\n        ");
    ɵɵelementEnd();
    ɵɵtext(5, "\n        ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance(3);
    ɵɵproperty("dynamicView", ctx_r0.toast.icon);
  }
}
function HotToastComponent_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, " ");
    ɵɵconditionalCreate(1, HotToastComponent_Conditional_9_Conditional_1_Template, 3, 2)(2, HotToastComponent_Conditional_9_Conditional_2_Template, 6, 1);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵconditional(ctx_r0.isIconString ? 1 : 2);
  }
}
function HotToastComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
    ɵɵelement(1, "hot-toast-indicator", 9);
    ɵɵtext(2, "\n        ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("theme", ctx_r0.toast.iconTheme)("type", ctx_r0.toast.type);
  }
}
function HotToastComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function HotToastComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "button", 10);
    ɵɵlistener("click", function HotToastComponent_Conditional_17_Template_button_click_1_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.toggleToastGroup());
    });
    ɵɵelementEnd();
    ɵɵtext(2, "\n      ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵstyleMap(ctx_r0.toast.group.btnStyle);
    ɵɵclassProp("expanded", ctx_r0.isExpanded);
    ɵɵattribute("aria-label", ctx_r0.isExpanded ? "Collapse" : "Expand");
  }
}
function HotToastComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = ɵɵgetCurrentView();
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "button", 11);
    ɵɵlistener("click", function HotToastComponent_Conditional_18_Template_button_click_1_listener() {
      ɵɵrestoreView(_r3);
      const ctx_r0 = ɵɵnextContext();
      return ɵɵresetView(ctx_r0.close());
    });
    ɵɵelementEnd();
    ɵɵtext(2, "\n      ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵstyleMap(ctx_r0.toast.closeStyle);
  }
}
function HotToastComponent_Conditional_20_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵtext(0, "\n      ");
    ɵɵelementStart(1, "hot-toast-group-item", 13);
    ɵɵlistener("height", function HotToastComponent_Conditional_20_For_4_Template_hot_toast_group_item_height_1_listener($event) {
      const item_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.updateHeight($event, item_r5));
    })("beforeClosed", function HotToastComponent_Conditional_20_For_4_Template_hot_toast_group_item_beforeClosed_1_listener() {
      const item_r5 = ɵɵrestoreView(_r4).$implicit;
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.beforeClosedGroupItem(item_r5));
    })("afterClosed", function HotToastComponent_Conditional_20_For_4_Template_hot_toast_group_item_afterClosed_1_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.afterClosedGroupItem($event));
    });
    ɵɵelementEnd();
    ɵɵtext(2, "\n      ");
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const $index_r6 = ctx.$index;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵadvance();
    ɵɵproperty("toast", item_r5)("offset", ctx_r0.calculateOffset(item_r5.id))("toastRef", ctx_r0.toastRef().groupRefs[$index_r6])("toastsAfter", (item_r5.autoClose ? ctx_r0.groupChildrenToasts.length : ctx_r0.visibleToasts.length) - 1 - $index_r6)("defaultConfig", ctx_r0.defaultConfig())("isShowingAllToasts", ctx_r0.isShowingAllToasts());
  }
}
function HotToastComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n    ");
    ɵɵelementStart(1, "div", 12);
    ɵɵtext(2, "\n      ");
    ɵɵrepeaterCreate(3, HotToastComponent_Conditional_20_For_4_Template, 3, 6, null, null, _forTrack0);
    ɵɵelementEnd();
    ɵɵtext(5, "\n    ");
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵclassMap(ctx_r0.toast.group == null ? null : ctx_r0.toast.group.className);
    ɵɵstyleProp("--hot-toast-group-height", ctx_r0.groupHeight + "px");
    ɵɵadvance(2);
    ɵɵrepeater(ctx_r0.groupChildrenToasts);
  }
}
function HotToastContainerComponent_For_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
  }
}
function HotToastContainerComponent_For_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵtext(0, "\n          ");
    ɵɵelementStart(1, "hot-toast-component", 2);
    ɵɵlistener("showAllToasts", function HotToastContainerComponent_For_7_Conditional_2_Template_hot_toast_component_showAllToasts_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.showAllToasts($event));
    })("height", function HotToastContainerComponent_For_7_Conditional_2_Template_hot_toast_component_height_1_listener($event) {
      ɵɵrestoreView(_r1);
      const toast_r3 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.updateHeight($event, toast_r3));
    })("beforeClosed", function HotToastContainerComponent_For_7_Conditional_2_Template_hot_toast_component_beforeClosed_1_listener() {
      ɵɵrestoreView(_r1);
      const toast_r3 = ɵɵnextContext().$implicit;
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.beforeClosed(toast_r3));
    })("afterClosed", function HotToastContainerComponent_For_7_Conditional_2_Template_hot_toast_component_afterClosed_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.afterClosed($event));
    })("toggleGroup", function HotToastContainerComponent_For_7_Conditional_2_Template_hot_toast_component_toggleGroup_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.toggleGroup($event));
    });
    ɵɵelementEnd();
    ɵɵtext(2, "\n        ");
  }
  if (rf & 2) {
    const ctx_r3 = ɵɵnextContext();
    const toast_r3 = ctx_r3.$implicit;
    const $index_r5 = ctx_r3.$index;
    const ctx_r1 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("toast", toast_r3)("offset", ctx_r1.calculateOffset(toast_r3.id, toast_r3.position))("toastRef", ctx_r1.toastRefs[$index_r5])("toastsAfter", (toast_r3.autoClose ? ctx_r1.toasts.length : ctx_r1.getVisibleToasts(toast_r3.position).length) - 1 - $index_r5)("defaultConfig", ctx_r1.defaultConfig())("isShowingAllToasts", ctx_r1.isShowingAllToasts);
  }
}
function HotToastContainerComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0, "\n        ");
    ɵɵconditionalCreate(1, HotToastContainerComponent_For_7_Conditional_1_Template, 1, 0)(2, HotToastContainerComponent_For_7_Conditional_2_Template, 3, 6);
  }
  if (rf & 2) {
    const toast_r3 = ctx.$implicit;
    ɵɵadvance();
    ɵɵconditional((toast_r3.group == null ? null : toast_r3.group.parent) ? 1 : 2);
  }
}
var HOT_TOAST_DEFAULT_TIMEOUTS = {
  blank: 4e3,
  error: 4e3,
  success: 4e3,
  loading: 3e4,
  warning: 4e3,
  info: 4e3
};
var EXIT_ANIMATION_DURATION = 800;
var ENTER_ANIMATION_DURATION = 350;
var HOT_TOAST_MARGIN = 8;
var HOT_TOAST_DEPTH_SCALE = 0.05;
var HOT_TOAST_DEPTH_SCALE_ADD = 1;
var HOT_TOAST_FORM_STATUS_DEFAULTS = {
  VALID: {
    type: "success"
  },
  INVALID: {
    type: "error"
  },
  PENDING: {
    type: "loading"
  },
  DISABLED: {
    type: "blank"
  }
};
var HotToastRef = class {
  constructor(toast) {
    this.toast = toast;
    this.groupRefs = [];
    this.groupExpanded = false;
    this._onClosed = new Subject();
    this._onGroupToggle = new Subject();
  }
  set data(data) {
    this.toast.data = data;
  }
  get data() {
    return this.toast.data;
  }
  set dispose(value) {
    this._dispose = value;
  }
  getToast() {
    return this.toast;
  }
  /**
   * Used for internal purpose
   * Attach ToastRef to container
   */
  appendTo(container, skipAttachToParent) {
    const {
      dispose,
      updateMessage,
      updateToast,
      afterClosed,
      afterGroupToggled,
      afterGroupRefsAttached
    } = container.addToast(this, skipAttachToParent);
    this.dispose = dispose;
    this.updateMessage = updateMessage;
    this.updateToast = updateToast;
    this.afterClosed = race(this._onClosed.asObservable(), afterClosed);
    this.afterGroupToggled = race(this._onGroupToggle.asObservable(), afterGroupToggled);
    this.afterGroupRefsAttached = afterGroupRefsAttached;
    return this;
  }
  /**
   * Closes the toast
   *
   * @param [closeData={ dismissedByAction: false }] -
   * Make sure to pass { dismissedByAction: true } when closing from template
   * @memberof HotToastRef
   */
  close(closeData = {
    dismissedByAction: false
  }) {
    this.groupRefs.forEach((ref) => ref.close());
    this._dispose();
    this._onClosed.next({
      dismissedByAction: closeData.dismissedByAction,
      id: this.toast.id
    });
    this._onClosed.complete();
  }
  toggleGroup(eventData = {
    byAction: false
  }) {
    this.groupExpanded = !this.groupExpanded;
    this._onGroupToggle.next({
      byAction: eventData.byAction,
      id: this.toast.id,
      event: this.groupExpanded ? "expand" : "collapse"
    });
  }
  show() {
    this.toast.visible = true;
  }
};
var animate = (renderer, element, animation) => {
  renderer.setStyle(element, "animation", animation);
};
var LoaderComponent = class _LoaderComponent {
  constructor() {
    this.theme = input(...ngDevMode ? [void 0, {
      debugName: "theme"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function LoaderComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _LoaderComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _LoaderComponent,
      selectors: [["hot-toast-loader"]],
      inputs: {
        theme: [1, "theme"]
      },
      decls: 2,
      vars: 4,
      consts: [[1, "hot-toast-loader-icon"]],
      template: function LoaderComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵdomElement(0, "div", 0);
          ɵɵtext(1, "\n");
        }
        if (rf & 2) {
          let tmp_0_0;
          let tmp_1_0;
          ɵɵstyleProp("border-color", (tmp_0_0 = ctx.theme()) == null ? null : tmp_0_0.primary)("border-right-color", (tmp_1_0 = ctx.theme()) == null ? null : tmp_1_0.secondary);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoaderComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-loader",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div\n  class="hot-toast-loader-icon"\n  [style.border-color]="theme()?.primary"\n  [style.border-right-color]="theme()?.secondary"\n></div>\n'
    }]
  }], null, {
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }]
  });
})();
var ErrorComponent = class _ErrorComponent {
  constructor() {
    this.theme = input(...ngDevMode ? [void 0, {
      debugName: "theme"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function ErrorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ErrorComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _ErrorComponent,
      selectors: [["hot-toast-error"]],
      inputs: {
        theme: [1, "theme"]
      },
      decls: 2,
      vars: 4,
      consts: [[1, "hot-toast-error-icon"]],
      template: function ErrorComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵdomElement(0, "div", 0);
          ɵɵtext(1, "\n");
        }
        if (rf & 2) {
          let tmp_0_0;
          let tmp_1_0;
          ɵɵstyleProp("--error-primary", (tmp_0_0 = ctx.theme()) == null ? null : tmp_0_0.primary)("--error-secondary", (tmp_1_0 = ctx.theme()) == null ? null : tmp_1_0.secondary);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ErrorComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-error",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: '<div\n  class="hot-toast-error-icon"\n  [style.--error-primary]="theme()?.primary"\n  [style.--error-secondary]="theme()?.secondary"\n></div>\n'
    }]
  }], null, {
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }]
  });
})();
var CheckMarkComponent = class _CheckMarkComponent {
  constructor() {
    this.theme = input(...ngDevMode ? [void 0, {
      debugName: "theme"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function CheckMarkComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _CheckMarkComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _CheckMarkComponent,
      selectors: [["hot-toast-checkmark"]],
      inputs: {
        theme: [1, "theme"]
      },
      decls: 2,
      vars: 4,
      consts: [[1, "hot-toast-checkmark-icon"]],
      template: function CheckMarkComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵdomElement(0, "div", 0);
          ɵɵtext(1, "\n");
        }
        if (rf & 2) {
          let tmp_0_0;
          let tmp_1_0;
          ɵɵstyleProp("--check-primary", (tmp_0_0 = ctx.theme()) == null ? null : tmp_0_0.primary)("--check-secondary", (tmp_1_0 = ctx.theme()) == null ? null : tmp_1_0.secondary);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CheckMarkComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-checkmark",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: '<div\n  class="hot-toast-checkmark-icon"\n  [style.--check-primary]="theme()?.primary"\n  [style.--check-secondary]="theme()?.secondary"\n></div>\n'
    }]
  }], null, {
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }]
  });
})();
var WarningComponent = class _WarningComponent {
  constructor() {
    this.theme = input(...ngDevMode ? [void 0, {
      debugName: "theme"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function WarningComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _WarningComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _WarningComponent,
      selectors: [["hot-toast-warning"]],
      inputs: {
        theme: [1, "theme"]
      },
      decls: 2,
      vars: 4,
      consts: [[1, "hot-toast-warning-icon"]],
      template: function WarningComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵdomElement(0, "div", 0);
          ɵɵtext(1, "\n");
        }
        if (rf & 2) {
          let tmp_0_0;
          let tmp_1_0;
          ɵɵstyleProp("--warn-primary", (tmp_0_0 = ctx.theme()) == null ? null : tmp_0_0.primary)("--warn-secondary", (tmp_1_0 = ctx.theme()) == null ? null : tmp_1_0.secondary);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WarningComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-warning",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: '<div\n  class="hot-toast-warning-icon"\n  [style.--warn-primary]="theme()?.primary"\n  [style.--warn-secondary]="theme()?.secondary"\n></div>\n'
    }]
  }], null, {
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }]
  });
})();
var InfoComponent = class _InfoComponent {
  constructor() {
    this.theme = input(...ngDevMode ? [void 0, {
      debugName: "theme"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function InfoComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _InfoComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _InfoComponent,
      selectors: [["hot-toast-info"]],
      inputs: {
        theme: [1, "theme"]
      },
      decls: 2,
      vars: 4,
      consts: [[1, "hot-toast-info-icon"]],
      template: function InfoComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵdomElement(0, "div", 0);
          ɵɵtext(1, "\n");
        }
        if (rf & 2) {
          let tmp_0_0;
          let tmp_1_0;
          ɵɵstyleProp("--info-primary", (tmp_0_0 = ctx.theme()) == null ? null : tmp_0_0.primary)("--info-secondary", (tmp_1_0 = ctx.theme()) == null ? null : tmp_1_0.secondary);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InfoComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-info",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      template: '<div\n  class="hot-toast-info-icon"\n  [style.--info-primary]="theme()?.primary"\n  [style.--info-secondary]="theme()?.secondary"\n></div>\n'
    }]
  }], null, {
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }]
  });
})();
var IndicatorComponent = class _IndicatorComponent {
  constructor() {
    this.theme = input(...ngDevMode ? [void 0, {
      debugName: "theme"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.type = input(...ngDevMode ? [void 0, {
      debugName: "type"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function IndicatorComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _IndicatorComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _IndicatorComponent,
      selectors: [["hot-toast-indicator"]],
      inputs: {
        theme: [1, "theme"],
        type: [1, "type"]
      },
      decls: 1,
      vars: 1,
      consts: [[1, "hot-toast-indicator-wrapper"], [3, "theme"], [1, "hot-toast-status-wrapper"]],
      template: function IndicatorComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵconditionalCreate(0, IndicatorComponent_Conditional_0_Template, 6, 2);
        }
        if (rf & 2) {
          ɵɵconditional(ctx.type() !== "blank" ? 0 : -1);
        }
      },
      dependencies: [LoaderComponent, ErrorComponent, CheckMarkComponent, WarningComponent, InfoComponent],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IndicatorComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-indicator",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [LoaderComponent, ErrorComponent, CheckMarkComponent, WarningComponent, InfoComponent],
      template: `@if (type() !== 'blank') {
<div class="hot-toast-indicator-wrapper">
  @if (type() === 'loading') {
  <hot-toast-loader [theme]="theme()" />
  } @if (type() !== 'loading') {
  <div class="hot-toast-status-wrapper">
    <div>
      @switch (type()) { @case ('error') {
      <div>
        <hot-toast-error [theme]="theme()" />
      </div>
      } @case ('success') {
      <div>
        <hot-toast-checkmark [theme]="theme()" />
      </div>
      } @case ('warning') {
      <div>
        <hot-toast-warning [theme]="theme()" />
      </div>
      } @case ('info') {
      <div>
        <hot-toast-info [theme]="theme()" />
      </div>
      } }
    </div>
  </div>
  }
</div>
}
`
    }]
  }], null, {
    theme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "theme",
        required: false
      }]
    }],
    type: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "type",
        required: false
      }]
    }]
  });
})();
var AnimatedIconComponent = class _AnimatedIconComponent {
  constructor() {
    this.iconTheme = input(...ngDevMode ? [void 0, {
      debugName: "iconTheme"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.icon = input(...ngDevMode ? [void 0, {
      debugName: "icon"
    }] : (
      /* istanbul ignore next */
      []
    ));
  }
  static {
    this.ɵfac = function AnimatedIconComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _AnimatedIconComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _AnimatedIconComponent,
      selectors: [["hot-toast-animated-icon"]],
      inputs: {
        iconTheme: [1, "iconTheme"],
        icon: [1, "icon"]
      },
      decls: 5,
      vars: 3,
      consts: [[1, "hot-toast-animated-icon"], [4, "dynamicView"]],
      template: function AnimatedIconComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵtext(1, "\n  ");
          ɵɵtemplate(2, AnimatedIconComponent_ng_container_2_Template, 1, 0, "ng-container", 1);
          ɵɵtext(3, "\n");
          ɵɵelementEnd();
          ɵɵtext(4, "\n");
        }
        if (rf & 2) {
          let tmp_0_0;
          ɵɵstyleProp("color", (tmp_0_0 = ctx.iconTheme()) == null ? null : tmp_0_0.primary);
          ɵɵadvance(2);
          ɵɵproperty("dynamicView", ctx.icon());
        }
      },
      dependencies: [DynamicViewDirective],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AnimatedIconComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-animated-icon",
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [DynamicViewDirective],
      template: '<div class="hot-toast-animated-icon" [style.color]="iconTheme()?.primary">\n  <ng-container *dynamicView="icon()" />\n</div>\n'
    }]
  }], null, {
    iconTheme: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "iconTheme",
        required: false
      }]
    }],
    icon: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "icon",
        required: false
      }]
    }]
  });
})();
var HotToastGroupItemComponent = class _HotToastGroupItemComponent {
  constructor() {
    this.offset = input(0, ...ngDevMode ? [{
      debugName: "offset"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.defaultConfig = input(...ngDevMode ? [void 0, {
      debugName: "defaultConfig"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.toastRef = input(...ngDevMode ? [void 0, {
      debugName: "toastRef"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this._toastsAfter = 0;
    this.isShowingAllToasts = input(false, ...ngDevMode ? [{
      debugName: "isShowingAllToasts"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.height = output();
    this.beforeClosed = output();
    this.afterClosed = output();
    this.showAllToasts = output();
    this.toggleGroup = output();
    this.isManualClose = false;
    this.toastBarBaseStylesSignal = signal({}, ...ngDevMode ? [{
      debugName: "toastBarBaseStylesSignal"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.unlisteners = [];
    this.softClosed = false;
    this.injector = inject(Injector);
    this.renderer = inject(Renderer2);
    this.ngZone = inject(NgZone);
    this.cdr = inject(ChangeDetectorRef);
  }
  set toast(value) {
    this._toast = value;
    const ogStyle = this.toastBarBaseStylesSignal();
    const newStyle = __spreadValues({}, value.style);
    if (ogStyle["animation"]?.includes("hotToastExitAnimation")) {
      newStyle["animation"] = ogStyle["animation"];
    } else {
      const top2 = value.position.includes("top");
      const enterAnimation = `hotToastEnterAnimation${top2 ? "Negative" : "Positive"} ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;
      newStyle["animation"] = enterAnimation;
    }
    this.toastBarBaseStylesSignal.set(newStyle);
  }
  get toast() {
    return this._toast;
  }
  get toastsAfter() {
    return this._toastsAfter;
  }
  set toastsAfter(value) {
    this._toastsAfter = value;
  }
  get toastBarBaseHeight() {
    return this.toastBarBase.nativeElement.offsetHeight;
  }
  get scale() {
    return this.defaultConfig().stacking !== "vertical" && !this.isShowingAllToasts() ? this.toastsAfter * -HOT_TOAST_DEPTH_SCALE + 1 : 1;
  }
  get translateY() {
    return this.offset() * (this.top ? 1 : -1) + "px";
  }
  get exitAnimationDelay() {
    return this.toast.duration + "ms";
  }
  get top() {
    return this.toast.position.includes("top");
  }
  get containerPositionStyle() {
    const verticalStyle = this.top ? {
      top: 0
    } : {
      bottom: 0
    };
    const transform = `translateY(var(--hot-toast-translate-y)) scale(var(--hot-toast-scale))`;
    const horizontalStyle = this.toast.position.includes("left") ? {
      left: 0
    } : this.toast.position.includes("right") ? {
      right: 0
    } : {
      left: 0,
      right: 0,
      justifyContent: "center"
    };
    return __spreadValues(__spreadValues({
      transform
    }, verticalStyle), horizontalStyle);
  }
  get isIconString() {
    return typeof this.toast.icon === "string";
  }
  get groupChildrenToastRefs() {
    return this.toastRef().groupRefs.filter((ref) => !!ref);
  }
  set groupChildrenToastRefs(value) {
    this.toastRef().groupRefs = value;
  }
  get groupChildrenToasts() {
    return this.groupChildrenToastRefs.map((ref) => ref.getToast());
  }
  get groupHeight() {
    return this.visibleToasts.map((t) => t.height).reduce((prev, curr) => prev + curr, 0);
  }
  get isExpanded() {
    return this.toastRef().groupExpanded;
  }
  ngOnChanges(changes) {
    if (changes.toast && !changes.toast.firstChange && changes.toast.currentValue?.message) {
      requestAnimationFrame(() => {
        this.height.emit(this.toastBarBase.nativeElement.offsetHeight);
      });
    }
  }
  ngOnInit() {
    if (isTemplateRef(this.toast.message)) {
      this.context = {
        $implicit: this.toastRef()
      };
    }
    if (isComponent(this.toast.message)) {
      this.toastComponentInjector = Injector.create({
        providers: [{
          provide: HotToastRef,
          useValue: this.toastRef()
        }],
        parent: this.toast.injector || this.injector
      });
    }
    const nativeElement = this.toastBarBase.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      this.unlisteners.push(
        // Caretaker note: we have to remove these event listeners at the end (even if the element is removed from DOM).
        this.renderer.listen(nativeElement, "animationstart", (event) => {
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() => {
              this.renderer.setStyle(nativeElement, "pointer-events", "none");
              this.renderer.setStyle(nativeElement.parentElement, "pointer-events", "none");
              this.beforeClosed.emit();
            });
          }
        }),
        this.renderer.listen(nativeElement, "animationend", (event) => {
          if (this.isEnterAnimation(event)) {
            this.ngZone.run(() => {
              if (this.toast.autoClose) {
                const exitAnimation = `hotToastExitAnimation${this.top ? "Negative" : "Positive"} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1) var(--hot-toast-exit-animation-delay) var(--hot-toast-exit-animation-state)`;
                this.toastBarBaseStylesSignal.set(__spreadProps(__spreadValues({}, this.toast.style), {
                  animation: exitAnimation
                }));
              }
            });
          }
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() => this.afterClosed.emit({
              dismissedByAction: this.isManualClose,
              id: this.toast.id
            }));
          }
        })
      );
    });
  }
  ngAfterViewInit() {
    const nativeElement = this.toastBarBase.nativeElement;
    requestAnimationFrame(() => {
      this.height.emit(nativeElement.offsetHeight);
    });
    this.setToastAttributes();
  }
  softClose() {
    const exitAnimation = `hotToastExitSoftAnimation${this.top ? "Negative" : "Positive"} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;
    const nativeElement = this.toastBarBase.nativeElement;
    animate(this.renderer, nativeElement, exitAnimation);
    this.softClosed = true;
  }
  softOpen() {
    const softEnterAnimation = `hotToastEnterSoftAnimation${top ? "Negative" : "Positive"} ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;
    const nativeElement = this.toastBarBase.nativeElement;
    animate(this.renderer, nativeElement, softEnterAnimation);
    this.softClosed = false;
  }
  close() {
    this.isManualClose = true;
    this.cdr.markForCheck();
    const exitAnimation = `hotToastExitAnimation${this.top ? "Negative" : "Positive"} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;
    this.toastBarBaseStylesSignal.set(__spreadProps(__spreadValues({}, this.toast.style), {
      animation: exitAnimation
    }));
  }
  handleMouseEnter() {
    this.showAllToasts.emit(true);
  }
  handleMouseLeave() {
    this.showAllToasts.emit(false);
  }
  ngOnDestroy() {
    this.close();
    while (this.unlisteners.length) {
      this.unlisteners.pop()();
    }
  }
  isExitAnimation(ev) {
    return ev.animationName.includes("hotToastExitAnimation");
  }
  isEnterAnimation(ev) {
    return ev.animationName.includes("hotToastEnterAnimation");
  }
  setToastAttributes() {
    const toastAttributes = this.toast.attributes;
    for (const [key, value] of Object.entries(toastAttributes)) {
      this.renderer.setAttribute(this.toastBarBase.nativeElement, key, value);
    }
  }
  get visibleToasts() {
    return this.groupChildrenToasts.filter((t) => t.visible);
  }
  static {
    this.ɵfac = function HotToastGroupItemComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HotToastGroupItemComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HotToastGroupItemComponent,
      selectors: [["hot-toast-group-item"]],
      viewQuery: function HotToastGroupItemComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toastBarBase = _t.first);
        }
      },
      inputs: {
        toast: "toast",
        offset: [1, "offset"],
        defaultConfig: [1, "defaultConfig"],
        toastRef: [1, "toastRef"],
        toastsAfter: "toastsAfter",
        isShowingAllToasts: [1, "isShowingAllToasts"]
      },
      outputs: {
        height: "height",
        beforeClosed: "beforeClosed",
        afterClosed: "afterClosed",
        showAllToasts: "showAllToasts",
        toggleGroup: "toggleGroup"
      },
      features: [ɵɵNgOnChangesFeature],
      decls: 21,
      vars: 25,
      consts: [["hotToastBarBase", ""], [1, "hot-toast-bar-base-container"], [1, "hot-toast-bar-base-wrapper", 3, "mouseenter", "mouseleave"], [1, "hot-toast-bar-base"], ["aria-hidden", "true", 1, "hot-toast-icon"], [1, "hot-toast-message"], [4, "dynamicView", "dynamicViewContext", "dynamicViewInjector"], [3, "iconTheme"], [4, "dynamicView"], [3, "theme", "type"], ["type", "button", "aria-label", "Close", 1, "hot-toast-close-btn", 3, "click"]],
      template: function HotToastGroupItemComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 1);
          ɵɵtext(1, "\n  ");
          ɵɵelementStart(2, "div", 2);
          ɵɵlistener("mouseenter", function HotToastGroupItemComponent_Template_div_mouseenter_2_listener() {
            return ctx.handleMouseEnter();
          })("mouseleave", function HotToastGroupItemComponent_Template_div_mouseleave_2_listener() {
            return ctx.handleMouseLeave();
          });
          ɵɵtext(3, "\n    ");
          ɵɵelementStart(4, "div", 3, 0);
          ɵɵtext(6, "\n      ");
          ɵɵelementStart(7, "div", 4);
          ɵɵtext(8, "\n        ");
          ɵɵconditionalCreate(9, HotToastGroupItemComponent_Conditional_9_Template, 3, 1)(10, HotToastGroupItemComponent_Conditional_10_Template, 3, 2);
          ɵɵelementEnd();
          ɵɵtext(11, "\n      ");
          ɵɵelementStart(12, "div", 5);
          ɵɵtext(13, "\n        ");
          ɵɵtemplate(14, HotToastGroupItemComponent_ng_container_14_Template, 1, 0, "ng-container", 6);
          ɵɵtext(15, "\n      ");
          ɵɵelementEnd();
          ɵɵtext(16, "\n      ");
          ɵɵconditionalCreate(17, HotToastGroupItemComponent_Conditional_17_Template, 3, 2);
          ɵɵelementEnd();
          ɵɵtext(18, "\n  ");
          ɵɵelementEnd();
          ɵɵtext(19, "\n");
          ɵɵelementEnd();
          ɵɵtext(20, "\n");
        }
        if (rf & 2) {
          ɵɵstyleMap(ctx.containerPositionStyle);
          ɵɵclassMap("hot-toast-theme-" + ctx.toast.theme);
          ɵɵstyleProp("--hot-toast-scale", ctx.scale)("--hot-toast-translate-y", ctx.translateY);
          ɵɵadvance(4);
          ɵɵstyleMap(ctx.toastBarBaseStylesSignal());
          ɵɵclassMap(ctx.toast.className);
          ɵɵstyleProp("--hot-toast-animation-state", ctx.isManualClose ? "running" : "paused")("--hot-toast-exit-animation-state", ctx.isShowingAllToasts() ? "paused" : "running")("--hot-toast-exit-animation-delay", ctx.exitAnimationDelay);
          ɵɵattribute("aria-live", ctx.toast.ariaLive)("role", ctx.toast.role);
          ɵɵadvance(5);
          ɵɵconditional(ctx.toast.icon !== void 0 ? 9 : 10);
          ɵɵadvance(5);
          ɵɵproperty("dynamicView", ctx.toast.message)("dynamicViewContext", ctx.context)("dynamicViewInjector", ctx.toastComponentInjector);
          ɵɵadvance(3);
          ɵɵconditional(ctx.toast.dismissible ? 17 : -1);
        }
      },
      dependencies: [AnimatedIconComponent, IndicatorComponent, DynamicViewDirective],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HotToastGroupItemComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-group-item",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [AnimatedIconComponent, IndicatorComponent, DynamicViewDirective],
      template: `<div
  class="hot-toast-bar-base-container"
  [style]="containerPositionStyle"
  [class]="'hot-toast-theme-' + toast.theme"
  [style.--hot-toast-scale]="scale"
  [style.--hot-toast-translate-y]="translateY"
>
  <div class="hot-toast-bar-base-wrapper" (mouseenter)="handleMouseEnter()" (mouseleave)="handleMouseLeave()">
    <div
      class="hot-toast-bar-base"
      #hotToastBarBase
      [style]="toastBarBaseStylesSignal()"
      [class]="toast.className"
      [style.--hot-toast-animation-state]="isManualClose ? 'running' : 'paused'"
      [style.--hot-toast-exit-animation-state]="isShowingAllToasts() ? 'paused' : 'running'"
      [style.--hot-toast-exit-animation-delay]="exitAnimationDelay"
      [attr.aria-live]="toast.ariaLive"
      [attr.role]="toast.role"
    >
      <div class="hot-toast-icon" aria-hidden="true">
        @if (toast.icon !== undefined) { @if (isIconString) {
        <hot-toast-animated-icon [iconTheme]="toast.iconTheme">{{ toast.icon }}</hot-toast-animated-icon>
        } @else {
        <div>
          <ng-container *dynamicView="toast.icon" />
        </div>
        } } @else {
        <hot-toast-indicator [theme]="toast.iconTheme" [type]="toast.type" />
        }
      </div>
      <div class="hot-toast-message">
        <ng-container *dynamicView="toast.message; context: context; injector: toastComponentInjector" />
      </div>
      @if (toast.dismissible) {
      <button
        (click)="close()"
        type="button"
        class="hot-toast-close-btn"
        aria-label="Close"
        [style]="toast.closeStyle"
      ></button>
      }
    </div>
  </div>
</div>
`
    }]
  }], null, {
    toast: [{
      type: Input
    }],
    offset: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "offset",
        required: false
      }]
    }],
    defaultConfig: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "defaultConfig",
        required: false
      }]
    }],
    toastRef: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "toastRef",
        required: false
      }]
    }],
    toastsAfter: [{
      type: Input
    }],
    isShowingAllToasts: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "isShowingAllToasts",
        required: false
      }]
    }],
    height: [{
      type: Output,
      args: ["height"]
    }],
    beforeClosed: [{
      type: Output,
      args: ["beforeClosed"]
    }],
    afterClosed: [{
      type: Output,
      args: ["afterClosed"]
    }],
    showAllToasts: [{
      type: Output,
      args: ["showAllToasts"]
    }],
    toggleGroup: [{
      type: Output,
      args: ["toggleGroup"]
    }],
    toastBarBase: [{
      type: ViewChild,
      args: ["hotToastBarBase", {
        static: true
      }]
    }]
  });
})();
var HotToastComponent = class _HotToastComponent {
  constructor() {
    this.offset = input(0, ...ngDevMode ? [{
      debugName: "offset"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.defaultConfig = input(...ngDevMode ? [void 0, {
      debugName: "defaultConfig"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.toastRef = input(...ngDevMode ? [void 0, {
      debugName: "toastRef"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this._toastsAfter = 0;
    this.isShowingAllToasts = input(false, ...ngDevMode ? [{
      debugName: "isShowingAllToasts"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.height = output();
    this.beforeClosed = output();
    this.afterClosed = output();
    this.showAllToasts = output();
    this.toggleGroup = output();
    this.isManualClose = false;
    this.isExpanded = false;
    this.toastBarBaseStylesSignal = signal({}, ...ngDevMode ? [{
      debugName: "toastBarBaseStylesSignal"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.unlisteners = [];
    this.softClosed = false;
    this.groupRefs = [];
    this.injector = inject(Injector);
    this.renderer = inject(Renderer2);
    this.ngZone = inject(NgZone);
    this.cdr = inject(ChangeDetectorRef);
  }
  set toast(value) {
    this._toast = value;
    const ogStyle = this.toastBarBaseStylesSignal();
    const newStyle = __spreadValues({}, value.style);
    if (ogStyle["animation"]?.includes("hotToastExitAnimation")) {
      newStyle["animation"] = ogStyle["animation"];
    } else {
      const top2 = value.position.includes("top");
      const enterAnimation = `hotToastEnterAnimation${top2 ? "Negative" : "Positive"} ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;
      newStyle["animation"] = enterAnimation;
    }
    this.toastBarBaseStylesSignal.set(newStyle);
  }
  get toast() {
    return this._toast;
  }
  get toastsAfter() {
    return this._toastsAfter;
  }
  set toastsAfter(value) {
    this._toastsAfter = value;
    const defaultConfig = this.defaultConfig();
    if (defaultConfig?.visibleToasts > 0) {
      if (this.toast.autoClose) {
      } else {
        if (value >= defaultConfig?.visibleToasts) {
          this.softClose();
        } else if (this.softClosed) {
          this.softOpen();
        }
      }
    }
  }
  get toastBarBaseHeight() {
    return this.toastBarBase.nativeElement.offsetHeight;
  }
  get scale() {
    return this.defaultConfig().stacking !== "vertical" && !this.isShowingAllToasts() ? this.toastsAfter * -HOT_TOAST_DEPTH_SCALE + 1 : 1;
  }
  get translateY() {
    return this.offset() * (this.top ? 1 : -1) + "px";
  }
  get exitAnimationDelay() {
    return this.toast.duration + "ms";
  }
  get top() {
    return this.toast.position.includes("top");
  }
  get containerPositionStyle() {
    const verticalStyle = this.top ? {
      top: 0
    } : {
      bottom: 0
    };
    const transform = `translateY(var(--hot-toast-translate-y)) scale(var(--hot-toast-scale))`;
    const horizontalStyle = this.toast.position.includes("left") ? {
      left: 0
    } : this.toast.position.includes("right") ? {
      right: 0
    } : {
      left: 0,
      right: 0,
      justifyContent: "center"
    };
    return __spreadValues(__spreadValues({
      transform
    }, verticalStyle), horizontalStyle);
  }
  get isIconString() {
    return typeof this.toast.icon === "string";
  }
  get groupChildrenToastRefs() {
    return this.groupRefs.filter((ref) => !!ref);
  }
  set groupChildrenToastRefs(value) {
    this.groupRefs = value;
    this.toastRef().groupRefs = value;
  }
  get groupChildrenToasts() {
    return this.groupChildrenToastRefs.map((ref) => ref.getToast());
  }
  get groupHeight() {
    return this.visibleToasts.slice(-this.defaultConfig().visibleToasts).map((t) => t.height).reduce((prev, curr) => prev + curr, 0);
  }
  get visibleToasts() {
    return this.groupChildrenToasts.filter((t) => t.visible);
  }
  ngDoCheck() {
    const toastRef = this.toastRef();
    if (toastRef.groupRefs.length !== this.groupRefs.length) {
      this.groupRefs = toastRef.groupRefs.slice();
      this.cdr.markForCheck();
      this.emiHeightWithGroup(this.isExpanded);
    }
    if (toastRef.groupExpanded !== this.isExpanded) {
      this.isExpanded = toastRef.groupExpanded;
      this.cdr.markForCheck();
      this.emiHeightWithGroup(this.isExpanded);
    }
  }
  ngOnChanges(changes) {
    if (changes.toast && !changes.toast.firstChange && changes.toast.currentValue?.message) {
      this, this.emiHeightWithGroup(this.isExpanded);
    }
  }
  ngOnInit() {
    if (isTemplateRef(this.toast.message)) {
      this.context = {
        $implicit: this.toastRef()
      };
    }
    if (isComponent(this.toast.message)) {
      this.toastComponentInjector = Injector.create({
        providers: [{
          provide: HotToastRef,
          useValue: this.toastRef()
        }],
        parent: this.toast.injector || this.injector
      });
    }
    const nativeElement = this.toastBarBase.nativeElement;
    this.ngZone.runOutsideAngular(() => {
      this.unlisteners.push(
        // Caretaker note: we have to remove these event listeners at the end (even if the element is removed from DOM).
        this.renderer.listen(nativeElement, "animationstart", (event) => {
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() => {
              this.renderer.setStyle(nativeElement, "pointer-events", "none");
              this.renderer.setStyle(nativeElement.parentElement, "pointer-events", "none");
              this.beforeClosed.emit();
            });
          }
        }),
        this.renderer.listen(nativeElement, "animationend", (event) => {
          if (this.isEnterAnimation(event)) {
            this.ngZone.run(() => {
              if (this.toast.autoClose) {
                const exitAnimation = `hotToastExitAnimation${this.top ? "Negative" : "Positive"} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1) var(--hot-toast-exit-animation-delay) var(--hot-toast-exit-animation-state)`;
                this.toastBarBaseStylesSignal.set(__spreadProps(__spreadValues({}, this.toast.style), {
                  animation: exitAnimation
                }));
              }
            });
          }
          if (this.isExitAnimation(event)) {
            this.ngZone.run(() => this.afterClosed.emit({
              dismissedByAction: this.isManualClose,
              id: this.toast.id
            }));
          }
        })
      );
    });
  }
  ngAfterViewInit() {
    const nativeElement = this.toastBarBase.nativeElement;
    requestAnimationFrame(() => {
      this.height.emit(nativeElement.offsetHeight);
    });
    this.setToastAttributes();
  }
  softClose() {
    const exitAnimation = `hotToastExitSoftAnimation${this.top ? "Negative" : "Positive"} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;
    const nativeElement = this.toastBarBase.nativeElement;
    animate(this.renderer, nativeElement, exitAnimation);
    this.softClosed = true;
    if (this.isExpanded) {
      this.toggleToastGroup();
    }
  }
  softOpen() {
    const softEnterAnimation = `hotToastEnterSoftAnimation${top ? "Negative" : "Positive"} ${ENTER_ANIMATION_DURATION}ms cubic-bezier(0.21, 1.02, 0.73, 1) forwards`;
    const nativeElement = this.toastBarBase.nativeElement;
    animate(this.renderer, nativeElement, softEnterAnimation);
    this.softClosed = false;
  }
  close() {
    this.isManualClose = true;
    this.cdr.markForCheck();
    const exitAnimation = `hotToastExitAnimation${this.top ? "Negative" : "Positive"} ${EXIT_ANIMATION_DURATION}ms forwards cubic-bezier(0.06, 0.71, 0.55, 1)`;
    this.toastBarBaseStylesSignal.set(__spreadProps(__spreadValues({}, this.toast.style), {
      animation: exitAnimation
    }));
  }
  handleMouseEnter() {
    this.showAllToasts.emit(true);
  }
  handleMouseLeave() {
    this.showAllToasts.emit(false);
  }
  ngOnDestroy() {
    this.close();
    while (this.unlisteners.length) {
      this.unlisteners.pop()();
    }
  }
  isExitAnimation(ev) {
    return ev.animationName.includes("hotToastExitAnimation");
  }
  isEnterAnimation(ev) {
    return ev.animationName.includes("hotToastEnterAnimation");
  }
  setToastAttributes() {
    const toastAttributes = this.toast.attributes;
    for (const [key, value] of Object.entries(toastAttributes)) {
      this.renderer.setAttribute(this.toastBarBase.nativeElement, key, value);
    }
  }
  calculateOffset(toastId) {
    const visibleToasts = this.visibleToasts;
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    const offset = index !== -1 ? visibleToasts.slice(...this.defaultConfig().reverseOrder ? [index + 1] : [0, index]).reduce((acc, t, i) => {
      const defaultConfig = this.defaultConfig();
      return defaultConfig.visibleToasts !== 0 && i < visibleToasts.length - defaultConfig.visibleToasts ? 0 : acc + (t.height || 0);
    }, 0) : 0;
    return offset;
  }
  updateHeight(height, toast) {
    toast.height = height;
    this.cdr.markForCheck();
  }
  beforeClosedGroupItem(toast) {
    toast.visible = false;
    this.cdr.markForCheck();
    if (this.visibleToasts.length === 0 && this.isExpanded) {
      this.toggleToastGroup();
    } else {
      this.emiHeightWithGroup(this.isExpanded);
    }
  }
  afterClosedGroupItem(closeToast) {
    const toastIndex = this.groupChildrenToasts.findIndex((t) => t.id === closeToast.id);
    if (toastIndex > -1) {
      this.groupChildrenToastRefs = this.groupChildrenToastRefs.filter((t) => t.getToast().id !== closeToast.id);
      this.cdr.markForCheck();
    }
  }
  toggleToastGroup() {
    const event = this.isExpanded ? "collapse" : "expand";
    this.toggleGroup.emit({
      byAction: true,
      event,
      id: this.toast.id
    });
    this.emiHeightWithGroup(event === "expand");
  }
  emiHeightWithGroup(isExpanded) {
    if (isExpanded) {
      requestAnimationFrame(() => {
        this.height.emit(this.toastBarBase.nativeElement.offsetHeight + this.groupHeight);
      });
    } else {
      requestAnimationFrame(() => {
        this.height.emit(this.toastBarBase.nativeElement.offsetHeight);
      });
    }
  }
  static {
    this.ɵfac = function HotToastComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HotToastComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HotToastComponent,
      selectors: [["hot-toast-component"]],
      viewQuery: function HotToastComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.toastBarBase = _t.first);
        }
      },
      inputs: {
        toast: "toast",
        offset: [1, "offset"],
        defaultConfig: [1, "defaultConfig"],
        toastRef: [1, "toastRef"],
        toastsAfter: "toastsAfter",
        isShowingAllToasts: [1, "isShowingAllToasts"]
      },
      outputs: {
        height: "height",
        beforeClosed: "beforeClosed",
        afterClosed: "afterClosed",
        showAllToasts: "showAllToasts",
        toggleGroup: "toggleGroup"
      },
      features: [ɵɵNgOnChangesFeature],
      decls: 23,
      vars: 29,
      consts: [["hotToastBarBase", ""], [1, "hot-toast-bar-base-container"], [1, "hot-toast-bar-base-wrapper", 3, "mouseenter", "mouseleave"], [1, "hot-toast-bar-base"], ["aria-hidden", "true", 1, "hot-toast-icon"], [1, "hot-toast-message"], [4, "dynamicView", "dynamicViewContext", "dynamicViewInjector"], [3, "iconTheme", "icon"], [4, "dynamicView"], [3, "theme", "type"], ["type", "button", 1, "hot-toast-group-btn", 3, "click"], ["type", "button", "aria-label", "Close", 1, "hot-toast-close-btn", 3, "click"], ["role", "list", 1, "hot-toast-bar-base-group"], [3, "height", "beforeClosed", "afterClosed", "toast", "offset", "toastRef", "toastsAfter", "defaultConfig", "isShowingAllToasts"]],
      template: function HotToastComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 1);
          ɵɵtext(1, "\n  ");
          ɵɵelementStart(2, "div", 2);
          ɵɵlistener("mouseenter", function HotToastComponent_Template_div_mouseenter_2_listener() {
            return ctx.handleMouseEnter();
          })("mouseleave", function HotToastComponent_Template_div_mouseleave_2_listener() {
            return ctx.handleMouseLeave();
          });
          ɵɵtext(3, "\n    ");
          ɵɵelementStart(4, "div", 3, 0);
          ɵɵtext(6, "\n      ");
          ɵɵelementStart(7, "div", 4);
          ɵɵtext(8, "\n        ");
          ɵɵconditionalCreate(9, HotToastComponent_Conditional_9_Template, 3, 1)(10, HotToastComponent_Conditional_10_Template, 3, 2);
          ɵɵelementEnd();
          ɵɵtext(11, "\n\n      ");
          ɵɵelementStart(12, "div", 5);
          ɵɵtext(13, "\n        ");
          ɵɵtemplate(14, HotToastComponent_ng_container_14_Template, 1, 0, "ng-container", 6);
          ɵɵtext(15, "\n      ");
          ɵɵelementEnd();
          ɵɵtext(16, "\n\n      ");
          ɵɵconditionalCreate(17, HotToastComponent_Conditional_17_Template, 3, 5);
          ɵɵconditionalCreate(18, HotToastComponent_Conditional_18_Template, 3, 2);
          ɵɵelementEnd();
          ɵɵtext(19, "\n\n    ");
          ɵɵconditionalCreate(20, HotToastComponent_Conditional_20_Template, 6, 4);
          ɵɵelementEnd();
          ɵɵtext(21, "\n");
          ɵɵelementEnd();
          ɵɵtext(22, "\n");
        }
        if (rf & 2) {
          ɵɵstyleMap(ctx.containerPositionStyle);
          ɵɵclassMap("hot-toast-theme-" + ctx.toast.theme);
          ɵɵstyleProp("--hot-toast-scale", ctx.scale)("--hot-toast-translate-y", ctx.translateY);
          ɵɵadvance(2);
          ɵɵclassProp("expanded", ctx.isExpanded);
          ɵɵadvance(2);
          ɵɵstyleMap(ctx.toastBarBaseStylesSignal());
          ɵɵclassMap(ctx.toast.className);
          ɵɵstyleProp("--hot-toast-animation-state", ctx.isManualClose ? "running" : "paused")("--hot-toast-exit-animation-state", ctx.isShowingAllToasts() ? "paused" : "running")("--hot-toast-exit-animation-delay", ctx.exitAnimationDelay);
          ɵɵattribute("aria-live", ctx.toast.ariaLive)("role", ctx.toast.role);
          ɵɵadvance(5);
          ɵɵconditional(ctx.toast.icon !== void 0 ? 9 : 10);
          ɵɵadvance(5);
          ɵɵproperty("dynamicView", ctx.toast.message)("dynamicViewContext", ctx.context)("dynamicViewInjector", ctx.toastComponentInjector);
          ɵɵadvance(3);
          ɵɵconditional((ctx.toast.group == null ? null : ctx.toast.group.expandAndCollapsible) && (ctx.toast.group == null ? null : ctx.toast.group.children) && ctx.visibleToasts.length > 0 ? 17 : -1);
          ɵɵadvance();
          ɵɵconditional(ctx.toast.dismissible ? 18 : -1);
          ɵɵadvance(2);
          ɵɵconditional(ctx.toast.visible ? 20 : -1);
        }
      },
      dependencies: [DynamicViewDirective, IndicatorComponent, AnimatedIconComponent, HotToastGroupItemComponent],
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HotToastComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-component",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [DynamicViewDirective, IndicatorComponent, AnimatedIconComponent, HotToastGroupItemComponent],
      template: `<div
  class="hot-toast-bar-base-container"
  [style]="containerPositionStyle"
  [class]="'hot-toast-theme-' + toast.theme"
  [style.--hot-toast-scale]="scale"
  [style.--hot-toast-translate-y]="translateY"
>
  <div
    class="hot-toast-bar-base-wrapper"
    [class.expanded]="isExpanded"
    (mouseenter)="handleMouseEnter()"
    (mouseleave)="handleMouseLeave()"
  >
    <div
      class="hot-toast-bar-base"
      #hotToastBarBase
      [style]="toastBarBaseStylesSignal()"
      [class]="toast.className"
      [style.--hot-toast-animation-state]="isManualClose ? 'running' : 'paused'"
      [style.--hot-toast-exit-animation-state]="isShowingAllToasts() ? 'paused' : 'running'"
      [style.--hot-toast-exit-animation-delay]="exitAnimationDelay"
      [attr.aria-live]="toast.ariaLive"
      [attr.role]="toast.role"
    >
      <div class="hot-toast-icon" aria-hidden="true">
        @if (toast.icon !== undefined) { @if (isIconString) {
        <hot-toast-animated-icon [iconTheme]="toast.iconTheme" [icon]="toast.icon" />
        } @else {
        <div>
          <ng-container *dynamicView="toast.icon" />
        </div>
        } } @else {
        <hot-toast-indicator [theme]="toast.iconTheme" [type]="toast.type" />
        }
      </div>

      <div class="hot-toast-message">
        <ng-container *dynamicView="toast.message; context: context; injector: toastComponentInjector" />
      </div>

      @if (toast.group?.expandAndCollapsible && toast.group?.children && visibleToasts.length > 0) {
      <button
        (click)="toggleToastGroup()"
        type="button"
        class="hot-toast-group-btn"
        [class.expanded]="isExpanded"
        [attr.aria-label]="isExpanded ? 'Collapse' : 'Expand'"
        [style]="toast.group.btnStyle"
      ></button>
      } @if (toast.dismissible) {
      <button
        (click)="close()"
        type="button"
        class="hot-toast-close-btn"
        aria-label="Close"
        [style]="toast.closeStyle"
      ></button>
      }
    </div>

    @if (toast.visible) {
    <div
      role="list"
      class="hot-toast-bar-base-group"
      [class]="toast.group?.className"
      [style.--hot-toast-group-height]="groupHeight + 'px'"
    >
      @for (item of groupChildrenToasts; track item.id) {
      <hot-toast-group-item [toast]="item"
        [offset]="calculateOffset(item.id)"
        [toastRef]="toastRef().groupRefs[$index]"
        [toastsAfter]="(item.autoClose ? groupChildrenToasts.length : visibleToasts.length) - 1 - $index"
        [defaultConfig]="defaultConfig()"
        [isShowingAllToasts]="isShowingAllToasts()"
        (height)="updateHeight($event, item)"
        (beforeClosed)="beforeClosedGroupItem(item)"
        (afterClosed)="afterClosedGroupItem($event)"
       />
      }
    </div>
    }
  </div>
</div>
`
    }]
  }], null, {
    toast: [{
      type: Input
    }],
    offset: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "offset",
        required: false
      }]
    }],
    defaultConfig: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "defaultConfig",
        required: false
      }]
    }],
    toastRef: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "toastRef",
        required: false
      }]
    }],
    toastsAfter: [{
      type: Input
    }],
    isShowingAllToasts: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "isShowingAllToasts",
        required: false
      }]
    }],
    height: [{
      type: Output,
      args: ["height"]
    }],
    beforeClosed: [{
      type: Output,
      args: ["beforeClosed"]
    }],
    afterClosed: [{
      type: Output,
      args: ["afterClosed"]
    }],
    showAllToasts: [{
      type: Output,
      args: ["showAllToasts"]
    }],
    toggleGroup: [{
      type: Output,
      args: ["toggleGroup"]
    }],
    toastBarBase: [{
      type: ViewChild,
      args: ["hotToastBarBase", {
        static: true
      }]
    }]
  });
})();
var HotToastContainerComponent = class _HotToastContainerComponent {
  constructor() {
    this.defaultConfig = input(...ngDevMode ? [void 0, {
      debugName: "defaultConfig"
    }] : (
      /* istanbul ignore next */
      []
    ));
    this.toasts = [];
    this.toastRefs = [];
    this.isShowingAllToasts = false;
    this._onClosed = new Subject();
    this._onGroupToggle = new Subject();
    this._onGroupRefAttached = new Subject();
    this.onClosed$ = this._onClosed.asObservable();
    this.onGroupToggle$ = this._onGroupToggle.asObservable();
    this.onGroupRefAttached$ = this._onGroupRefAttached.asObservable();
    this.cdr = inject(ChangeDetectorRef);
    this.toastService = inject(HotToastService);
    this.host = inject(ElementRef);
    afterNextRender(() => {
      if (this.defaultConfig().usePopover) {
        try {
          this.host.nativeElement["showPopover"]();
        } catch (error) {
          if (isDevMode()) {
            console.error("Error showing popover");
            console.error(error);
          }
        }
      }
    });
  }
  trackById(index, toast) {
    return toast.id;
  }
  getVisibleToasts(position) {
    return this.unGroupedToasts.filter((t) => t.visible && t.position === position);
  }
  get unGroupedToasts() {
    return this.toasts.filter((t) => t.group?.parent === void 0 || t.group?.children === void 0 || t.group?.children.length === 0);
  }
  calculateOffset(toastId, position) {
    const visibleToasts = this.getVisibleToasts(position);
    const index = visibleToasts.findIndex((toast) => toast.id === toastId);
    const offset = index !== -1 ? visibleToasts.slice(...this.defaultConfig().reverseOrder ? [index + 1] : [0, index]).reduce((acc, t, i) => {
      const toastsAfter = visibleToasts.length - 1 - i;
      return this.defaultConfig().visibleToasts !== 0 && i < visibleToasts.length - this.defaultConfig().visibleToasts ? 0 : acc + (this.defaultConfig().stacking === "vertical" || this.isShowingAllToasts ? t.height || 0 : toastsAfter * HOT_TOAST_DEPTH_SCALE + HOT_TOAST_DEPTH_SCALE_ADD) + HOT_TOAST_MARGIN;
    }, 0) : 0;
    return offset;
  }
  updateHeight(height, toast) {
    toast.height = height;
    this.cdr.markForCheck();
  }
  addToast(ref, skipAttachToParent) {
    this.toastRefs.push(ref);
    let toast = ref.getToast();
    this.toasts.push(ref.getToast());
    if (this.defaultConfig().visibleToasts !== 0 && this.unGroupedToasts.length > this.defaultConfig().visibleToasts) {
      const closeToasts = this.toasts.slice(0, this.toasts.length - this.defaultConfig().visibleToasts);
      closeToasts.forEach((t) => {
        if (t.autoClose) {
          this.closeToast(t.id);
        }
      });
    }
    this.cdr.markForCheck();
    this.attachGroupRefs(toast, ref, skipAttachToParent);
    return {
      dispose: () => {
        this.closeToast(toast.id);
      },
      updateMessage: (message) => {
        toast.message = message;
        this.updateToasts(toast);
        this.cdr.markForCheck();
      },
      updateToast: (options) => {
        toast = __spreadValues(__spreadValues({}, toast), options);
        this.updateToasts(toast, options);
        this.cdr.markForCheck();
      },
      afterClosed: this.getAfterClosed(toast),
      afterGroupToggled: this.getAfterGroupToggled(toast),
      afterGroupRefsAttached: this.getAfterGroupRefsAttached(toast).pipe(map((v) => v.groupRefs))
    };
  }
  async attachGroupRefs(toast, ref, skipAttachToParent) {
    let groupRefs = [];
    if (toast.group) {
      if (toast.group.children) {
        groupRefs = await this.createGroupRefs(toast, ref);
        const toastIndex = this.toastRefs.findIndex((t) => t.getToast().id === toast.id);
        if (toastIndex > -1) {
          this.toastRefs[toastIndex].groupRefs = groupRefs;
          this.cdr.markForCheck();
          this._onGroupRefAttached.next({
            groupRefs,
            id: toast.id
          });
        }
      } else if (toast.group.parent && !skipAttachToParent) {
        const parentToastRef = toast.group.parent;
        const parentToast = parentToastRef.getToast();
        const parentToastRefIndex = this.toastRefs.findIndex((t) => t.getToast().id === parentToast.id);
        const parentToastIndex = this.toasts.findIndex((t) => t.id === parentToast.id);
        if (parentToastRefIndex > -1 && parentToastIndex > -1) {
          this.toastRefs[parentToastRefIndex].groupRefs.push(ref);
          const existingGroup = this.toasts[parentToastRefIndex].group ?? {};
          const existingChildren = this.toasts[parentToastRefIndex].group?.children ?? [];
          existingChildren.push({
            options: __spreadProps(__spreadValues({}, toast), {
              type: toast.type,
              message: toast.message
            })
          });
          existingGroup.children = existingChildren;
          this.toasts[parentToastRefIndex].group = __spreadValues({}, existingGroup);
          this.cdr.markForCheck();
          this._onGroupRefAttached.next({
            groupRefs,
            id: parentToast.id
          });
        }
      }
    }
  }
  createGroupRefs(toast, ref) {
    const skipAttachToParent = true;
    return new Promise((resolve) => {
      const items = toast.group.children;
      const allPromises = items.map((item) => {
        return new Promise((innerResolve) => {
          item.options.group = {
            parent: ref
          };
          setTimeout(() => {
            try {
              const itemRef = this.toastService.show(item.options.message, item.options, skipAttachToParent);
              innerResolve(itemRef);
            } catch (error) {
              console.error("Error creating toast", error);
              innerResolve(null);
            }
          });
        });
      });
      Promise.all(allPromises).then((refs) => resolve(refs));
    });
  }
  closeToast(id) {
    if (id) {
      const comp = this.hotToastComponentList.find((item) => item.toast.id === id);
      if (comp) {
        comp.close();
        this.cdr.markForCheck();
      }
    } else {
      this.hotToastComponentList.forEach((comp) => comp.close());
      this.cdr.markForCheck();
    }
  }
  beforeClosed(toast) {
    toast.visible = false;
    this.cdr.markForCheck();
  }
  afterClosed(closeToast) {
    const toastIndex = this.toasts.findIndex((t) => t.id === closeToast.id);
    if (toastIndex > -1) {
      this._onClosed.next(closeToast);
      this.toasts = this.toasts.filter((t) => t.id !== closeToast.id);
      this.toastRefs = this.toastRefs.filter((t) => t.getToast().id !== closeToast.id);
      this.cdr.markForCheck();
    }
  }
  toggleGroup(groupEvent) {
    const toastIndex = this.toastRefs.findIndex((t) => t.getToast().id === groupEvent.id);
    if (toastIndex > -1) {
      this._onGroupToggle.next(groupEvent);
      this.toastRefs[toastIndex].groupExpanded = groupEvent.event === "expand";
      this.cdr.markForCheck();
    }
  }
  hasToast(id) {
    return this.toasts.findIndex((t) => t.id === id) > -1;
  }
  showAllToasts(show) {
    this.isShowingAllToasts = show;
  }
  ngOnDestroy() {
    if (this.defaultConfig().usePopover) {
      try {
        this.host.nativeElement["hidePopover"]();
      } catch (error) {
        if (isDevMode()) {
          console.error("Error hiding popover");
          console.error(error);
        }
      }
    }
  }
  getAfterClosed(toast) {
    return this.onClosed$.pipe(filter((v) => v.id === toast.id));
  }
  getAfterGroupToggled(toast) {
    return this.onGroupToggle$.pipe(filter((v) => v.id === toast.id));
  }
  getAfterGroupRefsAttached(toast) {
    return this.onGroupRefAttached$.pipe(filter((v) => v.id === toast.id));
  }
  updateToasts(toast, options) {
    this.toasts = this.toasts.map((t) => __spreadValues(__spreadValues({}, t), t.id === toast.id && __spreadValues(__spreadValues({}, toast), options)));
    this.cdr.markForCheck();
  }
  static {
    this.ɵfac = function HotToastContainerComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HotToastContainerComponent)();
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _HotToastContainerComponent,
      selectors: [["hot-toast-container"]],
      viewQuery: function HotToastContainerComponent_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(HotToastComponent, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.hotToastComponentList = _t);
        }
      },
      hostVars: 3,
      hostBindings: function HotToastContainerComponent_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("popover", ctx.defaultConfig().usePopover ? "manual" : void 0);
          ɵɵclassProp("hot-toast-container-overlay-popover", ctx.defaultConfig().usePopover);
        }
      },
      inputs: {
        defaultConfig: [1, "defaultConfig"]
      },
      decls: 11,
      vars: 0,
      consts: [[1, "hot-toast-container-overlay"], [1, "hot-toast-container-wrapper"], [3, "showAllToasts", "height", "beforeClosed", "afterClosed", "toggleGroup", "toast", "offset", "toastRef", "toastsAfter", "defaultConfig", "isShowingAllToasts"]],
      template: function HotToastContainerComponent_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵelementStart(0, "div", 0);
          ɵɵtext(1, "\n  ");
          ɵɵelementStart(2, "div", 1);
          ɵɵtext(3, "\n    ");
          ɵɵelementStart(4, "div");
          ɵɵtext(5, "\n      ");
          ɵɵrepeaterCreate(6, HotToastContainerComponent_For_7_Template, 3, 1, null, null, ctx.trackById, true);
          ɵɵelementEnd();
          ɵɵtext(8, "\n  ");
          ɵɵelementEnd();
          ɵɵtext(9, "\n");
          ɵɵelementEnd();
          ɵɵtext(10, "\n");
        }
        if (rf & 2) {
          ɵɵadvance(6);
          ɵɵrepeater(ctx.toasts);
        }
      },
      dependencies: [HotToastComponent],
      styles: [".hot-toast-container-overlay[_ngcontent-%COMP%]{position:fixed;z-index:var(--hot-toast-container-overlay-z-index, 9999);inset:0;pointer-events:none}.hot-toast-container-wrapper[_ngcontent-%COMP%]{position:relative;height:100%}"],
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HotToastContainerComponent, [{
    type: Component,
    args: [{
      selector: "hot-toast-container",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [HotToastComponent],
      host: {
        "[attr.popover]": 'defaultConfig().usePopover ? "manual" : undefined',
        "[class.hot-toast-container-overlay-popover]": "defaultConfig().usePopover"
      },
      template: '<div class="hot-toast-container-overlay">\n  <div class="hot-toast-container-wrapper">\n    <div>\n      @for (toast of toasts; track trackById($index, toast)) {\n        @if (toast.group?.parent) {\n        } @else {\n          <hot-toast-component\n            [toast]="toast"\n            [offset]="calculateOffset(toast.id, toast.position)"\n            [toastRef]="toastRefs[$index]"\n            [toastsAfter]="(toast.autoClose ? toasts.length : getVisibleToasts(toast.position).length) - 1 - $index"\n            [defaultConfig]="defaultConfig()"\n            [isShowingAllToasts]="isShowingAllToasts"\n            (showAllToasts)="showAllToasts($event)"\n            (height)="updateHeight($event, toast)"\n            (beforeClosed)="beforeClosed(toast)"\n            (afterClosed)="afterClosed($event)"\n            (toggleGroup)="toggleGroup($event)"\n          />\n        }\n      }\n    </div>\n  </div>\n</div>\n',
      styles: [".hot-toast-container-overlay{position:fixed;z-index:var(--hot-toast-container-overlay-z-index, 9999);inset:0;pointer-events:none}.hot-toast-container-wrapper{position:relative;height:100%}\n"]
    }]
  }], () => [], {
    defaultConfig: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "defaultConfig",
        required: false
      }]
    }],
    hotToastComponentList: [{
      type: ViewChildren,
      args: [HotToastComponent]
    }]
  });
})();
var ToastConfig = class {
  constructor() {
    this.reverseOrder = false;
    this.visibleToasts = 5;
    this.stacking = "vertical";
    this.ariaLive = "polite";
    this.role = "status";
    this.position = "top-center";
    this.autoClose = true;
    this.theme = "toast";
    this.attributes = {};
    this.info = {
      content: ""
    };
    this.success = {
      content: ""
    };
    this.error = {
      content: ""
    };
    this.loading = {
      content: ""
    };
    this.blank = {
      content: ""
    };
    this.warning = {
      content: ""
    };
  }
};
var isFunction = (valOrFunction) => typeof valOrFunction === "function";
var isAngularComponent = (arg) => {
  return typeof arg === "function" && !!arg.ɵcmp;
};
var resolveValueOrFunction = (valOrFunction, arg) => isAngularComponent(valOrFunction) ? valOrFunction : isFunction(valOrFunction) ? valOrFunction(arg) : valOrFunction;
var ToastPersistConfig = class {
  constructor() {
    this.storage = "local";
    this.key = "ngxpert/hototast-${id}";
    this.count = 1;
    this.enabled = false;
  }
};
var HOT_TOAST_CONTAINER_TOKEN = new InjectionToken("HOT_TOAST_CONTAINER_TOKEN");
var HOT_TOAST_USE_POPOVER_TOKEN = new InjectionToken("HOT_TOAST_USE_POPOVER_TOKEN");
var HotToastService = class _HotToastService {
  static {
    this.nextId = 0;
  }
  constructor() {
    this._isInitialized = false;
    this._defaultGlobalConfig = new ToastConfig();
    this._defaultPersistConfig = new ToastPersistConfig();
    this._viewService = inject(ViewService);
    this._platformId = inject(PLATFORM_ID);
    this._globalConfig = inject(ToastConfig, {
      optional: true
    });
    this._container = inject(HOT_TOAST_CONTAINER_TOKEN, {
      optional: true
    });
    this._usePopover = inject(HOT_TOAST_USE_POPOVER_TOKEN, {
      optional: true
    });
    this._document = inject(DOCUMENT);
    if (this._globalConfig) {
      this._defaultGlobalConfig = __spreadValues(__spreadValues({}, this._defaultGlobalConfig), this._globalConfig);
    }
  }
  get defaultConfig() {
    return this._defaultGlobalConfig;
  }
  set defaultConfig(config) {
    this._defaultGlobalConfig = __spreadValues(__spreadValues({}, this._defaultGlobalConfig), config);
    if (this._componentRef) {
      this._componentRef.setInput("defaultConfig", this._defaultGlobalConfig);
    }
  }
  /**
   * Opens up an hot-toast without any pre-configurations
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @param skipAttachToParent Only for internal usage. Setting this to true will not attach toast to it's parent.
   * @returns
   * @memberof HotToastService
   */
  show(message, options, skipAttachToParent) {
    const toast = this.createToast({
      message: message || this._defaultGlobalConfig.blank.content,
      type: options?.type ?? "blank",
      options: __spreadValues(__spreadValues({}, this._defaultGlobalConfig), options),
      skipAttachToParent
    });
    return toast;
  }
  /**
   * Opens up an hot-toast with pre-configurations for error state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  error(message, options) {
    const toast = this.createToast({
      message: message || this._defaultGlobalConfig.error.content,
      type: "error",
      options: __spreadValues(__spreadValues(__spreadValues({}, this._defaultGlobalConfig), this._defaultGlobalConfig?.error), options)
    });
    return toast;
  }
  /**
   * Opens up an hot-toast with pre-configurations for success state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  success(message, options) {
    const toast = this.createToast({
      message: message || this._defaultGlobalConfig.success.content,
      type: "success",
      options: __spreadValues(__spreadValues(__spreadValues({}, this._defaultGlobalConfig), this._defaultGlobalConfig?.success), options)
    });
    return toast;
  }
  /**
   * Opens up an hot-toast with pre-configurations for loading state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  loading(message, options) {
    const toast = this.createToast({
      message: message || this._defaultGlobalConfig.loading.content,
      type: "loading",
      options: __spreadValues(__spreadValues(__spreadValues({}, this._defaultGlobalConfig), this._defaultGlobalConfig?.loading), options)
    });
    return toast;
  }
  /**
   * Opens up an hot-toast with pre-configurations for warning state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   */
  warning(message, options) {
    const toast = this.createToast({
      message: message || this._defaultGlobalConfig.warning.content,
      type: "warning",
      options: __spreadValues(__spreadValues(__spreadValues({}, this._defaultGlobalConfig), this._defaultGlobalConfig?.warning), options)
    });
    return toast;
  }
  /**
   * Opens up an hot-toast with pre-configurations for info state
   *
   * @param message The message to show in the hot-toast.
   * @param [options] Additional configuration options for the hot-toast.
   * @returns
   * @memberof HotToastService
   * @since 3.3.0
   */
  info(message, options) {
    const toast = this.createToast({
      message: message || this._defaultGlobalConfig.info.content,
      type: "info",
      options: __spreadValues(__spreadValues(__spreadValues({}, this._defaultGlobalConfig), this._defaultGlobalConfig?.info), options)
    });
    return toast;
  }
  /**
   *
   *  Opens up an hot-toast with pre-configurations for loading initially and then changes state based on messages
   *
   * @template T Type of observable
   * @param messages Messages for each state i.e. loading, success and error
   * @returns
   * @memberof HotToastService
   */
  observe(messages) {
    return (source) => {
      let toastRef;
      let start = 0;
      const loadingContent = messages.loading ?? this._defaultGlobalConfig.loading?.content;
      const successContent = messages.success ?? this._defaultGlobalConfig.success?.content;
      const errorContent = messages.error ?? this._defaultGlobalConfig.error?.content;
      return defer(() => {
        if (loadingContent) {
          toastRef = this.createLoadingToast(loadingContent);
          start = Date.now();
        }
        return source.pipe(tap(__spreadValues(__spreadValues({}, successContent && {
          next: (val) => {
            toastRef = this.createOrUpdateToast(messages, val, toastRef, "success", start === 0 ? start : Date.now() - start);
          }
        }), errorContent && {
          error: (e) => {
            toastRef = this.createOrUpdateToast(messages, e, toastRef, "error", start === 0 ? start : Date.now() - start);
          }
        })));
      });
    };
  }
  fromForm(control, options) {
    let toastRef;
    const handleStatus = async (status) => {
      const stateConfig = options[status];
      if (!stateConfig) {
        toastRef?.close();
        toastRef = void 0;
        return;
      }
      const _a = stateConfig, {
        message,
        show
      } = _a, toastOptions = __objRest(_a, [
        "message",
        "show"
      ]);
      const resolvedMessage = typeof message === "function" ? message(control) : message;
      const statusDefaults = HOT_TOAST_FORM_STATUS_DEFAULTS[status];
      const mergedOptions = __spreadValues(__spreadValues({}, statusDefaults), toastOptions);
      if (show) {
        const shouldShow = await show(control);
        if (!shouldShow) {
          toastRef?.close();
          toastRef = void 0;
          return;
        } else {
          if (toastRef) {
            toastRef.updateMessage(resolvedMessage);
            toastRef.updateToast(mergedOptions);
          } else {
            toastRef = this.show(resolvedMessage, mergedOptions);
            toastRef.afterClosed.subscribe(() => {
              toastRef = void 0;
            });
          }
        }
      } else if (control.dirty && control.touched) {
        if (toastRef) {
          toastRef.updateMessage(resolvedMessage);
          toastRef.updateToast(mergedOptions);
        } else {
          toastRef = this.show(resolvedMessage, mergedOptions);
          toastRef.afterClosed.subscribe(() => {
            toastRef = void 0;
          });
        }
      }
    };
    handleStatus(control.status);
    const subscription = new Subscription();
    subscription.add(control.statusChanges.subscribe((status) => handleStatus(status)));
    return {
      close: () => {
        subscription.unsubscribe();
        toastRef?.close();
        toastRef = void 0;
      }
    };
  }
  /**
   * Closes the hot-toast
   *
   * @param [id] - ID of the toast
   * @since 3.0.1 - If ID is not provided, all toasts will be closed
   */
  close(id) {
    if (this._componentRef) {
      this._componentRef.ref.instance.closeToast(id);
    }
  }
  /**
   * Used for internal purpose only.
   * Creates a container component and attaches it to document.body.
   */
  init() {
    if (isPlatformServer(this._platformId)) {
      return;
    }
    const defaultUsePopover = this._usePopover ?? true;
    if (!("showPopover" in this._document.body)) {
      this._defaultGlobalConfig.usePopover = false;
    } else {
      this._defaultGlobalConfig.usePopover = this._defaultGlobalConfig.usePopover ?? defaultUsePopover;
    }
    if (this._container) {
      let containerElement = document.querySelector(this._container);
      if (!containerElement) {
        console.warn(`No container element found for selector: ${this._container}, using document.body instead as toast container.`);
        containerElement = document.body;
      }
      this._componentRef = this._viewService.createComponent(HotToastContainerComponent).setInput("defaultConfig", this._defaultGlobalConfig).appendTo(containerElement);
    } else {
      this._componentRef = this._viewService.createComponent(HotToastContainerComponent).setInput("defaultConfig", this._defaultGlobalConfig).appendTo(document.body);
    }
  }
  createOrUpdateToast(messages, val, toastRef, type, diff) {
    try {
      let content = null;
      let options = {};
      ({
        content,
        options
      } = this.getContentAndOptions(type, messages[type] || (this._defaultGlobalConfig[type] ? this._defaultGlobalConfig[type].content : "")));
      content = resolveValueOrFunction(content, val);
      if (toastRef) {
        if (options.data) {
          toastRef.data = options.data;
        }
        toastRef.updateMessage(content);
        const updatedOptions = __spreadValues(__spreadValues({
          type,
          duration: diff + HOT_TOAST_DEFAULT_TIMEOUTS[type]
        }, options), options.duration && {
          duration: diff + options.duration
        });
        toastRef.updateToast(updatedOptions);
      } else {
        this.createToast({
          message: content,
          type,
          options
        });
      }
      return toastRef;
    } catch (error) {
      console.error(error);
    }
  }
  createToast({
    message,
    type,
    options,
    observableMessages,
    skipAttachToParent
  }) {
    if (!this._isInitialized) {
      this._isInitialized = true;
      this.init();
    }
    const id = options?.id ?? `toast-${_HotToastService.nextId++}`;
    if (!this.isDuplicate(id) && (!options.persist?.enabled || options.persist?.enabled && this.handleStorageValue(id, options))) {
      const toast = __spreadValues({
        ariaLive: options?.ariaLive ?? "polite",
        createdAt: Date.now(),
        duration: options?.duration ?? HOT_TOAST_DEFAULT_TIMEOUTS[type],
        id,
        message,
        role: options?.role ?? "status",
        type,
        visible: true,
        observableMessages: observableMessages ?? void 0
      }, options);
      return new HotToastRef(toast).appendTo(this._componentRef.ref.instance, skipAttachToParent);
    }
  }
  /**
   * Checks whether any toast with same id is present.
   *
   * @private
   * @param id - Toast ID
   */
  isDuplicate(id) {
    return this._componentRef.ref.instance.hasToast(id);
  }
  /**
   * Creates an entry in local or session storage with count ${defaultConfig.persist.count}, if not present.
   * If present in storage, reduces the count
   * and returns the count.
   * Count can not be less than 0.
   */
  handleStorageValue(id, options) {
    let count = 1;
    const persist = __spreadValues(__spreadValues({}, this._defaultPersistConfig), options.persist);
    const storage = persist.storage === "local" ? localStorage : sessionStorage;
    const key = persist.key.replace(/\${id}/g, id);
    let item = storage.getItem(key);
    if (item) {
      item = parseInt(item, 10);
      if (item > 0) {
        count = item - 1;
      } else {
        count = item;
      }
    } else {
      count = persist.count;
    }
    storage.setItem(key, count.toString());
    return count;
  }
  getContentAndOptions(toastType, message) {
    var _a;
    let content;
    let options = __spreadValues(__spreadValues({}, this._defaultGlobalConfig), this._defaultGlobalConfig[toastType]);
    if (typeof message === "string" || isTemplateRef(message) || isComponent(message)) {
      content = message;
    } else {
      let restOptions;
      _a = message, {
        content
      } = _a, restOptions = __objRest(_a, [
        "content"
      ]);
      options = __spreadValues(__spreadValues({}, options), restOptions);
    }
    return {
      content,
      options
    };
  }
  createLoadingToast(messages) {
    let content = null;
    let options = {};
    ({
      content,
      options
    } = this.getContentAndOptions("loading", messages));
    return this.loading(content, options);
  }
  static {
    this.ɵfac = function HotToastService_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _HotToastService)();
    };
  }
  static {
    this.ɵprov = ɵɵdefineInjectable({
      token: _HotToastService,
      factory: _HotToastService.ɵfac,
      providedIn: "root"
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(HotToastService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
function provideHotToastConfig(config) {
  return makeEnvironmentProviders([{
    provide: ToastConfig,
    useValue: config
  }]);
}
var DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG = {
  ignoreStatuses: [],
  showForUnknownErrors: true
};
var HOT_TOAST_HTTP_INTERCEPTOR_CONFIG = new InjectionToken("HOT_TOAST_HTTP_INTERCEPTOR_CONFIG");
function resolveErrorMessage(context) {
  const {
    error
  } = context;
  if (error instanceof HttpErrorResponse) {
    if (typeof error.error === "string" && error.error.trim().length > 0) {
      return error.error;
    }
    if (error.message) {
      return error.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Something went wrong";
}
function resolveToastMessage(config, context) {
  if (typeof config.errorMessage === "function") {
    return config.errorMessage(context);
  }
  if (typeof config.errorMessage === "string") {
    return config.errorMessage;
  }
  return resolveErrorMessage(context);
}
var hotToastHttpInterceptor = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const toast = inject(HotToastService);
  const injectedConfig = inject(HOT_TOAST_HTTP_INTERCEPTOR_CONFIG, {
    optional: true
  });
  const config = __spreadValues(__spreadValues({}, DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG), injectedConfig);
  if (config.skipRequest?.({
    request: req
  })) {
    return next(req);
  }
  return next(req).pipe(catchError((error) => {
    if (isPlatformServer(platformId)) {
      return throwError(error);
    }
    const status = error instanceof HttpErrorResponse ? error.status : void 0;
    const url = error instanceof HttpErrorResponse ? error.url ?? void 0 : void 0;
    const context = {
      error,
      request: req,
      status,
      url: url ?? req.url
    };
    if (status !== void 0 && config.ignoreStatuses?.includes(status)) {
      return throwError(error);
    }
    if (config.shouldIgnore?.(context)) {
      return throwError(error);
    }
    if (!(error instanceof HttpErrorResponse) && !config.showForUnknownErrors) {
      return throwError(error);
    }
    const message = resolveToastMessage(config, context);
    if (message) {
      toast.error(message, config.toastOptions);
    }
    return throwError(error);
  }));
};
function provideHotToastHttpInterceptor(config) {
  return makeEnvironmentProviders([{
    provide: HOT_TOAST_HTTP_INTERCEPTOR_CONFIG,
    useValue: __spreadValues(__spreadValues({}, DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG), config)
  }]);
}
var HotToastBuilder = class {
  constructor(message, service) {
    this.message = message;
    this.service = service;
    this.options = {};
    this.groupChildren = [];
  }
  setOptions(options) {
    this.options = __spreadValues(__spreadValues({}, this.options), options);
    return this;
  }
  addChild(child) {
    this.groupChildren.push(child);
    return this;
  }
  get afterGroupRefsAttached() {
    return this.toastRef?.afterGroupRefsAttached;
  }
  addChildrenToOptions() {
    if (this.groupChildren.length > 0) {
      const children = this.groupChildren.map((child) => ({
        options: __spreadValues({
          message: child.message
        }, child.options)
      }));
      this.options.group = __spreadProps(__spreadValues({}, this.options.group), {
        children
      });
    }
  }
  // Create method that creates but doesn't show the toast. Call show() to show the toast.
  create(method = "show") {
    this.addChildrenToOptions();
    this.toastRef = this.service[method](this.message, __spreadValues(__spreadValues({}, this.options), {
      visible: false
    }));
    return this.toastRef;
  }
  createToast(method) {
    this.addChildrenToOptions();
    this.toastRef = this.service[method](this.message, this.options);
    return this.toastRef;
  }
  show() {
    return this.createToast("show");
  }
  success() {
    return this.createToast("success");
  }
  error() {
    return this.createToast("error");
  }
  warning() {
    return this.createToast("warning");
  }
  info() {
    return this.createToast("info");
  }
  loading() {
    return this.createToast("loading");
  }
};
export {
  DEFAULT_HOT_TOAST_HTTP_INTERCEPTOR_CONFIG,
  HOT_TOAST_CONTAINER_TOKEN,
  HOT_TOAST_HTTP_INTERCEPTOR_CONFIG,
  HOT_TOAST_USE_POPOVER_TOKEN,
  HotToastBuilder,
  HotToastRef,
  HotToastService,
  ToastConfig,
  ToastPersistConfig,
  hotToastHttpInterceptor,
  provideHotToastConfig,
  provideHotToastHttpInterceptor,
  resolveValueOrFunction
};
//# sourceMappingURL=@ngxpert_hot-toast.js.map
