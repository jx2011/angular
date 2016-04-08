export function getTypeOf(instance) {
    return instance.constructor;
}
export function instantiateType(type, params = []) {
    var instance = Object.create(type.prototype);
    instance.constructor.apply(instance, params);
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZ191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtZXQ4SDA3V0IudG1wL2FuZ3VsYXIyL3NyYy90ZXN0aW5nL2xhbmdfdXRpbHMudHMiXSwibmFtZXMiOlsiZ2V0VHlwZU9mIiwiaW5zdGFudGlhdGVUeXBlIl0sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEIsUUFBUTtJQUNoQ0EsTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsV0FBV0EsQ0FBQ0E7QUFDOUJBLENBQUNBO0FBRUQsZ0NBQWdDLElBQWMsRUFBRSxNQUFNLEdBQVUsRUFBRTtJQUNoRUMsSUFBSUEsUUFBUUEsR0FBR0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0E7SUFDN0NBLFFBQVFBLENBQUNBLFdBQVdBLENBQUNBLEtBQUtBLENBQUNBLFFBQVFBLEVBQUVBLE1BQU1BLENBQUNBLENBQUNBO0lBQzdDQSxNQUFNQSxDQUFDQSxRQUFRQSxDQUFDQTtBQUNsQkEsQ0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0VHlwZU9mKGluc3RhbmNlKSB7XG4gIHJldHVybiBpbnN0YW5jZS5jb25zdHJ1Y3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbnRpYXRlVHlwZSh0eXBlOiBGdW5jdGlvbiwgcGFyYW1zOiBhbnlbXSA9IFtdKSB7XG4gIHZhciBpbnN0YW5jZSA9IE9iamVjdC5jcmVhdGUodHlwZS5wcm90b3R5cGUpO1xuICBpbnN0YW5jZS5jb25zdHJ1Y3Rvci5hcHBseShpbnN0YW5jZSwgcGFyYW1zKTtcbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuIl19