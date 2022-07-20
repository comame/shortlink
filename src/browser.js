const nameEl = document.getElementById('name')
const urlEl = document.getElementById('url')
const registerEl = document.getElementById('register')
const resultEl = document.getElementById('result')
const qrcodeEl = document.getElementById('qrcode')

let qrcode = null

registerEl.addEventListener('click', async (e) => {
    e.preventDefault()

    const name = nameEl.value
    const url = urlEl.value

    const res = await fetch('/api/create', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            url
        })
    }).then(res => res.json())

    if (res.error) {
        alert(res.error)
        return
    }

    resultEl.value = res.link

    if (qrcode) {
        qrcode.clear()
        qrcode.makeCode(res.link)
    } else {
        qrcode = new QRCode(qrcodeEl, {
            text: res.link,
            width: 64,
            height: 64
        })
    }
})
