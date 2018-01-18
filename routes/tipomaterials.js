const router = require('express').Router();
const Tipomaterial = require('../models/tipomaterial');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipomaterial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipomaterial.all(created_by, (error, data) => {
                        return Tipomaterial.response(res, error, data);
                    })
                } else {
                    return Tipomaterial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipomaterial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tipomaterial.count((error, data) => {
                        return Tipomaterial.response(res, error, data);
                    })
                } else {
                    return Tipomaterial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipomaterial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Tipomaterial.exist(req.params.id, (error, data) => {
                        return Tipomaterial.response(res, error, data);
                    })
                } else {
                    return Tipomaterial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipomaterial', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipomaterial.findById(req.params.id, created_by, (error, data) => {
                        return Tipomaterial.response(res, error, data);
                    })
                } else {
                    return Tipomaterial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipomaterial', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipomaterial.logicRemove(req.params.id, created_by, (error, data) => {
                        return Tipomaterial.response(res, error, data);
                    })
                } else {
                    return Tipomaterial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipomaterial', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _tipomaterial = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Tipomaterial.update(_tipomaterial, created_by, (error, data) => {
                        return Tipomaterial.response(res, error, data);
                    })
                } else {
                    return Tipomaterial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'tipomaterial', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _tipomaterial = req.body;
                    _tipomaterial.created_by = auth_data.user.idsi_user;
                    Tipomaterial.insert( _tipomaterial, (error, data) =>{
                        return Tipomaterial.response(res, error, data);
                    });
                } else {
                    return Tipomaterial.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
