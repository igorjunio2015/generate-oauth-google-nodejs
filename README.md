# Gerador de token OAuth para projetos Google

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/iuricode/README-template?style=for-the-badge)

> Se você deseja autenticar seus projetos utilizando serviços da Google, com esse repositório isso será mais fácil.
> Esse projeto tem como exemplo mostrar como autenticar uma simples planilha

## 👩‍💻 Instalando o Gerador de token OAuth para projetos Google

Para instalar o __Gerador de token OAuth para projetos Google__, siga estas etapas:

```
$ git clone https://github.com/igorjunio2015/generate-oauth-nodejs && cd generate-oauth-nodejs
```
```
$ npm install
```
```
$ npm run dev
```

## 👨‍🏭 Usando o Gerador de token OAuth para projetos Google

Para usar __Gerador de token OAuth para projetos Google__, siga estas etapas:

1. Crie uma nova credencial OAuth no Console Google, e realiza a exportação em JSON, para que fique mais fácil configurar o arquivo ```src\services\config\auth\credentials.js```, que deve ter a estrutura abaixo:
    <br>
    > Na criação você irá criar o __IDs do cliente OAuth 2.0__, do __Tipo__ = Computador/Desktop
    
    ```
    module.exports = {
        "installed": {
            "client_id": "***.apps.googleusercontent.com",
            "project_id": "***",
            "auth_uri": "https://accounts.google.com/o/oauth2/auth",
            "token_uri": "https://oauth2.googleapis.com/token",
            "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
            "client_secret": "***",
            "redirect_uris": [
                "urn:ietf:wg:oauth:2.0:oob",
                "http://localhost"
            ]
        }
    }
    ```
2. Crie um arquivo ```.env``` na raiz do projeto, fora do ```src``` e configure a variável abaixo:
    ```
    SPREADSHEET_ID=
    ```

3. Ao executar o comando ```$ npm run dev``` no console irá aparecer a mensagem abaixo:
    ```
    http SHEETS Authorize this app by visiting this url: https://accounts.google.com/o/oauth2/v2/auth?access_type=offline.....0%3Aoob
    Enter the code from that page here:
    ```
4. Você irá acessar a URL acima, autenticar seu usuário e copiar o código que será fornecido e copiar no console. Após isso será alimentado o arquivo ```src\services\config\auth\client-secret.json``` com os dados dessa sessão, e com isso você não precisará mais realizar autenticação para essas credencias (não manualmente hehehe).
<br>
5. Após tudo isso é só criar as funções de consumo conforme o arquivo ```src\main.js``` mostra de exemplo.