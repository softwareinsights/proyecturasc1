const router = require('express').Router();
const Rol = require('../models/rol');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Rol.all(created_by, (error, data) => {
                        return Rol.response(res, error, data);
                    })
                } else {
                    return Rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Rol.count((error, data) => {
                        return Rol.response(res, error, data);
                    })
                } else {
                    return Rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Rol.exist(req.params.id, (error, data) => {
                        return Rol.response(res, error, data);
                    })
                } else {
                    return Rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'rol', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Rol.findById(req.params.id, created_by, (error, data) => {
                        return Rol.response(res, error, data);
                    })
                } else {
                    return Rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'rol', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Rol.logicRemove(req.params.id, created_by, (error, data) => {
                        return Rol.response(res, error, data);
                    })
                } else {
                    return Rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'rol', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _rol = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Rol.update(_rol, created_by, (error, data) => {
                        return Rol.response(res, error, data);
                    })
                } else {
                    return Rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'rol', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _rol = req.body;
                    _rol.created_by = auth_data.user.idsi_user;
                    Rol.insert( _rol, (error, data) =>{
                        return Rol.response(res, error, data);
                    });
                } else {
                    return Rol.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
