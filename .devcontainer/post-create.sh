#!/usr/bin/env bash
# Roda uma vez quando o Codespace é criado.
set -euo pipefail

echo "==> Instalando dependências do projeto"
npm install

echo "==> Instalando Claude Code (instalador nativo oficial)"
curl -fsSL https://claude.ai/install.sh | bash

echo "==> Instalando Codex CLI"
npm install -g @openai/codex

if [ ! -f .env.local ]; then
  echo "==> Criando .env.local a partir do .env.example (preencha os valores!)"
  cp .env.example .env.local
fi

echo "==> Pronto. Rode 'npm run dev' para subir o app."
