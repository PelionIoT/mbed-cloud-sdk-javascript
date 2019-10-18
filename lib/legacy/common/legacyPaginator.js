"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Run `execute` for all items returned from getPage, one page at a time. If any call to getPage or execute fails, the resulting promise is rejected.
 * @typeparam T  object that contains an Id property
 * @param getPage The function for receiving a page
 * @param execute The function to execute on each item
 */
exports.executeForAll = function (getPage, execute) {
    var recur = function (after) {
        return getPage({ after: after })
            .then(function (_a) {
            var data = _a.data, hasMore = _a.hasMore;
            var executePromises = data.map(function (_a) {
                var id = _a.id;
                return execute(id);
            });
            // Execute for all items in current page, then recur
            return Promise.all(executePromises)
                .then(function () {
                return hasMore ? recur(data[data.length - 1].id) : null;
            });
        });
    };
    return recur();
};
//# sourceMappingURL=legacyPaginator.js.map