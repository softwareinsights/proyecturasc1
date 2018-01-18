const connection = require('../config/db-connection');

const Tipomaterial = {};

Tipomaterial.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT tipomaterial.* FROM tipomaterial    WHERE created_by = ? HAVING tipomaterial.baja IS NULL OR tipomaterial.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT tipomaterial.* FROM tipomaterial    HAVING tipomaterial.baja IS NULL OR tipomaterial.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial leíd@' });
    });
};

Tipomaterial.findById = (idTipomaterial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM tipomaterial WHERE idtipomaterial = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipomaterial, created_by];
    } else {
        query = 'SELECT * FROM tipomaterial WHERE idtipomaterial = ? HAVING baja IS NULL OR baja = false';
        keys = [idTipomaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial encontrad@' });
    });
};

Tipomaterial.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idtipomaterial) AS count FROM tipomaterial';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial contabilizad@' });
    });
};

Tipomaterial.exist = (idTipomaterial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM tipomaterial WHERE idtipomaterial = ?) AS exist';
    keys = [idTipomaterial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial verificad@' });
    });
};

Tipomaterial.insert = (Tipomaterial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO tipomaterial SET ?';
    keys = [Tipomaterial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial cread@' });
    });
};

Tipomaterial.update = (Tipomaterial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipomaterial SET ? WHERE idtipomaterial = ? AND created_by = ?';
        keys = [Tipomaterial, Tipomaterial.idtipomaterial, created_by];
    } else {
        query = 'UPDATE tipomaterial SET ? WHERE idtipomaterial = ?';
        keys = [Tipomaterial, Tipomaterial.idtipomaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial actualizad@' });
    });
};

Tipomaterial.remove = (idtipomaterial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM tipomaterial WHERE idtipomaterial = ? AND created_by = ?';
        keys = [idtipomaterial, created_by];
    } else {
        query = 'DELETE FROM tipomaterial WHERE idtipomaterial = ?';
        keys = [idtipomaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial eliminad@' });
    });
};

Tipomaterial.logicRemove = (idtipomaterial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE tipomaterial SET baja = 1 WHERE idtipomaterial = ? AND created_by = ?';
        keys = [idtipomaterial, created_by];
    } else {
        query = 'UPDATE tipomaterial SET baja = 1 WHERE idtipomaterial = ?';
        keys = [idtipomaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Tipomaterial eliminad@' });
    });
};

Tipomaterial.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Tipomaterial;
