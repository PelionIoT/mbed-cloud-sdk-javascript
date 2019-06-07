"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var repository_1 = require("../../../common/repository");
var functions_1 = require("../../../legacy/common/functions");
var filters_1 = require("../../../common/filters");
var index_1 = require("../../index");
var pagination_1 = require("../../../common/pagination");
var listResponse_1 = require("../../../legacy/common/listResponse");
/**
 *DeviceEvents repository
 */
var DeviceEventsRepository = /** @class */ (function (_super) {
    __extends(DeviceEventsRepository, _super);
    function DeviceEventsRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * list
     * @param options - Options to use for the List
     */
    DeviceEventsRepository.prototype.list = function (options) {
        var _this = this;
        var pageFunc = function (pageOptions) {
            pageOptions = pageOptions || {};
            return functions_1.apiWrapper(function (resultsFn) {
                _this.client._CallApi({
                    url: "/v3/device-events/",
                    method: "GET",
                    query: {
                        date_time__in: filters_1.extractFilter(pageOptions.filter, "dateTime", "in"),
                        date_time__nin: filters_1.extractFilter(pageOptions.filter, "dateTime", "nin"),
                        date_time__lte: filters_1.extractFilter(pageOptions.filter, "dateTime", "lte"),
                        date_time__gte: filters_1.extractFilter(pageOptions.filter, "dateTime", "gte"),
                        description__eq: filters_1.extractFilter(pageOptions.filter, "description", "eq"),
                        description__neq: filters_1.extractFilter(pageOptions.filter, "description", "neq"),
                        description__in: filters_1.extractFilter(pageOptions.filter, "description", "in"),
                        description__nin: filters_1.extractFilter(pageOptions.filter, "description", "nin"),
                        id__eq: filters_1.extractFilter(pageOptions.filter, "id", "eq"),
                        id__neq: filters_1.extractFilter(pageOptions.filter, "id", "neq"),
                        id__in: filters_1.extractFilter(pageOptions.filter, "id", "in"),
                        id__nin: filters_1.extractFilter(pageOptions.filter, "id", "nin"),
                        device_id__eq: filters_1.extractFilter(pageOptions.filter, "deviceId", "eq"),
                        device_id__neq: filters_1.extractFilter(pageOptions.filter, "deviceId", "neq"),
                        device_id__in: filters_1.extractFilter(pageOptions.filter, "deviceId", "in"),
                        device_id__nin: filters_1.extractFilter(pageOptions.filter, "deviceId", "nin"),
                        event_type__eq: filters_1.extractFilter(pageOptions.filter, "eventType", "eq"),
                        event_type__neq: filters_1.extractFilter(pageOptions.filter, "eventType", "neq"),
                        event_type__in: filters_1.extractFilter(pageOptions.filter, "eventType", "in"),
                        event_type__nin: filters_1.extractFilter(pageOptions.filter, "eventType", "nin"),
                        state_change__eq: filters_1.extractFilter(pageOptions.filter, "stateChange", "eq"),
                        state_change__neq: filters_1.extractFilter(pageOptions.filter, "stateChange", "neq"),
                        after: pageOptions.after,
                        include: pageOptions.include,
                        limit: pageOptions.limit,
                        order: pageOptions.order,
                    },
                }, resultsFn);
            }, function (data, done) {
                done(null, new listResponse_1.ListResponse(data, data.data, index_1.DeviceEventsAdapter.fromApi));
            }, null);
        };
        return new pagination_1.Paginator(pageFunc, options);
    };
    /**
     * read
     * @param id - id
     */
    DeviceEventsRepository.prototype.read = function (id) {
        var _this = this;
        return functions_1.apiWrapper(function (resultsFn) {
            _this.client._CallApi({
                url: "/v3/device-events/{device_event_id}/",
                method: "GET",
                pathParams: {
                    device_event_id: id,
                },
            }, resultsFn);
        }, function (data, done) {
            done(null, index_1.DeviceEventsAdapter.fromApi(data));
        });
    };
    return DeviceEventsRepository;
}(repository_1.Repository));
exports.DeviceEventsRepository = DeviceEventsRepository;
//# sourceMappingURL=deviceEventsRepository.js.map