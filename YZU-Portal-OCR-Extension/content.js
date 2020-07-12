let defaults = { sid: '', psw: '', showpic: false, autologin: false };

chrome.storage.sync.get(defaults, settings => {
    document.getElementById('Txt_UserID').value = settings.sid;
    document.getElementById('Txt_Password').value = settings.psw;

    let image = new MarvinImage();
    let img_url = document.querySelector('#VeriCodePage').src;
    image.load(img_url, function() {
        let banner = document.querySelector("#imgRCode").parentNode.parentNode.parentNode.rows[4];
        if (settings.showpic) {
            let canvas = document.createElement('canvas');
            banner.innerHTML = "<td colspan='5'><h3 style='background: #1FA2FF;background: -webkit-linear-gradient(to right, #A6FFCB, #12D8FA, #1FA2FF);background: linear-gradient(to right, #A6FFCB, #12D8FA, #1FA2FF);'>正在自動辨識</h3></td>";
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

            banner.innerHTML = "";

            if (settings.autologin)
                document.querySelector('#ibnSubmit').click();
        })();
    });
})
