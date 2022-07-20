const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

/**
 * @param {number} length
 * @returns {string}
 */
export function randomString(length) {
    let str = ''
    for (let i = 0; i < length; i += 1) {
        const rand = Math.trunc(Math.random() * chars.length)
        str += chars[rand]
    }
    return str
}
