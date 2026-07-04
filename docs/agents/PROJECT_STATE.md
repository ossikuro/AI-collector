# AI Collector — текущее состояние проекта

## Уже сделано

- Создан GitHub-репозиторий.
- Проект локально подключен к Git.
- Создан Electron + Vite + React + TypeScript проект.
- Приложение успешно запускалось через:

```bash
npm run dev
```

- В проекте появились стандартные папки шаблона:

```txt
electron/
src/
public/
```

- В package.json уже есть Electron, React, TypeScript, Vite и сборочные зависимости.
- Установлен Playwright:

```bash
npm install -D playwright
npx playwright install
```

- Установлен Prettier:

```bash
npm install -D prettier
```

- Установлен dotenv:

```bash
npm install dotenv
```

- Prettier настроен прямо в `package.json`.
- Отдельные `.prettierrc`, `.prettierignore`, `.editorconfig` пока не создаём.
- `.gitignore` нужно дополнить под Electron, Playwright и `.env`.

## Важное решение по структуре

Вся пользовательская архитектура должна жить внутри `src/`:

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

## Следующий шаг

Создать папки:

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

## Установленные пакеты и зачем они нужны

### Playwright

Установлен как dev-зависимость:

```bash
npm install -D playwright
npx playwright install
```

Нужен для:

- открытия AI-сервисов;
- работы с browser profiles;
- сохранения и восстановления сессий;
- проверки авторизации;
- полуавтоматических сценариев проверки кредитов.

### Prettier

Установлен как dev-зависимость:

```bash
npm install -D prettier
```

Нужен для:

- автоматического форматирования кода;
- единого стиля между пользователем и агентом;
- уменьшения лишних изменений в Git.

### dotenv

Установлен как обычная зависимость:

```bash
npm install dotenv
```

Нужен для будущих локальных настроек окружения.

Важно: не хранить в `.env` пароли от AI-сервисов.

## Что ещё доустановить сейчас

Ничего.

## Чего пока не делать

```txt
Не ставить SQLite
Не ставить Prisma
Не ставить backend-сервер
Не ставить авторизацию пользователей
Не ставить оплату
Не подключать AI API
Не хранить пароли
Не ставить Redux/Zustand на старте
Не создавать .prettierrc, .prettierignore, .editorconfig без необходимости
```

## Следующая продуктовая задача

Собрать MVP-экран Dashboard:

- список AI-сервисов;
- карточка сервиса;
- кнопка “Открыть”;
- статус аккаунта;
- заготовка для подключения аккаунта.

## Следующая архитектурная задача

Создать типы:

```ts
Provider
ProviderCategory
ServiceAccount
AccountStatus
DailyCheck
AutomationStep
```

И положить их в:

```txt
src/core/types/
```
