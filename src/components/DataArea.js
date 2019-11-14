import React, { useState, useEffect } from "react";
import DataTable from "./DataTable";
import Nav from "./Nav";
import API from "../utils/API";
import "../styles/DataArea.css";

export default function DataArea() {

  const [state, setState] = useState({
    users: [{}],
    order: "descend",
    filteredUsers: [{}],
    headings: [
      { name: "Image", width: "10%" },
      { name: "Name", width: "10%" },
      { name: "Phone", width: "20%" },
      { name: "Email", width: "20%" },
      { name: "DOB", width: "10%" }
    ],
  })

  useEffect(() => {
    API.getUsers().then(results => {
      setState({
        users: results.data.results,
        order: state.order,
        filteredUsers: results.data.results,
        headings: state.headings
      })
    })
  }, [])


  // constructor() {
  //   super();
  //   this.state = {
  //     users: [{}],
  //     order: "descend",
  //     filteredUsers: [{}],
  //     headings: [
  //       { name: "Image", width: "10%" },
  //       { name: "Name", width: "10%" },
  //       { name: "Phone", width: "20%" },
  //       { name: "Email", width: "20%" },
  //       { name: "DOB", width: "10%" }
  //     ],

  let handleSort = heading => {

    if (state.order === "descend") {
      setState({
        order: "ascend"
      })
    } else {
      setState({
        order: "descend"
      })
    }

    const compareFnc = (a, b) => {
      if (state.order === "ascend") {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return a[heading].first.localeCompare(b[heading].first);
        } else {
          return a[heading] - b[heading];
        }
      } else {
        // account for missing values
        if (a[heading] === undefined) {
          return 1;
        } else if (b[heading] === undefined) {
          return -1;
        }
        // numerically
        else if (heading === "name") {
          return b[heading].first.localeCompare(a[heading].first);
        } else {
          return b[heading] - a[heading];
        }
      }

    }
    const sortedUsers = this.state.filteredUsers.sort(compareFnc);
    setState({ filteredUsers: sortedUsers });
  }

  let handleSearchChange = event => {
    console.log(event.target.value);
    const filter = event.target.value;
    const filteredList = state.users.filter(item => {
      // merge data together, then see if user input is anywhere inside
      let values = Object.values(item)
        .join("")
        .toLowerCase();
      return values.indexOf(filter.toLowerCase()) !== -1;
    });
    setState({ 
      filteredUsers: filteredList,// Set the filtered Users
      // Ensure that the state remains the same for other variables:
      headings: state.headings,
      users: state.users,
      order: state.order
    });
  }




  return (
    <>
      <Nav handleSearchChange={handleSearchChange} />
      <div className="data-area">
        <DataTable
          headings={state.headings}
          users={state.filteredUsers}
          handleSort={handleSort}
        />
      </div>
    </>
  )
}
