# AI Collector — установленные пакеты и зачем они нужны

## Уже были в шаблоне

### react

Библиотека для создания интерфейса приложения.

### react-dom

Позволяет React рендерить интерфейс в DOM.

### typescript

Добавляет типизацию и помогает ловить ошибки до запуска приложения.

### vite

Dev-сервер и сборщик frontend-части проекта.

### electron

Позволяет собрать web-интерфейс в desktop-приложение.

### electron-builder

Инструмент для сборки desktop-приложения в дистрибутив.

### vite-plugin-electron

Связывает Electron main process с Vite.

### vite-plugin-electron-renderer

Помогает renderer-части Electron работать с Vite.

### eslint

Проверяет код на ошибки и потенциально опасные паттерны.

### @vitejs/plugin-react

Подключает React к Vite.

### @types/react

Типы TypeScript для React.

### @types/react-dom

Типы TypeScript для React DOM.

### @typescript-eslint/eslint-plugin

Правила ESLint для TypeScript.

### @typescript-eslint/parser

Позволяет ESLint понимать TypeScript-код.

### eslint-plugin-react-hooks

Следит за корректным использованием React Hooks.

### eslint-plugin-react-refresh

Помогает избежать проблем с React Fast Refresh в dev-режиме.

---

## Доустановлено вручную

### playwright

```bash
npm install -D playwright
npx playwright install
```

Нужен для основной идеи AI Collector:

- открывать сайты AI-сервисов;
- использовать отдельный browser profile для каждого аккаунта;
- сохранять и восстанавливать сессии;
- проверять, авторизован ли пользователь;
- запускать полуавтоматические сценарии проверки кредитов.

Playwright установлен как dev-зависимость, потому что это инструмент разработки и автоматизации, а не обычная UI-библиотека.

---

### prettier

```bash
npm install -D prettier
```

Нужен для автоматического форматирования кода.

Зачем:

- чтобы Codex и пользователь писали код в одном стиле;
- чтобы в Git не появлялись лишние изменения из-за разных отступов/кавычек;
- чтобы не тратить время на ручное форматирование.

Настройки Prettier хранятся прямо в `package.json`.

---

### dotenv

```bash
npm install dotenv
```

Нужен для будущих локальных настроек окружения.

Например, позже через `.env` можно будет задавать:

- режим логирования;
- локальные пути;
- dev-настройки.

Важно: пароли от AI-сервисов в `.env` не хранить.

---

## Что пока не устанавливали

### SQLite

Пока не нужен. На MVP используем JSON.

### Prisma

Пока не нужен, потому что нет базы данных.

### Redux / Zustand

Пока не нужны, потому что состояние MVP небольшое.

### Backend server

Пока не нужен, потому что приложение локальное.

### AI SDK / OpenAI SDK

Пока не нужны, потому что AI Collector не подключается к API нейросетей и не выбирает модель за пользователя.
