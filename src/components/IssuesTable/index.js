import React, { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IconButton, Link, Paper } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import GitHubIcon from '@mui/icons-material/GitHub';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Link as RouterLink } from 'react-router-dom';
import { loadIssuesAction } from '../../store/issues/actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIssuesApi } from '../../api/github.api';
import { getIssues } from '../../store/issues/reducer';

export const IssuesTable = (props) => {
    const { issues } = props;

    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Статус обращения</TableCell>
                    <TableCell>Дата и время создания</TableCell>
                    <TableCell>Number</TableCell>
                    <TableCell>Название</TableCell>
                    <TableCell>Пользователь</TableCell>
                    <TableCell>Действия</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {issues?.length > 0 && issues.map((row) => (
                    <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {row.state}
                        </TableCell>
                        <TableCell>{row.created_at}</TableCell>
                        <TableCell>{row.number}</TableCell>
                        <TableCell>{row.body}</TableCell>
                        <TableCell><Link href={row.user.html_url}>{row.user.login}</Link></TableCell>
                        <TableCell><RouterLink to={`/issue/${row.number}/comments`}><IconButton><ChatIcon /></IconButton></RouterLink><IconButton href={row.html_url}><GitHubIcon /></IconButton></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)
}

const IssueTableContainer = (props) => {
    const { loadIssues, issues } = props;
    useEffect(() => {
        getIssuesApi("all").then(json => loadIssues(json));
    }, [])
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" className='root-container'>
                <Box >
                    <Paper elevation={3} className='paper-container'>
                        <IssuesTable issues={issues} {...props} />
                    </Paper>
                </Box>
            </Container>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    issues: getIssues(state)
})

const mapDispatchToProps = (dispatch) => ({
    loadIssues: bindActionCreators(loadIssuesAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(IssueTableContainer);