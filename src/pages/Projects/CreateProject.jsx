import React, { useState } from 'react'
import apiClient from '../../../service/ApiClient';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/Context';
import "../auth/style.css";
function CreateProject() {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState("");

	const handleProject = async (e) => {
		e.preventDefault();
		setError(null);
		setSuccessMsg("");
		if (!name || !description) return setError("all fields are required !");
		try {
			const res = await apiClient.createProject(name, description);
			if (res.success) {
				console.log(res);
				console.log(res.message);
				return setSuccessMsg(res.message);
			}
		
		} catch (error) {
			console.log(error);
			setError(error.message);
		}

	}

  return (
    <>      
      <form onSubmit={handleProject} className="form">
        <h2>create a Project</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="title"
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="description"
        />

        <h4>
		  {error && <span className="error">{error}</span>}
		  {successMsg && <span className="sucess">{successMsg}</span>}
        </h4>
        <button type="submit">Create Project</button>

        <div className="mt-4 text-sm text-center">
          <div>
            <p>
              See all projects:{" "}
              <Link to="/all-projects" className="redirect">
				All Projects
              </Link>
            </p>
          </div>
          <div>
			<p>
			  Go To Home:{" "}
			  <Link to="/" className="redirect">
				Click Here
			  </Link>
			</p>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateProject