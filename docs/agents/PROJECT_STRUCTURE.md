# AI Collector — актуальная структура проекта

Проект создан через `create-electron-vite`.

Фактически используется связка:

```txt
Electron
Vite
React
TypeScript
vite-plugin-electron
```

Важно: в проекте нет `electron.vite.config.ts`. Не создавать его без отдельной причины. Конфигурация находится в `vite.config.ts`.

---

## Актуальная структура

Структура ниже отражает текущее состояние проекта. Не создавать все будущие папки заранее.

```txt
AI-collector/

electron/
  main.ts
  preload.ts
  electron-env.d.ts

src/
  App.tsx
  App.css
  main.tsx
  vite-env.d.ts

  app/
    styles/
      index.scss
      normalize.scss
      reset.scss
      variables.scss
      typography.scss

    pages/
      Dashboard/
        Dashboard.tsx
        Dashboard.module.scss

    components/
      UI/
        Button/
          Button.tsx
          Button.module.scss

      Header/
        Header.tsx
        Header.module.scss

      ProviderCard/
        ProviderCard.tsx
        ProviderCard.module.scss

  core/
    types/
      README.md
      provider-category.ts
      provider.ts
      index.ts

    provider-registry/
      README.md

  providers/
    index.ts

    kling/
      provider.json

  assets/
    SV{}ISOROKI.svg

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

public/

docs/
  agents/
    CODEX_CONTEXT.md
    PACKAGE_NOTES.md
    PROJECT_COMMANDS.md
    PROJECT_STATE.md
    PROJECT_STRUCTURE.md
    TECH_STACK.md
    USER_SETUP.md

package.json
package-lock.json
vite.config.ts
tsconfig.json
tsconfig.node.json
electron-builder.json5
.eslintrc.cjs
.gitignore
AGENTS.md
README.md
```

В проекте также могут встречаться сгенерированные `.css` и `.css.map` рядом с SCSS-файлами. Сейчас они уже tracked в Git для части стилей, поэтому не удалять их без отдельного решения.

`App.css` пока остается файлом шаблона и импортируется в `src/App.tsx`.

Глобальные стили проекта подключены через `src/app/styles/index.scss` в `src/main.tsx`.

---

## Что оставлять из шаблона

Не удалять без явной причины:

```txt
electron/
src/
public/
package.json
package-lock.json
vite.config.ts
tsconfig.json
tsconfig.node.json
electron-builder.json5
.eslintrc.cjs
.gitignore
README.md
```

`node_modules/` нужен локально, но не коммитится в Git.

`release/` создается командой `npm run build` через `electron-builder` и игнорируется Git.

---

## Где жить нашей архитектуре

Пользовательская архитектура живет внутри `src/`:

```txt
src/app/
src/core/
src/providers/
src/assets/
```

Не переносить эти папки в корень проекта без явной причины.

---

## Правило создания папок

Не создавать всю структуру заранее.

Папка появляется только тогда, когда в ней появляется первый реальный файл или README с объяснением роли модуля.

---

## electron/

Папка главного процесса Electron.

```txt
electron/main.ts
```

Отвечает за:

- создание окна приложения;
- жизненный цикл Electron;
- настройки BrowserWindow;
- IPC handler для `provider:open-url`;
- безопасное открытие внешних `http`/`https` ссылок через `shell.openExternal`.

```txt
electron/preload.ts
```

Безопасный мост между Electron main process и React renderer.

Сейчас в preload есть:

- шаблонный `window.ipcRenderer`;
- app-specific API `window.aiCollector.openProviderUrl(url)`.

React-код не должен напрямую импортировать Electron API. Взаимодействие должно идти через preload.

```txt
electron/electron-env.d.ts
```

Типы для переменных окружения Electron и глобального `window.aiCollector`.

---

## src/

Папка renderer-приложения.

Здесь живут:

- React;
- UI;
- бизнес-логика MVP;
- каталог providers;
- локальные core-модули.

---

## src/app/

Интерфейс приложения.

Сюда помещать:

- страницы;
- компоненты;
- стили;
- модальные окна.

UI не должен напрямую читать файлы с диска. Для этого позже использовать модули из `src/core`.

---

## src/app/styles/

Базовые стили и простая основа дизайн-системы.

```txt
index.scss
normalize.scss
reset.scss
variables.scss
typography.scss
```

Компонентные стили хранить рядом с компонентами как `ComponentName.module.scss`.
