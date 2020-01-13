"use strict"
var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");
var mysql = require("mysql");
var http = require("http");
var ejs = require("ejs");
var Employee_department = 0;
var Employee_Id = 0;
var Customer_ID = 0;
var Customer_Name = 0;
var arr=[];
var host_name = 'fall2018dbnamra.cwhp4k4ept2f.us-east-2.rds.amazonaws.com';
var	port_no =  '3306';
var	database_name =  'Food_Manufacturing';
var	usernameRDS = 'ndesai24';
var passwordRDS = 'Gadduki!123.shadi';
var session = require('client-sessions');

app.use(session({
  cookieName: 'session',
  secret: 'random_string_goes_here',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));
app.set('view engine', 'ejs');

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname + "/login.html"))
});

app.get('/query_page',(req,res)=>{
	var queryText = req.query.user;
	var queryText1 = req.query.password
	console.log(queryText);
	console.log(queryText1);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});

	sqlConnection.connect(function(err) {
	  if (err) throw err;
	  console.log("Connected!");
	  var queryText = req.query.user;
	  var queryText1 = req.query.password;
    if(queryText.substring(0,2)!='CU'){
    		//var queryString1='select customer_id from Customer where customer_id="'+queryText+'"';
    	  var queryString = ' inner join Employee as e on e.employee_id = u.user_id where user_id = "'+queryText+'"  and password = "'+queryText1+'" ';
    	  console.log(queryString);
    	  	sqlConnection.query("select user_id,password,designation, department_id from user as u"+queryString,(error,result,field)=>{
    		  if(error) throw error;
    		  var temp = result;
    		  var a = result[0].user_id;
    		  var b = result[0].password;
    		  var c = result[0].designation;
    		  Employee_department = result[0].department_id;
    			Employee_Id = result[0].user_id;
    		  console.log(a);
    		  console.log(b);
    		  console.log(Employee_department);
    		  console.log(result);
    		  if ((a == queryText) && (b == queryText1) && (c == 'Admin')){
    				req.session.user = queryText;
    		  	res.sendFile('/AdminMainPage.html',{root: __dirname });
    		  }else if ((a == queryText) && (b == queryText1) && (c == 'Manager')){
    				req.session.user = queryText;
    		  	res.sendFile('/ManagerMainPage.html',{root: __dirname });
    		  }else if ((a == queryText) && (b == queryText1) && (c == 'Employee')){
    		  	res.sendFile('/EmployeeMainPage.html',{root: __dirname });
    			}
    			else {
    				res.redirect('/login');
    			}

		      });
    }else{
      var queryString = ' inner join Customer as c on c.customer_id = u.user_id where user_id = "'+queryText+'"  and password = "'+queryText1+'" ';
        console.log(queryString);
      	sqlConnection.query("select user_id,password from user as u"+queryString,(error,result,field)=>{
          if(error) throw error;
         var temp = result;
         console.log(temp);
         var a = result[0].user_id;
         var b = result[0].password;
         Customer_ID = result[0].user_id;
        res.sendFile('/CustomerMainPage.html',{root: __dirname });
    });
}
});
});



app.get('/order_product_page_1',(req,res)=>{
	res.sendFile('/order_product_page_1.html',{root: __dirname });
})




app.get('/product_view_page',(req,res)=>{

	var sqlConnection = mysql.createConnection({
	 host:host_name,
		port:port_no,
		database: database_name,
		user:usernameRDS,
		password:passwordRDS

	});
	sqlConnection.connect(function(error){
		if(!!error){
			console.log(error)
		}else{
			sqlConnection.query("select * from product_view",(error,result,field)=>{
				if(error) throw error;
				var temp = result;
				res.render('product_view_table',{result:result});
				 //res.send(temp);

				 sqlConnection.end();
			})
		}
	});
});


app.get('/order_product_page',(req,res)=>{
	var queryText = req.query.product_id;
	var queryText1 = req.query.Quantity;




  var sqlConnection = mysql.createConnection({
	 host:host_name,
		port:port_no,
		database: database_name,
		user:usernameRDS,
		password:passwordRDS
	});
	/*sqlConnection.connect(function(error){
		if(!!error){
			console.log(error)
		}else{
      var queryString = ' where customer_id = "'+Customer_ID+'"';
      console.log(queryString);
			sqlConnection.query("select business_name from Customer"+queryString,(error,result,field)=>{
				if(error) throw error;
				var temp = result;
        console.log(temp);
        arr.push(temp);
        console.log(arr[0]);
        });
			//	res.render('table',{result:result});
				 //res.send(temp);
			}
		});*/

	// var customer_id= req.session.user;
	var sql = "INSERT INTO TASK (product_id,Quantity,customer_name,status) VALUES ("+queryText+", "+queryText1+",'Microsoft','New Order')";
  console.log(sql);
	var sqlConnection = mysql.createConnection({
	 host:host_name,
		port:port_no,
		database: database_name,
		user:usernameRDS,
		password:passwordRDS
	});
	sqlConnection.connect(function(error){
		if(!!error){
			console.log(error)
		}else{
			sqlConnection.query(sql,(error,result,field)=>{
				if(error) throw error;
				var temp = result;
				res.render('table',{result:result});
				 //res.send(temp);
				 sqlConnection.end();
			});
		}
	});
});



app.get('/employee_detail',(req,res)=>{

	var sqlConnection = mysql.createConnection({
	 host:host_name,
		port:port_no,
		database: database_name,
		user:usernameRDS,
		password:passwordRDS

	});
	sqlConnection.connect(function(error){
		if(!!error){
			console.log(error)
		}else{
			sqlConnection.query("select * from Employee",(error,result,field)=>{
				if(error) throw error;
				var temp = result;
				res.render('table',{result:result});
				 //res.send(temp);

				 sqlConnection.end();
			})
		}
	});
});



app.get('/employee_page_manager',(req,res)=>{
	var queryText = req.query.employee_id;
	console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryText = req.query.employee_id;
	  	console.log(queryText);
	  	var employyedesig = 'Employee';

	  	var queryString = ' where first_name = "'+queryText+'" and department_id = '+Employee_department+' and designation = "'+employyedesig+'" ';

	  	if(queryText.length<1){
	  	var queryString = ' where department_id = '+Employee_department+' and  designation = "'+employyedesig+'"';
	  	}
	  	console.log(queryString);
	    sqlConnection.query("select * from Employee"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	      console.log(result);
	      res.render('table',{result:result});
	    })
	  }
	});
});

app.get('/customer_page1',(req,res)=>{
	res.sendFile(path.join(__dirname + "/customerpage1.html"))
});
app.get('/employee_page1',(req,res)=>{
	res.sendFile(path.join(__dirname + "/employeepage1.html"))
});
app.get('/product_page1',(req,res)=>{
	res.sendFile(path.join(__dirname + "/productpage1.html"))
});
app.get('/assign_task_admin',(req,res)=>{
	res.sendFile(path.join(__dirname + "/assign_task_admin.html"))
});
app.get('/employee_from_manager',(req,res)=>{
	res.sendFile(path.join(__dirname + "/manager_employee.html"))
});
app.get('/assign_task_from_manager',(req,res)=>{
	res.sendFile(path.join(__dirname + "/assign_task_manager.html"))
});
app.get('/go_back',(req,res)=>{
	res.sendFile(path.join(__dirname + "/AdminMainPage.html"))
});



app.get('/employee_page2',(req,res)=>{
	var queryText = req.query.employee_id;
	console.log(queryText);
	var sqlConnection = mysql.createConnection({
	 host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where first_name = "'+queryText+'"';
	  	if(queryText.length<1){
	  	var queryString = "";
	  	}
	    sqlConnection.query("select * from Employee"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	      res.render('table',{result:result});
	   		 //res.send(temp);

				 sqlConnection.end();

	    })
	  }
	});
});


app.get('/addEmployee',(req,res)=>{
	var queryid = "'"+req.query.employee_id+"'";
	var querypwd = "'"+req.query.employee_password+"'";
	var queryfirstname = "'"+req.query.first_name+"'";
	var querylastname = "'"+req.query.last_name+"'";
	var querydate_of_birth = "'"+req.query.date_of_birth+"'";
	var queryContactNumber = "'"+req.query.contact_number+"'";
	var queryEmailAddress = "'"+req.query.email_id+"'";
	var queryaddress_line1 = "'"+req.query.address_line1+"'";
	var queryaddress_line2 = "'"+req.query.address_line2+"'";
	var queryzip_code = "'"+req.query.zip_code+"'";
  //var querycity= "'"+req.query.city+"'";
  //var querystate= "'"+req.query.state+"'";
	var queryDepartMentID = req.query.department_id;
	var queryDesignation = "'"+req.query.designation+"'";

	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});

	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
			// console.log("here");
			var queryString = "INSERT INTO `user` VALUES ("+queryid+","+queryid+")";
			sqlConnection.query(queryString,(error,result,field)=>{
				if(error) throw error;
				var temp = result;
			// res.send(temp);
			})

    //  var queryString = "INSERT INTO `address_details` VALUES ("+queryzip_code+","+querycity+","+querystate+")";
    //  sqlConnection.query(queryString,(error,result,field)=>{
    //    if(error) throw error;
    //  var temp = result;
      // res.send(temp);
    //  })

			  	var queryString = "INSERT INTO `Employee` VALUES ("+queryid+","+queryfirstname+","+querylastname+","+querydate_of_birth+","
					+queryContactNumber+","+queryEmailAddress+","+queryaddress_line1+","+queryaddress_line2+","+queryzip_code+","+queryDepartMentID+
					","+queryDesignation+")"
					sqlConnection.query(queryString,(error,result,field)=>{
			      if(error) throw error;
			      var temp = result;
			    res.render('table',{result:result});
					sqlConnection.end();
			    })
	  }
	});
});



app.get('/employee_delete',(req,res)=>{
	var queryText = req.query.employee_id;
	console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where employee_id = "'+queryText+'"';
	  	var queryString1 = ' where user_id = "'+queryText+'"';
	  	if(queryText.length<1){
	  	var queryString = "";
	  	}
			// DELETE FROM user where user_id = "88"

	    sqlConnection.query("delete from Employee"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	   		 res.send(temp);
				 sqlConnection.end();
	    })

	    sqlConnection.query("delete from user"+queryString1,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	    })
	  }
	});
});

app.get('/CustomerMainPage',(req,res)=>{
	res.sendFile('/CustomerMainPage.html',{root: __dirname });
});

app.get('/product_page2',(req,res)=>{
	var queryText = req.query.product_id;
	console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where product_name = "'+queryText+'"';
	  	if(queryText.length<1){
	  		var queryString = "";
	  	}
	    sqlConnection.query("select * from Product"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	    res.render('product_table',{result:result});
			sqlConnection.end();
	    })
	  }
	});
});


app.get('/addProduct',(req,res)=>{
	var queryid = req.query.product_id;
	var queryname = "'"+req.query.product_name+"'";
	var querytype = "'"+req.query.product_type+"'";

	var queryprice = req.query.product_price;
	var querysold = req.query.product_sold;
	var querycount = req.query.Product_Production_Count;

	var querypercentage = req.query.Product_Profit_Percentage;
	// console.log(queryText);
	var sqlConnection = mysql.createConnection({
	 host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = "INSERT INTO `Product` VALUES ("+queryid+","+queryname+","+querytype+","+queryprice+","+querysold+","+querycount+","+querypercentage+")"
	    sqlConnection.query(queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	      console.log(result);
	      res.render('product_table',{result:result});
	    })
	  }
	});
});

app.get('/product_delete',(req,res)=>{
	var queryText = req.query.product_id;
	console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS
	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where product_id = "'+queryText+'"';
	  	if(queryText.length<1){
	  	var queryString = "";
	  	}
			// DELETE FROM user where user_id = "88"
	    sqlConnection.query("delete from Product"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	   		res.render('product_table',{result:result});
				 sqlConnection.end();
	    })
	  }
	});
});

	app.get('/customer_page2',(req,res)=>{
	var queryText = req.query.user_id;
	console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where first_name = "'+queryText+'"';
	  	if(queryText.length<1){
	  		var queryString = "";
	  	}
	    sqlConnection.query("select * from Customer"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	    	res.render('customer_table',{result:result});
				sqlConnection.end();
	    })
	  }
	});

});




app.get('/addCustomer',(req,res)=>{

	var queryid = "'"+req.query.customer_id+"'";
	var querybusinessname = "'"+req.query.business_name+"'";
	var queryfirstname = "'"+req.query.first_name+"'";
	var querylastname = "'"+req.query.last_name+"'";
	var queryContactNumber = "'"+req.query.customers_contact_number+"'";
	var queryaddress_line1 = "'"+req.query.address_line1+"'";
	var queryaddress_line2 = "'"+req.query.address_line2+"'";
	var queryzip_code = "'"+req.query.zip_code+"'";



	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
		if(!!error){
	    console.log(error)
	  }else{
			// console.log("here");
			var queryString = "INSERT INTO `user` VALUES ("+queryid+","+queryid+")";
      console.log(queryString);
			sqlConnection.query(queryString,(error,result,field)=>{
				if(error) throw error;
				var temp = result;
			// res.send(temp);
			})
			console.log("here");
	  	var queryString = "INSERT INTO `Customer` VALUES ("+queryid+","+querybusinessname+","+queryfirstname+","+querylastname+","
			+queryContactNumber+","+queryaddress_line1+","+queryaddress_line2+","+queryzip_code+")"
			sqlConnection.query(queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	    res.render('customer_table',{result:result});
			sqlConnection.end();
	    })
	  }
	});
});

app.get('/customer_delete',(req,res)=>{
	var queryText = req.query.customer_id;
	console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where customer_id = "'+queryText+'"';
	  	if(queryText.length<1){
	  	var queryString = "";
	  	}
			// DELETE FROM user where user_id = "88"
	    sqlConnection.query("delete from Customer"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	   		 res.render('customer_table',{result:result});
				 sqlConnection.end();
	    })
	  }
	});
});



app.get('/employee_in_detail',(req,res)=>{
	// var queryText = req.query.employee_id;
	//console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where employee_id = "'+Employee_Id+'"';
	  	console.log(queryString);
	    sqlConnection.query("select * from Employee"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	      console.log(result);
	      res.render('table',{result:result});
	    })
	  }
	});
});




app.get('/employee_in_task',(req,res)=>{
	// var queryText = req.query.employee_id;
	//console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where employee_id = "'+Employee_Id+'"';
	  	console.log(queryString);
	    sqlConnection.query("select task_id,product_id,Quantity from TASK_EMPLOYEE"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	      console.log(result);
	      res.render('task_table',{result:result});
	    })
	  }
	});
});






app.get('/  tus',(req,res)=>{
	// var queryText = req.query.employee_id;
	//console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where employee_id = "'+Employee_Id+'"';
	  	console.log(queryString);
	    sqlConnection.query("select * from TASK_EMPLOYEE"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	      console.log(result);
	      res.render('task_table',{result:result});
	    })
	  }
	});
});




app.get('/employee_in_task_status',(req,res)=>{
	 var queryText = req.query.task_id;
	//console.log(queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS
	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	var queryString = ' where employee_id = "'+Employee_Id+'"';
	  	console.log(queryString);
	    sqlConnection.query("update TASK_EMPLOYEE set status='completed'"+queryString,(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	      console.log(result);
	      res.render('table',{result:result});
	    })
	  }
	});
});




app.get('/task_page1',(req,res)=>{

	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	    sqlConnection.query("select * from TASK",(error,result,field)=>{
	      if(error) throw error;
	      var temp = result;
	    	res.render('task_table',{result:result});
			sqlConnection.end();
	    })
	  }
	});

});

app.get('/assign_task_admin1',(req,res)=>{
	var queryText = req.query.task_id;
	var queryText1 = req.query.department_id;
	console.log("TASK ID"+queryText);
	console.log("DEPARTMENT ID " + queryText1);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{

	    if(queryText1 == 2){
	    	console.log("Production")
	    	sqlConnection.query("update TASK set status = 'Under Production' where task_id =" +queryText,(error,result,field)=>{
	    		 if(error) throw error;
	      var temp = result;
	    	//res.render('customer_table',{result:result});
	    		 res.send(temp);
	    		 sqlConnection.end();

	    	})
	    }
	    if(queryText1 == 3){
	    	console.log("PACKAGING")
	    	sqlConnection.query("update TASK set status = 'Under Packaging unit' where task_id =" +queryText,(error,result,field)=>{
	    		 if(error) throw error;
	      var temp = result;
	    	//res.render('customer_table',{result:result});
	    		 res.send(temp);
	    		  sqlConnection.end();

	    	})
	    }
	    if(queryText1 == 4){
	    	console.log("Transportation")
	    	sqlConnection.query("update TASK set status = 'Under Transportation unit' where task_id =" +queryText,(error,result,field)=>{
	    		 if(error) throw error;
	      var temp = result;
	    	//res.render('customer_table',{result:result});
	    		  res.send(temp);
	    		  sqlConnection.end();

	    	})
	    }
	  }
	});

});





app.get('/assign_task_to_next',(req,res)=>{
	var queryText = req.query.task_id;
	console.log("TASK ID"+queryText);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{

	    if(Employee_department == 2){
	    	console.log("Production")
	    	sqlConnection.query("update TASK set status = 'Under Packaging unit' where task_id =" +queryText,(error,result,field)=>{
	    		 if(error) throw error;
	      var temp = result;
	    	//res.render('customer_table',{result:result});
	    		 res.send(temp);
	    		 sqlConnection.end();

	    	})
	    }
	    if(Employee_department == 3){
	    	console.log("PACKAGING")
	    	sqlConnection.query("update TASK set status = 'Under Transportation unit' where task_id =" +queryText,(error,result,field)=>{
	    		 if(error) throw error;
	      var temp = result;
	    	//res.render('customer_table',{result:result});
	    		 res.send(temp);
	    		  sqlConnection.end();

	    	})
	    }
	    if(Employee_department == 4){
	    	console.log("Transportation")
	    	sqlConnection.query("update TASK set status = 'Completed' where task_id =" +queryText,(error,result,field)=>{
	    		 if(error) throw error;
	      var temp = result;
	    	//res.render('customer_table',{result:result});
	    		  res.send(temp);
	    		  sqlConnection.end();

	    	})
	    }
	  }
	});

});






app.get('/task_from_manager',(req,res)=>{

	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
        if(Employee_department==2){
	      sqlConnection.query("select * from Task_info_production",(error,result,field)=>{
	      if(error) throw error;
        var temp = result;
	    	res.render('task_table_manager_view',{result:result});
      });
    }else if (Employee_department==3) {

      sqlConnection.query("select * from Task_info_packaging",(error,result,field)=>{
      if(error) throw error;
      var temp = result;
      res.render('task_table_manager_view',{result:result});
    });

  }else if (Employee_department==4) {

      sqlConnection.query("select * from Task_info_TRANSPORTATION",(error,result,field)=>{
      if(error) throw error;
      var temp = result;
      res.render('task_table_manager_view',{result:result});
    });

    }
				sqlConnection.end();
	  }
	});

});

app.get('/assign_task_manager',(req,res)=>{
	var queryText = req.query.task_id;
	var queryText1 = req.query.employee_id;
	console.log(queryText);
	console.log(queryText1);
	var sqlConnection = mysql.createConnection({
	  host:host_name,
	  port:port_no,
	  database: database_name,
	  user:usernameRDS,
	  password:passwordRDS

	});
	sqlConnection.connect(function(error){
	  if(!!error){
	    console.log(error)
	  }else{
	  	sqlConnection.query("SELECT product_id,Quantity from TASK where task_id = "+queryText,(error,result,field)=>{
		  if(error) throw error;
	      var temp = result;
	      var a = result[0].product_id;
	      var b = result[0].Quantity;
        console.log(a);
        console.log(b);
        var queryString="insert into TASK_EMPLOYEE VALUES ("+queryText+","+a+","+b+",'"+queryText1+"','Assigned')"
        console.log(queryString);
	      sqlConnection.query(queryString,(error,result,field)=>{
	      		if(error) throw error;
	      		var temp = result;
	      		res.send(temp);
	      	})
  		  })

	  }
	});

});

app.listen("8080");
console.log("listening at 8080");
