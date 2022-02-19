import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Input } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const CommentModal = (props) => {
    console.log(props.comment);
    
    const { title, open, onClose, onAddComment } = props;
    const [comment, setComment] = React.useState(props.comment);

    return (
        <div>
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Input value={comment} onChange={(e) => setComment(e.target.value)} />
                    <div style={{marginTop: '15px'}}>
                        <Button onClick={() => {onAddComment(comment); setComment('')}} variant="contained">ОК</Button>
                        <Button onClick={onClose}>Отмена</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}