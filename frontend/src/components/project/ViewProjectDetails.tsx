import React from 'react';
import { RowData } from './ProjectTable';

interface ViewProjectDetailsProps {
  projectName: string | null;
  rows: RowData[];
}

const ViewProjectDetails: React.FC<ViewProjectDetailsProps> = ({ projectName, rows }) => {
  const selectedProject = rows.find(row => row.projectName === projectName);

  if (!selectedProject) {
    return <div>No project details available.</div>;
  }

  return (
    <div>
      <h2>Project Details for: {selectedProject.projectName}</h2>
      <p>Project Manager: {selectedProject.projectManager}</p>
      <p>Client: {selectedProject.client}</p>
      {/* Display other project details here */}
    </div>
  );
};

export default ViewProjectDetails;
