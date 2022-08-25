# Rappi Order History
Application to show the order history of a Rappi account with a better user experience

- `yarn start` to run the application.
- `http://localhost:3000` to access it.
- `http://localhost:3000?results=123` to show 123 order results (the default is 100 results if no param is sent).
- Once in the application, enter the Bearer token. To get it, inspect network in the Rappi website, load the history page and, in the history-user request, copy the authorization in the request headers.

![image](https://user-images.githubusercontent.com/1372167/186769869-7189fe1f-2850-42a2-84e3-b463cfaefe0a.png)
