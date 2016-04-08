'use strict';var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var http_utils_1 = require('./http_utils');
/**
 * Creates `Response` instances from provided values.
 *
 * Though this object isn't
 * usually instantiated by end-users, it is the primary object interacted with when it comes time to
 * add data to a view.
 *
 * ### Example
 *
 * ```
 * http.request('my-friends.txt').subscribe(response => this.friends = response.text());
 * ```
 *
 * The Response's interface is inspired by the Response constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#response-class), but is considered a static value whose body
 * can be accessed many times. There are other differences in the implementation, but this is the
 * most significant.
 */
var Response = (function () {
    function Response(responseOptions) {
        this._body = responseOptions.body;
        this.status = responseOptions.status;
        this.statusText = responseOptions.statusText;
        this.headers = responseOptions.headers;
        this.type = responseOptions.type;
        this.url = responseOptions.url;
    }
    /**
     * Not yet implemented
     */
    // TODO: Blob return type
    Response.prototype.blob = function () { throw new exceptions_1.BaseException('"blob()" method not implemented on Response superclass'); };
    /**
     * Attempts to return body as parsed `JSON` object, or raises an exception.
     */
    Response.prototype.json = function () {
        var jsonResponse;
        if (http_utils_1.isJsObject(this._body)) {
            jsonResponse = this._body;
        }
        else if (lang_1.isString(this._body)) {
            jsonResponse = lang_1.Json.parse(this._body);
        }
        return jsonResponse;
    };
    /**
     * Returns the body as a string, presuming `toString()` can be called on the response body.
     */
    Response.prototype.text = function () { return this._body.toString(); };
    /**
     * Not yet implemented
     */
    // TODO: ArrayBuffer return type
    Response.prototype.arrayBuffer = function () {
        throw new exceptions_1.BaseException('"arrayBuffer()" method not implemented on Response superclass');
    };
    return Response;
})();
exports.Response = Response;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3Jlc3BvbnNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGlmZmluZ19wbHVnaW5fd3JhcHBlci1vdXRwdXRfcGF0aC1tRlBLaEV3TS50bXAvYW5ndWxhcjIvc3JjL2h0dHAvc3RhdGljX3Jlc3BvbnNlLnRzIl0sIm5hbWVzIjpbIlJlc3BvbnNlIiwiUmVzcG9uc2UuY29uc3RydWN0b3IiLCJSZXNwb25zZS5ibG9iIiwiUmVzcG9uc2UuanNvbiIsIlJlc3BvbnNlLnRleHQiLCJSZXNwb25zZS5hcnJheUJ1ZmZlciJdLCJtYXBwaW5ncyI6IkFBQ0EscUJBQW9ELDBCQUEwQixDQUFDLENBQUE7QUFDL0UsMkJBQThDLGdDQUFnQyxDQUFDLENBQUE7QUFHL0UsMkJBQXlCLGNBQWMsQ0FBQyxDQUFBO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUNIO0lBa0RFQSxrQkFBWUEsZUFBZ0NBO1FBQzFDQyxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxlQUFlQSxDQUFDQSxJQUFJQSxDQUFDQTtRQUNsQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsZUFBZUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7UUFDckNBLElBQUlBLENBQUNBLFVBQVVBLEdBQUdBLGVBQWVBLENBQUNBLFVBQVVBLENBQUNBO1FBQzdDQSxJQUFJQSxDQUFDQSxPQUFPQSxHQUFHQSxlQUFlQSxDQUFDQSxPQUFPQSxDQUFDQTtRQUN2Q0EsSUFBSUEsQ0FBQ0EsSUFBSUEsR0FBR0EsZUFBZUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7UUFDakNBLElBQUlBLENBQUNBLEdBQUdBLEdBQUdBLGVBQWVBLENBQUNBLEdBQUdBLENBQUNBO0lBQ2pDQSxDQUFDQTtJQUVERDs7T0FFR0E7SUFDSEEseUJBQXlCQTtJQUN6QkEsdUJBQUlBLEdBQUpBLGNBQWNFLE1BQU1BLElBQUlBLDBCQUFhQSxDQUFDQSx3REFBd0RBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO0lBRWxHRjs7T0FFR0E7SUFDSEEsdUJBQUlBLEdBQUpBO1FBQ0VHLElBQUlBLFlBQTZCQSxDQUFDQTtRQUNsQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsdUJBQVVBLENBQUNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzNCQSxZQUFZQSxHQUFHQSxJQUFJQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUM1QkEsQ0FBQ0E7UUFBQ0EsSUFBSUEsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDaENBLFlBQVlBLEdBQUdBLFdBQUlBLENBQUNBLEtBQUtBLENBQVNBLElBQUlBLENBQUNBLEtBQUtBLENBQUNBLENBQUNBO1FBQ2hEQSxDQUFDQTtRQUNEQSxNQUFNQSxDQUFDQSxZQUFZQSxDQUFDQTtJQUN0QkEsQ0FBQ0E7SUFFREg7O09BRUdBO0lBQ0hBLHVCQUFJQSxHQUFKQSxjQUFpQkksTUFBTUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsUUFBUUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7SUFFaERKOztPQUVHQTtJQUNIQSxnQ0FBZ0NBO0lBQ2hDQSw4QkFBV0EsR0FBWEE7UUFDRUssTUFBTUEsSUFBSUEsMEJBQWFBLENBQUNBLCtEQUErREEsQ0FBQ0EsQ0FBQ0E7SUFDM0ZBLENBQUNBO0lBQ0hMLGVBQUNBO0FBQURBLENBQUNBLEFBMUZELElBMEZDO0FBMUZZLGdCQUFRLFdBMEZwQixDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtSZXNwb25zZVR5cGV9IGZyb20gJy4vZW51bXMnO1xuaW1wb3J0IHtDT05TVF9FWFBSLCBpc1N0cmluZywgaXNQcmVzZW50LCBKc29ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9uLCBXcmFwcGVkRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtIZWFkZXJzfSBmcm9tICcuL2hlYWRlcnMnO1xuaW1wb3J0IHtSZXNwb25zZU9wdGlvbnN9IGZyb20gJy4vYmFzZV9yZXNwb25zZV9vcHRpb25zJztcbmltcG9ydCB7aXNKc09iamVjdH0gZnJvbSAnLi9odHRwX3V0aWxzJztcblxuLyoqXG4gKiBDcmVhdGVzIGBSZXNwb25zZWAgaW5zdGFuY2VzIGZyb20gcHJvdmlkZWQgdmFsdWVzLlxuICpcbiAqIFRob3VnaCB0aGlzIG9iamVjdCBpc24ndFxuICogdXN1YWxseSBpbnN0YW50aWF0ZWQgYnkgZW5kLXVzZXJzLCBpdCBpcyB0aGUgcHJpbWFyeSBvYmplY3QgaW50ZXJhY3RlZCB3aXRoIHdoZW4gaXQgY29tZXMgdGltZSB0b1xuICogYWRkIGRhdGEgdG8gYSB2aWV3LlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKlxuICogYGBgXG4gKiBodHRwLnJlcXVlc3QoJ215LWZyaWVuZHMudHh0Jykuc3Vic2NyaWJlKHJlc3BvbnNlID0+IHRoaXMuZnJpZW5kcyA9IHJlc3BvbnNlLnRleHQoKSk7XG4gKiBgYGBcbiAqXG4gKiBUaGUgUmVzcG9uc2UncyBpbnRlcmZhY2UgaXMgaW5zcGlyZWQgYnkgdGhlIFJlc3BvbnNlIGNvbnN0cnVjdG9yIGRlZmluZWQgaW4gdGhlIFtGZXRjaFxuICogU3BlY10oaHR0cHM6Ly9mZXRjaC5zcGVjLndoYXR3Zy5vcmcvI3Jlc3BvbnNlLWNsYXNzKSwgYnV0IGlzIGNvbnNpZGVyZWQgYSBzdGF0aWMgdmFsdWUgd2hvc2UgYm9keVxuICogY2FuIGJlIGFjY2Vzc2VkIG1hbnkgdGltZXMuIFRoZXJlIGFyZSBvdGhlciBkaWZmZXJlbmNlcyBpbiB0aGUgaW1wbGVtZW50YXRpb24sIGJ1dCB0aGlzIGlzIHRoZVxuICogbW9zdCBzaWduaWZpY2FudC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlc3BvbnNlIHtcbiAgLyoqXG4gICAqIE9uZSBvZiBcImJhc2ljXCIsIFwiY29yc1wiLCBcImRlZmF1bHRcIiwgXCJlcnJvciwgb3IgXCJvcGFxdWVcIi5cbiAgICpcbiAgICogRGVmYXVsdHMgdG8gXCJkZWZhdWx0XCIuXG4gICAqL1xuICB0eXBlOiBSZXNwb25zZVR5cGU7XG4gIC8qKlxuICAgKiBUcnVlIGlmIHRoZSByZXNwb25zZSdzIHN0YXR1cyBpcyB3aXRoaW4gMjAwLTI5OVxuICAgKi9cbiAgb2s6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBVUkwgb2YgcmVzcG9uc2UuXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGVtcHR5IHN0cmluZy5cbiAgICovXG4gIHVybDogc3RyaW5nO1xuICAvKipcbiAgICogU3RhdHVzIGNvZGUgcmV0dXJuZWQgYnkgc2VydmVyLlxuICAgKlxuICAgKiBEZWZhdWx0cyB0byAyMDAuXG4gICAqL1xuICBzdGF0dXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIFRleHQgcmVwcmVzZW50aW5nIHRoZSBjb3JyZXNwb25kaW5nIHJlYXNvbiBwaHJhc2UgdG8gdGhlIGBzdGF0dXNgLCBhcyBkZWZpbmVkIGluIFtpZXRmIHJmYyAyNjE2XG4gICAqIHNlY3Rpb24gNi4xLjFdKGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmMyNjE2I3NlY3Rpb24tNi4xLjEpXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIFwiT0tcIlxuICAgKi9cbiAgc3RhdHVzVGV4dDogc3RyaW5nO1xuICAvKipcbiAgICogTm9uLXN0YW5kYXJkIHByb3BlcnR5XG4gICAqXG4gICAqIERlbm90ZXMgaG93IG1hbnkgb2YgdGhlIHJlc3BvbnNlIGJvZHkncyBieXRlcyBoYXZlIGJlZW4gbG9hZGVkLCBmb3IgZXhhbXBsZSBpZiB0aGUgcmVzcG9uc2UgaXNcbiAgICogdGhlIHJlc3VsdCBvZiBhIHByb2dyZXNzIGV2ZW50LlxuICAgKi9cbiAgYnl0ZXNMb2FkZWQ6IG51bWJlcjtcbiAgLyoqXG4gICAqIE5vbi1zdGFuZGFyZCBwcm9wZXJ0eVxuICAgKlxuICAgKiBEZW5vdGVzIGhvdyBtYW55IGJ5dGVzIGFyZSBleHBlY3RlZCBpbiB0aGUgZmluYWwgcmVzcG9uc2UgYm9keS5cbiAgICovXG4gIHRvdGFsQnl0ZXM6IG51bWJlcjtcbiAgLyoqXG4gICAqIEhlYWRlcnMgb2JqZWN0IGJhc2VkIG9uIHRoZSBgSGVhZGVyc2AgY2xhc3MgaW4gdGhlIFtGZXRjaFxuICAgKiBTcGVjXShodHRwczovL2ZldGNoLnNwZWMud2hhdHdnLm9yZy8jaGVhZGVycy1jbGFzcykuXG4gICAqL1xuICBoZWFkZXJzOiBIZWFkZXJzO1xuICAvLyBUT0RPOiBTdXBwb3J0IEFycmF5QnVmZmVyLCBKU09OLCBGb3JtRGF0YSwgQmxvYlxuICBwcml2YXRlIF9ib2R5OiBzdHJpbmcgfCBPYmplY3Q7XG4gIGNvbnN0cnVjdG9yKHJlc3BvbnNlT3B0aW9uczogUmVzcG9uc2VPcHRpb25zKSB7XG4gICAgdGhpcy5fYm9keSA9IHJlc3BvbnNlT3B0aW9ucy5ib2R5O1xuICAgIHRoaXMuc3RhdHVzID0gcmVzcG9uc2VPcHRpb25zLnN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1RleHQgPSByZXNwb25zZU9wdGlvbnMuc3RhdHVzVGV4dDtcbiAgICB0aGlzLmhlYWRlcnMgPSByZXNwb25zZU9wdGlvbnMuaGVhZGVycztcbiAgICB0aGlzLnR5cGUgPSByZXNwb25zZU9wdGlvbnMudHlwZTtcbiAgICB0aGlzLnVybCA9IHJlc3BvbnNlT3B0aW9ucy51cmw7XG4gIH1cblxuICAvKipcbiAgICogTm90IHlldCBpbXBsZW1lbnRlZFxuICAgKi9cbiAgLy8gVE9ETzogQmxvYiByZXR1cm4gdHlwZVxuICBibG9iKCk6IGFueSB7IHRocm93IG5ldyBCYXNlRXhjZXB0aW9uKCdcImJsb2IoKVwiIG1ldGhvZCBub3QgaW1wbGVtZW50ZWQgb24gUmVzcG9uc2Ugc3VwZXJjbGFzcycpOyB9XG5cbiAgLyoqXG4gICAqIEF0dGVtcHRzIHRvIHJldHVybiBib2R5IGFzIHBhcnNlZCBgSlNPTmAgb2JqZWN0LCBvciByYWlzZXMgYW4gZXhjZXB0aW9uLlxuICAgKi9cbiAganNvbigpOiBhbnkge1xuICAgIHZhciBqc29uUmVzcG9uc2U6IHN0cmluZyB8IE9iamVjdDtcbiAgICBpZiAoaXNKc09iamVjdCh0aGlzLl9ib2R5KSkge1xuICAgICAganNvblJlc3BvbnNlID0gdGhpcy5fYm9keTtcbiAgICB9IGVsc2UgaWYgKGlzU3RyaW5nKHRoaXMuX2JvZHkpKSB7XG4gICAgICBqc29uUmVzcG9uc2UgPSBKc29uLnBhcnNlKDxzdHJpbmc+dGhpcy5fYm9keSk7XG4gICAgfVxuICAgIHJldHVybiBqc29uUmVzcG9uc2U7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgYm9keSBhcyBhIHN0cmluZywgcHJlc3VtaW5nIGB0b1N0cmluZygpYCBjYW4gYmUgY2FsbGVkIG9uIHRoZSByZXNwb25zZSBib2R5LlxuICAgKi9cbiAgdGV4dCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYm9keS50b1N0cmluZygpOyB9XG5cbiAgLyoqXG4gICAqIE5vdCB5ZXQgaW1wbGVtZW50ZWRcbiAgICovXG4gIC8vIFRPRE86IEFycmF5QnVmZmVyIHJldHVybiB0eXBlXG4gIGFycmF5QnVmZmVyKCk6IGFueSB7XG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oJ1wiYXJyYXlCdWZmZXIoKVwiIG1ldGhvZCBub3QgaW1wbGVtZW50ZWQgb24gUmVzcG9uc2Ugc3VwZXJjbGFzcycpO1xuICB9XG59XG4iXX0=