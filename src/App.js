import React from 'react'
import BooksCard from './components/BooksCard'
import Grid from '@material-ui/core/Grid'

import Flippy, {FrontSide, BackSide} from 'react-flippy'
import SideA from './components/SideA'
import SideB from './components/SideB'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
		myurl ="https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22 %22%2C+title)&sort%5B0%5D%5Bfield%5D=published&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z"
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
		var regex = /^[A-Za-z0-9 ]+$/
		if (regex.test(e.target.value)) {
			global.foo1 = e.target.value.toLowerCase();
			// this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22"+global.foo1+"%22%2C+LOWER(title))&sort%5B0%5D%5Bfield%5D="+document.getElementById("sortBy").value+"&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z");
			this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=OR(SEARCH(%22"+global.foo1+"%22%2C+LOWER(title)),SEARCH(%22"+global.foo1+"%22%2C+LOWER(author)))&sort%5B0%5D%5Bfield%5D=published&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z");
			return true;
		}
		else
		{
			alert('Please use Alphanumeric characters only');
			document.getElementById("tsearch").value = "";
			this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22 %22%2C+title)&sort%5B0%5D%5Bfield%5D="+document.getElementById("sortBy").value+"&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z");
			return false;
		}
	

		
	  };

	searchAuthor = e => {
		console.log(e.target.value);
		var regex1 = /^[A-Za-z0-9 ]+$/
		if (regex1.test(e.target.value)) {
			global.foo2 = e.target.value.toLowerCase();
			this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22"+global.foo2+"%22%2C+LOWER(author))&sort%5B0%5D%5Bfield%5D="+document.getElementById("sortBy").value+"&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z")
		   return true;
		}
		else
		{
			alert('Please use Alphanumeric characters only');
			document.getElementById("asearch").value = "";
			this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22 %22%2C+title)&sort%5B0%5D%5Bfield%5D="+document.getElementById("sortBy").value+"&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z");
			return false;
		}
		
	  };

	  sortRecords = e => {
		console.log(e.target.value);
			global.foo3 = e.target.value;
			this.componentDidMount("https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?filterByFormula=SEARCH(%22 %22%2C+LOWER(author))&sort%5B0%5D%5Bfield%5D="+global.foo3+"&sort%5B0%5D%5Bdirection%5D=asc&api_key=keyTmoW0bFkGJdz6z")
		   return true;
		
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
            <Grid container direction='row' spacing={2} >
				
			<AppBar style = {{ background: '#eee' }} position="fixed">
			<Toolbar>
			<img src="https://img.icons8.com/color/452/tesseract.png" title="React Airtable Interface" style = {{ margin: '5px' }} width="60px"/>	
		    <Button href='https://airtable.com/invite/l?inviteId=invbTZrBaH9gs4Fvt&inviteToken=007610430b2ec5acfb4f4676204684766f18877568a8028435e77f0edd90eb07' variant="contained" color="secondary" >Airtable</Button>
			
				<Typography variant="h7" style = {{ color: '#333', margin: '15px' }}>
				        Sort:       
				</Typography>
				<select id="sortBy" style = {{ background: '#333', padding: '8px', color: '#fff'}} onChange={this.sortRecords}>
				<option value="title">Title</option>
				<option value="author">Author</option>
				<option selected value="published">Published Date</option>
			</select>

				
			</Toolbar>
			<Toolbar style = {{ background: '#333' }}>
				<input name="tsearch" id="tsearch" style = {{ margin: '22px' }} placeholder="Search Titles OR Authors..." name="firstName" onChange={this.handleChange} />
				<input name="asearch" id="asearch" style = {{ }} placeholder="Search Authors..." name="firstName" onChange={this.searchAuthor} />
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