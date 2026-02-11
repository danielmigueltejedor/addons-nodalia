# Tailscale (Nodalia)

Canal estable de Tailscale para Home Assistant.

## Objetivo

- Conexion segura remota.
- Onboarding simplificado.
- Panel de estado y acciones operativas.

## Configuracion recomendada

- `setup_profile`: `home_access` para uso normal.
- `webui_readonly`: `false` si necesitas acciones de control desde WebUI.
- `tags`: usa formato `tag:nombre` (ejemplo: `tag:ha`).

## Problemas frecuentes

- **NeedLogin**: completar login desde onboarding.
- **Viewing en WebUI**: revisar ACL/tagOwners en Tailscale admin.
- **Carga inicial lenta tras actualizar**: puede tardar en primer arranque, luego se estabiliza.

## Referencias locales

- `tailscale_nodalia/README.md`
- `tailscale_nodalia/DOCS.md`
