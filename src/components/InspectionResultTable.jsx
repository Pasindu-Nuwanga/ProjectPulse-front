import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./InspectionResultTable.css";

const InspectionResultTable = ({ projectId }) => {
  const [inspectionResults, setInspectionResults] = useState([]);
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');

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
        .get(`http://localhost:8090/inspection/result/byPhase/${selectedPhase}`)
        .then((response) => {
          setInspectionResults(response.data);
        })
        .catch((error) => {
          console.error('Error fetching inspection requests:', error);
        });
    }
  }, [selectedPhase]);

  const downloadFile = (defectFileName) => {
    axios({
      url: `http://localhost:8090/inspection/result/download/${defectFileName}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', defectFileName);
      document.body.appendChild(link);
      link.click();
    });
  };


  // Sort inspection requests by inspection request date in descending order
  const sortedInspectionResults = inspectionResults.slice().sort((a, b) => {
    return new Date(b.inspectionResultDate) - new Date(a.inspectionResultDate);
  });


  return (
    <div className="inspection-result-table-container">
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

      <div className='table-scroll'>
        <table className="inspection-result-table">
          <thead>
            <tr>
              <th>Inspection Name</th>
              <th>Phase Section</th>
              <th>Construction Type</th>
              <th>Result Received Date</th>
              <th>Inspection Status</th>
              <th>Comments</th>
              <th>Defect captures</th>
            </tr>
          </thead>
          <tbody>
            {sortedInspectionResults.map((request) => (
              <tr key={request.inspectionId}>
                <td>{request.inspections ? request.inspections.inspectionName : ''}</td>
                <td>{request.inspections ? request.inspections.phaseSection : ''}</td>
                <td>{request.inspections ? request.inspections.constructionType : ''}</td>
                <td>{new Date(request.inspectionResultDate).toLocaleString()}</td>
                <td>{request.inspectionStatus}</td>
                <td>{request.comments}</td>
                
                <td>
                  {request.defectFileName && (
                    <button onClick={() => downloadFile(request.defectFileName)} className="defFile-download-btn">
                      <i className='fas fa-download'/>{" " + request.defectFileName}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};

export default InspectionResultTable;
