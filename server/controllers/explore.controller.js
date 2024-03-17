const explorePopularRepos = async (req, res) => {
    try {
        const {language} = req.params;

        const middleware = {
            headers: {
                authorization: `token ${process.env.GITHUB_API_KEY}`
            }
        };

        try {
            // 60 request per hour, 5000 requests for authinticated users
            const response = await fetch(`https://api.github.com/search/repositories?q=language:${language}&sort=stars&order=desc&per_page=10`, middleware);
            const data = await response.json();

            res.status(200).json({ repos: data.items });
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    } catch (error) {

    }
}

export {
    explorePopularRepos
};