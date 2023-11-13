import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InspectionRequestForm = ({ projectId }) => {
  const [inspectionName, setInspectionName] = useState('');
  const [phaseSection, setPhaseSection] = useState('');
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [constructionType, setConstructionType] = useState('');
  const [fileAttachment, setFileAttachment] = useState(null);
  
  
  const [inspectionDate, setInspectionDate] = useState(
    new Date().toISOString().split('T')[0] + 'T00:00' // Set to current date with time
  );

  const currentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${(now.getMonth() + 1)}`.padStart(2, '0');
    const day = `${now.getDate()}`.padStart(2, '0');
    const hours = `${now.getHours()}`.padStart(2, '0');
    const minutes = `${now.getMinutes()}`.padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const [inspectionRequestDate] = useState(currentDateTime());
  

  useEffect(() => {
    // Fetch phases based on the selected project ID
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

  const handleFileChange = (e) => {
    setFileAttachment(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('inspectionName', inspectionName);
    formData.append('phaseSection', phaseSection);
    formData.append('phaseName', selectedPhase);
    formData.append('constructionType', constructionType);
    formData.append('fileAttachment', fileAttachment);
    formData.append('inspectionRequestDate', new Date(inspectionRequestDate).toISOString());
    formData.append('inspectionDate', new Date(inspectionDate).toISOString());

    try {
      await axios.post('http://localhost:8090/inspection/request', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Inspection request submitted successfully!');
    } catch (error) {
      console.error('Error submitting inspection request:', error);
    }
  };

  return (
    <div>
      <h2>Inspection Request</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Inspection Name:</label>
          <input type="text" value={inspectionName} onChange={(e) => setInspectionName(e.target.value)} required />
        </div>
        <div>
          <label>Phase Section:</label>
          <input type="text" value={phaseSection} onChange={(e) => setPhaseSection(e.target.value)} required />
        </div>
        <div>
          <label>Select Phase:</label>
          <select value={selectedPhase} onChange={(e) => setSelectedPhase(e.target.value)} required>
            <option value="" disabled>
              Select a phase
            </option>
            {phases.map((phase) => (
              <option key={phase.phaseId} value={phase.phaseName}>
                {phase.phaseName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Construction Type:</label>
          <input type="text" value={constructionType} onChange={(e) => setConstructionType(e.target.value)} required />
        </div>
        <div>
          <label>Inspection Request Date:</label>
          <input type="datetime-local" value={inspectionRequestDate} readOnly />
        </div>
        <div>
          <label>File Attachment:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default InspectionRequestForm;