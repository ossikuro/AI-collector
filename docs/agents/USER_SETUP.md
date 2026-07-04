# AI Collector — инструкция для Ольги

## Что уже сделано

Проект создан через `create-electron-vite`.

Electron-приложение уже запускалось командой:

```bash
npm run dev
```

Если открылось окно приложения — база работает.

Остановить dev-сервер:

```txt
Ctrl + C
```

---

## Что установлено шаблоном

Уже есть:

```txt
Electron
Vite
React
TypeScript
ESLint
electron-builder
vite-plugin-electron
vite-plugin-electron-renderer
```

---

## Что уже доустановлено

### 1. Playwright

Нужен для открытия AI-сервисов, браузерных профилей и сессий.

```bash
npm install -D playwright
npx playwright install
```

### 2. Prettier

Для автоформатирования кода.

```bash
npm install -D prettier
```

Prettier настроен в `package.json`, отдельный `.prettierrc` не нужен.

### 3. dotenv

На будущее для локальных настроек.

```bash
npm install dotenv
```

Важно: не хранить в `.env` пароли от AI-сервисов.

---

## Что пока НЕ устанавливать

```txt
Не ставить SQLite
Не ставить Prisma
Не ставить backend-сервер
Не ставить авторизацию пользователей
Не ставить оплату
Не подключать API нейросетей
Не хранить пароли
Не ставить Redux/Zustand на старте
```

---

## Что нужно поправить в package.json

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

---

## Что нужно добавить в .gitignore

В `.gitignore` должны быть:

```gitignore
dist-electron
out
coverage
playwright-report
test-results
.env
.env.*
```

Можно оставить существующие строки шаблона, просто добавить недостающие.

---

## Создать рабочую структуру папок

В корне проекта выполнить:

```bash
mkdir -p src/app/pages src/app/components src/app/styles
mkdir -p src/core/browser src/core/provider-registry src/core/account-manager
mkdir -p src/core/automation src/core/checker src/core/storage src/core/logger
mkdir -p src/core/types
mkdir -p src/providers/kling src/providers/pika src/providers/hailuo
mkdir -p src/assets
mkdir -p docs/agents
mkdir -p examples
```

---

## Важно про user-data

Не создавать настоящую `user-data/` в проекте.

Пользовательские данные потом должны жить здесь:

```txt
~/Library/Application Support/AI-collector/
```

В Git можно хранить только примеры:

```txt
examples/accounts.example.json
examples/provider.example.json
```

---

## Проверка после изменений

После значимых изменений запускать:

```bash
npm run dev
```

Если приложение открывается — всё нормально.

---

## Что делать при предупреждении npm audit

После установки пакетов npm может показывать:

```txt
8 vulnerabilities
```

Пока не запускать:

```bash
npm audit fix --force
```

`--force` может обновить зависимости до несовместимых версий и сломать Electron/Vite шаблон.

Сначала достаточно просто продолжать разработку.
