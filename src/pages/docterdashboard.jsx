import { motion } from "framer-motion";

function DoctorDashboard() {

  const doctor = {
    name: "Dr. Rahul Sharma",
    specialty: "Cardiologist",
    email: "rahul@gmail.com",
    contact: "9876543210",
    experience: "10 Years",
    location: "Delhi, India",
    image:
      "https://img.freepik.com/free-photo/confident-doctor-clinic_23-2151983463.jpg"
  };

  const appointments = [
    {
      patient: "Amit Verma",
      symptoms: "Chest Pain",
      date: "12 Aug 2026",
      time: "10:00 AM",
      status: "Pending"
    },
    {
      patient: "Priya Singh",
      symptoms: "Headache",
      date: "12 Aug 2026",
      time: "11:30 AM",
      status: "Pending"
    },
    {
      patient: "Rohit Kumar",
      symptoms: "Fever",
      date: "13 Aug 2026",
      time: "2:00 PM",
      status: "Pending"
    }
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br  from-indigo-100 via-blue-50 to-white p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Doctor Dashboard
        </h1>

        <div className="flex items-center gap-4">

          <img
            src={doctor.image}
            className="w-12 h-12 rounded-full object-cover"
          />

          <p className="font-semibold text-gray-700">
            {doctor.name}
          </p>

        </div>

      </div>


      {/* MAIN GRID */}

      <div className="grid md:grid-cols-3 gap-8">

        {/* PROFILE CARD */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-6"
        >

          <img
            src={doctor.image}
            className="w-36 h-36 rounded-full object-cover mx-auto shadow-lg"
          />

          <h2 className="text-xl font-bold text-center mt-4">
            {doctor.name}
          </h2>

          <p className="text-center text-indigo-600">
            {doctor.specialty}
          </p>

          <div className="mt-6 space-y-2 text-gray-700">

            <p><b>Email:</b> {doctor.email}</p>

            <p><b>Contact:</b> {doctor.contact}</p>

            <p><b>Experience:</b> {doctor.experience}</p>

            <p><b>Location:</b> {doctor.location}</p>

          </div>

        </motion.div>


        {/* STATS */}

        <div className="col-span-2 grid md:grid-cols-3 gap-6">

          <StatCard title="Total Patients" value="120" />

          <StatCard title="Appointments Today" value="8" />

          <StatCard title="Pending Requests" value="3" />

        </div>


        {/* APPOINTMENT TABLE */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="col-span-3 bg-white/70 backdrop-blur-xl shadow-xl rounded-3xl p-6"
        >

          <h2 className="text-xl font-bold mb-6">
            Pending Appointments
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="text-gray-700 border-b">

                  <th className="py-3 text-left">Patient</th>

                  <th className="text-left">Symptoms</th>

                  <th>Date</th>

                  <th>Time</th>

                  <th>Status</th>

                  <th>Action</th>

                </tr>

              </thead>

              <tbody>

                {appointments.map((a, i) => (

                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition"
                  >

                    <td className="py-4 font-medium">
                      {a.patient}
                    </td>

                    <td>{a.symptoms}</td>

                    <td>{a.date}</td>

                    <td>{a.time}</td>

                    <td>

                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        {a.status}
                      </span>

                    </td>

                    <td className="flex gap-2 justify-center">

                      <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600">
                        Accept
                      </button>

                      <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">
                        Reject
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </motion.div>

      </div>

    </div>

  );
}



function StatCard({ title, value }) {

  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/70 backdrop-blur-xl shadow-lg rounded-2xl p-6 text-center"
    >

      <h3 className="text-gray-600">
        {title}
      </h3>

      <p className="text-3xl font-bold text-indigo-600 mt-2">
        {value}
      </p>

    </motion.div>

  );

}


export default DoctorDashboard;