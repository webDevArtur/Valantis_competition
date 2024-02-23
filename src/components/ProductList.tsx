import React, { useState, useEffect } from 'react';
import { getIds, getItems, filterProducts, getFields } from '../api/api.tsx';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    TextField,
    Select,
    MenuItem,
    CircularProgress,
    Container,
    Box,
    CardMedia
} from '@mui/material';
import Header from './Header';
import EmptyListMessage from './EmptyListMessage';
import { SelectChangeEvent } from '@mui/material/Select';
import { ChangeEvent } from 'react';


interface Product {
    id: string;
    product: string;
    price: number;
    brand: string;
}

interface Filters {
    price?: number;
    product?: string;
    brand?: string;
}


const ProductsList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [filterType, setFilterType] = useState('');
    const [filterValue, setFilterValue] = useState('');
    const [brands, setBrands] = useState<string[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const ids = await getIds((page - 1) * 50, 50);
                if (ids) {
                    try {
                        const items = await getItems(ids);
                        if (items) {
                            setProducts(items);
                            setLoading(false);
                        }
                    } catch (error) {
                        console.error('Error fetching items:', error);
                        setLoading(false);
                    }
                }
            } catch (error) {
                console.error('Error fetching items:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [page]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const brands = await getFields('brand', (page - 1) * 50, 50);
                if (brands) {
                    setBrands(brands.filter((brand: string | null) => brand !== null));
                }
            } catch (error) {
                console.error('Error fetching brands:', error);
            }
        };

        fetchBrands();
    }, [page]);


    const applyFilters = async () => {
        setLoading(true);
        const filters: Filters = {};
        if (filterType === 'price') {
            filters.price = parseFloat(filterValue);
        } else if (filterType === 'name') {
            filters.product = filterValue;
        } else if (filterType === 'brand') {
            filters.brand = filterValue;
        }

        try {
            const filteredIds = await filterProducts(filters);
            if (filteredIds) {
                const items = await getItems(filteredIds);
                if (items) {
                    setFilteredProducts(items);
                    setLoading(false);
                    return;
                }
            }
        } catch (error) {
            console.error('Error occurred:', error);
            setLoading(false);
        }
        setLoading(false);
    };


    const handleFilterTypeChange = (e: SelectChangeEvent<string>) => {
        setFilterType(e.target.value);
    };

    const handleFilterValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFilterValue(event.target.value);
    };



    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleApplyFilters = () => {
        applyFilters();
    };

    if (loading) {
        return (
            <Box position="fixed" top="50%" left="50%" >
                <CircularProgress/>
            </Box>)
    }

    const uniqueProducts = Array.from(new Map(products.map(product => [product.id, product])).values());

    return (
        <Container maxWidth="lg" sx={{ boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)', margin: '0 auto' }}>
            <Header/>
            <Box my={2} display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center" sx={{width: '100%'}}>
                    <Select value={filterType} onChange={handleFilterTypeChange} placeholder="Filter by" sx={{mr: 1, width: '30%'}}>
                        <MenuItem value="price">Цена</MenuItem>
                        <MenuItem value="name">Название</MenuItem>
                        <MenuItem value="brand">Бренд</MenuItem>
                    </Select>
                    {filterType === 'brand' && (
                        <Select
                            value={filterValue}
                            onChange={handleFilterValueChange}
                            placeholder="Выберите бренд"
                            sx={{mr: 1}}
                        >
                            {brands.map((brand, index) => (
                                <MenuItem key={index} value={brand}>{brand}</MenuItem>
                            ))}
                        </Select>
                    )}
                    {filterType && filterType !== 'brand' && (
                        <TextField
                            type={filterType === 'price' ? 'number' : 'text'}
                            value={filterValue}
                            onChange={handleFilterValueChange}
                            placeholder={`Фильтровать по ${filterType}`}
                            sx={{mr: 1, width: '30%'}}
                        />
                    )}
                    <Button
                        onClick={handleApplyFilters}
                        variant="contained"
                        disabled={!filterValue}
                        sx={{ mr: 1, width: '30%' }}
                    >
                        <b>Применить фильтр</b>
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={2}>
                {((filterValue === '' ? uniqueProducts : filteredProducts).length > 0) ? (
                    (filterValue === '' ? uniqueProducts : filteredProducts).map((product, index) => (
                        <Grid item key={`${product.id}-${index}`} xs={12} sm={6} md={4} lg={3}>
                            <Card sx={{
                                borderRadius: 12,
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image="/img.png"
                                    alt="Product Image"
                                    style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, objectFit: 'cover', objectPosition: 'center', width: '100%', height: '200px' }}
                                />
                                <CardContent>
                                    <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#555', fontWeight: 'bold', fontSize: '0.8rem' }}>
                                        <b>ID: </b>{product.id}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#555' }}><b>Name: </b>{product.product}</Typography>
                                    <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#555' }}><b>Price: </b>{product.price} ₽</Typography>
                                    {product.brand && <Typography variant="body2" sx={{ fontFamily: 'Roboto', color: '#555' }}><b>Brand: </b>{product.brand}</Typography>}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <EmptyListMessage />
                )}
            </Grid>



            <Box mt={3} display="flex" justifyContent="flex-end">
                <Box sx={{ display: 'flex',alignItems: 'center', width: '100%', justifyContent: 'center', mb: 2 }}>
                    <Button onClick={handlePrevPage} disabled={page === 1}><b>Предыдущая</b></Button>
                    <Button onClick={handleNextPage}><b>Следующая</b></Button>
                </Box>
            </Box>
        </Container>
    );
}

export default ProductsList;
