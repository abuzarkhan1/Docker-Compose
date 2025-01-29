import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Record() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    level: "",
  });
  const [isNew, setIsNew] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id?.toString() || undefined;
      if(!id) return;
      setIsNew(false);
      const response = await fetch(`http://localhost:5050/record/${params.id.toString()}`);
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate("/");
        return;
      }
      setForm(record);
    }
    fetchData();
  }, [params.id, navigate]);

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch("http://localhost:5050/record", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`http://localhost:5050/record/${params.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(person),
        });
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('A problem occurred adding or updating a record: ', error);
    } finally {
      setForm({ name: "", position: "", level: "" });
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
        <div className="p-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
          <h3 className="text-2xl font-bold text-white mb-2">
            {isNew ? "New Employee" : "Update Employee"}
          </h3>
          <p className="text-slate-400 text-sm">Fill in the employee details below</p>
        </div>

        <form onSubmit={onSubmit} className="p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Enter employee name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="position" className="block text-sm font-medium text-slate-300 mb-2">
                Position
              </label>
              <input
                type="text"
                name="position"
                id="position"
                className="w-full bg-slate-800 border-2 border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                placeholder="Enter job position"
                value={form.position}
                onChange={(e) => updateForm({ position: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-4">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-4">
                {["Intern", "Junior", "Senior"].map((level) => (
                  <div
                    key={level}
                    className={`relative flex items-center justify-center p-4 rounded-lg cursor-pointer transition-all ${
                      form.level === level
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                    onClick={() => updateForm({ level })}
                  >
                    <input
                      type="radio"
                      name="positionOptions"
                      value={level}
                      checked={form.level === level}
                      onChange={(e) => updateForm({ level: e.target.value })}
                      className="sr-only"
                    />
                    <span className="text-sm font-medium">{level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              {isNew ? "Create Employee Record" : "Update Employee Record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}