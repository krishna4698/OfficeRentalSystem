import axios from 'axios';
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';




function Register() {
const navigate= useNavigate();
    const [email, setEmail] = useState("")
    const[name, setname]= useState("")
    const [password, setPassword] = useState("");
    const [role, setrole]= useState("admin")

    async function loginRequest(){
      
    const response = await axios.post("http://localhost:3000/auth/register", {
        email, password, name , role
    },
    {
        withCredentials:true,
        headers:{
            "Content-Type": "application/json"
        }
    }
)
if(response.status == 200){
navigate("/login")
}
}


  return (
   <div className="flex min-h-screen items-center justify-center bg-black px-4">
  <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-black p-8 shadow-[0_0_30px_rgba(255,255,255,0.05)]">
    
    <h1 className="mb-6 text-center text-2xl font-semibold text-white">
      Register
    </h1>

    <div className="space-y-4">
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-white focus:ring-1 focus:ring-white"
      />
      
      <select name="" id="">
        <option value="role">admin</option>
        <option value="role">company</option>
      </select>

      <button className="mt-4 w-full rounded-lg bg-white py-3 font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]" onClick={loginRequest}>
        Register
      </button>
    </div>

  </div>
</div>

  )
}

export default Register
