# AI Collector — текущее состояние проекта

## Уже сделано

- Создан GitHub-репозиторий и локальный Git-проект.
- Создан Electron + Vite + React + TypeScript проект через `create-electron-vite`.
- Приложение запускалось через `npm run dev`.
- Настроены основные инструменты:
  - ESLint;
  - Prettier в `package.json`;
  - SCSS через `sass-embedded`;
  - Playwright для будущих браузерных сценариев;
  - dotenv для будущих локальных настроек.
- `.gitignore` уже учитывает зависимости, сборки, Electron-артефакты, отчеты тестов, `.env` и `release/`.
- Старый ESLint-сбой в `electron/main.ts` из-за неиспользуемого `require` исправлен.
- `npm run lint` проходит.
- `npm run build` проходил успешно после разрешения сети для `electron-builder`.

`npm run build` может скачивать Electron с GitHub, если нужной версии нет в локальном кэше. В песочнице Codex для этого может понадобиться отдельное разрешение на сеть.

---

## Архитектура проекта

Пользовательская архитектура живет внутри `src/`:

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

Папки создаются по мере необходимости, когда появляется первый реальный файл или README с объяснением роли модуля.

---

## Типы и Provider Registry

Созданы первые типы данных:

```txt
src/core/types/provider-category.ts
src/core/types/provider.ts
src/core/types/index.ts
src/core/types/README.md
```

В `Provider` используется поле `categories`, а не `category`, потому что один AI-сервис может относиться к нескольким категориям.

Категория `code` пока не используется: кодовые AI-сервисы на MVP считаются частью `chat` или `other`.

Provider Registry пока описан документацией:

```txt
src/core/provider-registry/README.md
```

Важно:

- provider data должна оставаться в JSON;
- не переносить весь каталог провайдеров в TypeScript;
- `src/providers/index.ts` сейчас является временным списком для UI;
- позже Provider Registry должен читать JSON через отдельный простой typed layer.

---

## Текущий UI

Созданы первые UI-файлы:

```txt
src/app/pages/Dashboard/Dashboard.tsx
src/app/pages/Dashboard/Dashboard.module.scss
src/app/components/UI/Button/Button.tsx
src/app/components/UI/Button/Button.module.scss
src/app/components/Header/Header.tsx
src/app/components/Header/Header.module.scss
src/app/components/ProviderCard/ProviderCard.tsx
src/app/components/ProviderCard/ProviderCard.module.scss
src/providers/index.ts
src/providers/kling/provider.json
src/assets/SV{}ISOROKI.svg
```

Текущая идея:

- `Dashboard` показывает список AI-сервисов из `src/providers/index.ts`;
- `Header` показывает логотип `svoi.soroki`, placeholder поиска и верхние действия;
- `Button` задает общий вид кнопок;
- `ProviderCard` показывает карточку сервиса;
- пока в UI есть Kling;
- статус карточки пока статичный: `Not connected`.

В `Header` есть:

- логотип;
- placeholder `Поиск`;
- кнопки `Добавить`, `Статистика`, `Настройки`;
- CTA-кнопка `Open All`.

Поиск, добавление, статистика, настройки и `Open All` пока без бизнес-логики.

В `ProviderCard` кнопка `Open` открывает `provider.launchUrl` через безопасный Electron bridge.

---

## Electron

Папка `electron/` содержит:

```txt
electron/main.ts
electron/preload.ts
electron/electron-env.d.ts
```

Текущее состояние:

- `main.ts` создает окно приложения;
- `preload.ts` оставляет шаблонный `ipcRenderer`;
- также добавлен app-specific bridge `window.aiCollector.openProviderUrl(url)`;
- в `main.ts` добавлен IPC handler `provider:open-url`;
- URL перед открытием проверяется: разрешены только `http:` и `https:`;
- открытие внешней ссылки идет через `shell.openExternal`.

React-код не должен напрямую импортировать Electron API. Для связи использовать preload bridge.

---

## Автотесты

Добавлена базовая структура автотестов:

```txt
tests/
  helpers/
    create-vite-test-server.mjs

  ui/
    Button/
      Button.fixture.html
      Button.fixture.tsx
      Button.spec.mjs

  run-tests.mjs
  test-env.d.ts
  README.md
```

Команды:

```bash
npm test
npm run test:ui
npm run test:button
```

Текущий `Button`-тест проверяет SVG-иконку, клик по активной кнопке, disabled-состояние и временный tooltip для icon-only кнопки.

---

## Стили

SCSS подключен через `sass-embedded`.

Глобальные SCSS-файлы:

```txt
src/app/styles/index.scss
src/app/styles/normalize.scss
src/app/styles/reset.scss
src/app/styles/variables.scss
src/app/styles/typography.scss
```

`index.scss` подключен в `src/main.tsx`:

```ts
import './app/styles/index.scss';
```

Договоренности:

- минималистичный дизайн в духе ChatGPT;
- CSS Modules + SCSS для компонентов;
- цвета через CSS variables и `rgba`;
- в названии цвета указывать процент прозрачности;
- общие расстояния держать в `--space-*`;
- общие скругления держать в `--radius-*`;
- минимальная ширина приложения: `--app-min-width: 360px`;
- `mixins.scss` и `functions.scss` пока не создавать.

В репозитории сейчас также есть сгенерированные `.css` и `.css.map` рядом с частью SCSS-файлов. Не удалять их без отдельного решения пользователя.
