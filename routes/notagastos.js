const router = require('express').Router();
const Notagasto = require('../models/notagasto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'notagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Notagasto.all(created_by, (error, data) => {
                        return Notagasto.response(res, error, data);
                    })
                } else {
                    return Notagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'notagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Notagasto.count((error, data) => {
                        return Notagasto.response(res, error, data);
                    })
                } else {
                    return Notagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'notagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Notagasto.exist(req.params.id, (error, data) => {
                        return Notagasto.response(res, error, data);
                    })
                } else {
                    return Notagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'notagasto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Notagasto.findById(req.params.id, created_by, (error, data) => {
                        return Notagasto.response(res, error, data);
                    })
                } else {
                    return Notagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'notagasto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Notagasto.logicRemove(req.params.id, created_by, (error, data) => {
                        return Notagasto.response(res, error, data);
                    })
                } else {
                    return Notagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'notagasto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _notagasto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Notagasto.update(_notagasto, created_by, (error, data) => {
                        return Notagasto.response(res, error, data);
                    })
                } else {
                    return Notagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'notagasto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _notagasto = req.body;
                    _notagasto.created_by = auth_data.user.idsi_user;
                    Notagasto.insert( _notagasto, (error, data) =>{
                        return Notagasto.response(res, error, data);
                    });
                } else {
                    return Notagasto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
