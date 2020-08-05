<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    /**
     * fetch data for sales line chart
     *
     * @param Request $request
     * @return object response 
     */
    public function salesChart(Request $request)
    {
        $startDate = date($request->input('startDate'));
        $endDate =date($request->input('endDate'));

        // get sales based on date range
        $sales = DB::table('sales')
                        ->select('date', DB::raw('SUM(products.price) as total'))
                        ->join('products', 'sales.product_name', '=', 'products.name')
                        ->whereBetween('date', [$startDate, $endDate])
                        ->groupBy('date')
                        ->get();
       
        $category = [];
        $value = [];       

        // generate line chart data
        foreach ($sales as $sale) {
            array_push($category, $sale->date);
            array_push($value, $sale->total);
         }

       return response()->json([
           'category' => $category,
           'value' => $value
       ]);
    }

    /**
     * fetch data for data grid
     *
     * @param Request $request
     * @return object response
     */
    public function dataGrid(Request $request)
    {
        $startDate = date($request->input('startDate'));
        $endDate =date($request->input('endDate'));

        // get sales based on date range
        $sales = DB::table('sales')
                        ->select('date', 'products.price', 'sales.customer_name', 'sales.sales_person')
                        ->join('products', 'sales.product_name', '=', 'products.name')
                        ->whereBetween('date', [$startDate, $endDate])
                        ->get();
        
        $data = [];
        $customers = [];
        $employees = [];

        foreach ($sales as $key => $sale) {
            $record = [
                'key' => $key,
                'customer' => $sale->customer_name,
                'employee' => $sale->sales_person,
                'price' => $sale->price,
                'date' => $sale->date
            ];
            array_push($data, $record); // grid data
            array_push($customers, $sale->customer_name);
            array_push($employees, $sale->sales_person);
         }

         // get unique comstomers and employees
         $customers = array_unique($customers);
         $employees = array_unique($employees);

         $customerFilters = [];
         $employeeFilters = [];

         // generate customer filters
         foreach ($customers as $customer) {
             $filter = [
                 'text' => $customer,
                 'value' => $customer
             ];

             array_push($customerFilters, $filter);
         }

         // generate employee filters
         foreach ($employees as $employee) {
            $filter = [
                'text' => $employee,
                'value' => $employee
            ];
            array_push($employeeFilters, $filter);
        }

        return  response()->json([
            'gridData' => $data,
            'customerFilters' => $customerFilters,
            'employeeFilters' => $employeeFilters
        ]);
    }
}
