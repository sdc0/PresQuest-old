# PresQuest

This is the source code repository for the PresQuest app, which connects teachers and students in the classroom. 

Teachers will be able to view messages sent in by students, anonymously during class but with full identification afterwards, and students will be able to send messages that the teacher will see in realtime.

## Installation

Make sure you have a recent version of [NodeJS](https://nodejs.org/en) installed so you can install dependencies and compile the project.

### Clone the Repository

```bash
git clone git@github.com:sdc0/PresQuest.git
cd PresQuest
npm install
```

### Compile the Project

```bash
npm run tauri build
```

### Download the Installer

After running the previous command, an installer will be built in a directory inside of `src-tauri/target/release/bundle`.


## Contributing to PresQuest

Feel free to create GitHub Issues for any bugs or missing features you may find, or fork the repository to work on building code to solve these issues yourself.

If you decide to do the latter, some helpful commands and an architecture of the project can be found below.

### Useful Commands

The following is the command for running a local instance of the Tauri dev server:

```bash
npm run tauri dev
```

### Project Architecture

PresQuest is built using [Tauri](https://tauri.app/), the [React Framework](https://react.dev/), and [Firebase](https://firebase.google.com/). 

It consists of a Rust backend, found mainly in `src-tauri/src/main.rs`, and a set of Typescript React components for individual pages, found in the `src/pages` folder. 

On top of these, there are two additional files that should be noted: `src/ConditionalRoute.tsx`, the file providing for window routing, and `src/firebaseHelper.ts`, a helper file giving functionality for connecting to the Firebase backend.

## Planned Future Extensions

Hopefully, we will be able to add more to PresQuest, making it more fully-featured as an open-source way for students and teaachers to connect. To this end we plan to add the following:

<ul>
    <li>Simplified downloading of class message records for teachers
    <li>In-class poll questions including, but not limited to, multiple-choice, short answer, and numeric
    <li>A web application to make usage more accessable
    <li>A better color scheme (I know its pretty ugly right now)
</ul>