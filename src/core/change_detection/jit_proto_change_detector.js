'use strict';var change_detection_jit_generator_1 = require('./change_detection_jit_generator');
var JitProtoChangeDetector = (function () {
    function JitProtoChangeDetector(definition) {
        this.definition = definition;
        this._factory = this._createFactory(definition);
    }
    JitProtoChangeDetector.isSupported = function () { return true; };
    JitProtoChangeDetector.prototype.instantiate = function () { return this._factory(); };
    /** @internal */
    JitProtoChangeDetector.prototype._createFactory = function (definition) {
        return new change_detection_jit_generator_1.ChangeDetectorJITGenerator(definition, 'util', 'AbstractChangeDetector', 'ChangeDetectorStatus')
            .generate();
    };
    return JitProtoChangeDetector;
})();
exports.JitProtoChangeDetector = JitProtoChangeDetector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaml0X3Byb3RvX2NoYW5nZV9kZXRlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRpZmZpbmdfcGx1Z2luX3dyYXBwZXItb3V0cHV0X3BhdGgtbUZQS2hFd00udG1wL2FuZ3VsYXIyL3NyYy9jb3JlL2NoYW5nZV9kZXRlY3Rpb24vaml0X3Byb3RvX2NoYW5nZV9kZXRlY3Rvci50cyJdLCJuYW1lcyI6WyJKaXRQcm90b0NoYW5nZURldGVjdG9yIiwiSml0UHJvdG9DaGFuZ2VEZXRlY3Rvci5jb25zdHJ1Y3RvciIsIkppdFByb3RvQ2hhbmdlRGV0ZWN0b3IuaXNTdXBwb3J0ZWQiLCJKaXRQcm90b0NoYW5nZURldGVjdG9yLmluc3RhbnRpYXRlIiwiSml0UHJvdG9DaGFuZ2VEZXRlY3Rvci5fY3JlYXRlRmFjdG9yeSJdLCJtYXBwaW5ncyI6IkFBSUEsK0NBQXlDLGtDQUFrQyxDQUFDLENBQUE7QUFFNUU7SUFJRUEsZ0NBQW9CQSxVQUFvQ0E7UUFBcENDLGVBQVVBLEdBQVZBLFVBQVVBLENBQTBCQTtRQUN0REEsSUFBSUEsQ0FBQ0EsUUFBUUEsR0FBR0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsQ0FBQ0EsQ0FBQ0E7SUFDbERBLENBQUNBO0lBRU1ELGtDQUFXQSxHQUFsQkEsY0FBZ0NFLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLENBQUNBLENBQUNBO0lBRTlDRiw0Q0FBV0EsR0FBWEEsY0FBZ0NHLE1BQU1BLENBQUNBLElBQUlBLENBQUNBLFFBQVFBLEVBQUVBLENBQUNBLENBQUNBLENBQUNBO0lBRXpESCxnQkFBZ0JBO0lBQ2hCQSwrQ0FBY0EsR0FBZEEsVUFBZUEsVUFBb0NBO1FBQ2pESSxNQUFNQSxDQUFDQSxJQUFJQSwyREFBMEJBLENBQUNBLFVBQVVBLEVBQUVBLE1BQU1BLEVBQUVBLHdCQUF3QkEsRUFDNUNBLHNCQUFzQkEsQ0FBQ0E7YUFDeERBLFFBQVFBLEVBQUVBLENBQUNBO0lBQ2xCQSxDQUFDQTtJQUNISiw2QkFBQ0E7QUFBREEsQ0FBQ0EsQUFsQkQsSUFrQkM7QUFsQlksOEJBQXNCLHlCQWtCbEMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TGlzdFdyYXBwZXJ9IGZyb20gJ2FuZ3VsYXIyL3NyYy9mYWNhZGUvY29sbGVjdGlvbic7XG5pbXBvcnQge2lzUHJlc2VudH0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9sYW5nJztcblxuaW1wb3J0IHtQcm90b0NoYW5nZURldGVjdG9yLCBDaGFuZ2VEZXRlY3RvciwgQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9ufSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvckpJVEdlbmVyYXRvcn0gZnJvbSAnLi9jaGFuZ2VfZGV0ZWN0aW9uX2ppdF9nZW5lcmF0b3InO1xuXG5leHBvcnQgY2xhc3MgSml0UHJvdG9DaGFuZ2VEZXRlY3RvciBpbXBsZW1lbnRzIFByb3RvQ2hhbmdlRGV0ZWN0b3Ige1xuICAvKiogQGludGVybmFsICovXG4gIF9mYWN0b3J5OiBGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGRlZmluaXRpb246IENoYW5nZURldGVjdG9yRGVmaW5pdGlvbikge1xuICAgIHRoaXMuX2ZhY3RvcnkgPSB0aGlzLl9jcmVhdGVGYWN0b3J5KGRlZmluaXRpb24pO1xuICB9XG5cbiAgc3RhdGljIGlzU3VwcG9ydGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxuXG4gIGluc3RhbnRpYXRlKCk6IENoYW5nZURldGVjdG9yIHsgcmV0dXJuIHRoaXMuX2ZhY3RvcnkoKTsgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgX2NyZWF0ZUZhY3RvcnkoZGVmaW5pdGlvbjogQ2hhbmdlRGV0ZWN0b3JEZWZpbml0aW9uKSB7XG4gICAgcmV0dXJuIG5ldyBDaGFuZ2VEZXRlY3RvckpJVEdlbmVyYXRvcihkZWZpbml0aW9uLCAndXRpbCcsICdBYnN0cmFjdENoYW5nZURldGVjdG9yJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdDaGFuZ2VEZXRlY3RvclN0YXR1cycpXG4gICAgICAgIC5nZW5lcmF0ZSgpO1xuICB9XG59XG4iXX0=