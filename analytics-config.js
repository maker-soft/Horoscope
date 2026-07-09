/*
  Настройка аналитики.

  Вставьте свои идентификаторы счетчиков и загрузите файлы на GitHub Pages.
  Если оставить значения пустыми, аналитика не будет отправляться.

  Поддерживается:
  - Google Analytics 4: measurementId вида G-XXXXXXXXXX
  - Яндекс Метрика: counterId, например 12345678
  - Umami: websiteId и scriptUrl, например https://cloud.umami.is/script.js
*/
window.HOROSCOPE_ANALYTICS_CONFIG = {
  consentMode: true,

  googleAnalytics: {
    enabled: false,
    measurementId: "G-XXXXXXXXXX"
  },

  yandexMetrica: {
    enabled: false,
    counterId: 0,
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false
  },

  umami: {
    enabled: false,
    websiteId: "00000000-0000-0000-0000-000000000000",
    scriptUrl: "https://cloud.umami.is/script.js"
  }
};
