<h1 align="center">Duolingo Xp </h1>

<h3 align="center">
Mantenha sua sequência e ganhe XP no Duolingo
</p>
  
<p align="center">
  <a href="https://discord.gg/8dEJGEw7tU" target="_blank">
    <img src="duo.svg" width="128px"/>
  </a>
</p>

<h4 align="center">
  Este projeto é um script que automatiza as práticas do Duolingo para você. Assim, você pode manter sua sequência e subir no ranking da liga sem se preocupar em perder o nível.
</p>

<h3 align="center"> Como usar</h1>

1. Faça um fork deste repositório para o seu github
2. Acesse o site do Duolingo e faça login na sua conta
3. Abra o console do navegador (Option (⌥) + Command (⌘) + J no macOS ou Shift + CTRL + J no Windows/Linux)
4. Obtenha o token JWT executando este código no console e copie o valor (sem as aspas)

```js
document.cookie.split(';').find(cookie => cookie.includes('jwt_token')).split('=')[1]
```

5. Vá para o seu repositório bifurcado e clique em Configurações > Segredos e Variáveis > Ações
6. Clique no botão Novo segredo do repositório e digite DUOLINGO_JWT como nome do segredo e cole o valor copiado na etapa 4 como valor do segredo
7. Adicione outro segredo do repositório chamado DISCORD_WEBHOOK e cole a URL do seu webhook do Discord como valor do segredo
8. Vá para a guia Ações do seu repositório bifurcado e clique no botão Eu entendo meus fluxos de trabalho, vá em frente e habilite-os

## Fluxos de trabalho

Este projeto usa o GitHub Actions para executar dois fluxos de trabalho:

### 🔥 Mantenedor de sequência

Este fluxo de trabalho é acionado todos os dias às 23:00 UTC e faz uma prática no Duolingo para manter sua sequência viva. Você pode ver o código do fluxo de trabalho aqui.

### 📚 Estudo

Este fluxo de trabalho é acionado manualmente por você e faz várias lições no Duolingo para ganhar XP. Você pode escolher o número de lições a serem feitas e o nível de dificuldade. Você pode ver o código do fluxo de trabalho aqui.

## Ressalvas

- Este projeto não ajuda com as missões diárias ou dos amigos, ele só ganha XP para o ranking da liga
- Este projeto não faz lições ou histórias reais, apenas práticas, por isso não afeta o seu progresso de aprendizagem
- Este projeto não é afiliado ou endossado pelo Duolingo, use por sua própria conta e risco
#
