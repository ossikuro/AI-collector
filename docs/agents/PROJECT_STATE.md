# AI Collector — текущее состояние проекта

## Уже сделано

- Создан GitHub-репозиторий.
- Проект локально подключен к Git.
- Создан Electron + Vite + React + TypeScript проект.
- Приложение успешно запускалось через:

```bash
npm run dev
```

- В проекте появились стандартные папки шаблона:

```txt
electron/
src/
public/
```

- В `package.json` уже есть Electron, React, TypeScript, Vite и сборочные зависимости.
- Установлен Playwright:

```bash
npm install -D playwright
npx playwright install
```

- Установлен Prettier:

```bash
npm install -D prettier
```

- Установлен dotenv:

```bash
npm install dotenv
```

- Установлен Sass для SCSS:

```bash
npm install -D sass-embedded
```

- Prettier настроен прямо в `package.json`.
- Отдельные `.prettierrc`, `.prettierignore`, `.editorconfig` пока не создаём.
- `.gitignore` нужно дополнить под Electron, Playwright и `.env`, если это ещё не сделано.

---

## Уже добавлено в архитектуру проекта

- Создана папка `src/core/types/`.
- Добавлен `src/core/types/README.md` с описанием моделей данных.
- Добавлены первые типы данных:
  - `ProviderCategory`;
  - `Provider`.
- В `Provider` используется поле `categories`, а не `category`, потому что один AI-сервис может относиться к нескольким категориям.
- Категория `code` пока не используется: кодовые AI-сервисы на MVP считаются частью `chat` или `other`.
- Добавлен `src/core/types/index.ts` для удобного экспорта типов.
- Добавлен первый provider JSON:
  - `src/providers/kling/provider.json`.
- Создана папка `src/core/provider-registry/`.
- Добавлен `src/core/provider-registry/README.md` с описанием роли Provider Registry.

---

## Уже добавлено в UI

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
```

Текущая идея:

- `Dashboard` показывает список AI-сервисов;
- `Header` показывает верхнюю шапку Dashboard;
- `Button` задаёт общий вид кнопок для Header и ProviderCard;
- `ProviderCard` показывает карточку одного сервиса;
- `src/providers/index.ts` временно хранит массив `Provider[]` для UI;
- пока показываем Kling;
- в `Header` есть логотип `svoi.soroki`, placeholder `Поиск` и кнопки `Добавить`, `Статистика`, `Настройки`, `Open All`;
- кнопки в `Header` пока без действий, фильтрация/поиск пока не реализованы;
- кнопка `Open` у карточки провайдера вызывает безопасный Electron IPC-мост и открывает `launchUrl` в системном браузере;
- Kling открывается по адресу `https://app.klingai.com/global/`, чтобы использовать авторизацию текущего профиля браузера;
- статус пока статичный: `Not connected`.

Важно: приложение не хранит логины, пароли или cookies Kling. Авторизацию хранит системный браузер. Если в браузере несколько профилей или аккаунтов, откроется аккаунт активного профиля браузера.

`Button` поддерживает:

- `buttonStyle`: `naked`, `framed`, `CTA`;
- `size`: `L`, `S`;
- текст, SVG-иконку или SVG-иконку с текстом;
- стандартные свойства кнопки вроде `onClick`, `disabled`, `aria-label`;
- временный tooltip для кнопок только с иконкой.

Важно: `src/providers/index.ts` — временное решение до Provider Registry.

---

## Уже добавлено в автотесты

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

## Уже добавлено в стили

Установлен `sass-embedded`.

Добавлены базовые SCSS-файлы:

```txt
src/app/styles/index.scss
src/app/styles/normalize.scss
src/app/styles/reset.scss
src/app/styles/variables.scss
src/app/styles/typography.scss
```

`index.scss` подключён в `src/main.tsx`:

```ts
import './app/styles/index.scss';
```

Договорённость по стилям:

- минималистичный дизайн в духе ChatGPT;
- цвета через CSS variables и `rgba`;
- в названии цвета указывать процент прозрачности;
- общие расстояния держать в `--space-*`;
- общие скругления держать в `--radius-*`;
- минимальная ширина приложения: `--app-min-width: 360px`;
- использовать CSS Modules + SCSS для компонентов;
- общий компонент `Button` хранит свои стили рядом в `Button.module.scss`;
- `mixins.scss` и `functions.scss` пока не создавать.

---

## Важное решение по структуре

Вся пользовательская архитектура должна жить внутри `src/`:

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

---

## Важное решение по папкам

Не создавать всю структуру заранее.

Папки создаются по мере необходимости, когда появляется первый реальный файл или README с объяснением роли модуля.

Причина: так проще понимать историю проекта, делать осмысленные коммиты и не хранить пустые директории без назначения.

---

## Важное решение по Provider Registry

Provider Registry пока описан документацией, но полноценная реализация кода отложена.

Не импортировать `provider.json` напрямую в TypeScript как готовый `Provider`, потому что TypeScript читает JSON слишком широко: например, `categories` становится `string[]`, а не `ProviderCategory[]`.

Не использовать `as Provider` или `as Provider['categories']` как основное архитектурное решение.

Позже Provider Registry должен загружать JSON через отдельную функцию и валидировать данные перед преобразованием в `Provider`.

---

## Установленные пакеты и зачем они нужны

### Playwright

Установлен как dev-зависимость:

```bash
npm install -D playwright
npx playwright install
```

Нужен для:

- открытия AI-сервисов;
- работы с browser profiles;
- сохранения и восстановления сессий;
- проверки авторизации;
- полуавтоматических сценариев проверки кредитов.

### Prettier

Установлен как dev-зависимость:

```bash
npm install -D prettier
```

Нужен для:

- автоматического форматирования кода;
- единого стиля между пользователем и агентом;
- уменьшения лишних изменений в Git.

### dotenv

Установлен как обычная зависимость:

```bash
npm install dotenv
```

Нужен для будущих локальных настроек окружения.

Важно: не хранить в `.env` пароли от AI-сервисов.

### sass-embedded

Установлен как dev-зависимость:

```bash
npm install -D sass-embedded
```

Нужен для SCSS в Vite-проекте.

---

## Что ещё доустановить сейчас

Ничего.

---

## Чего пока не делать

```txt
Не ставить SQLite
Не ставить Prisma
Не ставить backend-сервер
Не ставить авторизацию пользователей
Не ставить оплату
Не подключать AI API
Не хранить пароли
Не ставить Redux/Zustand на старте
Не создавать .prettierrc, .prettierignore, .editorconfig без необходимости
Не создавать всю структуру папок заранее
Не импортировать provider.json напрямую как готовый Provider без валидации
Не создавать отдельную папку data ради временных данных
Не создавать mixins.scss/functions.scss без необходимости
```

---

## Текущий практический статус UI

Первый Dashboard собран и подключён.

Сейчас есть:

```txt
src/providers/index.ts
src/app/pages/Dashboard/Dashboard.tsx
src/app/pages/Dashboard/Dashboard.module.scss
src/app/components/Header/Header.tsx
src/app/components/Header/Header.module.scss
src/app/components/ProviderCard/ProviderCard.tsx
src/app/components/ProviderCard/ProviderCard.module.scss
src/App.tsx
```

Что уже есть на экране:

- показать карточку Kling на экране;
- показать шапку Dashboard;
- использовать логотип `src/assets/SV{}ISOROKI.svg`;
- держать placeholder `Поиск` без настоящей фильтрации;
- держать кнопки шапки без действий;
- использовать тип `Provider`;
- не подключать пока чтение JSON;
- не реализовывать пока полноценный Provider Registry;
- действие кнопки `Open` уже реализовано через Electron IPC; не заменять его прямым импортом Electron API в React.

---

## Следующая продуктовая задача

Продолжать развивать Dashboard маленькими UI-шагами.

Не переходить к Provider Registry, Playwright, аккаунтам и storage без отдельной задачи. Базовый Electron IPC для открытия провайдера уже добавлен.

---

## Следующая архитектурная задача

Позже добавить остальные типы:

```ts
ServiceAccount;
AccountStatus;
DailyCheck;
AutomationStep;
```

И положить их в:

```txt
src/core/types/
```

Но не переходить к этому без отдельной задачи: первый Dashboard уже зафиксирован, следующий шаг должен быть осознанным.
