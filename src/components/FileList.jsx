import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileList = ({ projectId }) => {
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [files, setFiles] = useState([]);
  const [downloadMessage, setDownloadMessage] = useState(null);

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

  useEffect(() => {
    // Fetch files based on the selected phase ID
    if (selectedPhase) {
      axios.get(`http://localhost:8090/api/phases/${selectedPhase}/documents`)
        .then(response => {
          setFiles(response.data);
        })
        .catch(error => {
          console.error('Error fetching files:', error);
        });
    }
  }, [selectedPhase]);

  const handleDownload = (documentId, documentName) => {
    const downloadUrl = `http://localhost:8090/downloadFile/${documentId}`;
    axios.get(downloadUrl, {
      responseType: 'blob',
    })
    .then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', documentName);
      document.body.appendChild(link);
      link.click();
      setDownloadMessage('File downloaded successfully!');
    })
    .catch(error => {
      console.error('Error downloading file:', error);
      setDownloadMessage('Error downloading file. Please try again.');
    });
  };

  const handleDelete = (documentId, documentName) => {
    axios.delete(`http://localhost:8090/deleteFile/${documentId}`)
      .then(response => {
        // Remove the deleted file from the state
        setFiles(prevFiles => prevFiles.filter(file => file.documentId !== documentId));
        console.log('File deleted successfully:', response.data);
      })
      .catch(error => {
        console.error('Error deleting file:', error);
      });
  };
  

  return (
    <div>
      <div className="mb-3">
        <label>Select Phase:</label>
        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
          required
        >
          <option value="" disabled>Select a phase</option>
          {phases.map(phase => (
            <option key={phase.phaseId} value={phase.phaseId}>
              {phase.phaseName}
            </option>
          ))}
        </select>
      </div>
      <h2>File List</h2>
      <ul>
        {files.map(file => (
          <li key={file.documentName}>
            {file.documentName}
            <button onClick={() => handleDownload(file.documentId, file.documentName)} className="btn btn-secondary ml-2">
              Download
            </button>
            <button onClick={() => handleDelete(file.documentId, file.documentName)} className="btn btn-danger ml-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
      {downloadMessage && <div className="alert alert-success mt-2">{downloadMessage}</div>}
    </div>
  );
};

export default FileList;