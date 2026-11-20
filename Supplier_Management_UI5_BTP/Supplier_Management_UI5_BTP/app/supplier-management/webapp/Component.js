sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/odata/v4/ODataModel"
], function (UIComponent, ODataModel) {
  "use strict";

  return UIComponent.extend("supplier.management.Component", {
    metadata: { manifest: "json" },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);

      const oModel = new ODataModel({
        serviceUrl: "/odata/v4/supplier/",
        synchronizationMode: "None",
        operationMode: "Server",
        autoExpandSelect: true,
        earlyRequests: true
      });
      this.setModel(oModel);
    }
  });
});
