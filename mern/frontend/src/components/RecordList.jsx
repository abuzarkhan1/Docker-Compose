import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr className="border-b border-gray-800 hover:bg-[#1c1c38] transition-colors">
    <td className="p-4 align-middle text-gray-300">
      {props.record.name}
    </td>
    <td className="p-4 align-middle text-gray-300">
      {props.record.position}
    </td>
    <td className="p-4 align-middle text-gray-300">
      {props.record.level}
    </td>
    <td className="p-4 align-middle">
      <div className="flex gap-2">
        <Link
          className="px-4 py-2 bg-[#141428] text-gray-300 rounded-md text-sm font-medium hover:bg-[#1c1c38] transition-colors border border-gray-800"
          to={`/edit/${props.record._id}`}
        >
          Edit
        </Link>
        <button
          className="px-4 py-2 bg-[#141428] text-red-400 rounded-md text-sm font-medium hover:bg-[#1c1c38] transition-colors border border-gray-800"
          type="button"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </div>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/record/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/record/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div className="p-6 bg-[#00001a]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#1c1c38] rounded-lg shadow-xl overflow-hidden">
          <h3 className="text-xl font-semibold p-6 text-white border-b border-gray-800">
            Employee Records
          </h3>
          
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">
                    Name
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">
                    Position
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">
                    Level
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-gray-400">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {recordList()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}