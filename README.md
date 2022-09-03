
# GSES2-BTC-application

 API to track the exchange rate of BTC to the UAH and send it to subscribers.
 For sending emails was used free version of [SendinBlue](https://www.sendinblue.com/). 
 



## Authors

- [@IrynaPetrova0](https://github.com/IrynaPetrova0)


## Installation


```bash
  npm install  
```

## WARNING
 If SendinBlue api key expires, you need to generate a new one on the site.
    
## API Reference

port: 8080

#### GET request for rate BTC/UAH

```
  GET /api/rate
```

#### POST request to add new subscription

```
  POST /api/subscribe
```

| KEY       | VALUE           | 
| :-------- | :-------        |
| `email`   | `test@mail.com` | 

#### POST request to send emails to subscribed email addresses

```
  POST /api/sendEmails
```






