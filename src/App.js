import React from "react";
import ReactDOM from "react-dom";
import { Search } from "semantic-ui-react";
import ReactTable from "react-table";
import axios from "axios";
import "react-table/react-table.css";
import "./styles.css";
let finalData = [];
let columns = [
  {
    Header: "First Name",
    accessor: "firstName",
    sortable: true,
    show: true,
    displayValue: " First Name"
  },
  {
    Header: "Status",
    accessor: "status",
    sortable: true,
    show: true,
    displayValue: "Status "
  },
  {
    Header: "Visits",
    accessor: "visits",
    sortable: true,
    show: true,
    displayValue: " Visits "
  }
];
export default class App extends React.Component {
  constructor(props) {
    super(props);
    // initial values
    this.state = {
      data: [],
      columns: [],
      searchInput: ""
    };
  }

  componentDidMount() {
    // get the data
    axios
      .get("https://mocki.io/v1/22f2e97c-011d-4957-b90b-7a739c3270a1")
      .then((res) => {
        console.log(res);
        this.setState({ data: res.data });
        finalData = res.data;
      })
      .catch((err) => console.log(err));
    this.setState({ columns });
  }

  handleChange = (event) => {
    this.setState({ searchInput: event.target.value }, () => {
      this.globalSearch();
    });
  };

  globalSearch = () => {
    let { searchInput } = this.state;
    let filteredData = finalData.filter((value) => {
      return (
        value.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.status.toLowerCase().includes(searchInput.toLowerCase()) ||
        value.visits
          .toString()
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      );
    });
    this.setState({ data: filteredData });
  };

  render() {
    let { data, columns, searchInput } = this.state;
    return (
      <div className="w-80">
        <p>User Data</p>
        <Search
          placeholder="Search..."
          name="searchInput"
          value={searchInput}
          onSearchChange={this.handleChange}
          label="Search"
          results
        />
        {/* render the table ui */}
        <ReactTable
          data={data}
          columns={columns}
          style={{
            textAlign: "center"
          }}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
