document.getElementById("chat-form").addEventListener("submit", async function(event) {
    event.preventDefault();
    const input = document.getElementById("user-input").value.trim();
    const fileInput = document.getElementById("file-input");
    const chatBox = document.getElementById("chat-box");

    if (!input && !fileInput.files.length) return;

    const messageElem = document.createElement("p");
    messageElem.textContent = "You: " + input;
    chatBox.appendChild(messageElem);

    // Simulated AI response
    const responseElem = document.createElement("p");
    responseElem.textContent = "CaseBuddy AI: Analyzing your query...";
    chatBox.appendChild(responseElem);

    setTimeout(() => {
        responseElem.textContent = "CaseBuddy AI: Here's a smart response based on your input and file (simulated).";
    }, 1500);

    document.getElementById("chat-form").reset();
});
