let defaults = { sid: '', psw: '', showpic: false, autologin: false };

chrome.storage.sync.get(defaults, settings => {
    document.getElementById('Txt_UserID').value = settings.sid;
    document.getElementById('Txt_Password').value = settings.psw;

    let image = new MarvinImage();
    let img_url = document.querySelector('#VeriCodePage').src;
    image.load(img_url, function() {
        if (settings.showpic) {
            let canvas = document.createElement('canvas');
            canvas.setAttribute('width', 112);
            canvas.setAttribute('height', 45);
            let elem = document.querySelector('#imgRCode').parentElement;
            elem.innerHTML = '';
            elem.appendChild(canvas);
            this.draw(canvas);
        } else {
            document.querySelector('#imgRCode').parentElement.innerHTML = "正在自動辨識";
        }

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

            if (settings.autologin)
                document.querySelector('#ibnSubmit').click();
        })();
    });
})