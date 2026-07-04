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

После подключения SCSS и первого UI приложение также успешно открывалось через `npm run dev`.

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

Не создавать новые папки заранее без первого реального файла или README с объяснением роли модуля.

---

## Текущая UI-структура

Сейчас уже созданы файлы для первого UI:

```txt
src/app/pages/Dashboard/Dashboard.tsx
src/app/pages/Dashboard/Dashboard.module.scss
src/app/components/Header/Header.tsx
src/app/components/Header/Header.module.scss
src/app/components/ProviderCard/ProviderCard.tsx
src/app/components/ProviderCard/ProviderCard.module.scss
src/assets/SV{}ISOROKI.svg
src/providers/index.ts
```

`src/providers/index.ts` — временный список провайдеров для UI.

Важно: пока не импортировать `provider.json` напрямую в TypeScript.

Текущий Dashboard уже показывает:

- верхнюю шапку `Header`;
- логотип `svoi.soroki`;
- placeholder будущего поиска `Поиск`;
- кнопки `Добавить`, `Статистика`, `Настройки`, `Открыть все`;
- список карточек провайдеров;
- карточку Kling.

Кнопки и поиск пока без действий.

---

## Стили

SCSS уже подключён.

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

В названиях цветов указывать прозрачность:

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

## Providers

Каждый AI-сервис описывается папкой:

```txt
src/providers/kling/
  provider.json
```

Позже рядом появятся:

```txt
automation.json
selectors.json
```

Но пока `automation.json` и `selectors.json` не создавать, пока мы реально не дошли до автоматизации.

---

## provider.json

Текущий пример:

```json
{
  "id": "kling",
  "name": "Kling AI",
  "categories": ["video"],
  "websiteUrl": "https://klingai.com",
  "launchUrl": "https://klingai.com"
}
```

В `Provider` используется поле `categories`, а не `category`, потому что один AI-сервис может относиться к нескольким категориям.

---

## Статусы аккаунта

Позже использовать такие статусы:

```ts
type AccountStatus =
  'not_connected' | 'connected' | 'session_expired' | 'manual_required' | 'error';
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
Не подключать Redux/Zustand без реальной необходимости
Не создавать data-папку ради временных моков
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

Сейчас для UI используется временный массив провайдеров в `.ts`.

Позже Provider Registry должен загружать JSON через отдельную функцию и валидировать данные перед преобразованием в `Provider`.

---

## Текущий фокус для агента

Первый Dashboard и Header уже приняты и слиты в `main`.

Дальше двигаться маленькими UI-шагами от текущего Dashboard.

Пока не переходить к Provider Registry, Playwright, аккаунтам, storage и Electron IPC без отдельной задачи.
