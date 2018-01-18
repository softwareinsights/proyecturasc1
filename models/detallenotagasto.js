const connection = require('../config/db-connection');

const Detallenotagasto = {};

Detallenotagasto.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT detallenotagasto.*, _idnotagasto. as notagasto_idnotagasto , _idmaterial. as material_idmaterial FROM detallenotagasto INNER JOIN notagasto as _idnotagasto ON _idnotagasto.idnotagasto = detallenotagasto.idnotagasto INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = detallenotagasto.idmaterial   WHERE created_by = ? HAVING detallenotagasto.baja IS NULL OR detallenotagasto.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT detallenotagasto.*, _idnotagasto. as notagasto_idnotagasto , _idmaterial. as material_idmaterial FROM detallenotagasto INNER JOIN notagasto as _idnotagasto ON _idnotagasto.idnotagasto = detallenotagasto.idnotagasto INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = detallenotagasto.idmaterial   HAVING detallenotagasto.baja IS NULL OR detallenotagasto.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto leíd@' });
    });
};

Detallenotagasto.findById = (idDetallenotagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM detallenotagasto WHERE iddetallenotagasto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idDetallenotagasto, created_by];
    } else {
        query = 'SELECT * FROM detallenotagasto WHERE iddetallenotagasto = ? HAVING baja IS NULL OR baja = false';
        keys = [idDetallenotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto encontrad@' });
    });
};

Detallenotagasto.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(iddetallenotagasto) AS count FROM detallenotagasto';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto contabilizad@' });
    });
};

Detallenotagasto.exist = (idDetallenotagasto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM detallenotagasto WHERE iddetallenotagasto = ?) AS exist';
    keys = [idDetallenotagasto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto verificad@' });
    });
};

Detallenotagasto.insert = (Detallenotagasto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO detallenotagasto SET ?';
    keys = [Detallenotagasto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto cread@' });
    });
};

Detallenotagasto.update = (Detallenotagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE detallenotagasto SET ? WHERE iddetallenotagasto = ? AND created_by = ?';
        keys = [Detallenotagasto, Detallenotagasto.iddetallenotagasto, created_by];
    } else {
        query = 'UPDATE detallenotagasto SET ? WHERE iddetallenotagasto = ?';
        keys = [Detallenotagasto, Detallenotagasto.iddetallenotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto actualizad@' });
    });
};

Detallenotagasto.remove = (iddetallenotagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM detallenotagasto WHERE iddetallenotagasto = ? AND created_by = ?';
        keys = [iddetallenotagasto, created_by];
    } else {
        query = 'DELETE FROM detallenotagasto WHERE iddetallenotagasto = ?';
        keys = [iddetallenotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto eliminad@' });
    });
};

Detallenotagasto.logicRemove = (iddetallenotagasto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE detallenotagasto SET baja = 1 WHERE iddetallenotagasto = ? AND created_by = ?';
        keys = [iddetallenotagasto, created_by];
    } else {
        query = 'UPDATE detallenotagasto SET baja = 1 WHERE iddetallenotagasto = ?';
        keys = [iddetallenotagasto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Detallenotagasto eliminad@' });
    });
};

Detallenotagasto.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Detallenotagasto;
