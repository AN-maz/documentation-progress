const Conversation = require('../models/ConversationModel.js');
const mongoose = require('mongoose');

exports.showHome = async (req, res) => {

    try {

        if (!res.locals.user) return res.redirect('/login');

        const currentUser = res.locals.user;

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
            conversations
        });

        console.log('Masuk ke Home');

    } catch (err) {
        console.error('Error di home: ', err);
        res.redirect('/login');
    }
}