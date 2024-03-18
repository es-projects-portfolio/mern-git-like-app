import User from '../models/user.model.js';

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
};

const likeProfile = async (req, res) => {
	try {
		const { username } = req.params;
		const user = await User.findById(req.user._id.toString());
		console.log(user, "auth user");
		const userToLike = await User.findOne({ username });

		if (!userToLike) {
			return res.status(404).json({ error: "User is not a member" });
		}

		if (user.likedProfiles.includes(userToLike.username)) {
			return res.status(400).json({ error: "User already liked" });
		}

		userToLike.likedBy.push({
            username: user.username,
            avatarUrl: user.avatarUrl,
            likedDate: Date.now()
        });
		user.likedProfiles.push(userToLike.username);

		// await userToLike.save();
		// await user.save();
		await Promise.all([userToLike.save(), user.save()]);

		res.status(200).json({ message: "User liked" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

const getLikes = async () => {
    try {
        const user = await User.findById(req.user_id.toString());
        res.status(200).json({ likedBy: user.likedBy });
    } catch (error) {

    }
}

export {
    getUserProfileAndRepos,
    likeProfile,
    getLikes
};