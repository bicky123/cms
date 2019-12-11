const {User} = require('../Models/user');

module.exports = {
    index: (req,res) => {
        res.render('admin/index',{
            title: 'Admin'
        });
    },

    profile_Get: async (req,res) => {

        let userProfileDetail = await User.GetUserProfileByUserId(req.user);

        res.render('admin/profile',{
            title: 'Profile',
            Profile : userProfileDetail
        });
    }
}