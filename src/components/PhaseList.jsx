import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhaseList.css';

const PhaseList = ({ projectId, role }) => {
  const [phases, setPhases] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);

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

  const handleEditClick = (phase) => {
    setSelectedPhase(phase);
    setShowEditModal(true);
  };

  const handleEditPhaseName = (newPhaseName) => {
    axios
      .put(`http://localhost:8090/edit/phases/${selectedPhase.phaseId}`, { phaseName: newPhaseName })
      .then((response) => {
        console.log(response.data);
        setUploadMessage('Phase name updated successfully!');
        setShowEditModal(false);

          // Reload the current web page
          window.location.reload();
      })
      .catch((error) => {
        console.error('Error editing phase name:', error);
        setUploadMessage('Failed to edit phase name. Please try again.');
        setShowEditModal(false);
      });
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
  };

  return (
    <>
    <div className="phase-list-container">
      <h2>Phases List</h2>
      <hr/>

      {uploadMessage && <div className="alert-alert-info mt-2">{uploadMessage}</div>}

      <div className="phases-list">
        <ul>
          {phases.map((phase) => (
            <li key={phase.phaseId}>
              <div>
                {phase.phaseName}
              </div>
              <div>
                {role===2 && (<button className="edit" onClick={() => handleEditClick(phase)}>
                  Rename
                </button>)}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* Edit Modal */}
    {showEditModal && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <label>
              New Phase Name:
              <hr/>
              <input type="text" value={selectedPhase.phaseName} onChange={(e) => setSelectedPhase({ ...selectedPhase, phaseName: e.target.value })} />
            </label>
            <div className="edit-modal-buttons">
              <button className='edit-save' onClick={() => handleEditPhaseName(selectedPhase.phaseName)}>Save</button>
              <button className='edit-cancel' onClick={handleCancelEdit}>Cancel</button>
            </div>
          </div>
        </div>
      )}</>
  );
};

export default PhaseList;
