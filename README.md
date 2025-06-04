# Devcontainers (1st time setup)

## Installation

### install WSL (enkel voor Windows-gebruikers)

Open Powershell **as administrator**.

Use the following command to check if you have WSL installed and check its version.
```
wsl --version
```

If you have WSL installed, it should show you similar output to this:

```
WSL version: 2.0.14.0
Kernel version: 5.15.133.1-1
WSLg version: 1.0.59
MSRDC version: 1.2.4677
Direct3D version: 1.611.1-81528511
DXCore version: 10.0.25131.1002-220531-1700.rs-onecore-base2-hyp
Windows version: 10.0.22621.3007
```

If you have WSL installed, update it with the following command:

```
wsl --update
```

**If you don't have WSL installed, use the following command to install WSL**:

```
wsl --install
```

More information at: https://learn.microsoft.com/en-us/windows/wsl/install

### Install Docker Desktop

Go to https://www.docker.com/products/docker-desktop/

Download the installer and execute it.

### Install Visual Studio Code

Go to https://code.visualstudio.com/

Download the installer and execute it.

### Install the VS Code Extensions

Open Visual Studio Code.

Open the Extensions tab from the Sidebar.

Search for the "Remote Development" extension pack from Microsoft. https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack

This pack installs 4 extensions in VS Code that help you with development on DevContainers.

## Starting a DevContainer from a Github Repo

Create a new Github Repo, or use an existing Github Repo.

 - [ ] Copy the HTTPS Git URL (from the green "Code" button on the repo page).
 - [ ] Open VS Code.
 - [ ] Open the Command Pallette (CTRL + SHIFT + P)
 - [ ] Search for the command called "Dev Containers: Clone Repository in Container Volume..."
 - [ ] Press Enter
 - [ ] Paste the HTTPS Git URL from your Github Repo
 - [ ] Press Enter

If your Github Repo already has a DevContainer set up (usually a `devcontainer.json` file inside a folder called `.devcontainer`), it will now start the devcontainer. **The first time this will take some time**, as Docker will need to pull (download) all the necessary images.  

If your Github Repo doesn't have a DevContainer set up, VS Code will now ask you several questions:
 - [ ] the type of dev environment you'd like
   - e.g. typescript & Node, Python, C#, ...
 - [ ] Which version of that dev environment you'd like to use
   - e.g. The version of Node
 - [ ] What extra tools you'd like to install additionally
   - e.g. Angular CLI, database tools, ...  
 - [ ] What version of those tools you'd like to use

Once you've answered those questions, it will start up the DevContainer.
