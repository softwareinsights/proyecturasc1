const router = require('express').Router();
const Detallefactura = require('../models/detallefactura');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallefactura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallefactura.all(created_by, (error, data) => {
                        return Detallefactura.response(res, error, data);
                    })
                } else {
                    return Detallefactura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallefactura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Detallefactura.count((error, data) => {
                        return Detallefactura.response(res, error, data);
                    })
                } else {
                    return Detallefactura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallefactura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Detallefactura.exist(req.params.id, (error, data) => {
                        return Detallefactura.response(res, error, data);
                    })
                } else {
                    return Detallefactura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallefactura', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallefactura.findById(req.params.id, created_by, (error, data) => {
                        return Detallefactura.response(res, error, data);
                    })
                } else {
                    return Detallefactura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallefactura', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallefactura.logicRemove(req.params.id, created_by, (error, data) => {
                        return Detallefactura.response(res, error, data);
                    })
                } else {
                    return Detallefactura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallefactura', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _detallefactura = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Detallefactura.update(_detallefactura, created_by, (error, data) => {
                        return Detallefactura.response(res, error, data);
                    })
                } else {
                    return Detallefactura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'detallefactura', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _detallefactura = req.body;
                    _detallefactura.created_by = auth_data.user.idsi_user;
                    Detallefactura.insert( _detallefactura, (error, data) =>{
                        return Detallefactura.response(res, error, data);
                    });
                } else {
                    return Detallefactura.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
