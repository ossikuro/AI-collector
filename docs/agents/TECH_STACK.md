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

TypeScript включен в шаблоне, так как в проекте есть:

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

а не отдельный `electron.vite.config.ts`.

Не создавать `electron.vite.config.ts`, если нет отдельной причины.

Использовать текущий:

```txt
vite.config.ts
```

## Уже есть в package.json

### Scripts

```txt
npm run dev
npm run build
npm run lint
npm test
npm run test:ui
npm run test:button
npm run preview
```

Отдельного `npm run format` сейчас нет.

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

Создает окно приложения и позволяет делать локальное приложение на веб-технологиях.

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

Создает артефакты в `release/`.

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

--color-green-100: rgba(16, 163, 127, 1);
--color-green-80: rgba(16, 163, 127, 0.8);
--color-green-10: rgba(16, 163, 127, 0.1);
```

## Electron bridge

Renderer не должен напрямую импортировать Electron API.

Для app-specific действий использовать `preload.ts`.

Сейчас начат API:

```ts
window.aiCollector.openProviderUrl(url);
```

Он вызывает IPC channel `provider:open-url` в main process. Main process должен проверять URL и открывать только `http:`/`https:` ссылки через `shell.openExternal`.
