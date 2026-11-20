using { com.demo.supplier as db } from '../db/schema';

@path: '/supplier'
service SupplierService {
  entity Suppliers as projection on db.Suppliers;

  action approve(ID: UUID) returns Suppliers;
  action reject(ID: UUID, reason: String(500)) returns Suppliers;
}
