const cds = require('@sap/cds');

module.exports = (srv) => {
  const { Suppliers } = srv.entities;

  srv.on('approve', async (req) => {
    const { ID } = req.data;
    const tx = cds.tx(req);
    const result = await tx.run(
      UPDATE(Suppliers).set({ status: 'APPROVED', remarks: 'Approved' })
        .where({ ID, status: 'PENDING' })
    );
    if (!result) req.reject(409, 'Request was not found or is no longer pending.');
    return tx.run(SELECT.one.from(Suppliers).where({ ID }));
  });

  srv.on('reject', async (req) => {
    const { ID, reason } = req.data;
    const tx = cds.tx(req);
    const result = await tx.run(
      UPDATE(Suppliers).set({ status: 'REJECTED', remarks: reason || 'Rejected' })
        .where({ ID, status: 'PENDING' })
    );
    if (!result) req.reject(409, 'Request was not found or is no longer pending.');
    return tx.run(SELECT.one.from(Suppliers).where({ ID }));
  });
};
