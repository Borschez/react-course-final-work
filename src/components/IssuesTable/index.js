import React, { useCallback, useEffect, useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button, IconButton, Link, Paper } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChatIcon from '@mui/icons-material/Chat';
import ReplyIcon from '@mui/icons-material/Reply';
import GitHubIcon from '@mui/icons-material/GitHub';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
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
import { createIssueApi, createIssueCommentApi, getIssuesApi, updateIssueStateApi } from '../../api/github.api';
import { getIssues } from '../../store/issues/reducer';
import { CommentModal } from '../IssueComments/CommentModal';

export const IssuesTable = (props) => {
    const { issues, onCloseIssue, onReplyClose } = props;
    const [showDetail, setShowDetail] = useState(null);

    return (<TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell></TableCell>
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
                    <>
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <IconButton
                                    aria-label="expand row"
                                    size="small"
                                    onClick={() => showDetail === row ? setShowDetail(null) : setShowDetail(row)}
                                >
                                    {showDetail === row ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.state}
                            </TableCell>
                            <TableCell>{row.created_at}</TableCell>
                            <TableCell>{row.number}</TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell><Link href={row.user.html_url}>{row.user.login}</Link></TableCell>
                            <TableCell>
                                <RouterLink to={`/issue/${row.number}/comments`}><IconButton><ChatIcon /></IconButton></RouterLink>
                                <IconButton href={row.html_url}><GitHubIcon /></IconButton>
                                <IconButton onClick={() => onCloseIssue(row)}><CloseIcon /></IconButton>
                                <IconButton onClick={() => onReplyClose(row)}><ReplyIcon /></IconButton>
                            </TableCell>
                        </TableRow>
                        {showDetail === row && (
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>{row.body}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        )}
                    </>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)
}

const IssueTableContainer = (props) => {
    const { loadIssues, issues } = props;
    const [modalOpen, setModalOpen] = useState(false);
    const [replyModalOpen, setReplyModalOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const reloadIssues = () => {
        getIssuesApi("all").then(json => loadIssues(json));
    }
    useEffect(() => {
        reloadIssues();
    }, [])

    const handleAddIssue = useCallback((issue) => {
        console.log(issue);
        createIssueApi(issue).then(json => {
            reloadIssues();
            setModalOpen(false);
        })
    })

    const handleCloseIssue = useCallback((issue) => {
        console.log(issue);
        updateIssueStateApi(issue.number, "closed").then(json => {
            reloadIssues();
        })
    })

    const handleReplyCloseIssue = useCallback((comment) => {
        createIssueCommentApi(selected.number, comment).then(json => {
            updateIssueStateApi(selected.number, "closed").then(json => {
                reloadIssues();
                setReplyModalOpen(false);
            });
        });
    })

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl" className='root-container'>
                <Box >
                    <Paper elevation={3} className='paper-container'>
                        <IconButton onClick={() => reloadIssues()} ><ReplayIcon /></IconButton>
                        <IconButton onClick={() => setModalOpen(true)} ><AddIcon /></IconButton>
                        <CommentModal
                            open={modalOpen}
                            title="Введите текст обращения"
                            onAddComment={handleAddIssue}
                            onClose={() => setModalOpen(false)}
                        />
                        <CommentModal
                            open={replyModalOpen}
                            title="Введите текст комментария перед закрытием"
                            onAddComment={handleReplyCloseIssue}
                            onClose={() => setReplyModalOpen(false)}
                        />
                        <IssuesTable
                            issues={issues}
                            onCloseIssue={handleCloseIssue}
                            onReplyClose={(issue) => {
                                setSelected(issue);
                                setReplyModalOpen(true);
                            }}
                            {...props}
                        />
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