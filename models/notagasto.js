const connection = require('../config/db-connection');

const Notagasto = {};

Notagasto.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT notagasto.*, _idrazonsocialemisor. as razonsocial_idrazonsocialemisor FROM notagasto INNER JOIN razonsocial as _idrazonsocialemisor ON _idrazonsocialemisor.idrazonsocial = notagasto.idrazonsocialemisor   WHERE created_by = ? HAVING notagasto.baja IS NULL OR notagasto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT notagasto.*, _idrazonsocialemisor. as razonsocial_idrazonsocialemisor FROM notagasto INNER JOIN razonsocial as _idrazonsocialemisor ON _idrazonsocialemisor.idrazonsocial = notagasto.idrazonsocialemisor   HAVING notagasto.baja IS NULL OR notagasto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto leíd@' });
    });
};

Notagasto.findById = (idNotagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM notagasto WHERE idnotagasto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idNotagasto, created_by];
    } else {
        query = 'SELECT * FROM notagasto WHERE idnotagasto = ? HAVING baja IS NULL OR baja = false';
        keys = [idNotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto encontrad@' });
    });
};

Notagasto.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idnotagasto) AS count FROM notagasto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto contabilizad@' });
    });
};

Notagasto.exist = (idNotagasto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM notagasto WHERE idnotagasto = ?) AS exist';
    keys = [idNotagasto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto verificad@' });
    });
};

Notagasto.insert = (Notagasto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO notagasto SET ?';
    keys = [Notagasto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto cread@' });
    });
};

Notagasto.update = (Notagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE notagasto SET ? WHERE idnotagasto = ? AND created_by = ?';
        keys = [Notagasto, Notagasto.idnotagasto, created_by];
    } else {
        query = 'UPDATE notagasto SET ? WHERE idnotagasto = ?';
        keys = [Notagasto, Notagasto.idnotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto actualizad@' });
    });
};

Notagasto.remove = (idnotagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM notagasto WHERE idnotagasto = ? AND created_by = ?';
        keys = [idnotagasto, created_by];
    } else {
        query = 'DELETE FROM notagasto WHERE idnotagasto = ?';
        keys = [idnotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto eliminad@' });
    });
};

Notagasto.logicRemove = (idnotagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE notagasto SET baja = 1 WHERE idnotagasto = ? AND created_by = ?';
        keys = [idnotagasto, created_by];
    } else {
        query = 'UPDATE notagasto SET baja = 1 WHERE idnotagasto = ?';
        keys = [idnotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Notagasto eliminad@' });
    });
};

Notagasto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Notagasto;
