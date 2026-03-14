# Changelog

## 0.1.0-beta.4
- Updated Matter.js packages to latest npm stable (`@matter/main`, `@matter/nodejs`, `@matter/general` => `0.16.10`).
- Added first beta support for exposing selective room cleaning through Matter Service Area for robot vacuums.
- Improved compatibility with multiple Home Assistant vacuum attribute formats:
  - tuple/object room maps (`room_mapping`, `room_map`, `segment_map`)
  - object/comma-separated selected area formats
  - mixed naming/id representations for segments and rooms
- Added configurable service action payload mapping for selective cleaning:
  - `matter_service_area_action`
  - `matter_service_area_command_key`
  - `matter_service_area_params_key`
  - boolean-like parsing for `matter_service_area_params_nested`
- Added/expanded vacuum service area unit tests for parser and request normalization behavior.
- Switched beta image build to package and install the local `upstream` Matter Hub sources, so beta features are included in the addon image.

## 0.1.0-beta.3
- Updated Matter Hub beta branding to the new polished logo:
  - `icon.png`
  - `logo.png`

## 0.1.0-beta.2
- Updated beta branding assets:
  - `icon.png`
  - `logo.png`

## 0.1.0-beta.1
- Initial Nodalia beta app packaging for Matter Hub.
