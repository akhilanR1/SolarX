# SOLARX

#### Video Demo:  https://youtu.be/YEgrj1D4uks

#### Description:

This project is a webpage to view and pay your electricity bill. Let's go through this page by page.

## Homepage

First, when you open [SolarX](https://solarx.project), you will see the homepage. There will be a slideshow of ads, and further below, you will be able to see some news and a feedback option. I have also added a form that users can submit if they are facing a problem.

## Login Page

If you click the **login** button, you will be taken to a page where you have to enter your username and password. In my project files, you can find a list of usernames and passwords stored (in `customers.xlsx`) for the webpage to access. Once logged in, you will be directed to the homepage.

## View Bill

Next, you can open **View Bill**. This will generate your bill with the units you have consumed and the price. It will also display the price in numbers. Then, click on **Proceed to Payment**. You will be prompted to confirm payment. Once clicked, you will receive an OTP via email. The list of email IDs for each user is also stored in `customers.xlsx`. Enter the OTP and submit. You will receive a prompt if the payment was successful.

## Payment History

You will then be redirected to **Payment History**, where it displays how much you paid and the date you paid it. Once you have completed payment, you can log out. You will receive a prompt to confirm the logout. After logging out, you will be redirected to the homepage.

## Payment History

I have used a self-signed certificate to host my server on a https. This however will likely not work when downloaded by another user. Therefore this will be demonstrated in the video.

## Steps to Open the Project

To open this project, download it into a folder with a known directory. Then, follow the steps below to open the project.

### 1. Install Node.js

**Windows:**

1. Go to the [Node.js download page](https://nodejs.org/en/download/).
2. Download the Windows installer (`.msi` file).
3. Run the installer and follow the setup wizard.
4. Verify installation by opening Command Prompt and running:

   node -v
   npm -v

**Mac:**

1. Open Terminal.
2. Install Node.js via Homebrew: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

	brew install node

3. Verify Installations:

node - v
npm - v

This should display the installed versions.


### 2. Install the following packages:

npm install express
npm install nodemailer
npm install

### 4. Run the Project

## Start the server (server.js):

1. Open the terminal and navigate to your project directory where server.js is located.

2. Run the following command to start the server:bash

node server.js

3. Once the server is running, you can access the application at: https://localhost:YOUR_PORT Replace YOUR_PORT with the actual port number defined in server.js.
