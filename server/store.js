var userStore =  {

    totalUsers : 0 ,
    userNames : [],

    getUserNames : function(){
      return this.userNames;
    },
    getUserCount : function () {
        return this.totalUsers ;
     },
    addNewUser: function (username) {

        if(this.userNames.indexOf(username) === -1) {
            this.userNames.push(username);
            this.totalUsers++ ;
        }
    },

    removeUser : function (username) {
        if (this.userNames.indexOf(username) !== -1) {
            this.userNames.pop(username);
            this.totalUsers--;
        }
    }


}

module.exports = userStore ;