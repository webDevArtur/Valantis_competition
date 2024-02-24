import { Typography, Box, Grid } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';

const EmptyListMessage = () => (
    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 2 }} >
        <Grid item xs={12}>
            <Box textAlign="center">
                <InfoOutlined fontSize="large" color="primary" sx={{ marginBottom: '16px' }} />
                <Typography variant="h5" color="textSecondary">Список пуст</Typography>
            </Box>
        </Grid>
    </Grid>
);

export default EmptyListMessage;
