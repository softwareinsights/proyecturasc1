const router = require('express').Router();
const Material = require('../models/material');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'material', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Material.all(created_by, (error, data) => {
                        return Material.response(res, error, data);
                    })
                } else {
                    return Material.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'material', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Material.count((error, data) => {
                        return Material.response(res, error, data);
                    })
                } else {
                    return Material.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'material', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Material.exist(req.params.id, (error, data) => {
                        return Material.response(res, error, data);
                    })
                } else {
                    return Material.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'material', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Material.findById(req.params.id, created_by, (error, data) => {
                        return Material.response(res, error, data);
                    })
                } else {
                    return Material.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'material', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Material.logicRemove(req.params.id, created_by, (error, data) => {
                        return Material.response(res, error, data);
                    })
                } else {
                    return Material.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'material', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _material = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Material.update(_material, created_by, (error, data) => {
                        return Material.response(res, error, data);
                    })
                } else {
                    return Material.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'material', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _material = req.body;
                    _material.created_by = auth_data.user.idsi_user;
                    Material.insert( _material, (error, data) =>{
                        return Material.response(res, error, data);
                    });
                } else {
                    return Material.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
