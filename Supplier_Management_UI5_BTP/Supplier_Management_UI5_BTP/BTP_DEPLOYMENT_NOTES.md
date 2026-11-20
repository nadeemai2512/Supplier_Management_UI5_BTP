
# BTP deployment notes

This repository is a complete learning starter, but BTP landscapes differ by enabled services and plans.

Before deployment:
1. Confirm the PostgreSQL service offering and `development` plan exist in your Cloud Foundry marketplace. If not, change the resource in `mta.yaml` to a database service/plan you are entitled to use.
2. For a SAP HANA Cloud deployment, add the CAP HANA adapter (`@cap-js/hana`), configure the HANA resource and use the CAP HANA production profile.
3. The MTA currently defines the CAP service and approuter. To publish the UI5 webapp through the approuter, copy the built UI5 `webapp` content into `approuter/resources` as part of your build pipeline (or adopt the SAP HTML5 Applications Repository content-deployer pattern). This keeps local development simple and makes the frontend hosting step explicit rather than silently assuming it happens.
4. Configure role collections in the BTP cockpit and assign `SupplierUser` / `SupplierApprover` templates to users.
5. Do not use the demo approval actions as a substitute for a production workflow or authorization design.

For local execution, follow README.md. The local run path does not require BTP credentials.
