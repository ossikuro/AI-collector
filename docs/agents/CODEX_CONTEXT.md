# Контекст для агента Codex

## Название проекта

AI Collector

## Что это за проект

AI Collector — локальное desktop-приложение для управления AI-сервисами, аккаунтами, браузерными сессиями и ежедневными проверками кредитов.

Это НЕ AI-router.

Приложение НЕ должно само выбирать, какую нейросеть использовать за пользователя.

Пользователь сам выбирает сервис. Приложение помогает:

- хранить каталог сервисов;
- хранить подключенные аккаунты;
- открывать нужный сервис;
- использовать отдельный browser profile для каждого аккаунта;
- фиксировать историю проверок кредитов;
- показывать статусы аккаунтов;
- передавать управление пользователю, если нужен логин/капча/ручное действие.

---

## Текущее состояние проекта

Проект создан через `create-electron-vite`.

Фактический стек:

```txt
Electron
Vite
React
TypeScript
Node.js
vite-plugin-electron
vite-plugin-electron-renderer
electron-builder
ESLint
Prettier
Playwright
dotenv
```

В проекте есть:

```txt
electron/
src/
public/
vite.config.ts
package.json
package-lock.json
tsconfig.json
tsconfig.node.json
electron-builder.json5
.eslintrc.cjs
.gitignore
README.md
```

Electron уже запускался через:

```bash
npm run dev
```

Playwright установлен:

```bash
npm install -D playwright
npx playwright install
```

Prettier установлен и настроен внутри `package.json`, отдельный `.prettierrc` не нужен.

`dotenv` установлен для будущих локальных настроек, но пароли от AI-сервисов в `.env` хранить нельзя.

---

## Текущие настройки package.json

В `package.json` должен быть блок:

```json
"prettier": {
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}
```

Отдельные файлы `.prettierrc`, `.prettierignore`, `.editorconfig` пока не создавать.

---

## .gitignore

В `.gitignore` должны быть учтены стандартные папки проекта, сборки, локальные env-файлы и отчёты Playwright:

```gitignore
node_modules
dist
dist-ssr
dist-electron
out
coverage
playwright-report
test-results
.env
.env.*
*.local
```

---

## Важное правило про структуру

После создания шаблона наша архитектура живёт внутри `src/`.

Использовать:

```txt
src/app/
src/core/
src/providers/
src/assets/
```

Не создавать в корне:

```txt
app/
core/
providers/
assets/
```

без явной причины.

---

## Electron

Папка `electron/` содержит main process и preload.

```txt
electron/main.ts
electron/preload.ts
```

React-код не должен напрямую импортировать Electron API.

Если renderer должен общаться с Electron/Node, делать это через preload.

---

## Playwright

Playwright использовать для:

- открытия сайтов AI-сервисов;
- работы с отдельными browser profiles;
- сохранения и восстановления сессий;
- проверки, авторизован ли пользователь;
- полуавтоматических сценариев проверки кредитов.

Не использовать Playwright для обхода капчи, скрытого ботинга или действий, которые требуют ручного подтверждения пользователя.

Если нужен логин, капча или подтверждение — остановить автоматизацию и передать управление пользователю.

---

## Основные принципы MVP

1. Не хранить пароли пользователя.
2. Один аккаунт = один browser profile.
3. Один сервис = одна папка в `src/providers`.
4. Пользовательские данные не хранить в Git.
5. UI не должен напрямую читать и писать файлы.
6. Все файловые операции должны идти через `src/core/storage`.
7. Автоматизация должна быть полуавтоматической и безопасной.
8. Если нужен логин, капча или подтверждение — передать управление пользователю.
9. Не обходить капчу.
10. Не делать скрытый ботинг.

---

## Пользовательские данные

Настоящие пользовательские данные должны храниться вне репозитория.

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
examples/accounts.example.json
examples/provider.example.json
```

---

## Пароли

Пароли от AI-сервисов не хранить никогда.

Процесс подключения аккаунта:

1. пользователь нажимает “Подключить аккаунт”;
2. приложение открывает браузер;
3. пользователь логинится сам;
4. приложение сохраняет browser profile / storageState;
5. при следующем запуске используется сохранённая сессия.

Если сессия слетела, ставить статус:

```txt
session_expired
```

---

## Несколько аккаунтов одного сервиса

Поддержка нескольких аккаунтов обязательна.

Пример:

```txt
kling-main
kling-alt
kling-work
```

Каждый аккаунт должен иметь отдельный browser profile.

Нельзя переключать аккаунты внутри одной вкладки.

---

## Providers

Каждый AI-сервис описывается папкой:

```txt
src/providers/kling/
  provider.json
  automation.json
  selectors.json
```

---

## provider.json

Пример:

```json
{
  "id": "kling",
  "name": "Kling AI",
  "category": "video",
  "websiteUrl": "https://klingai.com",
  "launchUrl": "https://klingai.com",
  "authMethods": ["google", "email"],
  "hasFreeCredits": true,
  "creditPeriod": "daily",
  "knownCredits": 20,
  "claimType": "auto_on_login"
}
```

---

## automation.json

Пример:

```json
{
  "mode": "semi_auto",
  "steps": [
    {
      "type": "open",
      "url": "https://klingai.com"
    },
    {
      "type": "wait_for_user_if_login_required"
    },
    {
      "type": "read_text",
      "target": "creditsCounter"
    }
  ]
}
```

---

## selectors.json

Пример:

```json
{
  "loginButton": "button:has-text('Login')",
  "creditsCounter": "[data-testid='credits']",
  "claimButton": "button:has-text('Claim')"
}
```

Если сайт поменял интерфейс, сначала менять `selectors.json`, а не код приложения.

---

## Статусы аккаунта

Использовать такие статусы:

```ts
type AccountStatus =
  | "not_connected"
  | "connected"
  | "session_expired"
  | "manual_required"
  | "error";
```

---

## Что не делать в MVP

```txt
Не делать сервер
Не делать облачную синхронизацию
Не делать оплату
Не делать умный выбор нейросети
Не подключать API AI-сервисов
Не хранить логины и пароли
Не автоматизировать обход капчи
Не переносить структуру обратно в корень проекта
Не создавать .prettierrc, .prettierignore, .editorconfig без необходимости
```

---

## Перед добавлением новых зависимостей

Перед добавлением новых зависимостей нужно проверить:

```txt
package.json
vite.config.ts
tsconfig.json
```

Не предлагать установку несовместимых версий без анализа текущего стека.

---

## Важное решение по Provider Registry

Provider Registry пока не реализован кодом.

Не импортировать `provider.json` напрямую в TypeScript как готовый `Provider`, потому что TypeScript читает JSON слишком широко: например, `categories` становится `string[]`, а не `ProviderCategory[]`.

Не использовать `as Provider` или `as Provider['categories']` как основное архитектурное решение.

На следующем этапе можно временно использовать массив провайдеров в `.ts` для UI.

Позже Provider Registry должен загружать JSON через отдельную функцию и валидировать данные перед преобразованием в `Provider`.