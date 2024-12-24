import React, { useState } from 'react';
import axios from 'axios';
import HomeNavbar from '../../Components/Navbar/HomeNavbar';

const AddLocation = () => {
    const [newLocation, setNewLocation] = useState({
        name: '',
        latitude: '',
        longitude: '',
        type: '',
        description: '',
        city: '',
        phone: '',
    });

    const [deleteCriteria, setDeleteCriteria] = useState({
        id: '',
        name: '',
        latitude: '',
        longitude: '',
    });

    const deleteLocation = async (e) => {
        e.preventDefault();

        try {
            // Determine which criteria to use for deletion
            let url = '';
            if (deleteCriteria.id) {
                url = `http://localhost:5000/locations/id/${deleteCriteria.id}`;
            } else if (deleteCriteria.name) {
                url = `http://localhost:5000/locations/name/${deleteCriteria.name}`;
            } else if (deleteCriteria.latitude && deleteCriteria.longitude) {
                url = `http://localhost:5000/locations/coords`;
            } else {
                alert('Please provide either an ID, Name, or both Latitude and Longitude.');
                return;
            }

            const response = await axios.delete(url, {
                data: {
                    latitude: deleteCriteria.latitude,
                    longitude: deleteCriteria.longitude,
                },
            });

            alert('Location deleted successfully!');
            setDeleteCriteria({ id: '', name: '', latitude: '', longitude: '' });
            console.log('Deleted Location:', response.data);
        } catch (err) {
            console.error('Error deleting location:', err);
            alert('Failed to delete location. Please check the details and try again.');
        }
    };

    const addNewLocation = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/locations', newLocation, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                alert('Location added successfully!');
                setNewLocation({
                    name: '',
                    latitude: '',
                    longitude: '',
                    type: '',
                    description: '',
                    city: '',
                    phone: '',
                }); // Reset form
            }
        } catch (err) {
            console.error('Error adding location:', err);
            alert('Failed to add location.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <HomeNavbar />
            <div className='flex justify-around items-center' style={{ height: 'calc(100vh - 4rem)' }}>
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                    <h2 className="text-3xl text-indigo-600 font-bold mb-8 text-center">Add New Location</h2>
                    <form onSubmit={addNewLocation} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newLocation.name}
                            onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <input
                            type="number"
                            step="any"
                            placeholder="Latitude"
                            value={newLocation.latitude}
                            onChange={(e) => setNewLocation({ ...newLocation, latitude: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <input
                            type="number"
                            step="any"
                            placeholder="Longitude"
                            value={newLocation.longitude}
                            onChange={(e) => setNewLocation({ ...newLocation, longitude: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <select
                            value={newLocation.type}
                            onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Hospital">Hospital</option>
                            <option value="Dentist">Dentist</option>
                            <option value="Doctor">Doctor</option>
                            <option value="Childcare">Childcare</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={newLocation.description}
                            onChange={(e) => setNewLocation({ ...newLocation, description: e.target.value })}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            step="any"
                            placeholder="City"
                            value={newLocation.city}
                            onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <input
                            type="number"
                            step="any"
                            placeholder="Phone"
                            value={newLocation.phone}
                            onChange={(e) => setNewLocation({ ...newLocation, phone: e.target.value })}
                            className="w-full p-2 border rounded-md"
                            required
                        />
                        <button type="submit" className="bg-indigo-600 font-medium text-white p-2 rounded-md w-full">
                            Add Location
                        </button>
                    </form>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
                    <h2 className="text-2xl font-bold text-indigo-700 mb-8 text-center">Delete Location</h2>
                    <form onSubmit={deleteLocation} className="space-y-4">
                        <input
                            type="text"
                            placeholder="ID (optional)"
                            value={deleteCriteria.id}
                            onChange={(e) => setDeleteCriteria({ ...deleteCriteria, id: e.target.value })}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="text"
                            placeholder="Name (optional)"
                            value={deleteCriteria.name}
                            onChange={(e) => setDeleteCriteria({ ...deleteCriteria, name: e.target.value })}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            step="any"
                            placeholder="Latitude (optional)"
                            value={deleteCriteria.latitude}
                            onChange={(e) => setDeleteCriteria({ ...deleteCriteria, latitude: e.target.value })}
                            className="w-full p-2 border rounded-md"
                        />
                        <input
                            type="number"
                            step="any"
                            placeholder="Longitude (optional)"
                            value={deleteCriteria.longitude}
                            onChange={(e) => setDeleteCriteria({ ...deleteCriteria, longitude: e.target.value })}
                            className="w-full p-2 border rounded-md"
                        />
                        <button
                            type="submit"
                            className="bg-red-500 text-white p-2 rounded-md w-full"
                        >
                            Delete Location
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddLocation;
