var moment = require("moment");
var appUsers = require("./users") ;
function Comment (cmt,user,dtm,label){
    this.cmt = cmt;
    this.user = user;
    this.dtm = dtm;
    this.label = label;
    if(moment().diff(dtm, 'hours') < 24) {
        this.formattedDtm = moment(dtm).fromNow();
    } else if(moment().diff(dtm, 'years') < 1) {
        this.formattedDtm = moment(dtm).format("Do MMM");
    }else{
        this.formattedDtm = moment(dtm).format("DD MMM YYYY");
    }

};
var userStore =  {

    userMgmt : {
        totalUsers: 0,
        userNames: [],

        getUserNames: function () {
            return this.userNames;
        },
        getUserCount: function () {
            return this.totalUsers;
        },
        addNewUser: function (username) {
            if (this.userNames.indexOf(username) === -1) {
                this.userNames.push(username);
                this.totalUsers++;
            }
        },

        removeUser: function (username) {
            if (this.userNames.indexOf(username) !== -1) {
                this.userNames.pop(username);
                this.totalUsers--;
            }
        }

    },

    comments : {
        allComments: [] ,

        setUpTestComments: function () {
            this.allComments.push(new Comment("Qui dolor in exercitation sit veniam adipisicing reprehenderit tempor. Est enim irure sint veniam id et et excepteur nulla aliqua mollit nulla dolore velit. Eiusmod laborum minim et sunt culpa aliquip. Esse culpa consequat non ad duis ex non velit. In occaecat ex excepteur velit amet eiusmod mollit cupidatat aliquip velit ex culpa ullamco. Enim elit aliqua quis in ut magna.',","Reeves",moment(),"universal"));
            this.allComments.push(new Comment("Sint ad elit nostrud consequat consequat mollit ad consectetur fugiat. Do excepteur deserunt elit nulla consectetur irure dolor","Mcmillan",moment().subtract(7, 'days'),"humanRights"));
            this.allComments.push(new Comment("Pariatur do enim non ullamco excepteur do excepteur qui dolor consequat pariatur do. Pariatur voluptate nulla culpa nostrud est dolor eu ullamco laboris ea est.","Mcmillan",moment().subtract(4, 'hours'),"beTheChange"));
            this.allComments.push(new Comment("Fugiat enim sit est minim. Sint ad elit nostrud consequat consequat mollit ad consectetur fugiat","Velasquez",moment().subtract(360, 'days'),"stopCorruption"));
            this.allComments.push(new Comment("Et reprehenderit aute veniam quis aliquip sunt","Garrison",moment().subtract(390, 'days'),"other"));
        } ,

        getAllComments: function () {
            return this.allComments ;
        },

         setComment: function(cmt,username,dateTime){
             this.allComments.push(new Comment(cmt,username,dateTime));
        }

    }
}
module.exports = userStore ;