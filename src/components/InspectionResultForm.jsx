import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./InspectionResultForm.css";

function InspectionResultForm({projectId, phaseId}) {

  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [inspections, setInspections] = useState([]);
  const [selectedInspection, setSelectedInspection] = useState('');
  const [inspectionStatus, setInspectionStatus] = useState('');
  const [comments, setComments] = useState('');
  const [defectFileAttachment, setDefectFileAttachment] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
    
  
    const currentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = `${(now.getMonth() + 1)}`.padStart(2, '0');
      const day = `${now.getDate()}`.padStart(2, '0');
      const hours = `${now.getHours()}`.padStart(2, '0');
      const minutes = `${now.getMinutes()}`.padStart(2, '0');
    
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    
    const [inspectionResultDate] = useState(currentDateTime());

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


    //   useEffect(() => {
    //     // Fetch phases based on the selected project ID
    //     const phaseId = localStorage.getItem('phaseId');
    //     axios
    //       .get(`http://localhost:8090/api/phases/${phaseId}/inspections`)
    //       .then((response) => {
    //         setInspections(response.data);
    //       })
    //       .catch((error) => {
    //         console.error('Error fetching phases:', error);
    //       });
    //   }, [phaseId]);

    const getInspectionByPhaseId = (phaseId) =>{
        axios
          .get(`http://localhost:8090/api/phases/${phaseId}/inspections`)
          .then((response) => {
            setInspections(response.data);
          })
          .catch((error) => {
            console.error('Error fetching phases:', error);
          });
    }

      const handleFileChange = (e) => {
        setDefectFileAttachment(e.target.files[0]);
      };

      const phaseChangeHandler = (e) =>{
        setSelectedPhase(e.target.value)
        getInspectionByPhaseId(e.target.value)
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('phaseName', selectedPhase);
        formData.append('inspectionName', selectedInspection);
        formData.append('inspectionStatus', inspectionStatus);
        formData.append('comments', comments);
        formData.append('defectFileAttachment', defectFileAttachment);
        formData.append('inspectionResultDate', new Date(inspectionResultDate).toISOString());

        try {
            const response = await axios.post('http://localhost:8090/inspection/result', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
            console.log('Inspection is requested:', response.data);
            // Set the success message upon successful phase creation
            setSuccessMessage('Inspection result was sent successfully!');
      
            // Optionally, reset the form fields after successful submission
            setSelectedPhase('');
            setSelectedInspection('');
            setComments('');

            // Clear the success message after 5 seconds
            setTimeout(() => {
            setSuccessMessage(null);
            }, 5000);

          } catch (error) {
            console.error('Error creating inspection:', error);
          }
        };



    return (
        
    <div className="inspection-result-form-container">
            
        <form onSubmit={handleSubmit} className="inspection-result-form">

        <div className="form-group">
          <label className="form-label">Select Phase:</label>
          <select
            value={selectedPhase}
            // onChange={(e) => setSelectedPhase(e.target.value)}
            onChange={phaseChangeHandler}
            required
            className="form-select"
          >
            <option value="" disabled>
              Select a phase
            </option>
            {phases.map((phase) => (
              <option key={phase.phaseId} value={phase.phaseId}>
                {phase.phaseName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Select Inspection:</label>
          <select
            value={selectedInspection}
            onChange={(e) => setSelectedInspection(e.target.value)}
            required
            className="form-select"
            disabled={!selectedPhase} // Disable if no phase is selected
          >
            <option value="" disabled>
              {selectedPhase ? 'Select an inspection' : 'Select a phase first'}
            </option>
            {inspections.map((inspection) => (
              <option key={inspection.inspectionId} value={inspection.inspectionName}>
                {inspection.inspectionName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Inspection Result Date:</label>
          <input
            type="datetime-local"
            value={inspectionResultDate}
            readOnly
            className="form-control"
          />
        </div>

        <div className="form-group">
        <label className="mt-4">Inspection Status:</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inspectionStatus"
            id="notApproved"
            value="Not Approved"
            checked={inspectionStatus === 'Not Approved'}
            onChange={() => setInspectionStatus('Not Approved')}
          />
          <label className="form-check-label" htmlFor="notApproved">
            Not Approved
          </label>
        </div>

        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inspectionStatus"
            id="approved"
            value="Approved"
            checked={inspectionStatus === 'Approved'}
            onChange={() => setInspectionStatus('Approved')}
          />
          <label className="form-check-label" htmlFor="approved">
            Approved
          </label>
        </div>
      </div>

        <div className="form-group">
          <label className="form-label">Comments:</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            required
            className="form-control"
            placeholder="Enter comments..."
            // disabled={inspectionStatus === 'Approved'}
          />
        </div>

        <div className="form-group">
          <label className="form-label">File Attachment:</label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="form-control-file"
            // disabled={inspectionStatus === 'Approved'}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>

        </form>
        
        {successMessage && (
        <div className="inspection-request-success-message">{successMessage}</div>
      )} 

    </div>

    );
};
  
  
  export default InspectionResultForm;