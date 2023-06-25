    let myname=document.getElementById("myname");
    let lastname=document.getElementById("lastname");
    let email=document.getElementById("email");
    let contact=document.getElementById("contact");
    let date=document.getElementById("date");
    let submitform=document.getElementById('submitform');
    let reg_data;
    let errormsg;
    let re;
    let formobj={};
    let key;
    let flag;
    let fn_flag=false;
    let ln_flag=false;
    let mail_flag=false;
    let con_flag=false;
    let dob_flag=false;
    let msg='';
    let count=1;
    

    myname.addEventListener('blur',(e=>{
        fn_flag=false;
        errormsg= document.createElement('h4');
        re = /^[a-zA-Z]{3,15}$/;
        reg_data=myname;
        key="firstName";
        msg='Please enter valid Firstname';
        checkvalidation(reg_data,key,msg); 
        fn_flag=flag; 
    }));

    lastname.addEventListener('blur',(e=>{
        errormsg= document.createElement('h4');
        re = /^[a-zA-Z]{3,15}$/;
        reg_data=lastname;
        key="lastName";
        msg='Please enter valid Lastname';
        checkvalidation(reg_data,key,msg); 
        ln_flag=flag;
    }));
    email.addEventListener('blur',(e=>{
        errormsg= document.createElement('h4');
        re = /^([\-\_.0-9a-zA-Z]+)@([a-zA-Z]+).([a-zA-Z]+)$/;
        reg_data=email;
        key="email";
        msg='Please enter valid Email Id';
        checkvalidation(reg_data,key,msg); 
        mail_flag=flag;
    }));

    contact.addEventListener('blur',(e=>{
        errormsg= document.createElement('h4');
        re = /^[7-9]{1}([0-9]){9}$/;
        reg_data=contact;
        key="contact";
        msg='Please enter valid Mobile number';
        checkvalidation(reg_data,key,msg);  
        con_flag=flag;
    }));
    date.addEventListener('blur',(e=>{
        errormsg= document.createElement('h4');
        let dtyear=date.value;
        dtyear=dtyear.split("-")[0];
        if(dtyear>1990 && dtyear<2024){
            formobj["dob"]=date.value;
            date.style.border="1px solid rgb(133, 133, 133)";
            dob_flag=true;
        }
        else{
            date.parentElement.appendChild(errormsg);
            errormsg.innerHTML="Applicant date should be before 2000yr.";
            date.style.border="1px solid red";
            dob_flag=false;
        }
        setTimeout(() => {
          
            errormsg.remove();
           
        }, 2500);
       
    }));
   
 function checkvalidation(reg_data,key,msg){
     if(re.test(reg_data.value)){
        formobj[key]=reg_data.value;
        reg_data.style.border="1px solid rgb(133, 133, 133)";
        flag= true;
    }
    else{
        reg_data.parentElement.appendChild(errormsg);
        errormsg.innerHTML=msg;
        reg_data.style.border="1px solid red";
        flag= false;
    }
    setTimeout(() => {
        errormsg.remove();
        
    }, 2500);
 }



 submitform.addEventListener('click',(e=>{
    e.preventDefault();
    let gender = document.getElementsByName('gender');
    let gen;
    for(i = 0; i < gender.length; i++) {
        if(gender[i].checked){
        gen=gender[i].value;
        }
        formobj["gender"]=gen;
    }
    errormsg= document.createElement('h4');
    submitform.parentElement.appendChild(errormsg);

    if(fn_flag && ln_flag && con_flag && mail_flag && dob_flag){
        console.log(formobj);
        fn_flag=false;
        ln_flag=false;
        mail_flag=false;
        con_flag=false;
        dob_flag=false;
        
        localStorage.setItem("Id"+count, JSON.stringify(formobj));
        count++;
        errormsg.innerHTML="Form has Succesfully Submitted";
        setTimeout(() => {
            myname.value='';
            lastname.value='';
            contact.value='';
            email.value='';
            date.value='';   
        }, 3000);
       
    }
    else{

        console.log("error");
   
        errormsg.innerHTML="Please fill the correct details to submit";
        if(!fn_flag){
            myname.style.border="1px solid red";
        }
        if(!ln_flag){
            lastname.style.border="1px solid red";
        }
        if(!con_flag){
            contact.style.border="1px solid red";
        }
        if(!mail_flag){
            email.style.border="1px solid red";
        }
        if(!dob_flag){
            date.style.border="1px solid red";
        }
        
    }
    setTimeout(() => {
       
        errormsg.remove();
        
        
    }, 5000);
    

 }))