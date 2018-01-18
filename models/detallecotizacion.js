const connection = require('../config/db-connection');

const Detallecotizacion = {};

Detallecotizacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT detallecotizacion.*, _idcotizacion. as cotizacion_idcotizacion , _idcategoria. as categoria_idcategoria , _idsubcategoria. as subcategoria_idsubcategoria , _idmaterial. as material_idmaterial FROM detallecotizacion INNER JOIN cotizacion as _idcotizacion ON _idcotizacion.idcotizacion = detallecotizacion.idcotizacion INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = detallecotizacion.idcategoria INNER JOIN subcategoria as _idsubcategoria ON _idsubcategoria.idsubcategoria = detallecotizacion.idsubcategoria INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = detallecotizacion.idmaterial   WHERE created_by = ? HAVING detallecotizacion.baja IS NULL OR detallecotizacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT detallecotizacion.*, _idcotizacion. as cotizacion_idcotizacion , _idcategoria. as categoria_idcategoria , _idsubcategoria. as subcategoria_idsubcategoria , _idmaterial. as material_idmaterial FROM detallecotizacion INNER JOIN cotizacion as _idcotizacion ON _idcotizacion.idcotizacion = detallecotizacion.idcotizacion INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = detallecotizacion.idcategoria INNER JOIN subcategoria as _idsubcategoria ON _idsubcategoria.idsubcategoria = detallecotizacion.idsubcategoria INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = detallecotizacion.idmaterial   HAVING detallecotizacion.baja IS NULL OR detallecotizacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion leíd@' });
    });
};

Detallecotizacion.findById = (idDetallecotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM detallecotizacion WHERE iddetallecotizacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idDetallecotizacion, created_by];
    } else {
        query = 'SELECT * FROM detallecotizacion WHERE iddetallecotizacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idDetallecotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion encontrad@' });
    });
};

Detallecotizacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(iddetallecotizacion) AS count FROM detallecotizacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion contabilizad@' });
    });
};

Detallecotizacion.exist = (idDetallecotizacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM detallecotizacion WHERE iddetallecotizacion = ?) AS exist';
    keys = [idDetallecotizacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion verificad@' });
    });
};

Detallecotizacion.insert = (Detallecotizacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO detallecotizacion SET ?';
    keys = [Detallecotizacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion cread@' });
    });
};

Detallecotizacion.update = (Detallecotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE detallecotizacion SET ? WHERE iddetallecotizacion = ? AND created_by = ?';
        keys = [Detallecotizacion, Detallecotizacion.iddetallecotizacion, created_by];
    } else {
        query = 'UPDATE detallecotizacion SET ? WHERE iddetallecotizacion = ?';
        keys = [Detallecotizacion, Detallecotizacion.iddetallecotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion actualizad@' });
    });
};

Detallecotizacion.remove = (iddetallecotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM detallecotizacion WHERE iddetallecotizacion = ? AND created_by = ?';
        keys = [iddetallecotizacion, created_by];
    } else {
        query = 'DELETE FROM detallecotizacion WHERE iddetallecotizacion = ?';
        keys = [iddetallecotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion eliminad@' });
    });
};

Detallecotizacion.logicRemove = (iddetallecotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE detallecotizacion SET baja = 1 WHERE iddetallecotizacion = ? AND created_by = ?';
        keys = [iddetallecotizacion, created_by];
    } else {
        query = 'UPDATE detallecotizacion SET baja = 1 WHERE iddetallecotizacion = ?';
        keys = [iddetallecotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallecotizacion eliminad@' });
    });
};

Detallecotizacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Detallecotizacion;
