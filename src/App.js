import React from 'react'
import './App.css';
import MaterialTable from 'material-table';
import axios from 'axios';


function App() {

  const columns = [
    {title : 'ID' , field : 'id' , headerStyle : {background : 'red' , color : '#ffffff'}} ,
    {title : 'TITLE' , field : 'title'} ,
    {title : 'MESSAGE' , field : 'body'}
  ]


  return (
    <div className="App">
      <MaterialTable
          title = "data table"
          columns = {columns}
          options={{
              paging:true,
              pageSize:10,
              emptyRowsWhenPaging: false,  
              pageSizeOptions:[],
              rowStyle : {background : '#eee'}   
          }}
          data={query =>
              new Promise((resolve, reject) => {
                  let URL = 'https://jsonplaceholder.typicode.com/posts?'
                  if (query.search) {
                    URL += `q=${query.search}` 
                  }
                  if (query.orderBy) {
                    URL += `&_sort=${query.orderBy.field}&_order=${query.orderDirection}`
                  }
                  URL += `&_page=${query.page + 1}`
                  URL += `&_limit=${query.pageSize}`
                  axios.get(URL)
                  .then(res => {
                    console.log(res.data)
                    resolve({
                        data: res.data, 
                        page: query.page,
                        totalCount: 100 ,
                    });
                  })
                  .catch(err => {
                    console.log(err)
                  })
              })
          }
      />;
    </div>
  );
}

export default App;
