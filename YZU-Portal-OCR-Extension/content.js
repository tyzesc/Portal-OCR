let defaults = { sid: '', psw: '', autologin: false, timeout: 1000 };

chrome.storage.sync.get(defaults, settings => {
    document.getElementById('Txt_UserID').value = settings.sid;
    document.getElementById('Txt_Password').value = settings.psw;

    if (settings.autologin) {
        setTimeout(() => {
            document.querySelector('#ibnSubmit').click();
        }, settings.timeout);
    }
})