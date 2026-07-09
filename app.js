const ZODIAC = [
  { id: "capricorn", name: "Козерог", icon: "♑", period: "22 декабря — 19 января" },
  { id: "aquarius", name: "Водолей", icon: "♒", period: "20 января — 18 февраля" },
  { id: "pisces", name: "Рыбы", icon: "♓", period: "19 февраля — 20 марта" },
  { id: "aries", name: "Овен", icon: "♈", period: "21 марта — 19 апреля" },
  { id: "taurus", name: "Телец", icon: "♉", period: "20 апреля — 20 мая" },
  { id: "gemini", name: "Близнецы", icon: "♊", period: "21 мая — 20 июня" },
  { id: "cancer", name: "Рак", icon: "♋", period: "21 июня — 22 июля" },
  { id: "leo", name: "Лев", icon: "♌", period: "23 июля — 22 августа" },
  { id: "virgo", name: "Дева", icon: "♍", period: "23 августа — 22 сентября" },
  { id: "libra", name: "Весы", icon: "♎", period: "23 сентября — 22 октября" },
  { id: "scorpio", name: "Скорпион", icon: "♏", period: "23 октября — 21 ноября" },
  { id: "sagittarius", name: "Стрелец", icon: "♐", period: "22 ноября — 21 декабря" }
];

const CHINESE_ANIMALS = [
  { id: "rat", name: "Крыса", icon: "🐀", qualities: "изобретательность, скорость реакции и практичный ум" },
  { id: "ox", name: "Бык", icon: "🐂", qualities: "выдержка, надёжность и умение доводить начатое" },
  { id: "tiger", name: "Тигр", icon: "🐅", qualities: "смелость, напор и желание действовать первым" },
  { id: "rabbit", name: "Кролик", icon: "🐇", qualities: "дипломатичность, вкус и мягкая сила" },
  { id: "dragon", name: "Дракон", icon: "🐉", qualities: "масштаб, харизма и уверенность в больших целях" },
  { id: "snake", name: "Змея", icon: "🐍", qualities: "интуиция, стратегическое мышление и наблюдательность" },
  { id: "horse", name: "Лошадь", icon: "🐎", qualities: "энергия движения, свобода и быстрые решения" },
  { id: "goat", name: "Коза", icon: "🐐", qualities: "творчество, эмпатия и стремление к гармонии" },
  { id: "monkey", name: "Обезьяна", icon: "🐒", qualities: "гибкость, юмор и умение находить нестандартный ход" },
  { id: "rooster", name: "Петух", icon: "🐓", qualities: "точность, дисциплина и яркая самопрезентация" },
  { id: "dog", name: "Собака", icon: "🐕", qualities: "верность, справедливость и чувство ответственности" },
  { id: "pig", name: "Свинья", icon: "🐖", qualities: "щедрость, спокойствие и умение ценить простые радости" }
];

const CHINESE_ELEMENTS = ["Металл", "Металл", "Вода", "Вода", "Дерево", "Дерево", "Огонь", "Огонь", "Земля", "Земля"];
const COMPATIBLE_TRINES = [
  ["rat", "dragon", "monkey"],
  ["ox", "snake", "rooster"],
  ["tiger", "horse", "dog"],
  ["rabbit", "goat", "pig"]
];

const MONTH_THEMES = [
  "старт и наведение порядка", "переговоры и укрепление связей", "финансовая осторожность", "личная энергия и восстановление",
  "обновление целей", "практичные решения", "семейный баланс", "рост влияния", "новые договорённости", "фокус на результате", "закрытие долгов", "подведение итогов"
];

const FALLBACK_FORECAST = {
  main: "День подходит для спокойных решений и аккуратного движения вперёд.",
  work: "Выберите один приоритет и завершите его.",
  love: "Говорите прямо, но бережно.",
  money: "Отложите импульсивные траты.",
  health: "Сделайте паузу и восстановите темп.",
  advice: "Держите фокус.",
  energy: 84,
  luck: 76,
  focus: 69
};

const state = {
  mode: "day",
  signId: "capricorn",
  screen: "menu"
};

const el = {
  menuScreen: document.getElementById("menuScreen"),
  zodiacScreen: document.getElementById("zodiacScreen"),
  forecastScreen: document.getElementById("forecastScreen"),
  chineseScreen: document.getElementById("chineseScreen"),
  compatibilityScreen: document.getElementById("compatibilityScreen"),
  menuDateLabel: document.getElementById("menuDateLabel"),
  todayLabel: document.getElementById("todayLabel"),
  resultDate: document.getElementById("resultDate"),
  zodiacTitle: document.getElementById("zodiacTitle"),
  zodiacWheel: document.getElementById("zodiacWheel"),
  dayModeBtn: document.getElementById("dayModeBtn"),
  monthModeBtn: document.getElementById("monthModeBtn"),
  signIcon: document.getElementById("signIcon"),
  signName: document.getElementById("signName"),
  signPeriod: document.getElementById("signPeriod"),
  forecastEyebrow: document.getElementById("forecastEyebrow"),
  energyScore: document.getElementById("energyScore"),
  luckScore: document.getElementById("luckScore"),
  focusScore: document.getElementById("focusScore"),
  energyLabel: document.getElementById("energyLabel"),
  focusLabel: document.getElementById("focusLabel"),
  mainForecast: document.getElementById("mainForecast"),
  workTitle: document.getElementById("workTitle"),
  loveTitle: document.getElementById("loveTitle"),
  moneyTitle: document.getElementById("moneyTitle"),
  healthTitle: document.getElementById("healthTitle"),
  workForecast: document.getElementById("workForecast"),
  loveForecast: document.getElementById("loveForecast"),
  moneyForecast: document.getElementById("moneyForecast"),
  healthForecast: document.getElementById("healthForecast"),
  adviceLabel: document.getElementById("adviceLabel"),
  dayAdvice: document.getElementById("dayAdvice"),
  shareBtn: document.getElementById("shareBtn"),
  backToWheelBtn: document.getElementById("backToWheelBtn"),
  backToMenuBtn: document.getElementById("backToMenuBtn"),
  backToMenuFromZodiacBtn: document.getElementById("backToMenuFromZodiacBtn"),
  birthYearSelect: document.getElementById("birthYearSelect"),
  showChineseBtn: document.getElementById("showChineseBtn"),
  chineseResult: document.getElementById("chineseResult"),
  backToMenuFromChineseBtn: document.getElementById("backToMenuFromChineseBtn"),
  maleZodiacSelect: document.getElementById("maleZodiacSelect"),
  femaleZodiacSelect: document.getElementById("femaleZodiacSelect"),
  maleYearSelect: document.getElementById("maleYearSelect"),
  femaleYearSelect: document.getElementById("femaleYearSelect"),
  calculateCompatibilityBtn: document.getElementById("calculateCompatibilityBtn"),
  compatibilityResult: document.getElementById("compatibilityResult"),
  backToMenuFromCompatibilityBtn: document.getElementById("backToMenuFromCompatibilityBtn")
};

function trackAnalytics(eventName, params = {}) {
  if (window.HoroscopeAnalytics && typeof window.HoroscopeAnalytics.track === "function") {
    window.HoroscopeAnalytics.track(eventName, params);
  }
}

function getDateKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDayIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  return Math.floor(diff / 86400000) % 365;
}

function getDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function getMonthLabel(date = new Date()) {
  return new Intl.DateTimeFormat("ru-RU", {
    month: "long",
    year: "numeric"
  }).format(date);
}

function hashNumber(seed, min = 60, max = 99) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return min + (hash % (max - min + 1));
}

function getDailyForecast(signId) {
  const list = window.HOROSCOPE_FORECASTS && window.HOROSCOPE_FORECASTS[signId];
  return (list && list[getDayIndex()]) || FALLBACK_FORECAST;
}

function getMonthlyForecast(sign) {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const theme = MONTH_THEMES[(month + ZODIAC.findIndex(item => item.id === sign.id) + 12) % MONTH_THEMES.length];
  const base = `${year}-${month}-${sign.id}`;

  return {
    main: `${sign.name}: главный акцент месяца — ${theme}. Месяц лучше проходить через понятный план: сначала стабилизируйте важные дела, затем выбирайте одну зону для роста. Не распыляйтесь — устойчивый результат даст регулярность.`,
    work: "Рабочие задачи требуют приоритизации. Полезно заранее закрепить сроки, ответственных и критерии результата.",
    love: "В отношениях важнее не скорость событий, а ясность намерений. Поддержат спокойные разговоры и внимание к деталям.",
    money: "Финансовые решения стоит принимать после проверки обязательных платежей, резервов и долгосрочных планов.",
    health: "Берегите режим сна и восстановление. Месяц хорошо подходит для мягкого возвращения к стабильным привычкам.",
    advice: "Выберите один главный фокус месяца и возвращайтесь к нему каждый день.",
    energy: hashNumber(base + "energy", 62, 97),
    luck: hashNumber(base + "luck", 58, 96),
    focus: hashNumber(base + "focus", 60, 98)
  };
}

function getForecast(sign) {
  return state.mode === "month" ? getMonthlyForecast(sign) : getDailyForecast(sign.id);
}

function getChineseAnimal(year) {
  const index = ((Number(year) - 4) % 12 + 12) % 12;
  return { ...CHINESE_ANIMALS[index], index };
}

function getChineseElement(year) {
  return CHINESE_ELEMENTS[((Number(year) % 10) + 10) % 10];
}

function setScreen(screenName) {
  state.screen = screenName;
  const screens = {
    menu: el.menuScreen,
    zodiac: el.zodiacScreen,
    forecast: el.forecastScreen,
    chinese: el.chineseScreen,
    compatibility: el.compatibilityScreen
  };

  Object.entries(screens).forEach(([name, node]) => {
    const isActive = name === screenName;
    node.classList.toggle("active", isActive);
    node.hidden = !isActive;
  });

  trackAnalytics("screen_view", { screen: screenName });
}

function setMode(mode) {
  state.mode = mode;
  el.dayModeBtn.classList.toggle("active", mode === "day");
  el.monthModeBtn.classList.toggle("active", mode === "month");
  el.zodiacTitle.textContent = mode === "day" ? "Гороскоп на день" : "Гороскоп на месяц";
  el.todayLabel.textContent = mode === "day" ? getDateLabel() : getMonthLabel();
  trackAnalytics("period_mode_select", { mode });
}

function openZodiacFlow(mode) {
  setMode(mode);
  setScreen("zodiac");
}

function renderZodiacWheel() {
  el.zodiacWheel.querySelectorAll(".zodiac-btn").forEach(button => button.remove());

  const radius = 42;
  ZODIAC.forEach((sign, index) => {
    const angle = -90 + index * 30;
    const radians = angle * Math.PI / 180;
    const btn = document.createElement("button");
    btn.className = "zodiac-btn";
    btn.type = "button";
    btn.setAttribute("role", "listitem");
    btn.setAttribute("aria-label", sign.name);
    btn.style.setProperty("--x", (Math.cos(radians) * radius).toFixed(3));
    btn.style.setProperty("--y", (Math.sin(radians) * radius).toFixed(3));
    btn.innerHTML = `<span class="zodiac-symbol">${sign.icon}</span><span class="zodiac-name">${sign.name}</span>`;
    btn.addEventListener("click", () => selectSign(sign));
    el.zodiacWheel.appendChild(btn);
  });
}

function renderForecast() {
  const dateKey = getDateKey();
  const sign = ZODIAC.find(item => item.id === state.signId) || ZODIAC[0];
  const forecast = getForecast(sign);
  const isMonth = state.mode === "month";

  el.signIcon.textContent = sign.icon;
  el.signName.textContent = sign.name;
  el.signPeriod.textContent = sign.period;
  el.forecastEyebrow.textContent = isMonth ? "Прогноз на месяц" : "Прогноз на сегодня";
  el.resultDate.textContent = isMonth ? getMonthLabel() : getDateLabel();
  el.energyScore.textContent = forecast.energy;
  el.luckScore.textContent = forecast.luck;
  el.focusScore.textContent = forecast.focus;
  el.energyLabel.textContent = isMonth ? "ресурс" : "энергия";
  el.focusLabel.textContent = isMonth ? "темп" : "фокус";
  el.mainForecast.textContent = forecast.main;
  el.workTitle.textContent = "Работа";
  el.loveTitle.textContent = "Отношения";
  el.moneyTitle.textContent = "Финансы";
  el.healthTitle.textContent = "Самочувствие";
  el.workForecast.textContent = forecast.work;
  el.loveForecast.textContent = forecast.love;
  el.moneyForecast.textContent = forecast.money;
  el.healthForecast.textContent = forecast.health;
  el.adviceLabel.textContent = isMonth ? "Совет месяца" : "Совет дня";
  el.dayAdvice.textContent = forecast.advice;

  trackAnalytics("forecast_view", {
    sign_id: sign.id,
    sign_name: sign.name,
    date_key: dateKey,
    mode: state.mode,
    layout: "menu_zodiac_result"
  });
}

function selectSign(sign) {
  state.signId = sign.id;
  localStorage.setItem("horoscopeSign", sign.id);
  trackAnalytics("sign_select", { sign_id: sign.id, sign_name: sign.name, mode: state.mode });
  renderForecast();
  setScreen("forecast");
}

function fillYearSelect(select, selectedYear) {
  const currentYear = new Date().getFullYear();
  select.innerHTML = "";
  for (let year = currentYear; year >= 1924; year -= 1) {
    const animal = getChineseAnimal(year);
    const option = document.createElement("option");
    option.value = year;
    option.textContent = `${year} — ${animal.name}`;
    if (year === selectedYear) option.selected = true;
    select.appendChild(option);
  }
}

function fillZodiacSelect(select, selectedId = "capricorn") {
  select.innerHTML = "";
  ZODIAC.forEach(sign => {
    const option = document.createElement("option");
    option.value = sign.id;
    option.textContent = `${sign.icon} ${sign.name}`;
    if (sign.id === selectedId) option.selected = true;
    select.appendChild(option);
  });
}

function renderChineseHoroscope() {
  const year = Number(el.birthYearSelect.value);
  const animal = getChineseAnimal(year);
  const element = getChineseElement(year);
  const score = hashNumber(`chinese-${year}-${getDateKey()}`, 64, 98);
  const dayTone = score > 84 ? "сильный день для инициативы" : score > 72 ? "ровный день для практичных решений" : "день бережного темпа и наблюдательности";

  el.chineseResult.innerHTML = `
    <article class="result-hero">
      <div class="result-icon">${animal.icon}</div>
      <div>
        <p class="eyebrow">${year} год рождения</p>
        <h2>${animal.name} · ${element}</h2>
        <p>${dayTone}. Ваши базовые качества: ${animal.qualities}. Сегодня лучше опираться на сильные стороны знака и не принимать решения из раздражения.</p>
      </div>
    </article>
    <div class="mini-grid">
      <div><strong>${score}%</strong><span>потенциал дня</span></div>
      <div><strong>${hashNumber(`balance-${year}`, 58, 96)}%</strong><span>баланс</span></div>
      <div><strong>${hashNumber(`resource-${year}`, 60, 97)}%</strong><span>ресурс</span></div>
    </div>
    <section class="text-blocks">
      <article><h3>Дела</h3><p>Ставьте перед собой конкретную задачу и фиксируйте результат. Знак ${animal.name} выигрывает там, где есть ясный маршрут.</p></article>
      <article><h3>Отношения</h3><p>Сработает спокойный тон и уважение к личным границам. Избегайте давления и поспешных выводов.</p></article>
      <article><h3>Совет</h3><p>Сделайте один шаг, который укрепляет вашу позицию без лишнего риска.</p></article>
    </section>
  `;

  trackAnalytics("chinese_forecast_view", { year, animal: animal.name, element });
}

function chineseCompatibilityScore(a, b) {
  if (a.id === b.id) return 84;
  const sameTrine = COMPATIBLE_TRINES.some(group => group.includes(a.id) && group.includes(b.id));
  const opposite = Math.abs(a.index - b.index) === 6;
  if (sameTrine) return 92;
  if (opposite) return 56;
  const diff = Math.min(Math.abs(a.index - b.index), 12 - Math.abs(a.index - b.index));
  return 78 - diff * 2;
}

function zodiacCompatibilityScore(maleSign, femaleSign) {
  const a = ZODIAC.findIndex(item => item.id === maleSign.id);
  const b = ZODIAC.findIndex(item => item.id === femaleSign.id);
  const diff = Math.min(Math.abs(a - b), 12 - Math.abs(a - b));
  if (diff === 0) return 84;
  if ([2, 4, 8, 10].includes(diff)) return 90;
  if ([1, 5, 7, 11].includes(diff)) return 74;
  if (diff === 6) return 62;
  return 80;
}

function renderCompatibility() {
  const maleSign = ZODIAC.find(item => item.id === el.maleZodiacSelect.value) || ZODIAC[0];
  const femaleSign = ZODIAC.find(item => item.id === el.femaleZodiacSelect.value) || ZODIAC[1];
  const maleYear = Number(el.maleYearSelect.value);
  const femaleYear = Number(el.femaleYearSelect.value);
  const maleAnimal = getChineseAnimal(maleYear);
  const femaleAnimal = getChineseAnimal(femaleYear);
  const zScore = zodiacCompatibilityScore(maleSign, femaleSign);
  const cScore = chineseCompatibilityScore(maleAnimal, femaleAnimal);
  const total = Math.round(zScore * 0.58 + cScore * 0.42);
  const tone = total >= 88 ? "очень высокая совместимость" : total >= 76 ? "хорошая совместимость" : total >= 64 ? "совместимость требует внимания" : "контрастная пара, где важны правила общения";

  el.compatibilityResult.innerHTML = `
    <article class="result-hero compatibility-hero">
      <div class="result-icon">${maleSign.icon}${femaleSign.icon}</div>
      <div>
        <p class="eyebrow">Итог совместимости</p>
        <h2>${total}% · ${tone}</h2>
        <p>Мужчина: ${maleSign.name}, ${maleAnimal.name}. Женщина: ${femaleSign.name}, ${femaleAnimal.name}. Зодиакальная часть показывает стиль общения, китайский календарь — базовый темперамент и ритм решений.</p>
      </div>
    </article>
    <div class="mini-grid">
      <div><strong>${zScore}%</strong><span>зодиак</span></div>
      <div><strong>${cScore}%</strong><span>китайский цикл</span></div>
      <div><strong>${total}%</strong><span>общий индекс</span></div>
    </div>
    <section class="text-blocks">
      <article><h3>Сильная сторона</h3><p>${maleSign.name} и ${femaleSign.name} могут быстро находить общий курс, если договорятся о правилах общения и не будут соревноваться за контроль.</p></article>
      <article><h3>Зона риска</h3><p>${maleAnimal.name} и ${femaleAnimal.name} по-разному проживают напряжение. Важны паузы, ясные ожидания и прямые договорённости.</p></article>
      <article><h3>Совет пары</h3><p>Обсуждайте не только чувства, но и бытовые решения: деньги, планы, отдых и личное пространство.</p></article>
    </section>
  `;

  trackAnalytics("compatibility_view", {
    male_sign: maleSign.id,
    female_sign: femaleSign.id,
    male_year: maleYear,
    female_year: femaleYear,
    score: total
  });
}

function initializeDateLabels() {
  const label = getDateLabel();
  el.menuDateLabel.textContent = label;
  el.todayLabel.textContent = label;
  el.resultDate.textContent = label;
}

function initializeSelectors() {
  const nowYear = new Date().getFullYear();
  fillYearSelect(el.birthYearSelect, 1990);
  fillYearSelect(el.maleYearSelect, 1988 <= nowYear ? 1988 : nowYear);
  fillYearSelect(el.femaleYearSelect, 1992 <= nowYear ? 1992 : nowYear);
  fillZodiacSelect(el.maleZodiacSelect, "capricorn");
  fillZodiacSelect(el.femaleZodiacSelect, "taurus");
  renderChineseHoroscope();
  renderCompatibility();
}

function bindEvents() {
  document.querySelectorAll("[data-flow]").forEach(button => {
    button.addEventListener("click", () => {
      const flow = button.dataset.flow;
      trackAnalytics("menu_select", { flow });
      if (flow === "day" || flow === "month") openZodiacFlow(flow);
      if (flow === "chinese") setScreen("chinese");
      if (flow === "compatibility") setScreen("compatibility");
    });
  });

  el.dayModeBtn.addEventListener("click", () => setMode("day"));
  el.monthModeBtn.addEventListener("click", () => setMode("month"));
  el.backToMenuFromZodiacBtn.addEventListener("click", () => setScreen("menu"));
  el.backToMenuBtn.addEventListener("click", () => setScreen("menu"));
  el.backToMenuFromChineseBtn.addEventListener("click", () => setScreen("menu"));
  el.backToMenuFromCompatibilityBtn.addEventListener("click", () => setScreen("menu"));

  el.backToWheelBtn.addEventListener("click", () => {
    trackAnalytics("sign_change_open", { from_sign_id: state.signId, mode: state.mode });
    setScreen("zodiac");
  });

  el.showChineseBtn.addEventListener("click", renderChineseHoroscope);
  el.birthYearSelect.addEventListener("change", renderChineseHoroscope);
  el.calculateCompatibilityBtn.addEventListener("click", renderCompatibility);
  [el.maleZodiacSelect, el.femaleZodiacSelect, el.maleYearSelect, el.femaleYearSelect].forEach(input => {
    input.addEventListener("change", renderCompatibility);
  });

  el.shareBtn.addEventListener("click", async () => {
    const shareTitle = state.mode === "month" ? "Гороскоп на месяц" : "Гороскоп на сегодня";
    const shareText = `${el.signName.textContent}: ${el.mainForecast.textContent} Совет: ${el.dayAdvice.textContent}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: shareText, url: location.href });
        trackAnalytics("share", { method: "native", sign_id: state.signId, mode: state.mode });
      } catch (error) {
        // Пользователь закрыл системное окно — это нормальный сценарий.
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareText);
      trackAnalytics("share", { method: "clipboard", sign_id: state.signId, mode: state.mode });
      el.shareBtn.textContent = "Скопировано";
      setTimeout(() => (el.shareBtn.textContent = "Поделиться"), 1400);
    }
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

initializeDateLabels();
renderZodiacWheel();
initializeSelectors();
bindEvents();
setScreen("menu");
trackAnalytics("app_start", { layout: "multi_horoscope_menu" });
