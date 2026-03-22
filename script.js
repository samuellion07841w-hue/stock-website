// 1. Initialize the Chart
const chartContainer = document.getElementById('tv-chart');
const chart = LightweightCharts.createChart(chartContainer, {
    layout: { background: { color: '#162436' }, textColor: '#d1d4dc' },
    grid: { vertLines: { color: '#24354a' }, horzLines: { color: '#24354a' } },
    width: chartContainer.offsetWidth,
    height: 400,
});
const lineSeries = chart.addLineSeries({ color: '#32a88f', lineWidth: 2 });

// 2. Fetch Market Data from CoinGecko
async function updateMarketData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        const tableBody = document.getElementById('market-data');
        tableBody.innerHTML = ''; // Clear old data

        data.forEach(coin => {
            const changeClass = coin.price_change_percentage_24h >= 0 ? 'positive' : 'negative';
            const row = `
                <tr>
                    <td><strong>${coin.name}</strong> (${coin.symbol.toUpperCase()})</td>
                    <td>$${coin.current_price.toLocaleString()}</td>
                    <td class="${changeClass}">${coin.price_change_percentage_24h.toFixed(2)}%</td>
                    <td><a href="https://www.binance.com/en/activity/referral" target="_blank" class="buy-btn">TRADE</a></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// 3. Simple Chart Data (Simulation for Demo)
const data = [
    { time: '2026-03-18', value: 65000 },
    { time: '2026-03-19', value: 67000 },
    { time: '2026-03-20', value: 66000 },
    { time: '2026-03-21', value: 68432 },
];
lineSeries.setData(data);

// Run on load
updateMarketData();
setInterval(updateMarketData, 60000); // Update every minute
