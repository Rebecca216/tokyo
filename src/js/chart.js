/**
 * 動態價格歷史走勢圖表與預測繪製模組 (Canvas HTML5 Price Chart)
 */

export function renderPriceTrendChart(canvasId, trendData) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;

  // 動態自適應 Canvas 尺寸
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;

  // 清空畫布
  ctx.clearRect(0, 0, width, height);

  const paddingLeft = 60;
  const paddingRight = 30;
  const paddingTop = 40;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const labels = trendData.labels;
  const khhData = trendData.khhFlightAvg;
  const tpeData = trendData.tpeFlightAvg;
  const pkgData = trendData.pkgAvg;

  // 計算縱軸極值
  const allValues = [...khhData, ...tpeData, ...pkgData];
  const minVal = 10000;
  const maxVal = Math.ceil(Math.max(...allValues) / 5000) * 5000;

  // 繪製背景格線與 Y 軸標籤
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#e2e8f0';
  ctx.fillStyle = '#64748b';
  ctx.font = '12px "Plus Jakarta Sans", sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';

  const steps = 5;
  for (let i = 0; i <= steps; i++) {
    const val = minVal + ((maxVal - minVal) / steps) * i;
    const y = paddingTop + chartHeight - (chartHeight * (val - minVal)) / (maxVal - minVal);

    // 格線
    ctx.beginPath();
    ctx.moveTo(paddingLeft, y);
    ctx.lineTo(width - paddingRight, y);
    ctx.stroke();

    // 標籤 (NT$ Format)
    ctx.fillText(`$${val.toLocaleString()}`, paddingLeft - 10, y);
  }

  // 繪製 $17,000 警示參考虛線 (機票警戒線)
  const alertY17k = paddingTop + chartHeight - (chartHeight * (17000 - minVal)) / (maxVal - minVal);
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(paddingLeft, alertY17k);
  ctx.lineTo(width - paddingRight, alertY17k);
  ctx.stroke();
  ctx.fillStyle = '#ef4444';
  ctx.textAlign = 'left';
  ctx.fillText('機票降價警示門檻 ($17,000)', paddingLeft + 10, alertY17k - 10);
  ctx.restore();

  // 繪製 X 軸時間標籤
  const numPoints = labels.length;
  const xStep = chartWidth / (numPoints - 1);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#64748b';

  labels.forEach((label, i) => {
    const x = paddingLeft + i * xStep;
    ctx.fillText(label, x, height - paddingBottom + 10);
  });

  // 繪製折線通用函式
  function drawLineSeries(dataPoints, color, labelName, isDashed = false) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    if (isDashed) ctx.setLineDash([4, 4]);

    ctx.beginPath();
    dataPoints.forEach((val, i) => {
      const x = paddingLeft + i * xStep;
      const y = paddingTop + chartHeight - (chartHeight * (val - minVal)) / (maxVal - minVal);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // 畫數據點圓圈
    dataPoints.forEach((val, i) => {
      const x = paddingLeft + i * xStep;
      const y = paddingTop + chartHeight - (chartHeight * (val - minVal)) / (maxVal - minVal);

      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.stroke();
    });

    ctx.restore();
  }

  // 畫三條趨勢線
  drawLineSeries(pkgData, '#10b981', '機加酒均價');
  drawLineSeries(khhData, '#f97316', '高雄出發機票');
  drawLineSeries(tpeData, '#3b82f6', '桃園出發機票');
}
