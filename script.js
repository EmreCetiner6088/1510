let currentMessageIndex = 0;
let currentCharIndex = 0;
let typingInterval;
let isTyping = false;  // Takip ederiz, yazma işlemi devam ediyor mu?

const messages = [
    "Hey !",
    "Merhaba Esma, ben Emre ile senin gelecekteki kedin",
    "Evet, doğru duydun senin gelecekteki kedinim!",
    "Emre, zamanlar arası bir yolculuk yapıp beni buraya hapsetti",
    "Bunu neden mi yaptı? Sana gelecekten haberler vermem için!",
    "Haince!, değil mi?",
    "Çok değil işim bitince beni geri bırakıp yaş mama vericeğini söyledi",
    "Neyse, seni daha fazla merakta bırakmadan başlayayım",
    "Şu anda sınav dönemindesin, değil mi?",
    "Harika bir şekilde çalışmaya devam et",
    "Çünkü bu tempoyla Emre ile aynı üniversiteye gidiyorsun",
    "Geleceğin böyle şekilleniyor...",
    "Çılgınca değil mi",
    "Sonrasında üniversite yıllarında bolca vakit geçiriyorsunuz",
    "Aranızdaki bağ günden güne daha da artıyor",
    "Evleniyorsunuz, çocuk sahibi oluyorsunuz... Ve tabi ki beni sahipleniyorsunuz",
    "Daha fazla anlatsam mı acaba ?",
    "Sanırım bir yaş mama için fazla konuştum 😼",
    "Şimdilik bu kadar yeter",
    "Gelecekte görüşmek üzere Esma"
];

// Function to type the message letter by letter
function typeMessage(message, complete = false) {
    // Eğer yazma işlemi devam ediyorsa, öncekini durduruyoruz
    if (isTyping) {
        clearInterval(typingInterval);
    }

    document.getElementById("speech-text").innerText = ""; // Clear speech bubble before starting
    currentCharIndex = 0; // Start from the beginning of the message

    // If 'complete' is true, type the entire message immediately
    if (complete) {
        document.getElementById("speech-text").innerText = message;
        currentCharIndex = message.length;
        if (currentCharIndex === message.length) {
            isTyping = false;  // Typing is finished

            // After the last sentence, redirect to main.html
            if (currentMessageIndex === messages.length) {
                window.location.href = "main.html";
            }
        }
        isTyping = false;  // Typing is finished
    } else {
        isTyping = true;  // Typing has started
        typingInterval = setInterval(() => {
            document.getElementById("speech-text").innerText += message[currentCharIndex];
            currentCharIndex++;

            // When the message is complete, stop typing
            if (currentCharIndex === message.length) {
                clearInterval(typingInterval);
                isTyping = false;  // Typing is finished

                // After the last sentence, redirect to main.html
                if (currentMessageIndex === messages.length) {
                    window.location.href = "main.html";
                }
            }
        }, 70); // Typing delay of 100ms per character
    }
}

// When login button is clicked, check password and start the main screen
document.getElementById("login-btn").addEventListener("click", function() {
    const password = document.getElementById("password").value;
    if (password === "1510") {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("main-screen").style.display = "block";
        // Start typing the first message
        typeMessage(messages[currentMessageIndex]);
        currentMessageIndex++;
    } else {
        alert("Yanlış şifre!");
    }
});

// When the next button is clicked
document.getElementById("next-btn").addEventListener("click", function () {
    if (isTyping) {
        // If typing is in progress, stop typing and complete the current sentence
        typeMessage(messages[currentMessageIndex - 1], true);  // Complete the current message immediately
    } else {
        // Clear the speech bubble and move to the next sentence
        document.getElementById("speech-text").innerText = "";  // Clear previous message
        if (currentMessageIndex < messages.length) {
            // Start typing the next sentence
            typeMessage(messages[currentMessageIndex]);
            currentMessageIndex++;
            console.log(currentMessageIndex);
        }
    }
});
