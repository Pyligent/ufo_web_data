var tableData = data;

var columns =["datetime","city","state","country","shape","durationMinutes","comments"];

// Select the submit button
var filter_btn = d3.select("#filter-btn");
var full_btn = d3.select("#full-btn");

// Select the Adavance Search Panel Buuton
var filter_adv_btn = d3.select("#filter-adv-btn");
var add_criteria_btn = d3.select("#add-condition-btn");
var full_adv_btn = d3.select("#full-adv-btn");
var reset_btn = d3.select("#reset-btn");

//init first page: full table shown


var	tbody = d3.select('tbody');

var rows = tbody.selectAll('tr')
              .data(tableData)
              .enter()
              .append('tr');
        
// create a cell in each row for each column
var cells = rows.selectAll('td')
              .data(function (row) {
                return columns.map(function (column) {
                  return {column: column, value: row[column]};
                });
              })
              .enter()
              .append('td')
              .text(function (d) { return d.value; });


// reset function
function reset_form(){
    d3.select("#add-condition-btn").selectAll("li").remove();
    d3.select("#filter_value").property("value"," ");
    filter_condition = [];
    filter_input = [];
    click_flag = false;
}

// update the table
function update_table(data){
 // Update the table
    tbody.selectAll('tr').remove();
    var rows = tbody.selectAll('tr')
             .data(data)
             .enter()
             .append('tr');
       
 // create a cell in each row for each column
    var cells = rows.selectAll('td')
             .data(function (row) {
               return columns.map(function (column) {
                 return {column: column, value: row[column]};
               });
             })
             .enter()
             .append('td')
             .text(function (d) { return d.value; });
 
}

// Select the Full Table Button
full_btn.on("click", function() {
    update_table(tableData);
});  


filter_btn.on("click", function() {

  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#datetime");

  // Get the value property of the input element
  var inputValue = inputElement.property("value");

  console.log(inputValue);

  var filteredData = tableData.filter(record => record.datetime === inputValue);

  update_table(filteredData);
});


// Advanced Search Panel

var filter_condition = [];
var filter_input = [];
var click_flag = false;
  
add_criteria_btn.on("click", function() {

    click_flag = true;
// Prevent the page from refreshing
    d3.event.preventDefault();

// Select the input element and get the raw HTML node
    var inputElement = d3.select("#filter_value");

// Get the value property of the input element
    var inputValue = inputElement.property("value");
// remove the space
    inputValue = inputValue.replace(/\s+/g, '');

// Get the dropdown value
    var criteria_inputElement = d3.select("#query_item");
    var criteria_inputValue = criteria_inputElement.property("value");
    
    d3.select("#add-condition-btn")
    .append("li").text(criteria_inputValue+": "+ inputValue);
    filter_condition.push(criteria_inputValue);
    filter_input.push(inputValue);
    console.log(filter_condition);
    console.log(filter_input);

    console.log(click_flag);

});

full_adv_btn.on("click", function() {
// Update the table

  update_table(tableData);
  
});

reset_btn.on("click", function() {
    reset_form();
    update_table(tableData);
    
  
});

filter_adv_btn.on("click", function(){
    var adv_filter_data = [];
 
// single criteria filter : 
// if no click the add criteria button then click the search
    console.log(click_flag);
    d3.event.preventDefault();

    if (click_flag == false){
        

        // Select the input element and get the raw HTML node
            var inputElement = d3.select("#filter_value");
        
        // Get the value property of the input element
            var inputValue = inputElement.property("value");
        // remove the space
            inputValue = inputValue.replace(/\s+/g, '');
        
        // Get the dropdown value
            var criteria_inputElement = d3.select("#query_item");
            var criteria_inputValue = criteria_inputElement.property("value");
            
            d3.select("#add-condition-btn")
            .append("li").text(criteria_inputValue+": "+ inputValue);
            filter_condition.push(criteria_inputValue);
            filter_input.push(inputValue);
           
    }

    // Criterias Search:
    console.log(filter_condition);
    console.log(filter_input);

    // build the filter object
        var filter_array = {};
        filter_condition.forEach((key, i) => filter_array[key] = filter_input[i]);
        console.log(filter_array);

    // filter the table
        adv_filter_data= tableData.filter(function(item) {
            for (var key in filter_array) {
                if (item[key] === undefined || item[key] != filter_array[key])
                    return false;
                }
            return true;
            });
   
   console.log("adv_filter_data",adv_filter_data);

   update_table(adv_filter_data);
   reset_form();
   
});



