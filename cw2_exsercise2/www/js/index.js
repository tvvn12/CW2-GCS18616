var ERROR = 'ERROR';

// Create or Open Database.
var db = window.openDatabase('DB', '1.0', 'DB', 20000);

// To detect whether users use mobile phones horizontally or vertically.
$(window).on('orientationchange', onOrientationChange);

// Display messages in the console.
function log(message, type = 'INFO') {
    console.log(`${new Date()} [${type}] ${message}`);
}

function onOrientationChange(e) {
    if (e.orientation == 'portrait') {
        log('Portrait.');
    }
    else {
        log('Landscape.');
    }
}

// To detect whether users open applications on mobile phones or browsers.
if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
    $(document).on('deviceready', onDeviceReady);
}
else {
    $(document).on('ready', onDeviceReady);
}

// Display errors when executing SQL queries.
function transactionError(tx, error) {
    log(`SQL Error ${error.code}. Message: ${error.message}.`, ERROR);
}

// Run this function after starting the application.
function onDeviceReady() {
    log(`Device is ready.`);

    db.transaction(function (tx) {
        // Create table ACCOUNT.
        var query = `CREATE TABLE IF NOT EXISTS Property (Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                         PropertyName TEXT NOT NULL UNIQUE,
                                                         PropertyAddress TEXT NOT NULL,
                                                         City TEXT NOT NULL,
                                                         District TEXT NOT NULL,
                                                         Ward TEXT NOT NULL,
                                                         PropertyType TEXT NOT NULL,
                                                         PropertyFurniture TEXT,
                                                         Bedrooms INTEGER NOT NULL,
                                                         Price INTEGER NOT NULL,
                                                         Reporter TEXT NOT NULL,
                                                         PropertyNote TEXT,
                                                         DateAdded DATE NOT NULL
                                                         )`;
        tx.executeSql(query, [], function (tx, result) {
            log(`Create table 'Property' successfully.`);
        }, transactionError);

        // Create table COMMENT.
        var query = `CREATE TABLE IF NOT EXISTS Comment (Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                                         Comment TEXT NOT NULL,
                                                         Datetime DATE NOT NULL,
                                                         PropertyId INTEGER NOT NULL,
                                                         FOREIGN KEY (PropertyId) REFERENCES Property(Id))`;
        tx.executeSql(query, [], function (tx, result) {
            log(`Create table 'Comment' successfully.`);
        }, transactionError);
    });
    prepareDatabase(db);
}

$(document).on('pagebeforeshow','#page-create',function(){
    importCity('#page-create #frm-register');
    importDistrict('#page-create #frm-register' );
    importWard('#page-create #frm-register' );
   


});

$(document).on('change','#page-create #frm-register #city',function(){
    importDistrict('#page-create #frm-register' );
    importWard('#page-create #frm-register' );
 
});

//search city
// $(document).on('pagebeforeshow', '#page-search', function () {
//     importCity('#page-search #frm-search');
    
    
// });
////
$(document).on('change','#page-create #frm-register #district',function(){
    importWard('#page-create #frm-register' );
   

});

$(document).on('vclick', '#page-home #panel-open', function () {
    $('#page-home #panel').panel('open');
});

$(document).on('vclick', '#page-create #panel-open', function () {
    $('#page-create #panel').panel('open');
});

$(document).on('vclick', '#page-list #panel-open', function () {
    $('#page-list #panel').panel('open');
});

$(document).on('vclick', '#page-about #panel-open', function () {
    $('#page-about #panel').panel('open');
});
$(document).on('vclick', '#page-search #panel-open', function () {
    $('#page-search #panel').panel('open');
});


   


//city
function importCity(form, selectedName=""){
    db.transaction(function (tx){
    var query = 'SELECT * FROM City ORDER BY Name';
    tx.executeSql(query, [], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
        var optionList =`<option value=""  > Select city</option>;`;
        for (let item of result.rows){
            optionList += `<option  value= '${item.Id}' ${item.Name== selectedName ?'selected':''} >${item.Name}</option>;`
        }
        $(`${form} #city`).html(optionList);
        $(`${form} #city`).selectmenu( 'refresh', true);
        
        
        

        
}
});
}
//district

function importDistrict(form, selectedName="", selectedCity=""){
    var id=$(`${form} #city`).val();
    
    db.transaction(function (tx){
        var query= "";
        if (id == null){
        query = `SELECT District.* FROM District LEFT JOIN City ON CityId= City.Id WHERE City.Name = "${selectedCity}" ORDER BY District.Name`;
          
    
        }

        else{
        query = `SELECT * FROM District WHERE CityId = ${id} ORDER BY Name`;
        }
       
    tx.executeSql(query, [], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
        var optionList =`<option value="">Select District</option>;`;
        for (let item of result.rows){
            optionList += `<option value= '${item.Id}' ${item.Name== selectedName ?'selected':''} >${item.Name}</option>;`
        }
        $(`${form} #district`).html(optionList);
        $(`${form} #district`).selectmenu('refresh', true);

}
});
}
//ward
function importWard(form, selectedName="",selectedDistrict=""){
    var id=$(`${form} #district`).val();
    
    db.transaction(function (tx){
         var query="";

        if (id == null){
            query = `SELECT Ward.* FROM Ward LEFT JOIN District ON DistrictId= District.Id WHERE District.Name = "${selectedDistrict}" ORDER BY Ward.Name`;
            
    
        }
        else{
            query = `SELECT * FROM Ward WHERE DistrictId = ${id} ORDER BY Name`;
            }

    tx.executeSql(query, [], transactionSuccess, transactionError);

    function transactionSuccess(tx, result) {
        var optionList =`<option value="">Select Ward</option>;`;
        for (let item of result.rows){
            optionList += `<option value= '${item.Id}' ${item.Name== selectedName ?'selected':''} >${item.Name}</option>;`
        }
        $(`${form} #ward`).html(optionList);
        $(`${form} #ward`).selectmenu('refresh', true);

}
});
}




// Submit a form to register a new account.
$(document).on('submit' , '#page-create #frm-register', confirmAccount);
$(document).on('submit' , '#page-create #frm-confirm', registerAccount);

function confirmAccount(e) {
    e.preventDefault();

    // Get user's input.
    var propertyname = $('#page-create #frm-register #property').val();
    var propertyaddress= $('#page-create #frm-register #street').val();
    var city = $('#page-create #frm-register #city option:selected').text();
    var district = $('#page-create #frm-register #district option:selected').text();
    var ward = $('#page-create #frm-register #ward option:selected').text();
    var type = $('#page-create #frm-register #type').val();
    var furniture = $('#page-create #frm-register #furniture').val();
    var bedroom = $('#page-create #frm-register #bedroom').val();
    var price = $('#page-create #frm-register #price').val();
    var reporter = $('#page-create #frm-register #reporter').val();
    var note = $('#page-create #frm-register #note').val();
    checkAccount(propertyname,propertyaddress,city,district,ward,type,furniture,bedroom,price,reporter,note);
    
}

function checkAccount(propertyname,propertyaddress,city,district,ward,type,furniture,bedroom,price,reporter,note) {
    db.transaction(function (tx) {
        var query = 'SELECT * FROM Property WHERE PropertyName = ?';
        tx.executeSql(query, [propertyname], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            if (result.rows[0] == null) {
                log('Open the confirmation popup.');

                $('#page-create #error').empty();
                
                
                $('#page-create #frm-confirm #property').text(propertyname);
                $('#page-create #frm-confirm #street').text(propertyaddress);
                $('#page-create #frm-confirm #district').text(district);
                $('#page-create #frm-confirm #city').text(city);
                $('#page-create #frm-confirm #ward').text(ward);
                $('#page-create #frm-confirm #type').text(type);
                $('#page-create #frm-confirm #furniture').text(furniture);
                $('#page-create #frm-confirm #bedroom').text(bedroom);
                $('#page-create #frm-confirm #price').text(price);
                $('#page-create #frm-confirm #reporter').text(reporter);
                $('#page-create #frm-confirm #note').text(note);
                $('#page-create #frm-confirm').popup('open');
            }
            else {
                var error = 'PropertyName exists.';
                $('#page-create #error').empty().append(error);
                log(error, ERROR);
            }
        }
    });
}
function registerAccount(e) {
    e.preventDefault();

    var propertyname = $('#page-create #frm-register #property').val();
    var propertyaddress= $('#page-create #frm-register #street').val();
    var city = $('#page-create #frm-register #city option:selected').text();
    var district = $('#page-create #frm-register #district option:selected').text();
    var ward = $('#page-create #frm-register #ward option:selected').text();
    var type = $('#page-create #frm-register #type').val();
    var furniture = $('#page-create #frm-register #furniture').val();
    var bedroom = $('#page-create #frm-register #bedroom').val();
    var price = $('#page-create #frm-register #price').val();
    var reporter = $('#page-create #frm-register #reporter').val();
    var note = $('#page-create #frm-register #note').val();
    var date = new Date();


    db.transaction(function (tx) {
        var query = 'INSERT INTO Property (PropertyName , PropertyAddress ,City ,District ,Ward ,PropertyType ,PropertyFurniture ,Bedrooms ,Price ,Reporter, PropertyNote ,DateAdded ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        tx.executeSql(query, [propertyname,propertyaddress,city,district,ward,type,furniture,bedroom,price,reporter,note,date], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Create a Account '${propertyname}' successfully.`);

            // Reset the form.
            $('#frm-register').trigger('reset');
            $('#page-create #error').empty();
            $('#username').focus();
            $('#page-create #frm-confirm').popup('close');
        }
        
    });
}
// $(document).on('submit', '#page-detail #frm-update', Update);

// function Update(e) {
//     e.preventDefault();

//     // Get user's input.
//     var propertyname = $('#page-detail #frm-update #property').val();
//     var propertyaddress= $('#page-detail #frm-update #street').val();
//     var city = $('#page-detail #frm-update #city  option:selected').text();
//     var district = $('#page-detail #frm-update #district  option:selected').text();
//     var ward = $('#page-detail #frm-update #ward  option:selected').text();
   

//     var type = $('#page-detail #frm-update #type').val();
//     var furniture = $('#page-detail #frm-update #furniture').val();

//     var bedroom = $('#page-detail #frm-update #bedroom').val();
//     var price = $('#page-detail #frm-update #price').val();
//     var reporter = $('#page-detail #frm-update #reporter').val();
//     var note = $('#page-detail #frm-update #note').val();
   
    
// }
$(document).on('vclick', '#page-detail #btn-update', checkUp );
$(document).on('pagebeforeshow','#page-detail',function(){
    importCity('#page-detail #frm-update');
    importDistrict('#page-detail #frm-update' );
    importWard('#page-detail #frm-update' );
   


});

$(document).on('change','#page-detail #frm-update #city',function(){
    importDistrict('#page-detail #frm-update' );
    importWard('#page-detail #frm-update' );
 
});

//search city
// $(document).on('pagebeforeshow', '#page-search', function () {
//     importCity('#page-search #frm-search');
    
    
// });
////
$(document).on('change','#page-detail #frm-update #district',function(){
    importWard('#page-detail #frm-update' );
   

});

function checkUp() {

    var id = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = 'SELECT * FROM Property WHERE Id = ?';
        tx.executeSql(query, [id], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            
            log('Open the update popup.');
            $('#page-detail #error').empty();

                importCity('#page-detail #frm-update',result.rows[0].City);
                importDistrict('#page-detail #frm-update',result.rows[0].District, result.rows[0].City );
                importWard('#page-detail #frm-update', result.rows[0].Ward, result.rows[0].District);
                $('#page-detail #frm-update #property').val(result.rows[0].PropertyName);
                $('#page-detail #frm-update #street').val(result.rows[0].PropertyAddress);
                $('#page-detail #frm-update #uptype').val(result.rows[0].PropertyType);
                $('#page-detail #frm-update #up-furniture').val(result.rows[0].PropertyFurniture);
                $('#page-detail #frm-update #bedroom').val(result.rows[0].Bedrooms);
                $('#page-detail #frm-update #price').val(result.rows[0].Price);
                $('#page-detail #frm-update #reporter').val(result.rows[0].Reporter);

                // $('#page-detail #frm-update #city').selectmenu( 'refresh', true);
                // $('#page-detail #frm-update #district').selectmenu( 'refresh', true);
                // $('#page-detail #frm-update #ward').selectmenu( 'refresh', true);
                
                $('#page-detail #frm-update #uptype').selectmenu( 'refresh', true);
                $('#page-detail #frm-update #up-furniture').selectmenu( 'refresh', true);
                $('#page-detail #frm-update').popup('open');



                
           
            
        }
    });
}



// $(document).on('pagebeforeshow','#page-create',function(){
//     importType('#page-create #frm-register');
   


// });
// ///type
// function importType(form, selectedId=-1){
//     var id=$(`${form} #Type`).val();
    
//     db.transaction(function (tx){
//     // var query = 'SELECT * FROM Ward WHERE DistrictId = ? ORDER BY Name';
//     tx.executeSql(query, [id], transactionSuccess, transactionError);

//     function transactionSuccess(tx, result) {
//         var optionList =`<option value='-1'>Select Type</option>;`;
//         for (let item of result.rows){
//             optionList += ``
//         }
//         $(`${form} #Type`).html(optionList);
//         $(`${form} #Type`).selectmenu('refresh', true);

// }
// });
// }
// Display Account List.
$(document).on('pagebeforeshow', '#page-list', showList);

function showList() {
    db.transaction(function (tx) {
        var query = 'SELECT Id, PropertyName,Bedrooms,City,PropertyType,Price FROM Property';
        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Get list of accounts successfully.`);

            // Prepare the list of accounts.
            var listAccount = `<ul id='list-account' data-role='listview' data-filter='true' data-filter-placeholder='Search accounts...'
                                                     data-corners='false'  class='ui-nodisc-icon ui-alt-icon'>`;
            for (let pro of result.rows) {
                listAccount += `<li><a data-details='{"Id" :${pro.Id} }'>
                                    
                                        <img src='img/g.png' height="100px">

                                   
                                   <h2 style="margin-bottom: 0px;"> ${pro.PropertyName}</h2>

                                   <p style="margin-top: 2px; margin-bottom: 10px;"><small>${pro.City}</small></p>
                                  
                                     <img src="img/bed.png" height="20px" style="margin-bottom: -5px;"> <th>${pro.Bedrooms}</th>
                                     <img src="img/h.png" height="20px" style="margin-bottom: -5px;"> <th>${pro.PropertyType}</th>
                                     <img src="img/d.png" height="20px" style="margin-bottom: -5px;"> <th>${pro.Price} VNĐ/Month</th>


                                 
                                 



                                </a></li>`;
            }
            listAccount += `</ul>`;

            // Add list to UI.
            $('#list-account').empty().append(listAccount).listview('refresh').trigger('create');

            log(`Show list of accounts successfully.`);
        }
    });
}

// Save Account Id.
$(document).on('vclick', '#list-account li a', function (e) {
    e.preventDefault();

    var id = $(this).data('details').Id;
    localStorage.setItem('currentPropertyId', id);

    $.mobile.navigate('#page-detail', { transition: 'none' });
});

$(document).on('vclick', '#list-a li a', function (e) {
    e.preventDefault();

    var id = $(this).data('details').Id;
    localStorage.setItem('currentPropertyId', id);

    $.mobile.navigate('#page-detail', { transition: 'none' });
});

// Show Account Details.
$(document).on('pagebeforeshow', '#page-detail', showDetail);

function showDetail() {
    var id = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = 'SELECT * FROM Property WHERE Id = ?';
        tx.executeSql(query, [id], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            var errorMessage = 'Property not found.';
            var add = errorMessage;
            

            if (result.rows[0] != null) {
                log(`Get details of property '${id}' successfully.`);
                proname = result.rows[0].PropertyName;
                
                add = result.rows[0].PropertyAddress;
                city = result.rows[0].City;
                district = result.rows[0].District;
                ward = result.rows[0].Ward;
                type = result.rows[0].PropertyType;
                bed = result.rows[0].Bedrooms;
                price = result.rows[0].Price;
                fur = result.rows[0].PropertyFurniture;
                reporter = result.rows[0].Reporter;
                time = result.rows[0].DateAdded;






                
            }
            else {
                log(errorMessage, ERROR);

                $(' #page-detail #btn-update').addClass('ui-disabled');
                $('#page-detail #btn-delete-confirm').addClass('ui-disabled');
            }

            $('  #page-detail #street  ').html(add);
            $('  #page-detail #city  ').html(city);
            $('  #page-detail #district  ').html(district);
            $('  #page-detail #ward  ').html(ward);
            $('#page-detail #type').html(type);
            $('  #page-detail #bedroom  ').html(bed);
            $('#page-detail #price').html(price);
            $('  #page-detail #furniture').html(fur);
            $('  #page-detail #reporter').html(reporter);
            $('  #page-detail #date').html(time);
            $('  #page-detail #property').html(proname);
            
            showComment();
            showNoteWhenUserCreateAccount();
        }
    });
}

// Delete Account.
$(document).on('submit', '#page-detail #frm-delete', deleteAccount);
$(document).on('keyup', '#page-detail #frm-delete #txt-delete', confirmDeleteAccount);

function confirmDeleteAccount() {
    var text = $('#page-detail #frm-delete #txt-delete').val();

    if (text == 'confirm delete') {
        $('#page-detail #frm-delete #btn-delete').removeClass('ui-disabled');
    }
    else {
        $('#page-detail #frm-delete #btn-delete').addClass('ui-disabled');
    }
}

function deleteAccount(e) {
    e.preventDefault();

    var id = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = 'DELETE FROM Property WHERE Id = ?';
        tx.executeSql(query, [id], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Delete Property '${id}' successfully.`);

            $('#page-detail #frm-delete').trigger('reset');

            $.mobile.navigate('#page-list', { transition: 'none' });
        }
    });


}

// $(document).on('change','#page-detail #frm-update #city',function(){
//     importDistrict('#page-detail #frm-update' );
//     importWard('#page-detail #frm-update' );
// });
// $(document).on('change','#page-detail #frm-update #district',function(){
//     importWard('#page-detail #frm-update' );
   

// });

$(document).on('submit','#page-detail #frm-update',uppro)
function uppro(e)
{e.preventDefault();
    var id = localStorage.getItem('currentPropertyId');
  
    
    var property =$('#page-detail #frm-update #property').val();
    var street =$('#page-detail #frm-update #street').val();
    var city =$('#page-detail #frm-update #city option:selected').text();
    var district =$('#page-detail #frm-update #district option:selected').text();
    var ward =$('#page-detail #frm-update #ward option:selected').text();
    var type =$('#page-detail #frm-update #uptype').val();
    var furniture =$('#page-detail #frm-update #up-furniture').val();
    var bedroom =$('#page-detail #frm-update #bedroom').val();
    var price =$('#page-detail #frm-update #price').val();
    var reporter =$('#page-detail #frm-update #reporter').val();
    var date= new Date();
 

    


    db.transaction(function(tx)
    {
        var query=`UPDATE Property SET 
        PropertyName=? ,
        PropertyAddress = ?,
        City =?,
        District=?,
        Ward=?,
        PropertyType=?,
        PropertyFurniture=?,
        Bedrooms=?,
        Price=?, Reporter =?,
        DateAdded = ?
        WHERE Id=?`;
        tx.executeSql(query,[property,street,city,district,ward,type,furniture,bedroom,price,reporter,date,id],transactionSuccess,transactionError);

        function transactionSuccess(tx, result)
        {
            console.log();(`Update  successfully.`);
            // showDetail();
            $('#page-detail #frm-update').trigger('reset');
            $.mobile.navigate('#page-detail', { transition: 'none' });

            location.reload();

           
        }
    });
}

// function UpAccount(e) {
//     e.preventDefault();

//     var id = localStorage.getItem('currentPropertyId');

//     db.transaction(function (tx) {
//         var query = `UPDATE Property
//             SET PropertyName = ?,
//             PropertyAddress = ?, City = ?, District = ?, Ward = ?,
//             PropertyType = ?, Bedrooms = ?, Price = ?, PropertyFurniture = ?, Reporter = ?,
//             DateAdded = julianday('now')
//         WHERE Id = ?`;;
//         tx.executeSql(query, [id], transactionSuccess, transactionError);

//         function transactionSuccess(tx, result) {
//             log(`Delete account '${id}' successfully.`);

//             $('#page-detail #frm-update').trigger('reset');

//             $.mobile.navigate('#page-list', { transition: 'none' });
//         }
//     });
// }

// Add Comment.
$(document).on('submit', '#page-detail #frm-comment', addComment);

function addComment(e) {
    e.preventDefault();

    var propertyId = localStorage.getItem('currentPropertyId');
    var comment = $('#page-detail #frm-comment #txt-comment').val();
    var dateTime = new Date();

    db.transaction(function (tx) {
        var query = 'INSERT INTO Comment (PropertyId, Comment, Datetime) VALUES (?, ?, ?)';
        tx.executeSql(query, [propertyId, comment, dateTime], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Add new comment to account '${propertyId}' successfully.`);

            $('#page-detail #frm-comment').trigger('reset');

            showComment();
            // showNoteWhenUserCreateAccount();
        }

    });
}

// Show Comment.
function showComment() {
    var propertyId = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = 'SELECT * FROM Comment WHERE PropertyId = ?';
        tx.executeSql(query, [propertyId], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Get list of comments successfully.`);

            // Prepare the list of comments.
            var listComment = '';
            for (let comment of result.rows) {
                listComment += `<div class = 'list'>
                                    <small>${comment.Datetime}</small>
                                    <h3>${comment.Comment}</h3>
                                </div>`;
            }
            
            // Add list to UI.
            $('#list-comment').empty().append(listComment);

            log(`Show list of comments successfully.`);
        }
    });
}
function showNoteWhenUserCreateAccount() {
    var propertyId = localStorage.getItem('currentPropertyId');

    db.transaction(function (tx) {
        var query = 'SELECT * FROM Property WHERE Id = ?';
        tx.executeSql(query, [propertyId], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Get list of note successfully.`);

            // Prepare the list of comments.
            var listN = '';
            for (let note of result.rows) {
                listN += `<div class = 'list'>
                                    <small>${note.DateAdded}</small>
                                    <h3>${note.PropertyNote}</h3>
                                </div>`;
            }
            
            // Add list to UI.
            $('#list-note').empty().append(listN);

            log(`Show list of note successfully.`);
        }
    });
}

$(document).on('pagebeforeshow','#page-search',function(){
    importCity('#page-search #frm-search');
    // importDistrict('#page-search #frm-search' );
    // importWard('#page-search #frm-search' );
   


});
// $(document).on('change','#page-search #frm-search #city',function(){
//     importDistrict('#page-search #frm-search' );
//     importWard('#page-search #frm-search' );
// });
// $(document).on('change','#page-search #frm-search #district',function(){
//     importWard('#page-search #frm-search' );
   

// });
$(document).on('submit', '#page-search #frm-search', search);

function search(e) {
    e.preventDefault();
    var property = $('#page-search #frm-search #property').val();
    var price = $('#page-search #frm-search #price').val();
    var city = $('#page-search #frm-search #city option:selected').text();
    var cityId = $('#page-search #frm-search #city option:selected').val();

    // var district = $('#page-search #frm-search #district option:selected').text();
    // var ward = $('#page-search #frm-search #ward option:selected').text();
    // var districtId = $('#page-search #frm-search #district option:selected').val();
    // var wardId = $('#page-search #frm-search #ward option:selected').val();

    db.transaction(function (tx) {

        var query = `SELECT * FROM Property`;
        var check = false; //Nếu true có nghĩa trong điều kiện WHERE có nhiều hơn 1 trường để so sánh
        // ví dụ nếu property có giá trị khi này check = true
        // tiếp theo nếu price có giá trị và check = true thì sẽ nối thêm ' AND '
        // nếu trước đó property không có giá trị mà price có giá trị thì sẽ ko nối thêm ' AND '

        // nếu property có giá trị, price ko có giá trị, city có giá trị thì nó sẽ thế nào

        // nếu 1 trong các thuộc tính này có giá trị thì mới có điều kiện WHERE
        if (property || price || cityId ) {
            query += ' WHERE '
        } // SELECT * FROM Property WHERE

        if(property){
            query += `PropertyName LIKE "%${property}%" `;
            check = true;
        } // SELECT * FROM Property WHERE PropertyName LIKE "%be%"
 
        if(price){
            if (check) query += ' AND ';
            query += `Price >= ${price}`;
            // check = true;
        } // ko nối thêm gì do price ko có giá trị

        if(cityId){
            if (check) query += ' AND ';
            query += `City = "${city}"`;
            
        } // vì check = true nên nối thêm ' AND '
        // // SELECT * FROM Property WHERE PropertyName LIKE "%be%" AND City = "Hải Phòng"
        
        

        console.log(query);

        // query = query.substring(0, query.length - 6);

        tx.executeSql(query, [], transactionSuccess, transactionError);

        function transactionSuccess(tx, result) {
            log(`Get list of accounts successfully.`);

            // Prepare the list of accounts.
            var lists = `<ul id='list-a' data-role='listview' class='ui-nodisc-icon ui-alt-icon'>`;
            for (let s of result.rows) {
                lists += `<li><a data-details='{"Id" :${s.Id} }'>
                                    
                                        <img src='img/g.png' height="100px">

                                        <h3> Name : ${s.PropertyName}</h3>
                                        <p> Price: ${s.Price} </p>
                                        <p>City:${s.City} </p>


                                 
                                 



                                </a></li>`;
            }
            lists += `</ul>`;

            // Add list to UI.
            $('#list-a').empty().append(lists).listview('refresh').trigger('create');

            log(`Show list of accounts successfully.`);
        }
    });
  
}

