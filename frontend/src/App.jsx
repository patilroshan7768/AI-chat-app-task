import React, { useState } from "react";
import Chat from "./components/Chat";
import Form from "./components/Form";

function App() {
  const [data, setData] = useState(null);

  return (
<div className="min-h-screen bg-gray-100 py-6 flex justify-center">
  <div className="w-full max-w-7xl flex gap-6">

    {/* LEFT */}
    <div className="w-2/3">
      <Form data={data} />
    </div>

    {/* RIGHT */}
    <div className="w-1/3">
      <Chat setData={setData} />
    </div>

  </div>
</div>
  );
}

export default App;