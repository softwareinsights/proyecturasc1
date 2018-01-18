const router = require('express').Router();
const Obra = require('../models/obra');
const passport = require('passport');
const permissions = require('../config/permissions');

router
    .get('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obra.all(created_by, (error, data) => {
                        return Obra.response(res, error, data);
                    })
                } else {
                    return Obra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/count', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Obra.count((error, data) => {
                        return Obra.response(res, error, data);
                    })
                } else {
                    return Obra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/exist/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    Obra.exist(req.params.id, (error, data) => {
                        return Obra.response(res, error, data);
                    })
                } else {
                    return Obra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .get('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obra', auth_data.user.super, 'readable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obra.findById(req.params.id, created_by, (error, data) => {
                        return Obra.response(res, error, data);
                    })
                } else {
                    return Obra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .delete('/:id', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obra', auth_data.user.super, 'deleteable', (error, permission) => {
                if (permission.success) {
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obra.logicRemove(req.params.id, created_by, (error, data) => {
                        return Obra.response(res, error, data);
                    })
                } else {
                    return Obra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .patch('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obra', auth_data.user.super, 'updateable', (error, permission) => {
                if (permission.success) {
                    const _obra = req.body;
                    const created_by = (permission.only_own) ? auth_data.user.idsi_user : false;
                    Obra.update(_obra, created_by, (error, data) => {
                        return Obra.response(res, error, data);
                    })
                } else {
                    return Obra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })
    .post('/', (req, res, next) => {
        passport.authenticate('jwt', { session: true }, (err, auth_data, info) => {
            permissions.module_permission(auth_data.modules, 'obra', auth_data.user.super, 'writeable', (error, permission) => {
                if (permission.success) {
                    const _obra = req.body;
                    _obra.created_by = auth_data.user.idsi_user;
                    Obra.insert( _obra, (error, data) =>{
                        return Obra.response(res, error, data);
                    });
                } else {
                    return Obra.response(res, error, permission);
                }
            });
        })(req, res, next);
    })

module.exports = router;
