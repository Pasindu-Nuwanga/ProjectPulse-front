import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./FileList.css";

const FileList = ({ projectId, role }) => {
  const [phases, setPhases] = useState([]);
  const [selectedPhase, setSelectedPhase] = useState('');
  const [files, setFiles] = useState([]);
  const [downloadMessage, setDownloadMessage] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState(null);

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
    const shouldDownload = window.confirm(`Are you sure you want to download the file '${documentName}'?`);

    if (shouldDownload) {
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
   }
  };

  const handleDelete = (documentId, documentName) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete the file '${documentName}'?`);

    if (shouldDelete) {
      axios.delete(`http://localhost:8090/deleteFile/${documentId}`)
        .then(response => {
          // ... (your existing delete code)
          setDownloadMessage(null); // Clear the download message when a delete occurs
          setDeleteMessage('File deleted successfully!');
        })
        .catch(error => {
          console.error('Error deleting file:', error);
          setDeleteMessage('Error deleting file. Please try again.');
          setDownloadMessage(null); // Clear the download message if there was an error deleting
        });
    }
  };  
  

  return (
    <div className="file-list-container">
      <h2 className="file-list-heading">File List</h2>
      <div className="mb-3">
        <label className="file-list-label">Select Phase:</label>
        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
          required
          className="file-list-select" 
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
      
      <div className='table-background'>
      <table className="file-list-table">
        <tbody>
          {files.map((file) => (
            <tr key={file.documentName}>
              <td className='file-name'>{file.documentName}</td>
              <td>
                <button
                  onClick={() => handleDownload(file.documentId, file.documentName)}
                  className="file-list-btn file-list-btn-download"
                >
                  <i className='fas fa-download'/>
                </button>
              </td>
              {(role === 4 &&<td>
                <button
                  onClick={() => handleDelete(file.documentId, file.documentName)}
                  className="file-list-btn file-list-btn-delete"
                >
                <i className='fas fa-trash'/>
                </button>
              </td>)}
              <hr/>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {downloadMessage && (
        <div className="file-list-alert file-list-alert-success mt-2">
          {downloadMessage}
        </div>
      )}

      {deleteMessage && (
        <div className="file-list-alert file-list-alert-success mt-2">
          {deleteMessage}
        </div>
      )}
    </div>
  );
};

export default FileList;