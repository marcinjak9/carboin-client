## TODO

## Firebase hooks

* On user create: 
    * create a profile inside firestore
    * Send a welcome email

* On user delete:
    * delete the user profile
    * detele the user wallets
    * delete the user transactions
    * delete user from feed


* Cronjob checking transactions of a wallet
    * Every hour check every wallet for new transactions
    * If there is one send a notification via email to user
    * 