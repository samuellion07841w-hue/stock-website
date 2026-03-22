// 1. CHART INITIALIZATION
const chartContainer = document.getElementById('tv-chart');
const chart = LightweightCharts.createChart(chartContainer, {
    layout: { background: { color: '#162436' }, textColor: '#d1d4dc' },
    grid: { vertLines: { color: '#24354a' }, horzLines: { color: '#24354a' } },
    width: chartContainer.offsetWidth,
    height: 400,
});
const lineSeries = chart.addLineSeries({ color: '#32a88f', lineWidth: 3 });

// Dummy Data for visual start
lineSeries.setData([
    { time: '2026-03-20', value: 65000 },
    { time: '2026-03-21', value: 68500 },
    { time: '2026-03-22', value: 69200 },
]);

// 2. LIVE ASSET DATA (CoinGecko API)
async function fetchMarketData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1&sparkline=false');
        const data = await response.json();
        const tableBody = document.getElementById('market-data');
        tableBody.innerHTML = ''; 

        data.forEach(coin => {
            const row = `
                <tr>
                    <td><strong>${coin.name}</strong> (${coin.symbol.toUpperCase()})</td>
                    <td>$${coin.current_price.toLocaleString()}</td>
                    <td style="color:${coin.price_change_percentage_24h >= 0 ? '#00ff88' : '#ff4d4d'}">
                        ${coin.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td><a href="https://www.binance.com/en/activity/referral" target="_blank" class="buy-btn">TRADE</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (e) {
        console.log("Error loading assets:", e);
    }
}

fetchMarketData();
setInterval(fetchMarketData, 60000); // Refresh every minute

// Handle window resizing for chart
window.onresize = () => {
    chart.applyOptions({ width: chartContainer.offsetWidth });
};
