const app = require("./app.ts")
require("dotenv").config();

const port = process.env.PORT_NUMBER;

app.listen(port, () => {
    console.log(`Application listening at port http://localhost:${port}`);
})