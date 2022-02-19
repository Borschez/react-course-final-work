import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Link, Paper } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

import { getIssueCommentsApi } from '../../api/github.api';

export const IssuesComments = (props) => {
    const [comments, setComments] = useState([]);
    const { issueNumber } = props;
    useEffect(() => {
        getIssueCommentsApi(issueNumber).then(json => setComments(json));
    }, [])

    return (<TableContainer component={Paper}>
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
                        <TableCell><IconButton href={row.html_url}><GitHubIcon /></IconButton></TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>)
}
