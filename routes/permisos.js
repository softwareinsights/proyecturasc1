const router = require('express').Router();
const Permiso = require('../models/permiso');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permiso.all(created_by, (error, data) => {
                        return Permiso.response(res, error, data);
                    })
                } else {
                    return Permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permiso.count((error, data) => {
                        return Permiso.response(res, error, data);
                    })
                } else {
                    return Permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Permiso.exist(req.params.id, (error, data) => {
                        return Permiso.response(res, error, data);
                    })
                } else {
                    return Permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permiso', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permiso.findById(req.params.id, created_by, (error, data) => {
                        return Permiso.response(res, error, data);
                    })
                } else {
                    return Permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permiso', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permiso.logicRemove(req.params.id, created_by, (error, data) => {
                        return Permiso.response(res, error, data);
                    })
                } else {
                    return Permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permiso', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _permiso = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Permiso.update(_permiso, created_by, (error, data) => {
                        return Permiso.response(res, error, data);
                    })
                } else {
                    return Permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'permiso', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _permiso = req.body;
                    _permiso.created_by = auth_data.user.idsi_user;
                    Permiso.insert( _permiso, (error, data) =>{
                        return Permiso.response(res, error, data);
                    });
                } else {
                    return Permiso.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
