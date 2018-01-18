const connection = require('../config/db-connection');

const Razonsocial = {};

Razonsocial.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT razonsocial.*, _idtiporazonsocial. as tiporazonsocial_idtiporazonsocial , _idstatusrazonsocial. as statusrazonsocial_idstatusrazonsocial FROM razonsocial INNER JOIN tiporazonsocial as _idtiporazonsocial ON _idtiporazonsocial.idtiporazonsocial = razonsocial.idtiporazonsocial INNER JOIN statusrazonsocial as _idstatusrazonsocial ON _idstatusrazonsocial.idstatusrazonsocial = razonsocial.idstatusrazonsocial   WHERE created_by = ? HAVING razonsocial.baja IS NULL OR razonsocial.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT razonsocial.*, _idtiporazonsocial. as tiporazonsocial_idtiporazonsocial , _idstatusrazonsocial. as statusrazonsocial_idstatusrazonsocial FROM razonsocial INNER JOIN tiporazonsocial as _idtiporazonsocial ON _idtiporazonsocial.idtiporazonsocial = razonsocial.idtiporazonsocial INNER JOIN statusrazonsocial as _idstatusrazonsocial ON _idstatusrazonsocial.idstatusrazonsocial = razonsocial.idstatusrazonsocial   HAVING razonsocial.baja IS NULL OR razonsocial.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial leíd@' });
    });
};

Razonsocial.findById = (idRazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM razonsocial WHERE idrazonsocial = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idRazonsocial, created_by];
    } else {
        query = 'SELECT * FROM razonsocial WHERE idrazonsocial = ? HAVING baja IS NULL OR baja = false';
        keys = [idRazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial encontrad@' });
    });
};

Razonsocial.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idrazonsocial) AS count FROM razonsocial';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial contabilizad@' });
    });
};

Razonsocial.exist = (idRazonsocial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM razonsocial WHERE idrazonsocial = ?) AS exist';
    keys = [idRazonsocial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial verificad@' });
    });
};

Razonsocial.insert = (Razonsocial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO razonsocial SET ?';
    keys = [Razonsocial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial cread@' });
    });
};

Razonsocial.update = (Razonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE razonsocial SET ? WHERE idrazonsocial = ? AND created_by = ?';
        keys = [Razonsocial, Razonsocial.idrazonsocial, created_by];
    } else {
        query = 'UPDATE razonsocial SET ? WHERE idrazonsocial = ?';
        keys = [Razonsocial, Razonsocial.idrazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial actualizad@' });
    });
};

Razonsocial.remove = (idrazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM razonsocial WHERE idrazonsocial = ? AND created_by = ?';
        keys = [idrazonsocial, created_by];
    } else {
        query = 'DELETE FROM razonsocial WHERE idrazonsocial = ?';
        keys = [idrazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial eliminad@' });
    });
};

Razonsocial.logicRemove = (idrazonsocial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE razonsocial SET baja = 1 WHERE idrazonsocial = ? AND created_by = ?';
        keys = [idrazonsocial, created_by];
    } else {
        query = 'UPDATE razonsocial SET baja = 1 WHERE idrazonsocial = ?';
        keys = [idrazonsocial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Razonsocial eliminad@' });
    });
};

Razonsocial.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Razonsocial;
