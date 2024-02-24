import { AppBar, Toolbar, Typography } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <DiamondIcon sx={{ mr: 1 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <b>ValantisJewelry</b>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
