import React, { useCallback, useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Link, Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import GitHubIcon from '@mui/icons-material/GitHub';
import ReplayIcon from '@mui/icons-material/Replay';
import AddIcon from '@mui/icons-material/Add';

import { createIssueCommentApi, getIssueCommentsApi, updateIssueCommentApi } from '../../api/github.api';
import { useParams } from 'react-router-dom';
import { CommentModal } from './CommentModal';

export const IssuesComments = (props) => {
    const { issueNumber } = useParams();
    const [comments, setComments] = useState([]);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [selected, setSelected] = useState();    

    const reloadIssueComments = () => {
        getIssueCommentsApi(issueNumber).then(json => setComments(json));
    }

    console.log(props);
    useEffect(() => {
        reloadIssueComments();
    }, [])

    const handleAddComment = useCallback((comment) => {
        console.log(comment);
        createIssueCommentApi(issueNumber, comment).then(json => {
            reloadIssueComments();
            setAddModalOpen(false);
        });
    })

    const handleEditComment = useCallback((comment) => {
        console.log(comment);
        updateIssueCommentApi(selected.id, comment).then(json => {
            reloadIssueComments();
            setAddModalOpen(false);
        });
    })

    const addComment = () => {
        setSelected(null);
        setAddModalOpen(true)
    }

    const editComment = (comment) => {
        setSelected(comment);
        setAddModalOpen(true)
    }

    return (
        <>
            <CommentModal
                title="Введите текст комментария"
                onAddComment={selected ? handleEditComment: handleAddComment}
                open={addModalOpen}                
                comment={selected?.body}
                onClose={() => setAddModalOpen(false)} />            
            <IconButton onClick={() => reloadIssueComments()} ><ReplayIcon/></IconButton>
            <IconButton onClick={() => addComment()} ><AddIcon/></IconButton>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Дата и время создания</TableCell>
                            <TableCell>Название</TableCell>
                            <TableCell>Пользователь</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {comments?.length > 0 && comments.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>{row.created_at}</TableCell>
                                <TableCell>{row.body}</TableCell>
                                <TableCell><Link href={row.user.html_url}>{row.user.login}</Link></TableCell>
                                <TableCell>
                                    <IconButton onClick={() => editComment(row)}><EditIcon /></IconButton>
                                    <IconButton href={row.html_url}><GitHubIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
