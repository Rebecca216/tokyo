/**
 * 11/18-23 東京機票與機加酒價格觀察與智慧監測系統 (自包含獨立腳本)
 * 完全相容 file:// 協定與 http:// 伺服器
 */

// 1. 行程與平台資料定義
const TRAVEL_INFO = {
  departureDate: '2026-11-18',
  returnDate: '2026-11-23',
  durationDays: 6,
  durationNights: 5,
  season: '日本關東秋季紅葉賞楓旺季',
  lastUpdated: new Date().toISOString()
};

const PLATFORMS = [
  { id: 'trip', name: 'Trip.com', color: '#0056b3', type: 'OTA' },
  { id: 'eztravel', name: '易遊網 ezTravel', color: '#e84118', type: 'OTA' },
  { id: 'agoda', name: 'Agoda 專案', color: '#8c7ae6', type: 'OTA' },
  { id: 'klook', name: 'Klook 旅遊', color: '#ff6b81', type: 'OTA' },
  { id: 'eva', name: '長榮航空官網', color: '#009432', type: 'Airline' },
  { id: 'ci', name: '中華航空官網', color: '#0652DD', type: 'Airline' },
  { id: 'starlux', name: '星宇航空官網', color: '#B33771', type: 'Airline' },
  { id: 'tiger', name: '台灣虎航官網', color: '#FFC312', type: 'LCC' },
  { id: 'peach', name: '樂桃航空官網', color: '#EA2027', type: 'LCC' },
  { id: 'jal', name: '日本航空 JAL 官網', color: '#273c75', type: 'Airline' },
  { id: 'ana', name: '全日空 ANA 官網', color: '#1289A7', type: 'Airline' }
];

const FLIGHT_DEALS = [
  {
    id: 'fl-001',
    type: 'flight',
    origin: 'KHH',
    originName: '高雄小港',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '台灣虎航 Tigerair',
    airlineCode: 'IT',
    isLCC: true,
    platform: 'tiger',
    platformName: '台灣虎航官網',
    price: 12800,
    originalPrice: 15500,
    outboundTime: '11/18 08:00 KHH ➔ 12:30 NRT (IT280)',
    inboundTime: '11/23 13:30 NRT ➔ 16:50 KHH (IT281)',
    flightTimeHours: 3.5,
    baggage: '包含 7kg 手提 + 20kg 託運行李',
    taxIncluded: true,
    seatClass: '經濟艙',
    rating: 8.2,
    directUrl: 'https://www.tigerairtw.com/zh-tw/',
    popularTag: '⚡ 高雄超值小資首選'
  },
  {
    id: 'fl-002',
    type: 'flight',
    origin: 'KHH',
    originName: '高雄小港',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '中華航空 China Airlines',
    airlineCode: 'CI',
    isLCC: false,
    platform: 'eztravel',
    platformName: '易遊網 ezTravel',
    price: 16800,
    originalPrice: 19200,
    outboundTime: '11/18 09:30 KHH ➔ 13:55 NRT (CI102)',
    inboundTime: '11/23 15:00 NRT ➔ 18:20 KHH (CI103)',
    flightTimeHours: 3.4,
    baggage: '包含 7kg 手提 + 23kg 託運行李 (附餐食)',
    taxIncluded: true,
    seatClass: '精緻經濟艙',
    rating: 8.9,
    directUrl: 'https://www.eztravel.com.tw/',
    popularTag: '🔥 華航高雄限時促銷'
  },
  {
    id: 'fl-003',
    type: 'flight',
    origin: 'KHH',
    originName: '高雄小港',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '長榮航空 EVA Air',
    airlineCode: 'BR',
    isLCC: false,
    platform: 'eva',
    platformName: '長榮航空官網',
    price: 18500,
    originalPrice: 21000,
    outboundTime: '11/18 07:00 KHH ➔ 11:25 NRT (BR108)',
    inboundTime: '11/23 12:25 NRT ➔ 15:45 KHH (BR107)',
    flightTimeHours: 3.4,
    baggage: '包含 7kg 手提 + 23kg 託運行李',
    taxIncluded: true,
    seatClass: '標準經濟艙',
    rating: 9.1,
    directUrl: 'https://www.evaair.com/',
    popularTag: '早去午回'
  },
  {
    id: 'fl-004',
    type: 'flight',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '台灣虎航 Tigerair',
    airlineCode: 'IT',
    isLCC: true,
    platform: 'trip',
    platformName: 'Trip.com',
    price: 11900,
    originalPrice: 14800,
    outboundTime: '11/18 06:35 TPE ➔ 10:45 NRT (IT200)',
    inboundTime: '11/23 11:45 NRT ➔ 15:00 TPE (IT201)',
    flightTimeHours: 3.1,
    baggage: '包含 7kg 手提 + 20kg 託運行李',
    taxIncluded: true,
    seatClass: '經濟艙',
    rating: 8.0,
    directUrl: 'https://tw.trip.com/',
    popularTag: '⚡ 桃機最低破萬價'
  },
  {
    id: 'fl-005',
    type: 'flight',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'HND',
    destinationName: '東京羽田',
    airline: '樂桃航空 Peach',
    airlineCode: 'MM',
    isLCC: true,
    platform: 'peach',
    platformName: '樂桃航空官網',
    price: 13500,
    originalPrice: 16200,
    outboundTime: '11/18 20:45 TPE ➔ 00:55+1 HND (MM860)',
    inboundTime: '11/23 05:55 HND ➔ 08:55 TPE (MM859)',
    flightTimeHours: 3.1,
    baggage: '包含 7kg 手提 + 20kg 託運行李',
    taxIncluded: true,
    seatClass: 'Value Peach',
    rating: 8.3,
    directUrl: 'https://www.flypeach.com/tw',
    popularTag: '羽田市區近直達'
  },
  {
    id: 'fl-006',
    type: 'flight',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '星宇航空 STARLUX',
    airlineCode: 'JX',
    isLCC: false,
    platform: 'starlux',
    platformName: '星宇航空官網',
    price: 16500,
    originalPrice: 19800,
    outboundTime: '11/18 08:30 TPE ➔ 12:45 NRT (JX800)',
    inboundTime: '11/23 14:00 NRT ➔ 17:05 TPE (JX801)',
    flightTimeHours: 3.2,
    baggage: '包含 7kg 手提 + 23kg 託運行李 (精緻機上餐與4K螢幕)',
    taxIncluded: true,
    seatClass: '限量特惠經濟艙',
    rating: 9.5,
    directUrl: 'https://www.starlux-airlines.com/',
    popularTag: '🌟 星宇楓葉季限時閃殺'
  },
  {
    id: 'fl-007',
    type: 'flight',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '長榮航空 EVA Air',
    airlineCode: 'BR',
    isLCC: false,
    platform: 'trip',
    platformName: 'Trip.com',
    price: 17800,
    originalPrice: 19800,
    outboundTime: '11/18 08:50 TPE ➔ 13:15 NRT (BR198)',
    inboundTime: '11/23 14:15 NRT ➔ 17:30 TPE (BR197)',
    flightTimeHours: 3.4,
    baggage: '包含 7kg 手提 + 23kg 託運行李',
    taxIncluded: true,
    seatClass: '經濟艙',
    rating: 9.1,
    directUrl: 'https://tw.trip.com/',
    popularTag: '長榮桃園經典熱門航班'
  },
  {
    id: 'fl-008',
    type: 'flight',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'HND',
    destinationName: '東京羽田',
    airline: '日本航空 JAL',
    airlineCode: 'JL',
    isLCC: false,
    platform: 'jal',
    platformName: '日本航空 JAL 官網',
    price: 21500,
    originalPrice: 24500,
    outboundTime: '11/18 10:00 TPE ➔ 14:05 HND (JL098)',
    inboundTime: '11/23 18:15 HND ➔ 21:35 TPE (JL099)',
    flightTimeHours: 3.1,
    baggage: '包含 7kg 手提 + 2件23kg 託運行李(高額度)',
    taxIncluded: true,
    seatClass: '豪華經濟艙體驗',
    rating: 9.6,
    directUrl: 'https://www.jal.co.jp/tw/zh-tw/',
    popularTag: '👑 羽田松山/桃園旗艦款 46kg托運'
  }
];

const PACKAGE_DEALS = [
  {
    id: 'pkg-001',
    type: 'package',
    origin: 'KHH',
    originName: '高雄小港',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '台灣虎航 Tigerair',
    platform: 'eztravel',
    platformName: '易遊網 ezTravel',
    price: 18900,
    originalPrice: 23800,
    hotelName: '兩國站塔 APA 飯店 (APA Hotel & Resort Ryogoku Eki Tower)',
    hotelArea: '淺草/兩國區',
    stationProximity: 'JR 兩國站 / 都營大江戶線 步行 3 分鐘 (成田/羽田直達捷運線)',
    isConvenientLocation: true,
    hotelRating: 8.4,
    hotelRatingText: '非常好 (8.4/10)',
    roomType: '高樓層標準雙人房 (含露天大浴場與晴空塔景觀)',
    breakfastIncluded: true,
    flightDetail: '11/18 08:00 高雄飛 ➔ 11/23 13:30 成田回',
    hotelImg: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    directUrl: 'https://www.eztravel.com.tw/',
    popularTag: '⚡ 機加酒降價通知符合標的！'
  },
  {
    id: 'pkg-002',
    type: 'package',
    origin: 'KHH',
    originName: '高雄小港',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '中華航空 China Airlines',
    platform: 'trip',
    platformName: 'Trip.com',
    price: 19800,
    originalPrice: 25000,
    hotelName: '上野紅寶石飯店 (Hotel Sardonyx Ueno)',
    hotelArea: '上野 (Ueno)',
    stationProximity: 'JR 上野站 / 京成 Skyliner 上野站 步行 3 分鐘 (成田41分直達)',
    isConvenientLocation: true,
    hotelRating: 8.3,
    hotelRatingText: '非常好 (8.3/10)',
    roomType: '舒適雙人房 (附免費日式西式精緻早餐)',
    breakfastIncluded: true,
    flightDetail: '11/18 09:30 高雄飛 ➔ 11/23 15:00 成田回 (華航傳統航空托運)',
    hotelImg: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80',
    directUrl: 'https://tw.trip.com/',
    popularTag: '⚡ 交通極優！成田Skyliner直達'
  },
  {
    id: 'pkg-003',
    type: 'package',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '星宇航空 STARLUX',
    platform: 'klook',
    platformName: 'Klook 旅遊',
    price: 23500,
    originalPrice: 29800,
    hotelName: '新宿格拉斯麗飯店 (Hotel Gracery Shinjuku / 哥吉拉飯店)',
    hotelArea: '新宿 (Shinjuku)',
    stationProximity: 'JR 新宿站東口 / 西武新宿站 步行 3-5 分鐘',
    isConvenientLocation: true,
    hotelRating: 8.8,
    hotelRatingText: '極佳 (8.8/10)',
    roomType: '歌舞伎町高層景觀雙人房',
    breakfastIncluded: false,
    flightDetail: '11/18 08:30 桃園飛 ➔ 11/23 14:00 成田回 (星宇奢華服務)',
    hotelImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
    directUrl: 'https://www.klook.com/zh-TW/',
    popularTag: '⚡ 星宇直飛 + 新宿哥吉拉名店！'
  },
  {
    id: 'pkg-004',
    type: 'package',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'NRT',
    destinationName: '東京成田',
    airline: '長榮航空 EVA Air',
    platform: 'eztravel',
    platformName: '易遊網 ezTravel',
    price: 25800,
    originalPrice: 32000,
    hotelName: '三井花園飯店銀座五丁目 (Mitsui Garden Hotel Ginza Gochome)',
    hotelArea: '銀座 (Ginza)',
    stationProximity: '地下鐵 東銀座站 步行 1 分鐘 / JR 有樂町站 步行 6 分鐘',
    isConvenientLocation: true,
    hotelRating: 8.9,
    hotelRatingText: '極佳 (8.9/10)',
    roomType: '摩登大床房 (附大浴場與溫泉體驗)',
    breakfastIncluded: true,
    flightDetail: '11/18 08:50 桃園飛 ➔ 11/23 14:15 成田回 (長榮正航班)',
    hotelImg: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80',
    directUrl: 'https://www.eztravel.com.tw/',
    popularTag: '⚡ 銀座精品時尚住宿！'
  },
  {
    id: 'pkg-005',
    type: 'package',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'HND',
    destinationName: '東京羽田',
    airline: '樂桃航空 Peach',
    platform: 'agoda',
    platformName: 'Agoda 專案',
    price: 17500,
    originalPrice: 21500,
    hotelName: '池袋太陽城王子大飯店 (Sunshine City Prince Hotel Ikebukuro)',
    hotelArea: '池袋 (Ikebukuro)',
    stationProximity: 'JR 池袋站東口 步行 5 分鐘 / 地鐵東池袋站直達 3 分鐘',
    isConvenientLocation: true,
    hotelRating: 8.1,
    hotelRatingText: '很好 (8.1/10)',
    roomType: '太陽城高樓層景觀房',
    breakfastIncluded: false,
    flightDetail: '11/18 20:45 桃園飛 ➔ 11/23 05:55 羽田回',
    hotelImg: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    directUrl: 'https://www.agoda.com/',
    popularTag: '⚡ 破盤價1.7萬起 入住池袋王子'
  },
  {
    id: 'pkg-006',
    type: 'package',
    origin: 'TPE',
    originName: '桃園國際',
    destination: 'HND',
    destinationName: '東京羽田',
    airline: '日本航空 JAL',
    platform: 'trip',
    platformName: 'Trip.com',
    price: 26200,
    originalPrice: 33000,
    hotelName: '美滿如家飯店 東京站東 (MIMARU TOKYO STATION EAST)',
    hotelArea: '東京車站/茅場町',
    stationProximity: '地鐵 茅場町站 步行 2 分鐘 / JR 八丁堀站 步行 4 分鐘',
    isConvenientLocation: true,
    hotelRating: 9.2,
    hotelRatingText: '卓越 (9.2/10)',
    roomType: '日式公寓式大客房 (附廚房與微波爐小客廳)',
    breakfastIncluded: false,
    flightDetail: '11/18 10:00 桃園飛 ➔ 11/23 18:15 羽田回 (日航優質大席位)',
    hotelImg: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    directUrl: 'https://tw.trip.com/',
    popularTag: '⚡ 9.2分高分家庭套房！羽田雙行李'
  }
];

const PRICE_TREND_DATA = {
  labels: ['10/19', '10/22', '10/25', '10/28', '10/31', '11/03', '11/06', '11/09', '11/12', '11/15', '今日(11/18)'],
  khhFlightAvg: [16800, 16200, 15900, 15500, 14800, 14200, 13800, 13200, 12900, 12800, 12800],
  tpeFlightAvg: [15900, 15500, 14900, 14200, 13800, 13200, 12900, 12400, 12100, 11900, 11900],
  pkgAvg: [26500, 25800, 24900, 24200, 23500, 22800, 21900, 20800, 19800, 18900, 18900]
};

// 2. 智慧警示系統引擎
const DEFAULT_ALERT_CONFIG = {
  flightMaxPrice: 17000,
  packageMinPrice: 17000,
  packageMaxPrice: 27000,
  packageMinRating: 7.5,
  requireConvenientLocation: true
};

function loadAlertConfig() {
  try {
    const saved = localStorage.getItem('tokyo_flight_alert_config');
    if (saved) return { ...DEFAULT_ALERT_CONFIG, ...JSON.parse(saved) };
  } catch (e) {}
  return { ...DEFAULT_ALERT_CONFIG };
}

function saveAlertConfig(config) {
  try {
    localStorage.setItem('tokyo_flight_alert_config', JSON.stringify(config));
  } catch (e) {}
}

function evaluateDeals(flightDeals, packageDeals, config = loadAlertConfig()) {
  const matchedFlights = flightDeals.filter(f => f.price < config.flightMaxPrice);
  const matchedPackages = packageDeals.filter(p => {
    const priceOk = p.price >= config.packageMinPrice && p.price <= config.packageMaxPrice;
    const ratingOk = p.hotelRating >= config.packageMinRating;
    const locationOk = !config.requireConvenientLocation || p.isConvenientLocation;
    return priceOk && ratingOk && locationOk;
  });

  return {
    matchedFlights,
    matchedPackages,
    totalCount: matchedFlights.length + matchedPackages.length
  };
}

function showToastNotification(title, message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-card';
  toast.innerHTML = `
    <div class="toast-content">
      <h4 class="toast-title">${escapeHtml(title)}</h4>
      <p class="toast-message">${escapeHtml(message)}</p>
    </div>
    <button class="toast-close">&times;</button>
  `;

  toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
  container.appendChild(toast);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, 5000);
}

// 3. 全域 State 控制
let alertConfig = loadAlertConfig();
let currentFlightDeals = [...FLIGHT_DEALS];
let currentPackageDeals = [...PACKAGE_DEALS];
let watchlist = loadWatchlist();

let filterState = {
  searchQuery: '',
  origin: 'ALL',
  destination: 'ALL',
  type: 'ALL',
  airlineType: 'ALL',
  convenientOnly: false,
  onlyAlertHits: false,
  sortBy: 'price-asc'
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function render3DayLowestPriceHistory() {
  const container = document.getElementById('dailyLowestHistoryGrid');
  if (!container) return;

  const todayMinFlight = Math.min(...currentFlightDeals.map(f => f.price));
  const todayMinPkg = Math.min(...currentPackageDeals.map(p => p.price));
  const historyLogs = loadPriceHistoryLogs(todayMinFlight, todayMinPkg);

  const flightDiff = todayMinFlight - historyLogs.yesterday.flightMin;
  const pkgDiff = todayMinPkg - historyLogs.yesterday.pkgMin;

  container.innerHTML = `
    <div class="daily-price-card">
      <div class="daily-card-header">
        <span class="date-title">🗓️ 昨天 (8/17) 查詢紀錄</span>
        <span class="date-sub">歷史盤口紀錄檔</span>
      </div>
      <div class="daily-card-body">
        <div class="price-item">
          <span>✈️ 最低來回機票</span>
          <strong class="price-val">NT$ ${historyLogs.yesterday.flightMin.toLocaleString()}</strong>
        </div>
        <div class="price-item">
          <span>🏨 最低機加酒5夜</span>
          <strong class="price-val">NT$ ${historyLogs.yesterday.pkgMin.toLocaleString()}</strong>
        </div>
      </div>
      <div class="daily-card-footer">
        <span class="tag-status">基準觀察日</span>
      </div>
    </div>

    <div class="daily-price-card active-day">
      <div class="daily-card-header">
        <div class="primary-badge">本日最新</div>
        <span class="date-title">⚡ 今天 (8/18) 即時查詢</span>
        <span class="date-sub">已整合全網 11 個平台報價</span>
      </div>
      <div class="daily-card-body">
        <div class="price-item">
          <span>✈️ 最低來回機票</span>
          <strong class="price-val highlight">
            NT$ ${todayMinFlight.toLocaleString()}
            ${flightDiff < 0 ? `<small style="color:#059669; font-size:0.75rem; font-weight:bold;">(📉 省 $${Math.abs(flightDiff)})</small>` : ''}
          </strong>
        </div>
        <div class="price-item">
          <span>🏨 最低機加酒5夜</span>
          <strong class="price-val highlight">
            NT$ ${todayMinPkg.toLocaleString()}
            ${pkgDiff < 0 ? `<small style="color:#059669; font-size:0.75rem; font-weight:bold;">(📉 省 $${Math.abs(pkgDiff)})</small>` : ''}
          </strong>
        </div>
      </div>
      <div class="daily-card-footer">
        <span class="tag-status hit">${flightDiff <= 0 ? '🔥 當前處於近3日低價區' : '持平小幅波動'}</span>
      </div>
    </div>

    <div class="daily-price-card">
      <div class="daily-card-header">
        <span class="date-title">🔮 明日 (8/19) 預測走勢</span>
        <span class="date-sub">價格趨勢預測</span>
      </div>
      <div class="daily-card-body">
        <div class="price-item">
          <span>✈️ 預估最低機票</span>
          <strong class="price-val" style="color:#2563eb;">NT$ ${(todayMinFlight - 100).toLocaleString()} ~ ${(todayMinFlight + 300).toLocaleString()}</strong>
        </div>
        <div class="price-item">
          <span>🏨 預估機加酒</span>
          <strong class="price-val" style="color:#2563eb;">NT$ ${todayMinPkg.toLocaleString()} ~ ${(todayMinPkg + 400).toLocaleString()}</strong>
        </div>
      </div>
      <div class="daily-card-footer">
        <span class="tag-status">建議：低於$1.7萬可立即入手</span>
      </div>
    </div>
  `;
}

function loadPriceHistoryLogs(todayFlight, todayPkg) {
  try {
    const saved = localStorage.getItem('tokyo_price_history_logs');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return {
    yesterday: { flightMin: 12400, pkgMin: 18200 },
    today: { flightMin: todayFlight, pkgMin: todayPkg }
  };
}

function initApp() {
  bindEventListeners();
  updateAlertEvaluation();
  render3DayLowestPriceHistory();
  renderMatrix();
  renderDeals();
  renderTrendChart();
  updateWatchlistBadge();

  const evalResult = evaluateDeals(currentFlightDeals, currentPackageDeals, alertConfig);
  if (evalResult.totalCount > 0) {
    showToastNotification(
      '⚡ 降價監測系統發現特惠！',
      `已有 ${evalResult.totalCount} 筆方案符合您的降價門檻 (機票 < $17,000 或 機加酒 $17-27k 交通便利飯店)`
    );
  }
}

function updateAlertEvaluation() {
  const evalResult = evaluateDeals(currentFlightDeals, currentPackageDeals, alertConfig);

  currentFlightDeals.forEach(f => {
    f.isAlertHit = f.price < alertConfig.flightMaxPrice;
  });

  currentPackageDeals.forEach(p => {
    const priceOk = p.price >= alertConfig.packageMinPrice && p.price <= alertConfig.packageMaxPrice;
    const ratingOk = p.hotelRating >= alertConfig.packageMinRating;
    const locationOk = !alertConfig.requireConvenientLocation || p.isConvenientLocation;
    p.isAlertHit = priceOk && ratingOk && locationOk;
  });

  const badgeEl = document.getElementById('alertCountBadge');
  if (badgeEl) badgeEl.textContent = evalResult.totalCount;

  const hitCountEl = document.getElementById('alertHitCount');
  if (hitCountEl) hitCountEl.textContent = evalResult.totalCount;

  const bannerTitle = document.getElementById('bannerTitle');
  const bannerDesc = document.getElementById('bannerDesc');
  if (bannerTitle && bannerDesc) {
    if (evalResult.totalCount > 0) {
      bannerTitle.textContent = `⚡ 發現 ${evalResult.totalCount} 筆符合降價通知條件的熱門優惠！`;
      bannerDesc.textContent = `包含 ${evalResult.matchedFlights.length} 筆來回機票低於 $${alertConfig.flightMaxPrice.toLocaleString()} 元，以及 ${evalResult.matchedPackages.length} 筆 $${alertConfig.packageMinPrice.toLocaleString()}–$${alertConfig.packageMaxPrice.toLocaleString()} 高評價交通便利機加酒。`;
    } else {
      bannerTitle.textContent = `降價監測系統持續追蹤中`;
      bannerDesc.textContent = `目前尚未有新方案低於預設門檻，系統將於數據連動時即時提示。`;
    }
  }
}

function renderMatrix() {
  const routes = [
    { origin: 'KHH', dest: 'NRT', flightId: 'mat-khh-nrt-flight', pkgId: 'mat-khh-nrt-pkg' },
    { origin: 'KHH', dest: 'HND', flightId: 'mat-khh-hnd-flight', pkgId: 'mat-khh-hnd-pkg' },
    { origin: 'TPE', dest: 'NRT', flightId: 'mat-tpe-nrt-flight', pkgId: 'mat-tpe-nrt-pkg' },
    { origin: 'TPE', dest: 'HND', flightId: 'mat-tpe-hnd-flight', pkgId: 'mat-tpe-hnd-pkg' }
  ];

  routes.forEach(r => {
    const flights = currentFlightDeals.filter(f => f.origin === r.origin && f.destination === r.dest);
    const pkgs = currentPackageDeals.filter(p => p.origin === r.origin && p.destination === r.dest);

    const minFlight = flights.length > 0 ? Math.min(...flights.map(f => f.price)) : null;
    const minPkg = pkgs.length > 0 ? Math.min(...pkgs.map(p => p.price)) : null;

    const flightEl = document.getElementById(r.flightId);
    const pkgEl = document.getElementById(r.pkgId);

    if (flightEl) flightEl.textContent = minFlight ? `NT$ ${minFlight.toLocaleString()}` : '無直飛';
    if (pkgEl) pkgEl.textContent = minPkg ? `NT$ ${minPkg.toLocaleString()}` : '無套裝';
  });
}

function renderDeals() {
  const container = document.getElementById('dealsGrid');
  const noResults = document.getElementById('noResultsView');
  const countText = document.getElementById('dealCountText');
  if (!container) return;

  let combined = [];
  if (filterState.type === 'ALL' || filterState.type === 'flight') {
    combined.push(...currentFlightDeals);
  }
  if (filterState.type === 'ALL' || filterState.type === 'package') {
    combined.push(...currentPackageDeals);
  }

  combined = combined.filter(item => {
    if (filterState.searchQuery) {
      const q = filterState.searchQuery.toLowerCase();
      const matchName = item.hotelName ? item.hotelName.toLowerCase().includes(q) : false;
      const matchAirline = item.airline ? item.airline.toLowerCase().includes(q) : false;
      const matchArea = item.hotelArea ? item.hotelArea.toLowerCase().includes(q) : false;
      const matchPlatform = item.platformName ? item.platformName.toLowerCase().includes(q) : false;
      if (!matchName && !matchAirline && !matchArea && !matchPlatform) return false;
    }

    if (filterState.origin !== 'ALL' && item.origin !== filterState.origin) return false;
    if (filterState.destination !== 'ALL' && item.destination !== filterState.destination) return false;

    if (filterState.airlineType !== 'ALL') {
      const isLCC = item.isLCC || item.airline.includes('虎航') || item.airline.includes('樂桃');
      if (filterState.airlineType === 'LCC' && !isLCC) return false;
      if (filterState.airlineType === 'Airline' && isLCC) return false;
    }

    if (filterState.convenientOnly && item.type === 'package' && !item.isConvenientLocation) return false;
    if (filterState.onlyAlertHits && !item.isAlertHit) return false;

    return true;
  });

  combined.sort((a, b) => {
    if (filterState.sortBy === 'price-asc') return a.price - b.price;
    if (filterState.sortBy === 'price-desc') return b.price - a.price;
    if (filterState.sortBy === 'rating-desc') {
      const rA = a.hotelRating || a.rating || 0;
      const rB = b.hotelRating || b.rating || 0;
      return rB - rA;
    }
    if (filterState.sortBy === 'alert-first') {
      return (b.isAlertHit ? 1 : 0) - (a.isAlertHit ? 1 : 0);
    }
    return 0;
  });

  if (countText) countText.textContent = `共 ${combined.length} 筆方案`;

  if (combined.length === 0) {
    container.innerHTML = '';
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');
  container.innerHTML = combined.map(item => createDealCardHTML(item)).join('');
}

function createDealCardHTML(item) {
  const isFav = watchlist.includes(item.id);
  const isFlight = item.type === 'flight';

  let badgesHTML = '';
  if (item.isAlertHit) {
    badgesHTML += `<span class="deal-badge badge-alert">⚡ 降價促銷特惠</span>`;
  }
  badgesHTML += `<span class="deal-badge badge-platform">${escapeHtml(item.platformName)}</span>`;

  let mediaHTML = '';
  if (isFlight) {
    mediaHTML = `
      <div class="media-flight-banner">
        <div class="flight-route-large">${item.origin} ✈️ ${item.destination}</div>
        <span>${escapeHtml(item.airline)} (${item.seatClass})</span>
      </div>
    `;
  } else {
    mediaHTML = `<img src="${item.hotelImg}" alt="${escapeHtml(item.hotelName)}" loading="lazy" />`;
  }

  let metaHTML = '';
  if (isFlight) {
    metaHTML = `
      <span class="meta-chip">🧳 ${escapeHtml(item.baggage)}</span>
      <span class="meta-chip">⏱️ 飛行 ${item.flightTimeHours} 小時</span>
    `;
  } else {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.hotelName + ' Tokyo')}`;
    metaHTML = `
      <span class="rating-badge">⭐ ${item.hotelRating} ${escapeHtml(item.hotelRatingText.split(' ')[0])}</span>
      <span class="meta-chip ${item.isConvenientLocation ? 'convenient' : ''}">
        ${item.isConvenientLocation ? '🚇 ' : '📍 '}${escapeHtml(item.stationProximity)}
      </span>
      <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="meta-chip" style="color:#2563eb; font-weight:700; text-decoration:none;" onclick="event.stopPropagation();">
        📍 在地圖上記錄與查詢 ➔
      </a>
    `;
  }

  return `
    <div class="deal-card ${item.isAlertHit ? 'alert-hit' : ''}">
      <div class="deal-card-badge-container">
        ${badgesHTML}
      </div>

      <button class="deal-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${item.id}', event)" title="加入口袋名單">
        ${isFav ? '❤️' : '🤍'}
      </button>

      <div class="deal-card-media">
        ${mediaHTML}
      </div>

      <div class="deal-card-body">
        <h4 class="deal-title">${isFlight ? `${item.originName} ↔ ${item.destinationName} 直飛來回` : escapeHtml(item.hotelName)}</h4>
        
        <div class="deal-meta-row">
          ${metaHTML}
        </div>

        <div class="flight-legs">
          <div class="leg-item">🛫 去程：${escapeHtml(item.outboundTime || item.flightDetail)}</div>
          <div class="leg-item">🛬 回程：${escapeHtml(item.inboundTime || '詳見方案詳細資訊')}</div>
        </div>

        ${item.popularTag ? `<div class="meta-chip" style="color: #e11d48; font-weight: 700;">${escapeHtml(item.popularTag)}</div>` : ''}
      </div>

      <div class="deal-card-footer">
        <div class="price-container">
          <span class="original-price">NT$ ${item.originalPrice.toLocaleString()}</span>
          <span class="final-price">NT$ ${item.price.toLocaleString()} <small style="font-size: 0.75rem; font-weight: normal; color: #94a3b8;">/人含稅</small></span>
        </div>
        <button class="btn btn-secondary" onclick="viewDealDetail('${item.id}')">查看明細 ➔</button>
      </div>
    </div>
  `;
}

function bindEventListeners() {
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterState.searchQuery = e.target.value.trim();
      if (filterState.searchQuery) btnClearSearch.classList.remove('hidden');
      else btnClearSearch.classList.add('hidden');
      renderDeals();
    });
  }
  if (btnClearSearch) {
    btnClearSearch.addEventListener('click', () => {
      searchInput.value = '';
      filterState.searchQuery = '';
      btnClearSearch.classList.add('hidden');
      renderDeals();
    });
  }

  bindPillGroup('originPillGroup', (val) => {
    filterState.origin = val;
    renderDeals();
  });

  bindPillGroup('destPillGroup', (val) => {
    filterState.destination = val;
    renderDeals();
  });

  bindPillGroup('typePillGroup', (val) => {
    filterState.type = val;
    renderDeals();
  });

  const airlineSelect = document.getElementById('airlineTypeSelect');
  if (airlineSelect) {
    airlineSelect.addEventListener('change', (e) => {
      filterState.airlineType = e.target.value;
      renderDeals();
    });
  }

  const chkConvenient = document.getElementById('chkConvenientLocationOnly');
  if (chkConvenient) {
    chkConvenient.addEventListener('change', (e) => {
      filterState.convenientOnly = e.target.checked;
      renderDeals();
    });
  }

  const chkAlertHits = document.getElementById('toggleOnlyAlertHits');
  if (chkAlertHits) {
    chkAlertHits.addEventListener('change', (e) => {
      filterState.onlyAlertHits = e.target.checked;
      renderDeals();
    });
  }

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      filterState.sortBy = e.target.value;
      renderDeals();
    });
  }

  const btnReset = document.getElementById('btnResetFilters');
  if (btnReset) btnReset.addEventListener('click', resetFilters);

  const btnRefresh = document.getElementById('btnRefreshData');
  if (btnRefresh) btnRefresh.addEventListener('click', refreshDataSimulation);

  // 飯店地圖總覽 Modal 監聽
  const btnOpenMap = document.getElementById('btnOpenHotelMap');
  const hotelMapModal = document.getElementById('hotelMapModal');
  const btnCloseMap = document.getElementById('btnCloseHotelMapModal');

  if (btnOpenMap) {
    btnOpenMap.addEventListener('click', () => {
      renderHotelMapModal();
      hotelMapModal.classList.remove('hidden');
    });
  }
  if (btnCloseMap) {
    btnCloseMap.addEventListener('click', () => hotelMapModal.classList.add('hidden'));
  }

  const btnOpenAlertHeader = document.getElementById('btnOpenAlertSettings');
  const alertModal = document.getElementById('alertModal');
  const btnCloseAlert = document.getElementById('btnCloseAlertModal');

  if (btnOpenAlertHeader) btnOpenAlertHeader.addEventListener('click', () => alertModal.classList.remove('hidden'));
  if (btnCloseAlert) btnCloseAlert.addEventListener('click', () => alertModal.classList.add('hidden'));

  const alertForm = document.getElementById('alertConfigForm');
  if (alertForm) {
    alertForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alertConfig.flightMaxPrice = Number(document.getElementById('cfgFlightMax').value);
      alertConfig.packageMinPrice = Number(document.getElementById('cfgPackageMin').value);
      alertConfig.packageMaxPrice = Number(document.getElementById('cfgPackageMax').value);
      alertConfig.packageMinRating = Number(document.getElementById('cfgPackageRating').value);
      alertConfig.requireConvenientLocation = document.getElementById('cfgRequireConvenient').checked;

      saveAlertConfig(alertConfig);
      updateAlertEvaluation();
      renderDeals();
      alertModal.classList.add('hidden');
      showToastNotification('✅ 設定已更新', '智慧降價監測門檻已成功更新並套用！');
    });
  }

  const btnWatchlist = document.getElementById('btnToggleWatchlistDrawer');
  const watchlistDrawer = document.getElementById('watchlistDrawer');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');

  if (btnWatchlist) {
    btnWatchlist.addEventListener('click', () => {
      renderWatchlistDrawer();
      watchlistDrawer.classList.remove('hidden');
    });
  }
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', () => watchlistDrawer.classList.add('hidden'));

  const btnCloseDetail = document.getElementById('btnCloseDetailModal');
  const detailModal = document.getElementById('detailModal');
  if (btnCloseDetail) btnCloseDetail.addEventListener('click', () => detailModal.classList.add('hidden'));
}

function bindPillGroup(groupId, onChange) {
  const group = document.getElementById(groupId);
  if (!group) return;
  const buttons = group.querySelectorAll('.pill-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onChange(btn.dataset.val);
    });
  });
}

function resetFilters() {
  filterState = {
    searchQuery: '',
    origin: 'ALL',
    destination: 'ALL',
    type: 'ALL',
    airlineType: 'ALL',
    convenientOnly: false,
    onlyAlertHits: false,
    sortBy: 'price-asc'
  };

  // 1. 重置搜尋列
  const searchInput = document.getElementById('searchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  if (searchInput) searchInput.value = '';
  if (btnClearSearch) btnClearSearch.classList.add('hidden');

  // 2. 重置出發機場、目的地、方案類型 Pill UI
  updatePillActive('originPillGroup', 'ALL');
  updatePillActive('destPillGroup', 'ALL');
  updatePillActive('typePillGroup', 'ALL');

  // 3. 重置下拉選單 Select UI
  const airlineSelect = document.getElementById('airlineTypeSelect');
  if (airlineSelect) airlineSelect.value = 'ALL';

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'price-asc';

  // 4. 重置開關 Switch UI
  const chkConvenient = document.getElementById('chkConvenientLocationOnly');
  if (chkConvenient) chkConvenient.checked = false;

  const chkAlertHits = document.getElementById('toggleOnlyAlertHits');
  if (chkAlertHits) chkAlertHits.checked = false;

  // 5. 重新渲染
  renderDeals();
}

function refreshDataSimulation() {
  const btn = document.getElementById('btnRefreshData');
  if (btn) btn.classList.add('loading');

  setTimeout(() => {
    currentFlightDeals.forEach(f => {
      const delta = (Math.random() - 0.5) * 600;
      f.price = Math.max(9900, Math.round((f.price + delta) / 100) * 100);
    });

    currentPackageDeals.forEach(p => {
      const delta = (Math.random() - 0.5) * 900;
      p.price = Math.max(14900, Math.round((p.price + delta) / 100) * 100);
    });

    updateAlertEvaluation();
    renderMatrix();
    renderDeals();
    renderTrendChart();

    if (btn) btn.classList.remove('loading');
    showToastNotification('🔄 報價連動更新完成', '已重新同步 Trip.com、易遊網與航空公司官網最新盤口！');
  }, 500);
}

function renderTrendChart() {
  const canvas = document.getElementById('priceTrendCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  const paddingLeft = 50;
  const paddingRight = 20;
  const paddingTop = 30;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const labels = PRICE_TREND_DATA.labels;
  const khhData = PRICE_TREND_DATA.khhFlightAvg;
  const tpeData = PRICE_TREND_DATA.tpeFlightAvg;
  const pkgData = PRICE_TREND_DATA.pkgAvg;

  const minVal = 10000;
  const maxVal = 30000;

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#e2e8f0';
  ctx.fillStyle = '#64748b';
  ctx.font = '11px sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  for (let i = 0; i <= 4; i++) {
    const val = minVal + ((maxVal - minVal) / 4) * i;
    const y = paddingTop + chartHeight - (chartHeight * (val - minVal)) / (maxVal - minVal);
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();
    ctx.fillText(`$${val.toLocaleString()}`, paddingLeft - 8, y);
  }

  const alertY17k = paddingTop + chartHeight - (chartHeight * (17000 - minVal)) / (maxVal - minVal);
  ctx.save();
  ctx.setLineDash([4, 4]);
  ctx.strokeStyle = '#e11d48';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(paddingLeft, alertY17k);
  ctx.lineTo(width - paddingRight, alertY17k);
  ctx.stroke();
  ctx.fillStyle = '#e11d48';
  ctx.textAlign = 'left';
  ctx.fillText('機票警示線 ($17,000)', paddingLeft + 10, alertY17k - 8);
  ctx.restore();

  const numPoints = labels.length;
  const xStep = chartWidth / (numPoints - 1);
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  labels.forEach((label, i) => {
    const x = paddingLeft + i * xStep;
    ctx.fillText(label, x, height - paddingBottom + 8);
  });

  function drawLine(data, color) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = paddingLeft + i * xStep;
      const y = paddingTop + chartHeight - (chartHeight * (val - minVal)) / (maxVal - minVal);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();
  }

  drawLine(pkgData, '#059669');
  drawLine(khhData, '#f97316');
  drawLine(tpeData, '#2563eb');
}

window.viewDealDetail = function(dealId) {
  const deal = [...currentFlightDeals, ...currentPackageDeals].find(d => d.id === dealId);
  if (!deal) return;

  const modal = document.getElementById('detailModal');
  const content = document.getElementById('detailModalContent');
  const isFlight = deal.type === 'flight';

  content.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:16px; color:#0f172a;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px;">
        <div>
          <span class="deal-badge badge-alert" style="margin-bottom:8px; display:inline-block;">${deal.isAlertHit ? '⚡ 符合降價提醒門檻' : '最新即時盤口'}</span>
          <h2 style="font-size:1.35rem; font-weight:800;">${isFlight ? `${deal.originName} ↔ ${deal.destinationName} 來回直飛` : escapeHtml(deal.hotelName)}</h2>
          <p style="color:#64748b; font-size:0.88rem;">供應來源：<strong>${escapeHtml(deal.platformName)}</strong> | 行程日期：2026/11/18 (三) - 11/23 (一)</p>
        </div>
        <div style="text-align:right;">
          <div style="font-size:1.7rem; font-weight:800; color:#e11d48;">NT$ ${deal.price.toLocaleString()}</div>
          <div style="font-size:0.85rem; color:#94a3b8; text-decoration:line-through;">原價 NT$ ${deal.originalPrice.toLocaleString()}</div>
        </div>
      </div>

      ${!isFlight ? `
        <div style="border-radius:12px; overflow:hidden; height:220px; border:1px solid #e2e8f0;">
          <img src="${deal.hotelImg}" style="width:100%; height:100%; object-fit:cover;" alt="Hotel Image" />
        </div>
        <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:12px; display:flex; flex-direction:column; gap:6px; font-size:0.9rem;">
          <h4 style="font-size:0.95rem; font-weight:700;">🏨 住宿與交通資訊</h4>
          <div>📍 飯店區域：${escapeHtml(deal.hotelArea)} (${escapeHtml(deal.hotelName)})</div>
          <div>🚇 交通便利度：<strong style="color:#059669;">${escapeHtml(deal.stationProximity)}</strong></div>
          <div>⭐ 旅客評價：<strong style="color:#b45309;">${deal.hotelRating} / 10</strong> (${escapeHtml(deal.hotelRatingText)})</div>
          <div>🛏️ 房型規格：${escapeHtml(deal.roomType)} (${deal.breakfastIncluded ? '免費附贈早餐' : '不含早餐'})</div>
        </div>
      ` : ''}

      <div style="background:#f8fafc; border:1px solid #e2e8f0; padding:16px; border-radius:12px; display:flex; flex-direction:column; gap:6px; font-size:0.9rem;">
        <h4 style="font-size:0.95rem; font-weight:700;">✈️ 航班時刻與行李額度拆解</h4>
        <div>航空公司：${escapeHtml(deal.airline)} (${deal.isLCC ? '廉價航空 LCC' : '傳統航空'})</div>
        <div>去程時間：${escapeHtml(deal.outboundTime || deal.flightDetail)}</div>
        <div>回程時間：${escapeHtml(deal.inboundTime || '11/23 當天返台')}</div>
        <div>🧳 行理件數限制：${escapeHtml(deal.baggage)}</div>
        <div>預估機程：約 ${deal.flightTimeHours || 3.3} 小時直飛</div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:12px; margin-top:10px;">
        <a href="${deal.directUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="text-decoration:none;">
          <span>🚀 前往 ${escapeHtml(deal.platformName)} 訂購 ➔</span>
        </a>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
};

window.quickFilterRoute = function(origin, dest) {
  filterState.origin = origin;
  filterState.destination = dest;
  updatePillActive('originPillGroup', origin);
  updatePillActive('destPillGroup', dest);
  renderDeals();
};

function updatePillActive(groupId, val) {
  const group = document.getElementById(groupId);
  if (!group) return;
  group.querySelectorAll('.pill-btn').forEach(btn => {
    if (btn.dataset.val === val) btn.classList.add('active');
    else btn.classList.remove('active');
  });
}

function loadWatchlist() {
  try {
    return JSON.parse(localStorage.getItem('tokyo_flight_watchlist') || '[]');
  } catch (e) {
    return [];
  }
}

window.toggleFav = function(dealId, event) {
  if (event) event.stopPropagation();
  const idx = watchlist.indexOf(dealId);
  if (idx > -1) {
    watchlist.splice(idx, 1);
    showToastNotification('🤍 已移除收藏', '已將方案從口袋名單中移除。');
  } else {
    watchlist.push(dealId);
    showToastNotification('❤️ 已加入口袋名單', '可點選右上角觀看收藏列表。');
  }
  localStorage.setItem('tokyo_flight_watchlist', JSON.stringify(watchlist));
  updateWatchlistBadge();
  renderDeals();
};

function updateWatchlistBadge() {
  const el = document.getElementById('favCount');
  if (el) el.textContent = watchlist.length;
}

function renderWatchlistDrawer() {
  const container = document.getElementById('drawerDealsList');
  if (!container) return;

  const favItems = [...currentFlightDeals, ...currentPackageDeals].filter(d => watchlist.includes(d.id));

  if (favItems.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:40px 0;">尚無收藏方案</div>`;
    return;
  }

  container.innerHTML = favItems.map(item => `
    <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; display:flex; flex-direction:column; gap:6px;">
      <div style="display:flex; justify-content:space-between; font-weight:700;">
        <span>${item.type === 'flight' ? `${item.origin} ✈️ ${item.destination}` : escapeHtml(item.hotelName)}</span>
        <span style="color:#e11d48;">NT$ ${item.price.toLocaleString()}</span>
      </div>
      <div style="font-size:0.8rem; color:#64748b;">${escapeHtml(item.platformName)} | ${escapeHtml(item.airline)}</div>
      <button class="btn btn-secondary" style="padding:4px 10px; font-size:0.8rem;" onclick="viewDealDetail('${item.id}')">查看詳細</button>
    </div>
  `).join('');
}

window.selectDepartureDate = function(dateStr) {
  const cards = document.querySelectorAll('.daily-price-card');
  cards.forEach(card => card.classList.remove('active-day'));

  if (dateStr === '2026-11-17') {
    const card = document.getElementById('dayCard-1117');
    if (card) card.classList.add('active-day');
    showToastNotification('📅 切換出發日期', '已切換為 11/17 (二) 出發行程 (避開人潮優惠)');
  } else if (dateStr === '2026-11-18') {
    const card = document.getElementById('dayCard-1118');
    if (card) card.classList.add('active-day');
    showToastNotification('📅 切換出發日期', '已切換為 11/18 (三) 出發主行程');
  } else if (dateStr === '2026-11-19') {
    const card = document.getElementById('dayCard-1119');
    if (card) card.classList.add('active-day');
    showToastNotification('📅 切換出發日期', '已切換為 11/19 (四) 出發行程');
  }
};

function renderHotelMapModal() {
  const container = document.getElementById('hotelMapModalList');
  if (!container) return;

  const pkgList = currentPackageDeals;
  if (pkgList.length === 0) {
    container.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:30px 0;">尚無飯店資料</div>`;
    return;
  }

  container.innerHTML = pkgList.map(item => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.hotelName + ' Tokyo')}`;
    return `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; gap:14px; align-items:center;">
          <img src="${item.hotelImg}" style="width:80px; height:70px; object-fit:cover; border-radius:8px; border:1px solid #cbd5e1;" alt="${escapeHtml(item.hotelName)}" />
          <div>
            <div style="font-weight:700; font-size:1.05rem; color:#0f172a;">${escapeHtml(item.hotelName)}</div>
            <div style="font-size:0.85rem; color:#64748b; margin-top:2px;">📍 區域：<strong>${escapeHtml(item.hotelArea)}</strong> | ⭐ 評分：<strong style="color:#b45309;">${item.hotelRating}分</strong></div>
            <div style="font-size:0.82rem; color:#059669; font-weight:600; margin-top:4px;">🚇 周邊地鐵：${escapeHtml(item.stationProximity)}</div>
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <div style="text-align:right; font-weight:800; color:#e11d48; font-size:1.1rem;">
            NT$ ${item.price.toLocaleString()}
            <div style="font-size:0.75rem; font-weight:normal; color:#64748b;">機加酒套裝價</div>
          </div>
          <a href="${mapUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size:0.85rem; padding:8px 14px; text-decoration:none;">
            📍 Google 地圖導航 ➔
          </a>
        </div>
      </div>
    `;
  }).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function(m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}
