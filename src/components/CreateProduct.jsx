/***************************************************
 MODULES INITIALISATION FOR CREATE PRODUCT COMPONENT
 ***************************************************/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addProduct } from '../actions/index'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import API from '../api';

// Access store states via props
const mapStateToProps = (state) => {
    return {
        token: state.token,
        categories: state.categories,
    }
}

// Create Product COMPONENT
class CreateProduct extends Component {

    // Initialisation of state object
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            price: "",
            manufacturer: "",
            categoryId: "",
        }
    }

    // API call to save the product
    async handleClick() {
        try {
            // Set the new product
            const newProduct = { ...this.state };

            // API call for create product
            API.defaults.headers.common['Authorization'] = this.props.token;
            const response = await API.post(`product`, newProduct);
            if(!response.data.status) throw response.data.message;

            // Handle response and save product object in store
            this.props.addProduct(response.data.data);
            this.props.history.replace('/products')

        } catch (error) {
            // Handle error
        }
    }

    // Render DOM
    render() {
        return (
            <div className="create-note">
                <Form >
                    <FormGroup controlId="formControlsName">
                        <ControlLabel>Name : </ControlLabel>
                        <FormControl onChange={(event) => this.setState({name: event.target.value})} type="text"
                                     placeholder="Enter name"/>
                    </FormGroup>
                    <FormGroup controlId="formControlsPrice">
                        <ControlLabel>Price : </ControlLabel>
                        <FormControl onChange={(event) => this.setState({price: event.target.value})} type="number"
                                     placeholder="Enter price"/>
                    </FormGroup>
                    <FormGroup controlId="formControlsManufacturer">
                        <ControlLabel>Manufacturer : </ControlLabel>
                        <FormControl onChange={(event) => this.setState({manufacturer: event.target.value})} type="text"
                                     placeholder="Enter Manufacturer"/>
                    </FormGroup>
                    <FormGroup controlId="formControlsSelect">
                        <ControlLabel>Category : </ControlLabel>
                        <FormControl componentClass="select" placeholder="select" onChange={(event)=> this.setState({categoryId: event.target.value})}>
                            <option value="Select Category">Select Category</option>
                            { this.props.categories.map((element, key) => {
                                return <option key={key} value={element.id}>{element.name}</option>;
                            }) }
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="formControlsDescription">
                        <ControlLabel>Description : </ControlLabel>
                        <FormControl onChange={(event) => this.setState({description: event.target.value})}
                                     componentClass="textarea" placeholder="Enter Description"/>
                    </FormGroup>

                    <Button className="pull-right" bsStyle="primary" onClick={this.handleClick.bind(this)}>Save</Button>
                </Form>
            </div>
        )
    }

}

export default connect(mapStateToProps, { addProduct })(CreateProduct);