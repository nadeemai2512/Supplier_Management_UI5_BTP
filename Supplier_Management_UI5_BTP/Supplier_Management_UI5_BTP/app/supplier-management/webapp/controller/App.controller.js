sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (Controller, MessageToast, MessageBox, Filter, FilterOperator) {
  "use strict";

  return Controller.extend("supplier.management.controller.App", {
    onCreateSupplier: async function () {
      const oView = this.getView();
      const sName = oView.byId("supplierName").getValue().trim();
      const sEmail = oView.byId("email").getValue().trim();

      if (!sName) {
        MessageBox.error("Supplier Name is required.");
        return;
      }
      if (sEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(sEmail)) {
        MessageBox.error("Please enter a valid email address.");
        return;
      }

      const oModel = this.getView().getModel();
      const oListBinding = oModel.bindList("/Suppliers");
      const oContext = oListBinding.create({
        supplierName: sName,
        contactName: oView.byId("contactName").getValue(),
        email: sEmail,
        phone: oView.byId("phone").getValue(),
        country: oView.byId("country").getValue(),
        supplierType: oView.byId("supplierType").getSelectedKey(),
        taxNumber: oView.byId("taxNumber").getValue(),
        status: "PENDING",
        remarks: "Submitted from SAPUI5 application"
      });

      try {
        await oContext.created();
        MessageToast.show("Supplier request submitted successfully.");
        ["supplierName", "contactName", "email", "phone", "taxNumber"].forEach(function (sId) {
          oView.byId(sId).setValue("");
        });
        await oModel.refresh();
      } catch (oError) {
        MessageBox.error(oError.message || "Unable to submit supplier request.");
      }
    },

    onApprove: async function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      const sId = oContext.getProperty("ID");
      const oModel = this.getView().getModel();

      try {
        const oAction = oModel.bindContext("/approve(...)");
        oAction.setParameter("ID", sId);
        await oAction.execute();
        MessageToast.show("Supplier approved.");
        await oModel.refresh();
      } catch (oError) {
        MessageBox.error(oError.message || "Approval failed.");
      }
    },

    onReject: function (oEvent) {
      const oContext = oEvent.getSource().getBindingContext();
      const sId = oContext.getProperty("ID");
      const oModel = this.getView().getModel();

      MessageBox.prompt("Enter rejection reason:", {
        title: "Reject Supplier",
        onClose: async function (sAction, sValue) {
          if (sAction !== MessageBox.Action.OK) {
            return;
          }
          try {
            const oAction = oModel.bindContext("/reject(...)");
            oAction.setParameter("ID", sId);
            oAction.setParameter("reason", sValue || "Rejected by approver");
            await oAction.execute();
            MessageToast.show("Supplier rejected.");
            await oModel.refresh();
          } catch (oError) {
            MessageBox.error(oError.message || "Rejection failed.");
          }
        }
      });
    },

    onSearch: function (oEvent) {
      const sQuery = oEvent.getParameter("newValue") || "";
      const oBinding = this.byId("supplierTable").getBinding("items");
      const aFilters = sQuery ? [
        new Filter("supplierName", FilterOperator.Contains, sQuery)
      ] : [];
      oBinding.filter(aFilters);
    },

    onRefresh: function () {
      this.getView().getModel().refresh();
      MessageToast.show("Supplier list refreshed.");
    }
  });
});
