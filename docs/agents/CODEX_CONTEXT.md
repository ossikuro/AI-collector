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
Sass / SCSS через sass-embedded
Playwright
dotenv
```

Electron уже запускался через:

```bash
npm run dev
```

Первый UI Dashboard создан и подключен.

`npm run lint` проходит.

`npm run build` проходил успешно после разрешения сети для `electron-builder`.

---

## Установленные пакеты

Playwright установлен:

```bash
npm install -D playwright
npx playwright install
```

Prettier установлен и настроен внутри `package.json`.

```bash
npm install -D prettier
```

`dotenv` установлен для будущих локальных настроек, но пароли от AI-сервисов в `.env` хранить нельзя.

```bash
npm install dotenv
```

Sass установлен для SCSS-стилей:

```bash
npm install -D sass-embedded
```

Использовать CSS Modules + SCSS для компонентов.

---

## Текущие настройки package.json

В `package.json` есть scripts:

```txt
dev
build
lint
test
test:ui
test:button
preview
```

Отдельного `format` script сейчас нет.

Prettier настроен блоком:

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

В `.gitignore` уже учтены:

```gitignore
node_modules
dist
dist-ssr
dist-electron
out
release/
coverage
playwright-report
test-results
.env
.env.*
*.local
```

---

## Важное правило про структуру

После создания шаблона наша архитектура живет внутри `src/`.

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

Не создавать новые папки заранее без первого реального файла или README с объяснением роли модуля.

---

## Текущая UI-структура

Сейчас уже созданы файлы для первого UI:

```txt
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

`src/providers/index.ts` — временный список провайдеров для UI.

Важно: пока не переносить provider data из JSON в TypeScript как постоянное решение.

Текущий Dashboard уже показывает:

- верхнюю шапку `Header`;
- логотип `svoi.soroki`;
- placeholder будущего поиска `Поиск`;
- кнопки `Добавить`, `Статистика`, `Настройки`, `Open All`;
- список карточек провайдеров;
- карточку Kling.

Кнопки поиска, настроек, статистики, добавления и `Open All` пока без бизнес-действий.

`ProviderCard` открывает `provider.launchUrl` через безопасную Electron-цепочку.

Кнопки в `Header` и `ProviderCard` отрисовываются через общий компонент `src/app/components/UI/Button/Button.tsx`.

---

## Electron bridge

React-код не должен напрямую импортировать Electron API.

Для app-specific действий использовать preload bridge.

Текущий app-specific API:

```ts
window.aiCollector.openProviderUrl(url);
```

Он объявлен в:

```txt
electron/preload.ts
electron/electron-env.d.ts
```

Main process обрабатывает IPC channel:

```txt
provider:open-url
```

Внешние ссылки открываются через `shell.openExternal`, предварительно проверяя, что URL имеет протокол `http:` или `https:`.

Цепочка открытия ссылки:

```txt
ProviderCard → preload → main process → shell.openExternal
```

---

## Стили

SCSS уже подключен.

Базовая структура стилей:

```txt
src/app/styles/index.scss
src/app/styles/normalize.scss
src/app/styles/reset.scss
src/app/styles/variables.scss
src/app/styles/typography.scss
```

`index.scss` подключается в `src/main.tsx`:

```ts
import './app/styles/index.scss';
```

Использовать минималистичный дизайн в духе ChatGPT.

Цвета задавать через CSS variables и `rgba`.

В названиях цветов указывать прозрачность.

Общие расстояния, скругления и минимальная ширина также лежат в `variables.scss`:

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

Минимальный размер экрана приложения — 360px. Ниже этого приложение не сжимать.

Пока не создавать `mixins.scss` и `functions.scss`. Добавить позже, если появится реальная потребность.

---

## Проверки перед завершением coding task

Для задач с изменением кода запускать:

```bash
npm run build
npm run lint
```

Для задач только с документацией достаточно проверить diff и при необходимости форматирование Markdown.

`npm run build` может потребовать доступ к сети для скачивания Electron.
