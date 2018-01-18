const router = require('express').Router();
const Factura = require('../models/factura');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'factura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Factura.all(created_by, (error, data) => {
                        return Factura.response(res, error, data);
                    })
                } else {
                    return Factura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'factura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Factura.count((error, data) => {
                        return Factura.response(res, error, data);
                    })
                } else {
                    return Factura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'factura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Factura.exist(req.params.id, (error, data) => {
                        return Factura.response(res, error, data);
                    })
                } else {
                    return Factura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'factura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Factura.findById(req.params.id, created_by, (error, data) => {
                        return Factura.response(res, error, data);
                    })
                } else {
                    return Factura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'factura', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Factura.logicRemove(req.params.id, created_by, (error, data) => {
                        return Factura.response(res, error, data);
                    })
                } else {
                    return Factura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'factura', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _factura = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Factura.update(_factura, created_by, (error, data) => {
                        return Factura.response(res, error, data);
                    })
                } else {
                    return Factura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'factura', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _factura = req.body;
                    _factura.created_by = auth_data.user.idsi_user;
                    Factura.insert( _factura, (error, data) =>{
                        return Factura.response(res, error, data);
                    });
                } else {
                    return Factura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
