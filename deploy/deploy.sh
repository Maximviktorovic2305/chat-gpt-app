#!/usr/bin/env bash
set -Eeuo pipefail
umask 022
site=chat
sha="${DEPLOY_SHA:?Verified commit required}"
[[ "$sha" =~ ^[0-9a-f]{40}$ ]] || exit 1
case "$site" in
  music) repo=/home/max/my-songs-site; repository=my-songs-site; npm_version=11.16.0 ;;
  chat) repo=/home/max/chat-gpt-app; repository=chat-gpt-app; npm_version=12.0.1 ;;
  *) exit 1 ;;
esac
export PATH=/home/max/.nvm/versions/node/v24.22.1/bin:/usr/bin:/bin
export NODE_OPTIONS=--max-old-space-size=1536 NEXT_TELEMETRY_DISABLED=1
export npm_config_cache="/home/max/build-sites/$site/npm-cache"
export DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build
build="/home/max/build-sites/$site/$sha"
runtime="/srv/native-sites/$site/releases/$sha"
mkdir -p "/home/max/build-sites/$site" "/home/max/.local/npm-$npm_version"
exec 9>"/home/max/build-sites/$site/deploy.lock"
flock 9
finish_deploy() {
  sudo -n /usr/local/sbin/sites-admin "$site" backup
  sudo -n /usr/local/sbin/sites-admin "$site" migrate "$sha"
  sudo -n /usr/local/sbin/sites-admin "$site" activate "$sha"
  sudo -n /usr/local/sbin/sites-admin "$site" retain
}
if [[ -f "$runtime/ready" ]]; then
  if [[ "${NATIVE_BUILD_ONLY:-0}" != 1 ]]; then finish_deploy; fi
  exit 0
fi
test ! -L "$runtime"
tool="/home/max/.local/npm-$npm_version/node_modules/npm/bin/npm-cli.js"
test -f "$tool" || npm install --prefix "/home/max/.local/npm-$npm_version" "npm@$npm_version" --ignore-scripts --no-audit --no-fund
npm_fixed() { node "$tool" "$@"; }
git -C "$repo" fetch origin "$sha"
if [[ ! -d "$build" ]]; then git -C "$repo" worktree add --detach "$build" "$sha"; fi
test "$(git -C "$build" rev-parse HEAD)" = "$sha"
cd "$build/server"
npm_fixed ci --no-audit --no-fund
npm_fixed run lint
npm_fixed run typecheck
npm_fixed test -- --runInBand
npm_fixed audit --audit-level=low
npm_fixed run build
test -f dist/main.js
cd ../client
node --env-file="/home/max/native-config/$site-web.env" "$tool" ci --no-audit --no-fund
npm_fixed run lint
npm_fixed run typecheck
npm_fixed run lint:fsd
npm_fixed run test:security
npm_fixed audit --audit-level=low
node --env-file="/home/max/native-config/$site-web.env" "$tool" run build
test -f dist/standalone/server.js
test ! -e "$runtime"
mkdir -p "$runtime/api" "$runtime/web"
cp -a ../server/{dist,package.json,package-lock.json} "$runtime/api/"
npm_fixed --prefix "$runtime/api" ci --omit=dev --ignore-scripts --no-audit --no-fund
tar -C dist/standalone --exclude='.env' --exclude='.env.*' -cf - . | tar -C "$runtime/web" -xf -
cp -a public "$runtime/web/"
cp -a dist/static "$runtime/web/dist/"
rm -rf "$runtime/web/dist/cache"
ln -s "/var/cache/native-$site-web" "$runtime/web/dist/cache"
touch "$runtime/ready"
if [[ "${NATIVE_BUILD_ONLY:-0}" == 1 ]]; then printf 'Built isolated runtime %s %s\n' "$site" "$sha"; exit 0; fi
finish_deploy
printf 'Deployed isolated runtime %s %s\n' "$site" "$sha"
