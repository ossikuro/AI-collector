# AI Collector — используемые технологии

## Текущий стек

Проект использует:

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
Sass / SCSS через sass-embedded
Playwright
dotenv
```

## Шаблон

Проект создан через:

```bash
npm create electron-vite@latest .
```

Был выбран template:

```txt
React
```

TypeScript включён в шаблоне, так как в проекте есть:

```txt
src/App.tsx
src/main.tsx
tsconfig.json
typescript в package.json
```

## Важно

Несмотря на название генератора, текущий проект использует:

```txt
vite-plugin-electron
```

а не отдельный `electron-vite` config.

Не создавать `electron.vite.config.ts`, если нет отдельной причины.

Использовать текущий:

```txt
vite.config.ts
```

## Уже есть в package.json

### Runtime dependencies

```txt
dotenv
react
react-dom
```

### Dev dependencies

```txt
@types/react
@types/react-dom
@typescript-eslint/eslint-plugin
@typescript-eslint/parser
@vitejs/plugin-react
electron
electron-builder
eslint
eslint-plugin-react-hooks
eslint-plugin-react-refresh
playwright
prettier
sass-embedded
typescript
vite
vite-plugin-electron
vite-plugin-electron-renderer
```

## Зачем нужен каждый основной пакет

### react

Библиотека для создания интерфейса приложения.

### react-dom

Нужен для рендера React-приложения в DOM.

### dotenv

Нужен для будущих локальных настроек окружения.

Не использовать для хранения паролей от AI-сервисов.

### electron

Оболочка desktop-приложения.

Создаёт окно приложения и позволяет делать локальное приложение на веб-технологиях.

### vite

Dev-сервер и сборщик renderer-приложения.

### typescript

Статическая типизация проекта.

### @vitejs/plugin-react

Интеграция React с Vite.

### vite-plugin-electron

Интеграция Electron main process с Vite.

### vite-plugin-electron-renderer

Поддержка renderer-части Electron-проекта.

### electron-builder

Сборка desktop-приложения в установщик/дистрибутив.

### eslint

Проверка кода на ошибки и проблемные паттерны.

### @typescript-eslint/eslint-plugin и @typescript-eslint/parser

Поддержка TypeScript в ESLint.

### eslint-plugin-react-hooks

Проверка правил React Hooks.

### eslint-plugin-react-refresh

Проверка корректности React Fast Refresh.

### prettier

Автоформатирование кода.

Настроен прямо в `package.json`.

### sass-embedded

SCSS/Sass-компилятор для Vite.

Нужен, чтобы писать:

- глобальные SCSS-файлы;
- CSS Modules с `.module.scss`;
- простую дизайн-систему без отдельной UI-библиотеки.

### playwright

Автоматизация браузера для AI-сервисов, browser profiles, сессий и полуавтоматических проверок.

### @types/react и @types/react-dom

TypeScript-типы для React и React DOM.

## Настройки Prettier

В `package.json` используется блок:

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

Отдельные `.prettierrc`, `.prettierignore`, `.editorconfig` пока не нужны.

## Стили

Используем:

```txt
SCSS
CSS Modules
CSS variables
rgba-цвета
```

Глобальные стили:

```txt
src/app/styles/index.scss
src/app/styles/normalize.scss
src/app/styles/reset.scss
src/app/styles/variables.scss
src/app/styles/typography.scss
```

Компонентные стили:

```txt
ComponentName.module.scss
```

Цветовая гамма — минималистичная, в духе ChatGPT.

Цвета задавать через CSS variables и `rgba`.

В названии цвета указывать прозрачность:

```scss
--color-black-100: rgba(0, 0, 0, 1);
--color-black-80: rgba(0, 0, 0, 0.8);
--color-black-60: rgba(0, 0, 0, 0.6);
--color-black-10: rgba(0, 0, 0, 0.1);
--color-black-05: rgba(0, 0, 0, 0.05);

--color-white-100: rgba(255, 255, 255, 1);
--color-white-80: rgba(255, 255, 255, 0.8);
--color-white-96: rgba(255, 255, 255, 0.96);
```

Общие расстояния и скругления держать в `variables.scss`:

```scss
--radius-md: 12px;
--radius-lg: 16px;
--radius-pill: 999px;

--space-xs: 4px;
--space-sm: 8px;
--space-control-sm: 12px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;

--app-min-width: 360px;
```

Минимальный размер экрана для приложения — 360px. Ниже этого приложение не сжимать.

Пока не используем:

```txt
Tailwind
Styled Components
Emotion
MUI
Ant Design
mixins.scss
functions.scss
```

`mixins.scss` и `functions.scss` добавить позже, если появится реальная необходимость.

## Playwright

Playwright нужен для:

- открытия AI-сервисов;
- работы с browser profiles;
- сохранения и восстановления сессий;
- проверки, авторизован ли пользователь;
- полуавтоматических сценариев.

Установлен командами:

```bash
npm install -D playwright
npx playwright install
```

## Хранение данных MVP

На первом этапе использовать JSON.

Не подключать SQLite до появления реальной потребности.

Планируемые JSON-файлы пользовательских данных:

```txt
accounts.json
settings.json
daily-checks.json
```

Но настоящие пользовательские данные должны храниться вне Git.

## Команды

Запуск dev-режима:

```bash
npm run dev
```

Сборка:

```bash
npm run build
```

Lint:

```bash
npm run lint
```

Форматирование:

```bash
npx prettier . --write
```

Проверка форматирования:

```bash
npx prettier . --check
```

## Что не использовать на старте

```txt
Redux
Zustand
SQLite
Prisma
Backend server
Cloud sync
User auth
Payment system
AI APIs
Tailwind
Styled Components
Emotion
MUI
Ant Design
Biome
```

## Почему не Redux/Zustand на старте

На MVP состояние небольшое.

Сначала достаточно:

- локального React state;
- простых сервисов в `src/core`;
- JSON-хранилища.

State manager можно добавить позже, когда появится реальная сложность.

## Почему не Biome

В проекте уже используется связка:

```txt
ESLint + Prettier
```

Если расширение Biome в VS Code пишет `Unable to find the Biome binary`, это значит, что расширение установлено, но пакет Biome в проект не добавлен.

Biome сейчас не нужен. Не устанавливать `@biomejs/biome` без отдельного решения.
