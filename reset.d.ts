import '@total-typescript/ts-reset'
import '@total-typescript/ts-reset/dom'

import 'react'

declare module 'react' {
	interface CSSProperties {
		[key: `--${string}`]: string | number
	}
}
