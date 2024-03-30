import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

function RecipeForm() {
  const [dt, setDt] = useState([]);
  const [eid, setEid] = useState();
  const [rcpdata, setRmpdata] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "",
    prepTime: "",
    cookTime: "",
  });

  const [sortBy, setSortBy] = useState(null);
  const [filterBy, setFilterBy] = useState("");
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRmpdata({ ...rcpdata, [name]: value });
  };

  const fetchItems = async () => {
    try {
      const response = await fetch("http://localhost:3000/recipes");
      const data = await response.json();
      setDt(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const setData = () => {
    if (eid) {
      // Update data
      fetch(`http://localhost:3000/recipes/${eid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rcpdata),
      })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((error) => console.error("Error updating data:", error));
    } else {
      // Insert data
      fetch("http://localhost:3000/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rcpdata),
      })
        .then((res) => res.json())
        .then((newData) => {
          // Update state with the new data
          setDt([...dt, newData]);
          // Set redirect to true
          setRedirect(true);
        })
        .catch((error) => console.error("Error inserting data:", error));
    }
  };

  const editData = (id) => {
    setEid(id);
    fetch(`http://localhost:3000/recipes/${id}`)
      .then((res) => res.json())
      .then((json) => setRmpdata(json))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const removeData = (id) => {
    setDt(dt.filter((item) => item.id !== id));
    fetch(`http://localhost:3000/recipes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rcpdata),
    })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((error) => console.error("Error deleting data:", error));
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
  };

  const handleFilter = (value) => {
    setFilterBy(value);
  };

  const filteredAndSortedData = () => {
    let sortedData = [...dt];
    if (sortBy) {
      sortedData.sort((a, b) => {
        if (sortBy === "name") {
          return (
            (a.title?.toLowerCase() ?? "") - (b.title?.toLowerCase() ?? "")
          );
        } else if (sortBy === "dateAdded") {
          return new Date(b.dateAdded) - new Date(a.dateAdded);
        }
      });
    }

    let filteredData = sortedData.filter((item) => {
      if (filterBy) {
        return (
          (item.category?.toLowerCase()?.includes(filterBy.toLowerCase()) ??
            false) ||
          (item.dietaryPreferences
            ?.toLowerCase()
            ?.includes(filterBy.toLowerCase()) ??
            false)
        );
      }
      return true;
    });

    return filteredData;
  };

  // Redirect to RecipeForm if redirect is true
  if (redirect) {
    return <RecipeForm />;
  }

  return (
    <div>
      <Navbar />
      <div className="frm2">
        <div className="frm">
          <form name="frm" className="fm1" onSubmit={setData} method="post">
            <div>
              {" "}
              <br />
              <label>Sort by:</label>
              <select onChange={(e) => handleSort(e.target.value)}>
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="dateAdded">Date Added</option>
              </select>
              <label>Filter by Category/Dietary Preferences:</label>
              <input
                type="text"
                value={filterBy}
                onChange={(e) => handleFilter(e.target.value)}
              />
            </div>{" "}
            <br /> <br />
            <label>Title:-</label>
            <input
              type="text"
              className="t1"
              id="name"
              name="title"
              value={rcpdata.title}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="">Description:-</label>
            <input
              type="text"
              className="t2"
              id="description"
              name="description"
              value={rcpdata.description}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="">Category:-</label>
            <input
              type="text"
              className="t3"
              id="category"
              name="category"
              value={rcpdata.category}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="">Difficulty:-</label>
            <input
              type="text"
              className="t4"
              id="difficulty"
              name="difficulty"
              value={rcpdata.difficulty}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="">PrepTime:-</label>
            <input
              type="text"
              className="t4"
              id="prepTime"
              name="prepTime"
              value={rcpdata.prepTime}
              onChange={handleChange}
            />
            <br />
            <br />
            <label htmlFor="">CookTime:-</label>
            <input
              type="text"
              className="t4"
              id="cookTime"
              name="cookTime"
              value={rcpdata.cookTime}
              onChange={handleChange}
            />
            <br />
            <br />
            <input
              type="submit"
              className="btn btn-outline-warning fw-bold"
              value={"Save"}
            />
          </form>
        </div>
      </div>
      <br />
      <br />
      <table className="table table-striped">
        {/* Table header */}
        <thead>
          <tr className="fw-bold">
            <td>Id</td>
            <td>Title</td>
            <td>Description</td>
            <td>Category</td>
            <td>Difficulty</td>
            <td>PrepTime</td>
            <td>CookTime</td>
            <td>Action</td>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {filteredAndSortedData().map((i) => {
            return (
              <tr key={i.id}>
                <td>{i.id}</td>
                <td>{i.title}</td>
                <td>{i.description}</td>
                <td>{i.category}</td>
                <td>{i.difficulty}</td>
                <td>{i.prepTime}</td>
                <td>{i.cookTime}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-primary fw-bold"
                    onClick={() => editData(i.id)}
                  >
                    Edit
                  </button>{" "}
                  &nbsp;
                  <button
                    type="button"
                    className="btn btn-outline-danger fw-bold"
                    onClick={() => removeData(i.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RecipeForm;
