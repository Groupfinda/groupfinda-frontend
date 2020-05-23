# Welcome to the Groupfinda Frontend

This is the repository for the Groupfinda frontend. In here you should find documentation on what the frontend is built with, how to build it for development and how to deploy the frontend.

## Built with:

- Expo for React Native
- Typescript
- Apollo-Client for GraphQL

## Setting up the development enviroment

1. Git Clone the repository
2. do a `yarn install` within the directory.

## Running the app for development

Once you are ready to run the app, follow the following steps:

1. Run `yarn start`

## Connecting the app to Docker backend on Windows

1. Ensure that port forwarding is enabled so that you can access the backend server on localhost (Only for Docker Toolbox)
2. Set up IP forwarding by going to regedit -> HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Tcpip\Parameters and setting value of IPEnableRouter to 1. Restart computer after this step.
3. Open up command prompt with admin permissions
4. Run `netsh advfirewall firewall add rule name="TCP Port 3002" dir=in localport=3002 protocol=TCP action=allow`
5. Run
   `netsh interface portproxy add v4tov4 listenport=3002 connectaddress=127.0.0.1 connectport=3002`

#### Set up Port Forwarding for Docker Toolbox

1. Open VirtualBox Manager for Windows
2. On the default machine, open Settings -> Network -> Adapter 1 -> Advanced -> Port Forwarding
3. Add a new rule with the following configuration. Protocol=TCP, Host IP=127.0.0.1, Host Port=3002, Guest IP=192.168.99.100, Guest Port=3002
4. Click OK
