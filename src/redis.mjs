import { createClient } from 'redis'

const client = createClient({
    url: 'redis://redis.comame.dev'
})

let connected = false

const keyPrefix = 'shortlink-'

async function connect() {
    if (!connected) {
        await client.connect()
        connected = true
    }
}

/**
 * @type { (...args: Parameters<typeof client.set>) => ReturnType<typeof client.set> }
 */
export const set = async (...args) => {
    await connect()
    return client.set(keyPrefix + args[0], ...args.slice(1))
}

/**
 * @type { (...args: Parameters<typeof client.get>) => ReturnType<typeof client.get> }
 */
export const get = async (...args) => {
    await connect()
    return client.get(keyPrefix + args[0], ...args.slice(1))
}

/**
 * @type { (...args: Parameters<typeof client.keys>) => ReturnType<typeof client.keys> }
 */
export const keys = async (...args) => {
    await connect()
    return client.keys(keyPrefix + args[0], ...args.slice(1))
}
