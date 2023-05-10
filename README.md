# intersogtask
#
### [GET] /cards - used to get a list of all cards 
### body: none
#
#
### [GET] /cards/:id - used to get card by cardId 
### body: none
#
### [POST] /cards
#### body: JSON
```json
{
    "id": 100, // optional, allowed: numbers
	"cardname": "test", // required, allowed: letters
	"ownerid": 1,   // required, allowed: numbers
    "cardtype": "Gold" // required, allowed: [ "Gold", "Silver", "Iron", "Composite"]
}
```
#### You will create a new card
#
### [PATCH] /cards/:id
#### body: JSON
```json
{
    "id": 100, // optional, allowed: numbers
	"cardname": "test", // required, allowed: letters
	"ownerid": 1,   // required, allowed: numbers
    "cardtype": "Gold" // required, allowed: [ "Gold", "Silver", "Iron", "Composite"]
}
```
#### The card data by id will change to those that you sent in the body
#
### [DELETE] /cards/:id
#### body: none
#### Delete card by id
#
