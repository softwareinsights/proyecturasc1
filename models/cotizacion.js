const connection = require('../config/db-connection');

const Cotizacion = {};

Cotizacion.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT cotizacion.*, _idestatuscotizacion. as estatuscotizacion_idestatuscotizacion , _idrazonsocial. as razonsocial_idrazonsocial , _idobra. as obra_idobra FROM cotizacion INNER JOIN estatuscotizacion as _idestatuscotizacion ON _idestatuscotizacion.idestatuscotizacion = cotizacion.idestatuscotizacion INNER JOIN razonsocial as _idrazonsocial ON _idrazonsocial.idrazonsocial = cotizacion.idrazonsocial INNER JOIN obra as _idobra ON _idobra.idobra = cotizacion.idobra   WHERE created_by = ? HAVING cotizacion.baja IS NULL OR cotizacion.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT cotizacion.*, _idestatuscotizacion. as estatuscotizacion_idestatuscotizacion , _idrazonsocial. as razonsocial_idrazonsocial , _idobra. as obra_idobra FROM cotizacion INNER JOIN estatuscotizacion as _idestatuscotizacion ON _idestatuscotizacion.idestatuscotizacion = cotizacion.idestatuscotizacion INNER JOIN razonsocial as _idrazonsocial ON _idrazonsocial.idrazonsocial = cotizacion.idrazonsocial INNER JOIN obra as _idobra ON _idobra.idobra = cotizacion.idobra   HAVING cotizacion.baja IS NULL OR cotizacion.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion leíd@' });
    });
};

Cotizacion.findById = (idCotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM cotizacion WHERE idcotizacion = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCotizacion, created_by];
    } else {
        query = 'SELECT * FROM cotizacion WHERE idcotizacion = ? HAVING baja IS NULL OR baja = false';
        keys = [idCotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion encontrad@' });
    });
};

Cotizacion.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idcotizacion) AS count FROM cotizacion';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion contabilizad@' });
    });
};

Cotizacion.exist = (idCotizacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM cotizacion WHERE idcotizacion = ?) AS exist';
    keys = [idCotizacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion verificad@' });
    });
};

Cotizacion.insert = (Cotizacion, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO cotizacion SET ?';
    keys = [Cotizacion];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion cread@' });
    });
};

Cotizacion.update = (Cotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE cotizacion SET ? WHERE idcotizacion = ? AND created_by = ?';
        keys = [Cotizacion, Cotizacion.idcotizacion, created_by];
    } else {
        query = 'UPDATE cotizacion SET ? WHERE idcotizacion = ?';
        keys = [Cotizacion, Cotizacion.idcotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion actualizad@' });
    });
};

Cotizacion.remove = (idcotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM cotizacion WHERE idcotizacion = ? AND created_by = ?';
        keys = [idcotizacion, created_by];
    } else {
        query = 'DELETE FROM cotizacion WHERE idcotizacion = ?';
        keys = [idcotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion eliminad@' });
    });
};

Cotizacion.logicRemove = (idcotizacion, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE cotizacion SET baja = 1 WHERE idcotizacion = ? AND created_by = ?';
        keys = [idcotizacion, created_by];
    } else {
        query = 'UPDATE cotizacion SET baja = 1 WHERE idcotizacion = ?';
        keys = [idcotizacion];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Cotizacion eliminad@' });
    });
};

Cotizacion.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Cotizacion;
