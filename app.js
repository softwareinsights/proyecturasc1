const express = require('express');
const connection = require('./config/db-connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

//Route importation.
const archivo = require('./routes/archivos');
const categoria = require('./routes/categorias');
const costo = require('./routes/costos');
const cotizacion = require('./routes/cotizacions');
const detallecotizacion = require('./routes/detallecotizacions');
const detallefactura = require('./routes/detallefacturas');
const detallenotagasto = require('./routes/detallenotagastos');
const empresa = require('./routes/empresas');
const estatuscotizacion = require('./routes/estatuscotizacions');
const estatusobra = require('./routes/estatusobras');
const factura = require('./routes/facturas');
const material = require('./routes/materials');
const notagasto = require('./routes/notagastos');
const obra = require('./routes/obras');
const obracategoria = require('./routes/obracategorias');
const permiso = require('./routes/permisos');
const permisobase = require('./routes/permisobases');
const presupuesto = require('./routes/presupuestos');
const razonsocial = require('./routes/razonsocials');
const referencia = require('./routes/referencias');
const rol = require('./routes/rols');
const statusrazonsocial = require('./routes/statusrazonsocials');
const statususuario = require('./routes/statususuarios');
const subcategoria = require('./routes/subcategorias');
const tipomaterial = require('./routes/tipomaterials');
const tipoobra = require('./routes/tipoobras');
const tiporazonsocial = require('./routes/tiporazonsocials');
const unidadmedida = require('./routes/unidadmedidas');
const usuario = require('./routes/usuarios');
const si_modulo = require('./routes/si_modulos');
const si_permiso = require('./routes/si_permisos');
const si_rol = require('./routes/si_rols');
const si_user = require('./routes/si_users');
const si_reporte = require('./routes/si_reportes');

// Express Instance
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Initialize passport
app.use(passport.initialize());

// Call passport Strategy
require('./config/passport')(passport);

// Warehouses
app.use('/archivo', archivo);
app.use('/categoria', categoria);
app.use('/costo', costo);
app.use('/cotizacion', cotizacion);
app.use('/detallecotizacion', detallecotizacion);
app.use('/detallefactura', detallefactura);
app.use('/detallenotagasto', detallenotagasto);
app.use('/empresa', empresa);
app.use('/estatuscotizacion', estatuscotizacion);
app.use('/estatusobra', estatusobra);
app.use('/factura', factura);
app.use('/material', material);
app.use('/notagasto', notagasto);
app.use('/obra', obra);
app.use('/obracategoria', obracategoria);
app.use('/permiso', permiso);
app.use('/permisobase', permisobase);
app.use('/presupuesto', presupuesto);
app.use('/razonsocial', razonsocial);
app.use('/referencia', referencia);
app.use('/rol', rol);
app.use('/statusrazonsocial', statusrazonsocial);
app.use('/statususuario', statususuario);
app.use('/subcategoria', subcategoria);
app.use('/tipomaterial', tipomaterial);
app.use('/tipoobra', tipoobra);
app.use('/tiporazonsocial', tiporazonsocial);
app.use('/unidadmedida', unidadmedida);
app.use('/usuario', usuario);
app.use('/si_modulo', si_modulo);
app.use('/si_permiso', si_permiso);
app.use('/si_rol', si_rol);
app.use('/si_user', si_user);
app.use('/si_reporte', si_reporte);

// Set port
app.listen(3000);
