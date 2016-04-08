var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from 'angular2/src/core/di';
import { ViewMetadata } from '../metadata/view';
import { ComponentMetadata } from '../metadata/directives';
import { stringify, isBlank, isPresent } from 'angular2/src/facade/lang';
import { BaseException } from 'angular2/src/facade/exceptions';
import { Map } from 'angular2/src/facade/collection';
import { ReflectorReader } from 'angular2/src/core/reflection/reflector_reader';
import { reflector } from 'angular2/src/core/reflection/reflection';
/**
 * Resolves types to {@link ViewMetadata}.
 */
export let ViewResolver = class {
    constructor(_reflector) {
        /** @internal */
        this._cache = new Map();
        if (isPresent(_reflector)) {
            this._reflector = _reflector;
        }
        else {
            this._reflector = reflector;
        }
    }
    resolve(component) {
        var view = this._cache.get(component);
        if (isBlank(view)) {
            view = this._resolve(component);
            this._cache.set(component, view);
        }
        return view;
    }
    /** @internal */
    _resolve(component) {
        var compMeta;
        var viewMeta;
        this._reflector.annotations(component).forEach(m => {
            if (m instanceof ViewMetadata) {
                viewMeta = m;
            }
            if (m instanceof ComponentMetadata) {
                compMeta = m;
            }
        });
        if (isPresent(compMeta)) {
            if (isBlank(compMeta.template) && isBlank(compMeta.templateUrl) && isBlank(viewMeta)) {
                throw new BaseException(`Component '${stringify(component)}' must have either 'template' or 'templateUrl' set.`);
            }
            else if (isPresent(compMeta.template) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("template", component);
            }
            else if (isPresent(compMeta.templateUrl) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("templateUrl", component);
            }
            else if (isPresent(compMeta.directives) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("directives", component);
            }
            else if (isPresent(compMeta.pipes) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("pipes", component);
            }
            else if (isPresent(compMeta.encapsulation) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("encapsulation", component);
            }
            else if (isPresent(compMeta.styles) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("styles", component);
            }
            else if (isPresent(compMeta.styleUrls) && isPresent(viewMeta)) {
                this._throwMixingViewAndComponent("styleUrls", component);
            }
            else if (isPresent(viewMeta)) {
                return viewMeta;
            }
            else {
                return new ViewMetadata({
                    templateUrl: compMeta.templateUrl,
                    template: compMeta.template,
                    directives: compMeta.directives,
                    pipes: compMeta.pipes,
                    encapsulation: compMeta.encapsulation,
                    styles: compMeta.styles,
                    styleUrls: compMeta.styleUrls
                });
            }
        }
        else {
            if (isBlank(viewMeta)) {
                throw new BaseException(`Could not compile '${stringify(component)}' because it is not a component.`);
            }
            else {
                return viewMeta;
            }
        }
        return null;
    }
    /** @internal */
    _throwMixingViewAndComponent(propertyName, component) {
        throw new BaseException(`Component '${stringify(component)}' cannot have both '${propertyName}' and '@View' set at the same time"`);
    }
};
ViewResolver = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ReflectorReader])
], ViewResolver);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtZXQ4SDA3V0IudG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci92aWV3X3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbIlZpZXdSZXNvbHZlciIsIlZpZXdSZXNvbHZlci5jb25zdHJ1Y3RvciIsIlZpZXdSZXNvbHZlci5yZXNvbHZlIiwiVmlld1Jlc29sdmVyLl9yZXNvbHZlIiwiVmlld1Jlc29sdmVyLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCO09BQ3hDLEVBQUMsWUFBWSxFQUFDLE1BQU0sa0JBQWtCO09BQ3RDLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx3QkFBd0I7T0FFakQsRUFBTyxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxNQUFNLDBCQUEwQjtPQUNyRSxFQUFDLGFBQWEsRUFBQyxNQUFNLGdDQUFnQztPQUNyRCxFQUFDLEdBQUcsRUFBQyxNQUFNLGdDQUFnQztPQUUzQyxFQUFDLGVBQWUsRUFBQyxNQUFNLCtDQUErQztPQUN0RSxFQUFDLFNBQVMsRUFBQyxNQUFNLHlDQUF5QztBQUVqRTs7R0FFRztBQUNIO0lBT0VBLFlBQVlBLFVBQTRCQTtRQUh4Q0MsZ0JBQWdCQTtRQUNoQkEsV0FBTUEsR0FBR0EsSUFBSUEsR0FBR0EsRUFBc0JBLENBQUNBO1FBR3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtZQUMxQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsVUFBVUEsQ0FBQ0E7UUFDL0JBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLFNBQVNBLENBQUNBO1FBQzlCQSxDQUFDQTtJQUNIQSxDQUFDQTtJQUVERCxPQUFPQSxDQUFDQSxTQUFlQTtRQUNyQkUsSUFBSUEsSUFBSUEsR0FBR0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7UUFFdENBLEVBQUVBLENBQUNBLENBQUNBLE9BQU9BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ2xCQSxJQUFJQSxHQUFHQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUNoQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsU0FBU0EsRUFBRUEsSUFBSUEsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLENBQUNBO1FBRURBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2RBLENBQUNBO0lBRURGLGdCQUFnQkE7SUFDaEJBLFFBQVFBLENBQUNBLFNBQWVBO1FBQ3RCRyxJQUFJQSxRQUEyQkEsQ0FBQ0E7UUFDaENBLElBQUlBLFFBQXNCQSxDQUFDQTtRQUUzQkEsSUFBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7WUFDOUNBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBLFlBQVlBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBO2dCQUM5QkEsUUFBUUEsR0FBR0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsQ0FBQ0E7WUFDREEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsWUFBWUEsaUJBQWlCQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkNBLFFBQVFBLEdBQUdBLENBQUNBLENBQUNBO1lBQ2ZBLENBQUNBO1FBQ0hBLENBQUNBLENBQUNBLENBQUNBO1FBRUhBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQ3hCQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxPQUFPQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDckZBLE1BQU1BLElBQUlBLGFBQWFBLENBQ25CQSxjQUFjQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxxREFBcURBLENBQUNBLENBQUNBO1lBRS9GQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxRQUFRQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDL0RBLElBQUlBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsVUFBVUEsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFFM0RBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNsRUEsSUFBSUEsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxhQUFhQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUU5REEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ2pFQSxJQUFJQSxDQUFDQSw0QkFBNEJBLENBQUNBLFlBQVlBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO1lBRTdEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxLQUFLQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDNURBLElBQUlBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsT0FBT0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFFeERBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLGFBQWFBLENBQUNBLElBQUlBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUNwRUEsSUFBSUEsQ0FBQ0EsNEJBQTRCQSxDQUFDQSxlQUFlQSxFQUFFQSxTQUFTQSxDQUFDQSxDQUFDQTtZQUVoRUEsQ0FBQ0E7WUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsU0FBU0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQzdEQSxJQUFJQSxDQUFDQSw0QkFBNEJBLENBQUNBLFFBQVFBLEVBQUVBLFNBQVNBLENBQUNBLENBQUNBO1lBRXpEQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxFQUFFQSxDQUFDQSxDQUFDQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxTQUFTQSxDQUFDQSxJQUFJQSxTQUFTQSxDQUFDQSxRQUFRQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDaEVBLElBQUlBLENBQUNBLDRCQUE0QkEsQ0FBQ0EsV0FBV0EsRUFBRUEsU0FBU0EsQ0FBQ0EsQ0FBQ0E7WUFFNURBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO2dCQUMvQkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFFbEJBLENBQUNBO1lBQUNBLElBQUlBLENBQUNBLENBQUNBO2dCQUNOQSxNQUFNQSxDQUFDQSxJQUFJQSxZQUFZQSxDQUFDQTtvQkFDdEJBLFdBQVdBLEVBQUVBLFFBQVFBLENBQUNBLFdBQVdBO29CQUNqQ0EsUUFBUUEsRUFBRUEsUUFBUUEsQ0FBQ0EsUUFBUUE7b0JBQzNCQSxVQUFVQSxFQUFFQSxRQUFRQSxDQUFDQSxVQUFVQTtvQkFDL0JBLEtBQUtBLEVBQUVBLFFBQVFBLENBQUNBLEtBQUtBO29CQUNyQkEsYUFBYUEsRUFBRUEsUUFBUUEsQ0FBQ0EsYUFBYUE7b0JBQ3JDQSxNQUFNQSxFQUFFQSxRQUFRQSxDQUFDQSxNQUFNQTtvQkFDdkJBLFNBQVNBLEVBQUVBLFFBQVFBLENBQUNBLFNBQVNBO2lCQUM5QkEsQ0FBQ0EsQ0FBQ0E7WUFDTEEsQ0FBQ0E7UUFDSEEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7WUFDTkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsUUFBUUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7Z0JBQ3RCQSxNQUFNQSxJQUFJQSxhQUFhQSxDQUNuQkEsc0JBQXNCQSxTQUFTQSxDQUFDQSxTQUFTQSxDQUFDQSxrQ0FBa0NBLENBQUNBLENBQUNBO1lBQ3BGQSxDQUFDQTtZQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtnQkFDTkEsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0E7WUFDbEJBLENBQUNBO1FBQ0hBLENBQUNBO1FBQ0RBLE1BQU1BLENBQUNBLElBQUlBLENBQUNBO0lBQ2RBLENBQUNBO0lBRURILGdCQUFnQkE7SUFDaEJBLDRCQUE0QkEsQ0FBQ0EsWUFBb0JBLEVBQUVBLFNBQWVBO1FBQ2hFSSxNQUFNQSxJQUFJQSxhQUFhQSxDQUNuQkEsY0FBY0EsU0FBU0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsdUJBQXVCQSxZQUFZQSxxQ0FBcUNBLENBQUNBLENBQUNBO0lBQ2xIQSxDQUFDQTtBQUNISixDQUFDQTtBQWhHRDtJQUFDLFVBQVUsRUFBRTs7aUJBZ0daO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGV9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL2RpJztcbmltcG9ydCB7Vmlld01ldGFkYXRhfSBmcm9tICcuLi9tZXRhZGF0YS92aWV3JztcbmltcG9ydCB7Q29tcG9uZW50TWV0YWRhdGF9IGZyb20gJy4uL21ldGFkYXRhL2RpcmVjdGl2ZXMnO1xuXG5pbXBvcnQge1R5cGUsIHN0cmluZ2lmeSwgaXNCbGFuaywgaXNQcmVzZW50fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtNYXB9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5cbmltcG9ydCB7UmVmbGVjdG9yUmVhZGVyfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9yZWZsZWN0aW9uL3JlZmxlY3Rvcl9yZWFkZXInO1xuaW1wb3J0IHtyZWZsZWN0b3J9IGZyb20gJ2FuZ3VsYXIyL3NyYy9jb3JlL3JlZmxlY3Rpb24vcmVmbGVjdGlvbic7XG5cbi8qKlxuICogUmVzb2x2ZXMgdHlwZXMgdG8ge0BsaW5rIFZpZXdNZXRhZGF0YX0uXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBWaWV3UmVzb2x2ZXIge1xuICBwcml2YXRlIF9yZWZsZWN0b3I6IFJlZmxlY3RvclJlYWRlcjtcblxuICAvKiogQGludGVybmFsICovXG4gIF9jYWNoZSA9IG5ldyBNYXA8VHlwZSwgVmlld01ldGFkYXRhPigpO1xuXG4gIGNvbnN0cnVjdG9yKF9yZWZsZWN0b3I/OiBSZWZsZWN0b3JSZWFkZXIpIHtcbiAgICBpZiAoaXNQcmVzZW50KF9yZWZsZWN0b3IpKSB7XG4gICAgICB0aGlzLl9yZWZsZWN0b3IgPSBfcmVmbGVjdG9yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWZsZWN0b3IgPSByZWZsZWN0b3I7XG4gICAgfVxuICB9XG5cbiAgcmVzb2x2ZShjb21wb25lbnQ6IFR5cGUpOiBWaWV3TWV0YWRhdGEge1xuICAgIHZhciB2aWV3ID0gdGhpcy5fY2FjaGUuZ2V0KGNvbXBvbmVudCk7XG5cbiAgICBpZiAoaXNCbGFuayh2aWV3KSkge1xuICAgICAgdmlldyA9IHRoaXMuX3Jlc29sdmUoY29tcG9uZW50KTtcbiAgICAgIHRoaXMuX2NhY2hlLnNldChjb21wb25lbnQsIHZpZXcpO1xuICAgIH1cblxuICAgIHJldHVybiB2aWV3O1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfcmVzb2x2ZShjb21wb25lbnQ6IFR5cGUpOiBWaWV3TWV0YWRhdGEge1xuICAgIHZhciBjb21wTWV0YTogQ29tcG9uZW50TWV0YWRhdGE7XG4gICAgdmFyIHZpZXdNZXRhOiBWaWV3TWV0YWRhdGE7XG5cbiAgICB0aGlzLl9yZWZsZWN0b3IuYW5ub3RhdGlvbnMoY29tcG9uZW50KS5mb3JFYWNoKG0gPT4ge1xuICAgICAgaWYgKG0gaW5zdGFuY2VvZiBWaWV3TWV0YWRhdGEpIHtcbiAgICAgICAgdmlld01ldGEgPSBtO1xuICAgICAgfVxuICAgICAgaWYgKG0gaW5zdGFuY2VvZiBDb21wb25lbnRNZXRhZGF0YSkge1xuICAgICAgICBjb21wTWV0YSA9IG07XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaXNQcmVzZW50KGNvbXBNZXRhKSkge1xuICAgICAgaWYgKGlzQmxhbmsoY29tcE1ldGEudGVtcGxhdGUpICYmIGlzQmxhbmsoY29tcE1ldGEudGVtcGxhdGVVcmwpICYmIGlzQmxhbmsodmlld01ldGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgYENvbXBvbmVudCAnJHtzdHJpbmdpZnkoY29tcG9uZW50KX0nIG11c3QgaGF2ZSBlaXRoZXIgJ3RlbXBsYXRlJyBvciAndGVtcGxhdGVVcmwnIHNldC5gKTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEudGVtcGxhdGUpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwidGVtcGxhdGVcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEudGVtcGxhdGVVcmwpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwidGVtcGxhdGVVcmxcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQoY29tcE1ldGEuZGlyZWN0aXZlcykgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJkaXJlY3RpdmVzXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLnBpcGVzKSAmJiBpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHRoaXMuX3Rocm93TWl4aW5nVmlld0FuZENvbXBvbmVudChcInBpcGVzXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLmVuY2Fwc3VsYXRpb24pICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwiZW5jYXBzdWxhdGlvblwiLCBjb21wb25lbnQpO1xuXG4gICAgICB9IGVsc2UgaWYgKGlzUHJlc2VudChjb21wTWV0YS5zdHlsZXMpICYmIGlzUHJlc2VudCh2aWV3TWV0YSkpIHtcbiAgICAgICAgdGhpcy5fdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KFwic3R5bGVzXCIsIGNvbXBvbmVudCk7XG5cbiAgICAgIH0gZWxzZSBpZiAoaXNQcmVzZW50KGNvbXBNZXRhLnN0eWxlVXJscykgJiYgaXNQcmVzZW50KHZpZXdNZXRhKSkge1xuICAgICAgICB0aGlzLl90aHJvd01peGluZ1ZpZXdBbmRDb21wb25lbnQoXCJzdHlsZVVybHNcIiwgY29tcG9uZW50KTtcblxuICAgICAgfSBlbHNlIGlmIChpc1ByZXNlbnQodmlld01ldGEpKSB7XG4gICAgICAgIHJldHVybiB2aWV3TWV0YTtcblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWaWV3TWV0YWRhdGEoe1xuICAgICAgICAgIHRlbXBsYXRlVXJsOiBjb21wTWV0YS50ZW1wbGF0ZVVybCxcbiAgICAgICAgICB0ZW1wbGF0ZTogY29tcE1ldGEudGVtcGxhdGUsXG4gICAgICAgICAgZGlyZWN0aXZlczogY29tcE1ldGEuZGlyZWN0aXZlcyxcbiAgICAgICAgICBwaXBlczogY29tcE1ldGEucGlwZXMsXG4gICAgICAgICAgZW5jYXBzdWxhdGlvbjogY29tcE1ldGEuZW5jYXBzdWxhdGlvbixcbiAgICAgICAgICBzdHlsZXM6IGNvbXBNZXRhLnN0eWxlcyxcbiAgICAgICAgICBzdHlsZVVybHM6IGNvbXBNZXRhLnN0eWxlVXJsc1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlzQmxhbmsodmlld01ldGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKFxuICAgICAgICAgICAgYENvdWxkIG5vdCBjb21waWxlICcke3N0cmluZ2lmeShjb21wb25lbnQpfScgYmVjYXVzZSBpdCBpcyBub3QgYSBjb21wb25lbnQuYCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdmlld01ldGE7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBfdGhyb3dNaXhpbmdWaWV3QW5kQ29tcG9uZW50KHByb3BlcnR5TmFtZTogc3RyaW5nLCBjb21wb25lbnQ6IFR5cGUpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgQmFzZUV4Y2VwdGlvbihcbiAgICAgICAgYENvbXBvbmVudCAnJHtzdHJpbmdpZnkoY29tcG9uZW50KX0nIGNhbm5vdCBoYXZlIGJvdGggJyR7cHJvcGVydHlOYW1lfScgYW5kICdAVmlldycgc2V0IGF0IHRoZSBzYW1lIHRpbWVcImApO1xuICB9XG59XG4iXX0=