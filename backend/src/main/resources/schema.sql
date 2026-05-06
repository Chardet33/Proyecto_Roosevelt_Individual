
CREATE TABLE IF NOT EXISTS zonas(
    id              INT AUTO_INCREMENT PRIMARY KEY,
    mapbox_json     VARCHAR(600) NOT NULL,
    nombre_zona     VARCHAR(50) NOT NULL,
    peligrosidad    INT NOT NULL
);

CREATE TABLE IF NOT EXISTS tipos_objeto (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    nombre_tipo     VARCHAR(30) NOT NULL UNIQUE,
    icono           VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS objetos (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    mapbox_json     VARCHAR(300) NOT NULL,
    nombre_objeto   VARCHAR(50) NOT NULL,
    descripcion     VARCHAR(200) NOT NULL,
    imagen          VARCHAR(50) NOT NULL,
    peligrosidad    INT NOT NULL,
    id_zona         INT,
    id_tipo_objeto  INT,
    FOREIGN KEY (id_zona) REFERENCES zonas(id) ON DELETE SET NULL,
    FOREIGN KEY (id_tipo_objeto) REFERENCES tipos_objeto(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS usuarios(
    id              Integer AUTO_INCREMENT PRIMARY KEY,
    username        VARCHAR(50) UNIQUE NOT NULL,
    password        VARCHAR(200) NOT NULL,
    email           VARCHAR(100) UNIQUE NOT NULL,
    email_sec       VARCHAR(100),
    tel             VARCHAR(15),
    fecha_nac       DATE,
    foto            VARCHAR(50),
    administrador   BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS rutas(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    mapbox_json VARCHAR(300) NOT NULL,
    nombre_ruta VARCHAR(50) NOT NULL,
    descripcion VARCHAR(200),
    fecha_pub   DATE,
    likes_count  INT,
    id_zona INT,
    id_usuario_autor INT,
    FOREIGN KEY (id_zona) REFERENCES zonas(id) ON DELETE SET NULL,
    FOREIGN KEY (id_usuario_autor) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS comentarios(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    comentario  VARCHAR(200) NOT NULL,
    fecha_pub   DATE NOT NULL,
    id_ruta     INT,
    id_usuario  INT,
    FOREIGN KEY (id_ruta) REFERENCES rutas(id) ON DELETE SET NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS likes(
    id_usuario      INT,
    id_ruta         INT,
    PRIMARY KEY (id_usuario, id_ruta),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (id_ruta) REFERENCES rutas(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS mensajes(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    titulo      VARCHAR(30) NOT NULL,
    mensaje     VARCHAR(300) NOT NULL,
    nombre      VARCHAR(50) NOT NULL,
    email       VARCHAR(100) NOT NULL,
    tel         VARCHAR(15) NOT NULL,
    fecha_pub   DATE NOT NULL    
);


CREATE TABLE IF NOT EXISTS lineas_objetos(
    id_ruta         INT,
    id_objeto       INT,
    PRIMARY KEY (id_ruta, id_objeto),
    FOREIGN KEY (id_ruta) REFERENCES rutas(id) ON DELETE SET NULL,
    FOREIGN KEY (id_objeto) REFERENCES objetos(id) ON DELETE SET NULL     
);


CREATE TABLE IF NOT EXISTS lineas_rutas_fav(
    id_usuario      INT,
    id_ruta         INT,
    PRIMARY KEY (id_usuario, id_ruta),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE SET NULL,
    FOREIGN KEY (id_ruta) REFERENCES rutas(id) ON DELETE SET NULL     
);