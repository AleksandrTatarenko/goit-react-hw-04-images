import PropTypes from 'prop-types';
import { useState} from "react";
import { Header, Form, Button, Input, Span } from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        if (searchQuery === '') {
            alert('Заполните строку поиска');
            return;
        }
        onSubmit(searchQuery);
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    return (<Header>
         <Form onSubmit={handleSubmit}>
           <Button type="submit">
             <Span>Search</Span>
           </Button>
             <Input
            onChange={handleChange}
            value={searchQuery}        
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
        </Header>)
}
// export class Searchbar extends Component {
//     state = {
//         searchQuery: ''
//     }
//     handleSubmit = (e) => {
//         e.preventDefault()
//         if (this.state.searchQuery === '') { 
//             alert('Заполните строку поиска');
//             return;
//         }
//         this.props.onSubmit(this.state.searchQuery);
//     }
//     handleChange = (e) => {
//         this.setState({ searchQuery: [e.target.value.toLowerCase()] });
//     }
//     render() {
//         return <Header>
//         <Form onSubmit={this.handleSubmit}>
//           <Button type="submit">
//             <Span>Search</Span>
//           </Button>

//             <Input
//             onChange={this.handleChange}
//             value={this.state.searchQuery}        
//             type="text"
//             autocomplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//           />
//         </Form>
//         </Header>
//     }
// }

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}