const connection = require('../config/db-connection');

const Factura = {};

Factura.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT factura.*, _idrazonsocialemisor. as razonsocial_idrazonsocialemisor FROM factura INNER JOIN razonsocial as _idrazonsocialemisor ON _idrazonsocialemisor.idrazonsocial = factura.idrazonsocialemisor   WHERE created_by = ? HAVING factura.baja IS NULL OR factura.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT factura.*, _idrazonsocialemisor. as razonsocial_idrazonsocialemisor FROM factura INNER JOIN razonsocial as _idrazonsocialemisor ON _idrazonsocialemisor.idrazonsocial = factura.idrazonsocialemisor   HAVING factura.baja IS NULL OR factura.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Factura leíd@' });
    });
};

Factura.findById = (idFactura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM factura WHERE idfactura = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idFactura, created_by];
    } else {
        query = 'SELECT * FROM factura WHERE idfactura = ? HAVING baja IS NULL OR baja = false';
        keys = [idFactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Factura encontrad@' });
    });
};

Factura.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idfactura) AS count FROM factura';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Factura contabilizad@' });
    });
};

Factura.exist = (idFactura, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM factura WHERE idfactura = ?) AS exist';
    keys = [idFactura];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Factura verificad@' });
    });
};

Factura.insert = (Factura, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO factura SET ?';
    keys = [Factura];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Factura cread@' });
    });
};

Factura.update = (Factura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE factura SET ? WHERE idfactura = ? AND created_by = ?';
        keys = [Factura, Factura.idfactura, created_by];
    } else {
        query = 'UPDATE factura SET ? WHERE idfactura = ?';
        keys = [Factura, Factura.idfactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Factura actualizad@' });
    });
};

Factura.remove = (idfactura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM factura WHERE idfactura = ? AND created_by = ?';
        keys = [idfactura, created_by];
    } else {
        query = 'DELETE FROM factura WHERE idfactura = ?';
        keys = [idfactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Factura eliminad@' });
    });
};

Factura.logicRemove = (idfactura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE factura SET baja = 1 WHERE idfactura = ? AND created_by = ?';
        keys = [idfactura, created_by];
    } else {
        query = 'UPDATE factura SET baja = 1 WHERE idfactura = ?';
        keys = [idfactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Factura eliminad@' });
    });
};

Factura.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Factura;
