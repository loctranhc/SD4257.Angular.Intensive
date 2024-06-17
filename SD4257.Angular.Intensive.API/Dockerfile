#Stage 1: Build application
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["./SD4257.Angular.Intensive.API/API/API.csproj", "API/"]
COPY ["./SD4257.Angular.Intensive.API/Application/Application.csproj", "Application/"]
RUN dotnet restore "API/API.csproj"
COPY ./SD4257.Angular.Intensive.API .
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
