import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Stethoscope, MapPin, FileBadge } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { registerDocter } from "../store/authslice";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const registerSchema = z.object({
  firstname: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  specialty: z.string().min(2, "Specialty required"),
  licenseNumber: z.string().min(3, "License required"),
  contact: z.string().min(10, "Contact number required"),
  city: z.string().min(2, "City required"),
  state: z.string().min(2, "State required"),
});

function RegisterDoctor() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, doctorRegistered } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {

    const payload = {
      firstname: data.firstname,
      email: data.email,
      password: data.password,
      specialty: data.specialty,
      licenseNumber: data.licenseNumber,
      contact: Number(data.contact),
      location: {
        address: {
          city: data.city,
          state: data.state,
        },
      },
    };

    await dispatch(registerDocter(payload));
  };

  useEffect(() => {
    if (doctorRegistered) {
      navigate("/login");
    }
  }, [doctorRegistered, navigate]);

  return (

    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-blue-100 to-white overflow-hidden p-6">

      {/* Background blobs */}

      <div className="absolute w-[500px] h-[500px] bg-purple-300 blur-3xl opacity-30 rounded-full top-[-120px] left-[-120px]"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-300 blur-3xl opacity-30 rounded-full bottom-[-120px] right-[-120px]"></div>

      <div className="grid md:grid-cols-2 w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">

        {/* LEFT FORM */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/40 backdrop-blur-xl border border-white/30 p-10"
        >

          <h2 className="text-4xl font-bold text-black mb-2">
            Doctor Registration
          </h2>

          <p className="text-gray-700 mb-8">
            Join our AI healthcare platform
          </p>

          {error && (
            <p className="text-red-500 mb-4 text-sm">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <Input
              icon={<User size={18} />}
              placeholder="Enter your full name"
              register={register("firstname")}
              error={errors.firstname}
            />

            <Input
              icon={<Mail size={18} />}
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email}
            />

            <Input
              icon={<Lock size={18} />}
              type="password"
              placeholder="Create password"
              register={register("password")}
              error={errors.password}
            />

            <Input
              icon={<Phone size={18} />}
              placeholder="Enter phone number"
              register={register("contact")}
              error={errors.contact}
            />

            <Input
              icon={<Stethoscope size={18} />}
              placeholder="Specialty (Cardiologist, Dentist...)"
              register={register("specialty")}
              error={errors.specialty}
            />

            <Input
              icon={<FileBadge size={18} />}
              placeholder="Medical license number"
              register={register("licenseNumber")}
              error={errors.licenseNumber}
            />

            <Input
              icon={<MapPin size={18} />}
              placeholder="City"
              register={register("city")}
              error={errors.city}
            />

            <Input
              icon={<MapPin size={18} />}
              placeholder="State"
              register={register("state")}
              error={errors.state}
            />

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={loading}
              className="col-span-2 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg"
            >
              {loading ? "Registering..." : "Register Doctor"}
            </motion.button>

          </form>

          <p className="text-center text-gray-800 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 font-semibold">
              Login
            </a>
          </p>

        </motion.div>


        {/* RIGHT IMAGE */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center justify-center bg-indigo-50 p-10"
        >

          <img
            src="https://img.freepik.com/free-photo/young-doctor-supporting-his-patient_23-2148980723.jpg"
            alt="doctor"
            className="rounded-2xl shadow-xl object-cover"
          />

        </motion.div>

      </div>

    </div>
  );
}

function Input({ icon, placeholder, register, error, type="text" }) {

  return (
    <div className="flex flex-col">

      <div className="relative">

        <div className="absolute left-3 top-3 text-gray-500">
          {icon}
        </div>

        <input
          type={type}
          {...register}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/70 border border-gray-200 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">
          {error.message}
        </p>
      )}

    </div>
  );
}

export default RegisterDoctor;