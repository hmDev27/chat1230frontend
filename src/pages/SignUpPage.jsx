import React from 'react';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { MessageSquare, User, Mail, Lock} from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern.jsx"
import { toast, Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';


const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
  if (!formData.fullName.trim()) 
    return toast.error("Full name is required");
  
  if (!formData.email.trim()) 
    return toast.error("Email is required");
  
  if (!/^\S+@\S+\.\S+$/.test(formData.email)) 
    return toast.error("Invalid email format");
  
  if (!formData.password) 
    return toast.error("Password is required");
  
  if (formData.password.length < 6) 
    return toast.error("Password must be at least 6 characters");
  
  return true;
};

    const handleSubmit = (e) => {
      e.preventDefault()

      const success = validateForm()
      
      if(success===true) signup(formData);

    }



  return (
   <div className="min-h-screen grid lg:grid-cols-2">
      <Toaster position="top-center" reverseOrder={false} />
    {/* left side*/}
    <div className="flex flex-col justify-center items-center p-6 sm:p-12">
      <div className="w-full max-w-md space-y-8">
        {/* LOGO */}
      <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2 group">
           <div
             className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                   <MessageSquare className="size-6 text-primary" />
                   
           </div>
           <h1 className="text-2xl font-bold mt-2">အကောင့်ဖွင့်ပါ</h1>
           <p className="text-base-content/60">အကောင့်ဖွင့်ပြီး ချက်တင်စတင်လိုက်ပါ</p>
          </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">အမည်</span>
          </label>
          <div className="relative">
            <input
              type="text"
              className={`input input-bordered w-full pl-10`}
              placeholder="Name"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
             <User size={20} className="size-5 text-base-content/40" />
            </div>
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">အီးမေးလ်</span>
          </label>
          <div className="relative">
            <input
              type="email"
              className={`input input-bordered w-full pl-10`}
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="size-5 text-base-content/40" />
            </div>
          </div>
        </div>
       
        <div className="form-control">
          <label className="label">
            <span className="label-text font-medium">လျှို့ဝှက်နံပါတ်</span>
          </label>
          <div className="relative">
           
            <input
              type={showPassword ? "text" : "password"}
              className={`input input-bordered w-full pl-10 pr-10`}
              placeholder="......"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              /> <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="size-5 text-base-content/40" />
            </div>

              <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (<EyeOff className="size-5 text-base-content/40"/>) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
                </button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
          {isSigningUp ? (
            <>
            <Loader2 className="size-5 animate-spin" /> 
            Loading လုပ်နေသည်..</>
          ) : ("အကောင့်ဖွင့်ပါ")}
        </button>
      </form>

      <div className="text-center">
        <p className="text-base-content/60">
            အကောင့်ရှိပြီးပါက?{" "}
        <Link to="/login" className="link link-primary">
           Login oင်ပါ
        </Link></p>
       </div>
      </div>
     </div>

     {/* right side */}

     <AuthImagePattern 
      title="ဒီဝက်ဆိုက်မှာ ချက်တင်လုပ်ပါ"
      subtitle="တစ်ယောက်နဲ့တစ်ယောက်ချိတ်ဆက် မျှဝေမယ်"
     />
    </div>
  )
}

export default SignUpPage


//2:00





