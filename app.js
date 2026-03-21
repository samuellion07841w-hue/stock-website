function show(id){

document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

let currentSymbol="BTCUSDT"

function loadChart(symbol){

currentSymbol=symbol

document.getElementById("tradingview_chart").innerHTML=""

new TradingView.widget({

width:"100%",
height:450,
symbol:"BINANCE:"+symbol,
interval:"30",
theme:"dark",
style:"1",
container_id:"tradingview_chart"

})

}

async function loadMarket(){

let url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=50&page=1"

let r=await fetch(url)

let data=await r.json()

window.coinData=data

let table=document.getElementById("marketTable")

table.innerHTML="<tr><th>Coin</th><th>Price</th><th>24h</th></tr>"

data.forEach(c=>{

let color=c.price_change_percentage_24h>=0?"green":"red"

table.innerHTML+=

"<tr>"+

"<td class='coin' onclick="openCoin('"+c.symbol.toUpperCase()+"USDT')"><img src='"+c.image+"'>"+c.name+"</td>"+

"<td>$"+c.current_price+"</td>"+

"<td class='"+color+"'>"+c.price_change_percentage_24h.toFixed(2)+"%</td>"+

"</tr>"

})

loadHeatmap(data)

}

function openCoin(symbol){

show("chart")

loadChart(symbol)

}

function loadHeatmap(data){

let heat=document.getElementById("heatmapCoins")

heat.innerHTML=""

data.slice(0,40).forEach(c=>{

let color=c.price_change_percentage_24h>=0?"#0f5132":"#842029"

heat.innerHTML+=

"<div class='heatcoin' style='background:"+color+"' onclick="openCoin('"+c.symbol.toUpperCase()+"USDT')">"+

c.symbol.toUpperCase()+"<br>"+

c.price_change_percentage_24h.toFixed(2)+"%"+

"</div>"

})

}

async function loadTrending(){

let url="https://api.coingecko.com/api/v3/search/trending"

let r=await fetch(url)

let data=await r.json()

let market=document.getElementById("marketTable")

data.coins.forEach(c=>{

market.innerHTML+=

"<tr>"+

"<td class='coin' onclick="openCoin('"+c.item.symbol.toUpperCase()+"USDT')">🔥 "+c.item.name+"</td>"+

"<td colspan='2'>Trending</td>"+

"</tr>"

})

}

function searchCoins(){

let input=document.getElementById("search").value.toLowerCase()

let rows=document.querySelectorAll("#marketTable tr")

rows.forEach((row,i)=>{

if(i===0) return

let coin=row.innerText.toLowerCase()

row.style.display=coin.includes(input)?"":"none"

})

}

async function loadNews(){

let url="https://min-api.cryptocompare.com/data/v2/news/?lang=EN"

let r=await fetch(url)

let data=await r.json()

let feed=document.getElementById("newsFeed")

data.Data.slice(0,6).forEach(n=>{

feed.innerHTML+=

"<div class='news'><b>"+n.title+"</b><br>"+

"<a href='"+n.url+"' target='_blank'>Read more</a></div>"

})

}

loadChart("BTCUSDT")

loadMarket()

loadTrending()

loadNews()
