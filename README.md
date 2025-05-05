# SOLARX

#### Description:

This project is a webpage to view and pay your electricity bill. This project was originaly submitted by me for Harvard's CS50. Let's go through this page by page.

## Homepage

First, when you open [SolarX](https://solarx.onrender.com), you will see the homepage. There will be a slideshow of ads, and further below, you will be able to see some news and a feedback option. I have also added a form that users can submit if they are facing a problem.

## Login Page

If you click the **login** button, you will be taken to a page where you have to enter your username and password. In my project files, you can find a list of usernames and passwords stored (in `customers.xlsx`) for the webpage to access. Once logged in, you will be directed to the homepage.

## View Bill

Next, you can open **View Bill**. This will generate your bill with the units you have consumed and the price. It will also display the price in numbers. Then, click on **Proceed to Payment**. You will be prompted to confirm payment. Once clicked, you will receive an OTP via email. The list of email IDs for each user is also stored in `customers.xlsx`. Enter the OTP and submit. You will receive a prompt if the payment was successful.

## Payment History

You will then be redirected to **Payment History**, where it displays how much you paid and the date you paid it. Once you have completed payment, you can log out. You will receive a prompt to confirm the logout. After logging out, you will be redirected to the homepage.

## Payment History

I have used a self-signed certificate to host my server on a https. This however will likely not work when downloaded by another user. Therefore this will be demonstrated in the video.

## Steps to Open the Project

I have currently suspended the web service. But if it was active, you just have to visit https://solarx.onrender.com

For a video demonstration: 
