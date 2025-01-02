const express=require("express")
const app=express()
const port=8080
const path=require("path")

const {v4:uuid4}=require('uuid')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"))
app.use(express.static(path.join(__dirname,"public")))



let posts=[
    {
        id:uuid4(),
        username:"mks_rajput",
        content:"I love to do cp"
    },
    {
        id:uuid4(),
        username:"shivam",
        content:"I am good"
    }
]


app.get("/posts",(req,res)=>{
    res.render("index",{posts})
})


app.get("/posts/new",(req,res)=>{
    res.render("new")
})


app.post("/posts",(req,res)=>{
    let {username,content}=req.body
    let id=uuid4()
    posts.push({id,username,content})
    res.redirect("/posts")
})

app.get("/posts/:id",(req,res)=>{
   let {id}=req.params
   let post=posts.find((p)=>id===p.id)
   res.render("show",{post})
})


app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params
    let post=posts.find((p)=>id===p.id)
    res.render("edit",{post})
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params
    let newContent=req.body.content
    let post=posts.find((p)=>id===p.id)
    post.content=newContent
    console.log(post)
    res.redirect("/posts")
    

})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params
    let newContent=req.body.content
    posts=posts.filter((p)=>id!==p.id)
    res.redirect("/posts")
    

})



app.listen(port,()=>{
    console.log('app is working')
})
