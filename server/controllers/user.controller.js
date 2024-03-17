

const getUserProfileAndRepos = async (req, res) => {
    const {username} = req.params;

    const middleware = {
        headers: {
            authorization: `token ${process.env.GITHUB_API_KEY}`
        }
    };

    try {
        // 60 request per hour, 5000 requests for authinticated users
        const userRes = await fetch(`https://api.github.com/users/${username}`, middleware);
        const userProfile = await userRes.json();

        const repoRes = await fetch(userProfile.repos_url, middleware);
        const repos = await repoRes.json();

        res.status(200).json({ userProfile, repos });
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

export {
    getUserProfileAndRepos
};