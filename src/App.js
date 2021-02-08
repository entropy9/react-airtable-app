import React from 'react'
import BooksCard from './components/BooksCard'
import Grid from '@material-ui/core/Grid'

class App extends React.Component {
	state = {
		booksData: []
	}

	componentDidMount() {
		fetch('https://api.airtable.com/v0/app38HX2SzhS41J5M/Table%201?api_key=keyTmoW0bFkGJdz6z')
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
                {booksData.map(book => (
                    <BooksCard {...book.fields} key={book.fields.id} />
                ))}
            </Grid>
        )
    }
}

export default App