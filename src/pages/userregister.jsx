import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { User, Mail, Lock, MapPin, Droplet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authslice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function UserRegister() {

  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
    console.log(data);
  };

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/beautiful-scenery-summit-mount-everest-covered-with-snow-white-clouds_181624-21317.jpg?t=st=1773557126~exp=1773560726~hmac=67cb6176efe4f36eb663e5cdfb9340e3e261ba44899f66ef981621be7ad81243&w=1480')",
      }}
    >

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* GLASS CONTAINER */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative grid md:grid-cols-2 w-full max-w-6xl rounded-3xl overflow-hidden backdrop-blur-xl bg-white/20 border border-white/30 shadow-2xl"
      >

        {/* LEFT FORM */}

        <div className="p-10">

          <h2 className="text-4xl font-bold text-black mb-2">
            Create Account
          </h2>

          <p className="text-gray-800 mb-8">
            Register to access AI health assistant
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
          >

            {/* NAME */}

            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-600" size={18}/>
              <input
                {...register("firstname")}
                placeholder="Enter your full name"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* EMAIL */}

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-600" size={18}/>
              <input
                {...register("email")}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* PASSWORD */}

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-600" size={18}/>
              <input
                type="password"
                {...register("password")}
                placeholder="Create password"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* GENDER */}

            <select
              {...register("gender")}
              className="w-full px-4 py-3 rounded-xl bg-white/70 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* BLOOD GROUP */}

            <div className="relative">
              <Droplet className="absolute left-3 top-3 text-gray-600" size={18}/>
              <select
                {...register("bloodgroup")}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option value="">Select Blood Group</option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>AB+</option>
                <option>AB-</option>
                <option>O+</option>
                <option>O-</option>
              </select>
            </div>

            {/* LOCATION */}

            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-600" size={18}/>
              <input
                {...register("location")}
                placeholder="Enter your city"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-600" size={18}/>
              <input
                {...register("age")}
                placeholder="Enter your age"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 text-black border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            {/* REGISTER BUTTON */}

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg"
            >
              Register
            </motion.button>

          </form>

          <p className="text-gray-800 mt-6 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-semibold">
              Login
            </a>
          </p>

        </div>

        {/* RIGHT IMAGE */}

        <div
          className="hidden md:block bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/free-photo/fuji-mountain-with-milky-way-night_335224-104.jpg?t=st=1773556011~exp=1773559611~hmac=0a768e572638954927f5de9caa7461a8df21fbae785c881315c7e5bb4492f7f5&w=2000')",
          }}
        />

      </motion.div>

    </div>
  );
}

export default UserRegister;