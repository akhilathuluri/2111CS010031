import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        category: 'Laptop',
        n: 10,
        sort: 'price',
        order: 'asc',
        minPrice: 0,
        maxPrice: 100000,
    });

    useEffect(() => {
        fetchProducts();
    }, [filters, page]);

    const fetchProducts = async () => {
        const { data } = await axios.get(`http://localhost:5000/categories/${filters.category}/products`, {
            params: {
                n: filters.n,
                sort: filters.sort,
                order: filters.order,
                page: page,
                minPrice: filters.minPrice,
                maxPrice: filters.maxPrice,
            },
        });
        setProducts(data);
    };

    return (
        <Container>
            <Grid container spacing={3}>
                {products.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{product.productName}</Typography>
                                <Typography>Company: {product.company}</Typography>
                                <Typography>Price: ${product.price}</Typography>
                                <Typography>Rating: {product.rating}</Typography>
                                <Typography>Discount: {product.discount}%</Typography>
                                <Typography>Availability: {product.availability}</Typography>
                                <Button variant="contained" color="primary" href={`/products/${product.id}`}>
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Button onClick={() => setPage(page + 1)}>Next Page</Button>
        </Container>
    );
};

export default ProductList;
