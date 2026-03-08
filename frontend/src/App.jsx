import { Calendar, Dot } from "lucide-react";
import "./App.css";
import Card from "./components/Card";
import Navbar from "./components/Navbar";
import Button from "./components/Button";

function App() {
  const holidays = ["2026-03-20", "2026-04-10"];
  return (
    <>
      <div className="bg-gray-50 min-h-screen">
        <Navbar />

        <div className="max-w-5xl mx-auto p-4 flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-2/3">
            {/*status card  */}
            <Card title="STATUS">
              <div className="text-sm flex items-center gap-1 mt-1">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                <span className=" text-green-700">Connected</span>
              </div>
              <div className="text-sm">
                <p>
                  <span className="font-medium ">Next Poll:</span> 8:13 PM
                </p>
                <p>
                  <span className="font-medium">Timezone:</span> IST
                </p>
                <p>
                  <span className="font-medium">Last Poll:</span> Today 8:13 PM
                </p>
              </div>
            </Card>
            <Card title="POLL SETTINGS">
              <div className="mt-2">
                <form>
                  <div className="mb-2">
                    <label className="font-medium block text-sm mb-1 text-gray-800">
                      Question
                    </label>
                    <input
                      className="border border-gray-300 rounded-md w-full p-1 text-sm"
                      type="text"
                    />
                  </div>
                  <div className="">
                    <p className="font-medium text-sm mb-1 text-gray-800">
                      Options
                    </p>
                    <div className="text-sm text-amber-50 mb-2">
                      <span className="bg-blue-500 px-2 py-0.5 rounded-md">
                        Yes
                      </span>{" "}
                      <span className="bg-green-500 px-2 py-0.5 rounded-md">
                        No
                      </span>
                    </div>
                  </div>
                  <div className="mb-1">
                    <label className="font-medium block text-sm mb-1 text-gray-800">
                      Schedule Time
                    </label>
                    <input
                      className="border border-gray-300 rounded-md w-full p-1 text-sm"
                      type="text"
                    />
                  </div>

                  <Button title="Save Settings" />
                </form>
              </div>
            </Card>
          </div>
          <div className="md:w-1/3 w-full">
          <div className="flex flex-col h-full">

            <Card title="HOLIDAYS">
              {holidays.map((date) => (
                <div className="flex gap-1.5 text-sm items-center mt-2">
                  <Calendar size={18} color="brown" />
                  <p>{date}</p>
                </div>
              ))}

              <Button title="Add Holiday" />
            </Card>
            <Card title="SYSTEM ACTIVITY">
              <p className="mt-2">logs...</p>
            </Card>

            <Card title="MANUAL ACTIONS">
              <Button title="Send Poll Now" />
              <Button
                title="Stop Poll"
                variant="bg-red-500 hover:bg-red-600 border-red-600"
              />
            </Card>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
