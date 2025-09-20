 const form = document.querySelector('#contact-form'); 
const msg = document.getElementById('form-message');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('#nav-links')
const links = document.querySelectorAll('#nav-links a');
const aboutCountent = document.querySelector('.about-content');
const projectCards = document.querySelectorAll('.project-card')


hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

links.forEach(link => {
    link.addEventListener('click',()=>{
        links.forEach( l => l.classList.remove('active-link'));
        link.classList.add('active-link')
    })
});


const observer1 = new IntersectionObserver((entries)=>{
    if(entries[0].isIntersecting){
        entries[0].target.classList.add("show");
    }else{
        entries[0].target.classList.remove("show");
    }
},{
    threshold:0.3
});

observer1.observe(aboutCountent);

const observer2 = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show")
        }else{
            entry.target.classList.remove("show")
        }  
    })
}, {
    threshold:0.3
});
projectCards.forEach(card => observer2.observe(card));

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