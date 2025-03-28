document.addEventListener("DOMContentLoaded", function() {
    const isStingy = sessionStorage.getItem("isStingy") === "true";
    const senderName = sessionStorage.getItem("senderName") || "Friend";
    const amount = sessionStorage.getItem("eidiAmount") || "";
    
    const thankYouMessage = document.getElementById("thankYouMessage");
    if (thankYouMessage) {
        thankYouMessage.textContent = `Thank you, ${senderName}!`;
        thankYouMessage.classList.add("animate__animated", "animate__fadeInUp");
    }
    
    const amountMessage = document.getElementById("amountMessage");
    if (amountMessage && amount) {
        amountMessage.textContent = `Your Eidi of ₹${amount} has made my Eid extra special! 🎊`;
        amountMessage.classList.add("animate__animated", "animate__fadeInUp", "animate__delay-1s");
    }
    
    if (isStingy) {
        const stingyMessage = document.getElementById("stingyMessage");
        if (stingyMessage) {
            setTimeout(() => {
                stingyMessage.classList.remove("hidden");
            }, 1500);
        }
        
        if (thankYouMessage) {
            thankYouMessage.textContent = `Hmm... Thanks I Guess, ${senderName}`;
            thankYouMessage.classList.remove("gradient-text");
            thankYouMessage.style.color = "#b45309"; 
        }
        
        const checkIcon = document.querySelector(".material-icons");
        if (checkIcon) {
            checkIcon.classList.remove("text-green-600");
            checkIcon.classList.add("text-yellow-600");
            checkIcon.textContent = "warning";
            
            const iconContainer = document.querySelector(".success-icon");
            iconContainer.classList.add("animate__animated", "animate__wobble");
            iconContainer.style.backgroundColor = "#fef3c7"; 
        }
    } else {
        createExtraConfetti();
    }
    
    sessionStorage.removeItem("isStingy");
    sessionStorage.removeItem("senderName");
    sessionStorage.removeItem("eidiAmount");
    
    addAnimatedBackground();
});

function createExtraConfetti() {
    if (typeof createConfetti === 'function') {
        setTimeout(() => {
            createConfetti(40);
        }, 500);
    }
}
function addAnimatedBackground() {
    const container = document.body;
    const colors = ['#dbeafe', '#ede9fe', '#fef3c7'];
    
    for (let i = 0; i < 15; i++) {
        const circle = document.createElement('div');
        const size = Math.random() * 100 + 50;
        
        circle.style.position = 'fixed';
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;
        circle.style.borderRadius = '50%';
        circle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        circle.style.opacity = '0.1';
        circle.style.zIndex = '-1';
        circle.style.top = `${Math.random() * 100}vh`;
        circle.style.left = `${Math.random() * 100}vw`;
        circle.style.animation = `float ${Math.random() * 10 + 10}s ease-in-out infinite`;
        
        const styleSheet = document.styleSheets[0];
        if (!document.querySelector('style#float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    50% { transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px) rotate(${Math.random() * 20}deg); }
                    100% { transform: translate(0, 0) rotate(0deg); }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(circle);
    }
}