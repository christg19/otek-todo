# otek-todo
![Descripción de la imagen](https://i.imgur.com/HekEzVP.png)

## Requisitos

- Node.js (v8.x o superior, se recomienda la versión LTS)
- Angular CLI (v7)
- .NET Framework 4.5
- Visual Studio 2017/2019 (o superior)
- Imagen de sqlserver en Docker (docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong(!)Password" -p 1433:1433 --name sqlserver -d mcr.microsoft.com/mssql/server:2019-latest)

### Verificar versiones de Node.js y npm

# Correr frontend - Angular 7
1. cd frontend
2. npm install -g @angular/cli@7
3. npm install
4. ng serve

# Correr backend - .Net Framework 4.5
1. cd backend
2. Abrir solución
3. Modificar connectionString
4. F5 para correr

![appImage](https://i.imgur.com/UfK9yt8.png)
![swagger](https://i.imgur.com/Wp1Ujww.png)
