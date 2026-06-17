#!/bin/bash
# POZO — Setup WSL Ubuntu
set -e
echo "→ Instalando nvm + Node.js 20..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 20 && nvm use 20 && nvm alias default 20
echo "✓ Node $(node -v)"

echo "→ Instalando glab CLI..."
sudo apt-get update -qq && sudo apt-get install -y curl
curl -fsSL https://gitlab.com/gitlab-org/cli/-/releases/permalink/latest/downloads/glab_Linux_x86_64.tar.gz | \
  sudo tar -xz -C /usr/local/bin glab
echo "✓ glab instalado"

echo "→ Autenticando no GitLab..."
glab auth login --hostname gitlab.com

echo ""
echo "Setup concluido! Proximo: bash scripts/deploy-gitlab.sh"
