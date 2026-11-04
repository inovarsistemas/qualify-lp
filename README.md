# Next.js template

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

## CI/CD (GitHub Actions)

O workflow `.github/workflows/deploy.yml` roda em todo PR para a `main`
(lint + typecheck) e, em push na `main` (merge do PR) ou execução manual,
publica no servidor depois que a checagem passa.

1. O job `deploy` entra por SSH no servidor com uma chave exclusiva do CI.
2. Essa chave tem **comando forçado** (`restrict,command="…/ci-deploy-qualify.sh"`
   no `authorized_keys`): ela não abre shell, só executa o script de deploy.
3. O script faz `git merge --ff-only origin/main` no clone do servidor e roda
   `scripts/deploy.sh`, que reconstrói a imagem, recria o container e só dá o
   deploy como OK quando o app responde HTTP 200. Se falhar, o log do Actions
   traz `ps` e as últimas linhas de log.

O `.env` vive só no servidor e não é tocado pelo deploy.

Secrets do environment `production` (Settings → Environments): `SSH_HOST`,
`SSH_PORT`, `SSH_USER`, `SSH_PRIVATE_KEY` (par da chave com comando forçado) e
`SSH_KNOWN_HOSTS` (saída de `ssh-keyscan -p <porta> <host>`).

Para revogar o acesso do CI, remova a linha `github-actions-qualify-lp` do
`~/.ssh/authorized_keys` do servidor.
