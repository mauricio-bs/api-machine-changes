import app from './app'
const dotenv = require('dotenv')

// DotEnv
dotenv.config({ path: './.env' })
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
