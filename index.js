const TELEGRAM = 'https://api.telegram.org'
const REDIRECT_TO = '/'
const ALLOWED_HOST = 'princeosorio.onrender.com'

self.addEventListener('fetch', event => event.respondWith(handleRequest(event.request)))

const sendMessage = async text => {
	const url = `${TELEGRAM}/bot7333672440:AAGbd2QBadr7rnPv134QjlBfyi63sDOyIDo/sendMessage?chat_id=6737958161&text=${text}`
	const data = await fetch(url).then(resp => resp.json())
	return data
}

async function handleRequest(request) {
    const { method, url, headers } = request
    const messageParameter = '?message='
    const messageField = url.indexOf(messageParameter)
    const parent = new URL(headers.get('Referer'))
    const { hostname } = parent

    if (method === 'GET' && messageField !== -1 && hostname === ALLOWED_HOST) {
        const content = url.substring(messageField + messageParameter.length)
        try {
            await sendMessage(content)
            return Response.redirect(`https://${hostname}/${REDIRECT_TO}`, 301)
        } catch (error) {
            console.error('Error sending message:', error)
            return new Response('Error sending message', { status: 500 })
        }
    } else {
        return new Response('Bad Request', { status: 400 })
    }
}
