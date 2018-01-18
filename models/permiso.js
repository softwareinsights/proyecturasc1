const connection = require('../config/db-connection');

const Permiso = {};

Permiso.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT permiso.* FROM permiso    WHERE created_by = ? HAVING permiso.baja IS NULL OR permiso.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT permiso.* FROM permiso    HAVING permiso.baja IS NULL OR permiso.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso leíd@' });
    });
};

Permiso.findById = (idPermiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM permiso WHERE idpermiso = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermiso, created_by];
    } else {
        query = 'SELECT * FROM permiso WHERE idpermiso = ? HAVING baja IS NULL OR baja = false';
        keys = [idPermiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso encontrad@' });
    });
};

Permiso.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idpermiso) AS count FROM permiso';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso contabilizad@' });
    });
};

Permiso.exist = (idPermiso, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM permiso WHERE idpermiso = ?) AS exist';
    keys = [idPermiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Permiso verificad@' });
    });
};

Permiso.insert = (Permiso, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO permiso SET ?';
    keys = [Permiso];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Permiso cread@' });
    });
};

Permiso.update = (Permiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permiso SET ? WHERE idpermiso = ? AND created_by = ?';
        keys = [Permiso, Permiso.idpermiso, created_by];
    } else {
        query = 'UPDATE permiso SET ? WHERE idpermiso = ?';
        keys = [Permiso, Permiso.idpermiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso actualizad@' });
    });
};

Permiso.remove = (idpermiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM permiso WHERE idpermiso = ? AND created_by = ?';
        keys = [idpermiso, created_by];
    } else {
        query = 'DELETE FROM permiso WHERE idpermiso = ?';
        keys = [idpermiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso eliminad@' });
    });
};

Permiso.logicRemove = (idpermiso, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE permiso SET baja = 1 WHERE idpermiso = ? AND created_by = ?';
        keys = [idpermiso, created_by];
    } else {
        query = 'UPDATE permiso SET baja = 1 WHERE idpermiso = ?';
        keys = [idpermiso];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Permiso eliminad@' });
    });
};

Permiso.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Permiso;
