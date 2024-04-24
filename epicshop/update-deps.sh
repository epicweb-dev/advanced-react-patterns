npx npm-check-updates --dep prod,dev --upgrade --root
rm -rf node_modules package-lock.json ./exercises/**/node_modules
npm install
npm run setup
npm run typecheck
npm run lint --fix
