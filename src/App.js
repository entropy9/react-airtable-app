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


  function handleChange(e) {
	console.log(e.target.value);
	global.foo = e.target.value;
 alert(global.foo);
}

const openInNewTab = (url) => {
	const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
	if (newWindow) newWindow.opener = null
  }

class App extends React.Component {
	state = {
		filter: "",
		booksData: []
	}

	componentDidMount(myurl) {
		if(!myurl){
		myurl ="https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22 %22%2C+title)&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z"
		}
		else{

		}
		fetch(myurl)
			.then(res => res.json())
			.then(res => {
				console.log(res.records)
				this.setState({ booksData: res.records })
			})
			.catch(error => console.log(error))
	}
	
	handleChange = e => {
		console.log(e.target.value);
	global.foo1 = e.target.value.toLowerCase();
	 this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22"+global.foo1+"%22%2C+LOWER(title))&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z")

		
	  };

	searchAuthor = e => {
		console.log(e.target.value);
	global.foo1 = e.target.value.toLowerCase();
	 this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22"+global.foo1+"%22%2C+LOWER(author))&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z")

		
	  };

	
  render() {

	
	
    const {filter, booksData} = this.state;
	const lowercasedFilter = filter.toLowerCase();

	const filteredData = booksData.filter(item => {
		return Object.keys(item).some(key =>
		  item[key].toLowerCase().includes(lowercasedFilter)
		);
	  });

        return (
            <Grid container direction='row' spacing={2}>
				
			<AppBar style = {{ background: '#eee' }} position="fixed">
			<Toolbar>
				
		    <Button href='https://airtable.com/invite/l?inviteId=invbTZrBaH9gs4Fvt&inviteToken=007610430b2ec5acfb4f4676204684766f18877568a8028435e77f0edd90eb07' variant="contained" color="secondary" >Airtable</Button>
			<Button size="small" style = {{ textTransform: 'none', color: '#eee', background: '#333', margin: '22px' }} onClick={() => {this.componentDidMount('https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?sort%5B0%5D%5Bfield%5D=author&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z');}} variant="contained">Sort by Author</Button> 
			<Button size="small" style = {{ textTransform: 'none', color: '#eee', background: '#333' }} onClick={() => {this.componentDidMount('https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z');}} variant="contained">Sort by Title</Button> 
			<Button size="small" style = {{ textTransform: 'none', color: '#eee', background: '#333', margin: '22px' }} onClick={() => {this.componentDidMount('https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?sort%5B0%5D%5Bfield%5D=published&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z');}} variant="contained">Sort by Date</Button>       

				<Typography variant="h4">
				              
				</Typography>

				
			</Toolbar>
			<Toolbar style = {{ background: '#333' }}>
				<input placeholder="Search Titles..." name="firstName" onChange={this.handleChange} />
				<input style = {{ margin: '22px' }}  placeholder="Search Authors..." name="firstName" onChange={this.searchAuthor} />
			</Toolbar>
			</AppBar>

                {filteredData.map(book => (
                    <BooksCard {...book.fields} key={book.fields.id} />
                ))}
            </Grid>
        )
    }
}

export default App