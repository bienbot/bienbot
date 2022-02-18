# Bienbot

## Usefull stuff:

### [Join Figma team](https://www.figma.com/team_invite/redeem/Pss0l3271YJxT0hpRcU9J5)

### [Nx documentation](https://nx.dev/getting-started/intro)

---

> If you don't know what given command is doing, you can check it here https://www.shell.how/

---

## Setting up development environment

1. Install:

    - [node.js](https://nodejs.org/en/) V16 (V17 won't work in some cases)
    - [git](https://git-scm.com/downloads)

2. Clone this repository `git clone https://github.com/lkarasinski/bienbot`

3. Install nx globally `npm install -g nx`

4. Install dependencies `npm install`

---

## Working with bienbot apps:

-   To start working with bienbot's app you need to enter command `nx serve <app_name>`. Example: `nx serve bot`.

-   To build app you need to enter command `nx build <app_name>`. Example: `nx build bot`. Note: currently only bot is buildable.

-   To test app you need to enter command `nx test <app_name>`. Example: `nx test bot`.

## Working with bienbot libraries:

-   To start working with bienbot's ui library you need to enter command `nx run <library_name>:storybook`. Example: `nx run ui:storybook`.

-   To test bienbot's library you need to enter command `nx run <library_name>:test`. Example: `nx run functions:test`.

---

## Committing your changes

1. Create new branch and switch to it (`git checkout -b <branch_name>`). Example branch name: `feature/add-info-card`. [Git branching naming convention](https://codingsight.com/git-branching-naming-convention-best-practices/).

2. Commit your changes (`git commit -m "<commit_message>"`). Example commit message: `Add info card`. [Git commits convention](https://www.conventionalcommits.org/en/v1.0.0/).

3. Push your branch to remote repository (`git push origin <branch_name>`).

4. Create pull request on GitHub. (Go to [GitHub repository page](https://github.com/lkarasinski/bienbot) and click on "Compare" button).

5. Wait for approval. 😇
