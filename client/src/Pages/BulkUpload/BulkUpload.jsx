import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";

const BulkUpload = () => {
    const [locations, setLocations] = useState([]);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (selectedFile && selectedFile.name.endsWith(".csv")) {
            Papa.parse(selectedFile, {
                header: true,
                complete: (result) => {
                    console.log("Parsed CSV Data:", result.data);
                    setLocations(result.data); // Store parsed CSV data in state
                },
                error: (err) => {
                    console.error("Error parsing CSV:", err.message);
                },
            });
        }
    };

    const handleUpload = async () => {
        if (locations.length === 0) {
            alert("No data to upload!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/locations/bulk", {
                locations,
            });
            alert(response.data.message);
        } catch (err) {
            console.error("Error uploading locations:", err.message);
            alert("Failed to upload locations. Please try again.");
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Bulk Upload Locations</h1>
            <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                className="mb-4"
            />
            <button
                onClick={handleUpload}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
            >
                Upload
            </button>
            <div className="mt-4">
                <h2 className="font-bold">Preview:</h2>
                <pre>{JSON.stringify(locations, null, 2)}</pre>
            </div>
        </div>
    );
};

export default BulkUpload;
