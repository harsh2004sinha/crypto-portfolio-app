const myHeaders = new Headers();
myHeaders.append("authorization", "Apikey fa4846d104065967b4c4336250fba1cf285caad66308d515aba47c72464d169f");

const symbol = ["BTC ", "ETH ", "SOL ", "USDC ", "XRP ",
                "USDT ", "PEPE ", "BNB ", "FDUSD ", "DOGE ",
                "TRX ", "WIF ", "AAVE ", "SUI ", "RARE ",
                "FLOKI ", "SYS ", "FET ", "NOT "]

const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
};

const resData = async () => {
    let data = await fetch("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,SOL,USDC,XRP,USDT,PEPE,BNB,FDUSD,DOGE,TRX,WIF,AAVE,SUI,RARE,FLOKI,SYS,FET,NOT&tsyms=USD", requestOptions)
    let data2 = await data.text()

    let data1 = JSON.parse(data2)
    console.log(data1);

    return data1
}

export default resData