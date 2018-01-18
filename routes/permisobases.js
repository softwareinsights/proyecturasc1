const router = require('express').Router();
const Permisobase = require('../models/permisobase');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisobase', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisobase.all(created_by, (error, data) => {
                        return Permisobase.response(res, error, data);
                    })
                } else {
                    return Permisobase.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisobase', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisobase.count((error, data) => {
                        return Permisobase.response(res, error, data);
                    })
                } else {
                    return Permisobase.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisobase', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permisobase.exist(req.params.id, (error, data) => {
                        return Permisobase.response(res, error, data);
                    })
                } else {
                    return Permisobase.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisobase', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisobase.findById(req.params.id, created_by, (error, data) => {
                        return Permisobase.response(res, error, data);
                    })
                } else {
                    return Permisobase.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisobase', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisobase.logicRemove(req.params.id, created_by, (error, data) => {
                        return Permisobase.response(res, error, data);
                    })
                } else {
                    return Permisobase.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisobase', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _permisobase = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permisobase.update(_permisobase, created_by, (error, data) => {
                        return Permisobase.response(res, error, data);
                    })
                } else {
                    return Permisobase.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permisobase', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _permisobase = req.body;
                    _permisobase.created_by = auth_data.user.idsi_user;
                    Permisobase.insert( _permisobase, (error, data) =>{
                        return Permisobase.response(res, error, data);
                    });
                } else {
                    return Permisobase.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
