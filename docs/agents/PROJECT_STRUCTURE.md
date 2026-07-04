# AI Collector — актуальная структура проекта

Проект уже создан через `create-electron-vite`.

Фактически используется связка:

```txt
Electron
Vite
React
TypeScript
vite-plugin-electron
```

Важно: в проекте нет `electron.vite.config.ts`. Не нужно его создавать без отдельной причины. Конфигурация находится в `vite.config.ts`.

---

## Актуальная структура

Структура ниже отражает текущее состояние проекта и ближайшие созданные файлы. Не создавать все будущие папки заранее.

```txt
AI-collector/

electron/
  main.ts
  preload.ts
  electron-env.d.ts

src/
  App.tsx
  main.tsx
  App.css
  index.css
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

Если `App.css` и `index.css` больше не используются после подключения `src/app/styles/index.scss`, их можно оставить временно, но не импортировать в `main.tsx` и `App.tsx`.

---

## Что оставлять из шаблона

Не удалять:

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

---

## Где жить нашей архитектуре

Раньше обсуждались папки в корне:

```txt
app/
core/
providers/
assets/
```

После создания Electron-шаблона это решение нужно скорректировать.

Теперь они должны жить внутри `src/`:

```txt
src/app/
src/core/
src/providers/
src/assets/
```

Не переносить эти папки обратно в корень проекта без явной причины.

---

## Правило создания папок

Не создавать всю структуру заранее.

Папка появляется только тогда, когда в ней появляется первый реальный файл или README с объяснением роли модуля.

Так проще понимать, зачем появилась директория, и делать чистые коммиты.

---

## electron/

Папка главного процесса Electron.

```txt
electron/main.ts
```

Отвечает за:

- создание окна приложения;
- жизненный цикл Electron;
- настройки BrowserWindow.

```txt
electron/preload.ts
```

Безопасный мост между Electron main process и React renderer.

React-код не должен напрямую импортировать Electron API. Взаимодействие должно идти через preload.

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

UI не должен напрямую читать файлы с диска. Для этого использовать будущие модули из `src/core/storage`.

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

### index.scss

Точка входа для всех глобальных стилей.

Подключается в `src/main.tsx`:

```ts
import './app/styles/index.scss';
```

### normalize.scss

Нормализует браузерные стили.

### reset.scss

Сбрасывает базовые отступы и дефолтные стили.

### variables.scss

CSS variables: цвета, радиусы, отступы.

Цвета задавать через `rgba`, в названии указывать прозрачность:

```scss
--color-black-100: rgba(0, 0, 0, 1);
--color-black-80: rgba(0, 0, 0, 0.8);
--color-black-60: rgba(0, 0, 0, 0.6);
--color-black-10: rgba(0, 0, 0, 0.1);
--color-black-05: rgba(0, 0, 0, 0.05);
```

### typography.scss

Базовые шрифты, цвет текста, фон, настройки форм.

---

## src/app/pages/Dashboard/

Первый экран приложения.

Файлы:

```txt
Dashboard.tsx
Dashboard.module.scss
```

Отвечает за:

- заголовок приложения;
- краткое описание;
- список карточек AI-сервисов;
- вывод данных из временного массива `providers`.

---

## src/app/components/ProviderCard/

Первый UI-компонент карточки AI-сервиса.

Файлы:

```txt
ProviderCard.tsx
ProviderCard.module.scss
```

Отвечает за:

- название сервиса;
- категории;
- статус;
- кнопку `Open`.

Кнопка пока без действия.

---

## src/core/

Бизнес-логика приложения.

Модули должны быть независимыми и не содержать React-компонентов.

---

## src/core/types/

Общие типы и модели данных приложения.

Здесь описывается, какие сущности существуют в проекте и какие свойства они должны иметь.

Сейчас добавлены:

```txt
ProviderCategory
Provider
```

### ProviderCategory

Категория AI-сервиса.

Сейчас используются категории:

```ts
'chat' | 'image' | 'video' | 'audio' | 'other'
```

Категория `code` пока не используется, потому что на MVP кодовые AI-сервисы считаются частью `chat` или `other`.

### Provider

Описание AI-сервиса.

В `Provider` используется поле `categories`, а не `category`, потому что один сервис может относиться к нескольким категориям.

Например, один сервис может быть одновременно:

```ts
['chat', 'image']
```

---

## src/providers/

Каталог AI-сервисов.

Один сервис = одна папка.

Сейчас добавлен первый сервис:

```txt
src/providers/kling/
  provider.json
```

В `provider.json` хранится базовое описание сервиса:

```json
{
  "id": "kling",
  "name": "Kling AI",
  "categories": ["video"],
  "websiteUrl": "https://klingai.com",
  "launchUrl": "https://klingai.com"
}
```

Пока не создавать рядом `automation.json` и `selectors.json`, пока мы реально не дойдём до автоматизации.

---

## src/providers/index.ts

Временный список провайдеров для UI.

Нужен, чтобы показать первый Dashboard и не застревать на JSON-импортах.

Важно:

- не создавать отдельную папку `data`;
- не импортировать `provider.json` напрямую как `Provider`;
- не использовать `as Provider` как основное решение;
- удалить или заменить этот файл, когда появится настоящий Provider Registry.

---

## src/core/provider-registry/

Модуль для будущей работы со справочником AI-сервисов.

Сейчас в папке есть только README с описанием роли модуля.

Provider Registry должен будет отвечать за:

- получение списка провайдеров;
- получение одного провайдера по `id`;
- проверку существования провайдера;
- фильтрацию провайдеров по категории.

Но полноценная реализация пока отложена.

Причина: прямой импорт `provider.json` в TypeScript даёт слишком широкие типы. Например, `categories` становится `string[]`, а не `ProviderCategory[]`.

Не использовать `as Provider` или `as Provider['categories']` как основное архитектурное решение.

Позже Provider Registry должен загружать JSON через отдельную функцию и валидировать данные перед преобразованием в `Provider`.

---

## Будущие папки, которые пока не создавать заранее

Эти модули планируются, но появятся только по мере необходимости:

```txt
src/core/browser/
src/core/account-manager/
src/core/automation/
src/core/checker/
src/core/storage/
src/core/logger/
src/assets/
examples/
docs/agents/
```

`src/app/` уже используется, потому что появился первый UI.

---

## src/core/browser/ — будущий модуль

Работа с Playwright и браузерными профилями.

Будет отвечать за:

- создание browser profile;
- открытие сервиса;
- сохранение storageState;
- проверку сессии.

---

## src/core/account-manager/ — будущий модуль

Работа с аккаунтами пользователя.

Будет отвечать за:

- добавить аккаунт;
- удалить аккаунт;
- изменить название аккаунта;
- изменить статус аккаунта;
- получить аккаунты по providerId.

---

## src/core/automation/ — будущий модуль

Движок сценариев.

Должен будет исполнять шаги из будущего `automation.json`.

Не должен содержать логику конкретного сервиса.

---

## src/core/checker/ — будущий модуль

Проверки состояния аккаунта/сервиса:

- авторизован ли пользователь;
- нужна ли ручная авторизация;
- удалось ли прочитать кредиты;
- нужно ли показать статус manual_required.

---

## src/core/storage/ — будущий модуль

Единая точка чтения/записи JSON.

Все операции с файлами должны будут идти через этот модуль.

---

## Пользовательские данные

В репозитории не создавать настоящую папку `user-data`.

Пользовательские данные должны храниться вне Git:

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
examples/
  accounts.example.json
  provider.example.json
```
