export interface Response<T> {
    data: Data<T>;
    status: number;
    statusText: string;
    request: Request;
}

export interface ResposeSector {
    data: Sector[];
    status: number;
    statusText: string;
    request: Request;
}

export interface Data<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    empty: boolean;
}

export interface Empleado {
    id: ID;
    ageSucursCodigo: number;
    numeroIdentificacion: string;
    nombres: string;
    apellidos: string;
    telefonoCelular: string;
    mailPrincipal: string;
    estado: string;
    estadoAsignacion: string;
    cargo: Cargo;
    sucursal: Sucursal;
    usuarioIngreso: number;
    usuarioModificacion: number;
    usuario: Usuario;
    genero: string;
    direccion: string;
    sector: Sector;
}

export interface Cargo {
    id: ID;
    descripcion: string;
    tipoCargo: string;
}

export interface ID {
    codigo: string;
    ageLicencCodigo: number;
}

export interface Sector {
    id: SectorID;
    descripcion: string;
}

export interface SectorID {
    codigo: number;
    ageSucursAgeLicencCodigo: number;
    ageSucursCodigo: number;
}

export interface Sucursal {
    id: ID;
    descripcion: string;
    direccion: string;
}

export interface Usuario {
    codigo: string;
    ageLicencCodigo: string;
    archivoFoto: string;
    codigoExterno: string;
    tipoUsuario: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    primerNombre: string;
    segundoNombre: string;
    fechaNacimiento: string;
    direccion: string;
    estadoCivil: string;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface Sort {
    unsorted: boolean;
    empty: boolean;
    sorted: boolean;
}

export interface Usuario {
    estado: string;
    fechaEstado: string;
    fechaIngreso: string;
    fechaModificacion: string;
    observacionEstado: string;
    ubicacionIngreso: string;
    ubicacionModificacion: string;
    usuarioIngreso: string;
    usuarioModificacion: string;
    id: ID;
    agePersonAgeLicencCodigo: number;
    agePersonCodigo: number;
    ageSucursAgeLicencCodigo: number;
    ageSucursCodigo: number;
    ageTipIdCodigo: number;
    apellidos: string;
    archivoFoto: string;
    clave: string;
    codigoExterno: string;
    mailPrincipal: string;
    nombres: string;
    numeroIdentificacion: string;
    primerIngreso: string;
    telefonoCelular: string;
    tipoUsuario: string;
    tipoRegistro: string;
    direccion: string;
    especialidadOmniMedico: string;
    ageLocaliCodigo: number;
    ageLocaliAgeTipLoCodigo: number;
    ageAgeTipLoAgePaisCodigo: number;
    tokenFirebase: string;
    cliTIpClCodigo: string;
    cliTipClAgeLicencCodigo: string;
    ageClaCoCodigo: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    primerNombre: string;
    segundoNombre: string;
    estadoCivil: string;
    fechaNacimiento: string;
    hcu: string;
    nacionalidad: string;
    genero: string;
    verificado: string;
    tipoUsuarioOmni: string;
    agePerfilList: string;
}