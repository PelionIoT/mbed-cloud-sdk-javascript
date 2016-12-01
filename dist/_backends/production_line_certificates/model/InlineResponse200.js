(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './ProductionLineCertificate'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ProductionLineCertificate'));
  } else {
    // Browser globals (root is window)
    if (!root.ProvisioningEndpointsProductionLineCertificates) {
      root.ProvisioningEndpointsProductionLineCertificates = {};
    }
    root.ProvisioningEndpointsProductionLineCertificates.InlineResponse200 = factory(root.ProvisioningEndpointsProductionLineCertificates.ApiClient, root.ProvisioningEndpointsProductionLineCertificates.ProductionLineCertificate);
  }
}(this, function(ApiClient, ProductionLineCertificate) {
  'use strict';

  /**
   * The InlineResponse200 model module.
   * @module model/InlineResponse200
   * @version 0.8
   */

  /**
   * Constructs a new <code>InlineResponse200</code>.
   * @alias module:model/InlineResponse200
   * @class
   */
  var exports = function() {







  };

  /**
   * Constructs a <code>InlineResponse200</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/InlineResponse200} obj Optional instance to populate.
   * @return {module:model/InlineResponse200} The populated <code>InlineResponse200</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) { 
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [ProductionLineCertificate]);
      }
      if (data.hasOwnProperty('total_count')) {
        obj['total_count'] = ApiClient.convertToType(data['total_count'], 'Integer');
      }
      if (data.hasOwnProperty('limit')) {
        obj['limit'] = ApiClient.convertToType(data['limit'], 'Integer');
      }
      if (data.hasOwnProperty('after')) {
        obj['after'] = ApiClient.convertToType(data['after'], 'String');
      }
      if (data.hasOwnProperty('object')) {
        obj['object'] = ApiClient.convertToType(data['object'], 'String');
      }
      if (data.hasOwnProperty('order')) {
        obj['order'] = ApiClient.convertToType(data['order'], 'String');
      }
    }
    return obj;
  }


  /**
   * Production line certificates.
   * @member {Array.<module:model/ProductionLineCertificate>} data
   */
  exports.prototype['data'] = undefined;

  /**
   * Currently not used.
   * @member {Integer} total_count
   */
  exports.prototype['total_count'] = undefined;

  /**
   * Currently not used.
   * @member {Integer} limit
   */
  exports.prototype['limit'] = undefined;

  /**
   * Currently not used.
   * @member {String} after
   */
  exports.prototype['after'] = undefined;

  /**
   * \"list\"
   * @member {String} object
   */
  exports.prototype['object'] = undefined;

  /**
   * Currently not used.
   * @member {String} order
   */
  exports.prototype['order'] = undefined;




  return exports;
}));
