# [Node.js] Portal 驗證碼辨識 Tesseract + GraphicsMagick

## 環境設定

- Ubuntu 16.04
- Node.js 14
- GraphicsMagick 1.3.23
- tesseract 3.04.01

```bash
apt update
apt install -y curl 
curl https://deb.nodesource.com/setup_14.x | bash -
apt install -y graphicsmagick tesseract-ocr nodejs
npm install gm tesseractocr request
```

## 圖片前處理

![](https://i.imgur.com/1JPHVGI.png)

這裡用到套件 GraphicsMagick，看到文字被灰色線條分割，並且有明顯外框。

```javascript
const gm = require('gm')
let image = fs.createReadStream('random.png')
gm(image)
    .threshold(20, true) // 先套一層 20% 的閾值
    .write('gm.png')
```
![](https://i.imgur.com/rWitamK.png)

圖上還有微微的噪點，此時辨識率大約有80%左右。若再套上一層模糊後再取閾值，就可以強化線條去除噪點。

```javascript
gm(image)
    .threshold(20, true)
    .blur(2, 200)
    .threshold(70, true)
    .write('gm.png')
```

![](https://i.imgur.com/0vGRUf0.png)

## OCR 文字辨識

```javascript
const tesseractocr = require('tesseractocr')
tesseractocr.recognize(img)
    .then(console.log)

// output: 3186
```