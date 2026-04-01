import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock } from "lucide-react";

import { loginUser } from "../store/authslice";

const loginschema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginschema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  // redirect after login
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "doctor") {
        navigate("/drdash");
      } else {
        navigate("/symptom");
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-200 via-blue-100 to-white">
      
      {/* background blobs */}

      <div className="absolute w-[500px] h-[500px] bg-purple-300 rounded-full blur-3xl opacity-30 top-[-100px] left-[-100px] animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-300 rounded-full blur-3xl opacity-30 bottom-[-100px] right-[-100px] animate-pulse"></div>

      <div className="grid md:grid-cols-2 w-full max-w-6xl rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl">

        {/* LEFT SIDE LOGIN FORM */}

        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/40 backdrop-blur-xl p-12 flex flex-col justify-center border border-white/30"
        >
          <h2 className="text-4xl font-bold text-indigo-700 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-600 mb-8">
            Login to access your AI health assistant
          </p>

          {/* backend error */}

          {error && (
            <p className="text-red-500 mb-4 text-sm">{error}</p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* EMAIL */}

            <div className="relative">

              <Mail
                className="absolute left-4 top-3 text-gray-400"
                size={20}
              />

              <input
                {...register("email")}
                placeholder="Enter your email"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* PASSWORD */}

            <div className="relative">

              <Lock
                className="absolute left-4 top-3 text-gray-400"
                size={20}
              />

              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/60 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* LOGIN BUTTON */}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

          </form>

          <p className="text-center text-gray-700 mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-indigo-600 font-semibold"
            >
              Sign Up
            </a>
          </p>

        </motion.div>

        {/* RIGHT SIDE IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="hidden md:flex items-center justify-center bg-white/20 backdrop-blur-xl p-10"
        >
          <img
            src="https://img.freepik.com/free-photo/cinematic-portrait-woman-working-healthcare-system-having-care-job_23-2151237581.jpg"
            alt="doctor"
            className="rounded-2xl shadow-2xl object-cover"
          />
        </motion.div>

      </div>
    </div>
  );
}

export default Login;