import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from "react-toastify";
import { useAuth } from '../../context/AuthContext';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);

  const { checkAuth, user } = useAuth();

  async function loginRequest() {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email, password
      }, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      if (response.status == 200) {
        await checkAuth();
      }
    } catch (e) {
      toast.error(e.message);
    }
  }

  useEffect(() => {
    if (!user) return;
    if (user.role === "admin") navigate("/admin/dashboard");
    if (user.role === "company") navigate("/company/dashboard");
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Top bar */}
      <header className="w-full px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
          </div>
          <span className="font-bold text-gray-900 text-lg">OFFICERENT</span>
        </div>
        <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">Documentation</a>
      </header>


      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8">


          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
            <p className="text-sm text-gray-400">Enter your credentials to access your dashboard</p>
          </div>

     
          <div className="space-y-4 mb-4">

 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
              </div>
            </div>

  
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2.5 gap-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
                <svg className="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
                />
                <button onClick={() => setShowPassword(!showPassword)} className="text-gray-400 hover:text-gray-600">
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

     
          <label className="flex items-center gap-2 mb-5 cursor-pointer">
            <input
              type="checkbox"
              checked={staySignedIn}
              onChange={(e) => setStaySignedIn(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 accent-blue-600"
            />
            <span className="text-sm text-gray-500">Stay signed in for 30 days</span>
          </label>

     
          <button
            onClick={loginRequest}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm mb-5"
          >
            Sign In
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>

      // divide and give a space 
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Or continue with</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

        
          <div className="grid grid-cols-2 gap-3 mb-6">
        
            <div className="col-span-1">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    await axios.post("http://localhost:3000/auth/google", {
                      token: credentialResponse.credential,
                    }, { withCredentials: true });
                    window.location.href = "/company/dashboard";
                  } catch (err) {
                    console.error(err);
                  }
                }}
                onError={() => console.log("Login Failed")}
                useOneTap={false}
                render={({ onClick }) => (
                  <button
                    onClick={onClick}
                    className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                )}
              />
            </div>

        
            <button className="flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Get started
            </Link>
          </p>
        </div>
      </div>

   
      <footer className="text-center py-4 text-xs text-gray-400">
        © 2026 WorkSpace Inc. All rights reserved. &nbsp;·&nbsp;
        <a href="#" className="hover:text-gray-600">Privacy Policy</a>
        &nbsp;·&nbsp;
        <a href="#" className="hover:text-gray-600">Terms of Service</a>
      </footer>
    </div>
  );
}

export default Login;