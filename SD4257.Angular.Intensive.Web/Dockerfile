#Stage 1: Build application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["./API/API.csproj", "API/"]
COPY ["./Application/Application.csproj", "Application/"]
RUN dotnet restore "API/API.csproj"
COPY . .
WORKDIR "/src/API"
RUN dotnet build "API.csproj" -c Release -o /app/build

#Stage 2: Publish
FROM build AS publish
RUN dotnet publish "API.csproj" -c Release -o /app/publish

#Stage 3: Run
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "API.dll"]