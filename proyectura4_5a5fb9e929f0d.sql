-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-01-2018 a las 21:56:43
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectura`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo`
--

CREATE TABLE `archivo` (
  `idarchivo` int(11) NOT NULL COMMENT '0|',
  `proceso` varchar(45) DEFAULT NULL COMMENT '1|Proceso',
  `tipoarchivo` varchar(45) DEFAULT NULL COMMENT '1|Tipo Archivo',
  `urlarchivo` varchar(80) DEFAULT NULL COMMENT '1|Url Archivo',
  `idreferencia` int(11) NOT NULL COMMENT '1|Referencia',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|22|Archivo';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `idcategoria` int(11) NOT NULL COMMENT '0|',
  `clavecategoria` varchar(45) DEFAULT NULL COMMENT '1|Clave Categoria',
  `descripcioncategoria` varchar(150) DEFAULT NULL COMMENT '1|Descripción Categoria',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|3|Categorias';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `costo`
--

CREATE TABLE `costo` (
  `idcosto` int(11) NOT NULL COMMENT '0|',
  `idmaterial` int(11) NOT NULL COMMENT '1|Material',
  `idunidadmedida` int(11) NOT NULL COMMENT '1|Unidad de Medida',
  `idcategoria` int(11) NOT NULL COMMENT '1|Categoria',
  `idsubcategoria` int(11) NOT NULL COMMENT '1|Sub Categoria',
  `idobra` int(11) NOT NULL COMMENT '1|Obra',
  `cantidad` float DEFAULT NULL COMMENT '1|Cantidad',
  `preciounitario` float DEFAULT NULL COMMENT '1|Precio Unitario',
  `importeimpuestos` float DEFAULT NULL COMMENT '1|Importe Impuestos',
  `importeimpuestosesp` float DEFAULT NULL COMMENT '1|Importe Impuestos Esp',
  `subtotal` float DEFAULT NULL COMMENT '1|Sub Total',
  `importetotal` float DEFAULT NULL COMMENT '1|Importe Total',
  `observaciones` varchar(150) DEFAULT NULL COMMENT '1|Observaciones',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|15|Costos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion`
--

CREATE TABLE `cotizacion` (
  `idcotizacion` int(11) NOT NULL COMMENT '0|',
  `idestatuscotizacion` int(11) NOT NULL COMMENT '1|Estatus Cotización',
  `idrazonsocial` int(11) NOT NULL COMMENT '1|Razon Social',
  `idobra` int(11) NOT NULL COMMENT '1|Obra',
  `subtotal` float DEFAULT NULL COMMENT '1|Sub Total',
  `importetotal` float DEFAULT NULL COMMENT '1|Importe Total',
  `importeimpuestos` float DEFAULT NULL COMMENT '1|Importe Impuestos',
  `importeimpuestosesp` float DEFAULT NULL COMMENT '1|Importe Impuestos Esp',
  `totalunidades` float DEFAULT NULL COMMENT '1|Total Unidades',
  `descripcion` varchar(80) DEFAULT NULL COMMENT '1|Descripción',
  `referencia` varchar(60) DEFAULT NULL COMMENT '1|Referencia',
  `observaciones` varchar(150) DEFAULT NULL COMMENT '1|Observaciones',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|11|Cotizaciones';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallecotizacion`
--

CREATE TABLE `detallecotizacion` (
  `iddetallecotizacion` int(11) NOT NULL COMMENT '0|',
  `idcotizacion` int(11) NOT NULL COMMENT '1|Cotización',
  `idcategoria` int(11) NOT NULL COMMENT '1|Categoria',
  `idsubcategoria` int(11) NOT NULL COMMENT '1|Sub Categoria',
  `idmaterial` int(11) NOT NULL COMMENT '1|Material',
  `cantidad` float DEFAULT NULL COMMENT '1|Cantidad',
  `porcimpuestos` float DEFAULT NULL COMMENT '1|Porcentaje Impuestos',
  `porcdescuento` float DEFAULT NULL COMMENT '1|Porcentaje Descuento',
  `porcimpuestosesp` float DEFAULT NULL COMMENT '1|Porcentaje Impuestos Esp',
  `importeimpuestos` float DEFAULT NULL COMMENT '1|Importe Impuestos',
  `importeimpuestosesp` float DEFAULT NULL COMMENT '1|Importe Impuestos Esp',
  `observaciones` varchar(150) DEFAULT NULL COMMENT '1|Observaciones',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|12|Detalle Cotizaciones';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallefactura`
--

CREATE TABLE `detallefactura` (
  `iddetallefactura` int(11) NOT NULL COMMENT '0|',
  `idfactura` int(11) NOT NULL COMMENT '1|Factura',
  `idmaterial` int(11) NOT NULL COMMENT '1|Material',
  `claveprodserv` varchar(45) DEFAULT NULL COMMENT '1|Clave Producto Servicio',
  `noidentificacion` varchar(45) DEFAULT NULL COMMENT '1|No. identificación',
  `descripcion` varchar(80) DEFAULT NULL COMMENT '1|Descripción',
  `claveunidad` varchar(45) DEFAULT NULL COMMENT '1|Clave Unidad',
  `cantidad` float DEFAULT NULL COMMENT '1|Cantidad',
  `valorunitario` float DEFAULT NULL COMMENT '1|Valor Unitario',
  `importe` float DEFAULT NULL COMMENT '1|Importe',
  `descuento` float DEFAULT NULL COMMENT '1|Descuento',
  `asignado` tinyint(1) DEFAULT NULL COMMENT '1|Asignado',
  `baseimpuesto` float DEFAULT NULL COMMENT '1|Impuesto Base',
  `impuesto` varchar(45) DEFAULT NULL COMMENT '1|Impuesto',
  `tipofactorimpuesto` varchar(45) DEFAULT NULL COMMENT '1|Tipo Factor Impuesto',
  `tasaocuotaimpuesto` varchar(45) DEFAULT NULL COMMENT '1|Tasa o Cuota Impuesto',
  `importeimpuesto` float DEFAULT NULL COMMENT '1|Importe Impuesto',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|19|Detalle Facturas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallenotagasto`
--

CREATE TABLE `detallenotagasto` (
  `iddetallenotagasto` int(11) NOT NULL COMMENT '0|',
  `idnotagasto` int(11) NOT NULL COMMENT '1|Nota gasto',
  `idmaterial` int(11) NOT NULL COMMENT '1|Material',
  `noidentificacion` varchar(45) DEFAULT NULL COMMENT '1|No. Identificación',
  `descripcion` varchar(45) DEFAULT NULL COMMENT '1|Descripción',
  `unidad` varchar(45) DEFAULT NULL COMMENT '1|Unidad',
  `cantidad` float DEFAULT NULL COMMENT '1|Cantidad',
  `valorunitario` float DEFAULT NULL COMMENT '1|Valor Unitario',
  `importe` float DEFAULT NULL COMMENT '1|Importe',
  `importeimpuesto` float DEFAULT NULL COMMENT '1|Importe Impuesto',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|17|Detalle Notas Gasto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresa`
--

CREATE TABLE `empresa` (
  `idempresa` int(11) NOT NULL,
  `nombre` varchar(60) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatuscotizacion`
--

CREATE TABLE `estatuscotizacion` (
  `idestatuscotizacion` int(11) NOT NULL COMMENT '0|',
  `estatuscotizacion` varchar(45) DEFAULT NULL COMMENT '1|Estatus Cotización',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|13|Estatus Cotizaciones';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estatusobra`
--

CREATE TABLE `estatusobra` (
  `idestatusobra` int(11) NOT NULL COMMENT '0|',
  `estatusobra` varchar(45) DEFAULT NULL COMMENT '1|Estatus Obra',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|9|Estatus Obra';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `idfactura` int(11) NOT NULL COMMENT '0|',
  `folio` varchar(45) DEFAULT NULL COMMENT '1|Folio',
  `serie` varchar(45) DEFAULT NULL COMMENT '1|Serie',
  `version` varchar(45) DEFAULT NULL COMMENT '1|Versión',
  `fechaexpedicion` datetime DEFAULT NULL COMMENT '1|Fecha Expedición',
  `uuid` varchar(45) DEFAULT NULL COMMENT '1|uuid',
  `fechatimbrado` datetime DEFAULT NULL COMMENT '1|Fecha Timbrado',
  `idrazonsocialemisor` int(11) NOT NULL COMMENT '1|ID Razón Social Emisor',
  `razonsocialemisor` varchar(45) DEFAULT NULL COMMENT '1|Razón Social Emisor',
  `rfcemisor` varchar(45) DEFAULT NULL COMMENT '1|RFC Emisor',
  `claveregimenfiscal` varchar(45) DEFAULT NULL COMMENT '1|Clave Regimen Fiscal',
  `claveformapago` varchar(45) DEFAULT NULL COMMENT '1|Clave Forma Pago',
  `clavemetodopago` varchar(45) DEFAULT NULL COMMENT '1|Clave Método de Pago',
  `clavetipocomprobante` varchar(45) DEFAULT NULL COMMENT '1|Clave Tipo Comprobante',
  `lugarexpedicion` varchar(45) DEFAULT NULL COMMENT '1|Lugar de Expedición',
  `claveusocfdi` varchar(45) DEFAULT NULL COMMENT '1|Clave Uso cfdi',
  `rfcreceptor` varchar(45) DEFAULT NULL COMMENT '1|RFC receptor',
  `subtotal` float DEFAULT NULL COMMENT '1|Sub Total',
  `importetotal` float DEFAULT NULL COMMENT '1|Importe Total',
  `totalimpuestostrasladados` float DEFAULT NULL COMMENT '1|Total Impuestos Trasladados',
  `totalimpuestosretenidos` float DEFAULT NULL COMMENT '1|Total Impuestos Retenidos',
  `totaldescuentos` float DEFAULT NULL COMMENT '1|Total Descuentos',
  `clavemoneda` float DEFAULT NULL COMMENT '1|Clave Moneda',
  `valortipocambio` float DEFAULT NULL COMMENT '1|Valor Tipo Cambio',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|18|Facturas';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `idmaterial` int(11) NOT NULL COMMENT '0|',
  `codigo` varchar(45) DEFAULT NULL COMMENT '1|Código',
  `descripcioncorta` varchar(60) DEFAULT NULL COMMENT '1|Descripción Corta',
  `descripcionlarga` varchar(100) DEFAULT NULL COMMENT '1|Descripción Larga',
  `precio` float DEFAULT NULL COMMENT '1|Precio',
  `idtipomaterial` int(11) NOT NULL COMMENT '1|Tipo Material',
  `idunidadmedida` int(11) NOT NULL COMMENT '1|Unidad Medida',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|20|Materiales';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notagasto`
--

CREATE TABLE `notagasto` (
  `idnotagasto` int(11) NOT NULL COMMENT '0|',
  `folio` varchar(45) DEFAULT NULL COMMENT '1|Folio',
  `serie` varchar(45) DEFAULT NULL COMMENT '1|Serie',
  `fecha` datetime DEFAULT NULL COMMENT '1|Fecha',
  `idrazonsocialemisor` int(11) NOT NULL COMMENT '1|Razón Social Emisor',
  `observaciones` varchar(150) DEFAULT NULL COMMENT '1|Observaciones',
  `subtotal` float DEFAULT NULL COMMENT '1|Subtotal',
  `importetotal` float DEFAULT NULL COMMENT '1|Importe Total',
  `totalimpuestos` float DEFAULT NULL COMMENT '1|Total Impuestos',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|16|Notas Gasto';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obra`
--

CREATE TABLE `obra` (
  `idobra` int(11) NOT NULL COMMENT '0|',
  `descripcion` varchar(100) DEFAULT NULL COMMENT '1|Descripción',
  `direccion` varchar(100) DEFAULT NULL COMMENT '1|Dirección',
  `medidasterreno` varchar(45) DEFAULT NULL COMMENT '1|Medidas Terreno',
  `medidasconstruccion` varchar(45) DEFAULT NULL COMMENT '1|Medidas Construcción',
  `fechainicio` datetime DEFAULT NULL COMMENT '1|Fecha Inicio',
  `fechafin` datetime DEFAULT NULL COMMENT '1|Fecha Fin',
  `presupuesto` float DEFAULT NULL COMMENT '1|Presupuesto',
  `posiciongps` varchar(60) DEFAULT NULL COMMENT '1|Posición GPS',
  `observaciones` varchar(150) DEFAULT NULL COMMENT '1|Observaciones',
  `idtipoobra` int(11) NOT NULL COMMENT '1|Tipo Obra',
  `idestatusobra` int(11) NOT NULL COMMENT '1|Estatus Obra',
  `idrazonsocialconstructor` int(11) NOT NULL COMMENT '1|Razón Social Constructor',
  `idrazonsocialcliente` int(11) NOT NULL COMMENT '1|Razón Social Cliente',
  `idrazonsocialcontratista` int(11) NOT NULL COMMENT '1|Razón Social Contratista',
  `idrazonsocialasociado` int(11) NOT NULL COMMENT '1|Razón Social Asociado',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|6|Obras';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `obracategoria`
--

CREATE TABLE `obracategoria` (
  `idobracategoria` int(11) NOT NULL COMMENT '0|',
  `idobra` int(11) NOT NULL COMMENT '1|Obra',
  `idcategoria` int(11) NOT NULL COMMENT '1|Categoria',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|7|Obras Categorias';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permiso`
--

CREATE TABLE `permiso` (
  `idpermiso` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `permiso` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `permisobase`
--

CREATE TABLE `permisobase` (
  `idpermisobase` int(11) NOT NULL,
  `permisobase` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `presupuesto`
--

CREATE TABLE `presupuesto` (
  `idpresupuesto` int(11) NOT NULL COMMENT '0|',
  `idobra` int(11) NOT NULL COMMENT '1|Obra',
  `idcategoria` int(11) NOT NULL COMMENT '1|Categoria',
  `montopresupuestado` float DEFAULT NULL COMMENT '1|Monto Presupuestado',
  `montoejercicio` float DEFAULT NULL COMMENT '1|Monto Ejercicio',
  `fechainicial` datetime DEFAULT NULL COMMENT '1|Fecha Inicial',
  `fechafinal` datetime DEFAULT NULL COMMENT '1|Fecha Final',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|14|Presupuestos';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razonsocial`
--

CREATE TABLE `razonsocial` (
  `idrazonsocial` int(11) NOT NULL COMMENT '0|',
  `razonsocial` varchar(45) DEFAULT NULL COMMENT '1|Razón Social',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `rfc` varchar(30) DEFAULT NULL COMMENT '1|RFC',
  `calle` varchar(80) DEFAULT NULL COMMENT '1|Calle',
  `numeroexterior` varchar(10) DEFAULT NULL COMMENT '1|Número Exterior',
  `numerointerior` varchar(10) DEFAULT NULL COMMENT '1|Número Interior',
  `colonia` varchar(45) DEFAULT NULL COMMENT '1|Colonia',
  `municipio` varchar(45) DEFAULT NULL COMMENT '1|Municipio',
  `ciudad` varchar(45) DEFAULT NULL COMMENT '1|Ciudad',
  `estado` varchar(45) DEFAULT NULL COMMENT '1|Estado',
  `pais` varchar(45) DEFAULT NULL COMMENT '1|Pais',
  `idtiporazonsocial` int(11) NOT NULL COMMENT '1|Tipo Razon Social',
  `idstatusrazonsocial` int(11) NOT NULL COMMENT '1|Status Razón Social',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|5|Razón Social';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `referencia`
--

CREATE TABLE `referencia` (
  `idreferencia` int(11) NOT NULL,
  `referencia` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `idrol` int(11) NOT NULL COMMENT '0|',
  `rol` varchar(45) DEFAULT NULL COMMENT '1|Rol',
  `descripcion` varchar(60) DEFAULT NULL COMMENT '1|Descripción',
  `visible` tinyint(1) DEFAULT NULL COMMENT '1|Visible',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|1|Roles';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statusrazonsocial`
--

CREATE TABLE `statusrazonsocial` (
  `idstatusrazonsocial` int(11) NOT NULL,
  `statusrazonsocial` varchar(60) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `statususuario`
--

CREATE TABLE `statususuario` (
  `idstatususuario` int(11) NOT NULL COMMENT '0|',
  `statususuario` varchar(45) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subcategoria`
--

CREATE TABLE `subcategoria` (
  `idsubcategoria` int(11) NOT NULL COMMENT '0|',
  `clave` varchar(45) DEFAULT NULL COMMENT '1|Clave',
  `descripcion` varchar(80) DEFAULT NULL COMMENT '1|Descripción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|4|Sub Categorias';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipomaterial`
--

CREATE TABLE `tipomaterial` (
  `idtipomaterial` int(11) NOT NULL COMMENT '0|',
  `clave` varchar(45) DEFAULT NULL COMMENT '1|Clave',
  `descripcion` varchar(100) DEFAULT NULL COMMENT '1|Descripción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|21|Tipos Materiales';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipoobra`
--

CREATE TABLE `tipoobra` (
  `idtipoobra` int(11) NOT NULL COMMENT '0|',
  `clavetipoobra` varchar(45) DEFAULT NULL COMMENT '1|Clave Tipo Obra',
  `descripcion` varchar(100) DEFAULT NULL COMMENT '1|Descripción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|8|Tipos Obras';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiporazonsocial`
--

CREATE TABLE `tiporazonsocial` (
  `idtiporazonsocial` int(11) NOT NULL,
  `tiporazonsocial` varchar(60) DEFAULT NULL,
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='0|';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidadmedida`
--

CREATE TABLE `unidadmedida` (
  `idunidadmedida` int(11) NOT NULL COMMENT '0|',
  `clave` varchar(45) DEFAULT NULL COMMENT '1|Clave',
  `descripcion` varchar(100) DEFAULT NULL COMMENT '1|Descripción',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='1|10|Unidades Medida';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idusuario` int(11) NOT NULL COMMENT '0|',
  `usuario` varchar(60) DEFAULT NULL COMMENT '1|Usuario',
  `contrasena` varchar(45) DEFAULT NULL COMMENT '1|Contraseña',
  `nombre` varchar(45) DEFAULT NULL COMMENT '1|Nombre',
  `email` varchar(45) DEFAULT NULL COMMENT '1|Email',
  `telefono` varchar(45) DEFAULT NULL COMMENT '1|Télefono',
  `emailsms` varchar(45) DEFAULT NULL COMMENT '1|Email SMS',
  `idrol` int(11) NOT NULL COMMENT '1|Rol',
  `idstatususuario` int(11) NOT NULL COMMENT '1|Estatus Usuario',
  `baja` tinyint(1) DEFAULT NULL COMMENT '0|',
  `created_by` int(11) DEFAULT NULL COMMENT '0|',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '0|',
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '0|'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='12||Usuarios';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD PRIMARY KEY (`idarchivo`),
  ADD KEY `fk_archivo_referencia1_idx` (`idreferencia`);

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`idcategoria`);

--
-- Indices de la tabla `costo`
--
ALTER TABLE `costo`
  ADD PRIMARY KEY (`idcosto`),
  ADD KEY `fk_costo_material1_idx` (`idmaterial`),
  ADD KEY `fk_costo_unidadmedida1_idx` (`idunidadmedida`),
  ADD KEY `fk_costo_subcategoria1_idx` (`idsubcategoria`),
  ADD KEY `fk_costo_obra1_idx` (`idobra`),
  ADD KEY `fk_costo_categoria1_idx` (`idcategoria`);

--
-- Indices de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD PRIMARY KEY (`idcotizacion`),
  ADD KEY `fk_cotizacion_estatuscotizacion1_idx` (`idestatuscotizacion`),
  ADD KEY `fk_cotizacion_razonsocial1_idx` (`idrazonsocial`),
  ADD KEY `fk_cotizacion_obra1_idx` (`idobra`);

--
-- Indices de la tabla `detallecotizacion`
--
ALTER TABLE `detallecotizacion`
  ADD PRIMARY KEY (`iddetallecotizacion`),
  ADD KEY `fk_detallecotizacion_subcategoria1_idx` (`idsubcategoria`),
  ADD KEY `fk_detallecotizacion_material1_idx` (`idmaterial`),
  ADD KEY `fk_detallecotizacion_cotizacion1_idx` (`idcotizacion`),
  ADD KEY `fk_detallecotizacion_categoria1_idx` (`idcategoria`);

--
-- Indices de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  ADD PRIMARY KEY (`iddetallefactura`),
  ADD KEY `fk_detallefactura_factura1_idx` (`idfactura`),
  ADD KEY `fk_detallefactura_material1_idx` (`idmaterial`);

--
-- Indices de la tabla `detallenotagasto`
--
ALTER TABLE `detallenotagasto`
  ADD PRIMARY KEY (`iddetallenotagasto`),
  ADD KEY `fk_detallenotagasto_notagasto1_idx` (`idnotagasto`),
  ADD KEY `fk_detallenotagasto_material1_idx` (`idmaterial`);

--
-- Indices de la tabla `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`idempresa`);

--
-- Indices de la tabla `estatuscotizacion`
--
ALTER TABLE `estatuscotizacion`
  ADD PRIMARY KEY (`idestatuscotizacion`);

--
-- Indices de la tabla `estatusobra`
--
ALTER TABLE `estatusobra`
  ADD PRIMARY KEY (`idestatusobra`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`idfactura`),
  ADD KEY `fk_factura_razonsocial1_idx` (`idrazonsocialemisor`);

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`idmaterial`),
  ADD KEY `fk_material_tipomaterial1_idx` (`idtipomaterial`),
  ADD KEY `fk_material_unidadmedida1_idx` (`idunidadmedida`);

--
-- Indices de la tabla `notagasto`
--
ALTER TABLE `notagasto`
  ADD PRIMARY KEY (`idnotagasto`),
  ADD KEY `fk_notagasto_razonsocial1_idx` (`idrazonsocialemisor`);

--
-- Indices de la tabla `obra`
--
ALTER TABLE `obra`
  ADD PRIMARY KEY (`idobra`),
  ADD KEY `fk_obra_tipoobra1_idx` (`idtipoobra`),
  ADD KEY `fk_obra_estatusobra1_idx` (`idestatusobra`),
  ADD KEY `fk_obra_razonsocial1_idx` (`idrazonsocialconstructor`),
  ADD KEY `fk_obra_razonsocial2_idx` (`idrazonsocialcliente`),
  ADD KEY `fk_obra_razonsocial3_idx` (`idrazonsocialcontratista`),
  ADD KEY `fk_obra_razonsocial4_idx` (`idrazonsocialasociado`);

--
-- Indices de la tabla `obracategoria`
--
ALTER TABLE `obracategoria`
  ADD PRIMARY KEY (`idobracategoria`),
  ADD KEY `fk_obracategoria_categoria1_idx` (`idcategoria`),
  ADD KEY `fk_obracategoria_obra1_idx` (`idobra`);

--
-- Indices de la tabla `permiso`
--
ALTER TABLE `permiso`
  ADD PRIMARY KEY (`idpermiso`);

--
-- Indices de la tabla `permisobase`
--
ALTER TABLE `permisobase`
  ADD PRIMARY KEY (`idpermisobase`);

--
-- Indices de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  ADD PRIMARY KEY (`idpresupuesto`),
  ADD KEY `fk_presupuesto_obra1_idx` (`idobra`),
  ADD KEY `fk_presupuesto_categoria1_idx` (`idcategoria`);

--
-- Indices de la tabla `razonsocial`
--
ALTER TABLE `razonsocial`
  ADD PRIMARY KEY (`idrazonsocial`),
  ADD KEY `fk_razonsocial_tiporazonsocial1_idx` (`idtiporazonsocial`),
  ADD KEY `fk_razonsocial_statusrazonsocial1_idx` (`idstatusrazonsocial`);

--
-- Indices de la tabla `referencia`
--
ALTER TABLE `referencia`
  ADD PRIMARY KEY (`idreferencia`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`idrol`);

--
-- Indices de la tabla `statusrazonsocial`
--
ALTER TABLE `statusrazonsocial`
  ADD PRIMARY KEY (`idstatusrazonsocial`);

--
-- Indices de la tabla `statususuario`
--
ALTER TABLE `statususuario`
  ADD PRIMARY KEY (`idstatususuario`);

--
-- Indices de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  ADD PRIMARY KEY (`idsubcategoria`);

--
-- Indices de la tabla `tipomaterial`
--
ALTER TABLE `tipomaterial`
  ADD PRIMARY KEY (`idtipomaterial`);

--
-- Indices de la tabla `tipoobra`
--
ALTER TABLE `tipoobra`
  ADD PRIMARY KEY (`idtipoobra`);

--
-- Indices de la tabla `tiporazonsocial`
--
ALTER TABLE `tiporazonsocial`
  ADD PRIMARY KEY (`idtiporazonsocial`);

--
-- Indices de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  ADD PRIMARY KEY (`idunidadmedida`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idusuario`),
  ADD KEY `fk_usuario_rol_idx` (`idrol`),
  ADD KEY `fk_usuario_statususuario1_idx` (`idstatususuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `archivo`
--
ALTER TABLE `archivo`
  MODIFY `idarchivo` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `idcategoria` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `costo`
--
ALTER TABLE `costo`
  MODIFY `idcosto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  MODIFY `idcotizacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `detallecotizacion`
--
ALTER TABLE `detallecotizacion`
  MODIFY `iddetallecotizacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  MODIFY `iddetallefactura` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `detallenotagasto`
--
ALTER TABLE `detallenotagasto`
  MODIFY `iddetallenotagasto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `empresa`
--
ALTER TABLE `empresa`
  MODIFY `idempresa` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `estatuscotizacion`
--
ALTER TABLE `estatuscotizacion`
  MODIFY `idestatuscotizacion` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `estatusobra`
--
ALTER TABLE `estatusobra`
  MODIFY `idestatusobra` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `idfactura` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `idmaterial` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `notagasto`
--
ALTER TABLE `notagasto`
  MODIFY `idnotagasto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `obra`
--
ALTER TABLE `obra`
  MODIFY `idobra` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `obracategoria`
--
ALTER TABLE `obracategoria`
  MODIFY `idobracategoria` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `permiso`
--
ALTER TABLE `permiso`
  MODIFY `idpermiso` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `permisobase`
--
ALTER TABLE `permisobase`
  MODIFY `idpermisobase` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  MODIFY `idpresupuesto` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `razonsocial`
--
ALTER TABLE `razonsocial`
  MODIFY `idrazonsocial` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `referencia`
--
ALTER TABLE `referencia`
  MODIFY `idreferencia` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `idrol` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `statusrazonsocial`
--
ALTER TABLE `statusrazonsocial`
  MODIFY `idstatusrazonsocial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `statususuario`
--
ALTER TABLE `statususuario`
  MODIFY `idstatususuario` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `subcategoria`
--
ALTER TABLE `subcategoria`
  MODIFY `idsubcategoria` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `tipomaterial`
--
ALTER TABLE `tipomaterial`
  MODIFY `idtipomaterial` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `tipoobra`
--
ALTER TABLE `tipoobra`
  MODIFY `idtipoobra` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `tiporazonsocial`
--
ALTER TABLE `tiporazonsocial`
  MODIFY `idtiporazonsocial` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `unidadmedida`
--
ALTER TABLE `unidadmedida`
  MODIFY `idunidadmedida` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT COMMENT '0|';

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD CONSTRAINT `fk_archivo_referencia1` FOREIGN KEY (`idreferencia`) REFERENCES `referencia` (`idreferencia`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `costo`
--
ALTER TABLE `costo`
  ADD CONSTRAINT `fk_costo_categoria1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_costo_material1` FOREIGN KEY (`idmaterial`) REFERENCES `material` (`idmaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_costo_obra1` FOREIGN KEY (`idobra`) REFERENCES `obra` (`idobra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_costo_subcategoria1` FOREIGN KEY (`idsubcategoria`) REFERENCES `subcategoria` (`idsubcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_costo_unidadmedida1` FOREIGN KEY (`idunidadmedida`) REFERENCES `unidadmedida` (`idunidadmedida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cotizacion`
--
ALTER TABLE `cotizacion`
  ADD CONSTRAINT `fk_cotizacion_estatuscotizacion1` FOREIGN KEY (`idestatuscotizacion`) REFERENCES `estatuscotizacion` (`idestatuscotizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cotizacion_obra1` FOREIGN KEY (`idobra`) REFERENCES `obra` (`idobra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_cotizacion_razonsocial1` FOREIGN KEY (`idrazonsocial`) REFERENCES `razonsocial` (`idrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detallecotizacion`
--
ALTER TABLE `detallecotizacion`
  ADD CONSTRAINT `fk_detallecotizacion_categoria1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallecotizacion_cotizacion1` FOREIGN KEY (`idcotizacion`) REFERENCES `cotizacion` (`idcotizacion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallecotizacion_material1` FOREIGN KEY (`idmaterial`) REFERENCES `material` (`idmaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallecotizacion_subcategoria1` FOREIGN KEY (`idsubcategoria`) REFERENCES `subcategoria` (`idsubcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detallefactura`
--
ALTER TABLE `detallefactura`
  ADD CONSTRAINT `fk_detallefactura_factura1` FOREIGN KEY (`idfactura`) REFERENCES `factura` (`idfactura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallefactura_material1` FOREIGN KEY (`idmaterial`) REFERENCES `material` (`idmaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `detallenotagasto`
--
ALTER TABLE `detallenotagasto`
  ADD CONSTRAINT `fk_detallenotagasto_material1` FOREIGN KEY (`idmaterial`) REFERENCES `material` (`idmaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_detallenotagasto_notagasto1` FOREIGN KEY (`idnotagasto`) REFERENCES `notagasto` (`idnotagasto`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `fk_factura_razonsocial1` FOREIGN KEY (`idrazonsocialemisor`) REFERENCES `razonsocial` (`idrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `fk_material_tipomaterial1` FOREIGN KEY (`idtipomaterial`) REFERENCES `tipomaterial` (`idtipomaterial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_material_unidadmedida1` FOREIGN KEY (`idunidadmedida`) REFERENCES `unidadmedida` (`idunidadmedida`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `notagasto`
--
ALTER TABLE `notagasto`
  ADD CONSTRAINT `fk_notagasto_razonsocial1` FOREIGN KEY (`idrazonsocialemisor`) REFERENCES `razonsocial` (`idrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `obra`
--
ALTER TABLE `obra`
  ADD CONSTRAINT `fk_obra_estatusobra1` FOREIGN KEY (`idestatusobra`) REFERENCES `estatusobra` (`idestatusobra`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_obra_razonsocial1` FOREIGN KEY (`idrazonsocialconstructor`) REFERENCES `razonsocial` (`idrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_obra_razonsocial2` FOREIGN KEY (`idrazonsocialcliente`) REFERENCES `razonsocial` (`idrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_obra_razonsocial3` FOREIGN KEY (`idrazonsocialcontratista`) REFERENCES `razonsocial` (`idrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_obra_razonsocial4` FOREIGN KEY (`idrazonsocialasociado`) REFERENCES `razonsocial` (`idrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_obra_tipoobra1` FOREIGN KEY (`idtipoobra`) REFERENCES `tipoobra` (`idtipoobra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `obracategoria`
--
ALTER TABLE `obracategoria`
  ADD CONSTRAINT `fk_obracategoria_categoria1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_obracategoria_obra1` FOREIGN KEY (`idobra`) REFERENCES `obra` (`idobra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `presupuesto`
--
ALTER TABLE `presupuesto`
  ADD CONSTRAINT `fk_presupuesto_categoria1` FOREIGN KEY (`idcategoria`) REFERENCES `categoria` (`idcategoria`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_presupuesto_obra1` FOREIGN KEY (`idobra`) REFERENCES `obra` (`idobra`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `razonsocial`
--
ALTER TABLE `razonsocial`
  ADD CONSTRAINT `fk_razonsocial_statusrazonsocial1` FOREIGN KEY (`idstatusrazonsocial`) REFERENCES `statusrazonsocial` (`idstatusrazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_razonsocial_tiporazonsocial1` FOREIGN KEY (`idtiporazonsocial`) REFERENCES `tiporazonsocial` (`idtiporazonsocial`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`idrol`) REFERENCES `rol` (`idrol`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_usuario_statususuario1` FOREIGN KEY (`idstatususuario`) REFERENCES `statususuario` (`idstatususuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
