document.addEventListener("DOMContentLoaded", function() {
    const amountPresets = document.querySelectorAll('.amount-preset');
    amountPresets.forEach(button => {
        button.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            document.getElementById('amount').value = amount;
            
            amountPresets.forEach(btn => btn.classList.remove('bg-blue-200', 'font-medium'));
            this.classList.add('bg-blue-200', 'font-medium');
        });
    });
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('scale-105');
            this.classList.add('border-blue-400');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('scale-105');
            if (!this.value) {
                this.classList.remove('border-blue-400');
            }
        });
    });
});

document.getElementById("copyUpiBtn").addEventListener("click", () => {
    const upiId = document.getElementById("upiId").textContent;
    const copySuccess = document.getElementById("copySuccess");
    
    navigator.clipboard.writeText(upiId)
        .then(() => {
            copySuccess.classList.remove("hidden");
            
            setTimeout(() => {
                copySuccess.classList.add("hidden");
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
            alert("Failed to copy UPI ID. Please try again.");
        });
});

document.getElementById("donateBtn").addEventListener("click", () => {
    let amount = document.getElementById("amount").value;
    const senderName = document.getElementById("senderName").value || "Anonymous";
    
    if (!amount || amount <= 0) {
        const amountInput = document.getElementById("amount");
        amountInput.classList.add("animate__animated", "animate__shakeX", "border-red-500");
        
        setTimeout(() => {
            amountInput.classList.remove("animate__animated", "animate__shakeX", "border-red-500");
        }, 1000);
        
        return;
    }
    
    let isStingy = false;
    if (amount < 50) {
        amount = 100;
        isStingy = true;
        document.getElementById("amount").value = amount;
    }
    
    const donateBtn = document.getElementById("donateBtn");
    const originalBtnText = donateBtn.innerHTML;
    donateBtn.innerHTML = '<span class="material-icons animate-spin">refresh</span> Processing...';
    donateBtn.disabled = true;
    
    const upiId = "9389979319@ybl"; 
    const upiUrl = `upi://pay?pa=${upiId}&pn=Eidi Collection&mc=&tid=&tr=&tn=Eidi%20from%20${senderName}&am=${amount}&cu=INR`;
    
    sessionStorage.setItem("isStingy", isStingy);
    sessionStorage.setItem("senderName", senderName);
    sessionStorage.setItem("eidiAmount", amount);
    
    setTimeout(() => {
        donateBtn.innerHTML = originalBtnText;
        donateBtn.disabled = false;
        
        window.location.href = upiUrl;
        
        showToast("Opening payment app...");
        
        setTimeout(() => window.location.href = "/thanks-for-eidi", 3000);
    }, 1000);
});

document.getElementById("downloadQrBtn").addEventListener("click", () => {
    const qrCodeImg = document.getElementById("qrCode");
    const amount = document.getElementById("amount").value || "default";
    
    const downloadBtn = document.getElementById("downloadQrBtn");
    const originalBtnText = downloadBtn.innerHTML;
    downloadBtn.innerHTML = '<span class="material-icons animate-spin">refresh</span> Downloading...';
    
    const downloadLink = document.createElement("a");
    downloadLink.href = qrCodeImg.src;
    downloadLink.download = `eidi-qr-${amount}.png`;
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    
    setTimeout(() => {
        downloadBtn.innerHTML = '<span class="material-icons">check</span> Downloaded!';
        
        setTimeout(() => {
            downloadBtn.innerHTML = originalBtnText;
        }, 2000);
    }, 1000);
});

function showToast(message) {
    if (!document.getElementById('toast')) {
        const toast = document.createElement('div');
        toast.id = 'toast';
        toast.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg opacity-0 transition-opacity duration-300 z-50';
        document.body.appendChild(toast);
    }
    
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 3000);
}