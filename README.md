
##### 1. Dump scripts : 'dbdump/mysql'
##### 2. Initial   ersion (master branch) : https://salty-thicket-11905.herokuapp.com (Please pick ranges before AUG 2020, because no sales data after July 2020)
##### 3. Improved version (dev branch) : https://tranquil-caverns-45960.herokuapp.com (Please pick ranges before AUG 2020, because no sales data after July 2020)
   - refactor date formatting related code (reduce repetition)
     - unify date format in <strong>"date-range-picker"</strong> component to be <strong>'yyyy-mm-dd'</strong>, no date is in format 'mm/dd/yyyy' any more, compared to initial version
     - only one date formatting function would be used, which is <strong>dateObjToString (obj, format='yyyy-mm-dd') => string</strong>
     - <strong>startDate</strong> & <strong>endDate</strong> in "date-range-picker" always are <strong>objects</strong>, no chance to be strings any more
   - sort sales by date (UI)
   - loading message when fetching data (UI)
   - dynamically config footer position (UI)
     - remove PHP header and footer templates
     - add Header and Footer vue compoment
     - add EventBust for communication among components
   - improve formatting in line chart (UI)
     - number => currency 
     - add total amount
     - style subtitle
     - tooltip format
   - improve format in data grid
     - column 'Price' => 'Price (AUD)' (UI)
   - rename 'updateFilters' to 'createColumns' in DataGrid componnet (accurate naming)
   - unify naming of 'this' within vue component (accurate naming)
     - const vm = this // not const self = this any more


##### 4. Unimplemented Improvements
###### 4.1 Database normalization based on test data
1. 'customer' table
   - remove 'full_name' column
   - 'gender' should be not nullable
   - corrected migration schema
  ```php
   Schema::create('customers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('gender');
            $table->string('street');
            $table->string('city');
            $table->timestamps();
        });
  ```

2. 'sales' table
   - add automatic increment column 'id' as its primary key
   - add column 'qty' defaulted to 1
   - 'invoiceid' should be a universally unique identifier(UUID) of VARCHAR, this column should be indexed, because it would be used frequently
   - 'product_name' => 'product_id' as foreign key, which is 'id' in 'products' table
   - 'sales_person' => 'employee_id' as foreign key, which is 'id' in 'employees' table
   - 'customer_name' => 'customer_id' as foreign key, which is 'id' in 'customers' table
   - corrected migration schema
  
  ```php
   Schema::create('sales', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('invoiceid')->unique();
            $table->bigInteger('product_id');
            $table->integer('qty')->default(1);
            $table->bigInteger('employee_id');
            $table->bigInteger('customer_id');
            $table->date('date');
            $table->timestamps();
        });
  ```

3. 'products' table
    - 'productId' => 'id' as its primary key
    - corrected migration schema
  
  ```php
   Schema::create('products', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->decimal('price', 10, 2);
            $table->timestamps();
        });
  ```

4. 'employee' table
   - table name 'employee' => 'employees'
   - corrected migration schema

```php
Schema::create('employees', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->timestamps();
        });
```
  
###### 4.2 Add neccessory error handling
1. System Internal Exception
2. Invalid Request Exception
3. Feedbacks to Users
