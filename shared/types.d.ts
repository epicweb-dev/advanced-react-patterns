type SportData = {
	id: string
	name: string
	image: string
	color: string
	tricks: Array<{
		name: string
		type: string
		points: number
	}>
}

type User = { name: string; image: string }

export { SportData, User }
