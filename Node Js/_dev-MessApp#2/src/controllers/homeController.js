const Conversation = require('../models/ConversationModel.js');
const Post = require('../models/PostModel.js');
const mongoose = require('mongoose');

exports.showHome = async (req, res) => {

    try {

        if (!res.locals.user) return res.redirect('/login');

        const currentUser = res.locals.user;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .populate('user')
            .populate({
                path: 'comments',
                options: { sort: { createdAt: 'asc' } },
                populate: [
                    { path: 'user', select: 'username profilePicture' },
                    { path: 'replyingTo', select: 'username' }
                ]
            });

        posts.forEach(post => {
            const commentMap = {};
            const nestedComments = [];

            post.comments.forEach(comment => {
                commentMap[comment._id] = comment;
                comment.replies = [];
            });

            post.comments.forEach(comment => {
                if (comment.parentComment) {
                    if (commentMap[comment.parentComment]) {
                        commentMap[comment.parentComment].replies.push(comment);
                    }
                } else {
                    nestedComments.push(comment);
                }
            });
            post.comments = nestedComments;
        });

        const conversations = await Conversation.aggregate([
            {
                $match: { participants: new mongoose.Types.ObjectId(currentUser._id) }
            },
            {
                $lookup: {
                    from: 'messages',
                    let: { convId: '$_id' },
                    pipeline: [
                        { $match: { $expr: { $eq: ['$conversationId', '$$convId'] } } },
                        { $sort: { createdAt: -1 } },
                        { $limit: 1 }
                    ],
                    as: 'lastMessage'
                }
            },
            {
                $unwind: {
                    path: '$lastMessage',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'participants',
                    foreignField: '_id',
                    as: 'participantsInfo'
                }
            },
            {
                $addFields: {
                    participants: '$participantsInfo'
                }
            },
            {
                $sort: { updatedAt: -1 }
            },
            {
                $project: {
                    participantsInfo: 0
                }
            }
        ]);

        res.render('home', {
            title: 'Home',
            user: res.locals.user,
            posts,
            conversations
        });

        console.log('Masuk ke Home');

    } catch (err) {
        console.error('Error di home: ', err);
        res.redirect('/login');
    }
}