const router = require('express').Router();
const Archivo = require('../models/archivo');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'archivo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Archivo.all(created_by, (error, data) => {
                        return Archivo.response(res, error, data);
                    })
                } else {
                    return Archivo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'archivo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Archivo.count((error, data) => {
                        return Archivo.response(res, error, data);
                    })
                } else {
                    return Archivo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'archivo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Archivo.exist(req.params.id, (error, data) => {
                        return Archivo.response(res, error, data);
                    })
                } else {
                    return Archivo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'archivo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Archivo.findById(req.params.id, created_by, (error, data) => {
                        return Archivo.response(res, error, data);
                    })
                } else {
                    return Archivo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'archivo', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Archivo.logicRemove(req.params.id, created_by, (error, data) => {
                        return Archivo.response(res, error, data);
                    })
                } else {
                    return Archivo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'archivo', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _archivo = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Archivo.update(_archivo, created_by, (error, data) => {
                        return Archivo.response(res, error, data);
                    })
                } else {
                    return Archivo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'archivo', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _archivo = req.body;
                    _archivo.created_by = auth_data.user.idsi_user;
                    Archivo.insert( _archivo, (error, data) =>{
                        return Archivo.response(res, error, data);
                    });
                } else {
                    return Archivo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
