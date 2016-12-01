(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['../ApiClient', './FactoryToolDownload'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./FactoryToolDownload'));
  } else {
    // Browser globals (root is window)
    if (!root.ProvisioningEndpointsTheFactoryProvisioningPackage) {
      root.ProvisioningEndpointsTheFactoryProvisioningPackage = {};
    }
    root.ProvisioningEndpointsTheFactoryProvisioningPackage.InlineResponse200 = factory(root.ProvisioningEndpointsTheFactoryProvisioningPackage.ApiClient, root.ProvisioningEndpointsTheFactoryProvisioningPackage.FactoryToolDownload);
  }
}(this, function(ApiClient, FactoryToolDownload) {
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

      if (data.hasOwnProperty('linArchiveInfo')) {
        obj['linArchiveInfo'] = FactoryToolDownload.constructFromObject(data['linArchiveInfo']);
      }
      if (data.hasOwnProperty('winArchiveInfo')) {
        obj['winArchiveInfo'] = FactoryToolDownload.constructFromObject(data['winArchiveInfo']);
      }
    }
    return obj;
  }


  /**
   * @member {module:model/FactoryToolDownload} linArchiveInfo
   */
  exports.prototype['linArchiveInfo'] = undefined;

  /**
   * @member {module:model/FactoryToolDownload} winArchiveInfo
   */
  exports.prototype['winArchiveInfo'] = undefined;




  return exports;
}));
