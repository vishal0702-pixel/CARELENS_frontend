import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function UserDashboard() {

  const user = {
    name: "Rahul Verma",
    bloodGroup: "B+",
    image: "https://img.freepik.com/free-photo/portrait-young-man_23-2148898678.jpg"
  };

  const riskData = [
    { name: "Day 1", risk: 20 },
    { name: "Day 2", risk: 35 },
    { name: "Day 3", risk: 40 },
    { name: "Day 4", risk: 55 },
    { name: "Day 5", risk: 30 },
  ];

  const diseases = [
    { name: "Migraine", risk: "Medium" },
    { name: "Flu", risk: "Low" },
    { name: "Hypertension", risk: "High" }
  ];

  const symptoms = [
    "Headache",
    "Fatigue",
    "Dizziness",
    "Nausea"
  ];

  const precautions = [
    "Drink plenty of water",
    "Avoid stress",
    "Take proper sleep",
    "Consult doctor if symptoms persist"
  ];

  const recentAppointment = {
    doctor: "Dr. Rahul Sharma",
    specialty: "Neurologist",
    date: "12 Aug 2026",
    status: "Upcoming"
  };

  const history = [
    { doctor: "Dr. Priya Mehta", disease: "Migraine", date: "1 Aug 2026" },
    { doctor: "Dr. Amit Singh", disease: "Flu", date: "15 July 2026" }
  ];

  return (

    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          AI Health Dashboard
        </h1>

        <div className="flex items-center gap-3">

          <img
            src={user.image}
            className="w-10 h-10 rounded-full"
          />

          <p>{user.name}</p>

        </div>

      </div>


      {/* GRID */}

      <div className="grid md:grid-cols-3 gap-8">


        {/* RISK GRAPH */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-2 bg-[#1e293b] p-6 rounded-xl"
        >

          <h2 className="text-xl mb-4">
            Disease Risk Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={riskData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name"/>
              <YAxis/>
              <Tooltip/>
              <Line type="monotone" dataKey="risk" stroke="#6366f1"/>
            </LineChart>
          </ResponsiveContainer>

        </motion.div>


        {/* POSSIBLE DISEASES */}

        <div className="bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-xl mb-4">
            Possible Diseases
          </h2>

          {diseases.map((d, i) => (

            <div key={i} className="flex justify-between mb-2">

              <span>{d.name}</span>

              <span className="text-indigo-400">
                {d.risk}
              </span>

            </div>

          ))}

        </div>


        {/* SYMPTOMS */}

        <div className="bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-xl mb-4">
            Detected Symptoms
          </h2>

          <ul className="space-y-2">

            {symptoms.map((s, i) => (
              <li key={i}>• {s}</li>
            ))}

          </ul>

        </div>


        {/* PRECAUTIONS */}

        <div className="bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-xl mb-4">
            Precautions
          </h2>

          <ul className="space-y-2">

            {precautions.map((p, i) => (
              <li key={i}>• {p}</li>
            ))}

          </ul>

        </div>


        {/* RECENT APPOINTMENT */}

        <div className="bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-xl mb-4">
            Recent Appointment
          </h2>

          <p><b>Doctor:</b> {recentAppointment.doctor}</p>

          <p><b>Specialty:</b> {recentAppointment.specialty}</p>

          <p><b>Date:</b> {recentAppointment.date}</p>

          <span className="bg-green-600 px-3 py-1 rounded-full text-sm">
            {recentAppointment.status}
          </span>

        </div>


        {/* HISTORY */}

        <div className="col-span-3 bg-[#1e293b] p-6 rounded-xl">

          <h2 className="text-xl mb-4">
            Appointment History
          </h2>

          <table className="w-full">

            <thead>

              <tr className="text-gray-400 border-b border-gray-700">

                <th className="py-3 text-left">Doctor</th>

                <th className="text-left">Disease</th>

                <th>Date</th>

              </tr>

            </thead>

            <tbody>

              {history.map((h, i) => (

                <tr key={i} className="border-b border-gray-800">

                  <td className="py-4">{h.doctor}</td>

                  <td>{h.disease}</td>

                  <td>{h.date}</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default UserDashboard;