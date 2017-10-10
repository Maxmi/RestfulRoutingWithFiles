This is my solution to the 'Restful Routing With Files' exercise of Leaner's Guild phase-2 curriculum.

Implement a RESTful API using Express which can store quotes from wonderful humans. The API should follow the RESTful convention for the CRUD interface.

API Contract:

Method	URL	Body Params	Response	Sample Response
GET	/api/quotes/:id	-	Reads and returns contents of the file <id>.json, where id is the url parameter	{"quote": "Learn rules like a pro, so you can break them like an artist.", "author": "Pablo Picasso"}
POST	/api/quotes	{"quote": "<quote>", author: "<author>"}	Creates a file called <next-id>.json, where <next-id> is the next number available for unique filenames	{"message": "Successfully created the file 4.json"}
PUT	/api/quotes/:id	{"quote": "<quote>", author: "<author>"}	Updates the file <id>.json, where <id> is the number parsed from the url params	{"message": "Successfully updated the file 6.json"}
DELETE	/api/quotes/:id	-	Deletes the file <id>.json, where <id> is the number parsed from the url params	{"message": "Successfully deleted the file 7.json"}
Example Usage

POST /api/quotes
body: {"quote": "If you can't explain it simply, then you don't understand it well enough", author: "Einstein"}
=> Should `create` a file called `1.json` with the quote and the author inside the json file.
(Notice that the name of the file chosen was `1.json`. You will have to maintain a counter to keep track of the names of the files.)

GET /api/quotes/1
=> Should `read` and return the contents of the file `1.json`

PUT /api/quotes/1
body: {"quote": "If you can't explain it simply, then you don't understand it well enough", author: "Albert Einstein"}
=> Should `update` the contents of the file `1.md` with the contents specified in the body

DELETE /api/quotes/1
=> Should `delete` the the file `1.json`