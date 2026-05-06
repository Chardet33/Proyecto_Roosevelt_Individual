INSERT INTO zonas (id, mapbox_json, nombre_zona, peligrosidad) VALUES (1, '[[-0.4839169233197822, 38.348417685652805],[-0.4815677123779949, 38.351167830649786],[-0.47943497326687634, 38.352399496274614],[-0.4764586191535898, 38.352214305703114],[-0.4744590379772262, 38.3513590435428],[-0.4738797240611916, 38.350433588899364],[-0.4756391534831437, 38.34807779066267],[-0.47731673286693876, 38.34687253370336],[-0.4807042435479332, 38.346724526574945],[-0.48359247420486895, 38.347785773621325],[-0.4839169233197822, 38.348417685652805]]', 'Castillo Santa Barbara', 1);
INSERT INTO zonas (id, mapbox_json, nombre_zona, peligrosidad) VALUES (2, '[[-0.4839169233197822, 38.348417685652805],[-0.4815677123779949, 38.351167830649786],[-0.47943497326687634, 38.352399496274614],[-0.4764586191535898, 38.352214305703114],[-0.4744590379772262, 38.3513590435428],[-0.4738797240611916, 38.350433588899364],[-0.4756391534831437, 38.34807779066267],[-0.47731673286693876, 38.34687253370336],[-0.4807042435479332, 38.346724526574945],[-0.48359247420486895, 38.347785773621325],[-0.4839169233197822, 38.348417685652805]]', 'Castillo San Fernando', 1);
INSERT INTO zonas (id, mapbox_json, nombre_zona, peligrosidad) VALUES (3, 'coords: ...', 'Ensanche Diputación', 2);

ALTER TABLE zonas ALTER COLUMN id RESTART WITH (SELECT COALESCE(MAX(id), 0) + 1 FROM zonas);

INSERT INTO tipos_objeto (id, nombre_tipo, icono) VALUES (1, 'Escalera', './escalera.png');
INSERT INTO tipos_objeto (id, nombre_tipo, icono) VALUES (2, 'Ascensor', './ascensor.png');
INSERT INTO tipos_objeto (id, nombre_tipo, icono) VALUES (3, 'Construcción', './construcción.png');

ALTER TABLE tipos_objeto ALTER COLUMN id RESTART WITH (SELECT COALESCE(MAX(id), 0) + 1 FROM tipos_objeto);

INSERT INTO objetos (id, mapbox_json, nombre_objeto, descripcion, imagen, peligrosidad, id_zona, id_tipo_objeto) VALUES (1, '[-0.481472302211273, 38.34839297758327]', 'Escalera de Castillo', 'Escalera muy grande', './escalera_castillo.png', 1, 1, 1);
INSERT INTO objetos (id, mapbox_json, nombre_objeto, descripcion, imagen, peligrosidad, id_zona, id_tipo_objeto) VALUES (2, '[-0.4803870927337073, 38.34908023870918]', 'Escalera de Castillo 2', 'Escalera muy muy grande', './escalera_castillo.png', 1, 1, 1);
INSERT INTO objetos (id, mapbox_json, nombre_objeto, descripcion, imagen, peligrosidad, id_zona, id_tipo_objeto) VALUES (3, '[-0.47735138279091416, 38.3471234043368]', 'Ascensor de Castillo', 'Ascensor muy grande', './ascensor_castillo.png', 0, 1, 2);
INSERT INTO objetos (id, mapbox_json, nombre_objeto, descripcion, imagen, peligrosidad, id_zona, id_tipo_objeto) VALUES (4, '[-0.47811194504853916, 38.35206531783055]', 'Construccion de Castillo', 'Construccion muy grande', './construccion_castillo.png', 2, 1, 3);

ALTER TABLE objetos ALTER COLUMN id RESTART WITH (SELECT COALESCE(MAX(id), 0) + 1 FROM objetos);


INSERT INTO usuarios (id, username, password, email,  email_sec, tel, fecha_nac, foto, administrador) VALUES
(1,'admin',  '$2a$10$fzcGgF.8xODz7ptkmZC.OeX1Kj5GDI//FhW2sG0vlshW6ZAKJky0e', 'admin@balmis.com','admin1@balmis.com',  '100000000', '1990-01-01',  'admin.jpg',  TRUE), -- password: 5678
(2,'user',  '$2a$10$ayw3FCBIkupFt5n9lrmJQe9XZMJhZiNCjaoOkXo/Ba0KZgymO01ce', 'user@balmis.com','us@balmis.com',  '200000000', '1991-01-01',  'user.jpg',  FALSE), -- password: 1234
(3,'user1',  '$2a$10$ayw3FCBIkupFt5n9lrmJQe9XZMJhZiNCjaoOkXo/Ba0KZgymO01ce', 'user1@balmis.com','us1@balmis.com',  '200000000', '1991-01-01',  'user.jpg',  FALSE), -- password: 1234
(4,'user2',  '$2a$10$ayw3FCBIkupFt5n9lrmJQe9XZMJhZiNCjaoOkXo/Ba0KZgymO01ce', 'user2@balmis.com','us2@balmis.com',  '200000000', '1991-01-01',  'user.jpg',  FALSE); -- password: 1234

-- '$2a$10$n1/e13.wUb0ESrCxjZUNsunO4h/Go9QH1/25co1Scd6DQx1O51/KC' ==>  password: password
-- '$2a$10$APUnUaXbTtPf8AjQqzeHAOTzTw.wFUimrqrSn33dKD6hrO4JR.jcu' ==> password: admin

ALTER TABLE usuarios ALTER COLUMN id RESTART WITH (SELECT COALESCE(MAX(id), 0) + 1 FROM usuarios);


INSERT INTO rutas (id, mapbox_json, nombre_ruta, descripcion, fecha_pub, likes_count, id_zona, id_usuario_autor) VALUES (1, '[[-0.4823535037734814, 38.34775791453754],[-0.47852430655979106, 38.34935405748996]]', 'Sun', '123', '1990-01-01', 3, 1, 1);
INSERT INTO rutas (id, mapbox_json, nombre_ruta, descripcion, fecha_pub, likes_count, id_zona, id_usuario_autor) VALUES (2, '[[-0.4831974690308414, 38.347851174571275],[-0.477874741359102, 38.34961649271111]]', 'Moon', '456', '1990-01-01', 4, 1, 2);
INSERT INTO rutas (id, mapbox_json, nombre_ruta, descripcion, fecha_pub, likes_count, id_zona, id_usuario_autor) VALUES (3, '[[-0.47680609397994544, 38.35213085816466],[-0.47774495913199644, 38.349784641734686]]', 'Ruta #3', '789', '1990-01-01', 5, 1, 2);

ALTER TABLE rutas ALTER COLUMN id RESTART WITH (SELECT COALESCE(MAX(id), 0) + 1 FROM rutas);


INSERT INTO likes (id_usuario, id_ruta) VALUES (1, 1);
INSERT INTO likes (id_usuario, id_ruta) VALUES (2, 1);

-- INSERT INTO likes (id_usuario, id_ruta) VALUES (2, 1);
-- INSERT INTO likes (id_usuario, id_ruta) VALUES (3, 2);

INSERT INTO comentarios (id, comentario, fecha_pub, id_usuario, id_ruta) VALUES (1, 'Ruta muy buena', '1991-01-01', 1, 1);
INSERT INTO comentarios (id, comentario, fecha_pub, id_usuario, id_ruta) VALUES (2, 'Perfecto', '1991-01-01', 2, 2);
INSERT INTO comentarios (id, comentario, fecha_pub, id_usuario, id_ruta) VALUES (3, 'Me gustaba', '1991-01-01', 3, 2);

ALTER TABLE comentarios ALTER COLUMN id RESTART WITH (SELECT COALESCE(MAX(id), 0) + 1 FROM comentarios);

INSERT INTO mensajes (id, titulo, mensaje, nombre, email, tel, fecha_pub) VALUES (1, 'Ayuda', 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', 'vadim', 'example@gmail.com', '123456789', '2025-11-01');
INSERT INTO mensajes (id, titulo, mensaje, nombre, email, tel, fecha_pub) VALUES (2, 'Mi idea', 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', 'vadim', 'example@gmail.com', '123456789', '2025-11-01');
INSERT INTO mensajes (id, titulo, mensaje, nombre, email, tel, fecha_pub) VALUES (3, '¿Como crear ruta?', 'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', 'vadim', 'example@gmail.com', '123456789', '2025-11-01');

ALTER TABLE mensajes ALTER COLUMN id RESTART WITH (SELECT COALESCE(MAX(id), 0) + 1 FROM mensajes);


INSERT INTO lineas_objetos (id_ruta, id_objeto) VALUES (1, 1);
INSERT INTO lineas_objetos (id_ruta, id_objeto) VALUES (1, 2);
INSERT INTO lineas_objetos (id_ruta, id_objeto) VALUES (2, 3);
INSERT INTO lineas_objetos (id_ruta, id_objeto) VALUES (3, 4);


INSERT INTO lineas_rutas_fav (id_usuario, id_ruta) VALUES (1, 1);
INSERT INTO lineas_rutas_fav (id_usuario, id_ruta) VALUES (2, 1);
INSERT INTO lineas_rutas_fav (id_usuario, id_ruta) VALUES (1, 2);