const gm = require('gm')
const request = require('request')
const tesseractocr = require('tesseractocr')

async function getJar() {
    let jar = request.jar()
    await request("https://portalx.yzu.edu.tw/PortalSocialVB/Login.aspx", { jar: jar })
    return jar
}

async function getImage(jar) {
    return await request("https://portalx.yzu.edu.tw/PortalSocialVB/SelRandomImage.aspx", { jar: jar })
}

async function guess(image, whitelist = "") {
    let img = gm(image)
        .threshold(20, true)
        .blur(2, 200)
        .threshold(70, true)
        .stream()

    return (await tesseractocr.recognize(img, {
        config: `tessedit_char_whitelist=${whitelist}`
    })).split("").filter(w => whitelist.includes(w)).join("")
}

async function main() {
    let jar = await getJar()
    let img = await getImage(jar)
    let ans = await guess(img, "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM")
    console.log(ans)
}

main()