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

После установки SCSS был подключён, и приложение успешно открылось через `npm run dev`.

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
```

Dashboard уже показывает:

- верхнюю шапку с логотипом `svoi.soroki`;
- placeholder будущего поиска `Поиск`;
- кнопки `Добавить`, `Статистика`, `Настройки`, `Open All`;
- карточку провайдера Kling.

Поиск, настройки, статистика, добавление и открытие всех пока без действий.

Кнопки в шапке и карточке провайдера используют общий компонент `Button`.

---

## Стили

Используем SCSS + CSS Modules.

Глобальный файл:

```txt
src/app/styles/index.scss
```

Он должен быть подключён в `src/main.tsx`:

```ts
import './app/styles/index.scss';
```

Цвета делаем минималистичные, в духе ChatGPT.

Цвета задаём через `rgba` и CSS variables.

Пример:

```scss
--color-black-100: rgba(0, 0, 0, 1);
--color-black-80: rgba(0, 0, 0, 0.8);
--color-black-60: rgba(0, 0, 0, 0.6);
--color-black-10: rgba(0, 0, 0, 0.1);
--color-black-05: rgba(0, 0, 0, 0.05);
```

Общие отступы, скругления и минимальная ширина приложения лежат в `variables.scss`:

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

Минимальная ширина приложения — 360px.

Пока не создавать:

```txt
mixins.scss
functions.scss
```

---

## Создание структуры папок

Раньше обсуждалась команда создания всей структуры заранее. Сейчас правило изменено.

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

---

## Если автоформатирование VS Code не работает

Проверить:

1. npm-пакет установлен:

```bash
npx prettier --version
```

2. Расширение VS Code установлено:

```txt
Prettier - Code formatter
ID: esbenp.prettier-vscode
```

3. В VS Code включено:

```txt
Format On Save
Default Formatter: Prettier - Code formatter
```

4. Если расширение Biome пишет ошибку:

```txt
Unable to find the Biome binary
```

то Biome нужно отключить для этого проекта. Мы его сейчас не используем.

---

## Следующий шаг

Продолжать развивать Dashboard маленькими UI-шагами:

- не переходить к Provider Registry без отдельной задачи;
- не подключать Playwright, аккаунты, storage и Electron IPC без отдельной задачи;
- после изменений запускать `npm run dev`;
- перед завершением coding-задачи запускать `npm run build` и `npm run lint`, если они доступны.
