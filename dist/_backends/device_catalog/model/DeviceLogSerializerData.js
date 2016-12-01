/**
 * Device Catalog API
 * This is the API Documentation for the mbed device catalog update service.
 *
 * OpenAPI spec version: 0.1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.DeviceCatalogApi) {
      root.DeviceCatalogApi = {};
    }
    root.DeviceCatalogApi.DeviceLogSerializerData = factory(root.DeviceCatalogApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The DeviceLogSerializerData model module.
   * @module model/DeviceLogSerializerData
   * @version 0.1
   */

  /**
   * Constructs a new <code>DeviceLogSerializerData</code>.
   * @alias module:model/DeviceLogSerializerData
   * @class
   * @param dateTime {Date} 
   */
  var exports = function(dateTime) {
    var _this = this;

    _this['date_time'] = dateTime;








  };

  /**
   * Constructs a <code>DeviceLogSerializerData</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DeviceLogSerializerData} obj Optional instance to populate.
   * @return {module:model/DeviceLogSerializerData} The populated <code>DeviceLogSerializerData</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('date_time')) {
        obj['date_time'] = ApiClient.convertToType(data['date_time'], 'Date');
      }
      if (data.hasOwnProperty('state_change')) {
        obj['state_change'] = ApiClient.convertToType(data['state_change'], 'Boolean');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('changes')) {
        obj['changes'] = ApiClient.convertToType(data['changes'], 'String');
      }
      if (data.hasOwnProperty('event_type_description')) {
        obj['event_type_description'] = ApiClient.convertToType(data['event_type_description'], 'String');
      }
      if (data.hasOwnProperty('device_log_id')) {
        obj['device_log_id'] = ApiClient.convertToType(data['device_log_id'], 'String');
      }
      if (data.hasOwnProperty('event_type')) {
        obj['event_type'] = ApiClient.convertToType(data['event_type'], 'String');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], 'String');
      }
      if (data.hasOwnProperty('device_id')) {
        obj['device_id'] = ApiClient.convertToType(data['device_id'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Date} date_time
   */
  exports.prototype['date_time'] = undefined;
  /**
   * @member {Boolean} state_change
   */
  exports.prototype['state_change'] = undefined;
  /**
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {String} changes
   */
  exports.prototype['changes'] = undefined;
  /**
   * @member {String} event_type_description
   */
  exports.prototype['event_type_description'] = undefined;
  /**
   * @member {String} device_log_id
   */
  exports.prototype['device_log_id'] = undefined;
  /**
   * @member {module:model/DeviceLogSerializerData.EventTypeEnum} event_type
   */
  exports.prototype['event_type'] = undefined;
  /**
   * @member {String} data
   */
  exports.prototype['data'] = undefined;
  /**
   * @member {String} device_id
   */
  exports.prototype['device_id'] = undefined;


  /**
   * Allowed values for the <code>event_type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.EventTypeEnum = {
    /**
     * value: "update.device.device-created"
     * @const
     */
    "device.device-created": "update.device.device-created",
    /**
     * value: "update.device.device-updated"
     * @const
     */
    "device.device-updated": "update.device.device-updated",
    /**
     * value: "update.deployment.campaign-device-metadata-created"
     * @const
     */
    "deployment.campaign-device-metadata-created": "update.deployment.campaign-device-metadata-created",
    /**
     * value: "update.deployment.campaign-device-metadata-updated"
     * @const
     */
    "deployment.campaign-device-metadata-updated": "update.deployment.campaign-device-metadata-updated",
    /**
     * value: "update.deployment.campaign-device-metadata-removed"
     * @const
     */
    "deployment.campaign-device-metadata-removed": "update.deployment.campaign-device-metadata-removed",
    /**
     * value: "update.connector.connector-device.firmware-update.state"
     * @const
     */
    "connector.connector-device.firmware-update.state": "update.connector.connector-device.firmware-update.state",
    /**
     * value: "update.connector.connector-device.firmware-update.result"
     * @const
     */
    "connector.connector-device.firmware-update.result": "update.connector.connector-device.firmware-update.result"  };


  return exports;
}));


