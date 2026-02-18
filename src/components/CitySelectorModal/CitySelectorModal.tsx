import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Button } from '@mui/material';
import CitySearch from './CitySearch';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};


const CitySelectorModal: React.FC<{ open: boolean; handleClose: () => void, onSelectCity: (city: any) => void }> = ({ open, handleClose, onSelectCity  }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        
        {/* X gomb */}
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h6" textAlign={'center'} color='#7CB9E8'>
          Város kiválasztása
        </Typography>

        <CitySearch onSelectCity={onSelectCity} />

        <Button
          variant="text"
          sx={{ mt: 3, justifyContent: 'center', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          onClick={handleClose}
        >
          Kiválaszt
        </Button>

      </Box>
    </Modal>
  );
}; export default CitySelectorModal
