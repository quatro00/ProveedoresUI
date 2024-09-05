import {
  SideNavInterface
} from '../../interfaces/side-nav.type';

export const AdminRoutes: SideNavInterface[] = [
  
  {
    path: 'administrador/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/orden-compra',
    title: 'Ordenes de compra',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: '',
    title: 'Citas',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[
      {
        path: 'administrador/catalogo-pacientes',
        title: 'Control de citas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'administrador/citas-diarias',
        title: 'Citas diarias',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'administrador/bloquear-andenes',
        title: 'Bloquear andenes',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'administrador/centros-distribucion',
        title: 'Centros de distribucion',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'administrador/administracion-materiales',
        title: 'Administracion de materiales',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      }
    ]
  },
  {
    path: 'administrador/catalogoarticulos',
    title: 'Etiquetas',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: '',
    title: 'Administración de incidencias',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[
      {
        path: 'administrador/incidencias',
        title: 'Incidencias',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'administrador/tipos-incidencia',
        title: 'Tipos de incidencia',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
    ]
  },
  {
    path: '',
    title: 'Facturacion',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[
      {
        path: 'inventario/entrada-inventario',
        title: 'Administración de facturas',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'inventario/equivalencia-inventario',
        title: 'Cargos y devoluciones',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'inventario/equivalencia-inventario',
        title: 'Historico de pagos',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      },
      {
        path: 'inventario/equivalencia-inventario',
        title: 'Facturas sin asn',
        iconType: 'nzIcon',
        iconTheme: 'outline',
        icon: '',
        submenu:[]
      }
    ]
  },
  {
    path: 'administrador/mensajes-institucionales',
    title: 'Mensajes institucionales',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/configuracion',
    title: 'Configuración',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/departamentos',
    title: 'Departamentos',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/proveedores',
    title: 'Administrar proveedores',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
  {
    path: 'administrador/usuarios',
    title: 'Catálogo de administradores',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },
]

export const MercaderiaRoutes: SideNavInterface[] = [
  
  {
    path: 'mercaderia/dashboard',
    title: 'Dashboard',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
},
{
  path: 'mercaderia/ordenes-compra',
  title: 'Ordenes de compra',
  iconType: 'nzIcon',
  iconTheme: 'outline',
  icon: '',
  submenu:[]
},
{
  path: 'mercaderia/citas',
  title: 'Citas',
  iconType: 'nzIcon',
  iconTheme: 'outline',
  icon: '',
  submenu:[
    {
      path: 'mercaderia/citas',
      title: 'Citas registradas',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: '',
      submenu:[]
    },
    {
    path: 'mercaderia/citas/nueva-cita',
    title: 'Registrar cita',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },]
},
{
  path: 'mercaderia/facturacion',
  title: 'Facturas',
  iconType: 'nzIcon',
  iconTheme: 'outline',
  icon: '',
  submenu:[
    {
      path: 'mercaderia/facturacion/subir-factura',
      title: 'Subir factura',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: '',
      submenu:[]
    },
    {
    path: 'mercaderia/facturacion/reporte-facturas',
    title: 'Reporte de facturas',
    iconType: 'nzIcon',
    iconTheme: 'outline',
    icon: '',
    submenu:[]
  },]
}
]

  export const ClienteRoutes: SideNavInterface[] = [
  
    {
      path: 'cliente/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'home',
      submenu:[]
    },
   
]

  export const SupervisorRoutes: SideNavInterface[] = [

    {
      path: 'supervisor/dashboard',
      title: 'Dashboard',
      iconType: 'nzIcon',
      iconTheme: 'outline',
      icon: 'appstore-add',
      submenu:[]
    },
]
