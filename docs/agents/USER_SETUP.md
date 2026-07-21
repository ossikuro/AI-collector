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

### 4. sass-embedded

Для SCSS-стилей.

```bash
npm install -D sass-embedded
```

После установки SCSS был подключен, и приложение успешно открывалось через `npm run dev`.

---

## Основные команды

```bash
npm run dev
```

Запуск приложения в режиме разработки.

```bash
npm run build
```

Проверка TypeScript, сборка Vite и сборка Electron-приложения.

```bash
npm run lint
```

Проверка кода ESLint.

```bash
npm test
```

Запуск всех текущих тестов.

```bash
npm run test:button
```

Запуск теста компонента `Button`.

---

## Текущие предупреждения build

`npm run build` может пройти успешно, но показать предупреждения:

- Sass `legacy-js-api`;
- нет `description` в `package.json`;
- нет `author` в `package.json`;
- не задан app icon;
- macOS code signing может быть пропущен.

Это не ошибки.

Если Electron еще не скачан в локальный кэш, `electron-builder` может скачивать его с GitHub.

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
Не ставить Tailwind/MUI/Ant Design
Не ставить Biome
```

---

## package.json

В `package.json` уже есть блок:

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

Отдельного `npm run format` сейчас нет. Для форматирования можно использовать:

```bash
npx prettier . --write
```

---

## .gitignore

В `.gitignore` уже добавлены сборки, отчеты тестов, env-файлы и `release/`.

`release/` появляется после `npm run build` и не должен попадать в Git.

---

## Текущая структура UI

Уже созданы:

```txt
src/app/styles/index.scss
src/app/styles/normalize.scss
src/app/styles/reset.scss
src/app/styles/variables.scss
src/app/styles/typography.scss

src/app/pages/Dashboard/Dashboard.tsx
src/app/pages/Dashboard/Dashboard.module.scss

src/app/components/UI/Button/Button.tsx
src/app/components/UI/Button/Button.module.scss

src/app/components/Header/Header.tsx
src/app/components/Header/Header.module.scss

src/app/components/ProviderCard/ProviderCard.tsx
src/app/components/ProviderCard/ProviderCard.module.scss

src/assets/SV{}ISOROKI.svg
src/providers/index.ts
src/providers/kling/provider.json
```

Dashboard уже показывает:

- верхнюю шапку с логотипом `svoi.soroki`;
- placeholder будущего поиска `Поиск`;
- кнопки `Добавить`, `Статистика`, `Настройки`, `Open All`;
- карточку провайдера Kling.

Поиск, настройки, статистика, добавление и открытие всех пока без действий.

Кнопки в шапке и карточке провайдера используют общий компонент `Button`.

Кнопка `Open` в карточке открывает `provider.launchUrl` через безопасный Electron bridge.

---

## Electron bridge

Для связи React и Electron используется `electron/preload.ts`.

Текущий app-specific API:

```ts
window.aiCollector.openProviderUrl(url);
```

Он используется для открытия внешних ссылок AI-сервисов.

В main process добавлен IPC handler `provider:open-url`, который открывает только `http`/`https` ссылки через системный браузер.

---

## Стили

Используем SCSS + CSS Modules.

Глобальный файл:

```txt
src/app/styles/index.scss
```

Он должен быть подключен в `src/main.tsx`:

```ts
import './app/styles/index.scss';
```

Цвета делаем минималистичные, в духе ChatGPT.

Цвета задаем через `rgba` и CSS variables.

Общие отступы, скругления и минимальная ширина приложения лежат в `variables.scss`.

Минимальная ширина приложения — 360px.

Пока не создавать:

```txt
mixins.scss
functions.scss
```

---

## Создание структуры папок

Не создавать все будущие папки заранее.

Создавать папку только тогда, когда в ней появляется первый реальный файл или README.

Уже актуальные папки:

```txt
src/app/
src/core/
src/providers/
src/assets/
```

---

## Важно про user-data

Не создавать настоящую `user-data/` в проекте.

Пользовательские данные потом должны жить здесь:

```txt
~/Library/Application Support/AI-collector/
```
