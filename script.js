 const form = document.querySelector('#contact-form'); 
const msg = document.getElementById('form-message');

sendMail = ()=>{
    let params = {
        name : document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        subject:document.querySelector('#subject').value,
        message: document.querySelector('#message').value,
    }
    
    if(params.name==='' || params.email==='' || params.subject==='' || params.message===''){
         msg.style.display = "block";
         msg.style.color = "red";
         msg.textContent = "❌ Please fill in all the fields!";
    }else{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(params.email)){
        msg.style.display = "block";
        msg.style.color = "red";
        msg.textContent = "❌ Please enter a valid email address!";
        return;
    }

    emailjs.send("service_akp5prd", "template_glbzlqw",params)
        .then(()=>{
            msg.style.display = "block";
            msg.style.color = "green";
            msg.textContent = "✅ Message Sent Successfully!";
           form.reset();
         })
         .catch((error) => {
            msg.style.display = "block";
            msg.style.color = "red";
            msg.textContent = "❌ An error occurred. Please try again.";
            console.error(error);
        });
    
    }

   
}