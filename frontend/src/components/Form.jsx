import React, { useEffect, useState } from "react";
import axios from "axios";

function Form({ data }) {
  const [form, setForm] = useState({
    hcp_name: "",
    interaction_type: "Meeting",
    date: "",
    time: "",
    attendees: "",
    topics: "",
    summary: "",
    sentiment: "neutral",
    outcomes: "",
    follow_up: "",
  });

useEffect(() => {
  if (data) {
    setForm((prev) => ({
      ...prev,
      hcp_name: data.hcp_name || prev.hcp_name,
      interaction_type: data.interaction_type || prev.interaction_type,
      summary: data.summary || prev.summary,
      sentiment: data.sentiment || prev.sentiment,
      follow_up: data.follow_up || prev.follow_up,
      date: data.date || prev.date,     // ✅ ADD THIS
      time: data.time || prev.time, 
      materials_shared: data.materials_shared || prev.materials_shared,
      samples_distributed: data.samples_distributed || prev.samples_distributed,
    }));
  }
}, [data]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveData = async () => {
    await axios.post("http://127.0.0.1:8000/save", form);
    alert("Saved!");
  };

  return (
    <div>

      <h1 className="text-xl font-semibold mb-4">Log HCP Interaction</h1>

      {/* SECTION 1 */}
      <div className="section">
        <h2 className="font-semibold mb-3">Interaction Details</h2>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">HCP Name</label>
            <input className="input" name="hcp_name" value={form.hcp_name} onChange={handleChange} />
          </div>

          <div>
            <label className="label">Interaction Type</label>
            <select className="input" name="interaction_type" value={form.interaction_type} onChange={handleChange}>
              <option>Meeting</option>
              <option>Call</option>
            </select>
          </div>

          <div>
            <label className="label">Date</label>
            <input type="date" className="input" name="date" value={form.date} onChange={handleChange} />
          </div>

          <div>
            <label className="label">Time</label>
            <input type="time" className="input" name="time" value={form.time} onChange={handleChange} />
          </div>
        </div>

        <div className="mt-3">
          <label className="label">Attendees</label>
          <input className="input" name="attendees" value={form.attendees} onChange={handleChange} />
        </div>

        <div className="mt-3">
          <label className="label">Topics Discussed</label>
          <textarea className="input" name="topics" value={form.topics} onChange={handleChange} />
        </div>
      </div>

      {/* SECTION: MATERIALS */}
<div className="section">
  <h2 className="font-semibold mb-3">Materials Shared / Samples Distributed</h2>

  {/* Materials */}
  <div className="border rounded-md p-3 mb-3 bg-gray-50 flex justify-between items-center">
    <div>
      <p className="text-sm font-medium">Materials Shared</p>
      <p className="text-xs text-gray-500">
  {form.materials_shared || "No materials added"}
</p>
    </div>

    <button className="border px-3 py-1 rounded text-sm">
      Search/Add
    </button>
  </div>

  {/* Samples */}
  <div className="border rounded-md p-3 bg-gray-50 flex justify-between items-center">
    <div>
      <p className="text-sm font-medium">Samples Distributed</p>
      <p className="text-xs text-gray-500">
  {form.samples_distributed || "No samples added"}
</p>
    </div>

    <button className="border px-3 py-1 rounded text-sm">
      Add Sample
    </button>
  </div>
</div>


{/* SECTION: OUTCOMES */}
<div className="section">
  <h2 className="font-semibold mb-3">Observed / Inferred HCP Sentiment</h2>

  {/* Sentiment */}
<div className="flex gap-6 mb-4 text-sm">

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="sentiment"
      value="positive"
      checked={form.sentiment === "positive"}
      onChange={handleChange}
    />
    <span>😊</span>
    Positive
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="sentiment"
      value="neutral"
      checked={form.sentiment === "neutral"}
      onChange={handleChange}
    />
    <span>😐</span>
    Neutral
  </label>

  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="sentiment"
      value="negative"
      checked={form.sentiment === "negative"}
      onChange={handleChange}
    />
    <span>😞</span>
    Negative
  </label>

</div>

  {/* Outcomes */}
  <div className="mb-3">
    <label className="label">Outcomes</label>
    <textarea
      className="input"
      name="outcomes"
      value={form.outcomes}
      onChange={handleChange}
      placeholder="Key outcomes or agreements..."
    />
  </div>

  {/* Follow-up */}
  <div>
    <label className="label">Follow-up Actions</label>
    <textarea
      className="input"
      name="follow_up"
      value={form.follow_up}
      onChange={handleChange}
      placeholder="Enter next steps or tasks..."
    />
  </div>

  {/* Suggested Follow-ups */}
  <div className="mt-3 text-sm text-blue-600">
    <p>AI Suggested Follow-ups:</p>
    <ul className="list-disc ml-5">
      <li>Schedule follow-up meeting</li>
      <li>Send product brochure</li>
      <li>Add Dr. Sharma to advisory boared invite list</li>
    </ul>
  </div>
</div>

      <button
        onClick={saveData}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Save Interaction
      </button>
    </div>
  );
}

export default Form;