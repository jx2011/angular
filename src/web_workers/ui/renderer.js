'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var message_bus_1 = require('angular2/src/web_workers/shared/message_bus');
var serializer_1 = require('angular2/src/web_workers/shared/serializer');
var api_1 = require('angular2/src/core/render/api');
var messaging_api_1 = require('angular2/src/web_workers/shared/messaging_api');
var bind_1 = require('./bind');
var event_dispatcher_1 = require('angular2/src/web_workers/ui/event_dispatcher');
var render_store_1 = require('angular2/src/web_workers/shared/render_store');
var service_message_broker_1 = require('angular2/src/web_workers/shared/service_message_broker');
var MessageBasedRenderer = (function () {
    function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    MessageBasedRenderer.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
        this._bus.initChannel(messaging_api_1.EVENT_CHANNEL);
        this._eventDispatcher = new event_dispatcher_1.EventDispatcher(this._bus.to(messaging_api_1.EVENT_CHANNEL), this._serializer);
        broker.registerMethod("renderComponent", [api_1.RenderComponentType, serializer_1.PRIMITIVE], bind_1.bind(this._renderComponent, this));
        broker.registerMethod("selectRootElement", [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._selectRootElement, this));
        broker.registerMethod("createElement", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createElement, this));
        broker.registerMethod("createViewRoot", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createViewRoot, this));
        broker.registerMethod("createTemplateAnchor", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._createTemplateAnchor, this));
        broker.registerMethod("createText", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._createText, this));
        broker.registerMethod("projectNodes", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._projectNodes, this));
        broker.registerMethod("attachViewAfter", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._attachViewAfter, this));
        broker.registerMethod("detachView", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._detachView, this));
        broker.registerMethod("destroyView", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._destroyView, this));
        broker.registerMethod("setElementProperty", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementProperty, this));
        broker.registerMethod("setElementAttribute", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementAttribute, this));
        broker.registerMethod("setBindingDebugInfo", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setBindingDebugInfo, this));
        broker.registerMethod("setElementClass", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementClass, this));
        broker.registerMethod("setElementStyle", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._setElementStyle, this));
        broker.registerMethod("invokeElementMethod", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._invokeElementMethod, this));
        broker.registerMethod("setText", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], bind_1.bind(this._setText, this));
        broker.registerMethod("listen", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listen, this));
        broker.registerMethod("listenGlobal", [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], bind_1.bind(this._listenGlobal, this));
        broker.registerMethod("listenDone", [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], bind_1.bind(this._listenDone, this));
    };
    MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    };
    MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector), elId);
    };
    MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name), elId);
    };
    MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    };
    MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement), elId);
    };
    MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value), elId);
    };
    MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    };
    MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    };
    MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    };
    MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    };
    MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    };
    MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    };
    MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    };
    MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    };
    MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listen(renderElement, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event) { return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event); });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
    MessageBasedRenderer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [service_message_broker_1.ServiceMessageBrokerFactory, message_bus_1.MessageBus, serializer_1.Serializer, render_store_1.RenderStore, api_1.RootRenderer])
    ], MessageBasedRenderer);
    return MessageBasedRenderer;
})();
exports.MessageBasedRenderer = MessageBasedRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaWZmaW5nX3BsdWdpbl93cmFwcGVyLW91dHB1dF9wYXRoLW1GUEtoRXdNLnRtcC9hbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvdWkvcmVuZGVyZXIudHMiXSwibmFtZXMiOlsiTWVzc2FnZUJhc2VkUmVuZGVyZXIiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5jb25zdHJ1Y3RvciIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLnN0YXJ0IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3JlbmRlckNvbXBvbmVudCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9zZWxlY3RSb290RWxlbWVudCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9jcmVhdGVFbGVtZW50IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVZpZXdSb290IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVRlbXBsYXRlQW5jaG9yIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2NyZWF0ZVRleHQiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fcHJvamVjdE5vZGVzIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2F0dGFjaFZpZXdBZnRlciIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9kZXRhY2hWaWV3IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2Rlc3Ryb3lWaWV3IiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEVsZW1lbnRQcm9wZXJ0eSIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9zZXRFbGVtZW50QXR0cmlidXRlIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEJpbmRpbmdEZWJ1Z0luZm8iLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fc2V0RWxlbWVudENsYXNzIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldEVsZW1lbnRTdHlsZSIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9pbnZva2VFbGVtZW50TWV0aG9kIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX3NldFRleHQiLCJNZXNzYWdlQmFzZWRSZW5kZXJlci5fbGlzdGVuIiwiTWVzc2FnZUJhc2VkUmVuZGVyZXIuX2xpc3Rlbkdsb2JhbCIsIk1lc3NhZ2VCYXNlZFJlbmRlcmVyLl9saXN0ZW5Eb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxtQkFBeUIsc0JBQXNCLENBQUMsQ0FBQTtBQUNoRCw0QkFBeUIsNkNBQTZDLENBQUMsQ0FBQTtBQUN2RSwyQkFBdUQsNENBQTRDLENBQUMsQ0FBQTtBQUNwRyxvQkFBMEQsOEJBQThCLENBQUMsQ0FBQTtBQUN6Riw4QkFBOEMsK0NBQStDLENBQUMsQ0FBQTtBQUU5RixxQkFBbUIsUUFBUSxDQUFDLENBQUE7QUFDNUIsaUNBQThCLDhDQUE4QyxDQUFDLENBQUE7QUFDN0UsNkJBQTBCLDhDQUE4QyxDQUFDLENBQUE7QUFDekUsdUNBQTBDLHdEQUF3RCxDQUFDLENBQUE7QUFFbkc7SUFJRUEsOEJBQW9CQSxjQUEyQ0EsRUFBVUEsSUFBZ0JBLEVBQ3JFQSxXQUF1QkEsRUFBVUEsWUFBeUJBLEVBQzFEQSxhQUEyQkE7UUFGM0JDLG1CQUFjQSxHQUFkQSxjQUFjQSxDQUE2QkE7UUFBVUEsU0FBSUEsR0FBSkEsSUFBSUEsQ0FBWUE7UUFDckVBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFZQTtRQUFVQSxpQkFBWUEsR0FBWkEsWUFBWUEsQ0FBYUE7UUFDMURBLGtCQUFhQSxHQUFiQSxhQUFhQSxDQUFjQTtJQUFHQSxDQUFDQTtJQUVuREQsb0NBQUtBLEdBQUxBO1FBQ0VFLElBQUlBLE1BQU1BLEdBQUdBLElBQUlBLENBQUNBLGNBQWNBLENBQUNBLG1CQUFtQkEsQ0FBQ0EsZ0NBQWdCQSxDQUFDQSxDQUFDQTtRQUN2RUEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsNkJBQWFBLENBQUNBLENBQUNBO1FBQ3JDQSxJQUFJQSxDQUFDQSxnQkFBZ0JBLEdBQUdBLElBQUlBLGtDQUFlQSxDQUFDQSxJQUFJQSxDQUFDQSxJQUFJQSxD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QSxZQUFZQSxDQUFDQSxLQUFLQSxDQUFDQSxrQkFBa0JBLEVBQUVBLFVBQVVBLENBQUNBLENBQUNBO0lBQzFEQSxDQUFDQTtJQUVPckIsMENBQVdBLEdBQW5CQSxVQUFvQkEsUUFBa0JBLEVBQUVBLGdCQUEwQkEsSUFBSXNCLGdCQUFnQkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFqSzdGdEI7UUFBQ0EsZUFBVUEsRUFBRUE7OzZCQWtLWkE7SUFBREEsMkJBQUNBO0FBQURBLENBQUNBLEFBbEtELElBa0tDO0FBaktZLDRCQUFvQix1QkFpS2hDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7TWVzc2FnZUJ1c30gZnJvbSAnYW5ndWxhcjIvc3JjL3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1cyc7XG5pbXBvcnQge1NlcmlhbGl6ZXIsIFBSSU1JVElWRSwgUmVuZGVyU3RvcmVPYmplY3R9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvc2VyaWFsaXplcic7XG5pbXBvcnQge1Jvb3RSZW5kZXJlciwgUmVuZGVyZXIsIFJlbmRlckNvbXBvbmVudFR5cGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlbmRlci9hcGknO1xuaW1wb3J0IHtFVkVOVF9DSEFOTkVMLCBSRU5ERVJFUl9DSEFOTkVMfSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL21lc3NhZ2luZ19hcGknO1xuaW1wb3J0IHtUeXBlfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtiaW5kfSBmcm9tICcuL2JpbmQnO1xuaW1wb3J0IHtFdmVudERpc3BhdGNoZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy91aS9ldmVudF9kaXNwYXRjaGVyJztcbmltcG9ydCB7UmVuZGVyU3RvcmV9IGZyb20gJ2FuZ3VsYXIyL3NyYy93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlJztcbmltcG9ydCB7U2VydmljZU1lc3NhZ2VCcm9rZXJGYWN0b3J5fSBmcm9tICdhbmd1bGFyMi9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVzc2FnZUJhc2VkUmVuZGVyZXIge1xuICBwcml2YXRlIF9ldmVudERpc3BhdGNoZXI6IEV2ZW50RGlzcGF0Y2hlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9icm9rZXJGYWN0b3J5OiBTZXJ2aWNlTWVzc2FnZUJyb2tlckZhY3RvcnksIHByaXZhdGUgX2J1czogTWVzc2FnZUJ1cyxcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfc2VyaWFsaXplcjogU2VyaWFsaXplciwgcHJpdmF0ZSBfcmVuZGVyU3RvcmU6IFJlbmRlclN0b3JlLFxuICAgICAgICAgICAgICBwcml2YXRlIF9yb290UmVuZGVyZXI6IFJvb3RSZW5kZXJlcikge31cblxuICBzdGFydCgpOiB2b2lkIHtcbiAgICB2YXIgYnJva2VyID0gdGhpcy5fYnJva2VyRmFjdG9yeS5jcmVhdGVNZXNzYWdlQnJva2VyKFJFTkRFUkVSX0NIQU5ORUwpO1xuICAgIHRoaXMuX2J1cy5pbml0Q2hhbm5lbChFVkVOVF9DSEFOTkVMKTtcbiAgICB0aGlzLl9ldmVudERpc3BhdGNoZXIgPSBuZXcgRXZlbnREaXNwYXRjaGVyKHRoaXMuX2J1cy50byhFVkVOVF9DSEFOTkVMKSwgdGhpcy5fc2VyaWFsaXplcik7XG5cbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJyZW5kZXJDb21wb25lbnRcIiwgW1JlbmRlckNvbXBvbmVudFR5cGUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fcmVuZGVyQ29tcG9uZW50LCB0aGlzKSk7XG5cbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZWxlY3RSb290RWxlbWVudFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZWxlY3RSb290RWxlbWVudCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImNyZWF0ZUVsZW1lbnRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZUVsZW1lbnQsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJjcmVhdGVWaWV3Um9vdFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVZpZXdSb290LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiY3JlYXRlVGVtcGxhdGVBbmNob3JcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9jcmVhdGVUZW1wbGF0ZUFuY2hvciwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImNyZWF0ZVRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2NyZWF0ZVRleHQsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJwcm9qZWN0Tm9kZXNcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3Byb2plY3ROb2RlcywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImF0dGFjaFZpZXdBZnRlclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fYXR0YWNoVmlld0FmdGVyLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiZGV0YWNoVmlld1wiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9kZXRhY2hWaWV3LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwiZGVzdHJveVZpZXdcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3RdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2Rlc3Ryb3lWaWV3LCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0RWxlbWVudFByb3BlcnR5XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50UHJvcGVydHksIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJzZXRFbGVtZW50QXR0cmlidXRlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50QXR0cmlidXRlLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0QmluZGluZ0RlYnVnSW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0QmluZGluZ0RlYnVnSW5mbywgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcInNldEVsZW1lbnRDbGFzc1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkUsIFBSSU1JVElWRV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fc2V0RWxlbWVudENsYXNzLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0RWxlbWVudFN0eWxlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9zZXRFbGVtZW50U3R5bGUsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJpbnZva2VFbGVtZW50TWV0aG9kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtSZW5kZXJTdG9yZU9iamVjdCwgUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmluZCh0aGlzLl9pbnZva2VFbGVtZW50TWV0aG9kLCB0aGlzKSk7XG4gICAgYnJva2VyLnJlZ2lzdGVyTWV0aG9kKFwic2V0VGV4dFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFJlbmRlclN0b3JlT2JqZWN0LCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX3NldFRleHQsIHRoaXMpKTtcbiAgICBicm9rZXIucmVnaXN0ZXJNZXRob2QoXCJsaXN0ZW5cIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdCwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2xpc3RlbiwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImxpc3Rlbkdsb2JhbFwiLCBbUmVuZGVyU3RvcmVPYmplY3QsIFBSSU1JVElWRSwgUFJJTUlUSVZFLCBQUklNSVRJVkVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5kKHRoaXMuX2xpc3Rlbkdsb2JhbCwgdGhpcykpO1xuICAgIGJyb2tlci5yZWdpc3Rlck1ldGhvZChcImxpc3RlbkRvbmVcIiwgW1JlbmRlclN0b3JlT2JqZWN0LCBSZW5kZXJTdG9yZU9iamVjdF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmQodGhpcy5fbGlzdGVuRG9uZSwgdGhpcykpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVuZGVyQ29tcG9uZW50KHJlbmRlckNvbXBvbmVudFR5cGU6IFJlbmRlckNvbXBvbmVudFR5cGUsIHJlbmRlcmVySWQ6IG51bWJlcikge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuX3Jvb3RSZW5kZXJlci5yZW5kZXJDb21wb25lbnQocmVuZGVyQ29tcG9uZW50VHlwZSk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUocmVuZGVyZXIsIHJlbmRlcmVySWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0Um9vdEVsZW1lbnQocmVuZGVyZXI6IFJlbmRlcmVyLCBzZWxlY3Rvcjogc3RyaW5nLCBlbElkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlci5zZWxlY3RSb290RWxlbWVudChzZWxlY3RvciksIGVsSWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlRWxlbWVudChyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgbmFtZTogc3RyaW5nLCBlbElkOiBudW1iZXIpIHtcbiAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZShyZW5kZXJlci5jcmVhdGVFbGVtZW50KHBhcmVudEVsZW1lbnQsIG5hbWUpLCBlbElkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVZpZXdSb290KHJlbmRlcmVyOiBSZW5kZXJlciwgaG9zdEVsZW1lbnQ6IGFueSwgZWxJZDogbnVtYmVyKSB7XG4gICAgdmFyIHZpZXdSb290ID0gcmVuZGVyZXIuY3JlYXRlVmlld1Jvb3QoaG9zdEVsZW1lbnQpO1xuICAgIGlmICh0aGlzLl9yZW5kZXJTdG9yZS5zZXJpYWxpemUoaG9zdEVsZW1lbnQpICE9PSBlbElkKSB7XG4gICAgICB0aGlzLl9yZW5kZXJTdG9yZS5zdG9yZSh2aWV3Um9vdCwgZWxJZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlVGVtcGxhdGVBbmNob3IocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnRFbGVtZW50OiBhbnksIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLmNyZWF0ZVRlbXBsYXRlQW5jaG9yKHBhcmVudEVsZW1lbnQpLCBlbElkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVRleHQocmVuZGVyZXI6IFJlbmRlcmVyLCBwYXJlbnRFbGVtZW50OiBhbnksIHZhbHVlOiBzdHJpbmcsIGVsSWQ6IG51bWJlcikge1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHJlbmRlcmVyLmNyZWF0ZVRleHQocGFyZW50RWxlbWVudCwgdmFsdWUpLCBlbElkKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2plY3ROb2RlcyhyZW5kZXJlcjogUmVuZGVyZXIsIHBhcmVudEVsZW1lbnQ6IGFueSwgbm9kZXM6IGFueVtdKSB7XG4gICAgcmVuZGVyZXIucHJvamVjdE5vZGVzKHBhcmVudEVsZW1lbnQsIG5vZGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2F0dGFjaFZpZXdBZnRlcihyZW5kZXJlcjogUmVuZGVyZXIsIG5vZGU6IGFueSwgdmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5hdHRhY2hWaWV3QWZ0ZXIobm9kZSwgdmlld1Jvb3ROb2Rlcyk7XG4gIH1cblxuICBwcml2YXRlIF9kZXRhY2hWaWV3KHJlbmRlcmVyOiBSZW5kZXJlciwgdmlld1Jvb3ROb2RlczogYW55W10pIHtcbiAgICByZW5kZXJlci5kZXRhY2hWaWV3KHZpZXdSb290Tm9kZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVzdHJveVZpZXcocmVuZGVyZXI6IFJlbmRlcmVyLCBob3N0RWxlbWVudDogYW55LCB2aWV3QWxsTm9kZXM6IGFueVtdKSB7XG4gICAgcmVuZGVyZXIuZGVzdHJveVZpZXcoaG9zdEVsZW1lbnQsIHZpZXdBbGxOb2Rlcyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3QWxsTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuX3JlbmRlclN0b3JlLnJlbW92ZSh2aWV3QWxsTm9kZXNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRQcm9wZXJ0eShyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgcHJvcGVydHlOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlOiBhbnkpIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50UHJvcGVydHkocmVuZGVyRWxlbWVudCwgcHJvcGVydHlOYW1lLCBwcm9wZXJ0eVZhbHVlKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NldEVsZW1lbnRBdHRyaWJ1dGUocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIGF0dHJpYnV0ZU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyaWJ1dGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudEF0dHJpYnV0ZShyZW5kZXJFbGVtZW50LCBhdHRyaWJ1dGVOYW1lLCBhdHRyaWJ1dGVWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eVZhbHVlOiBzdHJpbmcpIHtcbiAgICByZW5kZXJlci5zZXRCaW5kaW5nRGVidWdJbmZvKHJlbmRlckVsZW1lbnQsIHByb3BlcnR5TmFtZSwgcHJvcGVydHlWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50Q2xhc3MocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIGNsYXNzTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNBZGQ6IGJvb2xlYW4pIHtcbiAgICByZW5kZXJlci5zZXRFbGVtZW50Q2xhc3MocmVuZGVyRWxlbWVudCwgY2xhc3NOYW1lLCBpc0FkZCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRFbGVtZW50U3R5bGUocmVuZGVyZXI6IFJlbmRlcmVyLCByZW5kZXJFbGVtZW50OiBhbnksIHN0eWxlTmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVWYWx1ZTogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0RWxlbWVudFN0eWxlKHJlbmRlckVsZW1lbnQsIHN0eWxlTmFtZSwgc3R5bGVWYWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIF9pbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlcmVyOiBSZW5kZXJlciwgcmVuZGVyRWxlbWVudDogYW55LCBtZXRob2ROYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJnczogYW55W10pIHtcbiAgICByZW5kZXJlci5pbnZva2VFbGVtZW50TWV0aG9kKHJlbmRlckVsZW1lbnQsIG1ldGhvZE5hbWUsIGFyZ3MpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2V0VGV4dChyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlck5vZGU6IGFueSwgdGV4dDogc3RyaW5nKSB7XG4gICAgcmVuZGVyZXIuc2V0VGV4dChyZW5kZXJOb2RlLCB0ZXh0KTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlbihyZW5kZXJlcjogUmVuZGVyZXIsIHJlbmRlckVsZW1lbnQ6IGFueSwgZXZlbnROYW1lOiBzdHJpbmcsIHVubGlzdGVuSWQ6IG51bWJlcikge1xuICAgIHZhciB1bnJlZ2lzdGVyQ2FsbGJhY2sgPSByZW5kZXJlci5saXN0ZW4ocmVuZGVyRWxlbWVudCwgZXZlbnROYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hSZW5kZXJFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW5kZXJFbGVtZW50LCBudWxsLCBldmVudE5hbWUsIGV2ZW50KSk7XG4gICAgdGhpcy5fcmVuZGVyU3RvcmUuc3RvcmUodW5yZWdpc3RlckNhbGxiYWNrLCB1bmxpc3RlbklkKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3Rlbkdsb2JhbChyZW5kZXJlcjogUmVuZGVyZXIsIGV2ZW50VGFyZ2V0OiBzdHJpbmcsIGV2ZW50TmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgdW5saXN0ZW5JZDogbnVtYmVyKSB7XG4gICAgdmFyIHVucmVnaXN0ZXJDYWxsYmFjayA9IHJlbmRlcmVyLmxpc3Rlbkdsb2JhbChcbiAgICAgICAgZXZlbnRUYXJnZXQsIGV2ZW50TmFtZSxcbiAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9ldmVudERpc3BhdGNoZXIuZGlzcGF0Y2hSZW5kZXJFdmVudChudWxsLCBldmVudFRhcmdldCwgZXZlbnROYW1lLCBldmVudCkpO1xuICAgIHRoaXMuX3JlbmRlclN0b3JlLnN0b3JlKHVucmVnaXN0ZXJDYWxsYmFjaywgdW5saXN0ZW5JZCk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW5Eb25lKHJlbmRlcmVyOiBSZW5kZXJlciwgdW5saXN0ZW5DYWxsYmFjazogRnVuY3Rpb24pIHsgdW5saXN0ZW5DYWxsYmFjaygpOyB9XG59XG4iXX0=