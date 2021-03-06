import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import Flippy, {FrontSide, BackSide} from 'react-flippy'
import SideA from './SideA'
import SideB from './SideB'


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';


const booksData = [
	{
		title: 'Pietr the Latvian',
		author: 'Georges Simenon',
		published: '1931',
		description:
			'Who is Pietr the Latvian? Is he a gentleman thief? A Russian drinking absinthe in a grimy bar? A married Norwegian sea captain? A twisted corpse in a train bathroom? Or is he all of these men? Inspector Maigret, tracking a mysterious adversary and a trail of bodies, must bide his time before the answer comes into focus.',
		coverImage:
			'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1386339994l/19234594.jpg'
	},
	{
		title: 'A Moveable Feast',
		author: 'Ernst Hemingway',
		published: '1964',
		description:
			'Begun in the autumn of 1957 and published posthumously in 1964, Ernest Hemingways A Moveable Feast captures what it meant to be young and poor and writing in Paris during the 1920s.A correspondent for the Toronto Star, Hemingway arrived in Paris in 1921, three years after the trauma of the Great War and at the beginning of the transformation of Europe cultural landscape: Braque and Picasso were experimenting with cubist form; James Joyce, long living in self-imposed exile from his native Dublin, had just completed Ulysses; Gertrude Stein held court at 27 Rue de Fleurus, and deemed young Ernest a member of une gneration perdue; and T.S. Eliot was a bank clerk in London. It was during these years that the as-of-yet unpublished young writer gathered the material for his first novel The Sun Also Rises, and the subsequent masterpieces that followed.',
		coverImage:
			'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1531210888l/4631.jpg'
	}
]


const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		margin: 20
	},
	gutterTopAndBottom: {
		margin: 20
	},
	card: {
		maxWidth: 345
	},
	media: {
		height: 340
	},
	mediaL: {
		height: 340
	}
}))

function BooksCard({ title, author, published, description, coverImage, mediaurl, compImage }) {
	const classes = useStyles()
	return (


		<div className={classes.root}>
			<Grid item xs={10}>
			<Flippy flipOnHover={false} flipOnClick={true} flipDirection="horizontal" style={{ width: '340px'}}>
    			<FrontSide>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<CardMedia className={classes.media} image={coverImage} title={title} />
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{title}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								Author: {author}
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardContent>
						<Typography paragraph variant='body2'>
							{description.length > 150 ? description.slice(0, 150) + `...` : description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button href={mediaurl} target="_blank" rel="noreferrer" size='small' variant='outlined' color='secondary'>
							{published}
						</Button>
					</CardActions>
				</Card>
				</FrontSide>
				<BackSide>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<CardMedia className={classes.mediaL} image={compImage} title={title} />
						<CardContent>
							<Typography gutterBottom variant='h5' component='h2'>
								{author}
							</Typography>
							<Typography variant='body2' color='textSecondary' component='p'>
								Team Name: {title} 
							</Typography>
						</CardContent>
					</CardActionArea>
					<CardContent>
						<Typography paragraph variant='body2'>
							{description.length > 150 ? description.slice(0, 150) + `...` : description}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size='small' variant='contained' color='secondary'>
							{title}
						</Button>
					</CardActions>
				</Card>
				</BackSide>
				</Flippy>
			</Grid>
		</div>
	)
}

export default BooksCard