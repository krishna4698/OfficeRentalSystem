export const rolemiddleware =(...roles)=>{
     return (req,res,next)=>{
        console.log(roles);
        console.log(req.user)
        if(!roles.includes(req.user.role)){
            return res.json({message:"access denied"})
        }
        next()
     }
}