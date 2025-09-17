import dotenv from 'dotenv'
dotenv.config();

const ENV={
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL
}

export default ENV;