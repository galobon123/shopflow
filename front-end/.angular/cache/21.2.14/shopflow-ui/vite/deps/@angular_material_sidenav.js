import {
  ArrayDataSource,
  _RecycleViewRepeaterStrategy,
  isDataSource
} from "./chunk-YLKKSZLG.js";
import {
  coerceBooleanProperty
} from "./chunk-2OHV5IG7.js";
import {
  ESCAPE,
  FocusMonitor,
  FocusTrapFactory,
  InteractivityChecker,
  _animationsDisabled,
  coerceElement,
  coerceNumberProperty,
  hasModifierKey
} from "./chunk-YKOSS5B3.js";
import "./chunk-SR7NOOHU.js";
import "./chunk-T2VNVATC.js";
import "./chunk-BAXNTYUU.js";
import {
  RtlScrollAxisType,
  getRtlScrollAxisType,
  supportsScrollBehavior
} from "./chunk-KJK67K32.js";
import {
  Platform
} from "./chunk-6BOASKZ5.js";
import {
  BidiModule,
  Directionality
} from "./chunk-I5RHQY4U.js";
import "./chunk-MJ25JFER.js";
import "./chunk-VNQVG2Q2.js";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  DOCUMENT,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  IterableDiffers,
  NgModule,
  NgZone,
  Output,
  QueryList,
  Renderer2,
  RendererFactory2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  afterNextRender,
  booleanAttribute,
  effect,
  forwardRef,
  inject,
  setClassMetadata,
  signal,
  untracked,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵgetInheritedFactory,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵviewQuery
} from "./chunk-BZ4IC765.js";
import {
  Observable,
  Subject,
  Subscription,
  animationFrameScheduler,
  asapScheduler,
  auditTime,
  debounceTime,
  distinctUntilChanged,
  filter,
  isObservable,
  map,
  mapTo,
  merge,
  of,
  pairwise,
  shareReplay,
  startWith,
  switchMap,
  take,
  takeUntil
} from "./chunk-RSS3ODKE.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@angular/cdk/fesm2022/scrolling.mjs
var _c0 = ["contentWrapper"];
var _c1 = ["*"];
var VIRTUAL_SCROLL_STRATEGY = new InjectionToken("VIRTUAL_SCROLL_STRATEGY");
var FixedSizeVirtualScrollStrategy = class {
  _scrolledIndexChange = new Subject();
  scrolledIndexChange = this._scrolledIndexChange.pipe(distinctUntilChanged());
  _viewport = null;
  _itemSize;
  _minBufferPx;
  _maxBufferPx;
  constructor(itemSize, minBufferPx, maxBufferPx) {
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
  }
  attach(viewport) {
    this._viewport = viewport;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  detach() {
    this._scrolledIndexChange.complete();
    this._viewport = null;
  }
  updateItemAndBufferSize(itemSize, minBufferPx, maxBufferPx) {
    if (maxBufferPx < minBufferPx && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CDK virtual scroll: maxBufferPx must be greater than or equal to minBufferPx");
    }
    this._itemSize = itemSize;
    this._minBufferPx = minBufferPx;
    this._maxBufferPx = maxBufferPx;
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  onContentScrolled() {
    this._updateRenderedRange();
  }
  onDataLengthChanged() {
    this._updateTotalContentSize();
    this._updateRenderedRange();
  }
  onContentRendered() {
  }
  onRenderedOffsetChanged() {
  }
  scrollToIndex(index, behavior) {
    if (this._viewport) {
      this._viewport.scrollToOffset(index * this._itemSize, behavior);
    }
  }
  _updateTotalContentSize() {
    if (!this._viewport) {
      return;
    }
    this._viewport.setTotalContentSize(this._viewport.getDataLength() * this._itemSize);
  }
  _updateRenderedRange() {
    if (!this._viewport) {
      return;
    }
    const renderedRange = this._viewport.getRenderedRange();
    const newRange = {
      start: renderedRange.start,
      end: renderedRange.end
    };
    const viewportSize = this._viewport.getViewportSize();
    const dataLength = this._viewport.getDataLength();
    let scrollOffset = this._viewport.measureScrollOffset();
    let firstVisibleIndex = this._itemSize > 0 ? scrollOffset / this._itemSize : 0;
    if (newRange.end > dataLength) {
      const maxVisibleItems = Math.ceil(viewportSize / this._itemSize);
      const newVisibleIndex = Math.max(0, Math.min(firstVisibleIndex, dataLength - maxVisibleItems));
      if (firstVisibleIndex != newVisibleIndex) {
        firstVisibleIndex = newVisibleIndex;
        scrollOffset = newVisibleIndex * this._itemSize;
        newRange.start = Math.floor(firstVisibleIndex);
      }
      newRange.end = Math.max(0, Math.min(dataLength, newRange.start + maxVisibleItems));
    }
    const startBuffer = scrollOffset - newRange.start * this._itemSize;
    if (startBuffer < this._minBufferPx && newRange.start != 0) {
      const expandStart = Math.ceil((this._maxBufferPx - startBuffer) / this._itemSize);
      newRange.start = Math.max(0, newRange.start - expandStart);
      newRange.end = Math.min(dataLength, Math.ceil(firstVisibleIndex + (viewportSize + this._minBufferPx) / this._itemSize));
    } else {
      const endBuffer = newRange.end * this._itemSize - (scrollOffset + viewportSize);
      if (endBuffer < this._minBufferPx && newRange.end != dataLength) {
        const expandEnd = Math.ceil((this._maxBufferPx - endBuffer) / this._itemSize);
        if (expandEnd > 0) {
          newRange.end = Math.min(dataLength, newRange.end + expandEnd);
          newRange.start = Math.max(0, Math.floor(firstVisibleIndex - this._minBufferPx / this._itemSize));
        }
      }
    }
    this._viewport.setRenderedRange(newRange);
    this._viewport.setRenderedContentOffset(Math.round(this._itemSize * newRange.start));
    this._scrolledIndexChange.next(Math.floor(firstVisibleIndex));
  }
};
function _fixedSizeVirtualScrollStrategyFactory(fixedSizeDir) {
  return fixedSizeDir._scrollStrategy;
}
var CdkFixedSizeVirtualScroll = class _CdkFixedSizeVirtualScroll {
  get itemSize() {
    return this._itemSize;
  }
  set itemSize(value) {
    this._itemSize = coerceNumberProperty(value);
  }
  _itemSize = 20;
  get minBufferPx() {
    return this._minBufferPx;
  }
  set minBufferPx(value) {
    this._minBufferPx = coerceNumberProperty(value);
  }
  _minBufferPx = 100;
  get maxBufferPx() {
    return this._maxBufferPx;
  }
  set maxBufferPx(value) {
    this._maxBufferPx = coerceNumberProperty(value);
  }
  _maxBufferPx = 200;
  _scrollStrategy = new FixedSizeVirtualScrollStrategy(this.itemSize, this.minBufferPx, this.maxBufferPx);
  ngOnChanges() {
    this._scrollStrategy.updateItemAndBufferSize(this.itemSize, this.minBufferPx, this.maxBufferPx);
  }
  static ɵfac = function CdkFixedSizeVirtualScroll_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkFixedSizeVirtualScroll)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkFixedSizeVirtualScroll,
    selectors: [["cdk-virtual-scroll-viewport", "itemSize", ""]],
    inputs: {
      itemSize: "itemSize",
      minBufferPx: "minBufferPx",
      maxBufferPx: "maxBufferPx"
    },
    features: [ɵɵProvidersFeature([{
      provide: VIRTUAL_SCROLL_STRATEGY,
      useFactory: _fixedSizeVirtualScrollStrategyFactory,
      deps: [forwardRef(() => _CdkFixedSizeVirtualScroll)]
    }]), ɵɵNgOnChangesFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkFixedSizeVirtualScroll, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[itemSize]",
      providers: [{
        provide: VIRTUAL_SCROLL_STRATEGY,
        useFactory: _fixedSizeVirtualScrollStrategyFactory,
        deps: [forwardRef(() => CdkFixedSizeVirtualScroll)]
      }]
    }]
  }], null, {
    itemSize: [{
      type: Input
    }],
    minBufferPx: [{
      type: Input
    }],
    maxBufferPx: [{
      type: Input
    }]
  });
})();
var DEFAULT_SCROLL_TIME = 20;
var ScrollDispatcher = class _ScrollDispatcher {
  _ngZone = inject(NgZone);
  _platform = inject(Platform);
  _renderer = inject(RendererFactory2).createRenderer(null, null);
  _cleanupGlobalListener;
  constructor() {
  }
  _scrolled = new Subject();
  _scrolledCount = 0;
  scrollContainers = /* @__PURE__ */ new Map();
  register(scrollable) {
    if (!this.scrollContainers.has(scrollable)) {
      this.scrollContainers.set(scrollable, scrollable.elementScrolled().subscribe(() => this._scrolled.next(scrollable)));
    }
  }
  deregister(scrollable) {
    const scrollableReference = this.scrollContainers.get(scrollable);
    if (scrollableReference) {
      scrollableReference.unsubscribe();
      this.scrollContainers.delete(scrollable);
    }
  }
  scrolled(auditTimeInMs = DEFAULT_SCROLL_TIME) {
    if (!this._platform.isBrowser) {
      return of();
    }
    return new Observable((observer) => {
      if (!this._cleanupGlobalListener) {
        this._cleanupGlobalListener = this._ngZone.runOutsideAngular(() => this._renderer.listen("document", "scroll", () => this._scrolled.next()));
      }
      const subscription = auditTimeInMs > 0 ? this._scrolled.pipe(auditTime(auditTimeInMs)).subscribe(observer) : this._scrolled.subscribe(observer);
      this._scrolledCount++;
      return () => {
        subscription.unsubscribe();
        this._scrolledCount--;
        if (!this._scrolledCount) {
          this._cleanupGlobalListener?.();
          this._cleanupGlobalListener = void 0;
        }
      };
    });
  }
  ngOnDestroy() {
    this._cleanupGlobalListener?.();
    this._cleanupGlobalListener = void 0;
    this.scrollContainers.forEach((_, container) => this.deregister(container));
    this._scrolled.complete();
  }
  ancestorScrolled(elementOrElementRef, auditTimeInMs) {
    const ancestors = this.getAncestorScrollContainers(elementOrElementRef);
    return this.scrolled(auditTimeInMs).pipe(filter((target) => !target || ancestors.indexOf(target) > -1));
  }
  getAncestorScrollContainers(elementOrElementRef) {
    const scrollingContainers = [];
    this.scrollContainers.forEach((_subscription, scrollable) => {
      if (this._scrollableContainsElement(scrollable, elementOrElementRef)) {
        scrollingContainers.push(scrollable);
      }
    });
    return scrollingContainers;
  }
  _scrollableContainsElement(scrollable, elementOrElementRef) {
    let element = coerceElement(elementOrElementRef);
    let scrollableElement = scrollable.getElementRef().nativeElement;
    do {
      if (element == scrollableElement) {
        return true;
      }
    } while (element = element.parentElement);
    return false;
  }
  static ɵfac = function ScrollDispatcher_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollDispatcher)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ScrollDispatcher,
    factory: _ScrollDispatcher.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollDispatcher, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var CdkScrollable = class _CdkScrollable {
  elementRef = inject(ElementRef);
  scrollDispatcher = inject(ScrollDispatcher);
  ngZone = inject(NgZone);
  dir = inject(Directionality, {
    optional: true
  });
  _scrollElement = this.elementRef.nativeElement;
  _destroyed = new Subject();
  _renderer = inject(Renderer2);
  _cleanupScroll;
  _elementScrolled = new Subject();
  constructor() {
  }
  ngOnInit() {
    this._cleanupScroll = this.ngZone.runOutsideAngular(() => this._renderer.listen(this._scrollElement, "scroll", (event) => this._elementScrolled.next(event)));
    this.scrollDispatcher.register(this);
  }
  ngOnDestroy() {
    this._cleanupScroll?.();
    this._elementScrolled.complete();
    this.scrollDispatcher.deregister(this);
    this._destroyed.next();
    this._destroyed.complete();
  }
  elementScrolled() {
    return this._elementScrolled;
  }
  getElementRef() {
    return this.elementRef;
  }
  scrollTo(options) {
    const el = this.elementRef.nativeElement;
    const isRtl = this.dir && this.dir.value == "rtl";
    if (options.left == null) {
      options.left = isRtl ? options.end : options.start;
    }
    if (options.right == null) {
      options.right = isRtl ? options.start : options.end;
    }
    if (options.bottom != null) {
      options.top = el.scrollHeight - el.clientHeight - options.bottom;
    }
    if (isRtl && getRtlScrollAxisType() != RtlScrollAxisType.NORMAL) {
      if (options.left != null) {
        options.right = el.scrollWidth - el.clientWidth - options.left;
      }
      if (getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
        options.left = options.right;
      } else if (getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
        options.left = options.right ? -options.right : options.right;
      }
    } else {
      if (options.right != null) {
        options.left = el.scrollWidth - el.clientWidth - options.right;
      }
    }
    this._applyScrollToOptions(options);
  }
  _applyScrollToOptions(options) {
    const el = this.elementRef.nativeElement;
    if (supportsScrollBehavior()) {
      el.scrollTo(options);
    } else {
      if (options.top != null) {
        el.scrollTop = options.top;
      }
      if (options.left != null) {
        el.scrollLeft = options.left;
      }
    }
  }
  measureScrollOffset(from) {
    const LEFT = "left";
    const RIGHT = "right";
    const el = this.elementRef.nativeElement;
    if (from == "top") {
      return el.scrollTop;
    }
    if (from == "bottom") {
      return el.scrollHeight - el.clientHeight - el.scrollTop;
    }
    const isRtl = this.dir && this.dir.value == "rtl";
    if (from == "start") {
      from = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      from = isRtl ? LEFT : RIGHT;
    }
    if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.INVERTED) {
      if (from == LEFT) {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      } else {
        return el.scrollLeft;
      }
    } else if (isRtl && getRtlScrollAxisType() == RtlScrollAxisType.NEGATED) {
      if (from == LEFT) {
        return el.scrollLeft + el.scrollWidth - el.clientWidth;
      } else {
        return -el.scrollLeft;
      }
    } else {
      if (from == LEFT) {
        return el.scrollLeft;
      } else {
        return el.scrollWidth - el.clientWidth - el.scrollLeft;
      }
    }
  }
  static ɵfac = function CdkScrollable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkScrollable)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkScrollable,
    selectors: [["", "cdk-scrollable", ""], ["", "cdkScrollable", ""]]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollable, [{
    type: Directive,
    args: [{
      selector: "[cdk-scrollable], [cdkScrollable]"
    }]
  }], () => [], null);
})();
var DEFAULT_RESIZE_TIME = 20;
var ViewportRuler = class _ViewportRuler {
  _platform = inject(Platform);
  _listeners;
  _viewportSize = null;
  _change = new Subject();
  _document = inject(DOCUMENT);
  constructor() {
    const ngZone = inject(NgZone);
    const renderer = inject(RendererFactory2).createRenderer(null, null);
    ngZone.runOutsideAngular(() => {
      if (this._platform.isBrowser) {
        const changeListener = (event) => this._change.next(event);
        this._listeners = [renderer.listen("window", "resize", changeListener), renderer.listen("window", "orientationchange", changeListener)];
      }
      this.change().subscribe(() => this._viewportSize = null);
    });
  }
  ngOnDestroy() {
    this._listeners?.forEach((cleanup) => cleanup());
    this._change.complete();
  }
  getViewportSize() {
    if (!this._viewportSize) {
      this._updateViewportSize();
    }
    const output = {
      width: this._viewportSize.width,
      height: this._viewportSize.height
    };
    if (!this._platform.isBrowser) {
      this._viewportSize = null;
    }
    return output;
  }
  getViewportRect() {
    const scrollPosition = this.getViewportScrollPosition();
    const {
      width,
      height
    } = this.getViewportSize();
    return {
      top: scrollPosition.top,
      left: scrollPosition.left,
      bottom: scrollPosition.top + height,
      right: scrollPosition.left + width,
      height,
      width
    };
  }
  getViewportScrollPosition() {
    if (!this._platform.isBrowser) {
      return {
        top: 0,
        left: 0
      };
    }
    const document = this._document;
    const window2 = this._getWindow();
    const documentElement = document.documentElement;
    const documentRect = documentElement.getBoundingClientRect();
    const top = -documentRect.top || document.body?.scrollTop || window2.scrollY || documentElement.scrollTop || 0;
    const left = -documentRect.left || document.body?.scrollLeft || window2.scrollX || documentElement.scrollLeft || 0;
    return {
      top,
      left
    };
  }
  change(throttleTime = DEFAULT_RESIZE_TIME) {
    return throttleTime > 0 ? this._change.pipe(auditTime(throttleTime)) : this._change;
  }
  _getWindow() {
    return this._document.defaultView || window;
  }
  _updateViewportSize() {
    const window2 = this._getWindow();
    this._viewportSize = this._platform.isBrowser ? {
      width: window2.innerWidth,
      height: window2.innerHeight
    } : {
      width: 0,
      height: 0
    };
  }
  static ɵfac = function ViewportRuler_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ViewportRuler)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ViewportRuler,
    factory: _ViewportRuler.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewportRuler, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var VIRTUAL_SCROLLABLE = new InjectionToken("VIRTUAL_SCROLLABLE");
var CdkVirtualScrollable = class _CdkVirtualScrollable extends CdkScrollable {
  constructor() {
    super();
  }
  measureViewportSize(orientation) {
    const viewportEl = this.elementRef.nativeElement;
    return orientation === "horizontal" ? viewportEl.clientWidth : viewportEl.clientHeight;
  }
  static ɵfac = function CdkVirtualScrollable_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollable)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkVirtualScrollable,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollable, [{
    type: Directive
  }], () => [], null);
})();
function rangesEqual(r1, r2) {
  return r1.start == r2.start && r1.end == r2.end;
}
var SCROLL_SCHEDULER = typeof requestAnimationFrame !== "undefined" ? animationFrameScheduler : asapScheduler;
var CDK_VIRTUAL_SCROLL_VIEWPORT = new InjectionToken("CDK_VIRTUAL_SCROLL_VIEWPORT");
var CdkVirtualScrollViewport = class _CdkVirtualScrollViewport extends CdkVirtualScrollable {
  elementRef = inject(ElementRef);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _scrollStrategy = inject(VIRTUAL_SCROLL_STRATEGY, {
    optional: true
  });
  scrollable = inject(VIRTUAL_SCROLLABLE, {
    optional: true
  });
  _platform = inject(Platform);
  _detachedSubject = new Subject();
  _renderedRangeSubject = new Subject();
  _renderedContentOffsetSubject = new Subject();
  get orientation() {
    return this._orientation;
  }
  set orientation(orientation) {
    if (this._orientation !== orientation) {
      this._orientation = orientation;
      this._calculateSpacerSize();
    }
  }
  _orientation = "vertical";
  appendOnly = false;
  scrolledIndexChange = new Observable((observer) => this._scrollStrategy.scrolledIndexChange.subscribe((index) => Promise.resolve().then(() => this.ngZone.run(() => observer.next(index)))));
  _contentWrapper;
  renderedRangeStream = this._renderedRangeSubject;
  renderedContentOffset = this._renderedContentOffsetSubject.pipe(filter((offset) => offset !== null), distinctUntilChanged());
  _totalContentSize = 0;
  _totalContentWidth = signal("", ...ngDevMode ? [{
    debugName: "_totalContentWidth"
  }] : []);
  _totalContentHeight = signal("", ...ngDevMode ? [{
    debugName: "_totalContentHeight"
  }] : []);
  _renderedContentTransform;
  _renderedRange = {
    start: 0,
    end: 0
  };
  _dataLength = 0;
  _viewportSize = 0;
  _forOf = null;
  _renderedContentOffset = 0;
  _renderedContentOffsetNeedsRewrite = false;
  _changeDetectionNeeded = signal(false, ...ngDevMode ? [{
    debugName: "_changeDetectionNeeded"
  }] : []);
  _runAfterChangeDetection = [];
  _viewportChanges = Subscription.EMPTY;
  _injector = inject(Injector);
  _isDestroyed = false;
  constructor() {
    super();
    const viewportRuler = inject(ViewportRuler);
    if (!this._scrollStrategy && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error('Error: cdk-virtual-scroll-viewport requires the "itemSize" property to be set.');
    }
    this._viewportChanges = viewportRuler.change().subscribe(() => {
      this.checkViewportSize();
    });
    if (!this.scrollable) {
      this.elementRef.nativeElement.classList.add("cdk-virtual-scrollable");
      this.scrollable = this;
    }
    const ref = effect(() => {
      if (this._changeDetectionNeeded()) {
        this._doChangeDetection();
      }
    }, __spreadProps(__spreadValues({}, ngDevMode ? {
      debugName: "ref"
    } : {}), {
      injector: inject(ApplicationRef).injector
    }));
    inject(DestroyRef).onDestroy(() => void ref.destroy());
  }
  ngOnInit() {
    if (!this._platform.isBrowser) {
      return;
    }
    if (this.scrollable === this) {
      super.ngOnInit();
    }
    this.ngZone.runOutsideAngular(() => Promise.resolve().then(() => {
      this._measureViewportSize();
      this._scrollStrategy.attach(this);
      this.scrollable.elementScrolled().pipe(startWith(null), auditTime(0, SCROLL_SCHEDULER), takeUntil(this._destroyed)).subscribe(() => this._scrollStrategy.onContentScrolled());
      this._markChangeDetectionNeeded();
    }));
  }
  ngOnDestroy() {
    this.detach();
    this._scrollStrategy.detach();
    this._renderedRangeSubject.complete();
    this._detachedSubject.complete();
    this._viewportChanges.unsubscribe();
    this._isDestroyed = true;
    super.ngOnDestroy();
  }
  attach(forOf) {
    if (this._forOf && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error("CdkVirtualScrollViewport is already attached.");
    }
    this.ngZone.runOutsideAngular(() => {
      this._forOf = forOf;
      this._forOf.dataStream.pipe(takeUntil(this._detachedSubject)).subscribe((data) => {
        const newLength = data.length;
        if (newLength !== this._dataLength) {
          this._dataLength = newLength;
          this._scrollStrategy.onDataLengthChanged();
        }
        this._doChangeDetection();
      });
    });
  }
  detach() {
    this._forOf = null;
    this._detachedSubject.next();
  }
  getDataLength() {
    return this._dataLength;
  }
  getViewportSize() {
    return this._viewportSize;
  }
  getRenderedRange() {
    return this._renderedRange;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  setTotalContentSize(size) {
    if (this._totalContentSize !== size) {
      this._totalContentSize = size;
      this._calculateSpacerSize();
      this._markChangeDetectionNeeded();
    }
  }
  setRenderedRange(range) {
    if (!rangesEqual(this._renderedRange, range)) {
      if (this.appendOnly) {
        range = {
          start: 0,
          end: Math.max(this._renderedRange.end, range.end)
        };
      }
      this._renderedRangeSubject.next(this._renderedRange = range);
      this._markChangeDetectionNeeded(() => this._scrollStrategy.onContentRendered());
    }
  }
  getOffsetToRenderedContentStart() {
    return this._renderedContentOffsetNeedsRewrite ? null : this._renderedContentOffset;
  }
  setRenderedContentOffset(offset, to = "to-start") {
    offset = this.appendOnly && to === "to-start" ? 0 : offset;
    const isRtl = this.dir && this.dir.value == "rtl";
    const isHorizontal = this.orientation == "horizontal";
    const axis = isHorizontal ? "X" : "Y";
    const axisDirection = isHorizontal && isRtl ? -1 : 1;
    let transform = `translate${axis}(${Number(axisDirection * offset)}px)`;
    this._renderedContentOffset = offset;
    if (to === "to-end") {
      transform += ` translate${axis}(-100%)`;
      this._renderedContentOffsetNeedsRewrite = true;
    }
    if (this._renderedContentTransform != transform) {
      this._renderedContentTransform = transform;
      this._markChangeDetectionNeeded(() => {
        if (this._renderedContentOffsetNeedsRewrite) {
          this._renderedContentOffset -= this.measureRenderedContentSize();
          this._renderedContentOffsetNeedsRewrite = false;
          this.setRenderedContentOffset(this._renderedContentOffset);
        } else {
          this._scrollStrategy.onRenderedOffsetChanged();
        }
      });
    }
  }
  scrollToOffset(offset, behavior = "auto") {
    const options = {
      behavior
    };
    if (this.orientation === "horizontal") {
      options.start = offset;
    } else {
      options.top = offset;
    }
    this.scrollable.scrollTo(options);
  }
  scrollToIndex(index, behavior = "auto") {
    this._scrollStrategy.scrollToIndex(index, behavior);
  }
  measureScrollOffset(from) {
    let measureScrollOffset;
    if (this.scrollable == this) {
      measureScrollOffset = (_from) => super.measureScrollOffset(_from);
    } else {
      measureScrollOffset = (_from) => this.scrollable.measureScrollOffset(_from);
    }
    return Math.max(0, measureScrollOffset(from ?? (this.orientation === "horizontal" ? "start" : "top")) - this.measureViewportOffset());
  }
  measureViewportOffset(from) {
    let fromRect;
    const LEFT = "left";
    const RIGHT = "right";
    const isRtl = this.dir?.value == "rtl";
    if (from == "start") {
      fromRect = isRtl ? RIGHT : LEFT;
    } else if (from == "end") {
      fromRect = isRtl ? LEFT : RIGHT;
    } else if (from) {
      fromRect = from;
    } else {
      fromRect = this.orientation === "horizontal" ? "left" : "top";
    }
    const scrollerClientRect = this.scrollable.measureBoundingClientRectWithScrollOffset(fromRect);
    const viewportClientRect = this.elementRef.nativeElement.getBoundingClientRect()[fromRect];
    return viewportClientRect - scrollerClientRect;
  }
  measureRenderedContentSize() {
    const contentEl = this._contentWrapper.nativeElement;
    return this.orientation === "horizontal" ? contentEl.offsetWidth : contentEl.offsetHeight;
  }
  measureRangeSize(range) {
    if (!this._forOf) {
      return 0;
    }
    return this._forOf.measureRangeSize(range, this.orientation);
  }
  checkViewportSize() {
    this._measureViewportSize();
    this._scrollStrategy.onDataLengthChanged();
  }
  _measureViewportSize() {
    this._viewportSize = this.scrollable.measureViewportSize(this.orientation);
  }
  _markChangeDetectionNeeded(runAfter) {
    if (runAfter) {
      this._runAfterChangeDetection.push(runAfter);
    }
    if (untracked(this._changeDetectionNeeded)) {
      return;
    }
    this.ngZone.runOutsideAngular(() => {
      Promise.resolve().then(() => {
        this.ngZone.run(() => {
          this._changeDetectionNeeded.set(true);
        });
      });
    });
  }
  _doChangeDetection() {
    if (this._isDestroyed) {
      return;
    }
    this.ngZone.run(() => {
      this._changeDetectorRef.markForCheck();
      this._contentWrapper.nativeElement.style.transform = this._renderedContentTransform;
      this._renderedContentOffsetSubject.next(this.getOffsetToRenderedContentStart());
      afterNextRender(() => {
        this._changeDetectionNeeded.set(false);
        const runAfterChangeDetection = this._runAfterChangeDetection;
        this._runAfterChangeDetection = [];
        for (const fn of runAfterChangeDetection) {
          fn();
        }
      }, {
        injector: this._injector
      });
    });
  }
  _calculateSpacerSize() {
    this._totalContentHeight.set(this.orientation === "horizontal" ? "" : `${this._totalContentSize}px`);
    this._totalContentWidth.set(this.orientation === "horizontal" ? `${this._totalContentSize}px` : "");
  }
  static ɵfac = function CdkVirtualScrollViewport_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollViewport)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _CdkVirtualScrollViewport,
    selectors: [["cdk-virtual-scroll-viewport"]],
    viewQuery: function CdkVirtualScrollViewport_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._contentWrapper = _t.first);
      }
    },
    hostAttrs: [1, "cdk-virtual-scroll-viewport"],
    hostVars: 4,
    hostBindings: function CdkVirtualScrollViewport_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("cdk-virtual-scroll-orientation-horizontal", ctx.orientation === "horizontal")("cdk-virtual-scroll-orientation-vertical", ctx.orientation !== "horizontal");
      }
    },
    inputs: {
      orientation: "orientation",
      appendOnly: [2, "appendOnly", "appendOnly", booleanAttribute]
    },
    outputs: {
      scrolledIndexChange: "scrolledIndexChange"
    },
    features: [ɵɵProvidersFeature([{
      provide: CdkScrollable,
      useFactory: () => inject(VIRTUAL_SCROLLABLE, {
        optional: true
      }) || inject(_CdkVirtualScrollViewport)
    }, {
      provide: CDK_VIRTUAL_SCROLL_VIEWPORT,
      useExisting: _CdkVirtualScrollViewport
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c1,
    decls: 4,
    vars: 4,
    consts: [["contentWrapper", ""], [1, "cdk-virtual-scroll-content-wrapper"], [1, "cdk-virtual-scroll-spacer"]],
    template: function CdkVirtualScrollViewport_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵdomElementStart(0, "div", 1, 0);
        ɵɵprojection(2);
        ɵɵdomElementEnd();
        ɵɵdomElement(3, "div", 2);
      }
      if (rf & 2) {
        ɵɵadvance(3);
        ɵɵstyleProp("width", ctx._totalContentWidth())("height", ctx._totalContentHeight());
      }
    },
    styles: ["cdk-virtual-scroll-viewport {\n  display: block;\n  position: relative;\n  transform: translateZ(0);\n}\n\n.cdk-virtual-scrollable {\n  overflow: auto;\n  will-change: scroll-position;\n  contain: strict;\n}\n\n.cdk-virtual-scroll-content-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  contain: content;\n}\n[dir=rtl] .cdk-virtual-scroll-content-wrapper {\n  right: 0;\n  left: auto;\n}\n\n.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n  min-height: 100%;\n}\n.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {\n  padding-left: 0;\n  padding-right: 0;\n  margin-left: 0;\n  margin-right: 0;\n  border-left-width: 0;\n  border-right-width: 0;\n  outline: none;\n}\n\n.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper {\n  min-width: 100%;\n}\n.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {\n  padding-top: 0;\n  padding-bottom: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  border-top-width: 0;\n  border-bottom-width: 0;\n  outline: none;\n}\n\n.cdk-virtual-scroll-spacer {\n  height: 1px;\n  transform-origin: 0 0;\n  flex: 0 0 auto;\n}\n[dir=rtl] .cdk-virtual-scroll-spacer {\n  transform-origin: 100% 0;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollViewport, [{
    type: Component,
    args: [{
      selector: "cdk-virtual-scroll-viewport",
      host: {
        "class": "cdk-virtual-scroll-viewport",
        "[class.cdk-virtual-scroll-orientation-horizontal]": 'orientation === "horizontal"',
        "[class.cdk-virtual-scroll-orientation-vertical]": 'orientation !== "horizontal"'
      },
      encapsulation: ViewEncapsulation.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: CdkScrollable,
        useFactory: () => inject(VIRTUAL_SCROLLABLE, {
          optional: true
        }) || inject(CdkVirtualScrollViewport)
      }, {
        provide: CDK_VIRTUAL_SCROLL_VIEWPORT,
        useExisting: CdkVirtualScrollViewport
      }],
      template: '<!--\n  Wrap the rendered content in an element that will be used to offset it based on the scroll\n  position.\n-->\n<div #contentWrapper class="cdk-virtual-scroll-content-wrapper">\n  <ng-content></ng-content>\n</div>\n<!--\n  Spacer used to force the scrolling container to the correct size for the *total* number of items\n  so that the scrollbar captures the size of the entire data set.\n-->\n<div class="cdk-virtual-scroll-spacer"\n     [style.width]="_totalContentWidth()" [style.height]="_totalContentHeight()"></div>\n',
      styles: ["cdk-virtual-scroll-viewport {\n  display: block;\n  position: relative;\n  transform: translateZ(0);\n}\n\n.cdk-virtual-scrollable {\n  overflow: auto;\n  will-change: scroll-position;\n  contain: strict;\n}\n\n.cdk-virtual-scroll-content-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  contain: content;\n}\n[dir=rtl] .cdk-virtual-scroll-content-wrapper {\n  right: 0;\n  left: auto;\n}\n\n.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper {\n  min-height: 100%;\n}\n.cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-horizontal .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {\n  padding-left: 0;\n  padding-right: 0;\n  margin-left: 0;\n  margin-right: 0;\n  border-left-width: 0;\n  border-right-width: 0;\n  outline: none;\n}\n\n.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper {\n  min-width: 100%;\n}\n.cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > dl:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ol:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > table:not([cdkVirtualFor]), .cdk-virtual-scroll-orientation-vertical .cdk-virtual-scroll-content-wrapper > ul:not([cdkVirtualFor]) {\n  padding-top: 0;\n  padding-bottom: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n  border-top-width: 0;\n  border-bottom-width: 0;\n  outline: none;\n}\n\n.cdk-virtual-scroll-spacer {\n  height: 1px;\n  transform-origin: 0 0;\n  flex: 0 0 auto;\n}\n[dir=rtl] .cdk-virtual-scroll-spacer {\n  transform-origin: 100% 0;\n}\n"]
    }]
  }], () => [], {
    orientation: [{
      type: Input
    }],
    appendOnly: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    scrolledIndexChange: [{
      type: Output
    }],
    _contentWrapper: [{
      type: ViewChild,
      args: ["contentWrapper", {
        static: true
      }]
    }]
  });
})();
function getOffset(orientation, direction, node) {
  const el = node;
  if (!el.getBoundingClientRect) {
    return 0;
  }
  const rect = el.getBoundingClientRect();
  if (orientation === "horizontal") {
    return direction === "start" ? rect.left : rect.right;
  }
  return direction === "start" ? rect.top : rect.bottom;
}
var CdkVirtualForOf = class _CdkVirtualForOf {
  _viewContainerRef = inject(ViewContainerRef);
  _template = inject(TemplateRef);
  _differs = inject(IterableDiffers);
  _viewRepeater = new _RecycleViewRepeaterStrategy();
  _viewport = inject(CDK_VIRTUAL_SCROLL_VIEWPORT, {
    skipSelf: true
  });
  viewChange = new Subject();
  _dataSourceChanges = new Subject();
  get cdkVirtualForOf() {
    return this._cdkVirtualForOf;
  }
  set cdkVirtualForOf(value) {
    this._cdkVirtualForOf = value;
    if (isDataSource(value)) {
      this._dataSourceChanges.next(value);
    } else {
      this._dataSourceChanges.next(new ArrayDataSource(isObservable(value) ? value : Array.from(value || [])));
    }
  }
  _cdkVirtualForOf;
  get cdkVirtualForTrackBy() {
    return this._cdkVirtualForTrackBy;
  }
  set cdkVirtualForTrackBy(fn) {
    this._needsUpdate = true;
    this._cdkVirtualForTrackBy = fn ? (index, item) => fn(index + (this._renderedRange ? this._renderedRange.start : 0), item) : void 0;
  }
  _cdkVirtualForTrackBy;
  set cdkVirtualForTemplate(value) {
    if (value) {
      this._needsUpdate = true;
      this._template = value;
    }
  }
  get cdkVirtualForTemplateCacheSize() {
    return this._viewRepeater.viewCacheSize;
  }
  set cdkVirtualForTemplateCacheSize(size) {
    this._viewRepeater.viewCacheSize = coerceNumberProperty(size);
  }
  dataStream = this._dataSourceChanges.pipe(startWith(null), pairwise(), switchMap(([prev, cur]) => this._changeDataSource(prev, cur)), shareReplay(1));
  _differ = null;
  _data = [];
  _renderedItems = [];
  _renderedRange = {
    start: 0,
    end: 0
  };
  _needsUpdate = false;
  _destroyed = new Subject();
  constructor() {
    const ngZone = inject(NgZone);
    this.dataStream.subscribe((data) => {
      this._data = data;
      this._onRenderedDataChange();
    });
    this._viewport.renderedRangeStream.pipe(takeUntil(this._destroyed)).subscribe((range) => {
      this._renderedRange = range;
      if (this.viewChange.observers.length) {
        ngZone.run(() => this.viewChange.next(this._renderedRange));
      }
      this._onRenderedDataChange();
    });
    this._viewport.attach(this);
  }
  measureRangeSize(range, orientation) {
    if (range.start >= range.end) {
      return 0;
    }
    if ((range.start < this._renderedRange.start || range.end > this._renderedRange.end) && (typeof ngDevMode === "undefined" || ngDevMode)) {
      throw Error(`Error: attempted to measure an item that isn't rendered.`);
    }
    const renderedStartIndex = range.start - this._renderedRange.start;
    const rangeLen = range.end - range.start;
    let firstNode;
    let lastNode;
    for (let i = 0; i < rangeLen; i++) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        firstNode = lastNode = view.rootNodes[0];
        break;
      }
    }
    for (let i = rangeLen - 1; i > -1; i--) {
      const view = this._viewContainerRef.get(i + renderedStartIndex);
      if (view && view.rootNodes.length) {
        lastNode = view.rootNodes[view.rootNodes.length - 1];
        break;
      }
    }
    return firstNode && lastNode ? getOffset(orientation, "end", lastNode) - getOffset(orientation, "start", firstNode) : 0;
  }
  ngDoCheck() {
    if (this._differ && this._needsUpdate) {
      const changes = this._differ.diff(this._renderedItems);
      if (!changes) {
        this._updateContext();
      } else {
        this._applyChanges(changes);
      }
      this._needsUpdate = false;
    }
  }
  ngOnDestroy() {
    this._viewport.detach();
    this._dataSourceChanges.next(void 0);
    this._dataSourceChanges.complete();
    this.viewChange.complete();
    this._destroyed.next();
    this._destroyed.complete();
    this._viewRepeater.detach();
  }
  _onRenderedDataChange() {
    if (!this._renderedRange) {
      return;
    }
    this._renderedItems = this._data.slice(this._renderedRange.start, this._renderedRange.end);
    if (!this._differ) {
      this._differ = this._differs.find(this._renderedItems).create((index, item) => {
        return this.cdkVirtualForTrackBy ? this.cdkVirtualForTrackBy(index, item) : item;
      });
    }
    this._needsUpdate = true;
  }
  _changeDataSource(oldDs, newDs) {
    if (oldDs) {
      oldDs.disconnect(this);
    }
    this._needsUpdate = true;
    return newDs ? newDs.connect(this) : of();
  }
  _updateContext() {
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
      view.detectChanges();
    }
  }
  _applyChanges(changes) {
    this._viewRepeater.applyChanges(changes, this._viewContainerRef, (record, _adjustedPreviousIndex, currentIndex) => this._getEmbeddedViewArgs(record, currentIndex), (record) => record.item);
    changes.forEachIdentityChange((record) => {
      const view = this._viewContainerRef.get(record.currentIndex);
      view.context.$implicit = record.item;
    });
    const count = this._data.length;
    let i = this._viewContainerRef.length;
    while (i--) {
      const view = this._viewContainerRef.get(i);
      view.context.index = this._renderedRange.start + i;
      view.context.count = count;
      this._updateComputedContextProperties(view.context);
    }
  }
  _updateComputedContextProperties(context) {
    context.first = context.index === 0;
    context.last = context.index === context.count - 1;
    context.even = context.index % 2 === 0;
    context.odd = !context.even;
  }
  _getEmbeddedViewArgs(record, index) {
    return {
      templateRef: this._template,
      context: {
        $implicit: record.item,
        cdkVirtualForOf: this._cdkVirtualForOf,
        index: -1,
        count: -1,
        first: false,
        last: false,
        odd: false,
        even: false
      },
      index
    };
  }
  static ngTemplateContextGuard(directive, context) {
    return true;
  }
  static ɵfac = function CdkVirtualForOf_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualForOf)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkVirtualForOf,
    selectors: [["", "cdkVirtualFor", "", "cdkVirtualForOf", ""]],
    inputs: {
      cdkVirtualForOf: "cdkVirtualForOf",
      cdkVirtualForTrackBy: "cdkVirtualForTrackBy",
      cdkVirtualForTemplate: "cdkVirtualForTemplate",
      cdkVirtualForTemplateCacheSize: "cdkVirtualForTemplateCacheSize"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualForOf, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualFor][cdkVirtualForOf]"
    }]
  }], () => [], {
    cdkVirtualForOf: [{
      type: Input
    }],
    cdkVirtualForTrackBy: [{
      type: Input
    }],
    cdkVirtualForTemplate: [{
      type: Input
    }],
    cdkVirtualForTemplateCacheSize: [{
      type: Input
    }]
  });
})();
var CdkVirtualScrollableElement = class _CdkVirtualScrollableElement extends CdkVirtualScrollable {
  constructor() {
    super();
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from] - this.measureScrollOffset(from);
  }
  static ɵfac = function CdkVirtualScrollableElement_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollableElement)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkVirtualScrollableElement,
    selectors: [["", "cdkVirtualScrollingElement", ""]],
    hostAttrs: [1, "cdk-virtual-scrollable"],
    features: [ɵɵProvidersFeature([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _CdkVirtualScrollableElement
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableElement, [{
    type: Directive,
    args: [{
      selector: "[cdkVirtualScrollingElement]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableElement
      }],
      host: {
        "class": "cdk-virtual-scrollable"
      }
    }]
  }], () => [], null);
})();
var CdkVirtualScrollableWindow = class _CdkVirtualScrollableWindow extends CdkVirtualScrollable {
  constructor() {
    super();
    const document = inject(DOCUMENT);
    this.elementRef = new ElementRef(document.documentElement);
    this._scrollElement = document;
  }
  measureBoundingClientRectWithScrollOffset(from) {
    return this.getElementRef().nativeElement.getBoundingClientRect()[from];
  }
  static ɵfac = function CdkVirtualScrollableWindow_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkVirtualScrollableWindow)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkVirtualScrollableWindow,
    selectors: [["cdk-virtual-scroll-viewport", "scrollWindow", ""]],
    features: [ɵɵProvidersFeature([{
      provide: VIRTUAL_SCROLLABLE,
      useExisting: _CdkVirtualScrollableWindow
    }]), ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkVirtualScrollableWindow, [{
    type: Directive,
    args: [{
      selector: "cdk-virtual-scroll-viewport[scrollWindow]",
      providers: [{
        provide: VIRTUAL_SCROLLABLE,
        useExisting: CdkVirtualScrollableWindow
      }]
    }]
  }], () => [], null);
})();
var CdkScrollableModule = class _CdkScrollableModule {
  static ɵfac = function CdkScrollableModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkScrollableModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _CdkScrollableModule,
    imports: [CdkScrollable],
    exports: [CdkScrollable]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkScrollableModule, [{
    type: NgModule,
    args: [{
      exports: [CdkScrollable],
      imports: [CdkScrollable]
    }]
  }], null, null);
})();
var ScrollingModule = class _ScrollingModule {
  static ɵfac = function ScrollingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollingModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ScrollingModule,
    imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
    exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [BidiModule, CdkScrollableModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollingModule, [{
    type: NgModule,
    args: [{
      imports: [BidiModule, CdkScrollableModule, CdkVirtualScrollViewport, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollableWindow, CdkVirtualScrollableElement],
      exports: [BidiModule, CdkScrollableModule, CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport, CdkVirtualScrollableWindow, CdkVirtualScrollableElement]
    }]
  }], null, null);
})();

// node_modules/@angular/material/fesm2022/sidenav.mjs
var _c02 = ["*"];
var _c12 = ["content"];
var _c2 = [[["mat-drawer"]], [["mat-drawer-content"]], "*"];
var _c3 = ["mat-drawer", "mat-drawer-content", "*"];
function MatDrawerContainer_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵlistener("click", function MatDrawerContainer_Conditional_0_Template_div_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onBackdropClicked());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassProp("mat-drawer-shown", ctx_r1._isShowingBackdrop());
  }
}
function MatDrawerContainer_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-drawer-content");
    ɵɵprojection(1, 2);
    ɵɵelementEnd();
  }
}
var _c4 = [[["mat-sidenav"]], [["mat-sidenav-content"]], "*"];
var _c5 = ["mat-sidenav", "mat-sidenav-content", "*"];
function MatSidenavContainer_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div", 1);
    ɵɵlistener("click", function MatSidenavContainer_Conditional_0_Template_div_click_0_listener() {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1._onBackdropClicked());
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassProp("mat-drawer-shown", ctx_r1._isShowingBackdrop());
  }
}
function MatSidenavContainer_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "mat-sidenav-content");
    ɵɵprojection(1, 2);
    ɵɵelementEnd();
  }
}
var _c6 = ".mat-drawer-container {\n  position: relative;\n  z-index: 1;\n  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));\n  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));\n  box-sizing: border-box;\n  display: block;\n  overflow: hidden;\n}\n.mat-drawer-container[fullscreen] {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-drawer-container[fullscreen].mat-drawer-container-has-open {\n  overflow: hidden;\n}\n.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {\n  z-index: 3;\n}\n.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,\n.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,\n.ng-animate-disabled .mat-drawer-container .mat-drawer-content {\n  transition: none;\n}\n\n.mat-drawer-backdrop {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  display: block;\n  z-index: 3;\n  visibility: hidden;\n}\n.mat-drawer-backdrop.mat-drawer-shown {\n  visibility: visible;\n  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));\n}\n.mat-drawer-transition .mat-drawer-backdrop {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: background-color, visibility;\n}\n@media (forced-colors: active) {\n  .mat-drawer-backdrop {\n    opacity: 0.5;\n  }\n}\n\n.mat-drawer-content {\n  position: relative;\n  z-index: 1;\n  display: block;\n  height: 100%;\n  overflow: auto;\n}\n.mat-drawer-content.mat-drawer-content-hidden {\n  opacity: 0;\n}\n.mat-drawer-transition .mat-drawer-content {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: transform, margin-left, margin-right;\n}\n\n.mat-drawer {\n  position: relative;\n  z-index: 4;\n  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));\n  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);\n  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  width: var(--mat-sidenav-container-width, 360px);\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 3;\n  outline: 0;\n  box-sizing: border-box;\n  overflow-y: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n@media (forced-colors: active) {\n  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {\n    border-right: solid 1px currentColor;\n  }\n}\n@media (forced-colors: active) {\n  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {\n    border-left: solid 1px currentColor;\n    border-right: none;\n  }\n}\n.mat-drawer.mat-drawer-side {\n  z-index: 2;\n}\n.mat-drawer.mat-drawer-end {\n  right: 0;\n  transform: translate3d(100%, 0, 0);\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .mat-drawer {\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  transform: translate3d(100%, 0, 0);\n}\n[dir=rtl] .mat-drawer.mat-drawer-end {\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  left: 0;\n  right: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n.mat-drawer-transition .mat-drawer {\n  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {\n  visibility: hidden;\n  box-shadow: none;\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {\n  display: none;\n}\n.mat-drawer.mat-drawer-opened.mat-drawer-opened {\n  transform: none;\n}\n\n.mat-drawer-side {\n  box-shadow: none;\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n}\n.mat-drawer-side.mat-drawer-end {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side.mat-drawer-end {\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n  border-left: none;\n}\n\n.mat-drawer-inner-container {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n}\n\n.mat-sidenav-fixed {\n  position: fixed;\n}\n";
function throwMatDuplicatedDrawerError(position) {
  throw Error(`A drawer was already declared for 'position="${position}"'`);
}
var MAT_DRAWER_DEFAULT_AUTOSIZE = new InjectionToken("MAT_DRAWER_DEFAULT_AUTOSIZE", {
  providedIn: "root",
  factory: () => false
});
var MAT_DRAWER_CONTAINER = new InjectionToken("MAT_DRAWER_CONTAINER");
var MatDrawerContent = class _MatDrawerContent extends CdkScrollable {
  _platform = inject(Platform);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _container = inject(MatDrawerContainer);
  constructor() {
    const elementRef = inject(ElementRef);
    const scrollDispatcher = inject(ScrollDispatcher);
    const ngZone = inject(NgZone);
    super(elementRef, scrollDispatcher, ngZone);
  }
  ngAfterContentInit() {
    this._container._contentMarginChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }
  _shouldBeHidden() {
    if (this._platform.isBrowser) {
      return false;
    }
    const {
      start,
      end
    } = this._container;
    return start != null && start.mode !== "over" && start.opened || end != null && end.mode !== "over" && end.opened;
  }
  static ɵfac = function MatDrawerContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDrawerContent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatDrawerContent,
    selectors: [["mat-drawer-content"]],
    hostAttrs: [1, "mat-drawer-content"],
    hostVars: 6,
    hostBindings: function MatDrawerContent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("margin-left", ctx._container._contentMargins.left, "px")("margin-right", ctx._container._contentMargins.right, "px");
        ɵɵclassProp("mat-drawer-content-hidden", ctx._shouldBeHidden());
      }
    },
    features: [ɵɵProvidersFeature([{
      provide: CdkScrollable,
      useExisting: _MatDrawerContent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c02,
    decls: 1,
    vars: 0,
    template: function MatDrawerContent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDrawerContent, [{
    type: Component,
    args: [{
      selector: "mat-drawer-content",
      template: "<ng-content></ng-content>",
      host: {
        "class": "mat-drawer-content",
        "[style.margin-left.px]": "_container._contentMargins.left",
        "[style.margin-right.px]": "_container._contentMargins.right",
        "[class.mat-drawer-content-hidden]": "_shouldBeHidden()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: CdkScrollable,
        useExisting: MatDrawerContent
      }]
    }]
  }], () => [], null);
})();
var MatDrawer = class _MatDrawer {
  _elementRef = inject(ElementRef);
  _focusTrapFactory = inject(FocusTrapFactory);
  _focusMonitor = inject(FocusMonitor);
  _platform = inject(Platform);
  _ngZone = inject(NgZone);
  _renderer = inject(Renderer2);
  _interactivityChecker = inject(InteractivityChecker);
  _doc = inject(DOCUMENT);
  _container = inject(MAT_DRAWER_CONTAINER, {
    optional: true
  });
  _focusTrap = null;
  _elementFocusedBeforeDrawerWasOpened = null;
  _eventCleanups;
  _isAttached = false;
  _anchor = null;
  get position() {
    return this._position;
  }
  set position(value) {
    value = value === "end" ? "end" : "start";
    if (value !== this._position) {
      if (this._isAttached) {
        this._updatePositionInParent(value);
      }
      this._position = value;
      this.onPositionChanged.emit();
    }
  }
  _position = "start";
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    this._updateFocusTrapState();
    this._modeChanged.next();
  }
  _mode = "over";
  get disableClose() {
    return this._disableClose;
  }
  set disableClose(value) {
    this._disableClose = coerceBooleanProperty(value);
  }
  _disableClose = false;
  get autoFocus() {
    const value = this._autoFocus;
    if (value == null) {
      if (this.mode === "side") {
        return "dialog";
      } else {
        return "first-tabbable";
      }
    }
    return value;
  }
  set autoFocus(value) {
    if (value === "true" || value === "false" || value == null) {
      value = coerceBooleanProperty(value);
    }
    this._autoFocus = value;
  }
  _autoFocus;
  get opened() {
    return this._opened();
  }
  set opened(value) {
    this.toggle(coerceBooleanProperty(value));
  }
  _opened = signal(false, ...ngDevMode ? [{
    debugName: "_opened"
  }] : []);
  _openedVia = null;
  _animationStarted = new Subject();
  _animationEnd = new Subject();
  openedChange = new EventEmitter(true);
  _openedStream = this.openedChange.pipe(filter((o) => o), map(() => {
  }));
  openedStart = this._animationStarted.pipe(filter(() => this.opened), mapTo(void 0));
  _closedStream = this.openedChange.pipe(filter((o) => !o), map(() => {
  }));
  closedStart = this._animationStarted.pipe(filter(() => !this.opened), mapTo(void 0));
  _destroyed = new Subject();
  onPositionChanged = new EventEmitter();
  _content;
  _modeChanged = new Subject();
  _injector = inject(Injector);
  _changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    this.openedChange.pipe(takeUntil(this._destroyed)).subscribe((opened) => {
      if (opened) {
        this._elementFocusedBeforeDrawerWasOpened = this._doc.activeElement;
        this._takeFocus();
      } else if (this._isFocusWithinDrawer()) {
        this._restoreFocus(this._openedVia || "program");
      }
    });
    this._eventCleanups = this._ngZone.runOutsideAngular(() => {
      const renderer = this._renderer;
      const element = this._elementRef.nativeElement;
      return [renderer.listen(element, "keydown", (event) => {
        if (event.keyCode === ESCAPE && !this.disableClose && !hasModifierKey(event)) {
          this._ngZone.run(() => {
            this.close();
            event.stopPropagation();
            event.preventDefault();
          });
        }
      }), renderer.listen(element, "transitionend", this._handleTransitionEvent), renderer.listen(element, "transitioncancel", this._handleTransitionEvent)];
    });
    this._animationEnd.subscribe(() => {
      this.openedChange.emit(this.opened);
    });
  }
  _forceFocus(element, options) {
    if (!this._interactivityChecker.isFocusable(element)) {
      element.tabIndex = -1;
      this._ngZone.runOutsideAngular(() => {
        const callback = () => {
          cleanupBlur();
          cleanupMousedown();
          element.removeAttribute("tabindex");
        };
        const cleanupBlur = this._renderer.listen(element, "blur", callback);
        const cleanupMousedown = this._renderer.listen(element, "mousedown", callback);
      });
    }
    element.focus(options);
  }
  _focusByCssSelector(selector, options) {
    let elementToFocus = this._elementRef.nativeElement.querySelector(selector);
    if (elementToFocus) {
      this._forceFocus(elementToFocus, options);
    }
  }
  _takeFocus() {
    if (!this._focusTrap) {
      return;
    }
    const element = this._elementRef.nativeElement;
    switch (this.autoFocus) {
      case false:
      case "dialog":
        return;
      case true:
      case "first-tabbable":
        afterNextRender(() => {
          const hasMovedFocus = this._focusTrap.focusInitialElement();
          if (!hasMovedFocus && typeof element.focus === "function") {
            element.focus();
          }
        }, {
          injector: this._injector
        });
        break;
      case "first-heading":
        this._focusByCssSelector('h1, h2, h3, h4, h5, h6, [role="heading"]');
        break;
      default:
        this._focusByCssSelector(this.autoFocus);
        break;
    }
  }
  _restoreFocus(focusOrigin) {
    if (this.autoFocus === "dialog") {
      return;
    }
    if (this._elementFocusedBeforeDrawerWasOpened) {
      this._focusMonitor.focusVia(this._elementFocusedBeforeDrawerWasOpened, focusOrigin);
    } else {
      this._elementRef.nativeElement.blur();
    }
    this._elementFocusedBeforeDrawerWasOpened = null;
  }
  _isFocusWithinDrawer() {
    const activeEl = this._doc.activeElement;
    return !!activeEl && this._elementRef.nativeElement.contains(activeEl);
  }
  ngAfterViewInit() {
    this._isAttached = true;
    if (this._position === "end") {
      this._updatePositionInParent("end");
    }
    if (this._platform.isBrowser) {
      this._focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement);
      this._updateFocusTrapState();
    }
  }
  ngOnDestroy() {
    this._eventCleanups.forEach((cleanup) => cleanup());
    this._focusTrap?.destroy();
    this._anchor?.remove();
    this._anchor = null;
    this._animationStarted.complete();
    this._animationEnd.complete();
    this._modeChanged.complete();
    this._destroyed.next();
    this._destroyed.complete();
  }
  open(openedVia) {
    return this.toggle(true, openedVia);
  }
  close() {
    return this.toggle(false);
  }
  _closeViaBackdropClick() {
    return this._setOpen(false, true, "mouse");
  }
  toggle(isOpen = !this.opened, openedVia) {
    if (isOpen && openedVia) {
      this._openedVia = openedVia;
    }
    const result = this._setOpen(isOpen, !isOpen && this._isFocusWithinDrawer(), this._openedVia || "program");
    if (!isOpen) {
      this._openedVia = null;
    }
    return result;
  }
  _setOpen(isOpen, restoreFocus, focusOrigin) {
    if (isOpen === this.opened) {
      return Promise.resolve(isOpen ? "open" : "close");
    }
    this._opened.set(isOpen);
    if (this._container?._transitionsEnabled) {
      this._setIsAnimating(true);
      setTimeout(() => this._animationStarted.next());
    } else {
      setTimeout(() => {
        this._animationStarted.next();
        this._animationEnd.next();
      });
    }
    this._elementRef.nativeElement.classList.toggle("mat-drawer-opened", isOpen);
    if (!isOpen && restoreFocus) {
      this._restoreFocus(focusOrigin);
    }
    this._changeDetectorRef.markForCheck();
    this._updateFocusTrapState();
    return new Promise((resolve) => {
      this.openedChange.pipe(take(1)).subscribe((open) => resolve(open ? "open" : "close"));
    });
  }
  _setIsAnimating(isAnimating) {
    this._elementRef.nativeElement.classList.toggle("mat-drawer-animating", isAnimating);
  }
  _getWidth() {
    return this._elementRef.nativeElement.offsetWidth || 0;
  }
  _updateFocusTrapState() {
    if (this._focusTrap) {
      this._focusTrap.enabled = this.opened && !!this._container?._isShowingBackdrop();
    }
  }
  _updatePositionInParent(newPosition) {
    if (!this._platform.isBrowser) {
      return;
    }
    const element = this._elementRef.nativeElement;
    const parent = element.parentNode;
    if (newPosition === "end") {
      if (!this._anchor) {
        this._anchor = this._doc.createComment("mat-drawer-anchor");
        parent.insertBefore(this._anchor, element);
      }
      parent.appendChild(element);
    } else if (this._anchor) {
      this._anchor.parentNode.insertBefore(element, this._anchor);
    }
  }
  _handleTransitionEvent = (event) => {
    const element = this._elementRef.nativeElement;
    if (event.target === element) {
      this._ngZone.run(() => {
        if (event.type === "transitionend") {
          this._setIsAnimating(false);
        }
        this._animationEnd.next(event);
      });
    }
  };
  static ɵfac = function MatDrawer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDrawer)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatDrawer,
    selectors: [["mat-drawer"]],
    viewQuery: function MatDrawer_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c12, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._content = _t.first);
      }
    },
    hostAttrs: [1, "mat-drawer"],
    hostVars: 12,
    hostBindings: function MatDrawer_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("align", null)("tabIndex", ctx.mode !== "side" ? "-1" : null);
        ɵɵstyleProp("visibility", !ctx._container && !ctx.opened ? "hidden" : null);
        ɵɵclassProp("mat-drawer-end", ctx.position === "end")("mat-drawer-over", ctx.mode === "over")("mat-drawer-push", ctx.mode === "push")("mat-drawer-side", ctx.mode === "side");
      }
    },
    inputs: {
      position: "position",
      mode: "mode",
      disableClose: "disableClose",
      autoFocus: "autoFocus",
      opened: "opened"
    },
    outputs: {
      openedChange: "openedChange",
      _openedStream: "opened",
      openedStart: "openedStart",
      _closedStream: "closed",
      closedStart: "closedStart",
      onPositionChanged: "positionChanged"
    },
    exportAs: ["matDrawer"],
    ngContentSelectors: _c02,
    decls: 3,
    vars: 0,
    consts: [["content", ""], ["cdkScrollable", "", 1, "mat-drawer-inner-container"]],
    template: function MatDrawer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 1, 0);
        ɵɵprojection(2);
        ɵɵelementEnd();
      }
    },
    dependencies: [CdkScrollable],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDrawer, [{
    type: Component,
    args: [{
      selector: "mat-drawer",
      exportAs: "matDrawer",
      host: {
        "class": "mat-drawer",
        "[attr.align]": "null",
        "[class.mat-drawer-end]": 'position === "end"',
        "[class.mat-drawer-over]": 'mode === "over"',
        "[class.mat-drawer-push]": 'mode === "push"',
        "[class.mat-drawer-side]": 'mode === "side"',
        "[style.visibility]": '(!_container && !opened) ? "hidden" : null',
        "[attr.tabIndex]": '(mode !== "side") ? "-1" : null'
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [CdkScrollable],
      template: '<div class="mat-drawer-inner-container" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n'
    }]
  }], () => [], {
    position: [{
      type: Input
    }],
    mode: [{
      type: Input
    }],
    disableClose: [{
      type: Input
    }],
    autoFocus: [{
      type: Input
    }],
    opened: [{
      type: Input
    }],
    openedChange: [{
      type: Output
    }],
    _openedStream: [{
      type: Output,
      args: ["opened"]
    }],
    openedStart: [{
      type: Output
    }],
    _closedStream: [{
      type: Output,
      args: ["closed"]
    }],
    closedStart: [{
      type: Output
    }],
    onPositionChanged: [{
      type: Output,
      args: ["positionChanged"]
    }],
    _content: [{
      type: ViewChild,
      args: ["content"]
    }]
  });
})();
var MatDrawerContainer = class _MatDrawerContainer {
  _dir = inject(Directionality, {
    optional: true
  });
  _element = inject(ElementRef);
  _ngZone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _animationDisabled = _animationsDisabled();
  _transitionsEnabled = false;
  _allDrawers;
  _drawers = new QueryList();
  _content;
  _userContent;
  get start() {
    return this._start;
  }
  get end() {
    return this._end;
  }
  get autosize() {
    return this._autosize;
  }
  set autosize(value) {
    this._autosize = coerceBooleanProperty(value);
  }
  _autosize = inject(MAT_DRAWER_DEFAULT_AUTOSIZE);
  get hasBackdrop() {
    return this._drawerHasBackdrop(this._start) || this._drawerHasBackdrop(this._end);
  }
  set hasBackdrop(value) {
    this._backdropOverride = value == null ? null : coerceBooleanProperty(value);
  }
  _backdropOverride = null;
  backdropClick = new EventEmitter();
  _start = null;
  _end = null;
  _left = null;
  _right = null;
  _destroyed = new Subject();
  _doCheckSubject = new Subject();
  _contentMargins = {
    left: null,
    right: null
  };
  _contentMarginChanges = new Subject();
  get scrollable() {
    return this._userContent || this._content;
  }
  _injector = inject(Injector);
  constructor() {
    const platform = inject(Platform);
    const viewportRuler = inject(ViewportRuler);
    this._dir?.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._validateDrawers();
      this.updateContentMargins();
    });
    viewportRuler.change().pipe(takeUntil(this._destroyed)).subscribe(() => this.updateContentMargins());
    if (!this._animationDisabled && platform.isBrowser) {
      this._ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          this._element.nativeElement.classList.add("mat-drawer-transition");
          this._transitionsEnabled = true;
        }, 200);
      });
    }
  }
  ngAfterContentInit() {
    this._allDrawers.changes.pipe(startWith(this._allDrawers), takeUntil(this._destroyed)).subscribe((drawer) => {
      this._drawers.reset(drawer.filter((item) => !item._container || item._container === this));
      this._drawers.notifyOnChanges();
    });
    this._drawers.changes.pipe(startWith(null)).subscribe(() => {
      this._validateDrawers();
      this._drawers.forEach((drawer) => {
        this._watchDrawerToggle(drawer);
        this._watchDrawerPosition(drawer);
        this._watchDrawerMode(drawer);
      });
      if (!this._drawers.length || this._isDrawerOpen(this._start) || this._isDrawerOpen(this._end)) {
        this.updateContentMargins();
      }
      this._changeDetectorRef.markForCheck();
    });
    this._ngZone.runOutsideAngular(() => {
      this._doCheckSubject.pipe(debounceTime(10), takeUntil(this._destroyed)).subscribe(() => this.updateContentMargins());
    });
  }
  ngOnDestroy() {
    this._contentMarginChanges.complete();
    this._doCheckSubject.complete();
    this._drawers.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  open() {
    this._drawers.forEach((drawer) => drawer.open());
  }
  close() {
    this._drawers.forEach((drawer) => drawer.close());
  }
  updateContentMargins() {
    let left = 0;
    let right = 0;
    if (this._left && this._left.opened) {
      if (this._left.mode == "side") {
        left += this._left._getWidth();
      } else if (this._left.mode == "push") {
        const width = this._left._getWidth();
        left += width;
        right -= width;
      }
    }
    if (this._right && this._right.opened) {
      if (this._right.mode == "side") {
        right += this._right._getWidth();
      } else if (this._right.mode == "push") {
        const width = this._right._getWidth();
        right += width;
        left -= width;
      }
    }
    left = left || null;
    right = right || null;
    if (left !== this._contentMargins.left || right !== this._contentMargins.right) {
      this._contentMargins = {
        left,
        right
      };
      this._ngZone.run(() => this._contentMarginChanges.next(this._contentMargins));
    }
  }
  ngDoCheck() {
    if (this._autosize && this._isPushed()) {
      this._ngZone.runOutsideAngular(() => this._doCheckSubject.next());
    }
  }
  _watchDrawerToggle(drawer) {
    drawer._animationStarted.pipe(takeUntil(this._drawers.changes)).subscribe(() => {
      this.updateContentMargins();
      this._changeDetectorRef.markForCheck();
    });
    if (drawer.mode !== "side") {
      drawer.openedChange.pipe(takeUntil(this._drawers.changes)).subscribe(() => this._setContainerClass(drawer.opened));
    }
  }
  _watchDrawerPosition(drawer) {
    drawer.onPositionChanged.pipe(takeUntil(this._drawers.changes)).subscribe(() => {
      afterNextRender({
        read: () => this._validateDrawers()
      }, {
        injector: this._injector
      });
    });
  }
  _watchDrawerMode(drawer) {
    drawer._modeChanged.pipe(takeUntil(merge(this._drawers.changes, this._destroyed))).subscribe(() => {
      this.updateContentMargins();
      this._changeDetectorRef.markForCheck();
    });
  }
  _setContainerClass(isAdd) {
    const classList = this._element.nativeElement.classList;
    const className = "mat-drawer-container-has-open";
    if (isAdd) {
      classList.add(className);
    } else {
      classList.remove(className);
    }
  }
  _validateDrawers() {
    this._start = this._end = null;
    this._drawers.forEach((drawer) => {
      if (drawer.position == "end") {
        if (this._end != null && (typeof ngDevMode === "undefined" || ngDevMode)) {
          throwMatDuplicatedDrawerError("end");
        }
        this._end = drawer;
      } else {
        if (this._start != null && (typeof ngDevMode === "undefined" || ngDevMode)) {
          throwMatDuplicatedDrawerError("start");
        }
        this._start = drawer;
      }
    });
    this._right = this._left = null;
    if (this._dir && this._dir.value === "rtl") {
      this._left = this._end;
      this._right = this._start;
    } else {
      this._left = this._start;
      this._right = this._end;
    }
  }
  _isPushed() {
    return this._isDrawerOpen(this._start) && this._start.mode != "over" || this._isDrawerOpen(this._end) && this._end.mode != "over";
  }
  _onBackdropClicked() {
    this.backdropClick.emit();
    this._closeModalDrawersViaBackdrop();
  }
  _closeModalDrawersViaBackdrop() {
    [this._start, this._end].filter((drawer) => drawer && !drawer.disableClose && this._drawerHasBackdrop(drawer)).forEach((drawer) => drawer._closeViaBackdropClick());
  }
  _isShowingBackdrop() {
    return this._isDrawerOpen(this._start) && this._drawerHasBackdrop(this._start) || this._isDrawerOpen(this._end) && this._drawerHasBackdrop(this._end);
  }
  _isDrawerOpen(drawer) {
    return drawer != null && drawer.opened;
  }
  _drawerHasBackdrop(drawer) {
    if (this._backdropOverride == null) {
      return !!drawer && drawer.mode !== "side";
    }
    return this._backdropOverride;
  }
  static ɵfac = function MatDrawerContainer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatDrawerContainer)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MatDrawerContainer,
    selectors: [["mat-drawer-container"]],
    contentQueries: function MatDrawerContainer_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MatDrawerContent, 5)(dirIndex, MatDrawer, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._content = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._allDrawers = _t);
      }
    },
    viewQuery: function MatDrawerContainer_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(MatDrawerContent, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._userContent = _t.first);
      }
    },
    hostAttrs: [1, "mat-drawer-container"],
    hostVars: 2,
    hostBindings: function MatDrawerContainer_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-drawer-container-explicit-backdrop", ctx._backdropOverride);
      }
    },
    inputs: {
      autosize: "autosize",
      hasBackdrop: "hasBackdrop"
    },
    outputs: {
      backdropClick: "backdropClick"
    },
    exportAs: ["matDrawerContainer"],
    features: [ɵɵProvidersFeature([{
      provide: MAT_DRAWER_CONTAINER,
      useExisting: _MatDrawerContainer
    }])],
    ngContentSelectors: _c3,
    decls: 4,
    vars: 2,
    consts: [[1, "mat-drawer-backdrop", 3, "mat-drawer-shown"], [1, "mat-drawer-backdrop", 3, "click"]],
    template: function MatDrawerContainer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c2);
        ɵɵconditionalCreate(0, MatDrawerContainer_Conditional_0_Template, 1, 2, "div", 0);
        ɵɵprojection(1);
        ɵɵprojection(2, 1);
        ɵɵconditionalCreate(3, MatDrawerContainer_Conditional_3_Template, 2, 0, "mat-drawer-content");
      }
      if (rf & 2) {
        ɵɵconditional(ctx.hasBackdrop ? 0 : -1);
        ɵɵadvance(3);
        ɵɵconditional(!ctx._content ? 3 : -1);
      }
    },
    dependencies: [MatDrawerContent],
    styles: [".mat-drawer-container {\n  position: relative;\n  z-index: 1;\n  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));\n  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));\n  box-sizing: border-box;\n  display: block;\n  overflow: hidden;\n}\n.mat-drawer-container[fullscreen] {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-drawer-container[fullscreen].mat-drawer-container-has-open {\n  overflow: hidden;\n}\n.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {\n  z-index: 3;\n}\n.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,\n.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,\n.ng-animate-disabled .mat-drawer-container .mat-drawer-content {\n  transition: none;\n}\n\n.mat-drawer-backdrop {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  display: block;\n  z-index: 3;\n  visibility: hidden;\n}\n.mat-drawer-backdrop.mat-drawer-shown {\n  visibility: visible;\n  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));\n}\n.mat-drawer-transition .mat-drawer-backdrop {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: background-color, visibility;\n}\n@media (forced-colors: active) {\n  .mat-drawer-backdrop {\n    opacity: 0.5;\n  }\n}\n\n.mat-drawer-content {\n  position: relative;\n  z-index: 1;\n  display: block;\n  height: 100%;\n  overflow: auto;\n}\n.mat-drawer-content.mat-drawer-content-hidden {\n  opacity: 0;\n}\n.mat-drawer-transition .mat-drawer-content {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: transform, margin-left, margin-right;\n}\n\n.mat-drawer {\n  position: relative;\n  z-index: 4;\n  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));\n  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);\n  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  width: var(--mat-sidenav-container-width, 360px);\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 3;\n  outline: 0;\n  box-sizing: border-box;\n  overflow-y: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n@media (forced-colors: active) {\n  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {\n    border-right: solid 1px currentColor;\n  }\n}\n@media (forced-colors: active) {\n  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {\n    border-left: solid 1px currentColor;\n    border-right: none;\n  }\n}\n.mat-drawer.mat-drawer-side {\n  z-index: 2;\n}\n.mat-drawer.mat-drawer-end {\n  right: 0;\n  transform: translate3d(100%, 0, 0);\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .mat-drawer {\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  transform: translate3d(100%, 0, 0);\n}\n[dir=rtl] .mat-drawer.mat-drawer-end {\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  left: 0;\n  right: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n.mat-drawer-transition .mat-drawer {\n  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {\n  visibility: hidden;\n  box-shadow: none;\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {\n  display: none;\n}\n.mat-drawer.mat-drawer-opened.mat-drawer-opened {\n  transform: none;\n}\n\n.mat-drawer-side {\n  box-shadow: none;\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n}\n.mat-drawer-side.mat-drawer-end {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side.mat-drawer-end {\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n  border-left: none;\n}\n\n.mat-drawer-inner-container {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n}\n\n.mat-sidenav-fixed {\n  position: fixed;\n}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatDrawerContainer, [{
    type: Component,
    args: [{
      selector: "mat-drawer-container",
      exportAs: "matDrawerContainer",
      host: {
        "class": "mat-drawer-container",
        "[class.mat-drawer-container-explicit-backdrop]": "_backdropOverride"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: MAT_DRAWER_CONTAINER,
        useExisting: MatDrawerContainer
      }],
      imports: [MatDrawerContent],
      template: '@if (hasBackdrop) {\n  <div class="mat-drawer-backdrop" (click)="_onBackdropClicked()"\n       [class.mat-drawer-shown]="_isShowingBackdrop()"></div>\n}\n\n<ng-content select="mat-drawer"></ng-content>\n\n<ng-content select="mat-drawer-content">\n</ng-content>\n\n@if (!_content) {\n  <mat-drawer-content>\n    <ng-content></ng-content>\n  </mat-drawer-content>\n}\n',
      styles: [".mat-drawer-container {\n  position: relative;\n  z-index: 1;\n  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));\n  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));\n  box-sizing: border-box;\n  display: block;\n  overflow: hidden;\n}\n.mat-drawer-container[fullscreen] {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-drawer-container[fullscreen].mat-drawer-container-has-open {\n  overflow: hidden;\n}\n.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {\n  z-index: 3;\n}\n.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,\n.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,\n.ng-animate-disabled .mat-drawer-container .mat-drawer-content {\n  transition: none;\n}\n\n.mat-drawer-backdrop {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  display: block;\n  z-index: 3;\n  visibility: hidden;\n}\n.mat-drawer-backdrop.mat-drawer-shown {\n  visibility: visible;\n  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));\n}\n.mat-drawer-transition .mat-drawer-backdrop {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: background-color, visibility;\n}\n@media (forced-colors: active) {\n  .mat-drawer-backdrop {\n    opacity: 0.5;\n  }\n}\n\n.mat-drawer-content {\n  position: relative;\n  z-index: 1;\n  display: block;\n  height: 100%;\n  overflow: auto;\n}\n.mat-drawer-content.mat-drawer-content-hidden {\n  opacity: 0;\n}\n.mat-drawer-transition .mat-drawer-content {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: transform, margin-left, margin-right;\n}\n\n.mat-drawer {\n  position: relative;\n  z-index: 4;\n  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));\n  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);\n  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  width: var(--mat-sidenav-container-width, 360px);\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 3;\n  outline: 0;\n  box-sizing: border-box;\n  overflow-y: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n@media (forced-colors: active) {\n  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {\n    border-right: solid 1px currentColor;\n  }\n}\n@media (forced-colors: active) {\n  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {\n    border-left: solid 1px currentColor;\n    border-right: none;\n  }\n}\n.mat-drawer.mat-drawer-side {\n  z-index: 2;\n}\n.mat-drawer.mat-drawer-end {\n  right: 0;\n  transform: translate3d(100%, 0, 0);\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .mat-drawer {\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  transform: translate3d(100%, 0, 0);\n}\n[dir=rtl] .mat-drawer.mat-drawer-end {\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  left: 0;\n  right: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n.mat-drawer-transition .mat-drawer {\n  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {\n  visibility: hidden;\n  box-shadow: none;\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {\n  display: none;\n}\n.mat-drawer.mat-drawer-opened.mat-drawer-opened {\n  transform: none;\n}\n\n.mat-drawer-side {\n  box-shadow: none;\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n}\n.mat-drawer-side.mat-drawer-end {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side.mat-drawer-end {\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n  border-left: none;\n}\n\n.mat-drawer-inner-container {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n}\n\n.mat-sidenav-fixed {\n  position: fixed;\n}\n"]
    }]
  }], () => [], {
    _allDrawers: [{
      type: ContentChildren,
      args: [MatDrawer, {
        descendants: true
      }]
    }],
    _content: [{
      type: ContentChild,
      args: [MatDrawerContent]
    }],
    _userContent: [{
      type: ViewChild,
      args: [MatDrawerContent]
    }],
    autosize: [{
      type: Input
    }],
    hasBackdrop: [{
      type: Input
    }],
    backdropClick: [{
      type: Output
    }]
  });
})();
var MatSidenavContent = class _MatSidenavContent extends MatDrawerContent {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatSidenavContent_BaseFactory;
    return function MatSidenavContent_Factory(__ngFactoryType__) {
      return (ɵMatSidenavContent_BaseFactory || (ɵMatSidenavContent_BaseFactory = ɵɵgetInheritedFactory(_MatSidenavContent)))(__ngFactoryType__ || _MatSidenavContent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MatSidenavContent,
    selectors: [["mat-sidenav-content"]],
    hostAttrs: [1, "mat-drawer-content", "mat-sidenav-content"],
    features: [ɵɵProvidersFeature([{
      provide: CdkScrollable,
      useExisting: _MatSidenavContent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c02,
    decls: 1,
    vars: 0,
    template: function MatSidenavContent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenavContent, [{
    type: Component,
    args: [{
      selector: "mat-sidenav-content",
      template: "<ng-content></ng-content>",
      host: {
        "class": "mat-drawer-content mat-sidenav-content"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: CdkScrollable,
        useExisting: MatSidenavContent
      }]
    }]
  }], null, null);
})();
var MatSidenav = class _MatSidenav extends MatDrawer {
  get fixedInViewport() {
    return this._fixedInViewport;
  }
  set fixedInViewport(value) {
    this._fixedInViewport = coerceBooleanProperty(value);
  }
  _fixedInViewport = false;
  get fixedTopGap() {
    return this._fixedTopGap;
  }
  set fixedTopGap(value) {
    this._fixedTopGap = coerceNumberProperty(value);
  }
  _fixedTopGap = 0;
  get fixedBottomGap() {
    return this._fixedBottomGap;
  }
  set fixedBottomGap(value) {
    this._fixedBottomGap = coerceNumberProperty(value);
  }
  _fixedBottomGap = 0;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatSidenav_BaseFactory;
    return function MatSidenav_Factory(__ngFactoryType__) {
      return (ɵMatSidenav_BaseFactory || (ɵMatSidenav_BaseFactory = ɵɵgetInheritedFactory(_MatSidenav)))(__ngFactoryType__ || _MatSidenav);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MatSidenav,
    selectors: [["mat-sidenav"]],
    hostAttrs: [1, "mat-drawer", "mat-sidenav"],
    hostVars: 16,
    hostBindings: function MatSidenav_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("tabIndex", ctx.mode !== "side" ? "-1" : null)("align", null);
        ɵɵstyleProp("top", ctx.fixedInViewport ? ctx.fixedTopGap : null, "px")("bottom", ctx.fixedInViewport ? ctx.fixedBottomGap : null, "px");
        ɵɵclassProp("mat-drawer-end", ctx.position === "end")("mat-drawer-over", ctx.mode === "over")("mat-drawer-push", ctx.mode === "push")("mat-drawer-side", ctx.mode === "side")("mat-sidenav-fixed", ctx.fixedInViewport);
      }
    },
    inputs: {
      fixedInViewport: "fixedInViewport",
      fixedTopGap: "fixedTopGap",
      fixedBottomGap: "fixedBottomGap"
    },
    exportAs: ["matSidenav"],
    features: [ɵɵProvidersFeature([{
      provide: MatDrawer,
      useExisting: _MatSidenav
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c02,
    decls: 3,
    vars: 0,
    consts: [["content", ""], ["cdkScrollable", "", 1, "mat-drawer-inner-container"]],
    template: function MatSidenav_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "div", 1, 0);
        ɵɵprojection(2);
        ɵɵelementEnd();
      }
    },
    dependencies: [CdkScrollable],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenav, [{
    type: Component,
    args: [{
      selector: "mat-sidenav",
      exportAs: "matSidenav",
      host: {
        "class": "mat-drawer mat-sidenav",
        "[attr.tabIndex]": '(mode !== "side") ? "-1" : null',
        "[attr.align]": "null",
        "[class.mat-drawer-end]": 'position === "end"',
        "[class.mat-drawer-over]": 'mode === "over"',
        "[class.mat-drawer-push]": 'mode === "push"',
        "[class.mat-drawer-side]": 'mode === "side"',
        "[class.mat-sidenav-fixed]": "fixedInViewport",
        "[style.top.px]": "fixedInViewport ? fixedTopGap : null",
        "[style.bottom.px]": "fixedInViewport ? fixedBottomGap : null"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      imports: [CdkScrollable],
      providers: [{
        provide: MatDrawer,
        useExisting: MatSidenav
      }],
      template: '<div class="mat-drawer-inner-container" cdkScrollable #content>\r\n  <ng-content></ng-content>\r\n</div>\r\n'
    }]
  }], null, {
    fixedInViewport: [{
      type: Input
    }],
    fixedTopGap: [{
      type: Input
    }],
    fixedBottomGap: [{
      type: Input
    }]
  });
})();
var MatSidenavContainer = class _MatSidenavContainer extends MatDrawerContainer {
  _allDrawers = void 0;
  _content = void 0;
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵMatSidenavContainer_BaseFactory;
    return function MatSidenavContainer_Factory(__ngFactoryType__) {
      return (ɵMatSidenavContainer_BaseFactory || (ɵMatSidenavContainer_BaseFactory = ɵɵgetInheritedFactory(_MatSidenavContainer)))(__ngFactoryType__ || _MatSidenavContainer);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _MatSidenavContainer,
    selectors: [["mat-sidenav-container"]],
    contentQueries: function MatSidenavContainer_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MatSidenavContent, 5)(dirIndex, MatSidenav, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._content = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._allDrawers = _t);
      }
    },
    hostAttrs: [1, "mat-drawer-container", "mat-sidenav-container"],
    hostVars: 2,
    hostBindings: function MatSidenavContainer_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("mat-drawer-container-explicit-backdrop", ctx._backdropOverride);
      }
    },
    exportAs: ["matSidenavContainer"],
    features: [ɵɵProvidersFeature([{
      provide: MAT_DRAWER_CONTAINER,
      useExisting: _MatSidenavContainer
    }, {
      provide: MatDrawerContainer,
      useExisting: _MatSidenavContainer
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c5,
    decls: 4,
    vars: 2,
    consts: [[1, "mat-drawer-backdrop", 3, "mat-drawer-shown"], [1, "mat-drawer-backdrop", 3, "click"]],
    template: function MatSidenavContainer_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c4);
        ɵɵconditionalCreate(0, MatSidenavContainer_Conditional_0_Template, 1, 2, "div", 0);
        ɵɵprojection(1);
        ɵɵprojection(2, 1);
        ɵɵconditionalCreate(3, MatSidenavContainer_Conditional_3_Template, 2, 0, "mat-sidenav-content");
      }
      if (rf & 2) {
        ɵɵconditional(ctx.hasBackdrop ? 0 : -1);
        ɵɵadvance(3);
        ɵɵconditional(!ctx._content ? 3 : -1);
      }
    },
    dependencies: [MatSidenavContent],
    styles: [_c6],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenavContainer, [{
    type: Component,
    args: [{
      selector: "mat-sidenav-container",
      exportAs: "matSidenavContainer",
      host: {
        "class": "mat-drawer-container mat-sidenav-container",
        "[class.mat-drawer-container-explicit-backdrop]": "_backdropOverride"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      providers: [{
        provide: MAT_DRAWER_CONTAINER,
        useExisting: MatSidenavContainer
      }, {
        provide: MatDrawerContainer,
        useExisting: MatSidenavContainer
      }],
      imports: [MatSidenavContent],
      template: '@if (hasBackdrop) {\n  <div class="mat-drawer-backdrop" (click)="_onBackdropClicked()"\n       [class.mat-drawer-shown]="_isShowingBackdrop()"></div>\n}\n\n<ng-content select="mat-sidenav"></ng-content>\n\n<ng-content select="mat-sidenav-content">\n</ng-content>\n\n@if (!_content) {\n  <mat-sidenav-content>\n    <ng-content></ng-content>\n  </mat-sidenav-content>\n}\n',
      styles: [".mat-drawer-container {\n  position: relative;\n  z-index: 1;\n  color: var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));\n  background-color: var(--mat-sidenav-content-background-color, var(--mat-sys-background));\n  box-sizing: border-box;\n  display: block;\n  overflow: hidden;\n}\n.mat-drawer-container[fullscreen] {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n}\n.mat-drawer-container[fullscreen].mat-drawer-container-has-open {\n  overflow: hidden;\n}\n.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side {\n  z-index: 3;\n}\n.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,\n.mat-drawer-container.ng-animate-disabled .mat-drawer-content, .ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,\n.ng-animate-disabled .mat-drawer-container .mat-drawer-content {\n  transition: none;\n}\n\n.mat-drawer-backdrop {\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  display: block;\n  z-index: 3;\n  visibility: hidden;\n}\n.mat-drawer-backdrop.mat-drawer-shown {\n  visibility: visible;\n  background-color: var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent));\n}\n.mat-drawer-transition .mat-drawer-backdrop {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: background-color, visibility;\n}\n@media (forced-colors: active) {\n  .mat-drawer-backdrop {\n    opacity: 0.5;\n  }\n}\n\n.mat-drawer-content {\n  position: relative;\n  z-index: 1;\n  display: block;\n  height: 100%;\n  overflow: auto;\n}\n.mat-drawer-content.mat-drawer-content-hidden {\n  opacity: 0;\n}\n.mat-drawer-transition .mat-drawer-content {\n  transition-duration: 400ms;\n  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);\n  transition-property: transform, margin-left, margin-right;\n}\n\n.mat-drawer {\n  position: relative;\n  z-index: 4;\n  color: var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));\n  box-shadow: var(--mat-sidenav-container-elevation-shadow, none);\n  background-color: var(--mat-sidenav-container-background-color, var(--mat-sys-surface));\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  width: var(--mat-sidenav-container-width, 360px);\n  display: block;\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 3;\n  outline: 0;\n  box-sizing: border-box;\n  overflow-y: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n@media (forced-colors: active) {\n  .mat-drawer, [dir=rtl] .mat-drawer.mat-drawer-end {\n    border-right: solid 1px currentColor;\n  }\n}\n@media (forced-colors: active) {\n  [dir=rtl] .mat-drawer, .mat-drawer.mat-drawer-end {\n    border-left: solid 1px currentColor;\n    border-right: none;\n  }\n}\n.mat-drawer.mat-drawer-side {\n  z-index: 2;\n}\n.mat-drawer.mat-drawer-end {\n  right: 0;\n  transform: translate3d(100%, 0, 0);\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n[dir=rtl] .mat-drawer {\n  border-top-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-left-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n  transform: translate3d(100%, 0, 0);\n}\n[dir=rtl] .mat-drawer.mat-drawer-end {\n  border-top-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-bottom-right-radius: var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  left: 0;\n  right: auto;\n  transform: translate3d(-100%, 0, 0);\n}\n.mat-drawer-transition .mat-drawer {\n  transition: transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) {\n  visibility: hidden;\n  box-shadow: none;\n}\n.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container {\n  display: none;\n}\n.mat-drawer.mat-drawer-opened.mat-drawer-opened {\n  transform: none;\n}\n\n.mat-drawer-side {\n  box-shadow: none;\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n}\n.mat-drawer-side.mat-drawer-end {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side {\n  border-left-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-left-width: 1px;\n  border-left-style: solid;\n  border-right: none;\n}\n[dir=rtl] .mat-drawer-side.mat-drawer-end {\n  border-right-color: var(--mat-sidenav-container-divider-color, transparent);\n  border-right-width: 1px;\n  border-right-style: solid;\n  border-left: none;\n}\n\n.mat-drawer-inner-container {\n  width: 100%;\n  height: 100%;\n  overflow: auto;\n}\n\n.mat-sidenav-fixed {\n  position: fixed;\n}\n"]
    }]
  }], null, {
    _allDrawers: [{
      type: ContentChildren,
      args: [MatSidenav, {
        descendants: true
      }]
    }],
    _content: [{
      type: ContentChild,
      args: [MatSidenavContent]
    }]
  });
})();
var MatSidenavModule = class _MatSidenavModule {
  static ɵfac = function MatSidenavModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatSidenavModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MatSidenavModule,
    imports: [CdkScrollableModule, MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent],
    exports: [BidiModule, CdkScrollableModule, MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CdkScrollableModule, BidiModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatSidenavModule, [{
    type: NgModule,
    args: [{
      imports: [CdkScrollableModule, MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent],
      exports: [BidiModule, CdkScrollableModule, MatDrawer, MatDrawerContainer, MatDrawerContent, MatSidenav, MatSidenavContainer, MatSidenavContent]
    }]
  }], null, null);
})();
export {
  MAT_DRAWER_DEFAULT_AUTOSIZE,
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
  MatSidenavModule,
  throwMatDuplicatedDrawerError
};
//# sourceMappingURL=@angular_material_sidenav.js.map
