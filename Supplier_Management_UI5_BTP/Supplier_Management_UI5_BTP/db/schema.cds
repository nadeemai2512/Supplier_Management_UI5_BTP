namespace com.demo.supplier;

using { cuid, managed } from '@sap/cds/common';

entity Suppliers : cuid, managed {
  supplierName : String(120) not null;
  contactName  : String(100);
  email        : String(120);
  phone        : String(30);
  country      : String(60);
  supplierType : String(20);
  taxNumber    : String(30);
  status       : String(20) default 'PENDING';
  remarks      : String(500);
}
