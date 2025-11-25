import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast'; // <-- import toast
import {
  fetchCounselors,
  createCounselor,
  updateCounselor,
  deleteCounselor,
} from './counselorSlice';

const ManageCounselors = () => {
  const dispatch = useDispatch();
  const { list, status, error } = useSelector((state) => state.counselors);

  const [newCounselor, setNewCounselor] = useState({ name: '', email: '', phone: '', role: 'counselor', password: '' });
  const [editing, setEditing] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    dispatch(fetchCounselors());
  }, [dispatch]);

  // ---------------- Create ----------------
  const handleCreate = async () => {
    if (!newCounselor.name || !newCounselor.email || !newCounselor.password) {
      toast.error('Name, email, and password are required.');
      return;
    }
    setLoadingAction(true);
    try {
      await dispatch(createCounselor(newCounselor)).unwrap();
      toast.success('Counselor added successfully!');
      setNewCounselor({ name: '', email: '', phone: '', role: 'counselor', password: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to add counselor.');
    } finally {
      setLoadingAction(false);
    }
  };

  // ---------------- Delete ----------------
 // ---------------- Delete ----------------
const handleDelete = async (id) => {
  toast(
    (t) => (
      <div className="flex flex-col gap-2">
        <p>Are you sure you want to delete this counselor?</p>

        <div className="flex gap-2 justify-end">
          <button
            className="px-3 py-1 rounded bg-gray-300"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>

          <button
            className="px-3 py-1 rounded bg-red-500 text-white"
            onClick={async () => {
              toast.dismiss(t.id);
              setLoadingAction(true);

              try {
                await dispatch(deleteCounselor(id)).unwrap();
                toast.success("Counselor deleted successfully!");
              } catch (err) {
                toast.error(err.message || "Failed to delete counselor.");
              } finally {
                setLoadingAction(false);
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    ),
    {
      duration: 5000,
      style: {
        background: "rgba(255,255,255,0.95)",
        color: "#333",
        borderRadius: "8px",
        padding: "12px 16px",
      },
    }
  );
};


  // ---------------- Edit ----------------
  const handleEdit = (counselor) => {
    setEditing(counselor);
  };

  const handleUpdate = async () => {
    if (!editing.name || !editing.email) {
      toast.error('Name and email are required.');
      return;
    }
    setLoadingAction(true);
    try {
      await dispatch(updateCounselor({ id: editing.id, data: editing })).unwrap();
      toast.success('Counselor updated successfully!');
      setEditing(null);
    } catch (err) {
      toast.error(err.message || 'Failed to update counselor.');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Counselors</h1>

      {/* Add New Counselor */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-2">Add New Counselor</h2>
        <div className="flex flex-wrap gap-2">
          <input
            placeholder="Name"
            value={newCounselor.name}
            onChange={(e) => setNewCounselor({ ...newCounselor, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Email"
            value={newCounselor.email}
            onChange={(e) => setNewCounselor({ ...newCounselor, email: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Phone"
            value={newCounselor.phone}
            onChange={(e) => setNewCounselor({ ...newCounselor, phone: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Password"
            type="password"
            value={newCounselor.password}
            onChange={(e) => setNewCounselor({ ...newCounselor, password: e.target.value })}
            className="border p-2 rounded"
          />
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-3 py-1 rounded"
            disabled={loadingAction}
          >
            {loadingAction ? 'Processing...' : 'Add'}
          </button>
        </div>
      </div>

      {/* Counselors Table */}
      {status === 'loading' ? (
        <p>Loading counselors...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c) => (
              <tr key={c.id}>
                <td className="p-2 border">
                  {editing?.id === c.id ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editing.name}
                      onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    />
                  ) : (
                    c.name
                  )}
                </td>
                <td className="p-2 border">
                  {editing?.id === c.id ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editing.email}
                      onChange={(e) => setEditing({ ...editing, email: e.target.value })}
                    />
                  ) : (
                    c.email
                  )}
                </td>
                <td className="p-2 border">
                  {editing?.id === c.id ? (
                    <input
                      className="border p-1 rounded w-full"
                      value={editing.phone}
                      onChange={(e) => setEditing({ ...editing, phone: e.target.value })}
                    />
                  ) : (
                    c.phone
                  )}
                </td>
                <td className="p-2 border">{c.role}</td>
                <td className="p-2 border flex gap-2">
                  {editing?.id === c.id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        disabled={loadingAction}
                      >
                        {loadingAction ? 'Updating...' : 'Save'}
                      </button>
                      <button
                        onClick={() => setEditing(null)}
                        className="bg-gray-500 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(c)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        disabled={loadingAction}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCounselors;
