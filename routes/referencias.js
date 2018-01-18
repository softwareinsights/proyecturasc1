const router = require('express').Router();
const Referencia = require('../models/referencia');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'referencia', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Referencia.all(created_by, (error, data) => {
                        return Referencia.response(res, error, data);
                    })
                } else {
                    return Referencia.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'referencia', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Referencia.count((error, data) => {
                        return Referencia.response(res, error, data);
                    })
                } else {
                    return Referencia.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'referencia', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Referencia.exist(req.params.id, (error, data) => {
                        return Referencia.response(res, error, data);
                    })
                } else {
                    return Referencia.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'referencia', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Referencia.findById(req.params.id, created_by, (error, data) => {
                        return Referencia.response(res, error, data);
                    })
                } else {
                    return Referencia.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'referencia', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Referencia.logicRemove(req.params.id, created_by, (error, data) => {
                        return Referencia.response(res, error, data);
                    })
                } else {
                    return Referencia.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'referencia', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _referencia = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Referencia.update(_referencia, created_by, (error, data) => {
                        return Referencia.response(res, error, data);
                    })
                } else {
                    return Referencia.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'referencia', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _referencia = req.body;
                    _referencia.created_by = auth_data.user.idsi_user;
                    Referencia.insert( _referencia, (error, data) =>{
                        return Referencia.response(res, error, data);
                    });
                } else {
                    return Referencia.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
