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
  signId: "capricorn",
  screen: "select"
};

const el = {
  selectScreen: document.getElementById("selectScreen"),
  forecastScreen: document.getElementById("forecastScreen"),
  todayLabel: document.getElementById("todayLabel"),
  resultDate: document.getElementById("resultDate"),
  zodiacWheel: document.getElementById("zodiacWheel"),
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
  shareBtn: document.getElementById("shareBtn"),
  backToWheelBtn: document.getElementById("backToWheelBtn")
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

function getDayIndex(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  const day = Math.floor(diff / 86400000);
  return day % 365;
}

function getForecast(signId) {
  const dayIndex = getDayIndex();
  const list = window.HOROSCOPE_FORECASTS && window.HOROSCOPE_FORECASTS[signId];
  return (list && list[dayIndex]) || FALLBACK_FORECAST;
}

function getDateLabel(date = new Date()) {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);
}

function setScreen(screenName) {
  state.screen = screenName;
  const isSelect = screenName === "select";

  el.selectScreen.classList.toggle("active", isSelect);
  el.forecastScreen.classList.toggle("active", !isSelect);
  el.selectScreen.hidden = !isSelect;
  el.forecastScreen.hidden = isSelect;
}

function renderZodiacWheel() {
  const oldButtons = el.zodiacWheel.querySelectorAll(".zodiac-btn");
  oldButtons.forEach(button => button.remove());

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
  const forecast = getForecast(sign.id);

  el.signIcon.textContent = sign.icon;
  el.signName.textContent = sign.name;
  el.signPeriod.textContent = sign.period;
  el.energyScore.textContent = forecast.energy;
  el.luckScore.textContent = forecast.luck;
  el.focusScore.textContent = forecast.focus;
  el.mainForecast.textContent = forecast.main;
  el.workForecast.textContent = forecast.work;
  el.loveForecast.textContent = forecast.love;
  el.moneyForecast.textContent = forecast.money;
  el.healthForecast.textContent = forecast.health;
  el.dayAdvice.textContent = forecast.advice;

  trackAnalytics("forecast_view", {
    sign_id: sign.id,
    sign_name: sign.name,
    date_key: dateKey,
    layout: "result_screen_without_wheel"
  });
}

function selectSign(sign) {
  state.signId = sign.id;
  localStorage.setItem("horoscopeSign", sign.id);
  trackAnalytics("sign_select", { sign_id: sign.id, sign_name: sign.name, layout: "fullscreen_circle_capricorn_top" });
  renderForecast();
  setScreen("forecast");
}

function initializeDateLabels() {
  const label = getDateLabel();
  el.todayLabel.textContent = label;
  el.resultDate.textContent = label;
}

el.backToWheelBtn.addEventListener("click", () => {
  trackAnalytics("sign_change_open", { from_sign_id: state.signId });
  setScreen("select");
});

el.shareBtn.addEventListener("click", async () => {
  const shareText = `${el.signName.textContent}: ${el.mainForecast.textContent} Совет: ${el.dayAdvice.textContent}`;
  if (navigator.share) {
    try {
      await navigator.share({ title: "Гороскоп на сегодня", text: shareText, url: location.href });
      trackAnalytics("share", { method: "native", sign_id: state.signId });
    } catch (error) {
      // Пользователь закрыл системное окно — это нормальный сценарий.
    }
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(shareText);
    trackAnalytics("share", { method: "clipboard", sign_id: state.signId });
    el.shareBtn.textContent = "Скопировано";
    setTimeout(() => (el.shareBtn.textContent = "Поделиться"), 1400);
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

initializeDateLabels();
renderZodiacWheel();
setScreen("select");
trackAnalytics("select_screen_view", { layout: "fullscreen_circle_capricorn_top" });
