document.querySelector('#imgRCode').parentElement.innerHTML = "正在自動辨識"
var image = new MarvinImage();
image.load('https://portalx.yzu.edu.tw/PortalSocialVB/SelRandomImage.aspx', function() {
    imageOut = new MarvinImage(image.getWidth(), image.getHeight());
    Marvin.thresholding(image, imageOut, 115);
    Marvin.gaussianBlur(imageOut, imageOut, 3.0);
    Marvin.thresholding(imageOut, imageOut, 150);

    var tesseract = Tesseract;
    (async() => {
        const worker = tesseract.createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize(imageOut.toBlob());
        document.getElementById('Txt_VeriCode').value = text;
    })();
});