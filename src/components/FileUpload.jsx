import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileUpload = ({projectId}) => {
  const [file, setFile] = useState(null);
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [uploadMessage, setUploadMessage] = useState('');
  
  

  useEffect(() => {
    // Fetch phases based on the selected project ID
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

    axios.post('http://localhost:8090/uploadFile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        setUploadMessage('File uploaded successfully!');
        // Optionally, you can perform some action after successful upload
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        setUploadMessage('Error uploading file. Please try again.');
      });
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Choose File</label>
          <input type="file" className="form-control" id="file" onChange={onFileChange} />
        </div>
        <div className="mb-3">
          <label>Select Phase:</label>
          <select
            value={selectedPhase}
            onChange={(e) => setSelectedPhase(e.target.value)}
            required
          >
            <option value="" disabled>Select a phase</option>
            {phases.map(phase => (
              <option key={phase.phaseId} value={phase.phaseName}>
                {phase.phaseName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
      {uploadMessage && <div className="alert alert-info mt-2">{uploadMessage}</div>}
    </div>
  );
};

export default FileUpload;
