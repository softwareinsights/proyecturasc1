const router = require('express').Router();
const Tiporazonsocial = require('../models/tiporazonsocial');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tiporazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tiporazonsocial.all(created_by, (error, data) => {
                        return Tiporazonsocial.response(res, error, data);
                    })
                } else {
                    return Tiporazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tiporazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tiporazonsocial.count((error, data) => {
                        return Tiporazonsocial.response(res, error, data);
                    })
                } else {
                    return Tiporazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tiporazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tiporazonsocial.exist(req.params.id, (error, data) => {
                        return Tiporazonsocial.response(res, error, data);
                    })
                } else {
                    return Tiporazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tiporazonsocial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tiporazonsocial.findById(req.params.id, created_by, (error, data) => {
                        return Tiporazonsocial.response(res, error, data);
                    })
                } else {
                    return Tiporazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tiporazonsocial', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tiporazonsocial.logicRemove(req.params.id, created_by, (error, data) => {
                        return Tiporazonsocial.response(res, error, data);
                    })
                } else {
                    return Tiporazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tiporazonsocial', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _tiporazonsocial = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tiporazonsocial.update(_tiporazonsocial, created_by, (error, data) => {
                        return Tiporazonsocial.response(res, error, data);
                    })
                } else {
                    return Tiporazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tiporazonsocial', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _tiporazonsocial = req.body;
                    _tiporazonsocial.created_by = auth_data.user.idsi_user;
                    Tiporazonsocial.insert( _tiporazonsocial, (error, data) =>{
                        return Tiporazonsocial.response(res, error, data);
                    });
                } else {
                    return Tiporazonsocial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
