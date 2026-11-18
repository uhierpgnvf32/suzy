(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  const I18N = {
    ru: {
      nav_home: "Главная", nav_academy: "Академия", nav_community: "Сообщество", nav_about: "О проекте", lang: "Язык интерфейса",
      title: "Шаг за шагом к мечте", tagline: "Развивайся · Создавай · Живи",
      quote: "Вчера — история, завтра — загадка, а сегодня — подарок.", quote_by: "Мастер Угвэй, «Кунг-фу Панда»",
      ideas: "Идеи и дело", ideas_s: "Создавай своё будущее", europe: "Жизнь в Европе", europe_s: "Полезные советы",
      links: "Полезные ссылки", links_s: "Проверенные ресурсы", laws: "Законы для бизнеса", laws_s: "и самозанятых",
      people: "Свои люди", people_s: "Общение и поддержка", horoscope: "Гороскоп дня", horoscope_s: "Узнай, что готовят звёзды",
      fitness: "Фитнес и энергия", fitness_s: "Будь в форме", tasks: "Мои задачи", tasks_s: "Планируй и достигай",
      family: "Семейный проект", soon: "Раздел готовится.",
      cab_eyebrow: "Моё пространство", focus: "Фокус", garden: "Мой сад", daily: "Один шаг сегодня",
      task_title: "Что я хочу сделать?", placeholder: "Например: изучить одну полезную тему", add: "Добавить",
      t_start: "Начать 40 минут", t_pause: "Пауза", t_resume: "Продолжить", t_restart: "Начать заново", t_reset: "Сбросить",
      t_cap: "40 минут спокойной работы без отвлечений.", t_run: "Идёт работа. Один шаг за раз.",
      t_paused: "Пауза. Можно продолжить в любой момент.", t_done: "Время вышло. Сделайте перерыв.",
      plant_cap: n => `Выполнено задач: ${n}. С каждой отмеченной задачей росток растёт.`, close: "Закрыть", del: "Удалить"
    },
    uk: {
      nav_home: "Головна", nav_academy: "Академія", nav_community: "Спільнота", nav_about: "Про проєкт", lang: "Мова інтерфейсу",
      title: "Крок за кроком до мрії", tagline: "Розвивайся · Створюй · Живи",
      quote: "Вчора — історія, завтра — загадка, а сьогодні — подарунок.", quote_by: "Майстер Угвей, «Кунг-фу Панда»",
      ideas: "Ідеї та справа", ideas_s: "Створюй своє майбутнє", europe: "Життя в Європі", europe_s: "Корисні поради",
      links: "Корисні посилання", links_s: "Перевірені ресурси", laws: "Закони для бізнесу", laws_s: "і самозайнятих",
      people: "Свої люди", people_s: "Спілкування і підтримка", horoscope: "Гороскоп дня", horoscope_s: "Дізнайся, що готують зорі",
      fitness: "Фітнес та енергія", fitness_s: "Будь у формі", tasks: "Мої завдання", tasks_s: "Плануй і досягай",
      family: "Родинний проєкт", soon: "Розділ готується.",
      cab_eyebrow: "Мій простір", focus: "Фокус", garden: "Мій сад", daily: "Один крок сьогодні",
      task_title: "Що я хочу зробити?", placeholder: "Наприклад: вивчити одну корисну тему", add: "Додати",
      t_start: "Почати 40 хвилин", t_pause: "Пауза", t_resume: "Продовжити", t_restart: "Почати знову", t_reset: "Скинути",
      t_cap: "40 хвилин спокійної роботи без відволікань.", t_run: "Триває робота. Один крок за раз.",
      t_paused: "Пауза. Можна продовжити будь-коли.", t_done: "Час вийшов. Зробіть перерву.",
      plant_cap: n => `Виконано завдань: ${n}. З кожним позначеним завданням паросток росте.`, close: "Закрити", del: "Видалити"
    },
    en: {
      nav_home: "Home", nav_academy: "Academy", nav_community: "Community", nav_about: "About", lang: "Interface language",
      title: "Step by Step to the Dream", tagline: "Grow · Create · Live",
      quote: "Yesterday is history, tomorrow is a mystery, but today is a gift.", quote_by: "Master Oogway, Kung Fu Panda",
      ideas: "Ideas & Business", ideas_s: "Build your future", europe: "Life in Europe", europe_s: "Practical advice",
      links: "Useful Links", links_s: "Vetted resources", laws: "Business Law", laws_s: "for the self-employed too",
      people: "Your People", people_s: "Connection and support", horoscope: "Daily Horoscope", horoscope_s: "See what the stars have planned",
      fitness: "Fitness & Energy", fitness_s: "Stay in shape", tasks: "My Tasks", tasks_s: "Plan and achieve",
      family: "A family project", soon: "This section is being prepared.",
      cab_eyebrow: "My space", focus: "Focus", garden: "My garden", daily: "One step today",
      task_title: "What do I want to do?", placeholder: "For example: learn one useful thing", add: "Add",
      t_start: "Start 40 minutes", t_pause: "Pause", t_resume: "Resume", t_restart: "Start again", t_reset: "Reset",
      t_cap: "40 minutes of calm, uninterrupted work.", t_run: "Working. One step at a time.",
      t_paused: "Paused. Resume whenever you're ready.", t_done: "Time's up. Take a break.",
      plant_cap: n => `Tasks done: ${n}. The sprout grows with each one you tick off.`, close: "Close", del: "Delete"
    }
  };
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* приватный режим */ } }
  };

  let lang = I18N[store.get("sitenada.lang", "")] ? store.get("sitenada.lang", "") : "ru";
  const t = () => I18N[lang];

  // ---------- разделы ----------
  const panel = $("#panel");
  const CARD_IDS = ["ideas", "europe", "links", "laws", "people", "horoscope", "fitness"];
  let currentSection = null;

  function renderPanel() {
    if (!currentSection) return;
    const d = t(), id = currentSection;
    const label = id === "nova" ? "NOVA" : d[id] || d["nav_" + id];
    $("#panel-title").textContent = label;
    $("#panel-text").textContent = CARD_IDS.includes(id) ? d[id + "_s"] + ". " + d.soon : d.soon;
  }
  function go(id) {
    if (id === "home") { currentSection = null; panel.hidden = true; window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    currentSection = id;
    panel.hidden = false;
    renderPanel();
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  $$("[data-go]").forEach(b => b.addEventListener("click", () => go(b.dataset.go)));

  // ---------- кабинет ----------
  const cabinet = $("#cabinet");
  $("#open-cabinet").addEventListener("click", () => cabinet.showModal());
  $("#close-cabinet").addEventListener("click", () => cabinet.close());
  cabinet.addEventListener("click", e => { if (e.target === cabinet) cabinet.close(); });

  // ---------- таймер (по конечному времени, без накопления погрешности) ----------
  const DURATION = 40 * 60;
  const clock = $("#clock"), bar = $("#bar"), tMain = $("#t-main"), tStatus = $("#t-status");
  let state = "idle", remaining = DURATION, deadline = 0, ticker = null;

  function renderTimer() {
    const d = t();
    clock.textContent = String(Math.floor(remaining / 60)).padStart(2, "0") + ":" + String(remaining % 60).padStart(2, "0");
    bar.style.width = ((DURATION - remaining) / DURATION * 100) + "%";
    tMain.textContent = { idle: d.t_start, running: d.t_pause, paused: d.t_resume, done: d.t_restart }[state];
    tStatus.textContent = { idle: d.t_cap, running: d.t_run, paused: d.t_paused, done: d.t_done }[state];
  }
  function tick() {
    remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
    if (remaining === 0) {
      clearInterval(ticker); state = "done";
      navigator.vibrate?.([120, 70, 120]);
    }
    renderTimer();
  }
  tMain.addEventListener("click", () => {
    if (state === "running") { tick(); clearInterval(ticker); state = "paused"; }
    else {
      if (state === "done") remaining = DURATION;
      state = "running"; deadline = Date.now() + remaining * 1000;
      clearInterval(ticker); ticker = setInterval(tick, 250);
    }
    renderTimer();
  });
  $("#t-reset").addEventListener("click", () => { clearInterval(ticker); state = "idle"; remaining = DURATION; renderTimer(); });

  // ---------- задачи и росток ----------
  let tasks = store.get("sitenada.tasks", []);
  const list = $("#task-list"), input = $("#task-input");
  const save = () => store.set("sitenada.tasks", tasks);

  function renderTasks() {
    list.replaceChildren(...tasks.map((task, i) => {
      const li = document.createElement("li");
      li.classList.toggle("done", task.done);
      const label = document.createElement("label");
      const cb = document.createElement("input");
      cb.type = "checkbox"; cb.checked = task.done;
      cb.addEventListener("change", () => { task.done = cb.checked; save(); renderTasks(); });
      const span = document.createElement("span");
      span.textContent = task.text;
      label.append(cb, span);
      const del = document.createElement("button");
      del.type = "button"; del.className = "del"; del.textContent = "×"; del.setAttribute("aria-label", t().del);
      del.addEventListener("click", () => { tasks.splice(i, 1); save(); renderTasks(); });
      li.append(label, del);
      return li;
    }));
    const done = tasks.filter(x => x.done).length, stage = Math.min(done, 5);
    $$("#plant [data-n]").forEach(el => el.classList.toggle("on", +el.dataset.n <= stage));
    $("#stem").style.transform = `scaleY(${0.35 + stage * 0.13})`;
    $("#plant-cap").textContent = t().plant_cap(done);
  }
  $("#task-form").addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    tasks.push({ text, done: false }); save(); renderTasks();
    input.value = ""; input.focus();
  });

  // ---------- язык ----------
  function applyLanguage() {
    const d = t();
    document.documentElement.lang = lang === "uk" ? "uk" : lang;
    $$("[data-i18n]").forEach(el => { if (typeof d[el.dataset.i18n] === "string") el.textContent = d[el.dataset.i18n]; });
    $$("[data-i18n-ph]").forEach(el => { el.placeholder = d[el.dataset.i18nPh]; });
    document.title = d.title;
    $("#close-cabinet").setAttribute("aria-label", d.close);
    $("#lang").value = lang;
    renderTimer(); renderTasks(); renderPanel();
  }
  $("#lang").addEventListener("change", e => { lang = e.target.value; store.set("sitenada.lang", lang); applyLanguage(); });

  applyLanguage();
})();
