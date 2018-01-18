const router = require('express').Router();
const Presupuesto = require('../models/presupuesto');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'presupuesto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Presupuesto.all(created_by, (error, data) => {
                        return Presupuesto.response(res, error, data);
                    })
                } else {
                    return Presupuesto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'presupuesto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Presupuesto.count((error, data) => {
                        return Presupuesto.response(res, error, data);
                    })
                } else {
                    return Presupuesto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'presupuesto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Presupuesto.exist(req.params.id, (error, data) => {
                        return Presupuesto.response(res, error, data);
                    })
                } else {
                    return Presupuesto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'presupuesto', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Presupuesto.findById(req.params.id, created_by, (error, data) => {
                        return Presupuesto.response(res, error, data);
                    })
                } else {
                    return Presupuesto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'presupuesto', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Presupuesto.logicRemove(req.params.id, created_by, (error, data) => {
                        return Presupuesto.response(res, error, data);
                    })
                } else {
                    return Presupuesto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'presupuesto', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _presupuesto = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Presupuesto.update(_presupuesto, created_by, (error, data) => {
                        return Presupuesto.response(res, error, data);
                    })
                } else {
                    return Presupuesto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'presupuesto', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _presupuesto = req.body;
                    _presupuesto.created_by = auth_data.user.idsi_user;
                    Presupuesto.insert( _presupuesto, (error, data) =>{
                        return Presupuesto.response(res, error, data);
                    });
                } else {
                    return Presupuesto.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
