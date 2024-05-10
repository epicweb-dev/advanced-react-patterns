import { Suspense, use, useOptimistic, useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary'
import { type CartItem, type Product } from './api.server.ts'

type ProductsResponse = Promise<{ products: Array<Product> }>
type CartResponse = Promise<{ cart: Array<CartItem> }>

const initialProductsPromise = fetch('api/products').then(
	r => r.json() as ProductsResponse,
)
const initialCartPromise = fetch('api/cart').then(r => r.json() as CartResponse)

function ProductsListing() {
	const { products } = use(initialProductsPromise)
	const [cartPromise, setCartPromise] = useState(initialCartPromise)
	const { cart: actualCart } = use(cartPromise)
	const [cart, addOptimisticCartItem] = useOptimistic<
		Array<CartItem>,
		CartItem
	>(actualCart, (items, newItem) => {
		const optimisticCartItems: Array<CartItem> = []
		for (const actualItem of items) {
			const optimisticCartItem = optimisticCartItems.find(
				item => item.productId === actualItem.productId,
			)
			optimisticCartItems.push({})
		}
		const existingItem = items.find(
			item => item.productId === newItem.productId,
		)
		if (existingItem) {
			existingItem.quantity = existingItem.quantity + newItem.quantity
		} else {
			items.push(newItem)
		}
		return items
	})
	let cartTotal = 0
	for (const item of cart) {
		cartTotal += item.quantity * item.unitPrice
	}
	return (
		<div>
			<h1>We is Sports</h1>
			<div>
				<h2>Cart</h2>
				<ul className="cart-list">
					{cart.map(cartItem => {
						return (
							<li key={cartItem.id}>
								<img src={cartItem.image} alt={cartItem.name} />
								<span>
									{cartItem.quantity} x {cartItem.name} = $
									{((cartItem.quantity * cartItem.unitPrice) / 100).toFixed(2)}
								</span>
								<form
									action={async formData => {
										const newCartPromise = fetch('api/remove-from-cart', {
											method: 'POST',
											body: formData,
										}).then(r => r.json() as CartResponse)
										setCartPromise(newCartPromise)
									}}
								>
									<input
										type="hidden"
										name="productId"
										value={cartItem.productId}
									/>
									<button type="submit">Remove from cart</button>
								</form>
							</li>
						)
					})}
				</ul>
				Total: ${(cartTotal / 100).toFixed(2)}
			</div>
			<h2>Products</h2>
			<ul className="product-list">
				{products.map(product => (
					<li key={product.id}>
						<img src={product.image} alt={product.name} />
						<span>
							{product.name} - ${(product.unitPrice / 100).toFixed(2)}
							<form
								action={async formData => {
									const newCartPromise = fetch('api/add-to-cart', {
										method: 'POST',
										body: formData,
									}).then(r => r.json() as CartResponse)
									setCartPromise(newCartPromise)
								}}
							>
								<input type="hidden" name="productId" value={product.id} />
								<button type="submit">Add to cart</button>
							</form>
						</span>
					</li>
				))}
			</ul>
		</div>
	)
}

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<div role="alert">
			There was an error:{' '}
			<pre style={{ color: 'red', whiteSpace: 'normal' }}>{error.message}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

function App() {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<Suspense fallback="loading...">
				<ProductsListing />
			</Suspense>
		</ErrorBoundary>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
