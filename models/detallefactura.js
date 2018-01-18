const connection = require('../config/db-connection');

const Detallefactura = {};

Detallefactura.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT detallefactura.*, _idfactura. as factura_idfactura , _idmaterial. as material_idmaterial FROM detallefactura INNER JOIN factura as _idfactura ON _idfactura.idfactura = detallefactura.idfactura INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = detallefactura.idmaterial   WHERE created_by = ? HAVING detallefactura.baja IS NULL OR detallefactura.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT detallefactura.*, _idfactura. as factura_idfactura , _idmaterial. as material_idmaterial FROM detallefactura INNER JOIN factura as _idfactura ON _idfactura.idfactura = detallefactura.idfactura INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = detallefactura.idmaterial   HAVING detallefactura.baja IS NULL OR detallefactura.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura leíd@' });
    });
};

Detallefactura.findById = (idDetallefactura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM detallefactura WHERE iddetallefactura = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idDetallefactura, created_by];
    } else {
        query = 'SELECT * FROM detallefactura WHERE iddetallefactura = ? HAVING baja IS NULL OR baja = false';
        keys = [idDetallefactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura encontrad@' });
    });
};

Detallefactura.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(iddetallefactura) AS count FROM detallefactura';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura contabilizad@' });
    });
};

Detallefactura.exist = (idDetallefactura, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM detallefactura WHERE iddetallefactura = ?) AS exist';
    keys = [idDetallefactura];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura verificad@' });
    });
};

Detallefactura.insert = (Detallefactura, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO detallefactura SET ?';
    keys = [Detallefactura];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura cread@' });
    });
};

Detallefactura.update = (Detallefactura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE detallefactura SET ? WHERE iddetallefactura = ? AND created_by = ?';
        keys = [Detallefactura, Detallefactura.iddetallefactura, created_by];
    } else {
        query = 'UPDATE detallefactura SET ? WHERE iddetallefactura = ?';
        keys = [Detallefactura, Detallefactura.iddetallefactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura actualizad@' });
    });
};

Detallefactura.remove = (iddetallefactura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM detallefactura WHERE iddetallefactura = ? AND created_by = ?';
        keys = [iddetallefactura, created_by];
    } else {
        query = 'DELETE FROM detallefactura WHERE iddetallefactura = ?';
        keys = [iddetallefactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura eliminad@' });
    });
};

Detallefactura.logicRemove = (iddetallefactura, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE detallefactura SET baja = 1 WHERE iddetallefactura = ? AND created_by = ?';
        keys = [iddetallefactura, created_by];
    } else {
        query = 'UPDATE detallefactura SET baja = 1 WHERE iddetallefactura = ?';
        keys = [iddetallefactura];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallefactura eliminad@' });
    });
};

Detallefactura.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Detallefactura;
