// Saves options to chrome.storage
function save_options() {
    let sid = document.getElementById('sid').value
    let psw = document.getElementById('psw').value
    let auto = document.getElementById('auto').checked
    let timeout = document.getElementById('timeout').value


    chrome.storage.sync.set({
        sid: sid,
        psw: psw,
        autologin: auto,
        timeout: timeout
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status')
        status.textContent = '儲存成功'
        setTimeout(function() {
            status.textContent = ''
        }, 750)
    })
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        sid: '',
        psw: '',
        autologin: false,
        timeout: 1000
    }, function(items) {
        document.getElementById('sid').value = items.sid
        document.getElementById('psw').value = items.psw
        document.getElementById('auto').checked = items.autologin
        document.getElementById('timeout').value = items.timeout
    })
}
document.addEventListener('DOMContentLoaded', restore_options)
document.getElementById('save').addEventListener('click', save_options)