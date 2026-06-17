#!/bin/bash
# POZO — Unzip, configure e push para GitLab
# Execute APOS setup-wsl.sh
# EDITE as variaveis abaixo antes de rodar

set -e

# ═══════════════════════════════════════
# EDITE AQUI antes de rodar
GITLAB_GROUP="hubstry-group"
REPO_NAME="pozo-app"
GITLAB_USER="seu-usuario-gitlab"
# ═══════════════════════════════════════

REPO_URL="git@gitlab.com:${GITLAB_GROUP}/${REPO_NAME}.git"
DEST="$HOME/projects/pozo-app"
WIN_DOWNLOADS="$(wslpath "$(wslvar USERPROFILE)")/Downloads"
ZIP_PATH="${WIN_DOWNLOADS}/pozo-app.zip"

echo ""
echo "╔══════════════════════════════════╗"
echo "║   POZO — Deploy GitLab           ║"
echo "╚══════════════════════════════════╝"
echo ""

# 1. Verificar zip
if [ ! -f "$ZIP_PATH" ]; then
  echo "ERRO: nao encontrei $ZIP_PATH"
  echo "Certifique-se que o pozo-app.zip esta na pasta Downloads do Windows."
  exit 1
fi
echo "✓ pozo-app.zip encontrado"

# 2. Extrair
echo "→ Extraindo pozo-app.zip..."
mkdir -p "$HOME/projects"
cd "$HOME/projects"
unzip -o "$ZIP_PATH" -d "$HOME/projects/"
echo "✓ Extraido em $DEST"

# 3. Criar repo no GitLab (se nao existir)
echo "→ Criando repositorio no GitLab..."
glab repo create "${GITLAB_GROUP}/${REPO_NAME}" \
  --private \
  --description "POZO — Descoberta de musica crista. Genesis 24." \
  --no-interaction 2>/dev/null && echo "✓ Repo criado" || echo "  Repo ja existe, continuando..."

# 4. Init git local
cd "$DEST"
if [ ! -d ".git" ]; then
  git init
  git remote add origin "$REPO_URL"
  echo "✓ Git iniciado"
else
  git remote set-url origin "$REPO_URL"
  echo "✓ Remote atualizado"
fi

# 5. Configurar .env local
if [ ! -f ".env" ]; then
  cp .env.example .env
  echo ""
  echo "⚠️  IMPORTANTE: edite o .env com suas chaves antes de rodar o app"
  echo "    nano $DEST/.env"
  echo ""
fi

# 6. Instalar dependencias Node
echo "→ npm install..."
npm install
echo "✓ Dependencias instaladas"

# 7. Commit e push
echo "→ Commit inicial..."
git config user.email "${GITLAB_USER}@users.noreply.gitlab.com"
git config user.name "POZO"
git add .
git commit -m "feat: estrutura inicial POZO MVP - Genesis 24" || echo "  Nada novo para commitar"
git branch -M main
git push -u origin main
echo "✓ Push concluido"

echo ""
echo "╔══════════════════════════════════╗"
echo "║   POZO no ar no GitLab!          ║"
echo "╚══════════════════════════════════╝"
echo ""
echo "  Repo:    https://gitlab.com/${GITLAB_GROUP}/${REPO_NAME}"
echo "  Dev:     cd $DEST && npm run dev"
echo "  Browser: http://localhost:5173"
echo ""
echo "Proximo passo — conectar Vercel:"
echo "  https://vercel.com/new"
echo "  → Import Git Repository → GitLab → ${REPO_NAME}"
echo "  → Add env vars: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_ANTHROPIC_KEY"
