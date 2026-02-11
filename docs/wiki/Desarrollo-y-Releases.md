# Desarrollo y releases

## Flujo recomendado

1. Trabajar cambios en beta.
2. Actualizar `CHANGELOG.md` de la app.
3. Validar build e instalacion.
4. Promocionar a estable.

## Checklist minima antes de release

- Build sin errores.
- Inicio correcto de la app.
- UI operativa.
- Sin errores criticos en logs.
- Changelog actualizado.

## Publicar en GitHub Wiki

GitHub Wiki usa un repositorio separado (`.wiki.git`).

Ejemplo:

```bash
git clone https://github.com/danielmigueltejedor/apps-nodalia.wiki.git
cd apps-nodalia.wiki
cp -R ../apps-nodalia/docs/wiki/* .
git add .
git commit -m "docs(wiki): initial wiki for apps-nodalia"
git push
```
