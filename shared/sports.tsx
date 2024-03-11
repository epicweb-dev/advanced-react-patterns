import { type SportData } from './types.ts'

export function SportDataView({ sport }: { sport: SportData }) {
	return (
		<div>
			<div className="sport-info__img-wrapper">
				<img src={sport.image} alt={sport.name} />
			</div>
			<section>
				<h2>{sport.name}</h2>
			</section>
			<section>
				<ul>
					{sport.tricks.map(trick => (
						<li key={trick.name}>
							<label>{trick.name}</label>:{' '}
							<span>
								{trick.points} <small>({trick.type})</small>
							</span>
						</li>
					))}
				</ul>
			</section>
		</div>
	)
}

export const allSports: Record<string, SportData> = {
	onewheel: {
		id: 'jfoJDiw8df.sdf',
		name: 'Floater',
		image: '/img/onewheel.png',
		color: '#e98080',
		tricks: [
			{
				name: 'Tail Grind',
				type: 'Grind',
				points: 45,
			},
			{
				name: 'Drop',
				type: 'Air',
				points: 60,
			},
			{
				name: 'Curb Hop',
				type: 'Street',
				points: 30,
			},
			{
				name: 'Space Tornado',
				type: 'Spin',
				points: 75,
			},
		],
	},
	ski: {
		id: 'osdiCjew.s8efsz',
		image: '/img/ski.png',
		name: 'Skier',
		color: '#f4f4ad',
		tricks: [
			{
				name: 'Air to Fakie',
				type: 'Air',
				points: 45,
			},
			{
				name: 'Kangaroo Flip',
				type: 'Flip',
				points: 60,
			},
			{
				name: 'Misty Flip',
				type: 'Flip',
				points: 70,
			},
			{
				name: 'Alley-Oop',
				type: 'Spin',
				points: 80,
			},
			{
				name: 'Cab 1440 Mute',
				type: 'Spin',
				points: 90,
			},
			{
				name: 'Box Slide',
				type: 'Grind',
				points: 30,
			},
		],
	},
	snowboard: {
		id: 'sdfj8sdfj.sdfj8sdfj',
		image: '/img/snowboard.png',
		name: 'Snowboard',
		color: '#a0afdd',
		tricks: [
			{
				name: 'Butter',
				type: 'Slide',
				points: 25,
			},
			{
				name: 'Tripod',
				type: 'Slide',
				points: 40,
			},
			{
				name: 'Melon Grab',
				type: 'Grab',
				points: 55,
			},
			{
				name: 'Backflip',
				type: 'Flip',
				points: 70,
			},
			{
				name: 'Tail Press',
				type: 'Grind',
				points: 65,
			},
		],
	},
	soccer: {
		id: 'rix38.sfjgihxl',
		image: '/img/soccer.png',
		name: 'Soccer',
		color: '#c0c5c1',
		tricks: [
			{
				name: 'Rabona',
				type: 'Pass',
				points: 25,
			},
			{
				name: 'Scissor',
				type: 'Dribble',
				points: 40,
			},
			{
				name: 'Rainbow',
				type: 'Dribble',
				points: 55,
			},
			{
				name: 'El Tornado',
				type: 'Shot',
				points: 70,
			},
		],
	},
}
