# Lumina Mobile 

Aplicativo mobile de livraria/biblioteca digital, desenvolvido em **React Native (Expo)**, com painel administrativo integrado e API própria para gerenciamento de livros, autores e categorias.

## Documentação

A documentação completa do projeto está disponível em:

https://docs.google.com/document/d/1zH0nHSs0Qsa-eeoPck_fIWNAonI89X2ozjJp_NDVNeU/edit?tab=t.0

## Funcionalidades

- Autenticação de usuários (login/registro) com controle de acesso por roles (usuário/admin)
- Listagem e visualização de livros, autores, categorias e coleções
- Leitura de livros em PDF diretamente no app
- Painel administrativo (CRUD de categorias, autores e livros) restrito a usuários admin
- Suporte a tema claro/escuro
- Upload de arquivos

## Tecnologias

- **Mobile:** React Native, Expo, TypeScript, NativeWind (Tailwind para RN), Expo Router
- **Autenticação:** expo-secure-store, JWT
- **Leitura de PDF:** WebView + pdf.js
- **Backend/API:** Node.js, Express, Sequelize
- **Banco de dados:** MySQL



## Como rodar o projeto

1. Clone o repositório

   ```bash
   git clone https://github.com/Flaviagab/Lumina_Mobile.git
   ```

2. Instale as dependências
   ```bash
   npm install
   ```
3. Configure a URL da API em `services/api.ts`
4. Inicie o projeto
   ```bash
   npx expo start
   ```
5. Abra no **Expo Go** (celular) ou em um emulador Android/iOS

> **Observação:** para testar em dispositivo físico via cabo USB, use `adb reverse` para encaminhar a porta da API local.

## API

A API do projeto é separada e responsável pelo gerenciamento de dados de livros, autores, categorias e usuários.

## Roles

- **user:** acesso às telas principais do app (home, livros, autores, categorias, leitura)
- **admin:** acesso adicional ao painel administrativo com os CRUDs
