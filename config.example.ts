class Config {
  private static _instance: Config;
  SUBJECT: string = "Current rate BTC to UAH";
  SENDER_EMAIL: string = "***@gmail.com";

  API_KEY: string = "Your_API_Key"

  PORT: string = "8080"

  PROVIDERS = new Map<string, string>([
  ["Binance", "https://api.binance.com/api/v3/ticker/price?symbol=BTCUAH"],
  ["Coinbase", "https://api.coinbase.com/v2/prices/BTC-UAH/buy"],
  ["Coingecko", "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=uah"]
]);

public static getInstance(): Config {
if (!Config._instance) {
Config._instance = new Config();
}
return Config._instance
}
}

export default Config.getInstance();