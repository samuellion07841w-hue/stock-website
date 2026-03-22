// 1. CHART SETUP
const chartContainer = document.getElementById('tv-chart');
const chart = LightweightCharts.createChart(chartContainer, {
    layout: { background: { color: '#162436' }, textColor: '#d1d4dc' },
    grid: { vertLines: { color: '#1e2e42' }, horzLines: { color: '#1e2e42' } },
    width: chartContainer.offsetWidth,
    height: 400,
});
const lineSeries = chart.addLineSeries({ color: '#32a88f', lineWidth: 3 });

// Dummy Chart Data (updates visually on load)
lineSeries.setData([
    { time: '2026-03-18', value: 64200 },
    { time: '2026-03-19', value: 67100 },
    { time: '2026-03-20', value: 65800 },
    { time: '2026-03-21', value: 68432 },
    { time: '2026-03-22', value: 69120 },
]);

// 2. LIVE DATA FETCHING
async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false');
        const data = await response.json();
        const tableBody = document.getElementById('market-data');
        tableBody.innerHTML = ''; 

        data.forEach(coin => {
            const priceChange = coin.price_change_percentage_24h;
            const colorClass = priceChange >= 0 ? 'style="color:#00ff88"' : 'style="color:#ff4d4d"';
            
            const row = `
                <tr>
                    <td><strong>${coin.name}</strong> <span style="opacity:0.5">${coin.symbol.toUpperCase()}</span></td>
                    <td>$${coin.current_price.toLocaleString()}</td>
                    <td ${colorClass}>${priceChange.toFixed(2)}%</td>
                    <td><a href="https://www.binance.com/en/activity/referral" target="_blank" class="buy-btn">TRADE NOW</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("API Error:", error);
    }
}

// Update every 60 seconds
fetchCryptoData();
setInterval(fetchCryptoData, 60000);

// Fix chart size on window resize
window.addEventListener('resize', () => {
    chart.applyOptions({ width: chartContainer.offsetWidth });
});
