
##### 1. Dump scripts : 'dbdump/mysql'
##### 2. Initial   ersion (master branch) : https://salty-thicket-11905.herokuapp.com
##### 3. Improved version (dev branch) : https://tranquil-caverns-45960.herokuapp.com
   - refactor date formatting related code
     - unify date format in <strong>"date-range-picker"</strong> component to be <strong>'yyyy-mm-dd'</strong>, no date is in format 'mm/dd/yyyy' any more, compared to initial version
     - only one date formatting function would be used, which is <strong>dateObjToString (obj, format='yyyy-mm-dd') => string</strong>
     - <strong>startDate</strong> & <strong>endDate</strong> in "date-range-picker" always are <strong>objects</strong>, no chance to be strings any more
   - sort sales by date (UI)
   - loading message when fetching data (UI)
   - dynamically config footer position (UI)
   - improve formatting in line chart (UI)
     - number => currency 
     - add total amount
     - style subtitle
     - tooltip format
   - improve format in data grid
     - column 'Price' => 'Price (AUD)' (UI)
   - rename 'updateFilters' to 'createColumns' in DataGrid componnet