import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./InspectionRequestTable.css";

const InspectionRequestTable = ({ projectId, role }) => {
  const [inspectionRequests, setInspectionRequests] = useState([]);
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [editedDates, setEditedDates] = useState({});
  const [updateStatus, setUpdateStatus] = useState(null); // New state variable for update status

  useEffect(() => {
    const projectId = localStorage.getItem('projectId');

    axios
      .get(`http://localhost:8090/api/projects/${projectId}/phases`)
      .then((response) => {
        setPhases(response.data);
      })
      .catch((error) => {
        console.error('Error fetching phases:', error);
      });
  }, [projectId]);

  useEffect(() => {
    if (selectedPhase) {
      axios
        .get(`http://localhost:8090/inspection/request/byPhase/${selectedPhase}`)
        .then((response) => {
          setInspectionRequests(response.data);
        })
        .catch((error) => {
          console.error('Error fetching inspection requests:', error);
        });
    }
  }, [selectedPhase]);

  const downloadFile = (fileName) => {
    axios({
      url: `http://localhost:8090/inspection/request/download/${fileName}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
    });
  };

  const handleEditDate = (inspectionId, newDate) => {
    setEditedDates((prevDates) => ({
      ...prevDates,
      [inspectionId]: newDate,
    }));
  };

  const handleSaveDate = async (inspectionId) => {
    try {
      const newDate = editedDates[inspectionId];

      if (!newDate) {
        // If newDate is undefined, do nothing and exit the function
        return;
      }

      await axios.put(
        `http://localhost:8090/inspection/request/updateDate/${inspectionId}`,
        newDate,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Set the update status message
      setUpdateStatus('Inspection date updated successfully!');

      // Reset the success message after a few seconds
      setTimeout(() => setUpdateStatus(''), 5000);

      // Remove the inspectionId from editedDates
      setEditedDates((prevDates) => {
        const { [inspectionId]: deletedDate, ...rest } = prevDates;
        return rest;
      });

      // Update the inspectionRequests state to reflect the updated date
      setInspectionRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.inspectionId === inspectionId
            ? { ...request, inspectionDate: newDate }
            : request
        )
      );
    } catch (error) {
      console.error('Error updating inspection date:', error);
      console.log('Error response:', error.response);
      // Add this line to log the detailed error response

      // Set the update status message for error
      setUpdateStatus('Error updating inspection date');
    }
  };

  // Sort inspection requests by inspection request date in descending order
  const sortedInspectionRequests = inspectionRequests.slice().sort((a, b) => {
    return new Date(b.inspectionRequestDate) - new Date(a.inspectionRequestDate);
  });

  console.log('Role:', role);

  return (
    <div className="inspection-table-container">
      {/* Phase Dropdown */}
      <label className="phase-label">Select Phase: </label>
      <select onChange={(e) => setSelectedPhase(e.target.value)} className="phase-select">
        <option value="">-- Select Phase --</option>
        {phases.map((phase) => (
          <option key={phase.phaseId} value={phase.phaseId}>
            {phase.phaseName}
          </option>
        ))}
      </select>

      {updateStatus && (
        <div className="update-status-message">
          {updateStatus}
        </div>
      )}

      <div className='table-scroll'>
        <table className="inspection-table">
          <thead>
            <tr>
              <th>Inspection Name</th>
              <th>Phase Section</th>
              <th>Construction Type</th>
              <th>Inspection Request Date</th>
              <th>Inspection Date</th>
              <th>Files</th>
              {(role === 5 && <th>Schedule</th>)}
            </tr>
          </thead>
          <tbody>
            {sortedInspectionRequests.map((request) => (
              <tr key={request.inspectionId}>
                <td>{request.inspectionName}</td>
                <td>{request.phaseSection}</td>
                <td>{request.constructionType}</td>
                <td>{new Date(request.inspectionRequestDate).toLocaleString()}</td>
                <td>
                  {editedDates[request.inspectionId] !== undefined ? (
                    <input
                      type="datetime-local"
                      value={editedDates[request.inspectionId] || ''}
                      onChange={(e) => handleEditDate(request.inspectionId, e.target.value)}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                  ) : (
                    <span>
                      {request.inspectionDate ? new Date(request.inspectionDate).toLocaleString() : 'Not scheduled yet'}
                    </span>
                  )}
                </td>
                <td>
                  {request.fileName && (
                    <button onClick={() => downloadFile(request.fileName)} className="file-download-btn">
                      <i className='fas fa-download'/>{" " + request.fileName}
                    </button>
                  )}
                </td>

                {/* Schedule only for Consultant */}
                {(role === 5 && <td>
                  {editedDates[request.inspectionId] !== undefined ? (
                    <>
                      <button onClick={() => handleSaveDate(request.inspectionId)} className="save-btn">
                        <i className='fas fa-save'/>
                      </button>
                      <button onClick={() => setEditedDates((prevDates) => ({ ...prevDates, [request.inspectionId]: undefined }))} className="cancel-btn">
                        <i className='fas fa-cancel'/>
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEditDate(request.inspectionId, new Date(request.inspectionDate).toISOString().slice(0, 16))} className="schedule-btn">
                      <i className='fas fa-clock'/>
                    </button>
                  )}
                </td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default InspectionRequestTable;
