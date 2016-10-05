window.onload = function() {
    //buttons

    var quickadd = document.getElementById("quickadd");
    var add = document.getElementById("add");
    var cancel = document.getElementById("cancel");
    var quickaddformdiv = document.querySelector('.form');


    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var address = document.getElementById("address");
    var city = document.getElementById("city");
    var email = document.getElementById("email");

    var addressbookdisplay = document.querySelector(".display");


    var addressBook = [];

    // Event listener
    quickadd.addEventListener("click", function(){
      quickaddformdiv.style.display = "block";
    });

    cancel.addEventListener("click", function(){
        quickaddformdiv.style.display = "none";
    });

    add.addEventListener("click", addToBook);

    addressbookdisplay.addEventListener("click", removeEntry);


    function removeEntry(e) {
      if(e.target.classList.contains("delbtn")) {
         var remID = e.target.getAttribute("data-id");
         addressBook.splice(remID, 1);
         localStorage['addbook'] = JSON.stringify(addressBook);
         showAddressBook();
      }
    }

    function jsonstructure(name,phone,address,city,email){
      this.name = name;
      this.phone = phone;
      this.address = address;
      this.city = city;
      this.email = email;
    }

    function addToBook() {
       var isNull = name.value != '' && phone.value != '' && address.value != '' && city.value != '' && email.value != '';
       if (isNull) {
          //  add content of the form to the array
          var obj = new jsonstructure(name.value, phone.value, address.value, city.value, email.value);
          addressBook.push(obj);
          localStorage['addbook'] = JSON.stringify(addressBook);
          quickaddformdiv.style.display = "none";
          clearForm();
          showAddressBook();
       }
    }

    function clearForm() {
      var frm = document.querySelectorAll(".formFields");
      for(var i in frm) {
        frm[i].value = '';
      }
    }

    function showAddressBook() {
       if (localStorage['addbook'] === undefined) {
            localStorage['addbook'] = "[]";
       } else {
           addressBook = JSON.parse(localStorage['addbook']);
           addressbookdisplay.innerHTML = '';
           for(var n in addressBook) {
             var str = '<tr>';
               str += '<td>'+ addressBook[n].name + '</td>';
               str += '<td>' + addressBook[n].phone + '</td>';
               str += '<td>' + addressBook[n].address + '</td>';
               str += '<td>' + addressBook[n].city + '</td>';
               str += '<td>' + addressBook[n].email + '</td>';
               str += '<td><button class="btn btn-danger delbtn" type="button" data-id= "' + n + '">Delete</button></td>';
               str += '</tr>';
               addressbookdisplay.innerHTML += str;
           }
       }
    }

    showAddressBook();

}
