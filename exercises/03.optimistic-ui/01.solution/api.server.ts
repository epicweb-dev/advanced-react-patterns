const products = [
	{
		id: 'cab0ec017c454',
		name: 'Onewheel',
		description: 'Cruise on the pavement',
		image: '/img/onewheel.png',
		unitPrice: 250000,
	},
	{
		id: '0985ae92acb06',
		name: 'Skis',
		description: 'Ride two sticks down a snowy mountain',
		image: '/img/ski.png',
		unitPrice: 150000,
	},
	{
		id: '82b6ee83079b1',
		name: 'Snowboard',
		description: 'Look cooler than a skier.',
		image: '/img/snowboard.png',
		unitPrice: 200000,
	},
	{
		id: '78f567e78cc49',
		name: 'Soccer Ball',
		description: `It's actually called football`,
		image: '/img/soccer.png',
		unitPrice: 5000,
	},
] as const

export type Product = (typeof products)[number]

export type CartItem = {
	id: string
	productId: string
	quantity: number
	unitPrice: number
	name: string
	image: string
}

const cart: Array<CartItem> = []

const MIN_DELAY = 1200
const MAX_DELAY = MIN_DELAY + 500

async function sleep(time: number) {
	await new Promise(resolve => setTimeout(resolve, time - Date.now()))
}

export async function loader({ request }: { request: Request }) {
	await sleep(Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY)

	const url = new URL(request.url)
	const subpath = url.pathname.split('/api/')[1] ?? ''
	switch (subpath) {
		case 'cart': {
			return { cart }
		}
		case 'products': {
			return { products }
		}
		default: {
			return new Response('Not found', { status: 404 })
		}
	}
}

export async function action({ request }: { request: Request }) {
	await sleep(Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY)

	const url = new URL(request.url)
	const subpath = url.pathname.split('/api/')[1] ?? ''
	switch (subpath) {
		case 'add-to-cart': {
			const formData = await safeReadFormData(request)
			const productId = formData.get('productId')
			const quantity = Number(formData.get('quantity') || 1)
			const product = products.find(p => p.id === productId)
			if (!product || !quantity) {
				return new Response('Invalid request', { status: 400 })
			}

			const existingItem = cart.find(item => item.productId === product.id)
			if (existingItem) {
				existingItem.quantity = existingItem.quantity + quantity
			} else {
				cart.push({
					id: Math.random().toString(16).slice(2),
					productId: product.id,
					quantity,
					unitPrice: product.unitPrice,
					name: product.name,
					image: product.image,
				})
			}
			return { cart }
		}
		case 'remove-from-cart': {
			const formData = await safeReadFormData(request)
			const productId = formData.get('productId')
			const quantity = Number(formData.get('quantity') || 1)
			if (!productId || typeof productId !== 'string' || !quantity) {
				return new Response('Invalid request', { status: 400 })
			}
			const item = cart.find(item => item.productId === productId)
			if (!item) {
				return new Response('Invalid request (item not found)', { status: 400 })
			}
			const newQuantity = item.quantity - quantity
			if (newQuantity <= 0) {
				const index = cart.findIndex(item => item.productId === productId)
				if (index !== -1) {
					cart.splice(index, 1)
				}
			} else {
				item.quantity = newQuantity
			}
			return { cart }
		}
		default: {
			return new Response('Not found', { status: 404 })
		}
	}
}

async function safeReadFormData(request: Request) {
	return (await request.formData().catch(() => {})) ?? new FormData()
}
