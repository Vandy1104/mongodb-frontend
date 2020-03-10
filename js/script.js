console.log("front-end");
console.log(sessionStorage);
let url;

$(document).ready(function(){

  if(sessionStorage['userName']) {
    console.log('You are logged in');
  } else {
      console.log('Please log in');
  }

  $('#heading').click(function(){
    // $(this).css('background', 'teal');
  });

  $('#prodForm').hide();
  $('#loginForm').hide();
  $('#adminPage').hide();
  $('#adminBtn').click(function(){
    $('#adminPage').show();
    $('#homePage').hide();
  });
  $('#homeBtn').click(function(){
    $('#adminPage').hide();
    $('#homePage').show();
  });


  $('#loginBtn').click(function(){
      $('#loginForm').show();
  });

  $('#updateProductsBtn').click(function(){
      $('#prodForm').show();
  });

//get url and port from config.json
  $.ajax({
    url :'config.json',
    type :'GET',
    dataType :'json',
    success : function(configData){
      console.log(configData);
      url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
      console.log(url);

    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error


  });//ajax



  $('#viewUserBtn').click(function(){
    $.ajax({
      url :`${url}/allUsers`,
      type :'GET',
      dataType :'json',
      success : function(usersFromMongo){
        console.log(usersFromMongo);
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error


    });//View User button
});

    $('#viewProductsBtn').click(function(){
      $.ajax({
        url :`${url}/showProducts`,
        type :'GET',
        dataType :'json',
        success : function(productsFromMongo){
          console.log(productsFromMongo);
          document.getElementById('productCards').innerHTML = "";

      for(let i=0; i<productsFromMongo.length; i++){
        document.getElementById('productCards').innerHTML +=
        `<div class="col">
        <h3 class=""> ${productsFromMongo[i].name}</h3>
        <h4 class="">$${productsFromMongo[i].price}</h4>
        </div>`;

      }


    },//success
        error:function(){
          console.log('error: cannot call api');
        }//error

      }); //Ajax
      });//View Products Button


      // Update products
      $('#prodForm').submit(function(){
        event.preventDefault();
        let prodId = $('#prodId').val();
        let prodName = $('#prodName').val();
        let prodPrice = $('#prodPrice').val();
        let uId = $('#uId').val();
        console.log(prodId,prodName,prodPrice,uId);
        $.ajax({
          url :`${url}/updateProduct/${prodId}`,
          type :'PATCH',
          data:{
            // _id : prodId,
            name : prodName,
            price: prodPrice,
            userId: uId
            },
          success : function(data){
            console.log(data);
          },//success
          error:function(){
            console.log('error: cannot call api');
          }//error


        });//ajax

      });//submit function for Update product



    $('#loginForm').submit(function(){
      event.preventDefault();
      let username = $('#username').val();
      let password = $('#password').val();
      console.log(username,password);
      $.ajax({
        url :`${url}/loginUser`,
        type :'POST',
        data:{
          username : username,
          password : password
          },
        success : function(loginData){
          console.log(loginData);
          if(loginData === 'user not found. Please register') {
            alert('Register Please');
          } else {
            sessionStorage.setItem('userId', loginData['_id']);
            sessionStorage.setItem('userName', loginData['username']);
            sessionStorage.setItem('userEmail', loginData['email']);
            console.log(sessionStorage);
          }
          //console.log('you are logged in');
        },//success
        error:function(){
          console.log('error: cannot call api');
        }//error


      });//ajax

    });//submit function for login form

    //Logout starts here

    $('#logoutBtn').click(function(){
      sessionStorage.clear();
      console.log(sessionStorage);
    })

  });//document.ready
