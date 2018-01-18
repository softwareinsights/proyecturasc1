const connection = require('../config/db-connection');

const Material = {};

Material.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT material.*, _idtipomaterial. as tipomaterial_idtipomaterial , _idunidadmedida. as unidadmedida_idunidadmedida FROM material INNER JOIN tipomaterial as _idtipomaterial ON _idtipomaterial.idtipomaterial = material.idtipomaterial INNER JOIN unidadmedida as _idunidadmedida ON _idunidadmedida.idunidadmedida = material.idunidadmedida   WHERE created_by = ? HAVING material.baja IS NULL OR material.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT material.*, _idtipomaterial. as tipomaterial_idtipomaterial , _idunidadmedida. as unidadmedida_idunidadmedida FROM material INNER JOIN tipomaterial as _idtipomaterial ON _idtipomaterial.idtipomaterial = material.idtipomaterial INNER JOIN unidadmedida as _idunidadmedida ON _idunidadmedida.idunidadmedida = material.idunidadmedida   HAVING material.baja IS NULL OR material.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Material leíd@' });
    });
};

Material.findById = (idMaterial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM material WHERE idmaterial = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idMaterial, created_by];
    } else {
        query = 'SELECT * FROM material WHERE idmaterial = ? HAVING baja IS NULL OR baja = false';
        keys = [idMaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Material encontrad@' });
    });
};

Material.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idmaterial) AS count FROM material';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Material contabilizad@' });
    });
};

Material.exist = (idMaterial, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM material WHERE idmaterial = ?) AS exist';
    keys = [idMaterial];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Material verificad@' });
    });
};

Material.insert = (Material, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO material SET ?';
    keys = [Material];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Material cread@' });
    });
};

Material.update = (Material, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE material SET ? WHERE idmaterial = ? AND created_by = ?';
        keys = [Material, Material.idmaterial, created_by];
    } else {
        query = 'UPDATE material SET ? WHERE idmaterial = ?';
        keys = [Material, Material.idmaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Material actualizad@' });
    });
};

Material.remove = (idmaterial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM material WHERE idmaterial = ? AND created_by = ?';
        keys = [idmaterial, created_by];
    } else {
        query = 'DELETE FROM material WHERE idmaterial = ?';
        keys = [idmaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Material eliminad@' });
    });
};

Material.logicRemove = (idmaterial, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE material SET baja = 1 WHERE idmaterial = ? AND created_by = ?';
        keys = [idmaterial, created_by];
    } else {
        query = 'UPDATE material SET baja = 1 WHERE idmaterial = ?';
        keys = [idmaterial];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Material eliminad@' });
    });
};

Material.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Material;
