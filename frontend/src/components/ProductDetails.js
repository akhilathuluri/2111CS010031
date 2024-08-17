import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, CardContent, Typography } from '@mui/material';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        const { data } = await axios.get(`http://localhost:5000/products/${id}`);
        setProduct(data);
    };

    if (!product) return <div>Loading...</div>;

    return (
        <Container>
            <Card>
                <CardContent>
                    <Typography variant="h4">{product.productName}</Typography>
                    <Typography>Company: {product.company}</Typography>
                    <Typography>Price: ${product.price}</Typography>
                    <Typography>Rating: {product.rating}</Typography>
                    <Typography>Discount: {product.discount}%</Typography>
                    <Typography>Availability: {product.availability}</Typography>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ProductDetails;
