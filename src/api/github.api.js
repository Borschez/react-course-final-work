const AuthSecret = "Qm9yc2NoZXo6Z2hwX2hmSHFhMVFudjVMWFVYYUtOR1JlTjdxR0xzOUlwMzJLYjNOWQ=="

const authHeaders = {
    "Content-Type": "application/json",
    "Authorization": `Basic ${AuthSecret}`
}

export const createIssueApi = (body) =>
    fetch(`https://api.github.com/repos/Borschez/practice-9-1/issues`, {
        method: "POST",
        cache: "no-store",
        headers: authHeaders,
        body: JSON.stringify({
            "owner": 'Borschez',
            "repo": 'practice-9-1',
            "title": body,
            "body": body
        })
    }).then((response) => response.json());

export const updateIssueStateApi = (issueNumber, state) =>
    fetch(`https://api.github.com/repos/Borschez/practice-9-1/issues/${issueNumber}`, {
        method: "PATCH",
        cache: "no-store",
        headers: authHeaders,
        body: JSON.stringify({
            "owner": 'Borschez',
            "repo": 'practice-9-1',
            "issue_number": issueNumber,
            "state": state
        })
    }).then((response) => response.json());

export const createIssueCommentApi = (issueNumber, body) =>
    fetch(`https://api.github.com/repos/Borschez/practice-9-1/issues/${issueNumber}/comments`, {
        method: "POST",
        cache: "no-store",
        headers: authHeaders,
        body: JSON.stringify({
            "owner": 'Borschez',
            "repo": 'practice-9-1',
            "issue_number": issueNumber,
            "body": body
        })
    }).then((response) => response.json());

export const updateIssueCommentApi = (commentId, body) =>
    fetch(`https://api.github.com/repos/Borschez/practice-9-1/issues/comments/${commentId}`, {
        method: "PATCH",
        cache: "no-store",
        headers: authHeaders,
        body: JSON.stringify({
            "owner": 'Borschez',
            "repo": 'practice-9-1',
            "body": body
        })
    }).then((response) => response.json());


export const getIssueCommentsApi = (issueNumber) =>
    fetch(`https://api.github.com/repos/Borschez/practice-9-1/issues/${issueNumber}/comments`, {
        cache: "no-store",
        headers: authHeaders,

    })
        .then(response => response.json())



export const getIssuesApi = (state) =>
    fetch(`https://api.github.com/repos/Borschez/practice-9-1/issues?state=${state}`, {
        cache: "no-store",
        headers: authHeaders,
    })
        .then(response => response.json())        
