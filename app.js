const ZODIAC = [
  { id: "aries", name: "Овен", icon: "♈", period: "21 марта — 19 апреля" },
  { id: "taurus", name: "Телец", icon: "♉", period: "20 апреля — 20 мая" },
  { id: "gemini", name: "Близнецы", icon: "♊", period: "21 мая — 20 июня" },
  { id: "cancer", name: "Рак", icon: "♋", period: "21 июня — 22 июля" },
  { id: "leo", name: "Лев", icon: "♌", period: "23 июля — 22 августа" },
  { id: "virgo", name: "Дева", icon: "♍", period: "23 августа — 22 сентября" },
  { id: "libra", name: "Весы", icon: "♎", period: "23 сентября — 22 октября" },
  { id: "scorpio", name: "Скорпион", icon: "♏", period: "23 октября — 21 ноября" },
  { id: "sagittarius", name: "Стрелец", icon: "♐", period: "22 ноября — 21 декабря" },
  { id: "capricorn", name: "Козерог", icon: "♑", period: "22 декабря — 19 января" },
  { id: "aquarius", name: "Водолей", icon: "♒", period: "20 января — 18 февраля" },
  { id: "pisces", name: "Рыбы", icon: "♓", period: "19 февраля — 20 марта" }
];

const TEXTS = {
  main: [
    "День подходит для спокойных решений и аккуратного движения вперёд. Не спешите с выводами: сильнее всего сработает план, который можно проверить фактами.",
    "Сегодня важно выбрать один главный приоритет и не распыляться. Вторая половина дня благоприятна для коротких переговоров и наведения порядка.",
    "Хороший день для обновления привычных процессов. Маленькая корректировка даст больше эффекта, чем резкий разворот.",
    "День подталкивает к диалогу. Слушайте внимательнее обычного: полезная подсказка может прозвучать между строк.",
    "Энергия дня усиливает инициативу, но требует дисциплины. Начинайте с того, что точно можно завершить сегодня.",
    "Сегодня лучше выбирать практичные действия. Не доказывайте очевидное — покажите результат."
  ],
  work: [
    "Закройте одну зависшую задачу и зафиксируйте договорённости письменно.",
    "Подходит для анализа, планирования и наведения порядка в списке дел.",
    "В переговорах поможет спокойная аргументация и конкретные сроки.",
    "Не перегружайте день встречами: оставьте окно для глубокой работы.",
    "Хорошо идут задачи, где нужна структура, регламент или проверка деталей."
  ],
  love: [
    "Тёплый разговор лучше начинать без претензий и скрытых ожиданий.",
    "Проявите внимание к мелочам: сегодня они будут заметнее громких жестов.",
    "Не торопите собеседника. Мягкий тон даст больше, чем давление.",
    "Подходящий день для примирения, если обе стороны готовы слышать друг друга.",
    "Лучше говорить прямо, но бережно: недосказанность может запутать ситуацию."
  ],
  money: [
    "Отложите импульсивные покупки и проверьте регулярные платежи.",
    "День подходит для пересмотра бюджета и поиска небольших оптимизаций.",
    "Финансовые решения принимайте после сравнения альтернатив.",
    "Избегайте риска ради быстрых результатов. Надёжность сегодня важнее скорости.",
    "Хорошее время для планирования будущих расходов, но не для авантюр."
  ],
  health: [
    "Снизьте темп к вечеру и добавьте короткую прогулку.",
    "Пейте больше воды и не пропускайте паузы между задачами.",
    "Организму поможет режим: сон, питание и меньше лишнего экрана.",
    "Не игнорируйте усталость. Короткий отдых повысит продуктивность.",
    "Лучше выбрать умеренную активность без перегрузки."
  ],
  advice: [
    "Сначала главное, потом второстепенное.",
    "Не спорьте с фактами — используйте их.",
    "Одна завершённая задача ценнее пяти начатых.",
    "Сделайте паузу перед важным ответом.",
    "Проверьте детали до отправки.",
    "Выберите простое решение и доведите его до конца.",
    "Не усложняйте то, что уже работает.",
    "Держите фокус на результате."
  ],
  colors: ["золотой", "фиолетовый", "синий", "изумрудный", "бордовый", "серебряный", "белый", "графитовый", "бирюзовый", "янтарный"]
};

const state = {
  signId: localStorage.getItem("horoscopeSign") || "aries",
  salt: 0
};

const el = {
  todayLabel: document.getElementById("todayLabel"),
  zodiacGrid: document.getElementById("zodiacGrid"),
  signIcon: document.getElementById("signIcon"),
  signName: document.getElementById("signName"),
  signPeriod: document.getElementById("signPeriod"),
  energyScore: document.getElementById("energyScore"),
  luckScore: document.getElementById("luckScore"),
  focusScore: document.getElementById("focusScore"),
  mainForecast: document.getElementById("mainForecast"),
  workForecast: document.getElementById("workForecast"),
  loveForecast: document.getElementById("loveForecast"),
  moneyForecast: document.getElementById("moneyForecast"),
  healthForecast: document.getElementById("healthForecast"),
  dayAdvice: document.getElementById("dayAdvice"),
  luckyColor: document.getElementById("luckyColor"),
  luckyNumber: document.getElementById("luckyNumber"),
  refreshBtn: document.getElementById("refreshBtn"),
  shareBtn: document.getElementById("shareBtn"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
  installHintBtn: document.getElementById("installHintBtn"),
  installPanel: document.getElementById("installPanel"),
  closeInstallPanel: document.getElementById("closeInstallPanel")
};

function trackAnalytics(eventName, params = {}) {
  if (window.HoroscopeAnalytics && typeof window.HoroscopeAnalytics.track === "function") {
    window.HoroscopeAnalytics.track(eventName, params);
  }
}

function getDateKey() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hashString(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

function seeded(seed) {
  let value = seed >>> 0;
  return function next() {
    value += 0x6D2B79F5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(list, random) {
  return list[Math.floor(random() * list.length)];
}

function score(random, min = 62, max = 96) {
  return Math.round(min + random() * (max - min));
}

function renderZodiacButtons() {
  el.zodiacGrid.innerHTML = "";
  for (const sign of ZODIAC) {
    const btn = document.createElement("button");
    btn.className = `zodiac-btn ${sign.id === state.signId ? "active" : ""}`;
    btn.type = "button";
    btn.setAttribute("role", "listitem");
    btn.innerHTML = `<span class="zodiac-symbol">${sign.icon}</span><span class="zodiac-name">${sign.name}</span>`;
    btn.addEventListener("click", () => {
      state.signId = sign.id;
      state.salt = 0;
      localStorage.setItem("horoscopeSign", sign.id);
      trackAnalytics("sign_select", { sign_id: sign.id, sign_name: sign.name });
      render();
    });
    el.zodiacGrid.appendChild(btn);
  }
}

function render() {
  const date = new Date();
  const dateKey = getDateKey();
  const sign = ZODIAC.find(item => item.id === state.signId) || ZODIAC[0];
  const seed = hashString(`${dateKey}:${sign.id}:${state.salt}`);
  const random = seeded(seed);

  el.todayLabel.textContent = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);

  el.signIcon.textContent = sign.icon;
  el.signName.textContent = sign.name;
  el.signPeriod.textContent = sign.period;

  el.energyScore.textContent = score(random);
  el.luckScore.textContent = score(random);
  el.focusScore.textContent = score(random);

  el.mainForecast.textContent = pick(TEXTS.main, random);
  el.workForecast.textContent = pick(TEXTS.work, random);
  el.loveForecast.textContent = pick(TEXTS.love, random);
  el.moneyForecast.textContent = pick(TEXTS.money, random);
  el.healthForecast.textContent = pick(TEXTS.health, random);
  el.dayAdvice.textContent = pick(TEXTS.advice, random);
  el.luckyColor.textContent = pick(TEXTS.colors, random);
  el.luckyNumber.textContent = String(1 + Math.floor(random() * 99));

  renderZodiacButtons();
  trackAnalytics("forecast_view", { sign_id: sign.id, sign_name: sign.name, date_key: dateKey, refreshed: state.salt > 0 });
}

el.refreshBtn.addEventListener("click", () => {
  state.salt += 1;
  trackAnalytics("forecast_refresh", { sign_id: state.signId });
  render();
});

el.shareBtn.addEventListener("click", async () => {
  const shareText = `${el.signName.textContent}: ${el.mainForecast.textContent} Совет дня: ${el.dayAdvice.textContent}`;
  if (navigator.share) {
    try {
      await navigator.share({
        title: "Гороскоп на сегодня",
        text: shareText,
        url: location.href
      });
      trackAnalytics("share", { method: "native", sign_id: state.signId });
    } catch (error) {
      // Пользователь закрыл системное окно — это не ошибка интерфейса.
    }
  } else {
    await navigator.clipboard.writeText(shareText);
    trackAnalytics("share", { method: "clipboard", sign_id: state.signId });
    el.shareBtn.textContent = "Скопировано";
    setTimeout(() => (el.shareBtn.textContent = "Поделиться"), 1400);
  }
});

el.fullscreenBtn.addEventListener("click", async () => {
  if (!document.fullscreenElement && document.documentElement.requestFullscreen) {
    await document.documentElement.requestFullscreen();
    trackAnalytics("fullscreen_open");
    el.fullscreenBtn.textContent = "Выйти";
  } else if (document.exitFullscreen) {
    await document.exitFullscreen();
    el.fullscreenBtn.textContent = "Во весь экран";
  }
});

el.installHintBtn.addEventListener("click", () => {
  trackAnalytics("install_hint_open");
  el.installPanel.classList.remove("hidden");
  el.installPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

el.closeInstallPanel.addEventListener("click", () => {
  el.installPanel.classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

render();
