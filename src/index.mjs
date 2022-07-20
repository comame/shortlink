import express from 'express'
import { resolve } from 'node:path'
import { randomString } from './randomString.mjs'
import { set, get } from './redis.mjs'

const __dirname = new URL(import.meta.url).pathname

const app = express()

app.use(express.json())
app.use(express.static(resolve(__dirname, '../')))

app.post('/api/create', async (req, res) => {
    let name = req.body.name
    let url = req.body.url

    if (typeof name !== 'string') {
        name = randomString(8)
    }
    name = name.replace(/\s/g, '')
    if (!name) {
        name = randomString(8)
    }

    if (typeof url !== 'string') {
        res.sendStatus(400)
        return
    }

    if (!(url.startsWith('http:') || url.startsWith('https:'))) {
        url = 'https://' + url
    }

    const result = await set(name, url, { EX: 60 * 24, NX: true })
    console.log(name, url)

    if (result === null) {
        res.json({
            link: null,
            error: 'already exists'
        })
        return
    }

    res.json({
        link: 'https://s.comame.xyz/' + name
    })
})

app.get('/:name', async (req, res) => {
    const name = req.params.name
    const url = await get(name)

    if (url) {
        res.redirect(url)
    } else {
        res.sendStatus(404)
    }
})

app.all('*', (_req, res) => {
    res.sendStatus(404)
})

app.listen(8080, () => {
    console.log('start')
})
