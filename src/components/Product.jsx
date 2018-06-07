/*********************************
 PRODUCT MODULES INITIALISATION
 **********************************/
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { productsList } from '../actions/index'
import { Button, Glyphicon } from 'react-bootstrap';
import API from '../api';

// Access store states via props
const mapStateToProps = function(state){
    return {
        token: state.token,
        products: state.products,
        categories: state.categories,
    }
}

// Product Component
class Product extends Component {

    // Lifecycle method called before rendering an component
    async componentDidMount() {
        try {
            // API call to get the dashboard counts
            API.defaults.headers.common['Authorization'] = this.props.token;
            const products = await API.get(`products`, {});
            if(!products.data.status) throw products.data.message;

            this.props.productsList(products.data.data);

        } catch (error) {
            // To catch an error
        }
    }

    // Rendering component
    render() {
        return (
            <div className="product">
                <div className="clearfix">
                    <Button className="custom-create-button pull-right" type="submit">
                        <Glyphicon className="custom-plus-glyphicon" glyph="glyphicon glyphicon-plus"/>
                        <Link to="/createProduct">Create Product</Link>
                    </Button>
                </div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Manufacturer</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        (this.props.products) ? (
                            this.props.products.map((product, key) => {
                                return  <tr key={key}>
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.manufacturer}</td>
                                </tr>
                            })
                        ) : "No more products"
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default connect(mapStateToProps, { productsList })(Product);