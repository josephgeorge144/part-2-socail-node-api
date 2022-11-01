const express= require('express')
const app =express();
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const helmet =require('helmet')
const morgan=require('morgan')
const userRoute=require('./routes/users')
const authRoute=require('./routes/auth')
const postsRoute=require('./routes/posts')

dotenv.config()
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true,useUnifiedTopology:true },(err)=>{
    if(err)console.log(err);
    else console.log(' database connected ');
})

app.use(express.json());
app.use(helmet());
app.use(morgan('common'))
app.use('/user',userRoute)
app.use('/auth',authRoute)
app.use('/post',postsRoute)

app.listen(8800,()=>{
    console.log('server is conneceted');
})

