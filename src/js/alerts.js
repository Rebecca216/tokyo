/**
 * 智慧降價提醒與通知邏輯引擎 (Smart Alert & Notification Engine)
 */

export const DEFAULT_ALERT_CONFIG = {
  flightMaxPrice: 17000,        // 來回機票預設通知上限 < $17,000
  packageMinPrice: 17000,       // 機加酒預設通知下限 $17,000
  packageMaxPrice: 27000,       // 機加酒預設通知上限 $27,000
  packageMinRating: 7.5,        // 飯店中等以上評分門檻 >= 7.5
  requireConvenientLocation: true, // 限交通便利區域 (捷運/JR 5分鐘內)
  soundEnabled: true,
  webNotifyEnabled: false,
  lineWebhookToken: ''
};

// 從 LocalStorage 載入設定或使用預設值
export function loadAlertConfig() {
  try {
    const saved = localStorage.getItem('tokyo_flight_alert_config');
    if (saved) {
      return { ...DEFAULT_ALERT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn('Could not read alert config from localStorage:', e);
  }
  return { ...DEFAULT_ALERT_CONFIG };
}

// 儲存設定至 LocalStorage
export function saveAlertConfig(config) {
  try {
    localStorage.setItem('tokyo_flight_alert_config', JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save alert config:', e);
  }
}

/**
 * 評估促銷標的：回傳符合使用者設定降價警示的所有物件與分析結果
 */
export function evaluateDeals(flightDeals, packageDeals, config = loadAlertConfig()) {
  // 1. 機票篩選：來回機票 < flightMaxPrice
  const matchedFlights = flightDeals.filter(f => f.price < config.flightMaxPrice);

  // 2. 機加酒篩選：價格介於 packageMinPrice ~ packageMaxPrice 且 評分 >= packageMinRating (若開啟交通便利則過濾)
  const matchedPackages = packageDeals.filter(p => {
    const priceOk = p.price >= config.packageMinPrice && p.price <= config.packageMaxPrice;
    const ratingOk = p.hotelRating >= config.packageMinRating;
    const locationOk = !config.requireConvenientLocation || p.isConvenientLocation;
    return priceOk && ratingOk && locationOk;
  });

  const totalCount = matchedFlights.length + matchedPackages.length;

  return {
    matchedFlights,
    matchedPackages,
    totalCount,
    config
  };
}

/**
 * 觸發系統通知（瀏覽器推播 + 站內音效 + Toast）
 */
export function triggerNotification(title, body, soundUrl = null) {
  // 1. 站內 Toast 通知
  showToastNotification(title, body);

  // 2. 瀏覽器推播 (如已授權)
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body: body,
      icon: 'https://cdn-icons-png.flaticon.com/512/201/201623.png',
      tag: 'tokyo-flight-alert'
    });
  }

  // 3. 播放提示音
  if (soundUrl) {
    try {
      const audio = new Audio(soundUrl);
      audio.play().catch(() => {});
    } catch (e) {
      // Audio playback silent fallthrough
    }
  }
}

/**
 * 要求瀏覽器通知權限
 */
export async function requestWebNotificationPermission() {
  if (!('Notification' in window)) {
    alert('您的瀏覽器不支援桌面通知功能。');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

/**
 * 站內浮動 Toast 提示
 */
export function showToastNotification(title, message, durationMs = 5000) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-card slide-in';
  toast.innerHTML = `
    <div class="toast-icon">⚡</div>
    <div class="toast-content">
      <h4 class="toast-title">${escapeHtml(title)}</h4>
      <p class="toast-message">${escapeHtml(message)}</p>
    </div>
    <button class="toast-close">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => {
    toast.classList.add('fade-out');
    setTimeout(() => toast.remove(), 300);
  });

  container.appendChild(toast);

  setTimeout(() => {
    if (toast.parentNode) {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 300);
    }
  }, durationMs);
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
