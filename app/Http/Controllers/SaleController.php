<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function salesChart(Request $request)
    {
        $startDate = date($request->input('startDate'));
        $endDate =date($request->input('endDate'));

        $sales = DB::table('sales')
                        ->select('date', DB::raw('SUM(products.price) as total'))
                        ->join('products', 'sales.product_name', '=', 'products.name')
                        ->whereBetween('date', [$startDate, $endDate])
                        ->groupBy('date')
                        ->get();

       
        $category = [];
        $value = [];       
        
        foreach ($sales as $sale) {
            array_push($category, $sale->date);
            array_push($value, $sale->total);
         }



       return json_encode([
           'category' => $category,
           'value' => $value
       ]);
    }

    public function dataGrid(Request $request)
    {
        $startDate = date($request->input('startDate'));
        $endDate =date($request->input('endDate'));

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
            array_push($data, $record);
            array_push($customers, $sale->customer_name);
            array_push($employees, $sale->sales_person);
         }

         $customers = array_unique($customers);
         $employees = array_unique($employees);

         $customerFilters = [];
         $employeeFilters = [];

         foreach ($customers as $customer) {
             $filter = [
                 'text' => $customer,
                 'value' => $customer
             ];

             array_push($customerFilters, $filter);
         }

         foreach ($employees as $employee) {
            $filter = [
                'text' => $employee,
                'value' => $employee
            ];
            array_push($employeeFilters, $filter);
        }




        return json_encode([
            'gridData' => $data,
            'customerFilters' => $customerFilters,
            'employeeFilters' => $employeeFilters
        ]);
    }
}
