# Supplier Management Portal — SAPUI5 + SAP BTP CAP

A starter full-stack project containing:
- SAPUI5 (OpenUI5) frontend
- SAP Cloud Application Programming Model (CAP) Node.js backend
- OData V4 service
- SQLite for local development
- SAP BTP Cloud Foundry deployment descriptor (MTA)
- XSUAA security configuration and approuter

## Project structure

```text
Supplier_Management_UI5_BTP/
├── app/
│   └── supplier-management/
│       ├── webapp/
│       │   ├── controller/
│       │   ├── view/
│       │   ├── model/
│       │   ├── i18n/
│       │   ├── Component.js
│       │   ├── manifest.json
│       │   └── index.html
│       ├── package.json
│       └── ui5.yaml
├── db/
│   └── schema.cds
├── srv/
│   └── supplier-service.cds
├── approuter/
│   ├── package.json
│   └── xs-app.json
├── mta.yaml
├── xs-security.json
└── package.json
```

## Requirements

- Node.js 20 LTS (or a currently supported Node.js version for your CAP toolchain)
- npm
- SAP Business Application Studio or VS Code
- For BTP deployment: Cloud Foundry CLI, MBT build tool, and access to an SAP BTP Cloud Foundry subaccount

## Run locally

Open a terminal in the project root:

```bash
npm install
npm run watch
```

In a second terminal:

```bash
cd app/supplier-management
npm install
npm start
```

Open the UI5 app at `http://localhost:8080`.

The UI5 dev server proxies `/odata` to the CAP server at `http://localhost:4004`.
CAP OData endpoint: `http://localhost:4004/odata/v4/supplier/`.

If port 4004 is occupied, stop the other process or start CAP on another port and update `app/supplier-management/ui5.yaml`.

## Features

1. Create a supplier request
2. List supplier requests
3. Search by supplier name
4. Approve or reject a pending request
5. Track request status
6. Persist data in SQLite locally

## Test data

On first start, CAP loads `db/data/com.demo.supplier-Suppliers.csv`.

## BTP deployment overview

This project includes an MTA descriptor for deploying:
- CAP service
- XSUAA service instance
- Application router

The frontend is served as a static UI5 application by the approuter in this starter setup. For a production landscape, consider moving the UI5 content to the SAP HTML5 Applications Repository and configuring destination/content services according to your organization's BTP architecture.

### Build and deploy

Log in to your Cloud Foundry space first:

```bash
cf login -a <API_ENDPOINT>
```

Then from the project root:

```bash
npm install
npm install --global mbt
mbt build -t mta_archives
cf deploy mta_archives/supplier-management_1.0.0.mtar
```

If your subaccount uses a different service plan or service offering, adjust the `mta.yaml` resource plans before deployment. Ensure the required entitlements are available.

### After deployment

Find the deployed approuter route:

```bash
cf apps
```

Open the approuter application's route in a browser and sign in with an authorized BTP user.

## Important implementation notes

- The local profile uses SQLite. The production MTA descriptor provisions a PostgreSQL service placeholder; change it to the database service available and entitled in your BTP subaccount. If you use SAP HANA Cloud, replace the database resource and configure the CAP HANA build/deployment profile accordingly.
- The approval action is a demo business action. In production, enforce role-based authorization, audit logging, workflow integration, and server-side validation.
- Do not put credentials, service keys, or secrets into source control.
