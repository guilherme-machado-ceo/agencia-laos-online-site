#!/bin/bash
# POZO — Push inicial para GitLab via HTTPS (sem SSH, sem glab)
# Cole seu token quando pedido
set -e

GITLAB_USER="guilherme-machado-ceo"
GITLAB_GROUP="hubstry-group"
REPO_NAME="pozo-app"

DEST="$HOME/projects/pozo-app"
WIN_DOWNLOADS="$(wslpath "$(wslvar USERPROFILE)")/Downloads"
ZIP_PATH="${WIN_DOWNLOADS}/pozo-app_v2.zip"

echo ""
echo "╔══════════════════════════════════╗"
echo "║   POZO — Push GitLab             ║"
echo "╚══════════════════════════════════╝"
echo ""

# 1. Extrair zip
if [ -f "$ZIP_PATH" ]; then
  echo "→ Extraindo pozo-app_v2.zip..."
  mkdir -p "$HOME/projects"
  unzip -o "$ZIP_PATH" -d "$HOME/projects/"
  echo "✓ Extraido em $DEST"
else
  echo "ERRO: $ZIP_PATH nao encontrado"
  echo "Verifique se o arquivo esta em Downloads"
  exit 1
fi

cd "$DEST"

# 2. .env local
[ ! -f ".env" ] && cp .env.example .env && echo "→ .env criado"

# 3. npm install
echo "→ npm install..."
npm install
echo "✓ Dependencias OK"

# 4. Git init e push via HTTPS
echo ""
echo "→ Configurando git..."
git init
git config user.email "${GITLAB_USER}@users.noreply.gitlab.com"
git config user.name "Guilherme Machado"

echo ""
echo "Digite seu Personal Access Token do GitLab"
echo "(GitLab → avatar → Edit profile → Access Tokens → crie com escopo 'write_repository')"
echo -n "Token: "
read -s TOKEN
echo ""

REMOTE="https://${GITLAB_USER}:${TOKEN}@gitlab.com/${GITLAB_GROUP}/${REPO_NAME}.git"
git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"

git add .
git commit -m "feat: estrutura inicial POZO MVP - Genesis 24"
git branch -M main
git push -u origin main

echo ""
echo "✓ Push concluido!"
echo ""
echo "Repo: https://gitlab.com/${GITLAB_GROUP}/${REPO_NAME}"
echo ""
echo "Abra o Gitpod:"
echo "https://gitpod.io/#https://gitlab.com/${GITLAB_GROUP}/${REPO_NAME}"
