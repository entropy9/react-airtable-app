import React from 'react'
import BooksCard from './components/BooksCard'
import Grid from '@material-ui/core/Grid'

import Flippy, {FrontSide, BackSide} from 'react-flippy'
import SideA from './components/SideA'
import SideB from './components/SideB'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
	  flexGrow: 1,
	},
	menuButton: {
	  marginRight: theme.spacing(2),
	},
	title: {
	  flexGrow: 1,
	},
  }));



const openInNewTab = (url) => {
	const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
	if (newWindow) newWindow.opener = null
  }

class App extends React.Component {
	state = {
		booksData: []
	}

	componentDidMount() {
		fetch('https://api.airtable.com/v0/app38HX2SzhS41J5M/tblgHoGdUOdB7m96S?sort%5B0%5D%5Bfield%5D=author&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z')
			.then(res => res.json())
			.then(res => {
				console.log(res.records)
				this.setState({ booksData: res.records })
			})
			.catch(error => console.log(error))
	}
	
  render() {
	
    const {booksData} = this.state
        return (
            <Grid container direction='row' spacing={2}>
				
			<AppBar position="fixed">
			<Toolbar>
				
		    <Button href='https://airtable.com/tblgHoGdUOdB7m96S/viwoFNL5QMm9GUNDK?blocks=hide' variant="contained" color="secondary" >Airtable</Button>
			<Button href='https://autodesk.com'variant="contained">Autodesk</Button>       

				<Typography variant="h4">
				              
				</Typography>


				
			</Toolbar>

			</AppBar>

                {booksData.map(book => (
                    <BooksCard {...book.fields} key={book.fields.id} />
                ))}
            </Grid>
        )
    }
}

export default App