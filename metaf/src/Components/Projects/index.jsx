// Projects.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Modal = ({ isOpen, onClose, onSubmit, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose}>X</button>
        <form onSubmit={onSubmit}>
          {children}
        </form>
      </div>
    </div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectFile, setProjectFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get('/api/projects/')
      .then((response) => setProjects(response.data))
      .catch((error) => console.error('Error fetching projects', error));
  }, []);

  const openModal = (index = null) => {
    if (index !== null) {
      const projectToEdit = projects[index];
      setProjectName(projectToEdit.name);
      setDescription(projectToEdit.description);
      setProjectLink(projectToEdit.link);
      setStartDate(projectToEdit.start_date);
      setEndDate(projectToEdit.end_date);
      setProjectFile(projectToEdit.file);
      setEditIndex(index);
    } else {
      setProjectName('');
      setDescription('');
      setProjectLink('');
      setStartDate('');
      setEndDate('');
      setProjectFile(null);
      setEditIndex(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();

    const newProject = {
      name: projectName,
      description,
      link: projectLink,
      start_date: startDate,
      end_date: endDate,
      file: projectFile,
    };

    try {
      const response = await axios.post('/api/projects/', newProject, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });
      setProjects([...projects, response.data]);
      closeModal();
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`/api/projects/delete/${id}/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setProjects(projects.filter((project) => project.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <button onClick={() => openModal()}>Add Project</button>
      <ul>
        {projects.map((project, index) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <button onClick={() => openModal(index)}>Edit</button>
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleAddProject}>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="url"
          placeholder="Project Link"
          value={projectLink}
          onChange={(e) => setProjectLink(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setProjectFile(e.target.files[0])}
        />
        <button type="submit">{editIndex !== null ? 'Update' : 'Add'} Project</button>
      </Modal>
    </div>
  );
};

export default Projects;
