function show(id){

document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

async function loadMarket(){

let url="https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=20&page=1"

let r=await fetch(url)

let data=await r.json()

let table=document.getElementById("marketTable")

table.innerHTML="<tr><th>Coin</th><th>Price</th><th>24h</th></tr>"

data.forEach(c=>{

let color=c.price_change_percentage_24h>=0?"green":"red"

table.innerHTML+=

"<tr>"+

"<td class='coin'><img src='"+c.image+"'>"+c.name+"</td>"+

"<td>$"+c.current_price+"</td>"+

"<td class='"+color+"'>"+c.price_change_percentage_24h.toFixed(2)+"%</td>"+

"</tr>"

})

loadHeatmap(data)

}

function loadHeatmap(data){

let heat=document.getElementById("heatmapCoins")

heat.innerHTML=""

data.forEach(c=>{

let color=c.price_change_percentage_24h>=0?"#0f5132":"#842029"

heat.innerHTML+=

"<div class='heatcoin' style='background:"+color+"'>"+

c.symbol.toUpperCase()+"<br>"+

c.price_change_percentage_24h.toFixed(2)+"%"+

"</div>"

})

}

new TradingView.widget({

width:"100%",
height:450,
symbol:"BINANCE:BTCUSDT",
interval:"30",
theme:"dark",
style:"1",
container_id:"tradingview_chart"

})

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

loadMarket()

loadNews()
