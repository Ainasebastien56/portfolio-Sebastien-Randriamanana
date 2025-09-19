 const form = document.querySelector('#contact-form'); 
const messageBox = document.getElementById('form-message');

sendMail = ()=>{
    let params = {
        name : document.querySelector('#name').value,
        email: document.querySelector('#email').value,
        subject:document.querySelector('#subject').value,
        message: document.querySelector('#message').value,
    }


    emailjs.send("service_akp5prd", "template_glbzlqw",params)
    .then(()=>{
            const msg = document.getElementById('form-message');
            msg.style.display = "block";
            msg.style.color = "green";
            msg.textContent = "✅ Message Sent Successfully!";
           form.reset();
    })
    .catch((error) => {
            const msg = document.getElementById('form-message');
            msg.style.display = "block";
            msg.style.color = "red";
            msg.textContent = "❌ An error occurred. Please try again.";
            console.error(error);
        });
}