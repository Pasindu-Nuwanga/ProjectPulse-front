import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FileUpload.css";

const FileUpload = ({ projectId }) => {
  const [file, setFile] = useState(null);
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadDate, setUploadDate] = useState(new Date().toISOString());

  useEffect(() => {
    const projectId = localStorage.getItem('projectId');
    axios.get(`http://localhost:8090/api/projects/${projectId}/phases`)
      .then(response => {
        setPhases(response.data);
      })
      .catch(error => {
        console.error('Error fetching phases:', error);
      });
  }, [projectId]);

  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    if (!file) {
      setUploadMessage('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('phaseName', selectedPhase);
    formData.append('uploadDate', uploadDate);
    formData.append('alertMessage', alertMessage);

    axios.post('http://localhost:8090/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        setUploadMessage('File uploaded successfully!');
        setAlertMessage(response.data.alertMessage);
        setUploadDate(response.data.uploadDate);

        const timeoutId = setTimeout(() => {
          setUploadMessage('');
          setAlertMessage('');
          setUploadDate(new Date().toISOString());
        }, 5000);
        setSelectedPhase('');

        return () => clearTimeout(timeoutId);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploadMessage('Error uploading file. Please try again.');
      });
  };

  return (
    <div className="file-upload-container">
      <h2>Upload Files</h2>

      {uploadMessage && <div className="alert-alert-info mt-2">{uploadMessage}</div>}

      <form onSubmit={onFormSubmit} className="file-upload-form">

        <div className="mb-3">
          <label>Select Phase:</label>
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            required
            className="form-select"
          >
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

        <div className="mb-3">
          <label htmlFor="file" className="form-label">
            Choose File
          </label>
          <input type="file" className="form-control" id="file" onChange={onFileChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="alertMessage" className="form-label">
            Alert Message
          </label>
          <input
            type="text"
            id="alertMessage"
            className="form-control"
            value={alertMessage}
            onChange={(e) => setAlertMessage(e.target.value)}
          />
        </div>

        {/* Display uploadDate */}
      <div className="mb-3">
        <strong>Upload Date:</strong> {new Date(uploadDate).toLocaleString()}
      </div>

        <button type="submit" className="file-upload-btn">
          Upload
        </button>
      </form>

      
    </div>
  );
};

export default FileUpload;
