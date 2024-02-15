import '@total-typescript/ts-reset'
import '@total-typescript/ts-reset/dom'

// eslint-disable-next-line react/no-typos
import 'react'

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number
	}

	function use<T>(context: React.Context<T> | Promise<T>): T
}
