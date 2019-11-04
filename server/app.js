const express = require('express');
const app = express();
const port = 3030;
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users.js')
const postRouter = require('./routes/posts.js')

app.use(cors());
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
});
app.use(bodyParser.urlencoded({extended:false}));
app.use('/users', userRouter);
app.use('/posts', postRouter)
// app.use('/', (req, res) => {
//     res.send('Welcome to facebook')
// });
