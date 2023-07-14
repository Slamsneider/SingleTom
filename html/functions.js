$(document).ready(function () {
    //populate agent dropdown
    const agentSelect = $("#agent");
    for (const agentKey in agents) {
        const option = $("<option></option>");
        option.val(agentKey);
        option.text(agentKey);
        agentSelect.append(option);
    }
    //populate model dropdown
    const modelSelect = $("#model");
    for (const modelKey in models) {
        const option = $("<option></option>");
        option.val(modelKey);
        option.text(models[modelKey].text);
        modelSelect.append(option);
    }
    //add event listeners
    agentSelect.on("change", function () {
        const agent = agents[agentSelect.val()];
        $("#systemprompt").val(agent.sysprompt);
        $("#agentHeading").text(agentSelect.val() + " (" + modelSelect.val() + ")");
    });
    modelSelect.on("change", function () {
        $("#agentHeading").text(agentSelect.val() + " (" + modelSelect.val() + ")");
    });
    $("#but_AddToHistory").click(function () {
        const newtext = $("#userprompt").val();
        const outputText = $("#response").val();
        $("#history").val($("#history").val() + "USER: " + newtext + "\n\nASSISTANT: " + outputText + "\n\n");
        $("#userprompt").val("");
        $("#response").val("");
        $("#history").scrollTop($("#history")[0].scrollHeight);
    });
    $("#but_send").click(async function () {
        const model = $("#model").val();
        const history = $("#history").val();
        const systemprompt = $("#systemprompt").val();
        const userprompt = $("#userprompt").val();
        const max_tokens = parseInt($("#max_tokens").val());
        const temperature = parseFloat($("#temperature").val());

        doSend(model, systemprompt, history, userprompt, max_tokens, temperature);
    });
    $("#but_ClearHistory").click(function () {
        $("#history").val("");
    });
    $("#but_ClearPrompt").click(function () {
        $("#userprompt").val("");
    });
    //-----------------end of event listeners
    agentSelect.trigger("change");//updates system prompt text here at start
});

async function doSend(myModel, mySystemprompt, myHistory, myUserprompt, max_tokens, temperature) {
    const messages = myHistory + "\n\n" + myUserprompt;
    $("#but_send").text("WAIT...");
    $("#but_send").prop("disabled", true);

    try {
        const response = await $.ajax({
            url: "https://api.openai.com/v1/chat/completions",
            type: "POST",
            beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", `Bearer ${openai_apikey}`);
            },
            contentType: "application/json",
            data: JSON.stringify({
                model: myModel,
                messages: [
                    {
                        role: "system",
                        content: mySystemprompt
                    },
                    {
                        role: "user",
                        content: messages
                    }
                ],
                max_tokens: max_tokens,
                n: 1,
                stop: null,
                temperature: temperature
            }),
        });
        doReturn(response);
    } catch (error) {
        console.error(error);
        alert("An error occurred. Check the console for more information.");
    }
    setTimeout(() => {
        $("#but_send").prop("disabled", false);
        $("#but_send").text("SEND");
    }, 100);
}
function CheckmessageContent(msg) {
    // if start of msg is "ASSISTANT: " then remove it
    if (msg.startsWith("ASSISTANT: ")) {
        msg = msg.substring(11);
    }
    return msg;
}
function doReturn(response) {
    const finReason = response.choices[0].finish_reason;
    let messageContent = response.choices[0].message.content;
    const totalTokens = response.usage.total_tokens;
    /*
    const id = response.id;
    const created = response.created;
    const model = response.model;
    const completionTokens = response.usage.completion_tokens;
    const promptTokens = response.usage.prompt_tokens;

    console.log("messageContent: ", messageContent);
    console.log("id: ", id);
    console.log("created: ", created);
    console.log("model: ", model);
    console.log("completionTokens: ", completionTokens);
    console.log("promptTokens: ", promptTokens);
    */
    console.log("response", response); //full response object
    console.log("totalTokens: ", totalTokens);
    console.log("finishReason: ", finReason);
    messageContent = CheckmessageContent(messageContent);
    $("#response").val(messageContent);
    const modeltokens = models[$("#model").val()].tokens;
    const msg = "Total tokens used: " + totalTokens + " of " + modeltokens + " | Finish reason: " + finReason;
    $("#ResponseInNumbers").text(msg);
}
