import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import './styles.css'
import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown'

export const JustContainer = (props) => {
    const {children} = props;
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" className='root-container'>
                <Box >
                    <Paper elevation={3} className='paper-container'>
                        {children}
                    </Paper>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default function SimpleContainer(props) {
    const { title, description, items } = props.page;
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" className='root-container'>
                <Box >
                    <Paper elevation={3} className='paper-container'>
                        <h1>{title}</h1>
                        <Typography
                            variant="h6"
                        >
                            <ReactMarkdown parserOptions={{ commonmark: true }} >{description}</ReactMarkdown>
                        </Typography>
                        {items?.length > 0 && (
                            <div className='items-container'>
                                {items.map((item) => (
                                    <Accordion key={item.title} expanded={expanded === item} onChange={handleChange(item)} className="accordion-item">
                                        <AccordionSummary
                                            className="title-row"
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography >
                                                {item.title}
                                            </Typography>
                                            {/* <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>  */}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <ReactMarkdown parserOptions={{ commonmark: true }} >{item.content}</ReactMarkdown>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}

                            </div>
                        )}

                    </Paper>
                </Box>
            </Container>
        </React.Fragment>
    );
}