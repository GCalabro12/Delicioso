# DELICOSO — control de ferias

App web para registrar ferias, ventas y stock de materias primas de DELICOSO, sincronizada con Airtable.

## Uso rápido

1. Abre `delicioso v2_index.html` (o la última versión) en el navegador, desde el móvil, tablet u ordenador.
2. Ve a la pestaña **Ajustes** y pega tu Personal Access Token de Airtable. Se guarda solo en ese navegador/dispositivo.
3. Empieza a registrar:
   - **Nueva feria**: nombre, fecha, duración, acompañante, comentarios. Elige "Ya he ido antes" si es una feria repetida, para reutilizar el nombre exacto.
   - **Ventas**: selecciona la feria y añade artículo, unidades y precio por unidad.
   - **Materias primas**: stock actual y consumo estándar por feria, para saber qué comprar antes de la siguiente.
   - **Resumen**: ingresos totales, ventas por artículo y por feria.
4. Pestaña **Sincronizar**:
   - **Sincronizar ahora**: sube lo pendiente a Airtable.
   - **Actualizar desde Airtable**: trae lo que se haya añadido desde otro dispositivo.

## Varios dispositivos (móvil + tablet en la feria)

- Usa el mismo token en cada dispositivo (Ajustes → pegar token, una vez por dispositivo).
- Antes de empezar a vender, pulsa "Actualizar desde Airtable" en cada uno para partir del mismo punto.
- La sincronización **no es en tiempo real**: hay que pulsar el botón para subir o traer cambios.

## Sacar un token de Airtable

1. Ve a [airtable.com/create/tokens](https://airtable.com/create/tokens).
2. Nombre: `DELICOSO local`.
3. Scopes: `data.records:read` y `data.records:write`.
4. Acceso: solo la base **DELICOSO Vtas y compras**.
5. Créalo, cópialo y pégalo en la pestaña Ajustes de la app.

Si alguna vez el token queda expuesto (por ejemplo, si lo pegas por error en un chat), revócalo en esa misma página de Airtable y crea uno nuevo.

## Seguridad

Este archivo HTML no contiene ningún token ni credencial. El token se guarda únicamente en el navegador de cada dispositivo (localStorage) y solo se usa para hablar directamente con la API de Airtable. Es seguro subir este repositorio, incluso en público.

## Versiones

Los archivos siguen el patrón `delicioso vN_index.html`. La versión activa se indica en pequeño junto al título dentro de la propia app.
