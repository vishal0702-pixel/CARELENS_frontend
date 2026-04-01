# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


https://www.freepik.com/free-photo/doctor-nurse-special-equipment_14602775.htm

https://img.freepik.com/free-photo/doctor-nurses-special-equipment_23-2148980721.jpg?t=st=1773481029~exp=1773484629~hmac=ef0d91c764370b5e5ca711395b733c9371afdc82f4987ee422cd4417695a955e&w=1480

https://img.freepik.com/premium-photo/portrait-female-doctor-posing-wearing-coat-stethoscope-mockup-free-copy-space_742418-19784.jpg?w=2000

https://img.freepik.com/premium-photo/focus-hand-holding-hand-sick-kid-mother-bed-were-connected-saline-solution-hospital_7180-2886.jpg?w=1480










import { useState } from "react";
import axiosClient from "../utils/axiosclient";

const SymptomsAnalyzer = () => {

  const [symptoms, setSymptoms] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeSymptoms = async () => {
    try {

      setLoading(true);

      const res = await axiosClient.post("symptom/report", {
        symptoms: symptoms
      });

      console.log("API RESPONSE:", res.data);

      setResult(res.data);

    } catch (error) {
      console.log("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "40px" }}>

      <h2>Symptoms Analyzer</h2>

      <input
        type="text"
        placeholder="Enter symptoms (example: fever, headache)"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginRight: "10px"
        }}
      />

      <button onClick={analyzeSymptoms}>
        Analyze
      </button>

      {loading && <p>Analyzing...</p>}

      {result && (
        <div style={{ marginTop: "30px" }}>

          <h3>Disease</h3>
          <p>{result.symptoms?.disease}</p>

          <h3>Risk Level</h3>
          <p>{result.riskLevel?.riskLevel}</p>

          <h3>Specialty</h3>
          <p>{result.symptoms?.specialty}</p>

          <h3>Explanation</h3>
          <p>{result.symptoms?.explanation}</p>

          <h3>Advice</h3>
          <p>{result.symptoms?.advice}</p>

          {/* ================= DB DOCTORS ================= */}

          <h3>Doctors From Database</h3>

          {result?.doctors?.length > 0 ? (
            result.doctors.map((doc, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p><b>Name:</b> {doc.name}</p>
                <p><b>Specialization:</b> {doc.specialty}</p>
                <p><b>City:</b> {doc.city}</p>
                <p><b>Contact:</b> {doc.contact}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No doctors found in database</p>
          )}

          {/* ================= AI DOCTORS ================= */}

          <h3>Recommended Doctors</h3>

          {result?.remainingdocter?.length > 0 ? (
            result.remainingdocter.map((doc, index) => (
              <div key={index} style={{ marginBottom: "10px" }}>
                <p><b>Name:</b> {doc.name}</p>
                <p><b>Specialization:</b> {doc.specialization}</p>
                <p><b>Location:</b> {doc.location}</p>
                <p><b>Contact:</b> {doc.contact}</p>
                <hr />
              </div>
            ))
          ) : (
            <p>No additional doctors found</p>
          )}

        </div>
      )}

    </div>
  );
};

export default SymptomsAnalyzer;