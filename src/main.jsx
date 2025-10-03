import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import './style.css';
import carImage from './assets/car-insu.avif';

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    carModel: "",
    year: "",
    registration: "",
    insuranceType: "",
    coverage: "",
    addOns: "",
    accidents: "",
    experience: "",
    additionalDrivers: ""
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const validateStep = () => {
    const stepRequired = {
      1: ["fullName", "email", "phone"],
      2: ["carModel", "year", "registration"],
      3: ["insuranceType"],
      4: ["coverage"],
      5: ["accidents", "experience"],
      6: [],
      7: []
    };
    const fields = stepRequired[step];
    for (let field of fields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill the "${field.replace(/([A-Z])/g, ' $1')}" field`);
        return false;
      }
    }
    return true;
  }

  const nextStep = () => { if(validateStep()) setStep(step < 7 ? step + 1 : step); }
  const prevStep = () => setStep(step > 1 ? step - 1 : step);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emptyFields = Object.entries(formData).filter(([_, value]) => value.trim() === "");
    if(emptyFields.length > 0){
      alert("Please fill all required fields");
      return;
    }
    alert("Form submitted successfully!");
    console.log("Form Data:", formData);
  }

  const progress = (step / 7) * 100;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-green-900 text-center">Car Insurance Quote</h2>

      <div className="w-full bg-gray-200 h-2 rounded mb-6">
        <div className="bg-orange-500 h-2 rounded" style={{width: `${progress}%`}}></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {step === 1 && <>
          <input type="text" name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="email" name="email" placeholder="Email *" value={formData.email} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="tel" name="phone" placeholder="Phone *" value={formData.phone} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </>}
        {step === 2 && <>
          <input type="text" name="carModel" placeholder="Car Model *" value={formData.carModel} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="number" name="year" placeholder="Year *" value={formData.year} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="text" name="registration" placeholder="Registration Number *" value={formData.registration} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </>}
        {step === 3 && <>
          <select name="insuranceType" value={formData.insuranceType} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Insurance Type *</option>
            <option value="comprehensive">Comprehensive</option>
            <option value="third-party">Third Party</option>
            <option value="collision">Collision</option>
          </select>
        </>}
        {step === 4 && <>
          <select name="coverage" value={formData.coverage} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Select Coverage *</option>
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          <input type="text" name="addOns" placeholder="Add-ons (optional)" value={formData.addOns} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </>}
        {step === 5 && <>
          <input type="number" name="accidents" placeholder="Number of Accidents *" value={formData.accidents} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
          <input type="number" name="experience" placeholder="Years of Driving Experience *" value={formData.experience} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </>}
        {step === 6 && <>
          <textarea name="additionalDrivers" placeholder="Additional Drivers (names & relation)" value={formData.additionalDrivers} onChange={handleChange} className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </>}
        {step === 7 && (
          <div>
            <h3 className="text-lg font-bold mb-2 text-green-900">Review Your Details</h3>
            <ul className="text-gray-700 mb-4 space-y-1">
              {Object.entries(formData).map(([key, value]) => (
                <li key={key}><span className="font-semibold">{key.replace(/([A-Z])/g, ' $1')}: </span>{value}</li>
              ))}
            </ul>
            <p className="text-sm text-gray-500 mb-4">Click Submit to complete your insurance request.</p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          {step > 1 && <button type="button" onClick={prevStep} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">Back</button>}
          {step < 7 ? <button type="button" onClick={nextStep} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition ml-auto">Next</button> :
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition ml-auto">Submit</button>}
        </div>
      </form>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-green-700 text-white py-4 px-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EcoCar Insurance</h1>
        </div>
      </header>

      {/* Hero + Left Image + Right Form */}
      <main className="flex-1 flex flex-col md:flex-row bg-green-50 py-12 px-6">
        <div className="md:w-1/2 flex flex-col justify-center items-center text-center md:text-left mb-6 md:mb-0">
          <img src={carImage} alt="Car Insurance" className="rounded-lg shadow-lg mb-6 max-h-96 object-cover"/>
          <h2 className="text-4xl font-bold mb-4 text-green-900">Protect Your Car, Protect Your Future</h2>
          <p className="text-gray-700 mb-6">Complete your insurance request in 7 simple steps. Easy, fast, and secure.</p>
        </div>
        <div className="md:w-1/2 flex justify-center items-start">
          <MultiStepForm />
        </div>
      </main>

      {/* Dummy Sections */}
      <section className="py-20 px-6 bg-gray-100">
        <h3 className="text-3xl font-bold text-green-900 mb-10 text-center">Our Plans</h3>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h4 className="font-bold mb-2">Basic</h4>
            <p className="text-gray-700">Affordable coverage for essential protection.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h4 className="font-bold mb-2">Standard</h4>
            <p className="text-gray-700">More coverage with additional features.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h4 className="font-bold mb-2">Premium</h4>
            <p className="text-gray-700">Complete protection with maximum benefits.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <h3 className="text-3xl font-bold text-green-900 mb-10 text-center">Frequently Asked Questions</h3>
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="p-4 border rounded shadow">
            <h4 className="font-bold">How do I get a quote?</h4>
            <p>Fill the form in 7 steps and submit to receive your quote instantly.</p>
          </div>
          <div className="p-4 border rounded shadow">
            <h4 className="font-bold">Can I customize my plan?</h4>
            <p>Yes, our coverage options allow full customization.</p>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-green-50 text-center">
        <h3 className="text-3xl font-bold text-green-900 mb-4">Ready to Protect Your Car?</h3>
        <p className="text-gray-700 mb-6">Start your insurance request in minutes with our easy multi-step form.</p>
        <a href="#form" className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition font-semibold">Get Started</a>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white py-6 px-6 mt-10 text-center">
        <p>© 2025 EcoCar Insurance. All rights reserved.</p>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
