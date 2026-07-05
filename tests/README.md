# AI Collector tests

Тесты лежат отдельно от приложения, чтобы UI-код в `src/app/` оставался чистым.

Текущая структура:

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
```

Правило на будущее:

- общие помощники класть в `tests/helpers/`;
- тесты UI-компонентов класть в `tests/ui/ComponentName/`;
- рядом с UI-тестом можно держать `.fixture.html` и `.fixture.tsx`;
- единая команда для всех тестов — `npm test`;
- точечная команда для UI-тестов — `npm run test:ui`;
- временные smoke-проверки dev-сервера не класть в проект, пока они не стали постоянным тестом.
