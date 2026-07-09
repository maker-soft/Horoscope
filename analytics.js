(function () {
  const CONFIG = window.HOROSCOPE_ANALYTICS_CONFIG || {};
  const CONSENT_KEY = "horoscopeAnalyticsConsent";
  const EVENT_QUEUE = [];
  let started = false;

  function hasProvider() {
    const ga = CONFIG.googleAnalytics || {};
    const ym = CONFIG.yandexMetrica || {};
    const umami = CONFIG.umami || {};
    return Boolean(
      (ga.enabled && ga.measurementId && !ga.measurementId.includes("XXXX")) ||
      (ym.enabled && ym.counterId) ||
      (umami.enabled && umami.websiteId && umami.scriptUrl && !umami.websiteId.startsWith("00000000"))
    );
  }

  function getConsent() {
    if (!CONFIG.consentMode) return "accepted";
    return localStorage.getItem(CONSENT_KEY);
  }

  function setConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
  }

  function loadScript(src, attrs = {}) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = src;
      Object.entries(attrs).forEach(([key, value]) => {
        if (value !== undefined && value !== null) script.setAttribute(key, String(value));
      });
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function initGoogleAnalytics() {
    const ga = CONFIG.googleAnalytics || {};
    if (!ga.enabled || !ga.measurementId || ga.measurementId.includes("XXXX")) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ga.measurementId, {
      anonymize_ip: true,
      send_page_view: true
    });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga.measurementId)}`).catch(() => {});
  }

  function initYandexMetrica() {
    const ymCfg = CONFIG.yandexMetrica || {};
    if (!ymCfg.enabled || !ymCfg.counterId) return;

    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    window.ym(ymCfg.counterId, "init", {
      clickmap: Boolean(ymCfg.clickmap),
      trackLinks: Boolean(ymCfg.trackLinks),
      accurateTrackBounce: Boolean(ymCfg.accurateTrackBounce),
      webvisor: Boolean(ymCfg.webvisor)
    });
  }

  function initUmami() {
    const umamiCfg = CONFIG.umami || {};
    if (!umamiCfg.enabled || !umamiCfg.websiteId || !umamiCfg.scriptUrl || umamiCfg.websiteId.startsWith("00000000")) return;
    loadScript(umamiCfg.scriptUrl, { "data-website-id": umamiCfg.websiteId }).catch(() => {});
  }

  function sendEvent(name, params = {}) {
    if (!started) {
      EVENT_QUEUE.push([name, params]);
      return;
    }

    const ga = CONFIG.googleAnalytics || {};
    if (window.gtag && ga.enabled) {
      window.gtag("event", name, params);
    }

    const ymCfg = CONFIG.yandexMetrica || {};
    if (window.ym && ymCfg.enabled && ymCfg.counterId) {
      window.ym(ymCfg.counterId, "reachGoal", name, params);
      window.ym(ymCfg.counterId, "params", { [name]: params });
    }

    if (window.umami && typeof window.umami.track === "function") {
      window.umami.track(name, params);
    }
  }

  function startAnalytics() {
    if (started || !hasProvider()) return;
    started = true;
    initGoogleAnalytics();
    initYandexMetrica();
    initUmami();
    while (EVENT_QUEUE.length) {
      const [name, params] = EVENT_QUEUE.shift();
      sendEvent(name, params);
    }
  }

  function initializeAnalytics() {
    if (!hasProvider()) return;

    if (!CONFIG.consentMode) {
      startAnalytics();
      return;
    }

    const consent = getConsent();
    if (consent === "accepted") {
      startAnalytics();
    }
  }

  window.HoroscopeAnalytics = {
    track: sendEvent,
    start: startAnalytics,
    consent: getConsent
  };

  document.addEventListener("DOMContentLoaded", initializeAnalytics);
})();
