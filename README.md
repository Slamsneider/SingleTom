# SingleTom
## A GPT tool (client) using OpenAI's API

This is a tutorial project that combines HTML and JavaScript to create a local HTML client. The client utilizes OpenAI's GPT API, eliminating the need for a server, node.js, or Python. To get started, simply open the HTML file in your browser.

You will need your personal OpenAI API-KEY. You can obtain it by visiting this link: [https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys).

The client is designed to be a simple demo and serves as a source of inspiration. Feel free to use the code as-is or expand upon it to create your own unique implementation. If you have basic knowledge of HTML and JavaScript and are interested in learning how to leverage OpenAI's API then this project is for you.

Please note that this project is intended for local use and learning purposes. If you were to use it on a public server, be cautious as your API key would be exposed to the world.

It's important to clarify that this project is not a fully-fledged application. However, with some modifications, you can transform it into one if desired.

NOTE: When one or more text files are dropped onto the 'history' textarea, its contents are read and appended to the textarea so you can 'talk with it'.

1. [Installation](#installation)
2. [Code Structure](#code-structure)
3. [About OpenAI Models and Tokens](#about-openai-models-and-tokens)
4. [Important Note](#important-note)
5. [Disclaimer](#disclaimer)

![image](https://github.com/Slamsneider/SingleTom/assets/192285/768529e5-72b6-48f9-ab74-5e9d5a1b96a0)

## Installation
1. Press the green "Code" button on the project page and choose "Download ZIP" or [download here](https://github.com/Slamsneider/SingleTom/archive/refs/heads/main.zip).
2. Once downloaded, unzip the `html` folder to your desired location.
3. **RENAME** `apikeys.js.install` to `apikeys.js` and open the file in a text editor.
4. Replace `YOUR_OPENAI_API_KEY_HERE` with your OpenAI API key.
5. Save the changes made in the `apikeys.js` file.
6. Now, open the `index.html` file in your browser to start using the application.

## Code Structure

- `index.html`: Main HTML file for the application.
- `apikeys.js`: Contains the API key for OpenAI's API.
- `models.js`: OpenAI Models.
- `agents.js`: Agent definitions. (make your own)
- `functions.js`: Main functionality of the application, including sending messages and handling responses.
- `dropTextFile.js`: Functionality for drag and drop text files to the history.
- `styles.css`: CSS styles for the application.

## About OpenAi Models and Tokens
Each model have a different total tokens available for the inference (request). One token is approximately 4 characters.

As example then `gpt-3.5-turbo` has 4096 tokens available for each request.

When sending a request, the token count consists of the following components:

- System prompt
- Conversation history
- User prompt
- `max_tokens` parameter value

The sum of these components must be less than the total tokens available for the model, or else an error will occur.
### max_tokens (parameter)
The `max_tokens` parameter determines how many tokens should be reserved for the response.

### finish_reason (output)
The `finish_reason` indicates the reason why the response ended. It can be either "stop" or "length". "stop" means that the response had a 'normal' run, while "length" indicates that the response reached the `max_tokens` limit and is incomplete. If so, then to continue the response, you can use the word "continue" as the next prompt.

### temperature (parameter)
The temperature parameter controls the randomness of the response. Lower values will result in more predictable responses, while higher values will result in more surprising responses (hallucinations).


## ⚠️Important Note 

Do not use this application on a public server as it will expose your API key to the world. This application is intended for 'local' use only.

## Disclaimer

This application is made for learning and is not a full fledged application.
