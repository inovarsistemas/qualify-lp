#!/bin/sh
# Deploy no servidor da Inovar. Roda a partir da raiz do clone
# (~/websites/qualify-lp), chamado pelo ~/bin/ci-deploy-qualify.sh.
#
# `--build` porque a imagem é construída no próprio servidor; não há registry.
set -e

cd "$(dirname "$0")/.."

# Compose v2 (plugin `docker compose`) ou, na falta dele, o v1 (`docker-compose`).
if docker compose version >/dev/null 2>&1; then
  DC="docker compose"
else
  DC="docker-compose"
fi

LIMITE_SEGUNDOS=120

# O .env não vem do git. Sem ele o compose aborta com uma mensagem pouco óbvia
# sobre APP_DOMAIN.
if [ ! -f .env ]; then
  echo "[deploy] .env não encontrado em $(pwd) — crie-o no servidor (ver .env.example)."
  exit 1
fi

# Sem isto o log do GitHub Actions termina em "não respondeu" e não diz por quê.
diagnostico() {
  echo "----- $DC ps -----"
  $DC ps || true
  echo "----- $DC logs (últimas 80 linhas) -----"
  $DC logs --tail=80 web || true
}

echo "[deploy] subindo qualify-lp..."
$DC up -d --build

# O compose não define healthcheck: considera o deploy OK quando o app responde
# HTTP 200 dentro do container (o busybox wget da imagem alpine falha em != 2xx).
echo "[deploy] aguardando o app responder (até ${LIMITE_SEGUNDOS}s)..."
decorrido=0
while [ "$decorrido" -lt "$LIMITE_SEGUNDOS" ]; do
  if $DC exec -T web wget -q -O /dev/null http://127.0.0.1:3000/ >/dev/null 2>&1; then
    echo "[deploy] ok em ${decorrido}s."
    exit 0
  fi
  sleep 2
  decorrido=$((decorrido + 2))
done

echo "[deploy] o app não respondeu em ${LIMITE_SEGUNDOS}s."
diagnostico
exit 1
