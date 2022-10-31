const router=require('express').Router();
const User = require("../models/User");
const bcrypt=require('bcrypt');
const { error } = require('console');

//update user
router.put('/:id',async(req,res)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
       if(req.body.password){
        try{
            const salt=await bcrypt.genSalt(10)
            req.body.password=await bcrypt.hash(req.body.password,salt)
        }
        catch(err){
            console.log(err);
            return res.status(500).json(err)
           
        }
       }
       try{
        const user=await User.findByIdAndUpdate(req.params.id,{$set:req.body});  
         res.status(200).json("Account has been updated")
    }
    catch(err){
       return res.status(500).json(err)
    }

    }

    else{
        console.log(req.body.userId);
        console.log(req.params.id);

        return res.status(403).json('you can updqate only your account')

    }

    res.send('welocme new')})

    
//delete user
    router.delete('/:id',async(req,res)=>{
        if(req.body.userId===req.params.id || req.body.isAdmin){
           
           try{
               await User.findByIdAndDelete(req.params.id);  
             return res.status(200).json("Account has been deleted successfully")
        }
        catch(err){

            console.log(req.body.userId);
            console.log(req.params.id);
            
           return res.status(500).json(err)
        }
    
        }
    
        else{
           
    
            return res.status(403).json('you can delete only your account')
    
        }
    
        })

        //getuserr
        router.get('/:id',async (req,res)=>{
            try{
                const user =await User.findById(req.params.id);
                const{password,updatedAt,...other}=user._doc
                // user._doc is the returned user object from collection
                return res.status(200).json(other)
            }
            catch(err){
                res.status(500).json('kityilla')
            }
        })  
        
        //follow user
        router.put("id/:id/follow",async(req,res)=>{
            if(req.body.userId !== req.params.id){
                try{

                    const user=await user.findById(req.params.id);
                    const currentUser=await user.findById(req.body.userId);
                }
                catch(err){
                    res.status(500).json(err)
                }
            }
        })
module.exports=router