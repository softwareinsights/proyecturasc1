const router = require('express').Router();
const Costo = require('../models/costo');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'costo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Costo.all(created_by, (error, data) => {
                        return Costo.response(res, error, data);
                    })
                } else {
                    return Costo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'costo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Costo.count((error, data) => {
                        return Costo.response(res, error, data);
                    })
                } else {
                    return Costo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'costo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Costo.exist(req.params.id, (error, data) => {
                        return Costo.response(res, error, data);
                    })
                } else {
                    return Costo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'costo', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Costo.findById(req.params.id, created_by, (error, data) => {
                        return Costo.response(res, error, data);
                    })
                } else {
                    return Costo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'costo', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Costo.logicRemove(req.params.id, created_by, (error, data) => {
                        return Costo.response(res, error, data);
                    })
                } else {
                    return Costo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'costo', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _costo = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Costo.update(_costo, created_by, (error, data) => {
                        return Costo.response(res, error, data);
                    })
                } else {
                    return Costo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'costo', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _costo = req.body;
                    _costo.created_by = auth_data.user.idsi_user;
                    Costo.insert( _costo, (error, data) =>{
                        return Costo.response(res, error, data);
                    });
                } else {
                    return Costo.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
