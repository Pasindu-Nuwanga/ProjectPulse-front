import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InspectionRequestTable = ({ projectId }) => {
  const [inspectionRequests, setInspectionRequests] = useState([]);
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [editedDates, setEditedDates] = useState({});

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
      console.log('Error response:', error.response); // Add this line to log the detailed error response
    }
  };
  
  
  return (
    <div>
      <h2>Inspection Requests</h2>

      {/* Phase Dropdown */}
      <label>Select Phase: </label>
      <select onChange={(e) => setSelectedPhase(e.target.value)}>
        <option value="">-- Select Phase --</option>
        {phases.map((phase) => (
          <option key={phase.phaseId} value={phase.phaseId}>
            {phase.phaseName}
          </option>
        ))}
      </select>

      <table>
        <thead>
          <tr>
            <th>Inspection Name</th>
            <th>Phase Section</th>
            <th>Construction Type</th>
            <th>Phase Name</th>
            <th>Inspection Request Date</th>
            <th>Inspection Date</th>
            <th>Files</th>
          </tr>
        </thead>
        <tbody>
          {inspectionRequests.map((request) => (
            <tr key={request.inspectionId}>
              <td>{request.inspectionName}</td>
              <td>{request.phaseSection}</td>
              <td>{request.constructionType}</td>
              <td>{request.phases ? request.phases.phaseName : ''}</td>
              <td>{new Date(request.inspectionRequestDate).toLocaleString()}</td>
              <td>
                {editedDates[request.inspectionId] !== undefined ? (
                  <input
                    type="datetime-local"
                    value={editedDates[request.inspectionId] || ''}
                    onChange={(e) => handleEditDate(request.inspectionId, e.target.value)}
                  />
                ) : (
                  <span>
                    {request.inspectionDate ? new Date(request.inspectionDate).toLocaleString() : 'Not scheduled yet'}
                  </span>
                )}
              </td>
              <td>
                {request.fileName && (
                  <button onClick={() => downloadFile(request.fileName)}>
                    {request.fileName}
                  </button>
                )}
              </td>
              <td>
                {editedDates[request.inspectionId] !== undefined ? (
                  <>
                    <button onClick={() => handleSaveDate(request.inspectionId)}>Save</button>
                    <button onClick={() => setEditedDates((prevDates) => ({ ...prevDates, [request.inspectionId]: undefined }))}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <button onClick={() => handleEditDate(request.inspectionId, new Date(request.inspectionDate).toISOString().slice(0, 16))}>
                    Schedule Inspection
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InspectionRequestTable;
