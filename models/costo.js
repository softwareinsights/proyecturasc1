const connection = require('../config/db-connection');

const Costo = {};

Costo.all = (created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT costo.*, _idmaterial. as material_idmaterial , _idunidadmedida. as unidadmedida_idunidadmedida , _idcategoria. as categoria_idcategoria , _idsubcategoria. as subcategoria_idsubcategoria , _idobra. as obra_idobra FROM costo INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = costo.idmaterial INNER JOIN unidadmedida as _idunidadmedida ON _idunidadmedida.idunidadmedida = costo.idunidadmedida INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = costo.idcategoria INNER JOIN subcategoria as _idsubcategoria ON _idsubcategoria.idsubcategoria = costo.idsubcategoria INNER JOIN obra as _idobra ON _idobra.idobra = costo.idobra   WHERE created_by = ? HAVING costo.baja IS NULL OR costo.baja = false';
        keys = [created_by];
    } else {
        query = 'SELECT costo.*, _idmaterial. as material_idmaterial , _idunidadmedida. as unidadmedida_idunidadmedida , _idcategoria. as categoria_idcategoria , _idsubcategoria. as subcategoria_idsubcategoria , _idobra. as obra_idobra FROM costo INNER JOIN material as _idmaterial ON _idmaterial.idmaterial = costo.idmaterial INNER JOIN unidadmedida as _idunidadmedida ON _idunidadmedida.idunidadmedida = costo.idunidadmedida INNER JOIN categoria as _idcategoria ON _idcategoria.idcategoria = costo.idcategoria INNER JOIN subcategoria as _idsubcategoria ON _idsubcategoria.idsubcategoria = costo.idsubcategoria INNER JOIN obra as _idobra ON _idobra.idobra = costo.idobra   HAVING costo.baja IS NULL OR costo.baja = false';
        keys = [];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible leer registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Costo leíd@' });
    });
};

Costo.findById = (idCosto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'SELECT * FROM costo WHERE idcosto = ? AND created_by = ? HAVING baja IS NULL OR baja = false';
        keys = [idCosto, created_by];
    } else {
        query = 'SELECT * FROM costo WHERE idcosto = ? HAVING baja IS NULL OR baja = false';
        keys = [idCosto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se encontraba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible encontrar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Costo encontrad@' });
    });
};

Costo.count = (next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT COUNT(idcosto) AS count FROM costo';
    keys = [];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Costo contabilizad@' });
    });
};

Costo.exist = (idCosto, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'SELECT EXISTS(SELECT 1 FROM costo WHERE idcosto = ?) AS exist';
    keys = [idCosto];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se leían registros' });
        else
            return next(null, { success: true, result: result, message: 'Costo verificad@' });
    });
};

Costo.insert = (Costo, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    query = 'INSERT INTO costo SET ?';
    keys = [Costo];

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se creaba el registro' });
        else
            return next(null, { success: true, result: result, message: 'Costo cread@' });
    });
};

Costo.update = (Costo, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE costo SET ? WHERE idcosto = ? AND created_by = ?';
        keys = [Costo, Costo.idcosto, created_by];
    } else {
        query = 'UPDATE costo SET ? WHERE idcosto = ?';
        keys = [Costo, Costo.idcosto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se actualizaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible actualizar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Costo actualizad@' });
    });
};

Costo.remove = (idcosto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'DELETE FROM costo WHERE idcosto = ? AND created_by = ?';
        keys = [idcosto, created_by];
    } else {
        query = 'DELETE FROM costo WHERE idcosto = ?';
        keys = [idcosto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Costo eliminad@' });
    });
};

Costo.logicRemove = (idcosto, created_by, next) => {
    if( !connection )
        return next('Connection refused');

    let query = '';
    let keys = [];
    if (created_by) {
        query = 'UPDATE costo SET baja = 1 WHERE idcosto = ? AND created_by = ?';
        keys = [idcosto, created_by];
    } else {
        query = 'UPDATE costo SET baja = 1 WHERE idcosto = ?';
        keys = [idcosto];
    }

    connection.query(query, keys, (error, result) => {
        if(error) 
            return next({ success: false, error: error, message: 'Un error ha ocurrido mientras se eliminaba el registro' });
        else if (result.affectedRows === 0)
            return next(null, { success: false, result: result, message: 'Solo es posible eliminar registros propios' });
        else
            return next(null, { success: true, result: result, message: 'Costo eliminad@' });
    });
};

Costo.response = (res, error, data) => {
    if ( error )
        res.status(500).json(error);
    else
        res.status(200).json(data);
};

module.exports = Costo;
