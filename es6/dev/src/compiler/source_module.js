import { StringWrapper, isBlank } from 'angular2/src/facade/lang';
var MODULE_REGEXP = /#MODULE\[([^\]]*)\]/g;
export function moduleRef(moduleUrl) {
    return `#MODULE[${moduleUrl}]`;
}
/**
 * Represents generated source code with module references. Internal to the Angular compiler.
 */
export class SourceModule {
    constructor(moduleUrl, sourceWithModuleRefs) {
        this.moduleUrl = moduleUrl;
        this.sourceWithModuleRefs = sourceWithModuleRefs;
    }
    static getSourceWithoutImports(sourceWithModuleRefs) {
        return StringWrapper.replaceAllMapped(sourceWithModuleRefs, MODULE_REGEXP, (match) => '');
    }
    getSourceWithImports() {
        var moduleAliases = {};
        var imports = [];
        var newSource = StringWrapper.replaceAllMapped(this.sourceWithModuleRefs, MODULE_REGEXP, (match) => {
            var moduleUrl = match[1];
            var alias = moduleAliases[moduleUrl];
            if (isBlank(alias)) {
                if (moduleUrl == this.moduleUrl) {
                    alias = '';
                }
                else {
                    alias = `import${imports.length}`;
                    imports.push([moduleUrl, alias]);
                }
                moduleAliases[moduleUrl] = alias;
            }
            return alias.length > 0 ? `${alias}.` : '';
        });
        return new SourceWithImports(newSource, imports);
    }
}
export class SourceExpression {
    constructor(declarations, expression) {
        this.declarations = declarations;
        this.expression = expression;
    }
}
export class SourceExpressions {
    constructor(declarations, expressions) {
        this.declarations = declarations;
        this.expressions = expressions;
    }
}
/**
 * Represents generated source code with imports. Internal to the Angular compiler.
 */
export class SourceWithImports {
    constructor(source, imports) {
        this.source = source;
        this.imports = imports;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic291cmNlX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtZXQ4SDA3V0IudG1wL2FuZ3VsYXIyL3NyYy9jb21waWxlci9zb3VyY2VfbW9kdWxlLnRzIl0sIm5hbWVzIjpbIm1vZHVsZVJlZiIsIlNvdXJjZU1vZHVsZSIsIlNvdXJjZU1vZHVsZS5jb25zdHJ1Y3RvciIsIlNvdXJjZU1vZHVsZS5nZXRTb3VyY2VXaXRob3V0SW1wb3J0cyIsIlNvdXJjZU1vZHVsZS5nZXRTb3VyY2VXaXRoSW1wb3J0cyIsIlNvdXJjZUV4cHJlc3Npb24iLCJTb3VyY2VFeHByZXNzaW9uLmNvbnN0cnVjdG9yIiwiU291cmNlRXhwcmVzc2lvbnMiLCJTb3VyY2VFeHByZXNzaW9ucy5jb25zdHJ1Y3RvciIsIlNvdXJjZVdpdGhJbXBvcnRzIiwiU291cmNlV2l0aEltcG9ydHMuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJPQUFPLEVBQUMsYUFBYSxFQUFFLE9BQU8sRUFBQyxNQUFNLDBCQUEwQjtBQUUvRCxJQUFJLGFBQWEsR0FBRyxzQkFBc0IsQ0FBQztBQUUzQywwQkFBMEIsU0FBUztJQUNqQ0EsTUFBTUEsQ0FBQ0EsV0FBV0EsU0FBU0EsR0FBR0EsQ0FBQ0E7QUFDakNBLENBQUNBO0FBRUQ7O0dBRUc7QUFDSDtJQUtFQyxZQUFtQkEsU0FBaUJBLEVBQVNBLG9CQUE0QkE7UUFBdERDLGNBQVNBLEdBQVRBLFNBQVNBLENBQVFBO1FBQVNBLHlCQUFvQkEsR0FBcEJBLG9CQUFvQkEsQ0FBUUE7SUFBR0EsQ0FBQ0E7SUFKN0VELE9BQU9BLHVCQUF1QkEsQ0FBQ0Esb0JBQTRCQTtRQUN6REUsTUFBTUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsZ0JBQWdCQSxDQUFDQSxvQkFBb0JBLEVBQUVBLGFBQWFBLEVBQUVBLENBQUNBLEtBQUtBLEtBQUtBLEVBQUVBLENBQUNBLENBQUNBO0lBQzVGQSxDQUFDQTtJQUlERixvQkFBb0JBO1FBQ2xCRyxJQUFJQSxhQUFhQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUN2QkEsSUFBSUEsT0FBT0EsR0FBZUEsRUFBRUEsQ0FBQ0E7UUFDN0JBLElBQUlBLFNBQVNBLEdBQ1RBLGFBQWFBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsSUFBSUEsQ0FBQ0Esb0JBQW9CQSxFQUFFQSxhQUFhQSxFQUFFQSxDQUFDQSxLQUFLQTtZQUM3RUEsSUFBSUEsU0FBU0EsR0FBR0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDekJBLElBQUlBLEtBQUtBLEdBQUdBLGFBQWFBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBO1lBQ3JDQSxFQUFFQSxDQUFDQSxDQUFDQSxPQUFPQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkJBLEVBQUVBLENBQUNBLENBQUNBLFNBQVNBLElBQUlBLElBQUlBLENBQUNBLFNBQVNBLENBQUNBLENBQUNBLENBQUNBO29CQUNoQ0EsS0FBS0EsR0FBR0EsRUFBRUEsQ0FBQ0E7Z0JBQ2JBLENBQUNBO2dCQUFDQSxJQUFJQSxDQUFDQSxDQUFDQTtvQkFDTkEsS0FBS0EsR0FBR0EsU0FBU0EsT0FBT0EsQ0FBQ0EsTUFBTUEsRUFBRUEsQ0FBQ0E7b0JBQ2xDQSxPQUFPQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxTQUFTQSxFQUFFQSxLQUFLQSxDQUFDQSxDQUFDQSxDQUFDQTtnQkFDbkNBLENBQUNBO2dCQUNEQSxhQUFhQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxLQUFLQSxDQUFDQTtZQUNuQ0EsQ0FBQ0E7WUFDREEsTUFBTUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsTUFBTUEsR0FBR0EsQ0FBQ0EsR0FBR0EsR0FBR0EsS0FBS0EsR0FBR0EsR0FBR0EsRUFBRUEsQ0FBQ0E7UUFDN0NBLENBQUNBLENBQUNBLENBQUNBO1FBQ1BBLE1BQU1BLENBQUNBLElBQUlBLGlCQUFpQkEsQ0FBQ0EsU0FBU0EsRUFBRUEsT0FBT0EsQ0FBQ0EsQ0FBQ0E7SUFDbkRBLENBQUNBO0FBQ0hILENBQUNBO0FBRUQ7SUFDRUksWUFBbUJBLFlBQXNCQSxFQUFTQSxVQUFrQkE7UUFBakRDLGlCQUFZQSxHQUFaQSxZQUFZQSxDQUFVQTtRQUFTQSxlQUFVQSxHQUFWQSxVQUFVQSxDQUFRQTtJQUFHQSxDQUFDQTtBQUMxRUQsQ0FBQ0E7QUFFRDtJQUNFRSxZQUFtQkEsWUFBc0JBLEVBQVNBLFdBQXFCQTtRQUFwREMsaUJBQVlBLEdBQVpBLFlBQVlBLENBQVVBO1FBQVNBLGdCQUFXQSxHQUFYQSxXQUFXQSxDQUFVQTtJQUFHQSxDQUFDQTtBQUM3RUQsQ0FBQ0E7QUFFRDs7R0FFRztBQUNIO0lBQ0VFLFlBQW1CQSxNQUFjQSxFQUFTQSxPQUFtQkE7UUFBMUNDLFdBQU1BLEdBQU5BLE1BQU1BLENBQVFBO1FBQVNBLFlBQU9BLEdBQVBBLE9BQU9BLENBQVlBO0lBQUdBLENBQUNBO0FBQ25FRCxDQUFDQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdHJpbmdXcmFwcGVyLCBpc0JsYW5rfSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuXG52YXIgTU9EVUxFX1JFR0VYUCA9IC8jTU9EVUxFXFxbKFteXFxdXSopXFxdL2c7XG5cbmV4cG9ydCBmdW5jdGlvbiBtb2R1bGVSZWYobW9kdWxlVXJsKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAjTU9EVUxFWyR7bW9kdWxlVXJsfV1gO1xufVxuXG4vKipcbiAqIFJlcHJlc2VudHMgZ2VuZXJhdGVkIHNvdXJjZSBjb2RlIHdpdGggbW9kdWxlIHJlZmVyZW5jZXMuIEludGVybmFsIHRvIHRoZSBBbmd1bGFyIGNvbXBpbGVyLlxuICovXG5leHBvcnQgY2xhc3MgU291cmNlTW9kdWxlIHtcbiAgc3RhdGljIGdldFNvdXJjZVdpdGhvdXRJbXBvcnRzKHNvdXJjZVdpdGhNb2R1bGVSZWZzOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQoc291cmNlV2l0aE1vZHVsZVJlZnMsIE1PRFVMRV9SRUdFWFAsIChtYXRjaCkgPT4gJycpO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHVibGljIG1vZHVsZVVybDogc3RyaW5nLCBwdWJsaWMgc291cmNlV2l0aE1vZHVsZVJlZnM6IHN0cmluZykge31cblxuICBnZXRTb3VyY2VXaXRoSW1wb3J0cygpOiBTb3VyY2VXaXRoSW1wb3J0cyB7XG4gICAgdmFyIG1vZHVsZUFsaWFzZXMgPSB7fTtcbiAgICB2YXIgaW1wb3J0czogc3RyaW5nW11bXSA9IFtdO1xuICAgIHZhciBuZXdTb3VyY2UgPVxuICAgICAgICBTdHJpbmdXcmFwcGVyLnJlcGxhY2VBbGxNYXBwZWQodGhpcy5zb3VyY2VXaXRoTW9kdWxlUmVmcywgTU9EVUxFX1JFR0VYUCwgKG1hdGNoKSA9PiB7XG4gICAgICAgICAgdmFyIG1vZHVsZVVybCA9IG1hdGNoWzFdO1xuICAgICAgICAgIHZhciBhbGlhcyA9IG1vZHVsZUFsaWFzZXNbbW9kdWxlVXJsXTtcbiAgICAgICAgICBpZiAoaXNCbGFuayhhbGlhcykpIHtcbiAgICAgICAgICAgIGlmIChtb2R1bGVVcmwgPT0gdGhpcy5tb2R1bGVVcmwpIHtcbiAgICAgICAgICAgICAgYWxpYXMgPSAnJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFsaWFzID0gYGltcG9ydCR7aW1wb3J0cy5sZW5ndGh9YDtcbiAgICAgICAgICAgICAgaW1wb3J0cy5wdXNoKFttb2R1bGVVcmwsIGFsaWFzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2R1bGVBbGlhc2VzW21vZHVsZVVybF0gPSBhbGlhcztcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFsaWFzLmxlbmd0aCA+IDAgPyBgJHthbGlhc30uYCA6ICcnO1xuICAgICAgICB9KTtcbiAgICByZXR1cm4gbmV3IFNvdXJjZVdpdGhJbXBvcnRzKG5ld1NvdXJjZSwgaW1wb3J0cyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNvdXJjZUV4cHJlc3Npb24ge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgZGVjbGFyYXRpb25zOiBzdHJpbmdbXSwgcHVibGljIGV4cHJlc3Npb246IHN0cmluZykge31cbn1cblxuZXhwb3J0IGNsYXNzIFNvdXJjZUV4cHJlc3Npb25zIHtcbiAgY29uc3RydWN0b3IocHVibGljIGRlY2xhcmF0aW9uczogc3RyaW5nW10sIHB1YmxpYyBleHByZXNzaW9uczogc3RyaW5nW10pIHt9XG59XG5cbi8qKlxuICogUmVwcmVzZW50cyBnZW5lcmF0ZWQgc291cmNlIGNvZGUgd2l0aCBpbXBvcnRzLiBJbnRlcm5hbCB0byB0aGUgQW5ndWxhciBjb21waWxlci5cbiAqL1xuZXhwb3J0IGNsYXNzIFNvdXJjZVdpdGhJbXBvcnRzIHtcbiAgY29uc3RydWN0b3IocHVibGljIHNvdXJjZTogc3RyaW5nLCBwdWJsaWMgaW1wb3J0czogc3RyaW5nW11bXSkge31cbn1cbiJdfQ==