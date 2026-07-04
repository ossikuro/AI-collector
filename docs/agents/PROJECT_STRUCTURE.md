# AI Collector — актуальная структура проекта

Проект уже создан через `create-electron-vite`.

Фактически используется связка:

```txt
Electron
Vite
React
TypeScript
vite-plugin-electron
```

Важно: в проекте нет `electron.vite.config.ts`. Не нужно его создавать без отдельной причины. Конфигурация находится в `vite.config.ts`.

---

## Актуальная структура

```txt
AI-collector/

electron/
  main.ts
  preload.ts
  electron-env.d.ts

src/
  App.tsx
  main.tsx
  App.css
  index.css
  vite-env.d.ts

  app/
    pages/
      DashboardPage.tsx
      ProvidersPage.tsx
      ProviderDetailPage.tsx
      AccountsPage.tsx

    components/
      ProviderCard.tsx
      AccountCard.tsx
      AddProviderModal.tsx
      ConnectAccountModal.tsx

    styles/

  core/
    browser/
      createBrowserProfile.ts
      openProvider.ts
      saveSession.ts
      validateSession.ts

    provider-registry/
      loadProviders.ts
      addProvider.ts
      updateProvider.ts
      removeProvider.ts

    account-manager/
      addAccount.ts
      removeAccount.ts
      updateAccountStatus.ts
      getAccountsByProvider.ts

    automation/
      runAutomation.ts
      runStep.ts

    checker/
      runDailyCheck.ts
      detectLoginRequired.ts
      detectCredits.ts

    storage/
      readJson.ts
      writeJson.ts
      paths.ts

    logger/

    types/
      index.ts

  providers/
    kling/
      provider.json
      automation.json
      selectors.json

    pika/
      provider.json
      automation.json
      selectors.json

    hailuo/
      provider.json
      automation.json
      selectors.json

  assets/

public/

docs/
  agents/
    CODEX_CONTEXT.md
    TECH_STACK.md
    PROJECT_STRUCTURE.md
    PROJECT_STATE.md
    USER_SETUP.md
    PROJECT_COMMANDS.md

examples/
  accounts.example.json
  provider.example.json
```

---

## Что оставлять из шаблона

Не удалять:

```txt
electron/
src/
public/
package.json
package-lock.json
vite.config.ts
tsconfig.json
tsconfig.node.json
electron-builder.json5
.eslintrc.cjs
.gitignore
README.md
```

`node_modules/` нужен локально, но не коммитится в Git.

---

## Где жить нашей архитектуре

Раньше обсуждались папки в корне:

```txt
app/
core/
providers/
assets/
```

После создания Electron-шаблона это решение нужно скорректировать.

Теперь они должны жить внутри `src/`:

```txt
src/app/
src/core/
src/providers/
src/assets/
```

Не переносить эти папки обратно в корень проекта без явной причины.

---

## electron/

Папка главного процесса Electron.

```txt
electron/main.ts
```

Отвечает за:

- создание окна приложения;
- жизненный цикл Electron;
- настройки BrowserWindow.

```txt
electron/preload.ts
```

Безопасный мост между Electron main process и React renderer.

React-код не должен напрямую импортировать Electron API. Взаимодействие должно идти через preload.

---

## src/

Папка renderer-приложения.

Здесь живут:

- React;
- UI;
- бизнес-логика MVP;
- каталог providers;
- локальные core-модули.

---

## src/app/

Интерфейс приложения.

Сюда помещать:

- страницы;
- компоненты;
- стили;
- модальные окна.

UI не должен напрямую читать файлы с диска. Для этого использовать модули из `src/core/storage`.

---

## src/core/

Бизнес-логика приложения.
Модули должны быть независимыми и не содержать React-компонентов.

### src/core/types
Общие типы и модели данных приложения.
Здесь описывается, какие сущности существуют в проекте (сервис, аккаунт, проверка и т.д.) и какие свойства они должны иметь.
Эти типы используются во всём приложении, чтобы разные модули работали с данными в едином формате.

---

## src/core/browser/

Работа с Playwright и браузерными профилями.

Отвечает за:

- создание browser profile;
- открытие сервиса;
- сохранение storageState;
- проверку сессии.

---

## src/core/provider-registry/

Работа со справочником AI-сервисов.

Отвечает за:

- загрузку providers;
- добавление сервиса;
- обновление сервиса;
- удаление сервиса.

---

## src/core/account-manager/

Работа с аккаунтами пользователя.

Отвечает за:

- добавить аккаунт;
- удалить аккаунт;
- изменить название аккаунта;
- изменить статус аккаунта;
- получить аккаунты по providerId.

---

## src/core/automation/

Движок сценариев.

Должен исполнять шаги из `automation.json`.

Не должен содержать логику конкретного сервиса.

---

## src/core/checker/

Проверки состояния аккаунта/сервиса:

- авторизован ли пользователь;
- нужна ли ручная авторизация;
- удалось ли прочитать кредиты;
- нужно ли показать статус manual_required.

---

## src/core/storage/

Единая точка чтения/записи JSON.

Все операции с файлами должны идти через этот модуль.

---

## src/core/types/

Общие TypeScript-типы проекта.

Сюда положить:

```txt
Provider
ProviderCategory
ServiceAccount
AccountStatus
DailyCheck
AutomationStep
```

---

## src/providers/

Каталог AI-сервисов.

Один сервис = одна папка.

Пример:

```txt
src/providers/kling/
  provider.json
  automation.json
  selectors.json
```

---

## Пользовательские данные

В репозитории не создавать настоящую папку `user-data`.

Пользовательские данные должны храниться вне Git:

macOS:

```txt
~/Library/Application Support/AI-collector/
```

Windows:

```txt
%APPDATA%/AI-collector/
```

Там будут:

```txt
accounts.json
settings.json
daily-checks.json
profiles/
sessions/
```

В Git можно хранить только примеры:

```txt
examples/
  accounts.example.json
  provider.example.json
```
